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
  return (
    <div className="relative z-10">
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
