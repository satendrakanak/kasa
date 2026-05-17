import { notFound } from "next/navigation";
import { SeoPageTemplate } from "@/components/site/seo-page-template";
import { comparisonPages, getComparisonPage } from "@/lib/site-content";
import { pageMetadata } from "@/lib/seo";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return comparisonPages.map((page) => ({ slug: page.slug }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const page = getComparisonPage(slug);
  if (!page) return {};

  return pageMetadata(page, `/compare/${slug}`);
}

export default async function ComparePage({ params }: PageProps) {
  const { slug } = await params;
  const page = getComparisonPage(slug);
  if (!page) notFound();

  return <SeoPageTemplate page={page} />;
}
