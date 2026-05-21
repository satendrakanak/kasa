"use client";

import { useMemo, useState } from "react";
import { ArrowLeftRight, Copy, Download, GraduationCap, RotateCcw } from "lucide-react";

const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(Number.isFinite(value) ? value : min, min), max);

const formulas = [
  { key: "cbse", label: "10-point: CGPA x 9.5", multiplier: 9.5 },
  { key: "standard10", label: "10-point: CGPA x 10", multiplier: 10 },
  { key: "anna", label: "University style: CGPA x 10 - 5", multiplier: 10, offset: -5 },
  { key: "four", label: "4-point: GPA x 25", multiplier: 25 },
] as const;

type FormulaKey = (typeof formulas)[number]["key"];

export function CgpaPercentageConverter() {
  const [mode, setMode] = useState<"cgpa-to-percentage" | "percentage-to-cgpa">("cgpa-to-percentage");
  const [formulaKey, setFormulaKey] = useState<FormulaKey>("cbse");
  const [value, setValue] = useState(8.2);
  const [actionMessage, setActionMessage] = useState("Ready to copy or download your conversion.");

  const result = useMemo(() => {
    const formula = formulas.find((item) => item.key === formulaKey) ?? formulas[0];
    const offset = "offset" in formula ? formula.offset : 0;
    const maxInput = formula.key === "four" && mode === "cgpa-to-percentage" ? 4 : mode === "cgpa-to-percentage" ? 10 : 100;
    const step = mode === "cgpa-to-percentage" ? 0.1 : 1;
    const presets =
      mode === "cgpa-to-percentage"
        ? formula.key === "four"
          ? [2.5, 3, 3.5, 4]
          : [6, 7, 7.5, 8, 8.5, 9]
        : [50, 60, 70, 75, 80, 90];
    const cleanValue = clamp(value, 0, maxInput);
    const converted =
      mode === "cgpa-to-percentage"
        ? cleanValue * formula.multiplier + offset
        : (cleanValue - offset) / formula.multiplier;
    const safeConverted = clamp(converted, 0, mode === "cgpa-to-percentage" ? 100 : formula.key === "four" ? 4 : 10);
    return {
      formula,
      cleanValue,
      converted: safeConverted,
      maxInput,
      outputLabel: mode === "cgpa-to-percentage" ? "Percentage" : formula.key === "four" ? "GPA" : "CGPA",
      inputLabel: mode === "cgpa-to-percentage" ? (formula.key === "four" ? "GPA" : "CGPA") : "Percentage",
      step,
      presets,
    };
  }, [formulaKey, mode, value]);

  const reset = () => {
    setMode("cgpa-to-percentage");
    setFormulaKey("cbse");
    setValue(8.2);
    setActionMessage("Ready to copy or download your conversion.");
  };

  const resultText = [
    "CGPA Percentage Converter Result",
    `Mode: ${mode === "cgpa-to-percentage" ? "CGPA to percentage" : "Percentage to CGPA"}`,
    `Formula: ${result.formula.label}`,
    `${result.inputLabel}: ${result.cleanValue.toFixed(2)}`,
    `${result.outputLabel}: ${result.converted.toFixed(2)}${mode === "cgpa-to-percentage" ? "%" : ""}`,
    "",
    "Generated with KASA CGPA to Percentage Converter",
  ].join("\n");

  const copyResult = async () => {
    try {
      await navigator.clipboard.writeText(resultText);
      setActionMessage("Conversion copied.");
    } catch {
      setActionMessage("Copy was blocked. Use download instead.");
    }
  };

  const downloadResult = () => {
    const blob = new Blob([resultText], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "kasa-cgpa-percentage-conversion.txt";
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
    setActionMessage("Conversion downloaded.");
  };

  return (
    <section className="relative px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto grid w-full max-w-[108rem] gap-5 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="rounded-[1.25rem] border border-blue-950/10 bg-white/92 p-5 shadow-xl shadow-blue-950/8 backdrop-blur dark:border-white/10 dark:bg-surface/90 sm:p-7">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-primary dark:text-emerald-200">CGPA conversion setup</p>
              <h2 className="mt-2 font-heading text-3xl font-semibold text-slate-950 dark:text-white">Convert CGPA and percentage</h2>
              <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">Choose the formula used by your board or university and convert instantly.</p>
            </div>
            <button type="button" onClick={reset} className="grid size-10 cursor-pointer place-items-center rounded-full border border-blue-950/10 bg-white text-slate-700 shadow-sm transition hover:border-primary/35 hover:text-primary dark:border-white/10 dark:bg-white/7 dark:text-white">
              <RotateCcw className="size-4" aria-hidden="true" />
            </button>
          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {[
              ["cgpa-to-percentage", "CGPA to percentage"],
              ["percentage-to-cgpa", "Percentage to CGPA"],
            ].map(([key, label]) => (
              <button key={key} type="button" onClick={() => setMode(key as typeof mode)} className={`cursor-pointer rounded-[1.1rem] border p-4 text-left font-semibold transition ${mode === key ? "border-emerald-400 bg-emerald-50 text-emerald-800 dark:border-emerald-300 dark:bg-emerald-300 dark:text-slate-950" : "border-blue-950/10 bg-white/82 text-slate-700 hover:border-emerald-300 hover:text-emerald-700 dark:border-white/10 dark:bg-white/[0.04] dark:text-slate-200"}`}>
                {label}
              </button>
            ))}
          </div>

          <div className="mt-4 rounded-[1.1rem] border border-blue-950/10 bg-white/82 p-4 shadow-sm shadow-blue-950/5 dark:border-white/10 dark:bg-white/[0.04]">
            <div className="flex items-center justify-between gap-3">
              <span className="text-sm font-semibold text-slate-800 dark:text-slate-100">{result.inputLabel}</span>
              <span className="rounded-full bg-emerald-50 px-3 py-1 text-sm font-semibold text-emerald-700 dark:bg-emerald-400/10 dark:text-emerald-200">
                {result.cleanValue.toFixed(mode === "cgpa-to-percentage" ? 1 : 0)}
              </span>
            </div>
            <input
              type="range"
              min={0}
              max={result.maxInput}
              step={result.step}
              value={value}
              onChange={(event) => setValue(clamp(Number(event.target.value), 0, result.maxInput))}
              className="mt-4 h-2 w-full cursor-pointer accent-[#22b573] dark:accent-[#58c98a]"
            />
            <div className="mt-3 flex flex-wrap gap-2">
              {result.presets.map((preset) => (
                <button
                  key={preset}
                  type="button"
                  onClick={() => setValue(clamp(preset, 0, result.maxInput))}
                  className={`cursor-pointer rounded-full border px-3 py-2 text-sm font-semibold transition ${value === preset ? "border-emerald-500 bg-emerald-50 text-emerald-800 dark:border-emerald-300 dark:bg-emerald-300 dark:text-slate-950" : "border-blue-950/10 bg-white text-slate-700 hover:border-emerald-300 hover:text-emerald-700 dark:border-white/10 dark:bg-white/7 dark:text-slate-200"}`}
                >
                  {preset}
                </button>
              ))}
            </div>
            <input
              type="number"
              min={0}
              max={result.maxInput}
              step={result.step}
              value={value}
              onChange={(event) => setValue(clamp(Number(event.target.value), 0, result.maxInput))}
              className="mt-3 h-11 w-full rounded-xl border border-blue-950/10 bg-white px-3 text-base font-semibold text-slate-950 outline-none transition focus:border-primary/45 dark:border-white/10 dark:bg-slate-950/55 dark:text-white"
            />
          </div>

          <div className="mt-4 rounded-[1.1rem] border border-blue-950/10 bg-white/82 p-4 shadow-sm shadow-blue-950/5 dark:border-white/10 dark:bg-white/[0.04]">
            <div className="text-sm font-semibold text-slate-800 dark:text-slate-100">Formula</div>
            <div className="mt-3 grid gap-2">
              {formulas.map((formula) => (
                <button key={formula.key} type="button" onClick={() => setFormulaKey(formula.key)} className={`cursor-pointer rounded-xl border px-3 py-3 text-left text-sm font-semibold transition ${formulaKey === formula.key ? "border-emerald-500 bg-emerald-50 text-emerald-800 dark:border-emerald-300 dark:bg-emerald-300 dark:text-slate-950" : "border-blue-950/10 bg-white text-slate-700 hover:border-emerald-300 hover:text-emerald-700 dark:border-white/10 dark:bg-white/7 dark:text-slate-200"}`}>
                  {formula.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="rounded-[1.25rem] border border-blue-950/10 bg-white/94 p-5 shadow-2xl shadow-blue-950/12 backdrop-blur dark:border-white/10 dark:bg-surface/92 sm:p-7">
          <div className="flex flex-wrap items-start justify-between gap-5">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary dark:text-emerald-200">{result.outputLabel}</p>
              <div className="mt-3 font-heading text-6xl font-semibold leading-none text-slate-950 sm:text-7xl dark:text-white">
                {result.converted.toFixed(2)}{mode === "cgpa-to-percentage" ? "%" : ""}
              </div>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">Using {result.formula.label}</p>
            </div>
            <span className="grid size-12 place-items-center rounded-xl bg-[image:var(--button-solid)] !text-white">
              <ArrowLeftRight className="size-6" aria-hidden="true" />
            </span>
          </div>

          <div className="mt-7 rounded-[1.1rem] border border-emerald-200 bg-emerald-50 p-5 dark:border-emerald-300/30 dark:bg-emerald-400/10">
            <h3 className="font-heading text-2xl font-semibold text-slate-950 dark:text-white">Use the official formula when available.</h3>
            <p className="mt-2 text-sm leading-6 text-slate-700 dark:text-slate-200">Different boards and universities use different conversion rules. This tool includes common formulas so students can choose the closest official method.</p>
          </div>

          <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <Metric label="Input" value={result.cleanValue.toFixed(2)} />
            <Metric label="Output" value={`${result.converted.toFixed(2)}${mode === "cgpa-to-percentage" ? "%" : ""}`} />
            <Metric label="Scale" value={result.formula.key === "four" ? "4.0" : "10.0"} />
            <Metric label="Formula" value={result.formula.key === "cbse" ? "x9.5" : result.formula.key === "standard10" ? "x10" : result.formula.key === "anna" ? "x10-5" : "x25"} />
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

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-[1.1rem] border border-blue-950/10 bg-white p-4 shadow-sm shadow-blue-950/5 dark:border-white/10 dark:bg-white/[0.05]">
      <div className="flex items-center justify-between gap-3">
        <div className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">{label}</div>
        <GraduationCap className="size-4 text-primary dark:text-emerald-300" aria-hidden="true" />
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
