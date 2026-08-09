import Image from "next/image";
import Link from "next/link";
import { DemoTourTrigger } from "@/components/demo-tour-form";
import { LeadCaptureModalTrigger } from "@/components/lead-capture-trigger";
import { siteButtonClasses } from "@/components/site/site-button";
import { stats } from "@/lib/landing";

const floatingCards = [
  {
    label: "Ready Software",
    title: "1-click LMS setup",
    body: "Get your branded academy live without building tech from scratch.",
    position: "left-[5%] top-[12%]",
    motion: "animate-[float-x_9s_ease-in-out_infinite]",
  },
  {
    label: "Course Engine",
    title: "Courses, batches, tests",
    body: "Manage recorded lessons, live classes, quizzes, and assignments.",
    position: "left-[1%] top-[48%]",
    motion: "animate-[float-x-reverse_11s_ease-in-out_infinite]",
  },
  {
    label: "Institute CRM",
    title: "Leads, fees, learners",
    body: "Track admissions, payments, student progress, and follow-ups.",
    position: "right-[2%] top-[16%]",
    motion: "animate-[float-x_10s_ease-in-out_infinite]",
  },
  {
    label: "Your Brand",
    title: "Own domain, zero commission",
    body: "Sell under your institute name with no marketplace dependency.",
    position: "right-[8%] top-[48%]",
    motion: "animate-[float-x-reverse_12s_ease-in-out_infinite]",
  },
];

export default function LandingHero() {
  const leadsEndpoint = "/api/leads";

  return (
    <section className="relative min-h-screen overflow-x-hidden bg-surface-strong text-foreground">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_52%,rgba(255,255,255,0.16),transparent_14rem),linear-gradient(180deg,rgba(30,64,175,0.45),rgba(2,6,23,0.96)_68%)]" />
      <div className="absolute left-1/2 top-1/3 h-[24rem] w-[24rem] -translate-x-1/2 rounded-full bg-primary/18 blur-3xl animate-[color-breathe_9s_ease-in-out_infinite] sm:h-[34rem] sm:w-[34rem]" />
      <div className="absolute right-[12%] top-[22%] hidden h-72 w-72 rounded-full bg-blue-500/14 blur-3xl animate-[color-breathe_12s_ease-in-out_infinite] sm:block" />
      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-[linear-gradient(180deg,transparent,rgba(2,6,23,0.94))]" />

      <div className="absolute left-[12%] top-[18%] size-1 rounded-full bg-white/80 animate-[star-drift_7s_ease-in-out_infinite]" />
      <div className="absolute left-[22%] top-[31%] size-1 rounded-full bg-white/55 animate-[star-drift_10s_ease-in-out_infinite]" />
      <div className="absolute left-[28%] top-[11%] size-1 rounded-full bg-white/60 animate-[star-drift_8s_ease-in-out_infinite]" />
      <div className="absolute left-[38%] top-[22%] size-1 rounded-full bg-white/50 animate-[star-drift_13s_ease-in-out_infinite]" />
      <div className="absolute left-[44%] top-[39%] size-1.5 rounded-full bg-primary/55 animate-[star-drift_12s_ease-in-out_infinite]" />
      <div className="absolute right-[18%] top-[16%] size-1.5 rounded-full bg-white/70 animate-[star-drift_9s_ease-in-out_infinite]" />
      <div className="absolute right-[26%] top-[42%] size-1 rounded-full bg-white/45 animate-[star-drift_11s_ease-in-out_infinite]" />
      <div className="absolute right-[10%] top-[34%] size-1 rounded-full bg-white/52 animate-[star-drift_14s_ease-in-out_infinite]" />
      <div className="absolute right-[42%] top-[18%] size-1 rounded-full bg-white/45 animate-[star-drift_10s_ease-in-out_infinite]" />
      <div className="absolute right-[30%] top-[28%] h-px w-24 -rotate-45 bg-gradient-to-r from-transparent via-white/80 to-transparent animate-[star-drift_8s_ease-in-out_infinite]" />
      <div className="absolute left-[68%] top-[10%] h-px w-16 -rotate-45 bg-gradient-to-r from-transparent via-white/60 to-transparent animate-[star-drift_12s_ease-in-out_infinite]" />
      <div className="absolute left-[16%] top-[45%] h-px w-14 -rotate-45 bg-gradient-to-r from-transparent via-white/45 to-transparent animate-[star-drift_15s_ease-in-out_infinite]" />

      <div className="fixed inset-x-0 top-6 z-40 px-4 sm:top-8">
        <div className="mx-auto flex h-12 w-full max-w-[52rem] items-center justify-between rounded-full border border-white/12 bg-white/10 px-4 shadow-2xl shadow-black/20 backdrop-blur-xl sm:h-14 sm:px-6">
          <Link href="/cwk" className="relative block h-5 w-20 sm:h-6 sm:w-24" aria-label="KASA landing home">
            <Image
              src="/kasa-logo-dark.png"
              alt="KASA"
              width={760}
              height={260}
              sizes="(min-width: 640px) 6rem, 5rem"
              className="h-full w-full object-contain object-left"
              priority
            />
          </Link>
          <nav className="hidden items-center gap-7 text-sm font-semibold text-white/68 sm:flex">
            <a href="#platform" className="transition hover:text-white">
              Features
            </a>
            <a href="#pricing" className="transition hover:text-white">
              Pricing
            </a>
            <a href="#faq" className="transition hover:text-white">
              FAQ
            </a>
          </nav>
          <LeadCaptureModalTrigger
            endpoint={leadsEndpoint}
            source="landing-nav-enquiry-modal"
            leadType="enquiry"
            buttonLabel="Enquire Now"
            modalTitle="Tell us about your academy"
            modalEyebrow="Enquiry request"
            icon={<ChatBubbleIcon className="size-4" />}
            buttonClassName={siteButtonClasses({
              size: "sm",
              className: "h-9 px-4 sm:h-10 sm:px-5",
            })}
          />
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-0 hidden h-72 sm:block">
        <div className="absolute bottom-0 left-0 h-56 w-[68%] bg-slate-950/80 [clip-path:polygon(0_55%,18%_22%,32%_48%,48%_12%,68%_60%,100%_28%,100%_100%,0_100%)]" />
        <div className="absolute bottom-0 right-0 h-64 w-[72%] bg-slate-900/85 [clip-path:polygon(0_34%,19%_58%,39%_18%,58%_52%,76%_22%,100%_48%,100%_100%,0_100%)]" />
        <div className="absolute bottom-0 left-1/2 h-48 w-[58%] -translate-x-1/2 bg-primary/20 blur-2xl" />
      </div>

      <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-7xl flex-col items-center px-4 pb-8 text-center sm:px-6 lg:px-8">
        <div className="mx-auto flex flex-1 flex-col items-center justify-center pt-36 sm:pt-40">
          <p className="font-heading text-xs font-medium uppercase tracking-[0.22em] text-white/68 sm:text-sm">
            White label LMS software for coaching institutes and online academies
          </p>
          <h1 className="mt-5 max-w-5xl font-heading text-3xl font-semibold leading-[1.22] tracking-normal text-white sm:text-5xl sm:leading-[1.12] lg:text-6xl xl:text-7xl">
            Launch your own{" "}
            <span className="text-primary">online course platform</span> for
            selling, teaching, and scaling.
          </h1>
          <p className="mx-auto mt-5 max-w-3xl text-sm leading-6 text-white/72 sm:text-lg sm:leading-7">
            KASA brings course selling, live class management, self learning,
            assignments, online exams, certificates, student management,
            payments, education CRM, and learner analytics into one branded
            learning management system.
          </p>

          <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row">
            <DemoTourTrigger
              buttonLabel="Take a Tour"
              icon={<PlayWindowIcon className="size-4" />}
              buttonClassName={siteButtonClasses({
                size: "md",
                className: "min-w-[12.25rem]",
              })}
            />
            <LeadCaptureModalTrigger
              endpoint={leadsEndpoint}
              source="hero-enquiry-modal"
              leadType="enquiry"
              buttonLabel="Enquire Now"
              modalTitle="Tell us about your academy"
              modalEyebrow="Enquiry request"
              icon={<ChatBubbleIcon className="size-4" />}
              buttonClassName={siteButtonClasses({
                variant: "outline",
                size: "md",
                className: "min-w-[12.25rem]",
              })}
            />
          </div>

          <p className="mt-4 text-sm text-white/55">
            Free walkthrough. No commitment. Built for serious education
            businesses.
          </p>

          <div className="relative mt-8 h-[22rem] w-full max-w-5xl sm:h-[32rem] lg:h-[34rem]">
            <div className="absolute left-1/2 top-8 h-56 w-56 -translate-x-1/2 rounded-full bg-primary/14 blur-3xl sm:h-80 sm:w-80" />
            <div className="absolute bottom-0 left-1/2 h-px w-[min(88vw,64rem)] -translate-x-1/2 bg-gradient-to-r from-transparent via-white/35 to-transparent" />

            <Image
              src="/kasa-hero.png"
              alt="Smiling student holding a laptop"
              width={1133}
              height={1700}
              sizes="(min-width: 1024px) 34rem, (min-width: 640px) 30rem, 20rem"
              priority
              className="absolute bottom-0 left-1/2 h-[20rem] w-auto -translate-x-1/2 object-contain drop-shadow-2xl sm:h-[30rem] lg:h-[33rem]"
            />

            <div className="absolute left-1/2 top-[46%] hidden h-40 w-[28rem] -translate-x-1/2 rounded-full bg-primary/16 blur-2xl sm:block" />

            {floatingCards.map((card) => (
              <div
                key={card.title}
                className={[
                  "absolute hidden w-64 rounded-2xl border border-white/14 bg-white/12 p-4 text-left shadow-2xl shadow-black/20 backdrop-blur-xl md:block",
                  card.position,
                  card.motion,
                ].join(" ")}
              >
                <div className="text-[0.65rem] font-semibold uppercase tracking-[0.12em] text-primary">
                  {card.label}
                </div>
                <div className="mt-1 font-heading text-base font-semibold text-white">
                  {card.title}
                </div>
                <div className="mt-2 text-xs leading-5 text-white/62">
                  {card.body}
                </div>
              </div>
            ))}

            <div className="absolute bottom-0 left-1/2 hidden w-[min(92vw,42rem)] -translate-x-1/2 gap-3 rounded-[1.5rem] border border-white/12 bg-slate-950/40 p-3 shadow-2xl shadow-black/30 backdrop-blur-xl sm:grid sm:grid-cols-3">
              {stats.map((item) => (
                <div
                  key={item.label}
                  className="rounded-2xl bg-white/8 px-4 py-4 text-center"
                >
                  <div className="font-heading text-2xl font-semibold text-white">
                    {item.value}
                  </div>
                  <div className="mt-1 text-xs font-medium uppercase text-white/60">
                    {item.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 grid w-[min(92vw,24rem)] gap-2 rounded-[1.25rem] border border-white/12 bg-slate-950/40 p-2 shadow-2xl shadow-black/30 backdrop-blur-xl sm:hidden">
            {stats.map((item) => (
              <div
                key={item.label}
                className="rounded-2xl bg-white/8 px-3 py-3 text-center"
              >
                <div className="font-heading text-xl font-semibold text-white">
                  {item.value}
                </div>
                <div className="mt-1 text-xs font-medium uppercase text-white/60">
                  {item.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ChatBubbleIcon({ className = "size-4" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <path
        d="M5.833 14.167 3.333 16.25V5.833A2.5 2.5 0 0 1 5.833 3.333h8.334a2.5 2.5 0 0 1 2.5 2.5v5.834a2.5 2.5 0 0 1-2.5 2.5H5.833Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6.667 7.5h6.666M6.667 10.417h4.166"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

function PlayWindowIcon({ className = "size-4" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <rect
        x="2.5"
        y="3.333"
        width="15"
        height="13.334"
        rx="2.5"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <path d="M8.4 7.25v5.5L13 10 8.4 7.25Z" fill="currentColor" />
    </svg>
  );
}
