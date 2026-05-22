import type { MetadataRoute } from "next";
import { allSeoPages } from "@/lib/site-content";

const SITE_URL = "https://www.getkasa.in";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: `${SITE_URL}/`,
      lastModified,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${SITE_URL}/features`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.92,
    },
    {
      url: `${SITE_URL}/solutions`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.92,
    },
    {
      url: `${SITE_URL}/compare`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.78,
    },
    {
      url: `${SITE_URL}/resources`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.86,
    },
    {
      url: `${SITE_URL}/tools`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/tools/attendance-calculator`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/tools/resume-ats-checker`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/tools/marks-percentage-calculator`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/tools/gpa-calculator`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/tools/grade-calculator`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/tools/final-exam-calculator`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/tools/study-timetable-generator`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/tools/scholarship-eligibility-calculator`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/tools/study-hours-calculator`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/tools/assignment-deadline-planner`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/tools/exam-score-goal-planner`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/tools/cgpa-percentage-converter`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/tools/board-percentage-calculator`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/tools/question-paper-generator`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/tools/quiz-generator`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/tools/lesson-plan-generator`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/tools/worksheet-generator`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/tools/report-card-generator`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/tools/assignment-generator`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/tools/course-pricing-calculator`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/tools/profit-calculator`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/tools/fee-receipt-generator`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/tools/admission-form-generator`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/tools/batch-capacity-calculator`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/tools/certificate-generator`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/pricing`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.82,
    },
    {
      url: `${SITE_URL}/why-kasa`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.82,
    },
    {
      url: `${SITE_URL}/about`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.72,
    },
    {
      url: `${SITE_URL}/contact`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.82,
    },
    {
      url: `${SITE_URL}/testimonials`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.78,
    },
    {
      url: `${SITE_URL}/faq`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.78,
    },
    {
      url: `${SITE_URL}/terms`,
      lastModified,
      changeFrequency: "yearly",
      priority: 0.35,
    },
    {
      url: `${SITE_URL}/privacy`,
      lastModified,
      changeFrequency: "yearly",
      priority: 0.35,
    },
    {
      url: `${SITE_URL}/cookies`,
      lastModified,
      changeFrequency: "yearly",
      priority: 0.35,
    },
  ];

  return [
    ...staticPages,
    ...allSeoPages.map((page) => ({
      url: `${SITE_URL}${page.href}`,
      lastModified,
      changeFrequency: page.group === "Resources" ? "monthly" : "weekly",
      priority: page.group === "Features" || page.group === "Solutions" ? 0.88 : 0.78,
    }) satisfies MetadataRoute.Sitemap[number]),
  ];
}
