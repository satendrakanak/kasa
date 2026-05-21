"use client";

import { useMemo, useState } from "react";
import {
  AlertCircle,
  BookOpenCheck,
  CheckCircle2,
  Minus,
  Plus,
  RotateCcw,
  Target,
  Trash2,
  TrendingUp,
} from "lucide-react";

type Assessment = {
  id: number;
  name: string;
  earned: number;
  total: number;
  weight: number;
};

const initialAssessments: Assessment[] = [
  { id: 1, name: "Assignments", earned: 86, total: 100, weight: 20 },
  { id: 2, name: "Quizzes", earned: 42, total: 50, weight: 15 },
  { id: 3, name: "Midterm", earned: 78, total: 100, weight: 30 },
  { id: 4, name: "Project", earned: 44, total: 50, weight: 25 },
];

const clampNumber = (value: number) => (Number.isFinite(value) && value > 0 ? value : 0);

function getLetterGrade(percentage: number) {
  if (percentage >= 90) return { label: "A+", message: "Excellent grade range" };
  if (percentage >= 80) return { label: "A", message: "Strong grade range" };
  if (percentage >= 70) return { label: "B", message: "Good grade range" };
  if (percentage >= 60) return { label: "C", message: "Average grade range" };
  if (percentage >= 40) return { label: "D", message: "Needs improvement" };
  return { label: "F", message: "Needs focused improvement" };
}

function getStatus(grade: number, target: number, overweight: boolean) {
  if (overweight) {
    return {
      title: "Weights need adjustment",
      description: "Total weight should be 100%. Reduce extra weight to make the result accurate.",
      tone: "text-amber-700 dark:text-amber-300",
      bg: "bg-amber-50 dark:bg-amber-500/10",
      icon: AlertCircle,
    };
  }
  if (grade >= target + 10) {
    return {
      title: "Excellent grade range",
      description: "You have a comfortable buffer above your target grade.",
      tone: "text-emerald-700 dark:text-emerald-300",
      bg: "bg-emerald-50 dark:bg-emerald-500/10",
      icon: CheckCircle2,
    };
  }
  if (grade >= target) {
    return {
      title: "You are above target",
      description: "Your current weighted grade is on track.",
      tone: "text-teal-700 dark:text-teal-300",
      bg: "bg-teal-50 dark:bg-teal-500/10",
      icon: CheckCircle2,
    };
  }
  if (grade >= target - 5) {
    return {
      title: "Close to target",
      description: "You are close, so the remaining work can lift your final grade.",
      tone: "text-amber-700 dark:text-amber-300",
      bg: "bg-amber-50 dark:bg-amber-500/10",
      icon: TrendingUp,
    };
  }
  return {
    title: "Below target",
    description: "You need a stronger average in the remaining weighted work.",
    tone: "text-rose-700 dark:text-rose-300",
    bg: "bg-rose-50 dark:bg-rose-500/10",
    icon: TrendingUp,
  };
}

export function GradeCalculator() {
  const [assessments, setAssessments] = useState<Assessment[]>(initialAssessments);
  const [target, setTarget] = useState(80);

  const result = useMemo(() => {
    const rows = assessments.map((item) => {
      const total = Math.max(clampNumber(item.total), 1);
      const earned = Math.min(clampNumber(item.earned), total);
      const weight = Math.min(Math.max(Number.isFinite(item.weight) ? item.weight : 0, 0), 100);
      const score = (earned / total) * 100;
      const contribution = (score * weight) / 100;

      return {
        ...item,
        earned,
        total,
        weight,
        score,
        contribution,
      };
    });

    const completedWeight = rows.reduce((sum, item) => sum + item.weight, 0);
    const weightedPoints = rows.reduce((sum, item) => sum + item.contribution, 0);
    const overweight = completedWeight > 100;
    const remainingWeight = Math.max(100 - completedWeight, 0);
    const currentGrade = completedWeight > 0 ? (weightedPoints / completedWeight) * 100 : 0;
    const projectedGrade = weightedPoints + (remainingWeight * currentGrade) / 100;
    const safeTarget = Math.min(Math.max(target, 0), 100);
    const requiredRemainingAverage =
      remainingWeight > 0 ? ((safeTarget - weightedPoints) / remainingWeight) * 100 : 0;
    const letter = getLetterGrade(currentGrade);
    const status = getStatus(currentGrade, safeTarget, overweight);

    return {
      rows,
      completedWeight,
      weightedPoints,
      remainingWeight,
      currentGrade,
      projectedGrade: Math.min(Math.max(projectedGrade, 0), 100),
      target: safeTarget,
      requiredRemainingAverage,
      letter,
      status,
      overweight,
      progress: Math.min(Math.max(currentGrade, 0), 100),
    };
  }, [assessments, target]);

  const StatusIcon = result.status.icon;

  const updateAssessment = (id: number, patch: Partial<Assessment>) => {
    setAssessments((current) =>
      current.map((item) => (item.id === id ? { ...item, ...patch } : item)),
    );
  };

  const stepAssessment = (id: number, key: "earned" | "total" | "weight", delta: number) => {
    setAssessments((current) =>
      current.map((item) => {
        if (item.id !== id) return item;
        const nextValue = Math.max(0, item[key] + delta);
        return { ...item, [key]: key === "weight" ? Math.min(nextValue, 100) : nextValue };
      }),
    );
  };

  const addAssessment = () => {
    const nextId = Math.max(...assessments.map((item) => item.id), 0) + 1;
    setAssessments((current) => [
      ...current,
      { id: nextId, name: `Assessment ${nextId}`, earned: 0, total: 100, weight: 10 },
    ]);
  };

  const removeAssessment = (id: number) => {
    setAssessments((current) =>
      current.length > 1 ? current.filter((item) => item.id !== id) : current,
    );
  };

  const resetCalculator = () => {
    setAssessments(initialAssessments);
    setTarget(80);
  };

  const targetCopy = result.overweight
    ? "Total weight is above 100%, so reduce weights before using the target planner."
    : result.remainingWeight === 0
      ? result.weightedPoints >= result.target
        ? `Your final weighted grade is already ${result.weightedPoints.toFixed(2)}%.`
        : `No remaining weight is left. Your final weighted grade is ${result.weightedPoints.toFixed(2)}%.`
      : result.requiredRemainingAverage <= 0
        ? `You are already safe for ${result.target}%, even with the remaining weight.`
        : result.requiredRemainingAverage > 100
          ? `This target is not possible with only ${result.remainingWeight.toFixed(1)}% remaining weight.`
          : `You need ${result.requiredRemainingAverage.toFixed(2)}% average in the remaining ${result.remainingWeight.toFixed(1)}% weight.`;

  return (
    <section className="relative px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto grid w-full max-w-[108rem] gap-5 lg:grid-cols-[1fr_1fr]">
        <div className="relative overflow-hidden rounded-[1.25rem] border border-blue-950/10 bg-white/92 p-5 shadow-xl shadow-blue-950/8 backdrop-blur dark:border-white/10 dark:bg-surface/90 sm:p-7">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-primary dark:text-emerald-200">
                Grade setup
              </p>
              <h2 className="mt-2 font-heading text-3xl font-semibold text-slate-950 dark:text-white">
                Add your coursework
              </h2>
              <p className="mt-2 max-w-xl text-sm leading-6 text-slate-600 dark:text-slate-300">
                Enter marks and weight for each assignment, quiz, exam, or project.
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

          <div className="mt-6 grid gap-3">
            {result.rows.map((item) => (
              <div
                key={item.id}
                className="rounded-[1.1rem] border border-blue-950/10 bg-white/82 p-4 shadow-sm shadow-blue-950/5 dark:border-white/10 dark:bg-white/[0.04]"
              >
                <div className="grid gap-3 lg:grid-cols-[1.1fr_0.8fr_0.8fr_0.8fr_auto] lg:items-end">
                  <label className="block">
                    <span className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">
                      Item
                    </span>
                    <input
                      type="text"
                      value={item.name}
                      onChange={(event) => updateAssessment(item.id, { name: event.target.value })}
                      className="mt-2 h-11 w-full rounded-xl border border-blue-950/10 bg-white px-3 text-sm font-semibold text-slate-950 outline-none transition focus:border-primary/45 dark:border-white/10 dark:bg-slate-950/55 dark:text-white"
                    />
                  </label>
                  <StepperField
                    label="Scored"
                    value={item.earned}
                    onChange={(value) => updateAssessment(item.id, { earned: value })}
                    onDecrease={() => stepAssessment(item.id, "earned", -1)}
                    onIncrease={() => stepAssessment(item.id, "earned", 1)}
                  />
                  <StepperField
                    label="Total"
                    value={item.total}
                    min={1}
                    onChange={(value) => updateAssessment(item.id, { total: Math.max(value, 1) })}
                    onDecrease={() => stepAssessment(item.id, "total", -1)}
                    onIncrease={() => stepAssessment(item.id, "total", 1)}
                  />
                  <StepperField
                    label="Weight %"
                    value={item.weight}
                    max={100}
                    onChange={(value) => updateAssessment(item.id, { weight: Math.min(value, 100) })}
                    onDecrease={() => stepAssessment(item.id, "weight", -1)}
                    onIncrease={() => stepAssessment(item.id, "weight", 1)}
                  />
                  <button
                    type="button"
                    onClick={() => removeAssessment(item.id)}
                    className="inline-grid h-11 cursor-pointer place-items-center rounded-xl border border-blue-950/10 bg-white px-3 text-slate-500 transition hover:border-rose-200 hover:bg-rose-50 hover:text-rose-700 dark:border-white/10 dark:bg-white/[0.04] dark:text-slate-300 dark:hover:bg-rose-400/10 dark:hover:text-rose-200"
                    aria-label={`Remove ${item.name}`}
                    title={`Remove ${item.name}`}
                  >
                    <Trash2 className="size-4" aria-hidden="true" />
                  </button>
                </div>
                <div className="mt-3 grid gap-2 text-xs font-semibold text-slate-500 dark:text-slate-400 sm:grid-cols-2">
                  <div>{item.score.toFixed(2)}% score in this item</div>
                  <div>{item.contribution.toFixed(2)} points added to final grade</div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-5 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={addAssessment}
              className="inline-flex cursor-pointer items-center gap-2 rounded-full bg-[image:var(--button-solid)] px-4 py-2 text-sm font-semibold !text-white shadow-lg shadow-blue-950/12 transition hover:-translate-y-0.5"
            >
              <Plus className="size-4" aria-hidden="true" />
              Add item
            </button>
            {[60, 70, 75, 80, 90, 100].map((preset) => (
              <button
                key={preset}
                type="button"
                onClick={() => setTarget(preset)}
                className={[
                  "cursor-pointer rounded-full border px-3 py-2 text-sm font-semibold transition",
                  result.target === preset
                    ? "border-emerald-500 bg-emerald-50 text-emerald-800 shadow-sm shadow-emerald-950/8 dark:border-emerald-300 dark:bg-emerald-300 dark:text-slate-950"
                    : "border-blue-950/10 bg-white/86 text-slate-700 hover:border-emerald-300 hover:text-emerald-700 dark:border-white/10 dark:bg-white/7 dark:text-slate-200",
                ].join(" ")}
              >
                {preset}%
              </button>
            ))}
          </div>

          <div className="mt-5 rounded-[1.1rem] border border-blue-950/10 bg-white/82 p-4 shadow-sm shadow-blue-950/5 dark:border-white/10 dark:bg-white/[0.04]">
            <div className="mb-3 flex items-center justify-between gap-3">
              <div>
                <label htmlFor="target-grade" className="text-sm font-semibold text-slate-800 dark:text-slate-100">
                  Target final grade
                </label>
                <p className="mt-1 text-xs leading-5 text-slate-500 dark:text-slate-400">
                  Set the percentage you want in the course.
                </p>
              </div>
              <span className="rounded-full bg-emerald-50 px-3 py-1 text-sm font-semibold text-emerald-700 dark:bg-emerald-400/10 dark:text-emerald-200">
                {result.target}%
              </span>
            </div>
            <input
              id="target-grade"
              type="range"
              min="0"
              max="100"
              value={result.target}
              onChange={(event) => setTarget(Number(event.target.value))}
              className="h-2 w-full cursor-pointer accent-[#22b573] dark:accent-[#58c98a]"
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
                {result.currentGrade.toFixed(2)}%
              </div>
              <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">
                Current grade across {result.completedWeight.toFixed(1)}% completed weight.
              </p>
            </div>
            <div className={`flex items-center gap-2 rounded-full px-3 py-2 ${result.status.bg}`}>
              <StatusIcon className={`size-5 ${result.status.tone}`} aria-hidden="true" />
              <span className={`text-sm font-semibold ${result.status.tone}`}>
                Grade {result.letter.label}
              </span>
            </div>
          </div>

          <div className="mt-7">
            <div className="mb-2 flex items-center justify-between text-xs font-semibold uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">
              <span>Progress to 100%</span>
              <span>Target {result.target}%</span>
            </div>
            <div className="relative h-4 w-full overflow-hidden rounded-full bg-slate-300/80 shadow-inner shadow-slate-400/35 dark:bg-white/14 dark:shadow-none">
              <div
                className="h-full rounded-full bg-[image:var(--button-solid)] transition-[width] duration-300"
                style={{ width: `${result.progress}%` }}
              />
              <div
                className="absolute top-0 h-full w-0.5 bg-slate-950/45 dark:bg-white/70"
                style={{ left: `${result.target}%` }}
              />
            </div>
          </div>

          <div className={`mt-7 rounded-[1.1rem] border p-5 ${result.status.bg} border-blue-950/10 dark:border-white/10`}>
            <h3 className="font-heading text-2xl font-semibold text-slate-950 dark:text-white">
              {result.status.title}
            </h3>
            <p className="mt-2 text-sm leading-6 text-slate-700 dark:text-slate-200">
              {targetCopy}
            </p>
          </div>

          <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <Metric label="Weighted" value={result.weightedPoints.toFixed(2)} icon={BookOpenCheck} tone="primary" />
            <Metric label="Used weight" value={`${result.completedWeight.toFixed(1)}%`} icon={Target} tone={result.overweight ? "amber" : "emerald"} />
            <Metric label="Remaining" value={`${result.remainingWeight.toFixed(1)}%`} icon={Minus} tone="amber" />
            <Metric label="Need avg" value={formatNeed(result.requiredRemainingAverage, result.remainingWeight, result.overweight)} icon={TrendingUp} tone={result.requiredRemainingAverage > 100 || result.overweight ? "rose" : "emerald"} />
          </div>

          <div className="mt-6 grid gap-3 md:grid-cols-2">
            <InfoCard
              title="Projected final"
              value={`${result.projectedGrade.toFixed(2)}%`}
              description="If you perform similarly in remaining work."
              positive={result.projectedGrade >= result.target}
            />
            <InfoCard
              title="Letter grade"
              value={result.letter.label}
              description={result.letter.message}
              positive={result.currentGrade >= result.target}
            />
          </div>

          <div className="mt-6 rounded-[1.1rem] border border-blue-950/10 bg-blue-50/70 p-4 text-sm leading-6 text-slate-700 dark:border-white/10 dark:bg-white/[0.05] dark:text-slate-300">
            <div className="font-semibold text-slate-950 dark:text-white">{result.status.description}</div>
            <div className="mt-1">
              Formula: each score percentage multiplied by its weight, then added together.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function formatNeed(needed: number, remainingWeight: number, overweight: boolean) {
  if (overweight) return "Fix";
  if (remainingWeight === 0) return "0%";
  if (needed <= 0) return "0%";
  return `${needed.toFixed(1)}%`;
}

function StepperField({
  label,
  value,
  min = 0,
  max,
  onChange,
  onDecrease,
  onIncrease,
}: {
  label: string;
  value: number;
  min?: number;
  max?: number;
  onChange: (value: number) => void;
  onDecrease: () => void;
  onIncrease: () => void;
}) {
  const normalize = (nextValue: number) => {
    const minimum = Math.max(min, nextValue);
    return typeof max === "number" ? Math.min(minimum, max) : minimum;
  };

  return (
    <label className="block">
      <span className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">
        {label}
      </span>
      {typeof max === "number" ? (
        <input
          type="range"
          min={min}
          max={max}
          value={value}
          onChange={(event) => onChange(normalize(Number(event.target.value)))}
          className="mt-2 h-2 w-full cursor-pointer accent-[#22b573] dark:accent-[#58c98a]"
        />
      ) : null}
      <div className="mt-2 grid h-11 grid-cols-[2.35rem_1fr_2.35rem] overflow-hidden rounded-xl border border-blue-950/10 bg-white shadow-sm shadow-blue-950/5 dark:border-white/10 dark:bg-slate-950/55">
        <button
          type="button"
          onClick={onDecrease}
          className="grid cursor-pointer place-items-center border-r border-blue-950/10 text-slate-600 transition hover:bg-emerald-50 hover:text-emerald-700 dark:border-white/10 dark:text-slate-200 dark:hover:bg-white/8"
          aria-label={`Decrease ${label}`}
          title={`Decrease ${label}`}
        >
          <Minus className="size-4" aria-hidden="true" />
        </button>
        <input
          type="number"
          min={min}
          max={max}
          value={value}
          onChange={(event) => onChange(normalize(Number(event.target.value)))}
          className="h-full w-full bg-transparent px-2 text-center text-sm font-semibold text-slate-950 outline-none dark:text-white"
        />
        <button
          type="button"
          onClick={onIncrease}
          className="grid cursor-pointer place-items-center border-l border-blue-950/10 text-slate-600 transition hover:bg-emerald-50 hover:text-emerald-700 dark:border-white/10 dark:text-slate-200 dark:hover:bg-white/8"
          aria-label={`Increase ${label}`}
          title={`Increase ${label}`}
        >
          <Plus className="size-4" aria-hidden="true" />
        </button>
      </div>
    </label>
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
              : "bg-amber-50 text-amber-700 dark:bg-amber-400/10 dark:text-amber-200",
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
