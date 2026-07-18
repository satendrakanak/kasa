import { NextResponse } from "next/server";
import { ZodError } from "zod";
import { createPublicLead, publicLeadSchema } from "@/lib/admin/lead-capture";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    const payload = publicLeadSchema.parse(await request.json());
    const lead = await createPublicLead(payload);

    return NextResponse.json({
      success: true,
      id: lead.id,
      emailed: Boolean(lead.emailedAt),
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

    console.warn("[leads] capture failed", error);
    return NextResponse.json(
      {
        success: false,
        message: "Unable to submit your enquiry right now.",
      },
      { status: 500 },
    );
  }
}
