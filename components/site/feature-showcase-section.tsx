import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  BookOpenCheck,
  CalendarClock,
  ChartNoAxesCombined,
  FileBadge,
  Globe2,
  HandCoins,
  LayoutDashboard,
  PlayCircle,
  ShieldCheck,
  Sparkles,
  UsersRound,
  Video,
  type LucideIcon,
} from "lucide-react";
import type { ReactNode } from "react";
import { LazyVideo } from "@/components/site/lazy-video";
import { siteContainerClasses } from "@/components/site/site-container";
import { featurePages } from "@/lib/site-content";

type FeatureSlug =
  | "course-selling-platform"
  | "live-class-management"
  | "exams-assignments-certificates"
  | "payments-coupons-orders"
  | "student-faculty-management"
  | "education-crm-leads"
  | "academy-website-builder"
  | "admin-dashboard-reporting";

const pageBySlug = new Map(featurePages.map((page) => [page.slug, page]));

const featureLink = (slug: FeatureSlug) => `/features/${slug}`;

const operations = [
  "Course website",
  "Checkout",
  "Learner access",
  "Orders",
  "Coupons",
  "Certificates",
];

const signalCards = [
  {
    icon: BookOpenCheck,
    label: "Self-paced course library",
    text: "Recorded lessons, resources, completion rules, and progress tracking stay in one branded LMS.",
  },
  {
    icon: CalendarClock,
    label: "Live class operations",
    text: "Run batches, faculty sessions, calendars, reminders, attendance, and replay access without extra tools.",
  },
  {
    icon: FileBadge,
    label: "Exams and certificates",
    text: "Assignments, tests, result workflows, and certificate rules can match Starter, Plus, or Enterprise plans.",
  },
];

const featureStories: Array<{
  slug: FeatureSlug;
  icon: LucideIcon;
  title: string;
  text: string;
  image: string;
  alt: string;
  tone: string;
}> = [
  {
    slug: "course-selling-platform",
    icon: Globe2,
    title: "Sell courses from your own academy website",
    text: "Publish SEO course pages, collect enquiries, run coupons, accept orders, and unlock learner access from the same course selling platform.",
    image: "/feature-course-selling-vector.png",
    alt: "Course selling platform illustration",
    tone: "from-sky-500/16 via-white to-emerald-500/10 dark:from-sky-400/10 dark:via-white/[0.03] dark:to-emerald-400/10",
  },
  {
    slug: "student-faculty-management",
    icon: UsersRound,
    title: "Manage students, faculty, roles, and batches",
    text: "Give admins control, faculty a focused workspace, and learners a clean dashboard for courses, progress, live classes, orders, and certificates.",
    image: "/feature-team-meeting.jpg",
    alt: "Students collaborating around a laptop",
    tone: "from-blue-500/14 via-white to-violet-500/10 dark:from-blue-400/10 dark:via-white/[0.03] dark:to-violet-400/10",
  },
  {
    slug: "education-crm-leads",
    icon: ChartNoAxesCombined,
    title: "Turn demo requests and enquiries into admissions",
    text: "Capture source, page, CTA, intent, and follow-up context so your academy CRM can move serious leads toward paid enrolment.",
    image: "/feature-crm-dashboard.png",
    alt: "Education CRM dashboard planning",
    tone: "from-emerald-500/14 via-white to-blue-500/10 dark:from-emerald-400/10 dark:via-white/[0.03] dark:to-blue-400/10",
  },
];

const quickLinks: Array<{
  slug: FeatureSlug;
  icon: LucideIcon;
  label: string;
}> = [
  {
    slug: "payments-coupons-orders",
    icon: HandCoins,
    label: "Payments and orders",
  },
  {
    slug: "exams-assignments-certificates",
    icon: FileBadge,
    label: "Exams and certificates",
  },
  {
    slug: "academy-website-builder",
    icon: Globe2,
    label: "Academy website builder",
  },
  {
    slug: "live-class-management",
    icon: Video,
    label: "Live class management",
  },
];

function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/8 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-primary shadow-sm shadow-blue-950/5 dark:border-primary/30 dark:bg-primary/10">
      <Sparkles className="size-4" aria-hidden="true" />
      {children}
    </span>
  );
}

function StoryLink({ slug }: { slug: FeatureSlug }) {
  const page = pageBySlug.get(slug);

  return (
    <Link
      href={featureLink(slug)}
      className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-primary transition hover:gap-3"
      aria-label={`Explore ${page?.eyebrow ?? "feature"}`}
    >
      Explore feature
      <ArrowRight className="size-4" aria-hidden="true" />
    </Link>
  );
}

export function FeatureShowcaseSection() {
  return (
    <section
      id="features"
      className="relative overflow-hidden bg-background py-16 text-foreground sm:py-20 lg:py-24"
    >
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_12%_18%,rgba(58,168,255,0.13),transparent_28rem),radial-gradient(circle_at_86%_22%,rgba(105,211,142,0.13),transparent_30rem)] dark:bg-[radial-gradient(circle_at_14%_20%,rgba(70,198,255,0.12),transparent_30rem),radial-gradient(circle_at_86%_18%,rgba(112,211,151,0.1),transparent_32rem)]" />

      <div className={siteContainerClasses()}>
        <div className="mx-auto max-w-4xl text-center">
          <Eyebrow>KASA feature engine</Eyebrow>
          <h2 className="mt-5 font-heading text-3xl font-semibold leading-tight text-slate-950 sm:text-4xl lg:text-5xl dark:text-white">
            Everything your academy needs to{" "}
            <span className="stat-gradient-text animate-[gradient-shift_4s_ease-in-out_infinite]">
              sell, teach, and scale
            </span>{" "}
            in one LMS.
          </h2>
          <p className="mx-auto mt-5 max-w-3xl text-base leading-8 text-slate-600 sm:text-lg dark:text-slate-300">
            KASA connects your academy website, course checkout, self-learning
            library, live classes, learner dashboard, certificates, education CRM,
            payments, and admin reports inside one branded LMS software.
          </p>
        </div>

        <div className="mt-12 grid gap-5 lg:grid-cols-12">
          <div className="group relative overflow-hidden rounded-[2rem] border border-blue-950/10 bg-white p-5 shadow-2xl shadow-blue-950/8 dark:border-white/10 dark:bg-white/[0.04] lg:col-span-5 lg:min-h-[42rem]">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_22%_15%,rgba(58,168,255,0.2),transparent_18rem),linear-gradient(135deg,rgba(22,59,143,0.08),rgba(105,211,142,0.08))] dark:bg-[radial-gradient(circle_at_18%_18%,rgba(74,185,255,0.16),transparent_20rem),linear-gradient(135deg,rgba(26,54,118,0.5),rgba(14,118,87,0.28))]" />
            <div className="relative z-10 flex h-full flex-col">
              <div className="rounded-[1.55rem] border border-blue-950/10 bg-white/82 p-5 backdrop-blur dark:border-white/10 dark:bg-slate-950/58">
                <div className="flex items-center gap-3">
                  <span className="grid size-11 place-items-center rounded-2xl bg-primary/10 text-primary">
                    <Globe2 className="size-5" aria-hidden="true" />
                  </span>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                    Branded academy website
                  </p>
                </div>
                <h3 className="mt-5 font-heading text-2xl font-semibold leading-tight text-slate-950 dark:text-white">
                  Course pages, checkout, payments, and learner access work as
                  one selling system.
                </h3>
                <p className="mt-4 text-sm leading-7 text-slate-600 dark:text-slate-300">
                  Build a course selling platform where every order opens the right
                  course, invoice, dashboard, and follow-up record automatically.
                </p>
              </div>

              <div className="relative mt-5 flex-1 overflow-hidden rounded-[1.7rem] border border-blue-950/10 bg-white/72 p-5 dark:border-white/10 dark:bg-slate-950/46">
                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                  {operations.map((item) => (
                    <div
                      key={item}
                      className="flex items-center gap-3 rounded-2xl border border-blue-950/8 bg-white/75 px-4 py-3 text-sm font-semibold text-slate-800 shadow-sm dark:border-white/10 dark:bg-white/[0.06] dark:text-white"
                    >
                      <BadgeCheck className="size-4 text-primary" aria-hidden="true" />
                      {item}
                    </div>
                  ))}
                </div>
                <Image
                  src="/feature-course-selling-vector.png"
                  alt="Course selling platform with online storefront and checkout"
                  width={900}
                  height={720}
                  className="mx-auto mt-5 max-h-[19rem] w-full object-contain transition duration-700 group-hover:scale-[1.03]"
                />
              </div>

              <StoryLink slug="course-selling-platform" />
            </div>
          </div>

          <div className="grid gap-5 lg:col-span-7">
            <div className="relative overflow-hidden rounded-[2rem] border border-blue-950/10 bg-white p-4 shadow-2xl shadow-blue-950/10 dark:border-white/10 dark:bg-slate-950">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_24%,rgba(58,168,255,0.18),transparent_18rem),radial-gradient(circle_at_90%_12%,rgba(105,211,142,0.18),transparent_18rem)] dark:bg-[radial-gradient(circle_at_18%_24%,rgba(58,168,255,0.26),transparent_18rem),radial-gradient(circle_at_90%_12%,rgba(105,211,142,0.22),transparent_18rem)]" />
              <div className="relative grid gap-5 lg:grid-cols-[0.92fr_1.08fr]">
                <div className="flex flex-col justify-between rounded-[1.6rem] border border-blue-950/10 bg-white/90 p-5 shadow-xl shadow-blue-950/6 backdrop-blur dark:border-white/10 dark:bg-white/[0.07]">
                  <div>
                    <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-primary dark:bg-white/10 dark:text-white">
                      <PlayCircle className="size-4" aria-hidden="true" />
                      Self-learning course mode
                    </span>
                    <h3 className="mt-5 font-heading text-2xl font-semibold leading-tight text-slate-950 sm:text-3xl dark:text-white">
                      Turn recorded lessons into a guided course experience.
                    </h3>
                    <p className="mt-4 text-sm leading-7 text-slate-600 dark:text-slate-300">
                      Add modules, resources, progress rules, assignments, and
                      certificates so learners can study independently with a
                      premium academy experience.
                    </p>
                  </div>
                  <div className="mt-6 grid gap-3">
                    {["Module progress", "Resource downloads", "Completion certificates"].map(
                      (item) => (
                        <div
                          key={item}
                          className="flex items-center gap-3 rounded-2xl border border-blue-950/8 bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-800 dark:border-white/10 dark:bg-white/10 dark:text-white"
                        >
                          <ShieldCheck className="size-4 text-emerald-500 dark:text-emerald-300" aria-hidden="true" />
                          {item}
                        </div>
                      ),
                    )}
                  </div>
                </div>

                <div className="relative min-h-[21rem] overflow-hidden rounded-[1.6rem] border border-blue-950/10 bg-slate-950 dark:border-white/10">
                  <LazyVideo
                    className="h-full min-h-[21rem] w-full object-cover object-[86%_center] opacity-90"
                    src="/feature-self-learning.mp4"
                    poster="/academy-students-learning.jpg"
                    ariaLabel="KASA self-learning course preview"
                  />
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(3,10,26,0.18),rgba(3,10,26,0.12)_42%,rgba(3,10,26,0.74))]" />
                  <div className="absolute left-4 top-4 flex items-center gap-2 rounded-full border border-white/20 bg-[rgba(3,10,26,0.52)] px-3 py-1.5 text-xs font-semibold !text-white shadow-lg backdrop-blur-md">
                    <span className="grid size-6 place-items-center rounded-full bg-white !text-primary">
                      K
                    </span>
                    Learning path active
                  </div>
                  <div className="absolute bottom-4 left-4 right-4 rounded-[1.25rem] border border-white/20 bg-[rgba(3,10,26,0.76)] p-4 !text-white shadow-xl backdrop-blur-md">
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.18em] !text-emerald-200">
                          Lesson active
                        </p>
                        <p className="mt-1 font-heading text-lg font-semibold !text-white">
                          Learn, track, complete
                        </p>
                      </div>
                      <div className="h-2 w-24 rounded-full bg-white/20">
                        <div className="h-full w-2/3 rounded-full bg-[linear-gradient(90deg,#69d38e,#4aa8ff)]" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

                <div className="grid gap-5 md:grid-cols-3">
                  {signalCards.map((card) => (
                    <div
                      key={card.label}
                      className="group flex items-start gap-4 rounded-[1.55rem] border border-blue-950/10 bg-white p-5 shadow-xl shadow-blue-950/6 transition hover:-translate-y-1 hover:border-primary/40 dark:border-white/10 dark:bg-white/[0.04] md:block"
                    >
                      <span className="grid size-12 shrink-0 place-items-center rounded-2xl border border-blue-950/10 bg-primary/8 text-primary transition group-hover:bg-primary group-hover:text-white dark:border-white/10 dark:bg-primary/12">
                        <card.icon className="size-5" aria-hidden="true" />
                      </span>
                      <div className="min-w-0">
                        <h3 className="font-heading text-lg font-semibold text-slate-950 dark:text-white md:mt-5">
                          {card.label}
                        </h3>
                        <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300 md:mt-3">
                          {card.text}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
          </div>
        </div>

        <div className="mt-5 overflow-hidden rounded-[2.2rem] border border-blue-950/10 bg-slate-950 shadow-2xl shadow-blue-950/10 dark:border-white/10">
          <div className="relative grid min-h-[33rem] lg:grid-cols-[0.95fr_1.05fr]">
            <Image
              src="/feature-live-class-room.jpg"
              alt="Live class management software for online academies"
              fill
              sizes="100vw"
              className="object-cover opacity-88"
            />
            <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(4,10,28,0.86),rgba(7,25,56,0.52),rgba(4,10,28,0.2))]" />
            <div className="relative z-10 flex flex-col justify-between p-6 sm:p-8 lg:p-10">
              <div className="max-w-[36rem]">
                <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-[rgba(3,10,26,0.62)] px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] !text-white shadow-lg backdrop-blur-md">
                  <Video className="size-4" aria-hidden="true" />
                  Live and hybrid delivery
                </span>
                <h3 className="mt-5 font-heading text-3xl font-semibold leading-tight !text-white drop-shadow-sm sm:text-4xl lg:text-5xl">
                  Run live batches, replays, assignments, and doubt sessions from
                  one class workspace.
                </h3>
                <p className="mt-5 max-w-2xl text-base leading-8 !text-slate-100 drop-shadow-sm">
                  KASA keeps schedules, faculty-led cohorts, recordings, reminders,
                  learner progress, and certificates connected so classes do not
                  depend on scattered links.
                </p>
              </div>
              <div className="mt-8 grid max-w-2xl gap-3 sm:grid-cols-2">
                {["Batch calendar", "Faculty workspace", "Replay library", "Attendance and reminders"].map(
                  (item) => (
                    <div
                      key={item}
                      className="rounded-2xl border border-white/18 bg-[rgba(3,10,26,0.56)] px-4 py-3 text-sm font-semibold !text-white shadow-sm backdrop-blur"
                    >
                      {item}
                    </div>
                  ),
                )}
              </div>
            </div>
            <div className="relative z-10 hidden items-end justify-end p-8 lg:flex">
              <div className="w-full max-w-md rounded-[1.8rem] border border-white/20 bg-white/82 p-5 text-slate-950 shadow-2xl shadow-slate-950/18 backdrop-blur-xl dark:bg-slate-950/62 dark:text-white">
                <div className="flex items-center gap-3">
                  <span className="grid size-12 place-items-center rounded-2xl bg-primary/10 text-primary dark:bg-white dark:text-primary">
                    <CalendarClock className="size-6" aria-hidden="true" />
                  </span>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-600 dark:text-emerald-200">
                      Class room signal
                    </p>
                    <h4 className="font-heading text-xl font-semibold text-slate-950 dark:text-white">
                      Today&apos;s batch is ready
                    </h4>
                  </div>
                </div>
                <div className="mt-5 space-y-3">
                  {["Live link shared", "Recording auto-saved", "Certificate rule attached"].map(
                    (item) => (
                      <div
                        key={item}
                        className="flex items-center justify-between rounded-2xl bg-white/75 px-4 py-3 text-sm font-semibold text-slate-800 shadow-sm dark:bg-white/12 dark:text-white"
                      >
                        {item}
                        <BadgeCheck className="size-4 text-emerald-300" aria-hidden="true" />
                      </div>
                    ),
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-5 grid gap-5 lg:grid-cols-3">
          {featureStories.slice(1).map((story) => (
            <Link
              key={story.slug}
              href={featureLink(story.slug)}
              className={`group overflow-hidden rounded-[2rem] border border-blue-950/10 bg-gradient-to-br ${story.tone} p-4 shadow-xl shadow-blue-950/7 transition hover:-translate-y-1 hover:border-primary/40 dark:border-white/10`}
            >
              <div className="relative min-h-[17rem] overflow-hidden rounded-[1.55rem] bg-white/70 dark:bg-slate-950/38">
                <Image
                  src={story.image}
                  alt={story.alt}
                  fill
                  sizes="(min-width: 1024px) 33vw, 100vw"
                  className="object-cover transition duration-700 group-hover:scale-[1.04]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/78 via-slate-950/15 to-transparent" />
                <span className="absolute left-4 top-4 grid size-12 place-items-center rounded-2xl bg-white text-primary shadow-lg">
                  <story.icon className="size-6" aria-hidden="true" />
                </span>
              </div>
              <div className="p-3">
                <h3 className="mt-2 font-heading text-xl font-semibold leading-tight text-slate-950 dark:text-white">
                  {story.title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">
                  {story.text}
                </p>
                <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-primary transition group-hover:gap-3">
                  Open feature
                  <ArrowRight className="size-4" aria-hidden="true" />
                </span>
              </div>
            </Link>
          ))}

          <Link
            href={featureLink("admin-dashboard-reporting")}
            className="group overflow-hidden rounded-[2rem] border border-blue-950/10 bg-gradient-to-br from-blue-500/14 via-white to-emerald-500/10 p-4 shadow-xl shadow-blue-950/7 transition hover:-translate-y-1 hover:border-primary/40 dark:border-white/10 dark:from-blue-400/10 dark:via-white/[0.03] dark:to-emerald-400/10"
          >
            <div className="relative min-h-[17rem] overflow-hidden rounded-[1.55rem] bg-white/70 dark:bg-slate-950/38">
              <Image
                src="/feature-analytics-team.png"
                alt="Admin dashboard and plan controls for academy operations"
                fill
                sizes="(min-width: 1024px) 33vw, 100vw"
                className="object-cover transition duration-700 group-hover:scale-[1.04]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/82 via-slate-950/18 to-transparent" />
              <span className="absolute left-4 top-4 grid size-12 place-items-center rounded-2xl bg-white text-primary shadow-lg">
                <LayoutDashboard className="size-6" aria-hidden="true" />
              </span>
              <div className="absolute bottom-4 left-4 right-4 grid grid-cols-2 gap-2">
                {["Users", "Courses", "Revenue", "Reports"].map((item) => (
                  <span
                    key={item}
                    className="rounded-2xl border border-white/20 bg-white/82 px-3 py-2 text-xs font-semibold text-slate-900 shadow-sm backdrop-blur dark:bg-slate-950/62 dark:text-white"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
            <div className="p-3">
              <h3 className="mt-2 font-heading text-xl font-semibold leading-tight text-slate-950 dark:text-white">
                Admin dashboard and plan controls
              </h3>
              <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">
                Track users, courses, orders, leads, certificates, reports, role
                access, and plan limits from one operating dashboard.
              </p>
              <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-primary transition group-hover:gap-3">
                View admin features
                <ArrowRight className="size-4" aria-hidden="true" />
              </span>
            </div>
          </Link>
        </div>

        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          {quickLinks.map(({ slug, icon: Icon, label }) => (
            <Link
              key={slug}
              href={featureLink(slug)}
              className="inline-flex items-center gap-2 rounded-full border border-blue-950/10 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm transition hover:-translate-y-0.5 hover:border-primary hover:text-primary dark:border-white/10 dark:bg-white/[0.05] dark:text-slate-200"
            >
              <Icon className="size-4 text-primary" aria-hidden="true" />
              {label}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
