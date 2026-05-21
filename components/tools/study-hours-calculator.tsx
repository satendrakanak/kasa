"use client";

import { useMemo, useState } from "react";
import { BookOpenCheck, CheckCircle2, Copy, Download, RotateCcw } from "lucide-react";

const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(Number.isFinite(value) ? value : min, min), max);

const confidenceLevels = [
  { label: "Low", value: 1.25 },
  { label: "Medium", value: 1 },
  { label: "High", value: 0.82 },
] as const;

export function StudyHoursCalculator() {
  const [examDays, setExamDays] = useState(30);
  const [subjects, setSubjects] = useState(5);
  const [chapters, setChapters] = useState(45);
  const [revision, setRevision] = useState(25);
  const [sessionLength, setSessionLength] = useState(50);
  const [confidence, setConfidence] = useState<(typeof confidenceLevels)[number]["label"]>("Medium");
  const [actionMessage, setActionMessage] = useState("Ready to copy or download your study hours plan.");

  const result = useMemo(() => {
    const days = clamp(examDays, 1, 365);
    const subjectCount = clamp(subjects, 1, 20);
    const chapterCount = clamp(chapters, 1, 300);
    const revisionPercent = clamp(revision, 0, 60);
    const session = clamp(sessionLength, 20, 120);
    const multiplier = confidenceLevels.find((item) => item.label === confidence)?.value ?? 1;
    const baseMinutes = chapterCount * 55 * multiplier;
    const revisionMinutes = baseMinutes * (revisionPercent / 100);
    const totalMinutes = baseMinutes + revisionMinutes;
    const dailyMinutes = totalMinutes / days;
    const sessionsPerDay = Math.max(1, Math.ceil(dailyMinutes / session));
    const dailyHours = dailyMinutes / 60;
    const weeklyHours = dailyHours * 7;
    const chaptersPerDay = chapterCount / days;

    return {
      days,
      subjectCount,
      chapterCount,
      revisionPercent,
      session,
      dailyHours,
      weeklyHours,
      sessionsPerDay,
      chaptersPerDay,
      totalHours: totalMinutes / 60,
      status:
        dailyHours <= 3
          ? "Comfortable plan"
          : dailyHours <= 6
            ? "Focused plan"
            : "Heavy study load",
      note:
        dailyHours <= 3
          ? "This looks manageable. Keep daily revision consistent."
          : dailyHours <= 6
            ? "This plan is doable, but keep breaks and revision blocks fixed."
            : "This is a heavy schedule. Reduce chapters, increase days, or split the target into phases.",
    };
  }, [chapters, confidence, examDays, revision, sessionLength, subjects]);

  const resultText = [
    "Study Hours Calculator Result",
    `Exam starts in: ${result.days} days`,
    `Subjects: ${result.subjectCount}`,
    `Chapters/topics: ${result.chapterCount}`,
    `Recommended daily study: ${result.dailyHours.toFixed(1)} hours`,
    `Sessions per day: ${result.sessionsPerDay}`,
    `Weekly study time: ${result.weeklyHours.toFixed(1)} hours`,
    `Plan status: ${result.status}`,
    "",
    "Generated with KASA Study Hours Calculator",
  ].join("\n");

  const reset = () => {
    setExamDays(30);
    setSubjects(5);
    setChapters(45);
    setRevision(25);
    setSessionLength(50);
    setConfidence("Medium");
    setActionMessage("Ready to copy or download your study hours plan.");
  };

  const copyResult = async () => {
    try {
      await navigator.clipboard.writeText(resultText);
      setActionMessage("Study hours plan copied.");
    } catch {
      setActionMessage("Copy was blocked. Use download instead.");
    }
  };

  const downloadResult = () => {
    const blob = new Blob([resultText], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "kasa-study-hours-plan.txt";
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
    setActionMessage("Study hours plan downloaded.");
  };

  return (
    <section className="relative px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto grid w-full max-w-[108rem] gap-5 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="rounded-[1.25rem] border border-blue-950/10 bg-white/92 p-5 shadow-xl shadow-blue-950/8 backdrop-blur dark:border-white/10 dark:bg-surface/90 sm:p-7">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-primary dark:text-emerald-200">
                Study hours setup
              </p>
              <h2 className="mt-2 font-heading text-3xl font-semibold text-slate-950 dark:text-white">
                Calculate daily study time
              </h2>
              <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">
                Enter your exam timeline and syllabus load to estimate how many hours to study each day.
              </p>
            </div>
            <button type="button" onClick={reset} className="grid size-10 cursor-pointer place-items-center rounded-full border border-blue-950/10 bg-white text-slate-700 shadow-sm transition hover:border-primary/35 hover:text-primary dark:border-white/10 dark:bg-white/7 dark:text-white">
              <RotateCcw className="size-4" aria-hidden="true" />
            </button>
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <NumberField label="Days until exam" value={examDays} onChange={setExamDays} min={1} max={180} presets={[7, 15, 30, 45, 60, 90]} />
            <NumberField label="Subjects" value={subjects} onChange={setSubjects} min={1} max={12} presets={[3, 4, 5, 6, 8]} />
            <NumberField label="Chapters or topics" value={chapters} onChange={setChapters} min={1} max={150} presets={[20, 35, 50, 75, 100]} />
            <NumberField label="Session length" value={sessionLength} onChange={setSessionLength} min={20} max={120} suffix="min" step={5} presets={[30, 45, 50, 60, 90]} />
          </div>

          <div className="mt-4 rounded-[1.1rem] border border-blue-950/10 bg-white/82 p-4 shadow-sm shadow-blue-950/5 dark:border-white/10 dark:bg-white/[0.04]">
            <div className="flex items-center justify-between gap-3">
              <span className="text-sm font-semibold text-slate-800 dark:text-slate-100">Revision time</span>
              <span className="rounded-full bg-emerald-50 px-3 py-1 text-sm font-semibold text-emerald-700 dark:bg-emerald-400/10 dark:text-emerald-200">{revision}%</span>
            </div>
            <input type="range" min={0} max={60} value={revision} onChange={(event) => setRevision(Number(event.target.value))} className="mt-4 h-2 w-full cursor-pointer accent-[#22b573] dark:accent-[#58c98a]" />
          </div>

          <div className="mt-4 rounded-[1.1rem] border border-blue-950/10 bg-white/82 p-4 shadow-sm shadow-blue-950/5 dark:border-white/10 dark:bg-white/[0.04]">
            <div className="text-sm font-semibold text-slate-800 dark:text-slate-100">Current confidence</div>
            <div className="mt-3 flex flex-wrap gap-2">
              {confidenceLevels.map((level) => (
                <button key={level.label} type="button" onClick={() => setConfidence(level.label)} className={`cursor-pointer rounded-full border px-3 py-2 text-sm font-semibold transition ${confidence === level.label ? "border-emerald-500 bg-emerald-50 text-emerald-800 dark:border-emerald-300 dark:bg-emerald-300 dark:text-slate-950" : "border-blue-950/10 bg-white text-slate-700 hover:border-emerald-300 hover:text-emerald-700 dark:border-white/10 dark:bg-white/7 dark:text-slate-200"}`}>
                  {level.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="rounded-[1.25rem] border border-blue-950/10 bg-white/94 p-5 shadow-2xl shadow-blue-950/12 backdrop-blur dark:border-white/10 dark:bg-surface/92 sm:p-7">
          <div className="flex flex-wrap items-start justify-between gap-5">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary dark:text-emerald-200">Recommended study time</p>
              <div className="mt-3 font-heading text-6xl font-semibold leading-none text-slate-950 sm:text-7xl dark:text-white">{result.dailyHours.toFixed(1)}h</div>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">per day until the exam</p>
            </div>
            <span className="rounded-full bg-emerald-50 px-3 py-2 text-sm font-semibold text-emerald-700 dark:bg-emerald-400/10 dark:text-emerald-200">{result.status}</span>
          </div>

          <div className="mt-7 rounded-[1.1rem] border border-emerald-200 bg-emerald-50 p-5 dark:border-emerald-300/30 dark:bg-emerald-400/10">
            <h3 className="font-heading text-2xl font-semibold text-slate-950 dark:text-white">Plan your day around {result.sessionsPerDay} sessions.</h3>
            <p className="mt-2 text-sm leading-6 text-slate-700 dark:text-slate-200">{result.note}</p>
          </div>

          <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <Metric label="Daily sessions" value={`${result.sessionsPerDay}`} />
            <Metric label="Weekly hours" value={`${result.weeklyHours.toFixed(1)}h`} />
            <Metric label="Chapters/day" value={`${result.chaptersPerDay.toFixed(1)}`} />
            <Metric label="Total study" value={`${result.totalHours.toFixed(0)}h`} />
          </div>

          <div className="mt-6 grid gap-3">
            {["Study new topics first", "Add short recall tests after every two sessions", "Keep revision near the end of the day"].map((item) => (
              <div key={item} className="flex gap-3 rounded-xl bg-slate-50 px-4 py-3 text-sm text-slate-700 dark:bg-slate-950/40 dark:text-slate-200">
                <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-primary dark:text-emerald-300" aria-hidden="true" />
                <span>{item}</span>
              </div>
            ))}
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
      {presets.length ? (
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
      ) : null}
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
        <BookOpenCheck className="size-4 text-primary dark:text-emerald-300" aria-hidden="true" />
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
