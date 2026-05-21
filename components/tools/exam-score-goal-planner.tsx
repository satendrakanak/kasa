"use client";

import { useMemo, useState } from "react";
import { Copy, Download, Plus, RotateCcw, Target, Trash2 } from "lucide-react";

const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(Number.isFinite(value) ? value : min, min), max);

type SubjectGoal = {
  id: number;
  name: string;
  expected: number;
  total: number;
  target: number;
};

const defaultSubjects: SubjectGoal[] = [
  { id: 1, name: "Mathematics", expected: 78, total: 100, target: 90 },
  { id: 2, name: "Science", expected: 82, total: 100, target: 88 },
  { id: 3, name: "English", expected: 74, total: 100, target: 85 },
  { id: 4, name: "Social Science", expected: 80, total: 100, target: 86 },
];

export function ExamScoreGoalPlanner() {
  const [subjects, setSubjects] = useState(defaultSubjects);
  const [overallTarget, setOverallTarget] = useState(85);
  const [actionMessage, setActionMessage] = useState("Ready to copy or download your score goal plan.");

  const result = useMemo(() => {
    const rows = subjects.map((subject) => {
      const total = clamp(subject.total, 1, 500);
      const expected = clamp(subject.expected, 0, total);
      const target = clamp(subject.target, 0, 100);
      const targetMarks = (target / 100) * total;
      const gap = Math.max(0, targetMarks - expected);
      return {
        ...subject,
        total,
        expected,
        target,
        targetMarks,
        gap,
        percentage: (expected / total) * 100,
      };
    });
    const totalMarks = rows.reduce((sum, row) => sum + row.total, 0);
    const expectedMarks = rows.reduce((sum, row) => sum + row.expected, 0);
    const currentPercent = totalMarks ? (expectedMarks / totalMarks) * 100 : 0;
    const neededForOverall = Math.max(0, (clamp(overallTarget, 0, 100) / 100) * totalMarks - expectedMarks);
    const toughest = [...rows].sort((a, b) => b.gap - a.gap)[0];

    return {
      rows,
      totalMarks,
      expectedMarks,
      currentPercent,
      neededForOverall,
      toughest,
      status: currentPercent >= overallTarget ? "Overall target is already covered." : "You need more marks to reach the overall target.",
    };
  }, [overallTarget, subjects]);

  const updateSubject = (id: number, key: keyof Omit<SubjectGoal, "id">, value: string | number) => {
    setSubjects((items) =>
      items.map((item) =>
        item.id === id
          ? {
              ...item,
              [key]: key === "name" ? String(value) : Number(value),
            }
          : item,
      ),
    );
  };

  const addSubject = () => {
    setSubjects((items) => [
      ...items,
      { id: Math.max(...items.map((item) => item.id), 0) + 1, name: "New subject", expected: 70, total: 100, target: 85 },
    ]);
  };

  const removeSubject = (id: number) => {
    setSubjects((items) => (items.length > 1 ? items.filter((item) => item.id !== id) : items));
  };

  const reset = () => {
    setSubjects(defaultSubjects);
    setOverallTarget(85);
    setActionMessage("Ready to copy or download your score goal plan.");
  };

  const resultText = [
    "Exam Score Goal Planner",
    `Overall target: ${overallTarget}%`,
    `Current expected percentage: ${result.currentPercent.toFixed(2)}%`,
    `Marks needed for overall target: ${result.neededForOverall.toFixed(1)}`,
    "",
    ...result.rows.map((row) => `${row.name}: expected ${row.expected}/${row.total}, target ${row.target}%, gap ${row.gap.toFixed(1)} marks`),
    "",
    "Generated with KASA Exam Score Goal Planner",
  ].join("\n");

  const copyResult = async () => {
    try {
      await navigator.clipboard.writeText(resultText);
      setActionMessage("Score goal plan copied.");
    } catch {
      setActionMessage("Copy was blocked. Use download instead.");
    }
  };

  const downloadResult = () => {
    const blob = new Blob([resultText], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "kasa-exam-score-goal-plan.txt";
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
    setActionMessage("Score goal plan downloaded.");
  };

  return (
    <section className="relative px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto grid w-full max-w-[108rem] gap-5 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="rounded-[1.25rem] border border-blue-950/10 bg-white/92 p-5 shadow-xl shadow-blue-950/8 backdrop-blur dark:border-white/10 dark:bg-surface/90 sm:p-7">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-primary dark:text-emerald-200">Score goal setup</p>
              <h2 className="mt-2 font-heading text-3xl font-semibold text-slate-950 dark:text-white">Set subject-wise targets</h2>
              <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">Plan the marks you need in each subject to reach your overall exam percentage goal.</p>
            </div>
            <button type="button" onClick={reset} className="grid size-10 cursor-pointer place-items-center rounded-full border border-blue-950/10 bg-white text-slate-700 shadow-sm transition hover:border-primary/35 hover:text-primary dark:border-white/10 dark:bg-white/7 dark:text-white">
              <RotateCcw className="size-4" aria-hidden="true" />
            </button>
          </div>

          <label className="mt-6 block rounded-[1.1rem] border border-blue-950/10 bg-white/82 p-4 shadow-sm shadow-blue-950/5 dark:border-white/10 dark:bg-white/[0.04]">
            <div className="flex items-center justify-between gap-3">
              <span className="text-sm font-semibold text-slate-800 dark:text-slate-100">Overall target percentage</span>
              <span className="rounded-full bg-emerald-50 px-3 py-1 text-sm font-semibold text-emerald-700 dark:bg-emerald-400/10 dark:text-emerald-200">{overallTarget}%</span>
            </div>
            <input type="range" min={1} max={100} value={overallTarget} onChange={(event) => setOverallTarget(Number(event.target.value))} className="mt-4 h-2 w-full cursor-pointer accent-[#22b573] dark:accent-[#58c98a]" />
          </label>

          <div className="mt-5 grid gap-3">
            {subjects.map((subject) => (
              <div key={subject.id} className="rounded-[1.1rem] border border-blue-950/10 bg-white/82 p-4 shadow-sm shadow-blue-950/5 dark:border-white/10 dark:bg-white/[0.04]">
                <div className="grid gap-3 md:grid-cols-[1.2fr_0.75fr_0.75fr_0.75fr_auto] md:items-end">
                  <TextField label="Subject" value={subject.name} onChange={(value) => updateSubject(subject.id, "name", value)} />
                  <SmallNumber label="Expected" value={subject.expected} min={0} max={Math.max(subject.total, 1)} onChange={(value) => updateSubject(subject.id, "expected", value)} />
                  <SmallNumber label="Total" value={subject.total} min={1} max={200} presets={[50, 80, 100, 150]} onChange={(value) => updateSubject(subject.id, "total", value)} />
                  <SmallNumber label="Target %" value={subject.target} min={1} max={100} presets={[70, 75, 80, 85, 90]} onChange={(value) => updateSubject(subject.id, "target", value)} />
                  <button type="button" onClick={() => removeSubject(subject.id)} className="grid h-11 cursor-pointer place-items-center rounded-xl border border-blue-950/10 bg-white px-3 text-slate-500 transition hover:border-rose-300 hover:text-rose-600 dark:border-white/10 dark:bg-white/[0.06]">
                    <Trash2 className="size-4" aria-hidden="true" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <button type="button" onClick={addSubject} className="mt-4 inline-flex cursor-pointer items-center gap-2 rounded-full border border-blue-950/10 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-primary/35 hover:text-primary dark:border-white/10 dark:bg-white/[0.06] dark:text-slate-200">
            <Plus className="size-4" aria-hidden="true" />
            Add subject
          </button>
        </div>

        <div className="rounded-[1.25rem] border border-blue-950/10 bg-white/94 p-5 shadow-2xl shadow-blue-950/12 backdrop-blur dark:border-white/10 dark:bg-surface/92 sm:p-7">
          <div className="flex flex-wrap items-start justify-between gap-5">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary dark:text-emerald-200">Expected overall score</p>
              <div className="mt-3 font-heading text-6xl font-semibold leading-none text-slate-950 sm:text-7xl dark:text-white">{result.currentPercent.toFixed(2)}%</div>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{result.expectedMarks.toFixed(1)} out of {result.totalMarks.toFixed(0)} marks</p>
            </div>
            <span className={`rounded-full px-3 py-2 text-sm font-semibold ${result.currentPercent >= overallTarget ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-400/10 dark:text-emerald-200" : "bg-amber-50 text-amber-700 dark:bg-amber-400/10 dark:text-amber-200"}`}>
              {result.currentPercent >= overallTarget ? "On target" : "Needs boost"}
            </span>
          </div>

          <div className="mt-7 h-4 overflow-hidden rounded-full bg-slate-300/80 shadow-inner shadow-slate-400/35 dark:bg-white/14">
            <div className="h-full rounded-full bg-[image:var(--button-solid)] transition-[width] duration-300" style={{ width: `${Math.min(result.currentPercent, 100)}%` }} />
          </div>

          <div className="mt-7 rounded-[1.1rem] border border-emerald-200 bg-emerald-50 p-5 dark:border-emerald-300/30 dark:bg-emerald-400/10">
            <h3 className="font-heading text-2xl font-semibold text-slate-950 dark:text-white">{result.status}</h3>
            <p className="mt-2 text-sm leading-6 text-slate-700 dark:text-slate-200">
              {result.neededForOverall > 0
                ? `You need around ${result.neededForOverall.toFixed(1)} more marks across subjects to reach ${overallTarget}%.`
                : `Your expected marks are already above the ${overallTarget}% overall target.`}
            </p>
          </div>

          <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <Metric label="Needed marks" value={result.neededForOverall.toFixed(1)} />
            <Metric label="Subjects" value={`${result.rows.length}`} />
            <Metric label="Top focus" value={result.toughest?.name ?? "Subject"} />
            <Metric label="Focus gap" value={`${result.toughest?.gap.toFixed(1) ?? "0"}m`} />
          </div>

          <div className="mt-6 grid gap-2">
            {result.rows.map((row) => (
              <div key={row.id} className="grid gap-2 rounded-xl bg-slate-50 px-3 py-3 text-sm dark:bg-slate-950/40 sm:grid-cols-[1fr_auto] sm:items-center">
                <span className="font-semibold text-slate-950 dark:text-white">{row.name}</span>
                <span className="text-slate-600 dark:text-slate-300">Need {row.targetMarks.toFixed(1)}/{row.total} for {row.target}% target · gap {row.gap.toFixed(1)}</span>
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

function TextField({ label, value, onChange }: { label: string; value: string; onChange: (value: string) => void }) {
  return (
    <label>
      <span className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500 dark:text-slate-400">{label}</span>
      <input value={value} onChange={(event) => onChange(event.target.value)} className="mt-2 h-11 w-full rounded-xl border border-blue-950/10 bg-white px-3 text-sm font-semibold text-slate-950 outline-none transition focus:border-primary/45 dark:border-white/10 dark:bg-slate-950/55 dark:text-white" />
    </label>
  );
}

function SmallNumber({
  label,
  value,
  onChange,
  min,
  max,
  presets = [],
}: {
  label: string;
  value: number;
  onChange: (value: number) => void;
  min: number;
  max: number;
  presets?: number[];
}) {
  return (
    <div>
      <div className="flex items-center justify-between gap-2">
        <span className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500 dark:text-slate-400">{label}</span>
        <span className="text-xs font-semibold text-emerald-700 dark:text-emerald-200">{value}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(event) => onChange(clamp(Number(event.target.value), min, max))}
        className="mt-2 h-2 w-full cursor-pointer accent-[#22b573] dark:accent-[#58c98a]"
      />
      {presets.length ? (
        <div className="mt-2 flex flex-wrap gap-1.5">
          {presets.map((preset) => (
            <button
              key={preset}
              type="button"
              onClick={() => onChange(clamp(preset, min, max))}
              className={`cursor-pointer rounded-full border px-2 py-1 text-xs font-semibold transition ${value === preset ? "border-emerald-500 bg-emerald-50 text-emerald-800 dark:border-emerald-300 dark:bg-emerald-300 dark:text-slate-950" : "border-blue-950/10 bg-white text-slate-600 hover:border-emerald-300 hover:text-emerald-700 dark:border-white/10 dark:bg-white/7 dark:text-slate-200"}`}
            >
              {preset}
            </button>
          ))}
        </div>
      ) : null}
      <input
        type="number"
        min={min}
        max={max}
        value={value}
        onChange={(event) => onChange(clamp(Number(event.target.value), min, max))}
        className="mt-2 h-10 w-full rounded-xl border border-blue-950/10 bg-white px-3 text-sm font-semibold text-slate-950 outline-none transition focus:border-primary/45 dark:border-white/10 dark:bg-slate-950/55 dark:text-white"
      />
    </div>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-[1.1rem] border border-blue-950/10 bg-white p-4 shadow-sm shadow-blue-950/5 dark:border-white/10 dark:bg-white/[0.05]">
      <div className="flex items-center justify-between gap-3">
        <div className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">{label}</div>
        <Target className="size-4 text-primary dark:text-emerald-300" aria-hidden="true" />
      </div>
      <div className="mt-3 break-words text-2xl font-semibold text-slate-950 dark:text-white">{value}</div>
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
