import type { Metadata } from "next";
import { CompanyPageTemplate } from "@/components/site/company-page-template";
import companyContent from "@/lib/company-page-content.json";

export const metadata: Metadata = {
  title: "About KASA | Online Academy LMS Software",
  description:
    "Learn about KASA, the LMS software platform for coaching institutes, online academies, trainers, and EdTech teams.",
  alternates: {
    canonical: "/about",
  },
};

export default function AboutPage() {
  return (
    <CompanyPageTemplate
      {...companyContent.about}
      pathname="/about"
    />
  );
}
