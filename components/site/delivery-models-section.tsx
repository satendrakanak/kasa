import Image from "next/image";
import {
  BadgeCheck,
  CalendarClock,
  FileBadge,
  PlayCircle,
  Radio,
  UsersRound,
} from "lucide-react";
import { LazyVideo } from "@/components/site/lazy-video";
import { siteContainerClasses } from "@/components/site/site-container";

const deliveryModes = [
  {
    title: "Recorded course sales",
    body: "Launch self-paced programs with lessons, resources, progress and certificates.",
    icon: PlayCircle,
  },
  {
    title: "Live batch teaching",
    body: "Manage faculty-led cohorts, schedules, reminders, attendance and replays.",
    icon: CalendarClock,
  },
  {
    title: "Hybrid academy delivery",
    body: "Blend recordings, live doubt sessions, assignments, exams and guided support.",
    icon: Radio,
  },
];

const imageCards = [
  {
    src: "/academy-live-class.jpg",
    alt: "Teacher running a live online class",
    title: "Live class workspace",
    label: "Faculty-led batches",
  },
  {
    src: "/academy-students-learning.jpg",
    video: "/learner-access-video.mp4",
    alt: "Students learning online with laptop and tablet",
    title: "Learner access",
    label: "Self-paced learning",
  },
  {
    src: "/academy-online-student.jpg",
    alt: "Online student attending a course from laptop",
    title: "Hybrid support",
    label: "Replays and progress",
  },
];

export function DeliveryModelsSection() {
  return (
    <section className="bg-surface-strong py-16 sm:py-20">
      <div className={siteContainerClasses()}>
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-[image:var(--button-solid)] px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] !text-white shadow-lg shadow-primary/18">
              <BadgeCheck className="size-3.5" />
              Delivery models
            </div>
            <h2 className="mt-5 max-w-2xl font-heading text-3xl font-semibold leading-[1.08] text-slate-950 sm:text-5xl dark:text-white">
              Sell courses, run{" "}
              <span className="stat-gradient-text animate-[gradient-shift_4s_ease-in-out_infinite]">
                live batches
              </span>
              , and support learners in one place.
            </h2>
            <p className="mt-5 max-w-2xl text-sm leading-7 text-slate-600 sm:text-base dark:text-muted">
              KASA gives coaching institutes and course creators one branded LMS
              for recorded programs, faculty-led classes, payments, certificates
              and learner operations.
            </p>

            <div className="mt-8 grid gap-3 sm:grid-cols-3 lg:max-w-2xl">
              {[
                ["3", "course models"],
                ["1", "branded platform"],
                ["24/7", "learner access"],
              ].map(([value, label]) => (
                <div
                  key={label}
                  className="rounded-[1.25rem] border border-blue-950/10 bg-white p-4 shadow-lg shadow-blue-950/5 dark:border-white/10 dark:bg-surface"
                >
                  <div className="stat-gradient-text font-heading text-2xl font-semibold">
                    {value}
                  </div>
                  <div className="mt-1 text-xs font-semibold uppercase tracking-[0.12em] text-slate-500 dark:text-muted">
                    {label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-[0.62fr_0.38fr]">
            <article className="group relative min-h-[28rem] overflow-hidden rounded-[2rem] border border-blue-950/10 bg-white p-3 shadow-2xl shadow-blue-950/12 dark:border-white/10 dark:bg-surface">
              <div className="relative h-full min-h-[26rem] overflow-hidden rounded-[1.5rem]">
                <Image
                  src={imageCards[0].src}
                  alt={imageCards[0].alt}
                  fill
                  sizes="(min-width: 1024px) 42vw, 100vw"
                  className="object-cover transition duration-500 group-hover:scale-[1.035]"
                />
                <div className="absolute inset-x-0 bottom-0 bg-[linear-gradient(180deg,transparent,rgba(6,17,38,0.86))] p-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] !text-white/70">
                    {imageCards[0].label}
                  </p>
                  <h3 className="mt-1 font-heading text-2xl font-semibold !text-white">
                    {imageCards[0].title}
                  </h3>
                </div>
              </div>
            </article>

            <div className="grid gap-4">
              {imageCards.slice(1).map((card) => (
                <article
                  key={card.title}
                  className="group relative min-h-[13.5rem] overflow-hidden rounded-[1.6rem] border border-blue-950/10 bg-white p-2 shadow-xl shadow-blue-950/8 dark:border-white/10 dark:bg-surface"
                >
                  <div className="relative h-full min-h-[12.25rem] overflow-hidden rounded-[1.2rem]">
                    {typeof card.video === "string" ? (
                      <LazyVideo
                        className="h-full min-h-[12.25rem] w-full object-cover transition duration-500 group-hover:scale-[1.04]"
                        src={card.video}
                        poster={card.src}
                        ariaLabel={card.alt}
                      />
                    ) : (
                      <Image
                        src={card.src}
                        alt={card.alt}
                        fill
                        sizes="(min-width: 1024px) 24vw, 100vw"
                        className="object-cover transition duration-500 group-hover:scale-[1.04]"
                      />
                    )}
                    <div className="absolute inset-x-0 bottom-0 bg-[linear-gradient(180deg,transparent,rgba(3,10,26,0.9))] p-4">
                      <p className="text-[0.65rem] font-semibold uppercase tracking-[0.14em] !text-white">
                        {card.label}
                      </p>
                      <h3 className="mt-1 font-heading text-lg font-semibold !text-white">
                        {card.title}
                      </h3>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {deliveryModes.map((mode) => {
            const Icon = mode.icon;

            return (
              <div
                key={mode.title}
                className="group relative overflow-hidden rounded-[1.45rem] border border-blue-950/10 bg-white p-5 shadow-xl shadow-blue-950/6 transition duration-200 hover:-translate-y-1 hover:border-primary/35 hover:bg-[linear-gradient(135deg,rgba(43,168,255,0.12),rgba(34,181,115,0.12))] dark:border-white/10 dark:bg-surface dark:hover:bg-[linear-gradient(135deg,rgba(88,201,138,0.12),rgba(69,145,255,0.1))]"
              >
                <div className="absolute inset-x-0 bottom-0 h-1 origin-left scale-x-0 bg-[image:var(--button-solid)] transition-transform duration-300 group-hover:scale-x-100" />
                <div className="flex gap-4">
                  <div className="grid size-12 shrink-0 place-items-center rounded-2xl bg-[image:var(--button-solid)] !text-white">
                    <Icon className="size-5" />
                  </div>
                  <div>
                    <h3 className="font-heading text-lg font-semibold text-slate-950 dark:text-white">
                      {mode.title}
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-muted">
                      {mode.body}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-5 flex flex-wrap items-center justify-center gap-3 text-sm font-semibold text-slate-600 dark:text-muted">
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/18 bg-background px-4 py-2 dark:bg-surface">
            <UsersRound className="size-4 text-primary" />
            Students, faculty and admins
          </span>
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/18 bg-background px-4 py-2 dark:bg-surface">
            <FileBadge className="size-4 text-primary" />
            Certificates and access rules
          </span>
        </div>
      </div>
    </section>
  );
}
