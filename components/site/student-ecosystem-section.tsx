import Link from "next/link";
import {
  ArrowRight,
  BookOpenCheck,
  BriefcaseBusiness,
  GraduationCap,
  Network,
} from "lucide-react";
import { siteContainerClasses } from "@/components/site/site-container";
import { siteButtonClasses } from "@/components/site/site-button";

const pillars = [
  {
    title: "Study Resources",
    description: "Previous year papers, notes, project downloads, and aptitude practice for college students.",
    icon: BookOpenCheck,
  },
  {
    title: "Career Tools",
    description: "Resume builder, ATS checker, AI career roadmap, and mock interview prep in the same KASA experience.",
    icon: GraduationCap,
  },
  {
    title: "Placement Prep",
    description: "Interview questions, internship discovery, referral support, and project stories for freshers.",
    icon: BriefcaseBusiness,
  },
  {
    title: "Student Network",
    description: "Community, mentorship, and student marketplace for asking questions and sharing useful resources.",
    icon: Network,
  },
];

export function StudentEcosystemSection() {
  return (
    <section className="bg-white px-4 py-16 dark:bg-surface sm:px-6 sm:py-20 lg:px-8">
      <div className={siteContainerClasses({ className: "px-0" })}>
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <div className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary dark:text-emerald-200">
              For college students
            </p>
            <h2 className="mt-3 font-heading text-3xl font-semibold leading-[1.12] text-slate-950 sm:text-5xl dark:text-white">
              Notes, papers, projects, resumes, and placement prep in one student hub.
            </h2>
            <p className="mt-5 text-base leading-8 text-slate-600 dark:text-slate-300">
              Students can use KASA for exam preparation, project work, resume building, ATS checks, interview practice,
              internships, and mentorship while academies continue using KASA LMS for teaching and operations.
            </p>
          </div>

          <div className="flex flex-col gap-3 rounded-[1.5rem] border border-blue-950/10 bg-[#f8fbff] p-4 dark:border-white/10 dark:bg-white/[0.04] sm:p-5">
            <div className="grid gap-3 sm:grid-cols-2">
              {pillars.map((pillar) => {
                const Icon = pillar.icon;
                return (
                  <div
                    key={pillar.title}
                    className="rounded-[1rem] border border-blue-950/10 bg-white p-4 shadow-sm shadow-blue-950/5 dark:border-white/10 dark:bg-slate-950/36"
                  >
                    <div className="grid size-10 place-items-center rounded-xl bg-blue-50 text-primary dark:bg-primary/12 dark:text-emerald-200">
                      <Icon className="size-5" aria-hidden="true" />
                    </div>
                    <h3 className="mt-4 text-base font-semibold text-slate-950 dark:text-white">
                      {pillar.title}
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">
                      {pillar.description}
                    </p>
                  </div>
                );
              })}
            </div>

            <div className="flex flex-col gap-3 rounded-[1rem] border border-blue-950/10 bg-white p-4 dark:border-white/10 dark:bg-slate-950/36 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm font-semibold text-slate-950 dark:text-white">
                  Student hub is ready to explore
                </p>
                <p className="mt-1 text-sm leading-6 text-slate-600 dark:text-slate-300">
                  Open the hub to explore student tools, resources, and career support.
                </p>
              </div>
              <Link href="/students" className={siteButtonClasses({ variant: "outline", size: "sm", className: "shrink-0" })}>
                Open student hub
                <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
