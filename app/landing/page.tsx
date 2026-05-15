import LandingHero from "@/components/landing-hero";
import ProductFeaturesSection from "@/components/product-features";
import {
  FaqSection,
  PlatformSection,
  PricingSection,
  TestimonialsSection,
} from "@/components/landing-sections";
import { HowItWorksSection } from "@/components/home-sections/how-it-works-section";

export const metadata = {
  title: "KASA Landing Page | Online Academy LMS Demo",
  description:
    "Campaign landing page for KASA, the LMS software for coaching institutes, online academies, trainers, and EdTech teams.",
  alternates: {
    canonical: "/landing",
  },
};

export default function LandingPage() {
  return (
    <div className="relative z-10">
      <LandingHero />
      <PlatformSection />
      <ProductFeaturesSection />
      <TestimonialsSection />
      <HowItWorksSection />
      <PricingSection />
      <FaqSection />
    </div>
  );
}
