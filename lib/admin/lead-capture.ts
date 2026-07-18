import { z } from "zod";
import {
  renderLeadConfirmationEmail,
  renderLeadNotificationEmail,
} from "@/lib/email/templates";
import { prisma } from "@/lib/admin/prisma";

const resendEndpoint = "https://api.resend.com/emails";

export const publicLeadSchema = z.object({
  name: z.string().trim().min(2).max(160),
  email: z.string().trim().email().max(220),
  institute: z.string().trim().max(180).optional().or(z.literal("")),
  phone: z.string().trim().max(60).optional().or(z.literal("")),
  message: z.string().trim().min(3).max(4000),
  source: z.string().trim().min(2).max(120).default("marketing-site"),
  leadType: z.string().trim().max(80).optional().or(z.literal("")),
  ctaLabel: z.string().trim().max(160).optional().or(z.literal("")),
  pageUrl: z.string().trim().max(1000).optional().or(z.literal("")),
  demoUrl: z.string().trim().max(1000).optional().or(z.literal("")),
  demoExpiresAt: z.string().trim().optional().or(z.literal("")),
});

export type PublicLeadInput = z.infer<typeof publicLeadSchema>;

type EmailPayload = {
  to: string;
  subject: string;
  html: string;
  text: string;
};

function getLeadType(input: PublicLeadInput) {
  return input.leadType?.trim() || "enquiry";
}

async function sendEmail(payload: EmailPayload) {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  const from = process.env.LEADS_FROM_EMAIL?.trim();

  if (!apiKey || !from) {
    return false;
  }

  const response = await fetch(resendEndpoint, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: payload.to,
      subject: payload.subject,
      html: payload.html,
      text: payload.text,
    }),
    cache: "no-store",
  });

  if (!response.ok) {
    const body = await response.text().catch(() => "");
    console.warn("[lead-email] send failed", {
      status: response.status,
      to: payload.to,
      body,
    });
    return false;
  }

  return true;
}

async function sendLeadEmails(input: PublicLeadInput) {
  const leadType = getLeadType(input);
  const adminEmail = process.env.LEADS_NOTIFICATION_EMAIL?.trim();
  const sent: boolean[] = [];

  if (adminEmail) {
    const email = renderLeadNotificationEmail({
      leadType,
      name: input.name,
      email: input.email,
      phone: input.phone,
      institute: input.institute,
      message: input.message,
      source: input.source,
      ctaLabel: input.ctaLabel,
      pageUrl: input.pageUrl,
      demoUrl: input.demoUrl,
    });

    sent.push(
      await sendEmail({
        to: adminEmail,
        subject: `New KASA ${leadType} lead: ${input.name}`,
        html: email.html,
        text: email.text,
      }),
    );
  }

  const confirmationEmail = renderLeadConfirmationEmail({
    name: input.name,
    leadType,
    demoUrl: input.demoUrl,
    demoExpiresAt: input.demoExpiresAt,
  });

  sent.push(
    await sendEmail({
      to: input.email,
      subject: input.demoUrl ? "Your KASA demo is ready" : "We received your KASA enquiry",
      html: confirmationEmail.html,
      text: confirmationEmail.text,
    }),
  );

  return sent.some(Boolean);
}

export async function createPublicLead(input: PublicLeadInput) {
  const leadType = getLeadType(input);
  const demoExpiresAt = input.demoExpiresAt ? new Date(input.demoExpiresAt) : null;
  const emailSent = await sendLeadEmails(input).catch((error) => {
    console.warn("[lead-email] request failed", error);
    return false;
  });

  return prisma.lead.create({
    data: {
      name: input.name,
      email: input.email.toLowerCase(),
      institute: input.institute || null,
      phone: input.phone || null,
      message: input.message,
      source: input.source,
      leadType,
      ctaLabel: input.ctaLabel || null,
      pageUrl: input.pageUrl || null,
      demoUrl: input.demoUrl || null,
      demoExpiresAt:
        demoExpiresAt && !Number.isNaN(demoExpiresAt.getTime())
          ? demoExpiresAt
          : null,
      emailedAt: emailSent ? new Date() : null,
    },
  });
}
