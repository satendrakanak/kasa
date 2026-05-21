"use client";

import { useMemo, useState } from "react";
import {
  BookOpenCheck,
  CheckCircle2,
  Minus,
  Plus,
  RotateCcw,
  Target,
  Trash2,
  TrendingUp,
} from "lucide-react";

type ScaleKey = "four" | "ten";

type Course = {
  id: number;
  name: string;
  credits: number;
  grade: string;
};

const scaleOptions = {
  four: {
    label: "4.0 GPA",
    max: 4,
    defaultTarget: 3.2,
    grades: [
      ["A+", 4],
      ["A", 4],
      ["A-", 3.7],
      ["B+", 3.3],
      ["B", 3],
      ["B-", 2.7],
      ["C+", 2.3],
      ["C", 2],
      ["D", 1],
      ["F", 0],
    ],
  },
  ten: {
    label: "10.0 CGPA",
    max: 10,
    defaultTarget: 8,
    grades: [
      ["O", 10],
      ["A+", 9],
      ["A", 8],
      ["B+", 7],
      ["B", 6],
      ["C", 5],
      ["P", 4],
      ["F", 0],
    ],
  },
} satisfies Record<
  ScaleKey,
  { label: string; max: number; defaultTarget: number; grades: Array<[string, number]> }
>;

const initialCourses: Course[] = [
  { id: 1, name: "Subject 1", credits: 4, grade: "A" },
  { id: 2, name: "Subject 2", credits: 4, grade: "B+" },
  { id: 3, name: "Subject 3", credits: 3, grade: "A" },
  { id: 4, name: "Subject 4", credits: 3, grade: "B" },
  { id: 5, name: "Subject 5", credits: 2, grade: "A+" },
];

const tenScalePreset: Course[] = [
  { id: 1, name: "Subject 1", credits: 4, grade: "A" },
  { id: 2, name: "Subject 2", credits: 4, grade: "B+" },
  { id: 3, name: "Subject 3", credits: 3, grade: "A+" },
  { id: 4, name: "Subject 4", credits: 3, grade: "B" },
  { id: 5, name: "Subject 5", credits: 2, grade: "O" },
];

const clampNumber = (value: number) => (Number.isFinite(value) && value > 0 ? value : 0);

function getGradePoint(scale: ScaleKey, grade: string) {
  return scaleOptions[scale].grades.find(([label]) => label === grade)?.[1] ?? 0;
}

function getResultMessage(gpa: number, target: number, max: number) {
  if (gpa >= Math.min(max, target + max * 0.12)) {
    return {
      title: "Excellent GPA range",
      description: "Your weighted grade points are comfortably above the target.",
      tone: "text-emerald-700 dark:text-emerald-300",
      bg: "bg-emerald-50 dark:bg-emerald-500/10",
    };
  }
  if (gpa >= target) {
    return {
      title: "You are above target",
      description: "Your GPA is currently on track. Keep the same consistency in upcoming subjects.",
      tone: "text-teal-700 dark:text-teal-300",
      bg: "bg-teal-50 dark:bg-teal-500/10",
    };
  }
  if (gpa >= target - max * 0.1) {
    return {
      title: "Close to target",
      description: "A small improvement in high-credit subjects can lift your GPA quickly.",
      tone: "text-amber-700 dark:text-amber-300",
      bg: "bg-amber-50 dark:bg-amber-500/10",
    };
  }
  return {
    title: "Below target",
    description: "Focus on the subjects with more credits first because they affect GPA the most.",
    tone: "text-rose-700 dark:text-rose-300",
    bg: "bg-rose-50 dark:bg-rose-500/10",
  };
}

export function GpaCalculator() {
  const [scale, setScale] = useState<ScaleKey>("ten");
  const [courses, setCourses] = useState<Course[]>(tenScalePreset);
  const [targetGpa, setTargetGpa] = useState(8);
  const [remainingCredits, setRemainingCredits] = useState(12);

  const activeScale = scaleOptions[scale];

  const result = useMemo(() => {
    const rows = courses.map((course) => {
      const credits = Math.min(Math.max(clampNumber(course.credits), 0), 12);
      const point = getGradePoint(scale, course.grade);
      return {
        ...course,
        credits,
        point,
        weighted: credits * point,
      };
    });
    const totalCredits = rows.reduce((sum, course) => sum + course.credits, 0);
    const totalPoints = rows.reduce((sum, course) => sum + course.weighted, 0);
    const gpa = totalCredits > 0 ? totalPoints / totalCredits : 0;
    const safeTarget = Math.min(Math.max(targetGpa, 0), activeScale.max);
    const safeRemainingCredits = Math.min(Math.max(clampNumber(remainingCredits), 0), 120);
    const requiredFutureAverage =
      safeRemainingCredits > 0
        ? (safeTarget * (totalCredits + safeRemainingCredits) - totalPoints) / safeRemainingCredits
        : 0;
    const progress = activeScale.max > 0 ? Math.min((gpa / activeScale.max) * 100, 100) : 0;
    const targetProgress =
      activeScale.max > 0 ? Math.min((safeTarget / activeScale.max) * 100, 100) : 0;
    const percentageEstimate =
      scale === "ten" ? Math.min(gpa * 9.5, 100) : Math.min((gpa / 4) * 100, 100);
    const message = getResultMessage(gpa, safeTarget, activeScale.max);

    return {
      rows,
      totalCredits,
      totalPoints,
      gpa,
      target: safeTarget,
      remainingCredits: safeRemainingCredits,
      requiredFutureAverage,
      progress,
      targetProgress,
      percentageEstimate,
      gap: gpa - safeTarget,
      message,
    };
  }, [activeScale.max, courses, remainingCredits, scale, targetGpa]);

  const setScaleMode = (nextScale: ScaleKey) => {
    setScale(nextScale);
    setTargetGpa(scaleOptions[nextScale].defaultTarget);
    setCourses((currentCourses) =>
      currentCourses.map((course) => ({
        ...course,
        grade: scaleOptions[nextScale].grades[Math.min(2, scaleOptions[nextScale].grades.length - 1)][0],
      })),
    );
  };

  const updateCourse = (id: number, patch: Partial<Course>) => {
    setCourses((currentCourses) =>
      currentCourses.map((course) => (course.id === id ? { ...course, ...patch } : course)),
    );
  };

  const updateCredits = (id: number, delta: number) => {
    setCourses((currentCourses) =>
      currentCourses.map((course) =>
        course.id === id ? { ...course, credits: Math.min(Math.max(course.credits + delta, 0), 12) } : course,
      ),
    );
  };

  const addCourse = () => {
    const nextId = Math.max(...courses.map((course) => course.id), 0) + 1;
    setCourses((currentCourses) => [
      ...currentCourses,
      {
        id: nextId,
        name: `Subject ${nextId}`,
        credits: 3,
        grade: activeScale.grades[1][0],
      },
    ]);
  };

  const removeCourse = (id: number) => {
    setCourses((currentCourses) =>
      currentCourses.length > 1 ? currentCourses.filter((course) => course.id !== id) : currentCourses,
    );
  };

  const resetCalculator = () => {
    setScale("ten");
    setCourses(tenScalePreset);
    setTargetGpa(8);
    setRemainingCredits(12);
  };

  const plannerCopy =
    result.remainingCredits === 0
      ? "Add remaining credits to plan your target GPA."
      : result.requiredFutureAverage <= 0
        ? `Your current GPA is already enough for the ${result.target.toFixed(1)} target.`
        : result.requiredFutureAverage > activeScale.max
          ? `This target is not possible with only ${result.remainingCredits} remaining credits.`
          : `You need an average of ${result.requiredFutureAverage.toFixed(2)} in the remaining ${result.remainingCredits} credits.`;

  return (
    <section className="relative px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto grid w-full max-w-[108rem] gap-5 lg:grid-cols-[0.98fr_1.02fr]">
        <div className="relative overflow-hidden rounded-[1.25rem] border border-blue-950/10 bg-white/92 p-5 shadow-xl shadow-blue-950/8 backdrop-blur dark:border-white/10 dark:bg-surface/90 sm:p-7">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-primary dark:text-emerald-200">
                GPA setup
              </p>
              <h2 className="mt-2 font-heading text-3xl font-semibold text-slate-950 dark:text-white">
                Add your subjects
              </h2>
              <p className="mt-2 max-w-xl text-sm leading-6 text-slate-600 dark:text-slate-300">
                Select grades and credits. GPA updates instantly with weighted subject points.
              </p>
            </div>
            <button
              type="button"
              onClick={resetCalculator}
              className="inline-grid size-10 cursor-pointer place-items-center rounded-full border border-blue-950/10 bg-white/86 text-slate-700 shadow-sm transition hover:border-primary/35 hover:text-primary dark:border-white/10 dark:bg-white/7 dark:text-white dark:hover:bg-white/12"
              aria-label="Reset calculator"
              title="Reset calculator"
            >
              <RotateCcw className="size-4" aria-hidden="true" />
            </button>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-2 rounded-[1.1rem] border border-blue-950/10 bg-white p-1.5 shadow-sm shadow-blue-950/5 dark:border-white/10 dark:bg-white/[0.04]">
            {(["ten", "four"] as const).map((scaleKey) => (
              <button
                key={scaleKey}
                type="button"
                onClick={() => setScaleMode(scaleKey)}
                className={[
                  "cursor-pointer rounded-[0.85rem] px-3 py-2 text-sm font-semibold transition",
                  scale === scaleKey
                    ? "bg-[image:var(--button-solid)] !text-white shadow-lg shadow-blue-950/15"
                    : "text-slate-600 hover:bg-blue-50 hover:text-primary dark:text-slate-300 dark:hover:bg-white/8 dark:hover:text-white",
                ].join(" ")}
              >
                {scaleOptions[scaleKey].label}
              </button>
            ))}
          </div>

          <div className="mt-5 grid gap-3">
            {result.rows.map((course) => (
              <div
                key={course.id}
                className="grid gap-3 rounded-[1.1rem] border border-blue-950/10 bg-white/82 p-4 shadow-sm shadow-blue-950/5 dark:border-white/10 dark:bg-white/[0.04] sm:grid-cols-[1.1fr_0.8fr_0.9fr_auto] sm:items-end"
              >
                <label className="block">
                  <span className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">
                    Subject
                  </span>
                  <input
                    type="text"
                    value={course.name}
                    onChange={(event) => updateCourse(course.id, { name: event.target.value })}
                    className="mt-2 h-11 w-full rounded-xl border border-blue-950/10 bg-white px-3 text-sm font-semibold text-slate-950 outline-none transition focus:border-primary/45 dark:border-white/10 dark:bg-slate-950/55 dark:text-white"
                  />
                </label>

                <label className="block">
                  <span className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">
                    Grade
                  </span>
                  <select
                    value={course.grade}
                    onChange={(event) => updateCourse(course.id, { grade: event.target.value })}
                    className="mt-2 h-11 w-full cursor-pointer rounded-xl border border-blue-950/10 bg-white px-3 text-sm font-semibold text-slate-950 outline-none transition focus:border-primary/45 dark:border-white/10 dark:bg-slate-950/55 dark:text-white"
                  >
                    {activeScale.grades.map(([label, point]) => (
                      <option key={label} value={label}>
                        {label} - {point}
                      </option>
                    ))}
                  </select>
                </label>

                <div>
                  <span className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">
                    Credits
                  </span>
                  <div className="mt-2 grid h-11 grid-cols-[2.5rem_1fr_2.5rem] overflow-hidden rounded-xl border border-blue-950/10 bg-white shadow-sm shadow-blue-950/5 dark:border-white/10 dark:bg-slate-950/55">
                    <button
                      type="button"
                      onClick={() => updateCredits(course.id, -1)}
                      className="grid cursor-pointer place-items-center border-r border-blue-950/10 text-slate-600 transition hover:bg-emerald-50 hover:text-emerald-700 dark:border-white/10 dark:text-slate-200 dark:hover:bg-white/8"
                      aria-label={`Decrease credits for ${course.name}`}
                      title={`Decrease credits for ${course.name}`}
                    >
                      <Minus className="size-4" aria-hidden="true" />
                    </button>
                    <div className="grid place-items-center text-base font-semibold text-slate-950 dark:text-white">
                      {course.credits}
                    </div>
                    <button
                      type="button"
                      onClick={() => updateCredits(course.id, 1)}
                      className="grid cursor-pointer place-items-center border-l border-blue-950/10 text-slate-600 transition hover:bg-emerald-50 hover:text-emerald-700 dark:border-white/10 dark:text-slate-200 dark:hover:bg-white/8"
                      aria-label={`Increase credits for ${course.name}`}
                      title={`Increase credits for ${course.name}`}
                    >
                      <Plus className="size-4" aria-hidden="true" />
                    </button>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => removeCourse(course.id)}
                  className="inline-grid h-11 cursor-pointer place-items-center rounded-xl border border-blue-950/10 bg-white px-3 text-slate-500 transition hover:border-rose-200 hover:bg-rose-50 hover:text-rose-700 dark:border-white/10 dark:bg-white/[0.04] dark:text-slate-300 dark:hover:bg-rose-400/10 dark:hover:text-rose-200"
                  aria-label={`Remove ${course.name}`}
                  title={`Remove ${course.name}`}
                >
                  <Trash2 className="size-4" aria-hidden="true" />
                </button>
              </div>
            ))}
          </div>

          <div className="mt-5 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={addCourse}
              className="inline-flex cursor-pointer items-center gap-2 rounded-full bg-[image:var(--button-solid)] px-4 py-2 text-sm font-semibold !text-white shadow-lg shadow-blue-950/12 transition hover:-translate-y-0.5"
            >
              <Plus className="size-4" aria-hidden="true" />
              Add subject
            </button>
            <button
              type="button"
              onClick={() => setCourses((scale === "ten" ? tenScalePreset : initialCourses).slice(0, 6))}
              className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-blue-950/10 bg-white/86 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-primary/35 hover:text-primary dark:border-white/10 dark:bg-white/7 dark:text-slate-200"
            >
              <BookOpenCheck className="size-4" aria-hidden="true" />
              Use sample semester
            </button>
          </div>

          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            <SmallNumberField
              label="Target GPA"
              value={targetGpa}
              min={0}
              max={activeScale.max}
              step={scale === "ten" ? 0.1 : 0.01}
              onChange={setTargetGpa}
            />
            <SmallNumberField
              label="Remaining credits"
              value={remainingCredits}
              min={0}
              max={120}
              step={1}
              onChange={setRemainingCredits}
            />
          </div>
        </div>

        <div className="rounded-[1.25rem] border border-blue-950/10 bg-white/94 p-5 shadow-2xl shadow-blue-950/12 backdrop-blur dark:border-white/10 dark:bg-surface/92 sm:p-7">
          <div className="flex flex-wrap items-start justify-between gap-5">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary dark:text-emerald-200">
                Your result
              </p>
              <div className="mt-3 font-heading text-6xl font-semibold leading-none text-slate-950 sm:text-7xl dark:text-white">
                {result.gpa.toFixed(2)}
              </div>
              <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">
                {result.totalCredits} credits on {activeScale.label} scale.
              </p>
            </div>
            <div className={`flex items-center gap-2 rounded-full px-3 py-2 ${result.message.bg}`}>
              <CheckCircle2 className={`size-5 ${result.message.tone}`} aria-hidden="true" />
              <span className={`text-sm font-semibold ${result.message.tone}`}>
                Target {result.target.toFixed(scale === "ten" ? 1 : 2)}
              </span>
            </div>
          </div>

          <div className="mt-7">
            <div className="mb-2 flex items-center justify-between text-xs font-semibold uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">
              <span>Progress to {activeScale.max.toFixed(1)}</span>
              <span>Target {result.target.toFixed(scale === "ten" ? 1 : 2)}</span>
            </div>
            <div className="relative h-4 w-full overflow-hidden rounded-full bg-slate-300/80 shadow-inner shadow-slate-400/35 dark:bg-white/14 dark:shadow-none">
              <div
                className="h-full rounded-full bg-[image:var(--button-solid)] transition-[width] duration-300"
                style={{ width: `${result.progress}%` }}
              />
              <div
                className="absolute top-0 h-full w-0.5 bg-slate-950/45 dark:bg-white/70"
                style={{ left: `${result.targetProgress}%` }}
              />
            </div>
          </div>

          <div className={`mt-7 rounded-[1.1rem] border p-5 ${result.message.bg} border-blue-950/10 dark:border-white/10`}>
            <h3 className="font-heading text-2xl font-semibold text-slate-950 dark:text-white">
              {result.message.title}
            </h3>
            <p className="mt-2 text-sm leading-6 text-slate-700 dark:text-slate-200">
              {plannerCopy}
            </p>
          </div>

          <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <Metric label="Credits" value={result.totalCredits.toString()} icon={BookOpenCheck} tone="primary" />
            <Metric label="Points" value={result.totalPoints.toFixed(1)} icon={Target} tone="emerald" />
            <Metric label="Gap" value={Math.abs(result.gap).toFixed(2)} icon={TrendingUp} tone={result.gap >= 0 ? "emerald" : "rose"} />
            <Metric label="Estimate" value={`${result.percentageEstimate.toFixed(1)}%`} icon={CheckCircle2} tone="amber" />
          </div>

          <div className="mt-6 grid gap-3 md:grid-cols-2">
            <InfoCard
              title="Target planner"
              value={
                result.remainingCredits === 0
                  ? "Add credits"
                  : result.requiredFutureAverage > activeScale.max
                    ? "Not possible"
                    : result.requiredFutureAverage <= 0
                      ? "Already safe"
                      : result.requiredFutureAverage.toFixed(2)
              }
              description={plannerCopy}
              positive={result.requiredFutureAverage <= activeScale.max}
            />
            <InfoCard
              title="Best focus"
              value="High credits"
              description="Improve high-credit subjects first because they move GPA faster."
              positive
            />
          </div>

          <div className="mt-6 rounded-[1.1rem] border border-blue-950/10 bg-blue-50/70 p-4 text-sm leading-6 text-slate-700 dark:border-white/10 dark:bg-white/[0.05] dark:text-slate-300">
            <div className="font-semibold text-slate-950 dark:text-white">{result.message.description}</div>
            <div className="mt-1">
              Formula: total credit points divided by total credits.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function SmallNumberField({
  label,
  value,
  min,
  max,
  step,
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (value: number) => void;
}) {
  const normalize = (nextValue: number) => Math.min(Math.max(nextValue, min), max);

  return (
    <div className="rounded-[1.1rem] border border-blue-950/10 bg-white/82 p-4 shadow-sm shadow-blue-950/5 dark:border-white/10 dark:bg-white/[0.04]">
      <div className="flex items-center justify-between gap-3">
        <span className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">
          {label}
        </span>
        <span className="rounded-full bg-emerald-50 px-3 py-1 text-sm font-semibold text-emerald-700 dark:bg-emerald-400/10 dark:text-emerald-200">
          {value}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(event) => onChange(normalize(Number(event.target.value)))}
        className="mt-4 h-2 w-full cursor-pointer accent-[#22b573] dark:accent-[#58c98a]"
      />
      <input
        type="number"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(event) => onChange(normalize(Number(event.target.value)))}
        className="mt-3 h-11 w-full rounded-xl border border-blue-950/10 bg-white px-3 text-lg font-semibold text-slate-950 outline-none transition focus:border-primary/45 dark:border-white/10 dark:bg-slate-950/55 dark:text-white"
      />
    </div>
  );
}

function InfoCard({
  title,
  value,
  description,
  positive,
}: {
  title: string;
  value: string;
  description: string;
  positive: boolean;
}) {
  return (
    <div className="rounded-[1.1rem] border border-blue-950/10 bg-white p-4 shadow-sm shadow-blue-950/5 dark:border-white/10 dark:bg-white/[0.05]">
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">
            {title}
          </div>
          <div className="mt-2 font-heading text-3xl font-semibold text-slate-950 dark:text-white">
            {value}
          </div>
        </div>
        <span
          className={[
            "grid size-10 place-items-center rounded-xl",
            positive
              ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-400/10 dark:text-emerald-200"
              : "bg-rose-50 text-rose-700 dark:bg-rose-400/10 dark:text-rose-200",
          ].join(" ")}
        >
          {positive ? (
            <CheckCircle2 className="size-5" aria-hidden="true" />
          ) : (
            <TrendingUp className="size-5" aria-hidden="true" />
          )}
        </span>
      </div>
      <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">{description}</p>
    </div>
  );
}

function Metric({
  label,
  value,
  icon: Icon,
  tone,
}: {
  label: string;
  value: string;
  icon: typeof TrendingUp;
  tone: "primary" | "amber" | "emerald" | "rose";
}) {
  const toneClasses = {
    primary: "bg-blue-50 text-primary dark:bg-primary/10 dark:text-emerald-200",
    amber: "bg-amber-50 text-amber-700 dark:bg-amber-400/10 dark:text-amber-200",
    emerald: "bg-emerald-50 text-emerald-700 dark:bg-emerald-400/10 dark:text-emerald-200",
    rose: "bg-rose-50 text-rose-700 dark:bg-rose-400/10 dark:text-rose-200",
  };

  return (
    <div className="rounded-[1.1rem] border border-blue-950/10 bg-white p-4 shadow-sm shadow-blue-950/5 dark:border-white/10 dark:bg-white/[0.05]">
      <div className="flex items-center justify-between gap-3">
        <div className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">
          {label}
        </div>
        <span className={`grid size-8 place-items-center rounded-lg ${toneClasses[tone]}`}>
          <Icon className="size-4" aria-hidden="true" />
        </span>
      </div>
      <div className="mt-3 text-3xl font-semibold text-slate-950 dark:text-white">
        {value}
      </div>
    </div>
  );
}
