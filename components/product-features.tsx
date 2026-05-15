"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { productFeatures } from "@/lib/landing";

const featureIcons = [
  {
    label: "Academy website builder",
    accent: "border-emerald-400/45 bg-emerald-400/12 text-emerald-200 shadow-[0_0_34px_rgba(74,222,128,0.18)]",
    activeAccent:
      "border-emerald-300 bg-emerald-400/18 text-white shadow-[0_0_42px_rgba(74,222,128,0.32)]",
    icon: GlobeIcon,
  },
  {
    label: "Course management software",
    accent: "border-sky-400/45 bg-sky-400/12 text-sky-200 shadow-[0_0_34px_rgba(56,189,248,0.18)]",
    activeAccent:
      "border-sky-300 bg-sky-400/18 text-white shadow-[0_0_42px_rgba(56,189,248,0.3)]",
    icon: BookStackIcon,
  },
  {
    label: "Online class management",
    accent: "border-violet-400/45 bg-violet-400/12 text-violet-200 shadow-[0_0_34px_rgba(167,139,250,0.18)]",
    activeAccent:
      "border-violet-300 bg-violet-400/18 text-white shadow-[0_0_42px_rgba(167,139,250,0.32)]",
    icon: LiveScreenIcon,
  },
  {
    label: "Online test platform",
    accent: "border-amber-400/45 bg-amber-400/12 text-amber-200 shadow-[0_0_34px_rgba(251,191,36,0.18)]",
    activeAccent:
      "border-amber-300 bg-amber-400/18 text-white shadow-[0_0_42px_rgba(251,191,36,0.32)]",
    icon: CheckSealIcon,
  },
  {
    label: "Fee collection system",
    accent: "border-rose-400/45 bg-rose-400/12 text-rose-200 shadow-[0_0_34px_rgba(251,113,133,0.18)]",
    activeAccent:
      "border-rose-300 bg-rose-400/18 text-white shadow-[0_0_42px_rgba(251,113,133,0.32)]",
    icon: WalletCardIcon,
  },
  {
    label: "Education CRM software",
    accent: "border-cyan-400/45 bg-cyan-400/12 text-cyan-200 shadow-[0_0_34px_rgba(34,211,238,0.18)]",
    activeAccent:
      "border-cyan-300 bg-cyan-400/18 text-white shadow-[0_0_42px_rgba(34,211,238,0.32)]",
    icon: UsersGraphIcon,
  },
];

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

export default function ProductFeaturesSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [pinState, setPinState] = useState<"before" | "pinned" | "after">("before");
  const activeFeature = productFeatures[activeIndex];

  useEffect(() => {
    const updateActiveFeature = () => {
      const section = sectionRef.current;
      if (!section) return;

      const rect = section.getBoundingClientRect();
      const travel = rect.height - window.innerHeight;
      const pinOffset = 64;
      const progress = travel > 0 ? clamp((pinOffset - rect.top) / travel, 0, 1) : 0;
      const nextIndex = clamp(
        Math.floor(progress * productFeatures.length),
        0,
        productFeatures.length - 1,
      );

      setActiveIndex(nextIndex);
      setPinState(
        rect.top > pinOffset
          ? "before"
          : rect.bottom <= window.innerHeight
            ? "after"
            : "pinned",
      );
    };

    updateActiveFeature();
    window.addEventListener("scroll", updateActiveFeature, { passive: true });
    window.addEventListener("resize", updateActiveFeature);

    return () => {
      window.removeEventListener("scroll", updateActiveFeature);
      window.removeEventListener("resize", updateActiveFeature);
    };
  }, []);

  const goToFeature = (index: number) => {
    setActiveIndex(index);

    const section = sectionRef.current;
    if (!section) return;

    const maxTravel = section.offsetHeight - window.innerHeight;
    const progress = index / productFeatures.length;

    window.scrollTo({
      top: section.offsetTop + maxTravel * progress + 2,
      behavior: "smooth",
    });
  };

  return (
    <section
      ref={sectionRef}
      id="features"
      className="relative h-[410vh] bg-background sm:h-[450vh]"
    >
      <div className="px-4 pb-6 pt-16 sm:px-6 sm:pb-8 sm:pt-20 lg:px-8 lg:pb-10 lg:pt-24">
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary sm:text-sm">
            Product features
          </p>
          <h2 className="mt-3 font-heading text-2xl font-semibold leading-[1.12] tracking-normal text-white sm:text-4xl sm:leading-tight lg:text-[3rem]">
            One LMS product, every academy workflow connected.
          </h2>
          <p className="mx-auto mt-3 max-w-3xl text-sm leading-6 text-muted sm:text-base lg:max-w-2xl">
            Scroll through the product: KASA keeps your academy website,
            course management software, student portal, live classes, payments,
            certificates, and education CRM in one branded system.
          </p>
        </div>
      </div>

      <div
        className={[
          "overflow-visible px-4 py-4 sm:px-6 lg:px-8",
          pinState === "before" ? "absolute inset-x-0 top-[16rem] sm:top-[18rem] lg:top-[19rem]" : "",
          pinState === "pinned" ? "fixed inset-x-0 top-20 z-20" : "",
          pinState === "after" ? "absolute inset-x-0 bottom-0" : "",
        ].join(" ")}
      >
        <div className="absolute left-1/2 top-1/2 h-[28rem] w-[28rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/8 blur-3xl animate-[color-breathe_8s_ease-in-out_infinite] sm:h-[42rem] sm:w-[42rem]" />
        <div className="absolute bottom-0 left-0 h-48 w-full bg-gradient-to-t from-background via-background/70 to-transparent sm:h-72" />
        <div className="absolute left-[14%] top-[18%] hidden size-1 rounded-full bg-white/55 animate-[star-drift_8s_ease-in-out_infinite] sm:block" />
        <div className="absolute left-[21%] top-[74%] hidden size-1 rounded-full bg-white/45 animate-[star-drift_12s_ease-in-out_infinite] sm:block" />
        <div className="absolute left-[34%] top-[26%] hidden size-1 rounded-full bg-white/48 animate-[star-drift_13s_ease-in-out_infinite] sm:block" />
        <div className="absolute left-[42%] top-[81%] hidden size-1 rounded-full bg-primary/55 animate-[star-drift_15s_ease-in-out_infinite] sm:block" />
        <div className="absolute right-[16%] top-[22%] hidden size-1.5 rounded-full bg-white/65 animate-[star-drift_9s_ease-in-out_infinite] sm:block" />
        <div className="absolute right-[28%] top-[68%] hidden size-1 rounded-full bg-primary/70 animate-[star-drift_11s_ease-in-out_infinite] sm:block" />
        <div className="absolute right-[9%] top-[54%] hidden size-1 rounded-full bg-white/45 animate-[star-drift_14s_ease-in-out_infinite] sm:block" />
        <div className="absolute right-[24%] top-[34%] hidden h-px w-24 -rotate-45 bg-gradient-to-r from-transparent via-white/65 to-transparent animate-[star-drift_10s_ease-in-out_infinite] sm:block" />
        <div className="absolute left-[12%] top-[48%] hidden h-px w-16 -rotate-45 bg-gradient-to-r from-transparent via-white/42 to-transparent animate-[star-drift_16s_ease-in-out_infinite] sm:block" />

        <div className="relative mx-auto flex w-full max-w-7xl flex-col items-center justify-center">
          <div className="relative flex w-full max-w-5xl flex-col items-center">
            <LaptopFeatureFrame activeFeature={activeFeature}>
              <FeatureScreen activeIndex={activeIndex} />
            </LaptopFeatureFrame>

            <div className="relative mt-4 flex w-full max-w-2xl justify-center rounded-full border border-white/12 bg-white/8 p-2 shadow-2xl shadow-black/25 backdrop-blur sm:p-2.5">
              <div className="hide-scrollbar flex w-full gap-2 overflow-x-auto sm:grid sm:grid-cols-6 sm:gap-2.5 sm:overflow-visible">
                {productFeatures.map((feature, index) => (
                  <FeatureSelector
                    key={feature.title}
                    feature={feature}
                    index={index}
                    isActive={index === activeIndex}
                    onSelect={goToFeature}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function LaptopFeatureFrame({
  activeFeature,
  children,
}: {
  activeFeature: (typeof productFeatures)[number];
  children: React.ReactNode;
}) {
  return (
    <div className="relative w-full overflow-hidden rounded-[1.5rem] border border-white/12 bg-[radial-gradient(circle_at_50%_0%,rgba(88,201,138,0.18),transparent_34%),linear-gradient(180deg,rgba(16,31,61,0.92),rgba(7,16,33,0.96))] p-2.5 shadow-2xl shadow-black/35 backdrop-blur sm:rounded-[2rem] sm:p-4">
      <div className="flex h-8 items-center justify-between rounded-t-[1.35rem] border border-white/10 bg-white/8 px-4 sm:h-9">
        <div className="flex items-center gap-2">
          <span className="size-2.5 rounded-full bg-red-400/80" />
          <span className="size-2.5 rounded-full bg-amber-300/80" />
          <span className="size-2.5 rounded-full bg-primary/90" />
        </div>
        <div className="hidden rounded-full border border-white/10 bg-surface-strong/70 px-5 py-1.5 text-[0.68rem] font-medium text-white/50 sm:block">
          app.getkasa.in/{activeFeature.short.toLowerCase()}
        </div>
        <div className="relative h-5 w-16">
          <Image
            src="/kasa-logo-dark.png"
            alt="KASA"
            width={760}
            height={260}
            className="h-full w-full object-contain"
          />
        </div>
      </div>

      <div
        key={activeFeature.short}
        className="relative h-[24rem] overflow-hidden rounded-b-[1.35rem] border-x border-b border-white/10 bg-surface-strong/82 animate-[feature-rise_520ms_ease-out_both] sm:h-[26rem] lg:h-[28rem]"
      >
        {children}
      </div>
    </div>
  );
}

function FeatureSelector({
  feature,
  index,
  isActive,
  onSelect,
}: {
  feature: (typeof productFeatures)[number];
  index: number;
  isActive: boolean;
  onSelect: (index: number) => void;
}) {
  const config = featureIcons[index];
  const Icon = config.icon;

  return (
    <button
      type="button"
      onClick={() => onSelect(index)}
      className={[
        "grid size-14 shrink-0 cursor-pointer place-items-center rounded-full border transition duration-500 sm:size-16",
        isActive
          ? config.activeAccent
          : `${config.accent} hover:-translate-y-0.5 hover:text-white`,
      ].join(" ")}
      aria-label={feature.title}
      title={config.label}
    >
      <Icon className="size-[1.15rem] sm:size-5" />
    </button>
  );
}

function FeatureScreen({ activeIndex }: { activeIndex: number }) {
  if (activeIndex === 0) return <AcademyWebsiteScreen />;
  if (activeIndex === 1) return <LmsScreen />;
  if (activeIndex === 2) return <LiveClassScreen />;
  if (activeIndex === 3) return <AssessmentScreen />;
  if (activeIndex === 4) return <PaymentScreen />;
  return <CrmScreen />;
}

function AcademyWebsiteScreen() {
  return (
    <div className="relative h-full overflow-hidden bg-white text-slate-900">
      <div className="flex items-center justify-between bg-[#1f2741] px-3 py-1.5 text-[0.58rem] text-white/88 sm:px-4 sm:text-[0.66rem]">
        <div className="flex items-center gap-2">
          <span className="grid size-6 place-items-center rounded-full bg-white text-[#1f2741]">
            <FacebookIcon className="size-3" />
          </span>
          <span className="grid size-6 place-items-center rounded-full bg-white text-[#1f2741]">
            <YoutubeIcon className="size-3.5" />
          </span>
          <span className="grid size-6 place-items-center rounded-full bg-white text-[#1f2741]">
            <InstagramIcon className="size-3.5" />
          </span>
          <span className="grid size-6 place-items-center rounded-full bg-white text-[#1f2741]">
            <XIcon className="size-3" />
          </span>
          <span className="grid size-6 place-items-center rounded-full bg-white text-[#1f2741]">
            <LinkedinIcon className="size-3" />
          </span>
        </div>
        <div className="hidden items-center gap-4 sm:flex">
          <span>+91-8979-791615</span>
          <span>support@getkasa.in</span>
        </div>
      </div>

      <div className="flex items-center justify-between border-b border-slate-200 bg-white px-3 py-2.5 sm:px-5 sm:py-3">
        <div className="relative h-9 w-32 sm:h-11 sm:w-40">
          <Image
            src="/cwk-logo.png"
            alt="Code With KASA"
            fill
            className="object-contain object-left"
          />
        </div>

        <div className="hidden items-center gap-5 text-[0.72rem] font-medium text-slate-700 sm:flex">
          <span className="rounded-full bg-[#4b63ff] px-4 py-2 text-white">
            Home
          </span>
          <span>Courses</span>
          <span>Articles</span>
          <span>Client Testimonials</span>
          <span>Instructors</span>
        </div>

        <div className="flex items-center gap-2 text-slate-700 sm:gap-3">
          <span className="grid size-8 place-items-center rounded-full border border-slate-200 bg-slate-50">
            <CartIcon className="size-4" />
          </span>
          <span className="grid size-8 place-items-center rounded-full border border-slate-200 bg-slate-50">
            <BellIcon className="size-4" />
          </span>
          <span className="grid size-8 place-items-center rounded-full border border-slate-200 bg-slate-50 text-[0.7rem] font-semibold sm:size-10">
            SK
          </span>
        </div>
      </div>

      <div className="relative h-[calc(100%-5.4rem)] overflow-hidden bg-[#3d4fbe] sm:h-[calc(100%-6rem)]">
        <div className="relative h-full">
          <div className="relative z-10 flex h-full max-w-[58%] flex-col justify-center px-3 py-3 sm:max-w-[46%] sm:px-2.5 sm:py-2.5">
            <div className="inline-flex w-fit items-center rounded-full border border-white/24 bg-white/10 px-3 py-1.5 text-[0.62rem] font-medium text-white/90 sm:px-4 sm:text-[0.72rem]">
              <span className="mr-2">🏆</span>
              The Leader in Online Learning
            </div>
            <h3 className="mt-3 max-w-[12rem] font-heading text-[1.12rem] font-semibold leading-[1.08] tracking-normal text-white sm:max-w-[15.5rem] sm:text-[1.82rem]">
              Learn with clarity, apply with confidence, grow for the long term.
            </h3>
            <p className="mt-3 max-w-[13rem] text-[0.6rem] leading-4.5 text-white/82 sm:max-w-[18rem] sm:text-[0.72rem] sm:leading-5">
              Learn practical skills with expert-led courses designed to help
              you grow, build confidence, and advance your career.
            </p>
            <div className="mt-4 flex flex-wrap gap-2.5">
              <span className="rounded-full bg-white px-4 py-2 text-[0.64rem] font-semibold text-slate-900 sm:px-5 sm:py-2 sm:text-[0.74rem]">
                View Courses →
              </span>
              <span className="rounded-full border border-white/22 bg-white/8 px-4 py-2 text-[0.64rem] font-semibold text-white sm:px-5 sm:py-2 sm:text-[0.74rem]">
                Speak to our team
              </span>
            </div>
          </div>

          <div className="absolute bottom-0 right-0 top-[8%] w-[47%] sm:hidden">
            <Image
              src="/cwk-banner-01.webp"
              alt="Code With KASA learner"
              fill
              className="object-contain object-bottom"
            />
          </div>

          <div className="absolute inset-y-0 right-0 hidden w-[60%] sm:block">
            <div className="absolute bottom-0 left-[-4%] top-[1%] right-[24%]">
              <Image
                src="/cwk-banner-01.webp"
                alt="Code With KASA learner"
                fill
                className="object-contain object-bottom"
              />
            </div>
            <div className="absolute left-[56%] top-[16%] w-[34%] rounded-[1.8rem] bg-white p-2.5 shadow-[0_24px_80px_rgba(15,23,42,0.18)]">
              <div className="relative h-36 overflow-hidden rounded-[1.25rem] bg-slate-900">
                <Image
                  src="/cwk-typescript-course.webp"
                  alt="TypeScript course"
                  fill
                  className="object-cover"
                />
                <span className="absolute right-3 top-3 rounded-full bg-[#4b63ff] px-3 py-1 text-[0.8rem] font-semibold text-white">
                  -50%
                </span>
              </div>
              <div className="mt-3 text-[0.98rem] font-semibold text-slate-900">
                TypeScript for Practical Developers
              </div>
              <div className="mt-1.5 text-[0.72rem] leading-5 text-slate-500">
                Practical projects, checkpoints, and certificate readiness in a
                focused self-paced path.
              </div>
              <div className="mt-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-[1.05rem] font-semibold text-[#3153f5]">
                    ₹1,249
                  </span>
                  <span className="text-[0.74rem] text-slate-400 line-through">
                    ₹2,499
                  </span>
                </div>
                <span className="text-[0.75rem] font-semibold text-[#3153f5]">
                  Learn More →
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function LmsScreen() {
  return (
    <div className="grid h-full gap-4 sm:grid-cols-[14rem_1fr]">
      <aside className="hidden rounded-3xl border border-white/10 bg-white/7 p-4 sm:block">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">My courses</p>
        {["React Basics", "Node APIs", "Final Project"].map((item, index) => (
          <div key={item} className={["mt-4 rounded-2xl p-3 text-sm", index === 0 ? "bg-primary/14 text-white" : "bg-white/6 text-white/58"].join(" ")}>
            {item}
          </div>
        ))}
      </aside>
      <div className="rounded-3xl border border-white/10 bg-white/7 p-4">
        <div className="relative h-48 overflow-hidden rounded-2xl bg-black sm:h-48">
          <video
            className="absolute inset-0 h-full w-full object-cover"
            src="/lms-demo.mp4"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(2,6,23,0.12),rgba(2,6,23,0.45))]" />
          <div className="absolute bottom-4 left-4 right-4 h-2 rounded-full bg-white/12">
            <div className="h-full w-2/3 rounded-full bg-primary" />
          </div>
        </div>
        <div className="mt-5 flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">Student LMS portal</p>
            <h3 className="mt-2 font-heading text-lg font-semibold text-white sm:text-2xl">Lesson 08: Building real projects</h3>
            <p className="mt-2 text-sm text-muted">Students watch videos, complete lessons, and track progress in one clean dashboard.</p>
          </div>
          <div className="hidden rounded-2xl border border-white/10 bg-white/7 p-4 text-center sm:block">
            <div className="font-heading text-2xl font-semibold text-white">68%</div>
            <div className="text-xs uppercase text-white/45">completed</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function LiveClassScreen() {
  return (
    <div className="grid h-full gap-4 sm:grid-cols-[1fr_18rem]">
      <div className="rounded-3xl border border-white/10 bg-white/7 p-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">Live class room</p>
            <h3 className="mt-2 font-heading text-xl font-semibold text-white sm:text-2xl">JavaScript Batch: DOM Events</h3>
          </div>
          <span className="rounded-full border border-primary/50 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
            Live now
          </span>
        </div>
        <div className="mt-4 grid h-48 grid-cols-2 gap-3 sm:h-56">
          {["Instructor", "Student 01", "Student 02", "Student 03"].map((person, index) => (
            <div key={person} className="relative overflow-hidden rounded-2xl border border-white/10 bg-[radial-gradient(circle_at_50%_20%,rgba(88,201,138,0.28),transparent_32%),rgba(255,255,255,0.06)] p-4">
              <div className="absolute left-4 top-4 rounded-full bg-black/25 px-3 py-1 text-xs text-white/70">{person}</div>
              <div className="absolute bottom-5 left-1/2 h-16 w-16 -translate-x-1/2 rounded-full bg-white/16" />
              <div className="absolute bottom-16 left-1/2 size-12 -translate-x-1/2 rounded-full bg-primary/55" />
              {index === 0 ? <div className="absolute right-4 top-4 size-3 rounded-full bg-primary animate-pulse" /> : null}
            </div>
          ))}
        </div>
      </div>
      <div className="hidden rounded-3xl border border-white/10 bg-white/7 p-4 sm:block">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">Class tools</p>
        {["Attendance synced", "Replay recording", "Assignment shared", "Batch chat active"].map((tool) => (
          <div key={tool} className="mt-4 rounded-2xl border border-white/8 bg-white/6 p-3 text-sm text-white/70">
            {tool}
          </div>
        ))}
      </div>
    </div>
  );
}

function AssessmentScreen() {
  return (
    <div className="grid h-full gap-4 sm:grid-cols-[1fr_18rem]">
      <div className="rounded-3xl border border-white/10 bg-white/7 p-5">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">Online test platform</p>
        <h3 className="mt-3 font-heading text-xl font-semibold text-white sm:text-2xl">Weekly assessment and certificate rules</h3>
        <div className="mt-5 space-y-3">
          {["Quiz score above 70%", "Assignment submitted", "Course progress 100%"].map((rule, index) => (
            <div key={rule} className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/6 p-4">
              <span className="text-sm text-white/75">{rule}</span>
              <span className={["size-6 rounded-full", index < 2 ? "bg-primary" : "bg-white/16"].join(" ")} />
            </div>
          ))}
        </div>
      </div>
      <div className="rounded-3xl border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.12),rgba(255,255,255,0.04))] p-5 text-center">
        <div className="mx-auto mt-4 grid h-40 w-32 place-items-center rounded-2xl border border-primary/40 bg-primary/10 sm:mt-8">
          <div>
            <div className="text-xs uppercase tracking-[0.18em] text-primary">Certificate</div>
            <div className="mt-4 font-heading text-xl font-semibold text-white">KASA Academy</div>
            <div className="mx-auto mt-5 h-px w-20 bg-white/35" />
          </div>
        </div>
      </div>
    </div>
  );
}

function PaymentScreen() {
  return (
    <div className="grid h-full gap-4 sm:grid-cols-[1fr_20rem]">
      <div className="rounded-3xl border border-white/10 bg-white/7 p-5">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">Fee collection system</p>
        <h3 className="mt-3 font-heading text-xl font-semibold text-white sm:text-2xl">Sell programs and unlock access automatically.</h3>
        <div className="mt-5 grid gap-3 sm:grid-cols-3">
          {["UPI", "Cards", "Net banking"].map((method) => (
            <div key={method} className="rounded-2xl border border-white/10 bg-white/6 p-4 text-center text-sm font-semibold text-white/75">
              {method}
            </div>
          ))}
        </div>
        <div className="mt-5 rounded-2xl border border-primary/30 bg-primary/10 p-4 text-sm text-white/75">
          Payment successful. Student account created and course access opened.
        </div>
      </div>
      <div className="rounded-3xl border border-white/10 bg-white/7 p-5">
        <div className="text-sm text-white/55">Growth Program</div>
        <div className="mt-4 font-heading text-4xl font-semibold text-white">₹9,999</div>
        <div className="mt-6 rounded-full bg-primary px-5 py-3 text-center text-sm font-semibold text-primary-foreground">
          Pay and enrol
        </div>
      </div>
    </div>
  );
}

function CrmScreen() {
  return (
    <div className="grid h-full gap-4 sm:grid-cols-[17rem_1fr]">
      <div className="rounded-3xl border border-white/10 bg-white/7 p-5">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">Education CRM software</p>
        <h3 className="mt-3 font-heading text-xl font-semibold text-white sm:text-2xl">Admission pipeline</h3>
        {["New enquiry", "Demo booked", "Fee pending", "Enrolled"].map((stage, index) => (
          <div key={stage} className="mt-4 rounded-2xl border border-white/10 bg-white/6 p-3">
            <div className="flex items-center justify-between text-sm text-white/72">
              <span>{stage}</span>
              <span>{[18, 9, 6, 31][index]}</span>
            </div>
          </div>
        ))}
      </div>
      <div className="rounded-3xl border border-white/10 bg-white/7 p-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">Learner analytics</p>
            <h3 className="mt-2 font-heading text-xl font-semibold text-white sm:text-2xl">Business health overview</h3>
          </div>
          <span className="rounded-full border border-primary/40 px-3 py-1 text-xs text-primary">This month</span>
        </div>
        <div className="mt-6 grid h-44 grid-cols-6 items-end gap-3 sm:h-52">
          {[42, 66, 51, 78, 64, 88].map((height, index) => (
            <div key={height} className="rounded-t-2xl bg-primary/70" style={{ height: `${height}%`, opacity: 0.45 + index * 0.08 }} />
          ))}
        </div>
      </div>
    </div>
  );
}

function GlobeIcon({ className = "size-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true" className={className}>
      <circle cx="10" cy="10" r="7" stroke="currentColor" strokeWidth="1.6" />
      <path d="M3.75 10h12.5M10 3.25c1.75 1.85 2.75 4.2 2.75 6.75S11.75 14.9 10 16.75C8.25 14.9 7.25 12.55 7.25 10S8.25 5.1 10 3.25Z" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function BookStackIcon({ className = "size-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true" className={className}>
      <path d="M5.25 4.25h7.75a1.5 1.5 0 0 1 1.5 1.5v8.5a1.5 1.5 0 0 1-1.5 1.5H5.25a1.5 1.5 0 0 1-1.5-1.5v-8.5a1.5 1.5 0 0 1 1.5-1.5Z" stroke="currentColor" strokeWidth="1.6" />
      <path d="M6.75 7.25h4.75M6.75 10h6.5M6.75 12.75h5.25" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

function LiveScreenIcon({ className = "size-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true" className={className}>
      <rect x="3" y="4" width="14" height="10" rx="2" stroke="currentColor" strokeWidth="1.6" />
      <path d="M9 8v2.95L11.55 9.5 9 8Z" fill="currentColor" />
      <path d="M7 16h6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

function CheckSealIcon({ className = "size-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true" className={className}>
      <path d="M10 3.5 12 5l2.5.25.25 2.5L16.5 10 14.75 12.25l-.25 2.5L12 15l-2 1.5L8 15l-2.5-.25-.25-2.5L3.5 10l1.75-2.25.25-2.5L8 5l2-1.5Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      <path d="m7.25 10 1.75 1.75L12.75 8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function WalletCardIcon({ className = "size-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true" className={className}>
      <rect x="2.75" y="5" width="14.5" height="10" rx="2" stroke="currentColor" strokeWidth="1.6" />
      <path d="M2.75 8h14.5M12.25 11.25h2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

function UsersGraphIcon({ className = "size-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true" className={className}>
      <path d="M6.25 9a2 2 0 1 0 0-4 2 2 0 0 0 0 4ZM13.75 10a1.75 1.75 0 1 0 0-3.5 1.75 1.75 0 0 0 0 3.5Z" stroke="currentColor" strokeWidth="1.6" />
      <path d="M3.75 14.5c.6-1.55 1.95-2.5 3.75-2.5s3.15.95 3.75 2.5M11.5 14.5c.42-1.08 1.36-1.75 2.63-1.75 1.02 0 1.9.44 2.37 1.18" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M12 4.5v2.25M15.25 4.5v2.25M12 6.75h3.25" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

function FacebookIcon({ className = "size-3" }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M11.15 17v-6.14h2.07l.31-2.4h-2.38V6.93c0-.7.19-1.17 1.2-1.17H13.5V3.6c-.2-.03-.9-.1-1.72-.1-1.7 0-2.87 1.04-2.87 2.95v2.01H7v2.4h1.91V17h2.24Z" />
    </svg>
  );
}

function YoutubeIcon({ className = "size-3.5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M16.64 6.04a2.1 2.1 0 0 0-1.48-1.48C13.86 4.2 10 4.2 10 4.2s-3.86 0-5.16.36a2.1 2.1 0 0 0-1.48 1.48C3 7.34 3 10 3 10s0 2.66.36 3.96a2.1 2.1 0 0 0 1.48 1.48c1.3.36 5.16.36 5.16.36s3.86 0 5.16-.36a2.1 2.1 0 0 0 1.48-1.48C17 12.66 17 10 17 10s0-2.66-.36-3.96ZM8.75 12.1V7.9L12.4 10l-3.65 2.1Z" />
    </svg>
  );
}

function InstagramIcon({ className = "size-3.5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true" className={className}>
      <rect x="4" y="4" width="12" height="12" rx="3" stroke="currentColor" strokeWidth="1.7" />
      <circle cx="10" cy="10" r="2.8" stroke="currentColor" strokeWidth="1.7" />
      <circle cx="13.5" cy="6.5" r="0.9" fill="currentColor" />
    </svg>
  );
}

function XIcon({ className = "size-3" }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M5.2 4.5h2.1l2.8 3.8 3.2-3.8h1.9l-4.2 4.95 4.4 6.05h-2.1L9.9 11 6.1 15.5H4.2l4.6-5.35L5.2 4.5Z" />
    </svg>
  );
}

function LinkedinIcon({ className = "size-3" }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M5.36 7.3H7.7v7.1H5.36V7.3Zm1.18-3.7a1.36 1.36 0 1 1 0 2.73 1.36 1.36 0 0 1 0-2.72ZM9.16 7.3h2.24v.97h.03c.31-.59 1.08-1.22 2.23-1.22 2.38 0 2.82 1.57 2.82 3.61v3.74h-2.34v-3.32c0-.79-.02-1.8-1.1-1.8-1.1 0-1.27.86-1.27 1.75v3.37H9.16V7.3Z" />
    </svg>
  );
}

function CartIcon({ className = "size-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true" className={className}>
      <path d="M4 5.25h1.26l1.1 5.2h6.28l1.04-4.1H6.9" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="8.2" cy="14.7" r="0.9" fill="currentColor" />
      <circle cx="12.95" cy="14.7" r="0.9" fill="currentColor" />
    </svg>
  );
}

function BellIcon({ className = "size-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true" className={className}>
      <path d="M10 16.2a1.8 1.8 0 0 0 1.8-1.8H8.2A1.8 1.8 0 0 0 10 16.2Zm4-2.7H6l.85-1.16V9.2a3.15 3.15 0 1 1 6.3 0v3.14l.85 1.16Z" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
