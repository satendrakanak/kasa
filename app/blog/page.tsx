import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import type { Prisma } from "@prisma/client";
import {
  ArrowRight,
  BookOpenText,
  CalendarDays,
  Clock3,
  Search,
  Sparkles,
} from "lucide-react";
import { siteButtonClasses } from "@/components/site/site-button";
import { siteContainerClasses } from "@/components/site/site-container";
import {
  BreadcrumbStructuredData,
  ItemListStructuredData,
  WebPageStructuredData,
} from "@/components/site/structured-data";
import {
  articleDescription,
  articleHref,
  BLOG_BASE_PATH,
  formatArticleDate,
  getBlogTaxonomies,
  publishedArticleWhere,
  SITE_URL,
  type BlogArticle,
} from "@/lib/blog";
import { prisma } from "@/lib/admin/prisma";
import { tools } from "@/lib/tools";

export const dynamic = "force-dynamic";

type BlogSearchParams = Promise<{
  q?: string | string[];
  category?: string | string[];
  tag?: string | string[];
}>;

const blogTitle = "LMS, EdTech and Academy Growth Blog";
const blogDescription =
  "Read practical KASA guides on LMS operations, student tools, online course selling, academy growth, SEO, product workflows, and education technology.";

export async function generateMetadata({
  searchParams,
}: {
  searchParams: BlogSearchParams;
}): Promise<Metadata> {
  const params = await searchParams;
  const hasFilters = Boolean(
    firstValue(params.q).trim() ||
      firstValue(params.category).trim() ||
      firstValue(params.tag).trim(),
  );

  return {
    title: blogTitle,
    description: blogDescription,
    keywords: [
      "LMS blog",
      "education technology blog",
      "online academy growth",
      "course selling guides",
      "student tools",
    ],
    alternates: {
      canonical: `${SITE_URL}${BLOG_BASE_PATH}`,
    },
    robots: {
      index: !hasFilters,
      follow: true,
      googleBot: {
        index: !hasFilters,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
    openGraph: {
      title: `${blogTitle} | KASA`,
      description: blogDescription,
      url: `${SITE_URL}${BLOG_BASE_PATH}`,
      siteName: "KASA",
      locale: "en_IN",
      type: "website",
      images: [
        {
          url: "/kasa-hero.png",
          width: 1200,
          height: 630,
          alt: "KASA LMS, EdTech and academy growth blog",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${blogTitle} | KASA`,
      description: blogDescription,
      images: ["/kasa-hero.png"],
    },
  };
}

type BlogTaxonomyItem = {
  id: string;
  title: string;
  slug: string;
  _count?: { articles: number };
};

const db = prisma;

const blogSidebarTools = [
  "ai-resume-builder",
  "lesson-plan-generator",
  "question-paper-generator",
  "course-pricing-calculator",
]
  .map((slug) => tools.find((tool) => tool.slug === slug))
  .filter((tool): tool is NonNullable<typeof tool> => Boolean(tool));

function firstValue(value?: string | string[]) {
  return Array.isArray(value) ? value[0] ?? "" : value ?? "";
}

function searchHref(params: Record<string, string | undefined>) {
  const url = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value?.trim()) url.set(key, value.trim());
  });
  const query = url.toString();
  return query ? `${BLOG_BASE_PATH}?${query}` : BLOG_BASE_PATH;
}

function BlogCover({ article, priority = false }: { article: BlogArticle; priority?: boolean }) {
  if (!article.coverImage) {
    return (
      <div className="flex h-full min-h-52 items-center justify-center bg-gradient-to-br from-surface-muted to-surface-strong p-8 text-center">
        <div>
          <div className="mx-auto mb-4 flex size-12 items-center justify-center rounded-2xl bg-card text-primary shadow-sm">
            <BookOpenText className="size-6" />
          </div>
          <p className="text-xs font-semibold uppercase tracking-widest text-primary">
            KASA Blog
          </p>
          <p className="mt-2 text-base font-semibold text-foreground">
            {article.category?.title || "Education technology"}
          </p>
        </div>
      </div>
    );
  }

  return (
    <Image
      src={article.coverImage}
      alt={article.coverImageAlt || article.title}
      fill
      sizes={
        priority
          ? "(max-width: 767px) 100vw, (max-width: 1279px) 48vw, 36vw"
          : "(max-width: 767px) 100vw, (max-width: 1279px) 50vw, 33vw"
      }
      preload={priority}
      unoptimized
      className="h-full min-h-52 w-full object-cover transition duration-500 group-hover:scale-[1.02]"
    />
  );
}

function ArticleCard({ article, featured = false }: { article: BlogArticle; featured?: boolean }) {
  const tags = article.tags?.slice(0, featured ? 2 : 1) ?? [];

  return (
    <article
      className={
        featured
          ? "group grid overflow-hidden rounded-3xl border border-border bg-card text-card-foreground shadow-xl md:grid-cols-[0.9fr_1.1fr]"
          : "group flex h-full flex-col overflow-hidden rounded-3xl border border-border bg-card text-card-foreground shadow-lg transition duration-300 hover:-translate-y-1 hover:border-primary/35 hover:shadow-xl"
      }
    >
      <Link
        href={articleHref(article)}
        className={
          featured
            ? "relative min-h-72 overflow-hidden md:min-h-96"
            : "relative block aspect-[16/10] overflow-hidden"
        }
      >
        <BlogCover article={article} priority={featured} />
      </Link>
      <div
        className={
          featured
            ? "flex flex-col justify-center p-6 sm:p-8 lg:p-10"
            : "flex flex-1 flex-col p-5 sm:p-6"
        }
      >
        <div className="flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-widest text-primary">
          {article.category ? (
            <Link
              href={searchHref({ category: article.category.slug })}
              className="rounded-full bg-primary/10 px-3 py-1.5 transition hover:bg-primary/15"
            >
              {article.category.title}
            </Link>
          ) : (
            <span className="rounded-full bg-primary/10 px-3 py-1.5">Blog</span>
          )}
          {featured ? (
            <span className="rounded-full bg-primary/10 px-3 py-1.5 text-primary">
              Featured
            </span>
          ) : null}
        </div>
        <Link href={articleHref(article)} className="mt-4 block">
          <h2
            className={
              featured
                ? "font-heading text-2xl font-semibold leading-tight text-foreground"
                : "line-clamp-2 font-heading text-xl font-semibold leading-snug text-foreground"
            }
          >
            {article.title}
          </h2>
        </Link>
        <p
          className={
            featured
              ? "mt-4 line-clamp-3 text-base leading-7 text-muted-foreground"
              : "mt-3 line-clamp-2 text-sm leading-6 text-muted-foreground"
          }
        >
          {articleDescription(article)}
        </p>
        <div className="mt-5 flex flex-wrap items-center gap-4 text-sm font-medium text-muted-foreground">
          <span className="inline-flex items-center gap-2">
            <CalendarDays className="size-4 text-primary" />
            {formatArticleDate(article.publishedAt || article.updatedAt)}
          </span>
          <span className="inline-flex items-center gap-2">
            <Clock3 className="size-4 text-primary" />
            {article.readingTimeMinutes || 1} min read
          </span>
        </div>
        {tags.length ? (
          <div className="mt-4 flex flex-wrap gap-2">
            {tags.map(({ tag: item }) => (
              <Link
                key={item.id}
                href={searchHref({ tag: item.slug })}
                className="rounded-full border border-border bg-surface-muted px-3 py-1 text-xs font-medium text-muted-foreground transition hover:bg-accent hover:text-primary"
              >
                #{item.title}
              </Link>
            ))}
          </div>
        ) : null}
        <Link
          href={articleHref(article)}
          className="mt-auto inline-flex items-center gap-2 pt-6 text-sm font-semibold text-primary transition group-hover:gap-3"
        >
          Read article <ArrowRight className="size-4" />
        </Link>
      </div>
    </article>
  );
}

export default async function BlogPage({ searchParams }: { searchParams: BlogSearchParams }) {
  const params = await searchParams;
  const q = firstValue(params.q).trim();
  const category = firstValue(params.category).trim();
  const tag = firstValue(params.tag).trim();

  const andFilters: Prisma.ArticleWhereInput[] = [publishedArticleWhere()];
  if (q) {
    andFilters.push({
      OR: [
        { title: { contains: q, mode: "insensitive" } },
        { excerpt: { contains: q, mode: "insensitive" } },
        { content: { contains: q, mode: "insensitive" } },
        { seoDescription: { contains: q, mode: "insensitive" } },
      ],
    });
  }
  if (category) andFilters.push({ category: { slug: category } });
  if (tag) andFilters.push({ tags: { some: { tag: { slug: tag } } } });

  const where: Prisma.ArticleWhereInput = {
    status: "PUBLISHED",
    AND: andFilters,
  };

  const [taxonomies, articles] = await Promise.all([
    getBlogTaxonomies(),
    db.article.findMany({
      where,
      include: {
        category: true,
        tags: {
          include: { tag: true },
        },
      },
      orderBy: [{ featured: "desc" }, { publishedAt: "desc" }, { updatedAt: "desc" }],
      take: 48,
    }) as Promise<BlogArticle[]>,
  ]);
  const categories = taxonomies.categories as BlogTaxonomyItem[];
  const tags = taxonomies.tags as BlogTaxonomyItem[];
  const availableCategories = categories.filter(
    (item) => (item._count?.articles ?? 0) > 0,
  );
  const availableTags = tags.filter(
    (item) => (item._count?.articles ?? 0) > 0,
  );

  const featuredArticle = articles.find((article) => article.featured) ?? articles[0];
  const hasFilters = Boolean(q || category || tag);

  return (
    <>
      <BreadcrumbStructuredData
        items={[
          { name: "Home", href: "/" },
          { name: "Blog", href: BLOG_BASE_PATH },
        ]}
      />
      <WebPageStructuredData
        name="KASA Blog"
        description="Practical KASA articles for academies, students, trainers, and teams building better education workflows."
        href={BLOG_BASE_PATH}
      />
      <ItemListStructuredData
        name="Latest KASA blog articles"
        items={articles.map((article) => ({
          title: article.title,
          href: articleHref(article),
          description: articleDescription(article),
        }))}
      />

      <main className="bg-background text-foreground">
        <section className="relative overflow-hidden border-b border-border bg-gradient-to-br from-surface-muted via-background to-surface-strong">
          <div className="absolute -left-28 top-12 size-80 rounded-full bg-primary/10 blur-3xl" />
          <div className="absolute -right-24 bottom-0 size-96 rounded-full bg-primary/8 blur-3xl" />
          <div
            className={siteContainerClasses({
              className:
                "relative grid gap-10 pb-12 pt-36 lg:grid-cols-[0.7fr_1.3fr] lg:items-center lg:pb-16",
            })}
          >
            <div className="max-w-xl">
              <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-xs font-semibold uppercase tracking-widest text-primary shadow-sm">
                <Sparkles className="size-4" />
                KASA Blog
              </span>
              <h1 className="mt-6 font-heading text-3xl font-semibold leading-tight text-foreground sm:text-4xl">
                Ideas for better learning and smarter education businesses.
              </h1>
              <p className="mt-5 max-w-lg text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8">
                Helpful guides for educators, students and growing academies—on
                LMS operations, content, SEO and everyday product workflows.
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <a
                  href="#blog-list"
                  className={siteButtonClasses({ size: "md" })}
                >
                  Explore articles <ArrowRight className="size-4" />
                </a>
              </div>
            </div>

            {featuredArticle ? (
              <ArticleCard article={featuredArticle} featured />
            ) : (
              <div className="rounded-3xl border border-dashed border-border bg-card/80 p-10 text-center shadow-lg">
                <BookOpenText className="mx-auto size-8 text-primary" />
                <p className="mt-4 font-heading text-xl font-semibold text-foreground">
                  No published articles yet
                </p>
                <p className="mt-2 text-sm text-muted-foreground">
                  Published articles will appear here automatically.
                </p>
              </div>
            )}
          </div>
        </section>

        <section
          id="blog-list"
          className={siteContainerClasses({ className: "py-12 lg:py-16" })}
        >
          <div className="grid gap-8 lg:grid-cols-[18rem_minmax(0,1fr)] xl:grid-cols-[20rem_minmax(0,1fr)] xl:gap-10">
            <aside className="hidden self-start lg:sticky lg:top-28 lg:grid lg:gap-5">
              <div className="rounded-3xl border border-border bg-card p-5 text-card-foreground shadow-lg">
                <p className="text-xs font-semibold uppercase tracking-widest text-primary">
                  Browse the library
                </p>
                <h2 className="mt-2 font-heading text-2xl font-semibold text-foreground">
                  Find your next useful read
                </h2>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">
                  Explore practical content by subject or jump directly into a
                  free KASA tool.
                </p>

                {availableCategories.length ? (
                  <nav className="mt-5 grid gap-2" aria-label="Blog categories">
                    <Link
                      href={BLOG_BASE_PATH}
                      className="flex items-center justify-between rounded-2xl bg-primary/10 px-4 py-3 text-sm font-semibold text-primary transition hover:bg-primary/15"
                    >
                      <span>All articles</span>
                      <span>{articles.length}</span>
                    </Link>
                    {availableCategories.map((item) => (
                      <Link
                        key={item.id}
                        href={searchHref({ category: item.slug })}
                        className="flex items-center justify-between rounded-2xl border border-border px-4 py-3 text-sm font-medium text-foreground transition hover:border-primary/35 hover:bg-accent hover:text-primary"
                      >
                        <span>{item.title}</span>
                        <span className="text-xs text-muted-foreground">
                          {item._count?.articles ?? 0}
                        </span>
                      </Link>
                    ))}
                  </nav>
                ) : null}
              </div>

              <div className="rounded-3xl border border-border bg-[image:var(--promo-background)] p-5 text-promo-foreground shadow-xl">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-widest text-promo-muted">
                      Free KASA tools
                    </p>
                    <h3 className="mt-2 font-heading text-xl font-semibold">
                      Learn by doing
                    </h3>
                  </div>
                  <Sparkles className="size-6 text-promo-accent" />
                </div>
                <div className="mt-5 grid gap-2">
                  {blogSidebarTools.map((tool) => {
                    const Icon = tool.icon;
                    return (
                      <Link
                        key={tool.slug}
                        href={`/tools/${tool.slug}`}
                        className="group/tool flex items-center gap-3 rounded-2xl border border-promo-foreground/15 bg-promo-foreground/5 p-3 transition hover:border-promo-accent/45 hover:bg-promo-foreground/10"
                      >
                        <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-promo-accent/15 text-promo-accent">
                          <Icon className="size-4" />
                        </span>
                        <span className="min-w-0 flex-1 text-sm font-medium leading-5 text-promo-foreground">
                          {tool.title}
                        </span>
                        <ArrowRight className="size-4 shrink-0 text-promo-muted transition group-hover/tool:translate-x-0.5 group-hover/tool:text-promo-accent" />
                      </Link>
                    );
                  })}
                </div>
                <Link
                  href="/tools"
                  className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-promo-accent"
                >
                  View all tools <ArrowRight className="size-4" />
                </Link>
              </div>

              {availableTags.length ? (
                <div className="rounded-3xl border border-border bg-card p-5 text-card-foreground shadow-lg">
                  <h3 className="font-heading text-lg font-semibold text-foreground">
                    Popular topics
                  </h3>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {availableTags.slice(0, 8).map((item) => (
                      <Link
                        key={item.id}
                        href={searchHref({ tag: item.slug })}
                        className="rounded-full border border-border bg-surface-muted px-3 py-1.5 text-xs font-medium text-muted-foreground transition hover:border-primary/35 hover:bg-accent hover:text-primary"
                      >
                        #{item.title}
                      </Link>
                    ))}
                  </div>
                </div>
              ) : null}
            </aside>

            <div className="min-w-0">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest text-primary">
                    Knowledge library
                  </p>
                  <h2 className="mt-2 font-heading text-3xl font-semibold text-foreground">
                    Latest articles
                  </h2>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {articles.length}{" "}
                    {articles.length === 1 ? "article" : "articles"}
                    {hasFilters
                      ? " match your filters"
                      : " available to explore"}
                    .
                  </p>
                </div>
                {hasFilters ? (
                  <Link
                    href={BLOG_BASE_PATH}
                    className="text-sm font-semibold text-primary transition hover:text-primary-hover"
                  >
                    Clear all filters
                  </Link>
                ) : null}
              </div>

              <form
                action={BLOG_BASE_PATH}
                className="mt-7 rounded-3xl border border-border bg-card p-3 shadow-lg"
              >
                <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-[minmax(0,1fr)_12rem_12rem_auto]">
                  <label className="relative block md:col-span-2 xl:col-span-1">
                    <span className="sr-only">Search articles</span>
                    <Search className="absolute left-4 top-1/2 size-5 -translate-y-1/2 text-primary" />
                    <input
                      name="q"
                      defaultValue={q}
                      placeholder="Search articles or topics"
                      className="h-12 w-full rounded-2xl border border-border bg-background pl-12 pr-4 text-sm font-medium text-foreground outline-none transition placeholder:text-muted-foreground focus:border-primary focus:ring-4 focus:ring-primary/10"
                    />
                  </label>
                  <label>
                    <span className="sr-only">Filter by category</span>
                    <select
                      name="category"
                      defaultValue={category}
                      className="h-12 w-full rounded-2xl border border-border bg-background px-4 text-sm font-medium text-foreground outline-none transition focus:border-primary focus:ring-4 focus:ring-primary/10"
                    >
                      <option value="">All categories</option>
                      {availableCategories.map((item) => (
                        <option key={item.id} value={item.slug}>
                          {item.title}
                        </option>
                      ))}
                    </select>
                  </label>
                  <label>
                    <span className="sr-only">Filter by tag</span>
                    <select
                      name="tag"
                      defaultValue={tag}
                      className="h-12 w-full rounded-2xl border border-border bg-background px-4 text-sm font-medium text-foreground outline-none transition focus:border-primary focus:ring-4 focus:ring-primary/10"
                    >
                      <option value="">All tags</option>
                      {availableTags.map((item) => (
                        <option key={item.id} value={item.slug}>
                          {item.title}
                        </option>
                      ))}
                    </select>
                  </label>
                  <button
                    type="submit"
                    className={siteButtonClasses({
                      size: "md",
                      className: "h-12 justify-center text-primary-foreground",
                    })}
                  >
                    <Search className="size-4" />
                    Search
                  </button>
                </div>
              </form>

              {articles.length ? (
                <div className="mt-8 grid gap-6 md:grid-cols-2">
                  {articles.map((article) => (
                    <ArticleCard key={article.id} article={article} />
                  ))}
                </div>
              ) : (
                <div className="mt-8 rounded-3xl border border-dashed border-border bg-card p-10 text-center">
                  <p className="font-heading text-xl font-semibold text-foreground">
                    No matching articles
                  </p>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Try removing filters or searching with another keyword.
                  </p>
                </div>
              )}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
