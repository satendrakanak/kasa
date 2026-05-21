"use client";

import { useMemo, useState } from "react";
import {
  AlertCircle,
  BookOpenCheck,
  CalendarX2,
  CheckCircle2,
  Minus,
  Plus,
  RotateCcw,
  TrendingDown,
  TrendingUp,
} from "lucide-react";

type AttendanceStatus = "excellent" | "safe" | "warning" | "short";

const clampNumber = (value: number) => (Number.isFinite(value) && value > 0 ? value : 0);

function getStatus(percentage: number, target: number): AttendanceStatus {
  if (percentage >= Math.max(90, target + 10)) return "excellent";
  if (percentage >= target) return "safe";
  if (percentage >= target - 5) return "warning";
  return "short";
}

export function AttendanceCalculator() {
  const [attended, setAttended] = useState(36);
  const [total, setTotal] = useState(48);
  const [target, setTarget] = useState(75);

  const result = useMemo(() => {
    const safeAttended = Math.min(clampNumber(attended), clampNumber(total));
    const safeTotal = Math.max(clampNumber(total), safeAttended);
    const safeTarget = Math.min(Math.max(Number.isFinite(target) ? target : 75, 0), 100);
    const percentage = safeTotal === 0 ? 0 : (safeAttended / safeTotal) * 100;
    const requiredClasses = Math.ceil((safeTotal * safeTarget) / 100);
    const status = getStatus(percentage, safeTarget);
    const canMiss = Math.max(safeAttended - requiredClasses, 0);
    const needToAttend = Math.max(requiredClasses - safeAttended, 0);
    const afterOneMoreAttended = Math.min(safeAttended + 1, safeTotal);
    const afterOneMoreMissedAttended = safeAttended;

    return {
      attended: safeAttended,
      total: safeTotal,
      missed: Math.max(safeTotal - safeAttended, 0),
      requiredClasses,
      target: safeTarget,
      percentage,
      status,
      canMiss,
      needToAttend,
      targetGap: percentage - safeTarget,
      progress: Math.min(Math.max(percentage, 0), 100),
      afterNextAttend:
        safeTotal === 0 ? 100 : (afterOneMoreAttended / safeTotal) * 100,
      afterNextMiss: safeTotal === 0 ? 0 : (afterOneMoreMissedAttended / safeTotal) * 100,
    };
  }, [attended, target, total]);

  const statusCopy = {
    excellent: {
      title: "Excellent attendance",
      description: "You have a strong buffer above the required attendance.",
      tone: "text-emerald-700 dark:text-emerald-300",
      bg: "bg-emerald-50 dark:bg-emerald-500/10",
      icon: CheckCircle2,
    },
    safe: {
      title: "You are above target",
      description: "Your attendance is currently safe, but keep attending regularly.",
      tone: "text-teal-700 dark:text-teal-300",
      bg: "bg-teal-50 dark:bg-teal-500/10",
      icon: CheckCircle2,
    },
    warning: {
      title: "Close to shortage",
      description: "You are near the target, so missing classes can quickly reduce your percentage.",
      tone: "text-amber-700 dark:text-amber-300",
      bg: "bg-amber-50 dark:bg-amber-500/10",
      icon: AlertCircle,
    },
    short: {
      title: "Attendance is short",
      description: "Attend classes continuously to recover your required percentage.",
      tone: "text-rose-700 dark:text-rose-300",
      bg: "bg-rose-50 dark:bg-rose-500/10",
      icon: AlertCircle,
    },
  } satisfies Record<
    AttendanceStatus,
    { title: string; description: string; tone: string; bg: string; icon: typeof AlertCircle }
  >;

  const activeStatus = statusCopy[result.status];
  const StatusIcon = activeStatus.icon;
  const actionTitle =
    result.status === "excellent"
      ? "Great, you are in an excellent attendance range."
      : result.status === "safe"
        ? "Good, you are in a safe attendance range."
        : result.status === "warning"
          ? "Careful, you are close to shortage."
          : "You need to attend more classes.";
  const actionDescription =
    result.percentage >= result.target
      ? result.canMiss > 0
        ? `You have ${result.canMiss} extra ${result.canMiss === 1 ? "class" : "classes"} above the minimum ${result.requiredClasses} required for ${result.target}%.`
        : `You have exactly the minimum ${result.requiredClasses} classes required for ${result.target}%.`
      : `You need ${result.needToAttend} more ${result.needToAttend === 1 ? "class" : "classes"} to reach the minimum ${result.requiredClasses} required for ${result.target}%.`;

  const updateNumber = (setter: (value: number) => void, value: number, delta: number) => {
    setter(Math.max(0, value + delta));
  };

  return (
    <section className="relative px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto grid w-full max-w-[108rem] gap-5 lg:grid-cols-[0.88fr_1.12fr]">
        <div className="relative overflow-hidden rounded-[1.25rem] border border-blue-950/10 bg-white/92 p-5 shadow-xl shadow-blue-950/8 backdrop-blur dark:border-white/10 dark:bg-surface/90 sm:p-7">
          <div className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-[linear-gradient(135deg,rgba(43,168,255,0.11),rgba(34,181,115,0.1),transparent)] dark:bg-[linear-gradient(135deg,rgba(88,201,138,0.11),rgba(69,145,255,0.08),transparent)]" />
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="relative">
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-primary dark:text-emerald-200">
                Attendance setup
              </p>
              <h2 className="mt-2 font-heading text-3xl font-semibold text-slate-950 dark:text-white">
                Add your class count
              </h2>
              <p className="mt-2 max-w-xl text-sm leading-6 text-slate-600 dark:text-slate-300">
                Use your current attendance record. The result updates instantly as you change values.
              </p>
            </div>
            <button
              type="button"
              onClick={() => {
                setAttended(36);
                setTotal(48);
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
              label="Classes attended"
              hint="Classes where you were present"
              value={attended}
              min={0}
              max={Math.max(total, 100)}
              onChange={setAttended}
              onDecrease={() => updateNumber(setAttended, attended, -1)}
              onIncrease={() => setAttended(Math.min(Math.max(total, 100), attended + 1))}
            />
            <NumberField
              label="Total classes"
              hint="Total classes in your course or semester"
              value={total}
              min={0}
              max={300}
              onChange={setTotal}
              onDecrease={() => updateNumber(setTotal, total, -1)}
              onIncrease={() => setTotal(Math.min(300, total + 1))}
            />
            <div className="rounded-[1.1rem] border border-blue-950/10 bg-white/82 p-4 shadow-sm shadow-blue-950/5 dark:border-white/10 dark:bg-white/[0.04]">
              <div className="mb-3 flex items-center justify-between gap-3">
                <div>
                  <label htmlFor="target-attendance" className="text-sm font-semibold text-slate-800 dark:text-slate-100">
                    Required attendance
                  </label>
                  <p className="mt-1 text-xs leading-5 text-slate-500 dark:text-slate-400">
                    Set your college or coaching minimum.
                  </p>
                </div>
                <span className="rounded-full bg-emerald-50 px-3 py-1 text-sm font-semibold text-emerald-700 dark:bg-emerald-400/10 dark:text-emerald-200">
                  {result.target}%
                </span>
              </div>
              <input
                id="target-attendance"
                type="range"
                min="0"
                max="100"
                value={result.target}
                onChange={(event) => setTarget(Number(event.target.value))}
                className="h-2 w-full cursor-pointer accent-[#22b573] dark:accent-[#58c98a]"
              />
              <div className="mt-4 flex flex-wrap gap-2">
                {[20, 50, 60, 70, 75, 85, 100].map((preset) => (
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
            <InputTip label="Current record" value={`${result.attended}/${result.total} classes`} />
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
                {result.attended} attended out of {result.total} total classes.
              </p>
            </div>
            <div className={`flex items-center gap-2 rounded-full px-3 py-2 ${activeStatus.bg}`}>
              <StatusIcon className={`size-5 ${activeStatus.tone}`} aria-hidden="true" />
              <span className={`text-sm font-semibold ${activeStatus.tone}`}>{activeStatus.title}</span>
            </div>
          </div>

          <div className="mt-7">
            <div className="mb-2 flex items-center justify-between text-xs font-semibold uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">
              <span>Progress to 100%</span>
              <span>Target {result.target}%</span>
            </div>
            <div className="relative h-4 w-full overflow-hidden rounded-full bg-slate-300/80 shadow-inner shadow-slate-400/35 dark:bg-white/14 dark:shadow-none">
              <div className="h-full rounded-full bg-[image:var(--button-solid)] transition-[width] duration-300" style={{ width: `${result.progress}%` }} />
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
            <Metric label="Attended" value={result.attended.toString()} icon={BookOpenCheck} tone="primary" />
            <Metric label="Required" value={result.requiredClasses.toString()} icon={CalendarX2} tone="amber" />
            <Metric label="Can miss" value={result.canMiss.toString()} icon={TrendingDown} tone="emerald" />
            <Metric label="Need" value={result.needToAttend.toString()} icon={TrendingUp} tone="rose" />
          </div>

          <div className="mt-6 grid gap-3 md:grid-cols-2">
            <NextClassCard
              title="If you attend next class"
              value={`${result.afterNextAttend.toFixed(2)}%`}
              description="Your attendance if one remaining class becomes present."
              positive
            />
            <NextClassCard
              title="If you miss next class"
              value={`${result.afterNextMiss.toFixed(2)}%`}
              description="Your attendance if one remaining class stays absent."
            />
          </div>

          <div className="mt-6 rounded-[1.1rem] border border-blue-950/10 bg-blue-50/70 p-4 text-sm leading-6 text-slate-700 dark:border-white/10 dark:bg-white/[0.05] dark:text-slate-300">
            <div className="font-semibold text-slate-950 dark:text-white">{activeStatus.description}</div>
            <div className="mt-1">
              Required classes: total classes multiplied by target percentage, rounded up.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function NextClassCard({
  title,
  value,
  description,
  positive = false,
}: {
  title: string;
  value: string;
  description: string;
  positive?: boolean;
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
            <TrendingUp className="size-5" aria-hidden="true" />
          ) : (
            <TrendingDown className="size-5" aria-hidden="true" />
          )}
        </span>
      </div>
      <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">{description}</p>
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
  max: number;
  onChange: (value: number) => void;
  onDecrease: () => void;
  onIncrease: () => void;
}) {
  return (
    <div className="rounded-[1.1rem] border border-blue-950/10 bg-white/82 p-4 shadow-sm shadow-blue-950/5 dark:border-white/10 dark:bg-white/[0.04]">
      <label className="block text-sm font-semibold text-slate-800 dark:text-slate-100">{label}</label>
      <p className="mt-1 text-xs leading-5 text-slate-500 dark:text-slate-400">{hint}</p>
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(event) => onChange(Math.min(Math.max(min, Number(event.target.value)), max))}
        className="mt-4 h-2 w-full cursor-pointer accent-[#22b573] dark:accent-[#58c98a]"
      />
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
          onChange={(event) => onChange(Math.min(Math.max(min, Number(event.target.value)), max))}
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
