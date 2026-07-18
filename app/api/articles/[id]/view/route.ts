import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/admin/prisma";

const VIEW_WINDOW_SECONDS = 60 * 60 * 24;

type ArticleViewRouteProps = {
  params: Promise<{ id: string }>;
};

export async function POST(
  request: NextRequest,
  { params }: ArticleViewRouteProps,
) {
  const { id } = await params;

  if (!/^[a-zA-Z0-9_-]{1,64}$/.test(id)) {
    return NextResponse.json({ error: "Invalid article" }, { status: 400 });
  }

  const article = await prisma.article.findFirst({
    where: {
      id,
      status: "PUBLISHED",
      OR: [{ publishedAt: null }, { publishedAt: { lte: new Date() } }],
    },
    select: { id: true, viewCount: true },
  });

  if (!article) {
    return NextResponse.json({ error: "Article not found" }, { status: 404 });
  }

  const cookieName = `kasa_article_view_${article.id}`;
  let viewCount = article.viewCount;
  const isRepeatView = request.cookies.has(cookieName);

  if (!isRepeatView) {
    const updated = await prisma.article.update({
      where: { id: article.id },
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
