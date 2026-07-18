"use server";

import { LeadStatus } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/admin/auth";
import { prisma } from "@/lib/admin/prisma";
import {
  leadAssignmentSchema,
  leadManageSchema,
  leadStatusUpdateSchema,
} from "@/schemas/admin/leads";
import { formObject } from "@/actions/admin/action-utils";

export async function assignLeadAction(formData: FormData) {
  await requireAdmin();
  const parsed = leadAssignmentSchema.parse(formObject(formData));

  await prisma.lead.update({
    where: { id: parsed.leadId },
    data: { assignedToId: parsed.assignedToId || null },
  });

  revalidatePath("/admin");
  revalidatePath("/admin/leads");
}

export async function updateLeadStatusAction(formData: FormData) {
  await requireAdmin();
  const parsed = leadStatusUpdateSchema.parse(formObject(formData));

  await prisma.lead.update({
    where: { id: parsed.leadId },
    data: { status: parsed.status as LeadStatus },
  });

  revalidatePath("/admin");
  revalidatePath("/admin/leads");
}

export async function manageLeadAction(formData: FormData) {
  const admin = await requireAdmin();
  const parsed = leadManageSchema.parse(formObject(formData));
  const occurredAt = new Date(parsed.occurredAt);

  await prisma.$transaction([
    prisma.lead.update({
      where: { id: parsed.leadId },
      data: {
        status: parsed.status as LeadStatus,
        assignedToId: parsed.assignedToId && parsed.assignedToId !== "unassigned" ? parsed.assignedToId : null,
        notes: parsed.note.trim(),
      },
    }),
    prisma.leadActivity.create({
      data: {
        leadId: parsed.leadId,
        status: parsed.status as LeadStatus,
        contactMethod: parsed.contactMethod,
        note: parsed.note.trim(),
        occurredAt: Number.isNaN(occurredAt.getTime()) ? new Date() : occurredAt,
        createdById: admin.id,
      },
    }),
  ]);

  revalidatePath("/admin");
  revalidatePath("/admin/leads");
}
