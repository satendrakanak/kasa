import { z } from "zod";

export const articleStatuses = ["DRAFT", "REVIEW", "SCHEDULED", "PUBLISHED", "ARCHIVED"] as const;
export const articleSchemaTypes = ["Article", "BlogPosting", "NewsArticle", "TechArticle", "HowTo"] as const;

const formBoolean = z.preprocess((value) => value === true || value === "true" || value === "on", z.boolean());

export const articleSchema = z.object({
  id: z.string().optional(),
  title: z.string().trim().min(2).max(180),
  slug: z.string().trim().max(190).optional(),
  excerpt: z.string().trim().max(340).optional(),
  content: z.string().trim().min(80),
  status: z.enum(articleStatuses),
  categoryTitle: z.string().trim().min(2).max(90),
  categoryDescription: z.string().trim().max(260).optional(),
  tags: z.string().trim().max(600).optional(),
  authorName: z.string().trim().max(90).optional(),
  coverImage: z.string().trim().max(1000).optional(),
  coverImageAlt: z.string().trim().max(180).optional(),
  featured: formBoolean.default(false),
  allowIndexing: formBoolean.default(true),
  focusKeyword: z.string().trim().max(100).optional(),
  seoTitle: z.string().trim().max(70).optional(),
  seoDescription: z.string().trim().max(170).optional(),
  canonicalUrl: z.string().trim().max(1000).optional(),
  ogTitle: z.string().trim().max(90).optional(),
  ogDescription: z.string().trim().max(220).optional(),
  ogImage: z.string().trim().max(1000).optional(),
  schemaType: z.enum(articleSchemaTypes).default("Article"),
  faqs: z.string().trim().max(12000).optional(),
  scheduledAt: z.string().trim().optional(),
});

export const articleDraftSchema = z.object({
  title: z.string().trim().min(2).max(180),
  slug: z.string().trim().max(190).optional(),
  categoryTitle: z.string().trim().min(2).max(90).optional(),
});

export const articleContentSchema = z.object({
  id: z.string().min(1),
  title: z.string().trim().min(2).max(180),
  slug: z.string().trim().max(190).optional(),
  excerpt: z.string().trim().max(340).optional(),
  content: z.string().trim().min(20),
});

export const articlePresentationSchema = z.object({
  id: z.string().min(1),
  categoryTitle: z.string().trim().min(2).max(90),
  categoryDescription: z.string().trim().max(260).optional(),
  tags: z.string().trim().max(600).optional(),
  coverImage: z.string().trim().max(1000).optional(),
  coverImageAlt: z.string().trim().max(180).optional(),
});

export const articleSeoSchema = z.object({
  id: z.string().min(1),
  slug: z.string().trim().min(1).max(190),
  allowIndexing: formBoolean.default(true),
  focusKeyword: z.string().trim().max(100).optional(),
  seoTitle: z.string().trim().max(70).optional(),
  seoDescription: z.string().trim().max(170).optional(),
  canonicalUrl: z.string().trim().max(1000).optional(),
  ogTitle: z.string().trim().max(90).optional(),
  ogDescription: z.string().trim().max(220).optional(),
  ogImage: z.string().trim().max(1000).optional(),
  schemaType: z.enum(articleSchemaTypes).default("Article"),
  faqs: z.string().trim().max(12000).optional(),
});

export const articlePublishingSchema = z
  .object({
    id: z.string().min(1),
    status: z.enum(articleStatuses),
    scheduledAt: z.string().trim().optional(),
  })
  .superRefine((value, context) => {
    if (value.status !== "SCHEDULED") return;
    const scheduledAt = value.scheduledAt ? new Date(value.scheduledAt) : null;
    if (!scheduledAt || Number.isNaN(scheduledAt.getTime())) {
      context.addIssue({
        code: "custom",
        path: ["scheduledAt"],
        message: "Choose a valid schedule date and time.",
      });
      return;
    }
    if (scheduledAt.getTime() <= Date.now()) {
      context.addIssue({
        code: "custom",
        path: ["scheduledAt"],
        message: "Schedule date must be in the future.",
      });
    }
  });

export const articleFeaturedSchema = z.object({
  id: z.string().min(1),
  featured: formBoolean.default(false),
});

export const deleteArticleSchema = z.object({
  id: z.string().min(1),
});

export const articleCategorySchema = z.object({
  title: z.string().trim().min(2).max(90),
  slug: z.string().trim().max(110).optional(),
  description: z.string().trim().max(260).optional(),
  seoTitle: z.string().trim().max(70).optional(),
  seoDescription: z.string().trim().max(170).optional(),
});

export const articleCategoryUpdateSchema = articleCategorySchema.extend({
  id: z.string().min(1),
  isActive: formBoolean.default(true),
});

export const articleTagSchema = z.object({
  title: z.string().trim().min(2).max(90),
  slug: z.string().trim().max(110).optional(),
  description: z.string().trim().max(260).optional(),
});

export const articleTagUpdateSchema = articleTagSchema.extend({
  id: z.string().min(1),
});

export const articleTaxonomyDeleteSchema = z.object({
  id: z.string().min(1),
});
