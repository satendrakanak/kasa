import { NextResponse } from "next/server";
import { ZodError } from "zod";
import { createPublicLead, publicLeadSchema } from "@/lib/admin/lead-capture";

export const dynamic = "force-dynamic";

type DemoTourPayload = {
  firstName?: string;
  lastName?: string;
  email?: string;
  phoneNumber?: string;
  businessName?: string;
  useCase?: string;
  leadType?: string;
  ctaLabel?: string;
  pageUrl?: string;
};

export async function POST(request: Request) {
  try {
    const payload = (await request.json()) as DemoTourPayload;
    const name = [payload.firstName, payload.lastName]
      .filter(Boolean)
      .join(" ")
      .trim();
    const useCase = payload.useCase?.trim();
    const message = [
      useCase || "Requested a guided KASA product demo.",
      "",
      "Lead type: demo",
      `CTA: ${payload.ctaLabel || "Take a Tour"}`,
      payload.pageUrl ? `Page: ${payload.pageUrl}` : null,
      "Follow-up: Contact the lead to schedule a guided demo.",
    ]
      .filter(Boolean)
      .join("\n");

    const lead = await createPublicLead(
      publicLeadSchema.parse({
        name,
        email: payload.email,
        institute: payload.businessName || "",
        phone: payload.phoneNumber || "",
        message,
        source: "demo-tour",
        leadType: payload.leadType || "demo",
        ctaLabel: payload.ctaLabel || "Take a Tour",
        pageUrl: payload.pageUrl || "",
      }),
    );

    return NextResponse.json({
      success: true,
      id: lead.id,
      message: "Demo request received. Our team will contact you shortly.",
    });
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json(
        {
          success: false,
          message: "Please check the form details and try again.",
          issues: error.issues,
        },
        { status: 400 },
      );
    }

    console.warn("[demo-tour] lead capture failed", error);
    return NextResponse.json(
      {
        success: false,
        message: "Unable to submit your demo request right now. Please try again.",
      },
      { status: 500 },
    );
  }
}
