"use client";

import { useMemo, useState } from "react";
import { CheckCircle2, Copy, Download, Printer, RotateCcw, ShieldCheck } from "lucide-react";

const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(Number.isFinite(value) ? value : min, min), max);

const categories = ["General", "OBC", "SC", "ST", "EWS", "Minority"] as const;
const courses = ["School", "Undergraduate", "Postgraduate", "Professional"] as const;
const marksPresets = [50, 60, 70, 75, 80, 90] as const;
const incomePresets = [
  { label: "Below 1L", value: 100000 },
  { label: "2.5L", value: 250000 },
  { label: "4L", value: 400000 },
  { label: "6L", value: 600000 },
  { label: "8L", value: 800000 },
  { label: "10L+", value: 1000000 },
  { label: "15L+", value: 1500000 },
] as const;

export function ScholarshipEligibilityCalculator() {
  const [marks, setMarks] = useState(82);
  const [income, setIncome] = useState(250000);
  const [category, setCategory] = useState<(typeof categories)[number]>("OBC");
  const [course, setCourse] = useState<(typeof courses)[number]>("Undergraduate");
  const [isIndian, setIsIndian] = useState(true);
  const [actionMessage, setActionMessage] = useState("Ready to save or share your result.");

  const result = useMemo(() => {
    const cleanMarks = clamp(marks, 0, 100);
    const cleanIncome = clamp(income, 0, 2000000);
    const reservedCategory = category !== "General";
    const minMarks = reservedCategory ? 50 : 60;
    const maxIncome = category === "General" ? 250000 : category === "EWS" ? 800000 : 600000;
    const marksPass = cleanMarks >= minMarks;
    const incomePass = cleanIncome <= maxIncome;
    const eligible = isIndian && marksPass && incomePass;
    const strength = [isIndian, marksPass, incomePass, cleanMarks >= 75].filter(Boolean).length;
    const score = Math.round((strength / 4) * 100);
    const gapMarks = Math.max(0, minMarks - cleanMarks);
    const gapIncome = Math.max(0, cleanIncome - maxIncome);

    return {
      cleanMarks,
      cleanIncome,
      minMarks,
      maxIncome,
      eligible,
      score,
      gapMarks,
      gapIncome,
      title: eligible
        ? "You look eligible for many scholarship filters."
        : "You may need to check scheme-specific rules.",
      note: eligible
        ? "Your marks and income fit common scholarship screening criteria. Always verify the official scheme rules before applying."
        : "One or more common filters are not matching. Try checking category, income limit, required marks, and official scheme rules.",
    };
  }, [category, income, isIndian, marks]);

  const resultText = [
    "Scholarship Eligibility Calculator Result",
    `Marks: ${result.cleanMarks.toFixed(1)}%`,
    `Family income: Rs ${Math.round(result.cleanIncome).toLocaleString("en-IN")}`,
    `Category: ${category}`,
    `Course level: ${course}`,
    `Common minimum marks: ${result.minMarks}%`,
    `Common income limit: Rs ${result.maxIncome.toLocaleString("en-IN")}`,
    `Result: ${result.title}`,
    "",
    "This is a planning estimate, not official scholarship approval.",
    "Generated with KASA Scholarship Eligibility Calculator",
  ].join("\n");

  const reset = () => {
    setMarks(82);
    setIncome(250000);
    setCategory("OBC");
    setCourse("Undergraduate");
    setIsIndian(true);
    setActionMessage("Ready to save or share your result.");
  };

  const copyResult = async () => {
    try {
      await navigator.clipboard.writeText(resultText);
      setActionMessage("Scholarship estimate copied.");
    } catch {
      setActionMessage("Copy was blocked. Use download or print instead.");
    }
  };

  const downloadResult = () => {
    const blob = new Blob([resultText], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "kasa-scholarship-eligibility.txt";
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
    setActionMessage("Scholarship estimate downloaded.");
  };

  const printResult = () => {
    const popup = window.open("", "_blank", "width=820,height=720");
    if (!popup) {
      setActionMessage("Print popup was blocked. Use download instead.");
      return;
    }
    popup.document.write(`<pre style="font:16px/1.6 Arial;padding:32px;white-space:pre-wrap">${resultText}</pre>`);
    popup.document.close();
    popup.print();
    setActionMessage("Print dialog opened.");
  };

  return (
    <section className="relative px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto grid w-full max-w-[108rem] gap-5 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="rounded-[1.25rem] border border-blue-950/10 bg-white/92 p-5 shadow-xl shadow-blue-950/8 backdrop-blur dark:border-white/10 dark:bg-surface/90 sm:p-7">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-primary dark:text-emerald-200">
                Scholarship setup
              </p>
              <h2 className="mt-2 font-heading text-3xl font-semibold text-slate-950 dark:text-white">
                Check your basic eligibility
              </h2>
              <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">
                Use common scholarship filters to understand whether your profile is likely to qualify.
              </p>
            </div>
            <button type="button" onClick={reset} className="grid size-10 cursor-pointer place-items-center rounded-full border border-blue-950/10 bg-white text-slate-700 shadow-sm transition hover:border-primary/35 hover:text-primary dark:border-white/10 dark:bg-white/7 dark:text-white">
              <RotateCcw className="size-4" aria-hidden="true" />
            </button>
          </div>

          <div className="mt-6 grid gap-4">
            <RangeField
              label="Marks percentage"
              value={marks}
              setValue={setMarks}
              min={0}
              max={100}
              step={1}
              valueText={`${marks}%`}
              helper="Choose your latest academic percentage."
              presets={marksPresets.map((preset) => ({ label: `${preset}%`, value: preset }))}
            />
            <RangeField
              label="Annual family income"
              value={income}
              setValue={setIncome}
              min={0}
              max={2000000}
              step={10000}
              valueText={`Rs ${Math.round(income).toLocaleString("en-IN")}`}
              helper="Use approximate annual family income before applying."
              presets={incomePresets}
            />
            <ChoiceGrid label="Category" value={category} options={categories} onChange={setCategory} />
            <ChoiceGrid label="Course level" value={course} options={courses} onChange={setCourse} />
            <button
              type="button"
              onClick={() => setIsIndian((value) => !value)}
              className={[
                "flex cursor-pointer items-center justify-between rounded-[1.1rem] border p-4 text-left transition",
                isIndian
                  ? "border-emerald-300 bg-emerald-50 text-emerald-800 dark:border-emerald-300/50 dark:bg-emerald-400/10 dark:text-emerald-100"
                  : "border-blue-950/10 bg-white text-slate-700 dark:border-white/10 dark:bg-white/[0.04] dark:text-slate-200",
              ].join(" ")}
            >
              <span className="font-semibold">Indian resident / eligible applicant</span>
              <span className="text-sm font-semibold">{isIndian ? "Yes" : "No"}</span>
            </button>
          </div>
        </div>

        <div className="rounded-[1.25rem] border border-blue-950/10 bg-white/94 p-5 shadow-2xl shadow-blue-950/12 backdrop-blur dark:border-white/10 dark:bg-surface/92 sm:p-7">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary dark:text-emerald-200">
                Eligibility estimate
              </p>
              <div className="mt-3 font-heading text-6xl font-semibold leading-none text-slate-950 sm:text-7xl dark:text-white">
                {result.score}%
              </div>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">Profile match strength</p>
            </div>
            <span className={`rounded-full px-3 py-2 text-sm font-semibold ${result.eligible ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-400/10 dark:text-emerald-200" : "bg-amber-50 text-amber-700 dark:bg-amber-400/10 dark:text-amber-200"}`}>
              {result.eligible ? "Likely eligible" : "Needs review"}
            </span>
          </div>

          <div className="mt-7 h-4 overflow-hidden rounded-full bg-slate-300/80 shadow-inner shadow-slate-400/35 dark:bg-white/14">
            <div className="h-full rounded-full bg-[image:var(--button-solid)] transition-[width] duration-300" style={{ width: `${result.score}%` }} />
          </div>

          <div className={`mt-7 rounded-[1.1rem] border p-5 ${result.eligible ? "border-emerald-200 bg-emerald-50 dark:border-emerald-300/30 dark:bg-emerald-400/10" : "border-amber-200 bg-amber-50 dark:border-amber-300/30 dark:bg-amber-400/10"}`}>
            <h3 className="font-heading text-2xl font-semibold text-slate-950 dark:text-white">{result.title}</h3>
            <p className="mt-2 text-sm leading-6 text-slate-700 dark:text-slate-200">{result.note}</p>
          </div>

          <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <Metric label="Minimum marks" value={`${result.minMarks}%`} />
            <Metric label="Income limit" value={`Rs ${Math.round(result.maxIncome / 1000)}k`} />
            <Metric label="Marks gap" value={`${result.gapMarks.toFixed(1)}%`} />
            <Metric label="Income gap" value={`Rs ${Math.round(result.gapIncome).toLocaleString("en-IN")}`} />
          </div>

          <div className="mt-6 rounded-[1.1rem] border border-blue-950/10 bg-blue-50/70 p-4 dark:border-white/10 dark:bg-white/[0.05]">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <div className="text-sm font-semibold text-slate-950 dark:text-white">Save or share this estimate</div>
                <p className="mt-1 text-xs leading-5 text-slate-600 dark:text-slate-300">{actionMessage}</p>
              </div>
              <div className="flex flex-wrap gap-2">
                <ActionButton label="Copy" icon={Copy} onClick={copyResult} />
                <ActionButton label="Print" icon={Printer} onClick={printResult} />
                <ActionButton label="Download" icon={Download} onClick={downloadResult} />
              </div>
            </div>
          </div>

          <p className="mt-5 flex gap-3 rounded-[1.1rem] border border-blue-950/10 bg-white p-4 text-sm leading-6 text-slate-700 dark:border-white/10 dark:bg-white/[0.05] dark:text-slate-200">
            <ShieldCheck className="mt-0.5 size-5 shrink-0 text-primary dark:text-emerald-300" aria-hidden="true" />
            This tool is for planning only. Final eligibility depends on the official scholarship scheme, documents, institute rules, and government portal guidelines.
          </p>
        </div>
      </div>
    </section>
  );
}

function RangeField({
  label,
  value,
  setValue,
  min,
  max,
  step,
  valueText,
  helper,
  presets,
}: {
  label: string;
  value: number;
  setValue: (value: number) => void;
  min: number;
  max: number;
  step: number;
  valueText: string;
  helper: string;
  presets: readonly { label: string; value: number }[];
}) {
  return (
    <div className="rounded-[1.1rem] border border-blue-950/10 bg-white/82 p-4 shadow-sm shadow-blue-950/5 dark:border-white/10 dark:bg-white/[0.04]">
      <div className="flex items-center justify-between gap-3">
        <div>
          <div className="text-sm font-semibold text-slate-800 dark:text-slate-100">{label}</div>
          <div className="mt-1 text-xs leading-5 text-slate-500 dark:text-slate-400">{helper}</div>
        </div>
        <span className="shrink-0 rounded-full bg-emerald-50 px-3 py-1 text-sm font-semibold text-emerald-700 dark:bg-emerald-400/10 dark:text-emerald-200">
          {valueText}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(event) => setValue(clamp(Number(event.target.value), min, max))}
        className="mt-4 h-2 w-full cursor-pointer accent-[#22b573] dark:accent-[#58c98a]"
      />
      <div className="mt-3 flex flex-wrap gap-2">
        {presets.map((preset) => (
          <button
            key={preset.label}
            type="button"
            onClick={() => setValue(clamp(preset.value, min, max))}
            className={[
              "cursor-pointer rounded-full border px-3 py-2 text-sm font-semibold transition",
              value === preset.value
                ? "border-emerald-500 bg-emerald-50 text-emerald-800 shadow-sm shadow-emerald-950/8 dark:border-emerald-300 dark:bg-emerald-300 dark:text-slate-950"
                : "border-blue-950/10 bg-white text-slate-700 hover:border-emerald-300 hover:text-emerald-700 dark:border-white/10 dark:bg-white/7 dark:text-slate-200",
            ].join(" ")}
          >
            {preset.label}
          </button>
        ))}
      </div>
      <label className="mt-3 block">
        <span className="sr-only">{label}</span>
        <input
          type="number"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(event) => setValue(clamp(Number(event.target.value), min, max))}
          className="h-11 w-full rounded-xl border border-blue-950/10 bg-white px-3 text-base font-semibold text-slate-950 outline-none transition focus:border-primary/45 dark:border-white/10 dark:bg-slate-950/55 dark:text-white"
        />
      </label>
    </div>
  );
}

function ChoiceGrid<T extends string>({ label, value, options, onChange }: { label: string; value: T; options: readonly T[]; onChange: (value: T) => void }) {
  return (
    <div className="rounded-[1.1rem] border border-blue-950/10 bg-white/82 p-4 shadow-sm shadow-blue-950/5 dark:border-white/10 dark:bg-white/[0.04]">
      <div className="text-sm font-semibold text-slate-800 dark:text-slate-100">{label}</div>
      <div className="mt-3 flex flex-wrap gap-2">
        {options.map((option) => (
          <button key={option} type="button" onClick={() => onChange(option)} className={`cursor-pointer rounded-full border px-3 py-2 text-sm font-semibold transition ${value === option ? "border-emerald-500 bg-emerald-50 text-emerald-800 dark:border-emerald-300 dark:bg-emerald-300 dark:text-slate-950" : "border-blue-950/10 bg-white text-slate-700 hover:border-emerald-300 hover:text-emerald-700 dark:border-white/10 dark:bg-white/7 dark:text-slate-200"}`}>
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-[1.1rem] border border-blue-950/10 bg-white p-4 shadow-sm shadow-blue-950/5 dark:border-white/10 dark:bg-white/[0.05]">
      <div className="flex items-center justify-between gap-3">
        <div className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">{label}</div>
        <CheckCircle2 className="size-4 text-primary dark:text-emerald-300" aria-hidden="true" />
      </div>
      <div className="mt-3 text-2xl font-semibold text-slate-950 dark:text-white">{value}</div>
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
