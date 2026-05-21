import { Building2, GraduationCap, Landmark, Sparkles } from "lucide-react";
import {
  SiCanva,
  SiCoursera,
  SiGoogle,
  SiHubspot,
  SiNotion,
  SiShopify,
  SiSlack,
  SiStripe,
  SiUdemy,
  SiZoom,
} from "react-icons/si";
import type { IconType } from "react-icons";
import { siteContainerClasses } from "@/components/site/site-container";

const trustedBrands = [
  { name: "Google", icon: SiGoogle, color: "text-[#4285F4]" },
  { name: "Microsoft", mark: "M", color: "text-[#5E5E5E]" },
  { name: "Zoom", icon: SiZoom, color: "text-[#0B5CFF]" },
  { name: "Slack", icon: SiSlack, color: "text-[#4A154B]" },
  { name: "Stripe", icon: SiStripe, color: "text-[#635BFF]" },
  { name: "Shopify", icon: SiShopify, color: "text-[#7AB55C]" },
  { name: "Notion", icon: SiNotion, color: "text-[#000000]" },
  { name: "Udemy", icon: SiUdemy, color: "text-[#A435F0]" },
  { name: "Coursera", icon: SiCoursera, color: "text-[#0056D2]" },
  { name: "Canva", icon: SiCanva, color: "text-[#00C4CC]" },
  { name: "HubSpot", icon: SiHubspot, color: "text-[#FF7A59]" },
  { name: "Teachable", mark: "T", color: "text-[#21CD9C]" },
] satisfies Array<{ name: string; icon?: IconType; mark?: string; color: string }>;

const trustedStats = [
  { value: "250K+", label: "Learners managed", icon: GraduationCap },
  { value: "18K+", label: "Courses delivered", icon: Building2 },
  { value: "₹12Cr+", label: "Course sales tracked", icon: Landmark },
];

export function TrustedLogoStrip() {
  const marqueeBrands = [...trustedBrands, ...trustedBrands];

  return (
    <section className="border-y border-blue-950/8 bg-white py-12 dark:border-white/10 dark:bg-surface">
      <div className={siteContainerClasses()}>
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-950/10 bg-blue-50 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-primary dark:border-primary/25 dark:bg-primary/10">
            <Sparkles className="size-3.5" />
            Growing academy network
          </div>
          <h2 className="mt-4 font-heading text-2xl font-semibold tracking-normal text-slate-950 sm:text-3xl dark:text-white">
            Trusted by 1,000+ course businesses, coaching teams, and training brands.
          </h2>
          <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-muted">
            KASA gives academies one connected workspace for selling courses,
            managing learners, running live classes, and tracking growth.
          </p>
        </div>

        <div className="relative mt-9 overflow-hidden py-2 [mask-image:linear-gradient(90deg,transparent,black_8%,black_92%,transparent)]">
          <div className="logo-marquee flex w-max gap-3">
            {marqueeBrands.map((brand, index) => {
              const BrandIcon = brand.icon;

              return (
              <div
                key={`${brand.name}-${index}`}
                className="group flex min-h-24 w-52 shrink-0 items-center justify-center rounded-[1.25rem] border border-blue-950/10 bg-gradient-to-br from-white to-blue-50/70 px-5 text-center shadow-sm shadow-blue-950/5 transition hover:-translate-y-1 hover:border-primary/30 hover:shadow-lg hover:shadow-blue-950/10 dark:border-white/10 dark:from-white/[0.05] dark:to-white/[0.02]"
              >
                <div className="flex items-center gap-3">
                  <span
                    aria-hidden="true"
                    className="grid size-11 place-items-center rounded-2xl border border-blue-950/10 bg-white shadow-sm shadow-blue-950/10 transition duration-300 group-hover:scale-110 dark:border-white/10"
                  >
                    {BrandIcon ? (
                      <BrandIcon className={`size-6 ${brand.color}`} />
                    ) : (
                      <span className={`text-sm font-black ${brand.color}`}>{brand.mark}</span>
                    )}
                  </span>
                  <div className="font-heading text-sm font-semibold text-slate-800 dark:text-white">
                    {brand.name}
                  </div>
                </div>
              </div>
              );
            })}
          </div>
        </div>

        <div className="mx-auto mt-8 grid max-w-4xl gap-3 sm:grid-cols-3">
          {trustedStats.map(({ value, label, icon: Icon }) => (
            <div
              key={label}
              className="rounded-[1.25rem] border border-blue-950/10 bg-gradient-to-br from-blue-50 to-emerald-50/70 p-5 text-center shadow-sm shadow-blue-950/5 dark:border-white/10 dark:from-white/[0.06] dark:to-white/[0.02]"
            >
              <Icon className="mx-auto size-5 text-primary" />
              <span className="stat-gradient-text mt-2 block font-heading text-2xl font-semibold animate-[gradient-shift_4s_ease-in-out_infinite]">
                {value}
              </span>
              <div className="mt-1 text-xs font-medium text-slate-600 dark:text-muted">
                {label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
