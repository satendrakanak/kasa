import type { Metadata } from "next";
import { CompanyPageTemplate } from "@/components/site/company-page-template";
import companyContent from "@/lib/company-page-content.json";

export const metadata: Metadata = {
  title: "Why KASA? LMS Software Built for Coaching Institutes",
  description:
    "See why KASA is a better LMS choice for coaching institutes, academies, trainers, and EdTech teams that need one branded platform.",
  alternates: {
    canonical: "/why-kasa",
  },
};

export default function WhyKasaPage() {
  return (
    <CompanyPageTemplate
      {...companyContent.whyKasa}
      pathname="/why-kasa"
    />
  );
}
