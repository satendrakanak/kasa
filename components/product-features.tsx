"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { productFeatures } from "@/lib/landing";

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
      className="relative h-[390vh] bg-background sm:h-[430vh]"
    >
      <div
        className={[
          "flex h-[calc(100vh-4rem)] items-center overflow-visible px-4 py-4 sm:px-6 lg:px-8",
          pinState === "before" ? "absolute inset-x-0 top-0" : "",
          pinState === "pinned" ? "fixed inset-x-0 top-16 z-20" : "",
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

        <div className="relative mx-auto flex h-full w-full max-w-7xl flex-col items-center justify-center">
          <div className="mx-auto max-w-4xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary sm:text-sm">
              Product features
            </p>
            <h2 className="mt-3 font-heading text-2xl font-semibold leading-[1.22] tracking-normal text-white sm:text-4xl sm:leading-tight lg:text-5xl">
              One LMS product, every institute workflow connected.
            </h2>
            <p className="mx-auto mt-3 max-w-3xl text-sm leading-6 text-muted sm:text-base">
              Scroll through the product: KASA keeps your academy website,
              learning portal, live classes, payments, certificates, and CRM in
              one branded system.
            </p>
          </div>

          <div className="relative mt-5 flex w-full max-w-5xl flex-col items-center">
            <div className="relative w-full overflow-hidden rounded-[1.5rem] border border-white/12 bg-[radial-gradient(circle_at_50%_0%,rgba(88,201,138,0.18),transparent_34%),linear-gradient(180deg,rgba(16,31,61,0.92),rgba(7,16,33,0.96))] p-2.5 shadow-2xl shadow-black/35 backdrop-blur sm:rounded-[2rem] sm:p-4">
              <div className="flex h-9 items-center justify-between rounded-t-[1.35rem] border border-white/10 bg-white/8 px-4">
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
                className="relative h-[22rem] overflow-hidden rounded-b-[1.35rem] border-x border-b border-white/10 bg-surface-strong/82 p-3 animate-[feature-rise_520ms_ease-out_both] sm:h-[22rem] sm:p-5 lg:h-[23rem]"
              >
                <FeatureScreen activeIndex={activeIndex} />
              </div>
            </div>

            <div className="relative mt-4 flex w-full max-w-2xl justify-center rounded-full border border-white/12 bg-white/8 p-2 shadow-2xl shadow-black/25 backdrop-blur sm:p-2.5">
              <div className="hide-scrollbar flex w-full gap-2 overflow-x-auto sm:grid sm:grid-cols-6 sm:gap-2.5 sm:overflow-visible">
                {productFeatures.map((feature, index) => (
                  <button
                    key={feature.title}
                    type="button"
                    onClick={() => goToFeature(index)}
                    className={[
                      "grid size-14 shrink-0 place-items-center rounded-full border text-center font-heading text-[0.68rem] font-semibold transition duration-500 sm:size-16 sm:text-[0.7rem]",
                      index === activeIndex
                        ? "border-primary bg-primary/10 text-white shadow-[0_0_34px_rgba(88,201,138,0.28)]"
                        : "border-white/10 bg-surface/70 text-white/68 hover:border-primary/70 hover:text-white hover:shadow-[0_0_30px_rgba(88,201,138,0.18)]",
                    ].join(" ")}
                    aria-label={feature.title}
                  >
                    {feature.short}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
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
    <div className="relative h-full overflow-hidden rounded-3xl bg-[linear-gradient(135deg,rgba(88,201,138,0.18),rgba(15,23,42,0.25)_38%,rgba(2,6,23,0.45))] p-3 sm:p-4">
      <div className="flex items-center justify-between gap-2 rounded-3xl border border-white/10 bg-white/8 px-3 py-2 sm:rounded-full sm:px-4 sm:py-2.5">
        <div className="font-heading text-sm font-semibold text-white">BrightPath Academy</div>
        <div className="hidden gap-5 text-xs text-white/55 sm:flex">
          <span>Programs</span>
          <span>Results</span>
          <span>Admissions</span>
        </div>
        <span className="rounded-full bg-primary px-3 py-2 text-[0.7rem] font-semibold text-primary-foreground sm:px-4 sm:text-xs">
          Apply now
        </span>
      </div>
      <div className="grid gap-4 pt-4 sm:h-[calc(100%-3.9rem)] sm:grid-cols-[1.05fr_0.95fr] sm:items-center">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
            Branded academy website
          </p>
          <h3 className="mt-2 font-heading text-xl font-semibold leading-[1.22] text-white sm:text-3xl sm:leading-tight">
            Sell courses from your own institute homepage.
          </h3>
          <p className="mt-3 max-w-md text-sm leading-6 text-muted">
            Course pages, admission funnels, testimonials, and lead forms stay
            under your brand.
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <span className="rounded-full bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground">
              View courses
            </span>
            <span className="rounded-full border border-white/15 px-4 py-2 text-xs font-semibold text-white/70">
              Talk to counsellor
            </span>
          </div>
        </div>
        <div className="grid gap-3">
          {["Full Stack Web Development", "Digital Marketing Mastery"].map((course) => (
            <div key={course} className="rounded-2xl border border-white/10 bg-white/8 p-4 shadow-xl shadow-black/15">
              <div className="h-16 rounded-xl bg-[linear-gradient(135deg,rgba(88,201,138,0.35),rgba(59,130,246,0.2))]" />
              <div className="mt-3 font-heading text-sm font-semibold text-white">{course}</div>
              <div className="mt-1 text-xs text-white/48">Live + recorded learning path</div>
            </div>
          ))}
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
