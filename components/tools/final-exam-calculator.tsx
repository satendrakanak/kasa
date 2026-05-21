"use client";

import { useMemo, useState } from "react";
import {
  CheckCircle2,
  Copy,
  Download,
  Printer,
  RotateCcw,
  Target,
  TrendingUp,
  Trophy,
} from "lucide-react";

const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(Number.isFinite(value) ? value : min, min), max);

const defaultValues = {
  currentGrade: 78,
  targetGrade: 80,
  finalWeight: 30,
  expectedFinalScore: 85,
};

function getLetterGrade(percentage: number) {
  if (percentage >= 90) return "A+";
  if (percentage >= 80) return "A";
  if (percentage >= 70) return "B";
  if (percentage >= 60) return "C";
  if (percentage >= 40) return "D";
  return "F";
}

function getStatus(requiredScore: number) {
  if (requiredScore <= 0) {
    return {
      title: "Target already secured",
      description: "Your current grade is already enough for this target, even before the final exam.",
      tone: "text-emerald-700 dark:text-emerald-300",
      bg: "bg-emerald-50 dark:bg-emerald-500/10",
    };
  }
  if (requiredScore <= 70) {
    return {
      title: "Target is realistic",
      description: "This target is comfortably possible with a steady final exam score.",
      tone: "text-teal-700 dark:text-teal-300",
      bg: "bg-teal-50 dark:bg-teal-500/10",
    };
  }
  if (requiredScore <= 100) {
    return {
      title: "Target needs a strong final",
      description: "This target is possible, but you need a high final exam score.",
      tone: "text-amber-700 dark:text-amber-300",
      bg: "bg-amber-50 dark:bg-amber-500/10",
    };
  }
  return {
    title: "Target is out of reach",
    description: "The required final exam score is above 100%, so this target is not possible.",
    tone: "text-rose-700 dark:text-rose-300",
    bg: "bg-rose-50 dark:bg-rose-500/10",
  };
}

export function FinalExamCalculator() {
  const [currentGrade, setCurrentGrade] = useState(defaultValues.currentGrade);
  const [targetGrade, setTargetGrade] = useState(defaultValues.targetGrade);
  const [finalWeight, setFinalWeight] = useState(defaultValues.finalWeight);
  const [expectedFinalScore, setExpectedFinalScore] = useState(defaultValues.expectedFinalScore);
  const [actionMessage, setActionMessage] = useState("Ready to save or share your result.");

  const result = useMemo(() => {
    const current = clamp(currentGrade, 0, 100);
    const target = clamp(targetGrade, 0, 100);
    const weight = clamp(finalWeight, 1, 100);
    const expected = clamp(expectedFinalScore, 0, 100);
    const courseworkWeight = 100 - weight;
    const currentContribution = (current * courseworkWeight) / 100;
    const requiredScore = ((target - currentContribution) / weight) * 100;
    const projectedFinalGrade = currentContribution + (expected * weight) / 100;
    const passScore = ((40 - currentContribution) / weight) * 100;
    const status = getStatus(requiredScore);
    const scenarios = [50, 60, 70, 80, 90, 100].map((score) => ({
      score,
      finalGrade: currentContribution + (score * weight) / 100,
    }));

    return {
      current,
      target,
      weight,
      expected,
      courseworkWeight,
      currentContribution,
      requiredScore,
      projectedFinalGrade,
      passScore,
      status,
      scenarios,
      progress: Math.min(Math.max(requiredScore, 0), 100),
      grade: getLetterGrade(projectedFinalGrade),
    };
  }, [currentGrade, expectedFinalScore, finalWeight, targetGrade]);

  const resultText = [
    "Final Exam Calculator Result",
    "",
    `Current grade: ${result.current.toFixed(2)}%`,
    `Target final grade: ${result.target.toFixed(2)}%`,
    `Final exam weight: ${result.weight.toFixed(2)}%`,
    `Required final exam score: ${result.requiredScore.toFixed(2)}%`,
    `Projected final grade with ${result.expected.toFixed(2)}% on the final: ${result.projectedFinalGrade.toFixed(2)}%`,
    "",
    "Generated with KASA Final Exam Calculator",
    "https://www.getkasa.in/tools/final-exam-calculator",
  ].join("\n");

  const resetCalculator = () => {
    setCurrentGrade(defaultValues.currentGrade);
    setTargetGrade(defaultValues.targetGrade);
    setFinalWeight(defaultValues.finalWeight);
    setExpectedFinalScore(defaultValues.expectedFinalScore);
    setActionMessage("Ready to save or share your result.");
  };

  const copyResult = async () => {
    try {
      await navigator.clipboard.writeText(resultText);
      setActionMessage("Final exam result copied.");
    } catch {
      setActionMessage("Copy was blocked by the browser. Use download or print instead.");
    }
  };

  const downloadResult = () => {
    const blob = new Blob([resultText], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "kasa-final-exam-result.txt";
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
    setActionMessage("Final exam result downloaded.");
  };

  const printResult = () => {
    const printHtml = `
      <!doctype html>
      <html>
        <head>
          <meta charset="utf-8" />
          <title>Final Exam Calculator Result</title>
          <style>
            body { margin: 0; padding: 32px; color: #071b3a; font-family: Arial, Helvetica, sans-serif; }
            main { max-width: 760px; margin: 0 auto; }
            .eyebrow { color: #1647a3; font-size: 12px; font-weight: 700; letter-spacing: 0.16em; text-transform: uppercase; }
            h1 { margin: 8px 0 16px; font-size: 34px; }
            .grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px; }
            .card { border: 1px solid #d7e7f6; border-radius: 14px; padding: 16px; background: #f8fbff; }
            .label { color: #64748b; font-size: 11px; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase; }
            .value { margin-top: 8px; font-size: 26px; font-weight: 800; }
            .note { margin-top: 18px; color: #475569; line-height: 1.6; }
            .footer { margin-top: 24px; border-top: 1px solid #d7e7f6; padding-top: 14px; color: #64748b; font-size: 12px; }
          </style>
        </head>
        <body>
          <main>
            <div class="eyebrow">KASA Final Exam Calculator</div>
            <h1>Final Exam Result</h1>
            <div class="grid">
              <div class="card"><div class="label">Current grade</div><div class="value">${result.current.toFixed(2)}%</div></div>
              <div class="card"><div class="label">Target grade</div><div class="value">${result.target.toFixed(2)}%</div></div>
              <div class="card"><div class="label">Final exam weight</div><div class="value">${result.weight.toFixed(2)}%</div></div>
              <div class="card"><div class="label">Required final score</div><div class="value">${result.requiredScore.toFixed(2)}%</div></div>
            </div>
            <p class="note">${result.status.description}</p>
            <div class="footer">Generated with KASA Final Exam Calculator · https://www.getkasa.in/tools/final-exam-calculator</div>
          </main>
        </body>
      </html>
    `;
    const iframe = document.createElement("iframe");
    iframe.style.position = "fixed";
    iframe.style.width = "0";
    iframe.style.height = "0";
    iframe.style.border = "0";
    document.body.appendChild(iframe);
    const frameWindow = iframe.contentWindow;
    const frameDocument = iframe.contentDocument ?? frameWindow?.document;
    if (!frameWindow || !frameDocument) {
      iframe.remove();
      setActionMessage("Print could not open. Use download instead.");
      return;
    }
    frameDocument.open();
    frameDocument.write(printHtml);
    frameDocument.close();
    frameWindow.focus();
    frameWindow.print();
    window.setTimeout(() => iframe.remove(), 1000);
    setActionMessage("Print dialog opened with only the final exam result.");
  };

  return (
    <section className="relative px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto grid w-full max-w-[108rem] gap-5 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="rounded-[1.25rem] border border-blue-950/10 bg-white/92 p-5 shadow-xl shadow-blue-950/8 backdrop-blur dark:border-white/10 dark:bg-surface/90 sm:p-7">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-primary dark:text-emerald-200">
                Final exam setup
              </p>
              <h2 className="mt-2 font-heading text-3xl font-semibold text-slate-950 dark:text-white">
                Add your grade details
              </h2>
              <p className="mt-2 max-w-xl text-sm leading-6 text-slate-600 dark:text-slate-300">
                Enter current grade, target grade, and final exam weight to calculate the final exam score needed.
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

          <div className="mt-6 grid gap-4">
            <SliderField label="Current grade" value={currentGrade} onChange={setCurrentGrade} suffix="%" />
            <SliderField label="Target final grade" value={targetGrade} onChange={setTargetGrade} suffix="%" />
            <SliderField label="Final exam weight" value={finalWeight} onChange={setFinalWeight} min={1} suffix="%" />
            <SliderField label="Expected final exam score" value={expectedFinalScore} onChange={setExpectedFinalScore} suffix="%" />
          </div>

          <div className="mt-5 flex flex-wrap gap-2">
            {[40, 50, 60, 75, 80, 90].map((preset) => (
              <button
                key={preset}
                type="button"
                onClick={() => setTargetGrade(preset)}
                className={[
                  "cursor-pointer rounded-full border px-3 py-2 text-sm font-semibold transition",
                  result.target === preset
                    ? "border-emerald-500 bg-emerald-50 text-emerald-800 shadow-sm shadow-emerald-950/8 dark:border-emerald-300 dark:bg-emerald-300 dark:text-slate-950"
                    : "border-blue-950/10 bg-white/86 text-slate-700 hover:border-emerald-300 hover:text-emerald-700 dark:border-white/10 dark:bg-white/7 dark:text-slate-200",
                ].join(" ")}
              >
                Target {preset}%
              </button>
            ))}
          </div>
        </div>

        <div className="rounded-[1.25rem] border border-blue-950/10 bg-white/94 p-5 shadow-2xl shadow-blue-950/12 backdrop-blur dark:border-white/10 dark:bg-surface/92 sm:p-7">
          <div className="flex flex-wrap items-start justify-between gap-5">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary dark:text-emerald-200">
                Required final exam score
              </p>
              <div className="mt-3 font-heading text-6xl font-semibold leading-none text-slate-950 sm:text-7xl dark:text-white">
                {result.requiredScore.toFixed(2)}%
              </div>
              <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">
                Needed to reach a {result.target.toFixed(0)}% final course grade.
              </p>
            </div>
            <div className={`flex items-center gap-2 rounded-full px-3 py-2 ${result.status.bg}`}>
              <CheckCircle2 className={`size-5 ${result.status.tone}`} aria-hidden="true" />
              <span className={`text-sm font-semibold ${result.status.tone}`}>{result.status.title}</span>
            </div>
          </div>

          <div className="mt-7">
            <div className="mb-2 flex items-center justify-between text-xs font-semibold uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">
              <span>Required score</span>
              <span>100% max</span>
            </div>
            <div className="relative h-4 w-full overflow-hidden rounded-full bg-slate-300/80 shadow-inner shadow-slate-400/35 dark:bg-white/14 dark:shadow-none">
              <div
                className="h-full rounded-full bg-[image:var(--button-solid)] transition-[width] duration-300"
                style={{ width: `${result.progress}%` }}
              />
            </div>
          </div>

          <div className={`mt-7 rounded-[1.1rem] border p-5 ${result.status.bg} border-blue-950/10 dark:border-white/10`}>
            <h3 className="font-heading text-2xl font-semibold text-slate-950 dark:text-white">
              {result.status.title}
            </h3>
            <p className="mt-2 text-sm leading-6 text-slate-700 dark:text-slate-200">
              {result.status.description}
            </p>
          </div>

          <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <Metric label="Coursework" value={`${result.courseworkWeight.toFixed(0)}%`} icon={Target} tone="primary" />
            <Metric label="Current part" value={`${result.currentContribution.toFixed(1)}%`} icon={TrendingUp} tone="emerald" />
            <Metric label="Pass needs" value={`${Math.max(result.passScore, 0).toFixed(1)}%`} icon={Trophy} tone="amber" />
            <Metric label="Projected" value={`${result.projectedFinalGrade.toFixed(1)}%`} icon={CheckCircle2} tone="rose" />
          </div>

          <div className="mt-6 rounded-[1.1rem] border border-blue-950/10 bg-blue-50/70 p-4 dark:border-white/10 dark:bg-white/[0.05]">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <div className="text-sm font-semibold text-slate-950 dark:text-white">
                  Save or share this result
                </div>
                <p className="mt-1 text-xs leading-5 text-slate-600 dark:text-slate-300">{actionMessage}</p>
              </div>
              <div className="flex flex-wrap gap-2">
                <ActionButton label="Copy" icon={Copy} onClick={copyResult} />
                <ActionButton label="Print" icon={Printer} onClick={printResult} />
                <ActionButton label="Download" icon={Download} onClick={downloadResult} />
              </div>
            </div>
          </div>

          <div className="mt-6 grid gap-3">
            {result.scenarios.map((scenario) => (
              <div
                key={scenario.score}
                className="flex flex-wrap items-center justify-between gap-3 rounded-xl bg-slate-50 px-3 py-2 text-sm dark:bg-slate-950/40"
              >
                <span className="font-semibold text-slate-950 dark:text-white">
                  If final exam score is {scenario.score}%
                </span>
                <span className="text-slate-600 dark:text-slate-300">
                  Final grade: {scenario.finalGrade.toFixed(2)}% · {getLetterGrade(scenario.finalGrade)}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function SliderField({
  label,
  value,
  onChange,
  min = 0,
  suffix,
}: {
  label: string;
  value: number;
  onChange: (value: number) => void;
  min?: number;
  suffix: string;
}) {
  return (
    <label className="rounded-[1.1rem] border border-blue-950/10 bg-white/82 p-4 shadow-sm shadow-blue-950/5 dark:border-white/10 dark:bg-white/[0.04]">
      <div className="flex items-center justify-between gap-3">
        <span className="text-sm font-semibold text-slate-800 dark:text-slate-100">{label}</span>
        <span className="rounded-full bg-emerald-50 px-3 py-1 text-sm font-semibold text-emerald-700 dark:bg-emerald-400/10 dark:text-emerald-200">
          {value}{suffix}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max="100"
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
        className="mt-4 h-2 w-full cursor-pointer accent-[#22b573] dark:accent-[#58c98a]"
      />
      <input
        type="number"
        min={min}
        max={100}
        value={value}
        onChange={(event) => onChange(clamp(Number(event.target.value), min, 100))}
        className="mt-3 h-11 w-full rounded-xl border border-blue-950/10 bg-white px-3 text-lg font-semibold text-slate-950 outline-none transition focus:border-primary/45 dark:border-white/10 dark:bg-slate-950/55 dark:text-white"
      />
    </label>
  );
}

function ActionButton({
  label,
  icon: Icon,
  onClick,
}: {
  label: string;
  icon: typeof Copy;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-blue-950/10 bg-white px-3 py-2 text-xs font-semibold text-slate-700 shadow-sm shadow-blue-950/5 transition hover:border-primary/35 hover:text-primary dark:border-white/10 dark:bg-white/[0.06] dark:text-slate-200 dark:hover:text-white"
    >
      <Icon className="size-3.5" aria-hidden="true" />
      {label}
    </button>
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
  icon: typeof Trophy;
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
      <div className="mt-3 text-3xl font-semibold text-slate-950 dark:text-white">{value}</div>
    </div>
  );
}
