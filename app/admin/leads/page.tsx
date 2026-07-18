import { Prisma } from "@prisma/client";
import {
  DownloadIcon,
  InboxIcon,
  MessageSquareIcon,
  PhoneIcon,
  UserCheckIcon,
} from "lucide-react";
import { AdminLeadsBoard } from "@/components/admin/leads/admin-leads-board";
import { AdminShell } from "@/components/admin/layouts/admin-shell";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { requireAdmin } from "@/lib/admin/auth";
import { prisma } from "@/lib/admin/prisma";

export const dynamic = "force-dynamic";

type LeadWithAssignee = Prisma.LeadGetPayload<{
  include: { assignedTo: true };
}>;
type LeadActivityItem = Prisma.LeadActivityGetPayload<{
  include: { createdBy: true };
}>;
type LeadWithRelations = LeadWithAssignee & {
  activities: LeadActivityItem[];
};

export default async function AdminLeadsPage({
  searchParams,
}: {
  searchParams: Promise<{ lead?: string }>;
}) {
  const admin = await requireAdmin();
  const params = await searchParams;
  const [leadRows, admins, totals] = await Promise.all([
    prisma.lead.findMany({
      include: { assignedTo: true },
      orderBy: { createdAt: "desc" },
      take: 100,
    }),
    prisma.user.findMany({
      where: { role: "ADMIN" },
      orderBy: { name: "asc" },
    }),
    Promise.all([
      prisma.lead.count(),
      prisma.lead.count({ where: { status: "NEW" } }),
      prisma.lead.count({ where: { status: "CONTACTED" } }),
      prisma.lead.count({ where: { status: "WON" } }),
    ]),
  ]);

  const leadIds = leadRows.map((lead) => lead.id);
  const activities = leadIds.length
    ? await prisma.leadActivity.findMany({
        where: { leadId: { in: leadIds } },
        include: { createdBy: true },
        orderBy: [{ occurredAt: "desc" }, { createdAt: "desc" }],
      })
    : [];

  const activitiesByLeadId = new Map<string, LeadActivityItem[]>();
  for (const activity of activities) {
    const existing = activitiesByLeadId.get(activity.leadId) || [];
    existing.push(activity);
    activitiesByLeadId.set(activity.leadId, existing);
  }

  const leads: LeadWithRelations[] = leadRows.map((lead) => ({
    ...lead,
    activities: activitiesByLeadId.get(lead.id) || [],
  }));

  const [allLeads, newLeads, contactedLeads, wonLeads] = totals;
  const statCards = [
    { label: "All leads", value: allLeads, helper: "Every captured enquiry", icon: InboxIcon },
    { label: "New leads", value: newLeads, helper: "Needs first response", icon: MessageSquareIcon },
    { label: "In conversation", value: contactedLeads, helper: "Follow-ups in motion", icon: PhoneIcon },
    { label: "Converted", value: wonLeads, helper: "Won customers", icon: UserCheckIcon },
  ];

  return (
    <AdminShell
      adminName={admin.name}
      adminEmail={admin.email}
      pageTitle="Contact leads workspace"
      pageDescription="Read each enquiry clearly, track every follow-up, and move interested customers through a reliable conversion pipeline."
      pageEyebrow="CRM"
      actions={
        <Button variant="outline">
          <DownloadIcon className="size-4" />
          Export leads
        </Button>
      }
    >
      <section className="grid gap-4 md:grid-cols-4">
        {statCards.map(({ label, value, helper, icon: Icon }) => (
          <Card key={label} className="border-[color:var(--button-outline-border)] bg-card/70">
            <CardContent className="flex items-start justify-between gap-4 p-5">
              <div>
                <p className="text-sm text-muted-foreground">{label}</p>
                <p className="mt-5 font-heading text-4xl font-semibold text-foreground">{value}</p>
                <p className="mt-1 text-xs text-muted-foreground">{helper}</p>
              </div>
              <Icon className="size-5 text-[color:var(--button-outline-foreground)]" aria-hidden="true" />
            </CardContent>
          </Card>
        ))}
      </section>

      <AdminLeadsBoard leads={leads} admins={admins} selectedLeadId={params.lead} newLeads={newLeads} />
    </AdminShell>
  );
}
