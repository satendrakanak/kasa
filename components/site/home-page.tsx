import { DeliveryModelsSection } from "@/components/site/delivery-models-section";
import { FaqSection } from "@/components/site/faq-section";
import { FeatureShowcaseSection } from "@/components/site/feature-showcase-section";
import { HomeHero } from "@/components/site/home-hero";
import { InfrastructureSection } from "@/components/site/infrastructure-section";
import { ProductArchitectureSection } from "@/components/site/product-architecture-section";
import { RelatedToolsBlock } from "@/components/site/related-tools-block";
import { SolutionsSection } from "@/components/site/solutions-section";
import { TestimonialsSection } from "@/components/site/testimonials-section";
import { TrustedLogoStrip } from "@/components/site/trusted-logo-strip";
import { WhyKasaSection } from "@/components/site/why-kasa-section";

export function HomePage() {
  const leadsEndpoint =
    process.env.NEXT_PUBLIC_LEADS_API_URL ?? "http://localhost:5000/api/v1/leads";

  return (
    <>
      <HomeHero leadsEndpoint={leadsEndpoint} />
      <TrustedLogoStrip />
      <ProductArchitectureSection />
      <RelatedToolsBlock
        context="home"
        title="Free AI tools and calculators built around real academy workflows."
        description="Students can plan studies and careers, teachers can generate classroom material, and academy owners can calculate fees, receipts, certificates, and growth numbers from one place."
        limit={8}
      />
      <DeliveryModelsSection />
      <FeatureShowcaseSection />
      <InfrastructureSection />
      <SolutionsSection />
      <WhyKasaSection />
      <TestimonialsSection />
      <FaqSection />
    </>
  );
}
