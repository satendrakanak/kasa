import { InterviewStatus } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/admin/prisma";

const VIEW_WINDOW_SECONDS = 60 * 60 * 24;

type InterviewViewRouteProps = {
  params: Promise<{ id: string }>;
};

export async function POST(
  request: NextRequest,
  { params }: InterviewViewRouteProps,
) {
  const { id } = await params;

  if (!/^[a-zA-Z0-9_-]{1,64}$/.test(id)) {
    return NextResponse.json({ error: "Invalid question" }, { status: 400 });
  }

  const question = await prisma.interviewQuestion.findFirst({
    where: { id, status: InterviewStatus.PUBLISHED },
    select: { id: true, viewCount: true },
  });

  if (!question) {
    return NextResponse.json({ error: "Question not found" }, { status: 404 });
  }

  const cookieName = `kasa_interview_view_${question.id}`;
  const isRepeatView = request.cookies.has(cookieName);
  let viewCount = question.viewCount;

  if (!isRepeatView) {
    const updated = await prisma.interviewQuestion.update({
      where: { id: question.id },
      data: { viewCount: { increment: 1 } },
      select: { viewCount: true },
    });
    viewCount = updated.viewCount;
  }

  const response = NextResponse.json(
    { viewCount, counted: !isRepeatView },
    { headers: { "Cache-Control": "no-store" } },
  );

  response.cookies.set(cookieName, "1", {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: VIEW_WINDOW_SECONDS,
  });

  return response;
}
