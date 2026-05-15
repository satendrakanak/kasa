import { HomePage } from "@/components/site/home-page";
import { primaryKeywords } from "@/lib/site-content";

export default function Home() {
  const softwareJsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "KASA",
    applicationCategory: "EducationalApplication",
    operatingSystem: "Web",
    url: "https://www.getkasa.in",
    description:
      "All-in-one LMS software for coaching institutes, online academies, trainers, and EdTech teams.",
    offers: {
      "@type": "AggregateOffer",
      priceCurrency: "USD",
      offerCount: "3",
    },
    featureList: primaryKeywords,
    brand: {
      "@type": "Brand",
      name: "KASA",
      url: "https://www.getkasa.in",
    },
  };

  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "KASA",
    url: "https://www.getkasa.in",
    logo: "https://www.getkasa.in/kasa-logo-dark.png",
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "sales",
      email: "support@getkasa.in",
      telephone: "+91-8979-791615",
      areaServed: "IN",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
      />
      <HomePage />
    </>
  );
}
