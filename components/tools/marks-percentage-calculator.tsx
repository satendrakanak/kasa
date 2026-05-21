"use client";

import { useMemo, useState } from "react";
import {
  BookOpenCheck,
  CheckCircle2,
  Minus,
  Plus,
  RotateCcw,
  Target,
  TrendingUp,
} from "lucide-react";

type MarksStatus = "excellent" | "safe" | "warning" | "short";

const clampNumber = (value: number) => (Number.isFinite(value) && value > 0 ? value : 0);

function getGrade(percentage: number) {
  if (percentage >= 90) return { label: "A+", message: "Excellent performance" };
  if (percentage >= 80) return { label: "A", message: "Very good performance" };
  if (percentage >= 70) return { label: "B", message: "Good performance" };
  if (percentage >= 60) return { label: "C", message: "Average performance" };
  if (percentage >= 40) return { label: "D", message: "Needs improvement" };
  return { label: "F", message: "Needs focused revision" };
}

function getStatus(percentage: number, target: number): MarksStatus {
  if (percentage >= Math.max(90, target + 10)) return "excellent";
  if (percentage >= target) return "safe";
  if (percentage >= target - 5) return "warning";
  return "short";
}

export function MarksPercentageCalculator() {
  const [scored, setScored] = useState(384);
  const [total, setTotal] = useState(500);
  const [target, setTarget] = useState(75);

  const result = useMemo(() => {
    const safeTotal = Math.max(clampNumber(total), 1);
    const safeScored = Math.min(clampNumber(scored), safeTotal);
    const safeTarget = Math.min(Math.max(Number.isFinite(target) ? target : 75, 0), 100);
    const percentage = (safeScored / safeTotal) * 100;
    const requiredMarks = Math.ceil((safeTotal * safeTarget) / 100);
    const marksNeeded = Math.max(requiredMarks - safeScored, 0);
    const marksAbove = Math.max(safeScored - requiredMarks, 0);
    const marksLost = Math.max(safeTotal - safeScored, 0);
    const grade = getGrade(percentage);
    const status = getStatus(percentage, safeTarget);

    return {
      scored: safeScored,
      total: safeTotal,
      target: safeTarget,
      percentage,
      requiredMarks,
      marksNeeded,
      marksAbove,
      marksLost,
      grade,
      status,
      targetGap: percentage - safeTarget,
      progress: Math.min(Math.max(percentage, 0), 100),
    };
  }, [scored, target, total]);

  const statusCopy = {
    excellent: {
      title: "Excellent marks",
      description: "You have a strong score above your target percentage.",
      tone: "text-emerald-700 dark:text-emerald-300",
      bg: "bg-emerald-50 dark:bg-emerald-500/10",
      icon: CheckCircle2,
    },
    safe: {
      title: "You are above target",
      description: "Your marks are currently above the target percentage.",
      tone: "text-teal-700 dark:text-teal-300",
      bg: "bg-teal-50 dark:bg-teal-500/10",
      icon: CheckCircle2,
    },
    warning: {
      title: "Close to target",
      description: "You are close to your target and need a small improvement.",
      tone: "text-amber-700 dark:text-amber-300",
      bg: "bg-amber-50 dark:bg-amber-500/10",
      icon: TrendingUp,
    },
    short: {
      title: "Below target",
      description: "You need more marks to reach your target percentage.",
      tone: "text-rose-700 dark:text-rose-300",
      bg: "bg-rose-50 dark:bg-rose-500/10",
      icon: TrendingUp,
    },
  } satisfies Record<
    MarksStatus,
    { title: string; description: string; tone: string; bg: string; icon: typeof TrendingUp }
  >;

  const activeStatus = statusCopy[result.status];
  const StatusIcon = activeStatus.icon;
  const actionTitle =
    result.status === "excellent"
      ? "Great, you are in an excellent marks range."
      : result.status === "safe"
        ? "Good, you are above your target percentage."
        : result.status === "warning"
          ? "Careful, you are close to your target."
          : "You need more marks to reach your target.";
  const actionDescription =
    result.percentage >= result.target
      ? result.marksAbove > 0
        ? `You have ${result.marksAbove} extra ${result.marksAbove === 1 ? "mark" : "marks"} above the minimum ${result.requiredMarks} required for ${result.target}%.`
        : `You have exactly the minimum ${result.requiredMarks} marks required for ${result.target}%.`
      : `You need ${result.marksNeeded} more ${result.marksNeeded === 1 ? "mark" : "marks"} to reach the minimum ${result.requiredMarks} required for ${result.target}%.`;

  const updateNumber = (setter: (value: number) => void, value: number, delta: number) => {
    setter(Math.max(0, value + delta));
  };

  return (
    <section className="relative px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto grid w-full max-w-[108rem] gap-5 lg:grid-cols-[0.88fr_1.12fr]">
        <div className="relative overflow-hidden rounded-[1.25rem] border border-blue-950/10 bg-white/92 p-5 shadow-xl shadow-blue-950/8 backdrop-blur dark:border-white/10 dark:bg-surface/90 sm:p-7">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="relative">
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-primary dark:text-emerald-200">
                Marks setup
              </p>
              <h2 className="mt-2 font-heading text-3xl font-semibold text-slate-950 dark:text-white">
                Add your marks
              </h2>
              <p className="mt-2 max-w-xl text-sm leading-6 text-slate-600 dark:text-slate-300">
                Enter scored marks and total marks. The result updates instantly as you change values.
              </p>
            </div>
            <button
              type="button"
              onClick={() => {
                setScored(384);
                setTotal(500);
                setTarget(75);
              }}
              className="relative inline-grid size-10 cursor-pointer place-items-center rounded-full border border-blue-950/10 bg-white/86 text-slate-700 shadow-sm transition hover:border-primary/35 hover:text-primary dark:border-white/10 dark:bg-white/7 dark:text-white dark:hover:bg-white/12"
              aria-label="Reset calculator"
              title="Reset calculator"
            >
              <RotateCcw className="size-4" aria-hidden="true" />
            </button>
          </div>

          <div className="relative mt-7 grid gap-5">
            <NumberField
              label="Marks scored"
              hint="Marks you received"
              value={scored}
              min={0}
              max={result.total}
              onChange={setScored}
              onDecrease={() => updateNumber(setScored, scored, -1)}
              onIncrease={() => setScored(Math.min(result.total, scored + 1))}
            />
            <NumberField
              label="Total marks"
              hint="Maximum marks in exam or result"
              value={total}
              min={1}
              max={1000}
              onChange={setTotal}
              onDecrease={() => updateNumber(setTotal, total, -1)}
              onIncrease={() => setTotal(Math.min(1000, total + 1))}
            />

            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">
                Common totals
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {[50, 80, 100, 200, 500, 600].map((value) => (
                  <button
                    key={value}
                    type="button"
                    onClick={() => setTotal(value)}
                    className={[
                      "cursor-pointer rounded-full border px-3 py-1.5 text-xs font-semibold transition",
                      result.total === value
                        ? "border-emerald-500 bg-emerald-50 text-emerald-800 shadow-sm shadow-emerald-950/8 dark:border-emerald-300 dark:bg-emerald-300 dark:text-slate-950"
                        : "border-blue-950/10 bg-white/86 text-slate-700 hover:border-emerald-300 hover:text-emerald-700 dark:border-white/10 dark:bg-white/7 dark:text-slate-200",
                    ].join(" ")}
                  >
                    {value}
                  </button>
                ))}
              </div>
            </div>

            <div className="rounded-[1.1rem] border border-blue-950/10 bg-white/82 p-4 shadow-sm shadow-blue-950/5 dark:border-white/10 dark:bg-white/[0.04]">
              <div className="mb-3 flex items-center justify-between gap-3">
                <div>
                  <label htmlFor="target-marks" className="text-sm font-semibold text-slate-800 dark:text-slate-100">
                    Target percentage
                  </label>
                  <p className="mt-1 text-xs leading-5 text-slate-500 dark:text-slate-400">
                    Set the percentage you want to reach.
                  </p>
                </div>
                <span className="rounded-full bg-emerald-50 px-3 py-1 text-sm font-semibold text-emerald-700 dark:bg-emerald-400/10 dark:text-emerald-200">
                  {result.target}%
                </span>
              </div>
              <input
                id="target-marks"
                type="range"
                min="0"
                max="100"
                value={result.target}
                onChange={(event) => setTarget(Number(event.target.value))}
                className="h-2 w-full cursor-pointer accent-[#22b573] dark:accent-[#58c98a]"
              />
              <div className="mt-4 flex flex-wrap gap-2">
                {[40, 50, 60, 75, 80, 90, 100].map((preset) => (
                  <button
                    key={preset}
                    type="button"
                    onClick={() => setTarget(preset)}
                    className={[
                      "cursor-pointer rounded-full border px-3 py-1.5 text-xs font-semibold transition",
                      result.target === preset
                        ? "border-emerald-500 bg-emerald-50 text-emerald-800 shadow-sm shadow-emerald-950/8 dark:border-emerald-300 dark:bg-emerald-300 dark:text-slate-950"
                        : "border-blue-950/10 bg-white/86 text-slate-700 hover:border-emerald-300 hover:text-emerald-700 dark:border-white/10 dark:bg-white/7 dark:text-slate-200",
                    ].join(" ")}
                  >
                    {preset}%
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="relative mt-5 grid gap-3 sm:grid-cols-2">
            <InputTip label="Current marks" value={`${result.scored}/${result.total} marks`} />
            <InputTip
              label={result.targetGap >= 0 ? "Above target" : "Below target"}
              value={`${Math.abs(result.targetGap).toFixed(2)}%`}
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
                {result.percentage.toFixed(2)}%
              </div>
              <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">
                {result.scored} scored out of {result.total} total marks.
              </p>
            </div>
            <div className={`flex items-center gap-2 rounded-full px-3 py-2 ${activeStatus.bg}`}>
              <StatusIcon className={`size-5 ${activeStatus.tone}`} aria-hidden="true" />
              <span className={`text-sm font-semibold ${activeStatus.tone}`}>
                Grade {result.grade.label}
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
                style={{ left: `${Math.min(result.target, 100)}%` }}
              />
            </div>
          </div>

          <div className={`mt-7 rounded-[1.1rem] border p-5 ${activeStatus.bg} border-blue-950/10 dark:border-white/10`}>
            <h3 className="font-heading text-2xl font-semibold text-slate-950 dark:text-white">
              {actionTitle}
            </h3>
            <p className="mt-2 text-sm leading-6 text-slate-700 dark:text-slate-200">
              {actionDescription}
            </p>
          </div>

          <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <Metric label="Scored" value={result.scored.toString()} icon={BookOpenCheck} tone="primary" />
            <Metric label="Lost" value={result.marksLost.toString()} icon={Minus} tone="amber" />
            <Metric label="Required" value={result.requiredMarks.toString()} icon={Target} tone="emerald" />
            <Metric label="Need" value={result.marksNeeded.toString()} icon={TrendingUp} tone="rose" />
          </div>

          <div className="mt-6 grid gap-3 md:grid-cols-2">
            <InfoCard
              title="Grade range"
              value={result.grade.label}
              description={result.grade.message}
              positive={result.percentage >= 70}
            />
            <InfoCard
              title={result.targetGap >= 0 ? "Above target" : "Below target"}
              value={`${Math.abs(result.targetGap).toFixed(2)}%`}
              description={`Target is ${result.target}%.`}
              positive={result.targetGap >= 0}
            />
          </div>

          <div className="mt-6 rounded-[1.1rem] border border-blue-950/10 bg-blue-50/70 p-4 text-sm leading-6 text-slate-700 dark:border-white/10 dark:bg-white/[0.05] dark:text-slate-300">
            <div className="font-semibold text-slate-950 dark:text-white">{activeStatus.description}</div>
            <div className="mt-1">
              Formula: scored marks divided by total marks, multiplied by 100.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function NumberField({
  label,
  hint,
  value,
  min,
  max,
  onChange,
  onDecrease,
  onIncrease,
}: {
  label: string;
  hint: string;
  value: number;
  min: number;
  max?: number;
  onChange: (value: number) => void;
  onDecrease: () => void;
  onIncrease: () => void;
}) {
  const normalize = (nextValue: number) => {
    const minValue = Math.max(min, nextValue);
    return typeof max === "number" ? Math.min(minValue, max) : minValue;
  };

  return (
    <div className="rounded-[1.1rem] border border-blue-950/10 bg-white/82 p-4 shadow-sm shadow-blue-950/5 dark:border-white/10 dark:bg-white/[0.04]">
      <label className="block text-sm font-semibold text-slate-800 dark:text-slate-100">{label}</label>
      <p className="mt-1 text-xs leading-5 text-slate-500 dark:text-slate-400">{hint}</p>
      {typeof max === "number" ? (
        <input
          type="range"
          min={min}
          max={max}
          value={value}
          onChange={(event) => onChange(normalize(Number(event.target.value)))}
          className="mt-4 h-2 w-full cursor-pointer accent-[#22b573] dark:accent-[#58c98a]"
        />
      ) : null}
      <div className="mt-3 grid grid-cols-[2.75rem_1fr_2.75rem] overflow-hidden rounded-xl border border-blue-950/10 bg-white shadow-sm shadow-blue-950/5 dark:border-white/10 dark:bg-slate-950/60">
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
          className="h-12 w-full bg-transparent px-4 text-center text-lg font-semibold text-slate-950 outline-none dark:text-white"
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
    </div>
  );
}

function InputTip({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-[1rem] border border-blue-950/10 bg-white/70 p-4 shadow-sm shadow-blue-950/5 dark:border-white/10 dark:bg-white/[0.04]">
      <div className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">
        {label}
      </div>
      <div className="mt-1 font-heading text-xl font-semibold text-slate-950 dark:text-white">
        {value}
      </div>
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
