import LandingHero from "@/components/landing-hero";
import ProductFeaturesSection from "@/components/product-features";
import {
  FaqSection,
  PlatformSection,
  PricingSection,
  SiteFooter,
} from "@/components/landing-sections";
import { HowItWorksSection } from "@/components/home-sections/how-it-works-section";

export default function Home() {
  return (
    <main className="relative isolate min-h-screen bg-background text-foreground selection:bg-primary/20">
      <div className="relative z-10">
        <LandingHero />
        <PlatformSection />
        <ProductFeaturesSection />
        <HowItWorksSection />
        <PricingSection />
        <FaqSection />
        <SiteFooter />
      </div>
    </main>
  );
}
