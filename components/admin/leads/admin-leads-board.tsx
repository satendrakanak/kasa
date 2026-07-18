"use client";

import { useMemo, useState } from "react";
import type { Prisma } from "@prisma/client";
import {
  MailIcon,
  PhoneIcon,
  SearchIcon,
  SendIcon,
  UserRoundIcon,
} from "lucide-react";
import { manageLeadAction } from "@/actions/admin/leads";
import {
  AdminInfoTile,
  formattedDate,
  friendlyLabel,
  MetaBox,
} from "@/components/admin/shared/detail-primitives";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { displayLabel } from "@/lib/admin/dashboard-format";

const leadStatuses = ["NEW", "CONTACTED", "QUALIFIED", "WON", "CLOSED"] as const;
const contactMethods = [
  ["phone", "Phone call"],
  ["email", "Email"],
  ["whatsapp", "WhatsApp"],
  ["demo", "Demo tour"],
  ["meeting", "Meeting"],
  ["note", "Internal note"],
] as const;

export type AdminLead = Prisma.LeadGetPayload<{
  include: { assignedTo: true };
}> & {
  activities: Array<
    Prisma.LeadActivityGetPayload<{
      include: { createdBy: true };
    }>
  >;
};

type AdminOption = {
  id: string;
  name: string | null;
  email: string | null;
};

function dateTimeLocal(date = new Date()) {
  const offsetMs = date.getTimezoneOffset() * 60_000;
  return new Date(date.getTime() - offsetMs).toISOString().slice(0, 16);
}

function statusBadgeClass(status: string) {
  if (status === "NEW") return "border-amber-300 bg-amber-50 text-amber-700 dark:border-amber-300/30 dark:bg-amber-300/10 dark:text-amber-200";
  if (status === "CONTACTED") return "border-sky-300 bg-sky-50 text-sky-700 dark:border-sky-300/30 dark:bg-sky-300/10 dark:text-sky-200";
  if (status === "QUALIFIED") return "border-violet-300 bg-violet-50 text-violet-700 dark:border-violet-300/30 dark:bg-violet-300/10 dark:text-violet-200";
  if (status === "WON") return "border-emerald-300 bg-emerald-50 text-emerald-700 dark:border-emerald-300/30 dark:bg-emerald-300/10 dark:text-emerald-200";
  return "border-slate-300 bg-slate-50 text-slate-600 dark:border-white/10 dark:bg-white/5 dark:text-slate-300";
}

function matchesLead(lead: AdminLead, query: string) {
  const value = query.trim().toLowerCase();
  if (!value) return true;

  return [
    lead.name,
    lead.email,
    lead.phone,
    lead.institute,
    lead.message,
    lead.status,
    lead.leadType,
  ]
    .filter(Boolean)
    .some((item) => String(item).toLowerCase().includes(value));
}

export function AdminLeadsBoard({
  leads,
  admins,
  selectedLeadId,
  newLeads,
}: {
  leads: AdminLead[];
  admins: AdminOption[];
  selectedLeadId?: string;
  newLeads: number;
}) {
  const initialLeadId = selectedLeadId && leads.some((lead) => lead.id === selectedLeadId)
    ? selectedLeadId
    : leads[0]?.id || "";
  const [activeLeadId, setActiveLeadId] = useState(initialLeadId);
  const [query, setQuery] = useState("");
  const filteredLeads = useMemo(() => leads.filter((lead) => matchesLead(lead, query)), [leads, query]);
  const selectedLead = leads.find((lead) => lead.id === activeLeadId) || filteredLeads[0] || leads[0] || null;

  function selectLead(leadId: string) {
    setActiveLeadId(leadId);
  }

  return (
    <section className="grid min-w-0 overflow-hidden rounded-2xl border border-border/80 bg-card/75 shadow-xl shadow-primary/5 lg:grid-cols-[minmax(280px,320px)_minmax(0,1fr)] xl:grid-cols-[minmax(300px,340px)_minmax(0,1fr)]">
      <aside className="min-w-0 border-b border-border/80 p-3 lg:border-r lg:border-b-0 lg:p-4">
        <label className="flex h-11 min-w-0 items-center gap-2 rounded-xl border border-border/80 bg-background px-3 text-sm text-muted-foreground shadow-sm focus-within:border-primary/45 focus-within:ring-2 focus-within:ring-primary/10">
          <SearchIcon className="size-4 shrink-0" aria-hidden="true" />
          <Input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search leads or status"
            className="h-auto min-w-0 border-0 bg-transparent p-0 shadow-none focus-visible:ring-0"
          />
        </label>
        <div className="mt-5 flex items-center justify-between gap-3">
          <p className="truncate text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-muted-foreground">
            Leads ({filteredLeads.length})
          </p>
          <Badge variant="secondary" className="shrink-0">{newLeads} new</Badge>
        </div>
        <div className="mt-4 grid max-h-[min(34rem,calc(100svh-21rem))] min-w-0 gap-2 overflow-y-auto pr-1">
          {filteredLeads.length ? (
            filteredLeads.map((lead) => {
              const active = selectedLead?.id === lead.id;
              return (
                <button
                  key={lead.id}
                  type="button"
                  onClick={() => selectLead(lead.id)}
                  className={`min-w-0 rounded-xl border p-4 text-left transition hover:border-primary/40 hover:bg-secondary/45 ${
                    active ? "border-primary/55 bg-secondary/70 shadow-sm" : "border-border/70 bg-background/55"
                  }`}
                >
                  <div className="flex min-w-0 items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className="truncate font-heading text-base font-semibold text-foreground">{lead.name}</p>
                      <p className="mt-1 truncate text-sm text-muted-foreground">{lead.email}</p>
                    </div>
                    <Badge variant="outline" className={`${statusBadgeClass(lead.status)} max-w-[6.5rem] shrink-0 truncate`}>
                      {friendlyLabel(lead.status)}
                    </Badge>
                  </div>
                  <p className="mt-3 line-clamp-2 text-sm text-muted-foreground">{lead.message}</p>
                  <p className="mt-3 text-xs text-muted-foreground">{formattedDate(lead.createdAt)}</p>
                </button>
              );
            })
          ) : (
            <div className="rounded-xl border border-dashed p-6 text-center text-sm text-muted-foreground">
              No matching leads.
            </div>
          )}
        </div>
      </aside>

      <div className="min-w-0 p-4 lg:p-5">
        {selectedLead ? <LeadDetails lead={selectedLead} admins={admins} /> : (
          <div className="grid min-h-96 place-items-center rounded-2xl border border-dashed text-center text-muted-foreground">
            No lead selected.
          </div>
        )}
      </div>
    </section>
  );
}

function LeadDetails({ lead, admins }: { lead: AdminLead; admins: AdminOption[] }) {
  return (
    <>
      <div className="flex flex-col gap-4 border-b border-border/80 pb-5 xl:flex-row xl:items-start xl:justify-between">
        <div className="min-w-0">
          <Badge variant="outline" className={statusBadgeClass(lead.status)}>
            {friendlyLabel(lead.status)}
          </Badge>
          <h2 className="mt-3 break-words font-heading text-2xl font-semibold text-foreground lg:text-3xl">{lead.name}</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Received {formattedDate(lead.createdAt)} via {displayLabel(lead.source)}
          </p>
        </div>
        <div className="flex shrink-0 flex-wrap gap-2">
          <ManageLeadDialog lead={lead} admins={admins} />
          <Button asChild variant="outline">
            <a href={`mailto:${lead.email}`}>
              <MailIcon className="size-4" />
              Email
            </a>
          </Button>
          {lead.phone ? (
            <Button asChild variant="outline">
              <a href={`tel:${lead.phone}`}>
                <PhoneIcon className="size-4" />
                Call
              </a>
            </Button>
          ) : null}
        </div>
      </div>

      <div className="grid min-w-0 gap-3 border-b border-border/80 py-5 md:grid-cols-3">
        <AdminInfoTile icon={MailIcon} label="Email" value={lead.email} />
        <AdminInfoTile icon={PhoneIcon} label="Phone" value={lead.phone || "Phone not shared"} />
        <AdminInfoTile icon={UserRoundIcon} label="Owner" value={lead.assignedTo?.name || "Unassigned"} />
      </div>

      <div className="grid min-w-0 gap-5 py-5 xl:grid-cols-[minmax(0,1.1fr)_minmax(280px,0.9fr)]">
        <div className="min-w-0">
          <p className="text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-muted-foreground">Customer message</p>
          <div className="mt-3 rounded-2xl border border-border/80 bg-background/70 p-5 text-sm leading-7 text-foreground">
            {lead.message}
          </div>
          <div className="mt-4 grid min-w-0 gap-3 text-sm md:grid-cols-2">
            <MetaBox label="Institute" value={lead.institute || "Not shared"} />
            <MetaBox label="Lead type" value={displayLabel(lead.leadType)} />
            <MetaBox label="CTA" value={lead.ctaLabel || "Not captured"} />
            <MetaBox label="Page" value={lead.pageUrl || "Not captured"} />
          </div>
        </div>
        <ActivityPanel lead={lead} />
      </div>
    </>
  );
}

function ActivityPanel({ lead }: { lead: AdminLead }) {
  return (
    <div className="min-w-0">
      <p className="text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-muted-foreground">Lead activity log</p>
      <div className="mt-3 grid max-h-[28rem] gap-3 overflow-y-auto rounded-2xl border border-border/80 bg-background/60 p-4">
        {lead.activities.length ? (
          lead.activities.map((activity) => (
            <div key={activity.id} className="rounded-xl border border-border/80 bg-card/80 p-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <Badge variant="outline" className={statusBadgeClass(activity.status)}>
                  {friendlyLabel(activity.status)}
                </Badge>
                <span className="text-xs text-muted-foreground">{formattedDate(activity.occurredAt)}</span>
              </div>
              <p className="mt-3 text-sm leading-6 text-foreground">{activity.note}</p>
              <p className="mt-3 text-xs text-muted-foreground">
                {displayLabel(activity.contactMethod)} · {activity.createdBy?.name || activity.createdBy?.email || "Admin"}
              </p>
            </div>
          ))
        ) : (
          <div className="rounded-xl border border-dashed p-6 text-center text-sm text-muted-foreground">
            No follow-up logged yet. Add the first conversation update.
          </div>
        )}
      </div>
    </div>
  );
}

function ManageLeadDialog({
  lead,
  admins,
}: {
  lead: AdminLead;
  admins: AdminOption[];
}) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <SendIcon className="size-4" />
          Manage lead
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[88vh] overflow-hidden p-0 sm:max-w-5xl">
        <DialogHeader className="border-b border-border/80 p-5 pr-12">
          <DialogTitle className="font-heading text-2xl font-semibold">Manage {lead.name}</DialogTitle>
          <DialogDescription>
            Log every conversation and keep lead status reliable for your team.
          </DialogDescription>
        </DialogHeader>
        <div className="grid max-h-[72vh] overflow-y-auto lg:grid-cols-[0.95fr_1fr]">
          <form action={manageLeadAction} className="grid gap-4 border-b border-border/80 p-5 lg:border-r lg:border-b-0">
            <input type="hidden" name="leadId" value={lead.id} />
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="grid gap-2">
                <Label>New status</Label>
                <Select name="status" defaultValue={lead.status}>
                  <SelectTrigger className="h-11 w-full bg-background">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    {leadStatuses.map((status) => (
                      <SelectItem key={status} value={status}>
                        {friendlyLabel(status)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label>Owner</Label>
                <Select name="assignedToId" defaultValue={lead.assignedToId || "unassigned"}>
                  <SelectTrigger className="h-11 w-full bg-background">
                    <SelectValue placeholder="Select owner" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="unassigned">Unassigned</SelectItem>
                    {admins.map((item) => (
                      <SelectItem key={item.id} value={item.id}>
                        {item.name || item.email}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="grid gap-2">
                <Label>Contact method</Label>
                <Select name="contactMethod" defaultValue="phone">
                  <SelectTrigger className="h-11 w-full bg-background">
                    <SelectValue placeholder="Select method" />
                  </SelectTrigger>
                  <SelectContent>
                    {contactMethods.map(([value, label]) => (
                      <SelectItem key={value} value={value}>
                        {label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor={`occurredAt-${lead.id}`}>Conversation time</Label>
                <Input id={`occurredAt-${lead.id}`} name="occurredAt" type="datetime-local" defaultValue={dateTimeLocal()} />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor={`note-${lead.id}`}>What happened?</Label>
              <Textarea
                id={`note-${lead.id}`}
                name="note"
                rows={6}
                placeholder="Example: Discussed pricing, shared demo link, customer wants a callback tomorrow."
                required
              />
            </div>
            <Button type="submit" size="lg">Save activity and status</Button>
          </form>
          <div className="p-5">
            <ActivityPanel lead={lead} />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
