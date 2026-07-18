import { z } from "zod";

export const leadAssignmentSchema = z.object({
  leadId: z.string().min(1),
  assignedToId: z.string().optional(),
});

export const leadStatusUpdateSchema = z.object({
  leadId: z.string().min(1),
  status: z.enum(["NEW", "CONTACTED", "QUALIFIED", "WON", "CLOSED"]),
});

export const leadManageSchema = z.object({
  leadId: z.string().min(1),
  status: z.enum(["NEW", "CONTACTED", "QUALIFIED", "WON", "CLOSED"]),
  assignedToId: z.string().optional(),
  contactMethod: z.enum(["phone", "email", "whatsapp", "demo", "meeting", "note"]),
  occurredAt: z.string().min(1),
  note: z.string().min(3).max(1200),
});
