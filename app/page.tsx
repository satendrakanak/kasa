import LandingHero from "@/components/landing-hero";
import ProductFeaturesSection from "@/components/product-features";
import {
  FaqSection,
  PlatformSection,
  PricingSection,
  SiteFooter,
  TestimonialsSection,
} from "@/components/landing-sections";
import { HowItWorksSection } from "@/components/home-sections/how-it-works-section";

export default function Home() {
  const softwareJsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "KASA",
    applicationCategory: "EducationalApplication",
    operatingSystem: "Web",
    url: "https://getkasa.in",
    description:
      "All-in-one LMS software for coaching institutes, online academies, trainers, and EdTech teams.",
    offers: {
      "@type": "AggregateOffer",
      priceCurrency: "USD",
      lowPrice: "49",
      offerCount: "3",
    },
    featureList: [
      "Branded academy website",
      "Online course selling platform",
      "Live class management",
      "Student and faculty dashboards",
      "Payments, coupons, invoices, and orders",
      "Exams, assignments, certificates, and learner progress",
      "Education CRM and lead management",
    ],
    brand: {
      "@type": "Brand",
      name: "KASA",
      url: "https://getkasa.in",
    },
  };

  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "KASA",
    url: "https://getkasa.in",
    logo: "https://getkasa.in/kasa-logo-dark.png",
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "sales",
      email: "support@getkasa.in",
      telephone: "+91-8979-791615",
      areaServed: "IN",
    },
  };

  return (
    <div className="relative z-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
      />
      <LandingHero />
      <PlatformSection />
      <ProductFeaturesSection />
      <TestimonialsSection />
      <HowItWorksSection />
      <PricingSection />
      <FaqSection />
      <SiteFooter />
    </div>
  );
}
