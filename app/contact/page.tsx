import type { Metadata } from "next";
import { CompanyPageTemplate } from "@/components/site/company-page-template";
import companyContent from "@/lib/company-page-content.json";

export const metadata: Metadata = {
  title: "Contact KASA | Book LMS Demo for Your Academy",
  description:
    "Contact KASA to discuss LMS software for coaching institutes, online academies, trainers, and EdTech teams.",
  alternates: {
    canonical: "/contact",
  },
};

export default function ContactPage() {
  return (
    <CompanyPageTemplate
      {...companyContent.contact}
      contactMode
      pathname="/contact"
    />
  );
}
