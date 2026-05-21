"use client";

import { useMemo, useState } from "react";
import { ClipboardList, Copy, Download, RotateCcw } from "lucide-react";

const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(Number.isFinite(value) ? value : min, min), max);

const taskMix = [
  { key: "research", label: "Research", share: 0.22 },
  { key: "outline", label: "Outline", share: 0.1 },
  { key: "writing", label: "Writing", share: 0.44 },
  { key: "editing", label: "Editing", share: 0.16 },
  { key: "final", label: "Final check", share: 0.08 },
];

export function AssignmentDeadlinePlanner() {
  const [daysLeft, setDaysLeft] = useState(7);
  const [pages, setPages] = useState(12);
  const [dailyMinutes, setDailyMinutes] = useState(90);
  const [difficulty, setDifficulty] = useState(3);
  const [buffer, setBuffer] = useState(15);
  const [actionMessage, setActionMessage] = useState("Ready to copy or download your assignment plan.");

  const result = useMemo(() => {
    const days = clamp(daysLeft, 1, 60);
    const pageCount = clamp(pages, 1, 200);
    const minutes = clamp(dailyMinutes, 15, 600);
    const difficultyFactor = 0.75 + clamp(difficulty, 1, 5) * 0.16;
    const bufferPercent = clamp(buffer, 0, 40);
    const workMinutes = pageCount * 38 * difficultyFactor;
    const totalMinutes = workMinutes * (1 + bufferPercent / 100);
    const capacityMinutes = days * minutes;
    const dailyNeed = totalMinutes / days;
    const possible = dailyNeed <= minutes;
    const extraDaily = Math.max(0, dailyNeed - minutes);

    const schedule = taskMix.map((task) => ({
      ...task,
      minutes: totalMinutes * task.share,
      days: Math.max(1, Math.ceil((days * task.share) / 1)),
    }));

    return {
      days,
      pageCount,
      minutes,
      totalHours: totalMinutes / 60,
      capacityHours: capacityMinutes / 60,
      dailyNeed,
      possible,
      extraDaily,
      schedule,
      title: possible ? "Your deadline looks manageable." : "This deadline needs more daily time.",
      note: possible
        ? "Use the plan below to finish writing early and keep final review time safe."
        : "Increase daily study time, reduce scope, or start with the highest-impact sections first.",
    };
  }, [buffer, dailyMinutes, daysLeft, difficulty, pages]);

  const resultText = [
    "Assignment Deadline Planner",
    `Days left: ${result.days}`,
    `Pages/tasks: ${result.pageCount}`,
    `Daily available time: ${result.minutes} minutes`,
    `Estimated work: ${result.totalHours.toFixed(1)} hours`,
    `Status: ${result.title}`,
    "",
    ...result.schedule.map((task) => `${task.label}: ${Math.round(task.minutes)} minutes`),
    "",
    "Generated with KASA Assignment Deadline Planner",
  ].join("\n");

  const reset = () => {
    setDaysLeft(7);
    setPages(12);
    setDailyMinutes(90);
    setDifficulty(3);
    setBuffer(15);
    setActionMessage("Ready to copy or download your assignment plan.");
  };

  const copyResult = async () => {
    try {
      await navigator.clipboard.writeText(resultText);
      setActionMessage("Assignment plan copied.");
    } catch {
      setActionMessage("Copy was blocked. Use download instead.");
    }
  };

  const downloadResult = () => {
    const blob = new Blob([resultText], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "kasa-assignment-deadline-plan.txt";
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
    setActionMessage("Assignment plan downloaded.");
  };

  return (
    <section className="relative px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto grid w-full max-w-[108rem] gap-5 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="rounded-[1.25rem] border border-blue-950/10 bg-white/92 p-5 shadow-xl shadow-blue-950/8 backdrop-blur dark:border-white/10 dark:bg-surface/90 sm:p-7">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-primary dark:text-emerald-200">Assignment setup</p>
              <h2 className="mt-2 font-heading text-3xl font-semibold text-slate-950 dark:text-white">Plan your deadline</h2>
              <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">Break a project into research, writing, editing, and final review time.</p>
            </div>
            <button type="button" onClick={reset} className="grid size-10 cursor-pointer place-items-center rounded-full border border-blue-950/10 bg-white text-slate-700 shadow-sm transition hover:border-primary/35 hover:text-primary dark:border-white/10 dark:bg-white/7 dark:text-white">
              <RotateCcw className="size-4" aria-hidden="true" />
            </button>
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <NumberField label="Days left" value={daysLeft} onChange={setDaysLeft} min={1} max={60} presets={[1, 3, 7, 14, 30]} />
            <NumberField label="Pages or task units" value={pages} onChange={setPages} min={1} max={100} presets={[5, 10, 15, 25, 50]} />
            <NumberField label="Daily available time" value={dailyMinutes} onChange={setDailyMinutes} min={15} max={360} suffix="min" step={15} presets={[30, 60, 90, 120, 180]} />
            <NumberField label="Difficulty level" value={difficulty} onChange={setDifficulty} min={1} max={5} presets={[1, 2, 3, 4, 5]} />
          </div>

          <div className="mt-4 rounded-[1.1rem] border border-blue-950/10 bg-white/82 p-4 shadow-sm shadow-blue-950/5 dark:border-white/10 dark:bg-white/[0.04]">
            <div className="flex items-center justify-between gap-3">
              <span className="text-sm font-semibold text-slate-800 dark:text-slate-100">Review buffer</span>
              <span className="rounded-full bg-emerald-50 px-3 py-1 text-sm font-semibold text-emerald-700 dark:bg-emerald-400/10 dark:text-emerald-200">{buffer}%</span>
            </div>
            <input type="range" min={0} max={40} value={buffer} onChange={(event) => setBuffer(Number(event.target.value))} className="mt-4 h-2 w-full cursor-pointer accent-[#22b573] dark:accent-[#58c98a]" />
          </div>
        </div>

        <div className="rounded-[1.25rem] border border-blue-950/10 bg-white/94 p-5 shadow-2xl shadow-blue-950/12 backdrop-blur dark:border-white/10 dark:bg-surface/92 sm:p-7">
          <div className="flex flex-wrap items-start justify-between gap-5">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary dark:text-emerald-200">Daily work needed</p>
              <div className="mt-3 font-heading text-6xl font-semibold leading-none text-slate-950 sm:text-7xl dark:text-white">{Math.ceil(result.dailyNeed)}</div>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">minutes per day</p>
            </div>
            <span className={`rounded-full px-3 py-2 text-sm font-semibold ${result.possible ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-400/10 dark:text-emerald-200" : "bg-rose-50 text-rose-700 dark:bg-rose-400/10 dark:text-rose-200"}`}>
              {result.possible ? "On track" : "Needs more time"}
            </span>
          </div>

          <div className={`mt-7 rounded-[1.1rem] border p-5 ${result.possible ? "border-emerald-200 bg-emerald-50 dark:border-emerald-300/30 dark:bg-emerald-400/10" : "border-rose-200 bg-rose-50 dark:border-rose-300/30 dark:bg-rose-400/10"}`}>
            <h3 className="font-heading text-2xl font-semibold text-slate-950 dark:text-white">{result.title}</h3>
            <p className="mt-2 text-sm leading-6 text-slate-700 dark:text-slate-200">{result.note}</p>
          </div>

          <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <Metric label="Total work" value={`${result.totalHours.toFixed(1)}h`} />
            <Metric label="Capacity" value={`${result.capacityHours.toFixed(1)}h`} />
            <Metric label="Extra/day" value={`${Math.ceil(result.extraDaily)}m`} />
            <Metric label="Pages/day" value={`${(result.pageCount / result.days).toFixed(1)}`} />
          </div>

          <div className="mt-6 rounded-[1.1rem] border border-blue-950/10 bg-white p-4 dark:border-white/10 dark:bg-white/[0.05]">
            <div className="mb-3 text-sm font-semibold text-slate-950 dark:text-white">Task breakdown</div>
            <div className="grid gap-2">
              {result.schedule.map((task) => (
                <div key={task.key} className="grid gap-2 rounded-xl bg-slate-50 px-3 py-3 text-sm dark:bg-slate-950/40 sm:grid-cols-[8rem_1fr_auto] sm:items-center">
                  <span className="font-semibold text-slate-950 dark:text-white">{task.label}</span>
                  <div className="h-2 overflow-hidden rounded-full bg-slate-300/80 dark:bg-white/14">
                    <div className="h-full rounded-full bg-[image:var(--button-solid)]" style={{ width: `${task.share * 100}%` }} />
                  </div>
                  <span className="text-slate-600 dark:text-slate-300">{Math.round(task.minutes)} min</span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 rounded-[1.1rem] border border-blue-950/10 bg-blue-50/70 p-4 dark:border-white/10 dark:bg-white/[0.05]">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-xs leading-5 text-slate-600 dark:text-slate-300">{actionMessage}</p>
              <div className="flex flex-wrap gap-2">
                <ActionButton label="Copy" icon={Copy} onClick={copyResult} />
                <ActionButton label="Download" icon={Download} onClick={downloadResult} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function NumberField({
  label,
  value,
  onChange,
  min,
  max,
  suffix,
  step = 1,
  presets = [],
}: {
  label: string;
  value: number;
  onChange: (value: number) => void;
  min: number;
  max: number;
  suffix?: string;
  step?: number;
  presets?: number[];
}) {
  return (
    <div className="rounded-[1.1rem] border border-blue-950/10 bg-white/82 p-4 shadow-sm shadow-blue-950/5 dark:border-white/10 dark:bg-white/[0.04]">
      <div className="flex items-center justify-between gap-3">
        <span className="text-sm font-semibold text-slate-800 dark:text-slate-100">{label}</span>
        <span className="rounded-full bg-emerald-50 px-3 py-1 text-sm font-semibold text-emerald-700 dark:bg-emerald-400/10 dark:text-emerald-200">
          {value}{suffix ? ` ${suffix}` : ""}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(event) => onChange(clamp(Number(event.target.value), min, max))}
        className="mt-4 h-2 w-full cursor-pointer accent-[#22b573] dark:accent-[#58c98a]"
      />
      <div className="mt-3 flex flex-wrap gap-2">
        {presets.map((preset) => (
          <button
            key={preset}
            type="button"
            onClick={() => onChange(clamp(preset, min, max))}
            className={`cursor-pointer rounded-full border px-3 py-2 text-sm font-semibold transition ${value === preset ? "border-emerald-500 bg-emerald-50 text-emerald-800 dark:border-emerald-300 dark:bg-emerald-300 dark:text-slate-950" : "border-blue-950/10 bg-white text-slate-700 hover:border-emerald-300 hover:text-emerald-700 dark:border-white/10 dark:bg-white/7 dark:text-slate-200"}`}
          >
            {preset}{suffix ? ` ${suffix}` : ""}
          </button>
        ))}
      </div>
      <input
        type="number"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(event) => onChange(clamp(Number(event.target.value), min, max))}
        className="mt-3 h-11 w-full rounded-xl border border-blue-950/10 bg-white px-3 text-base font-semibold text-slate-950 outline-none transition focus:border-primary/45 dark:border-white/10 dark:bg-slate-950/55 dark:text-white"
      />
    </div>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-[1.1rem] border border-blue-950/10 bg-white p-4 shadow-sm shadow-blue-950/5 dark:border-white/10 dark:bg-white/[0.05]">
      <div className="flex items-center justify-between gap-3">
        <div className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">{label}</div>
        <ClipboardList className="size-4 text-primary dark:text-emerald-300" aria-hidden="true" />
      </div>
      <div className="mt-3 text-3xl font-semibold text-slate-950 dark:text-white">{value}</div>
    </div>
  );
}

function ActionButton({ label, icon: Icon, onClick }: { label: string; icon: typeof Copy; onClick: () => void }) {
  return (
    <button type="button" onClick={onClick} className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-blue-950/10 bg-white px-3 py-2 text-xs font-semibold text-slate-700 shadow-sm shadow-blue-950/5 transition hover:border-primary/35 hover:text-primary dark:border-white/10 dark:bg-white/[0.06] dark:text-slate-200 dark:hover:text-white">
      <Icon className="size-3.5" aria-hidden="true" />
      {label}
    </button>
  );
}
