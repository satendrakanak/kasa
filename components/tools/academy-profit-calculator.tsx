"use client";

import { useMemo, useState } from "react";
import {
  AlertTriangle,
  CheckCircle2,
  Copy,
  Download,
  IndianRupee,
  RotateCcw,
  Sparkles,
} from "lucide-react";

const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(Number.isFinite(value) ? value : min, min), max);

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(Math.round(value));

type ProfitStrategy = {
  summary: string;
  profitMoves: string[];
  costWarnings: string[];
  growthIdeas: string[];
  ownerNote: string;
};

export function AcademyProfitCalculator() {
  const [students, setStudents] = useState(180);
  const [averageFee, setAverageFee] = useState(1500);
  const [teacherSalary, setTeacherSalary] = useState(120000);
  const [marketingCost, setMarketingCost] = useState(50000);
  const [platformCost, setPlatformCost] = useState(15000);
  const [rentCost, setRentCost] = useState(30000);
  const [otherCost, setOtherCost] = useState(20000);
  const [taxPercent, setTaxPercent] = useState(5);
  const [actionMessage, setActionMessage] = useState("Ready to copy or download your monthly profit report.");
  const [profitStrategy, setProfitStrategy] = useState<ProfitStrategy | null>(null);
  const [isGeneratingStrategy, setIsGeneratingStrategy] = useState(false);
  const [strategyProgress, setStrategyProgress] = useState(0);

  const result = useMemo(() => {
    const activeStudents = clamp(students, 1, 100000);
    const monthlyFee = clamp(averageFee, 0, 1000000);
    const grossRevenue = activeStudents * monthlyFee;
    const operatingExpense =
      clamp(teacherSalary, 0, 10000000) +
      clamp(marketingCost, 0, 10000000) +
      clamp(platformCost, 0, 10000000) +
      clamp(rentCost, 0, 10000000) +
      clamp(otherCost, 0, 10000000);
    const reserveAmount = grossRevenue * (clamp(taxPercent, 0, 40) / 100);
    const totalExpense = operatingExpense + reserveAmount;
    const netProfit = grossRevenue - totalExpense;
    const profitMargin = grossRevenue > 0 ? (netProfit / grossRevenue) * 100 : 0;
    const breakEvenStudents = Math.ceil(totalExpense / Math.max(1, monthlyFee));
    const expenseRatio = grossRevenue > 0 ? (totalExpense / grossRevenue) * 100 : 0;
    const studentGap = activeStudents - breakEvenStudents;
    const marketingShare = totalExpense > 0 ? (marketingCost / totalExpense) * 100 : 0;
    const fixedCost = teacherSalary + rentCost + platformCost + otherCost;
    const cashStatus =
      profitMargin >= 30
        ? "Strong profit zone"
        : profitMargin >= 18
          ? "Healthy profit"
          : profitMargin >= 8
            ? "Thin margin"
            : netProfit >= 0
              ? "Needs margin work"
              : "Loss-making month";
    const insight =
      netProfit < 0
        ? `You need about ${Math.max(0, breakEvenStudents - activeStudents)} more students at this fee to break even.`
        : profitMargin >= 18
          ? `You are ${Math.max(0, studentGap)} students above break-even at the current fee.`
          : "Profit is positive, but costs are taking a high share of monthly revenue.";

    return {
      activeStudents,
      monthlyFee,
      grossRevenue,
      operatingExpense,
      reserveAmount,
      totalExpense,
      netProfit,
      profitMargin,
      breakEvenStudents,
      expenseRatio,
      marketingShare,
      fixedCost,
      cashStatus,
      insight,
    };
  }, [averageFee, marketingCost, otherCost, platformCost, rentCost, students, taxPercent, teacherSalary]);

  const clearStrategy = () => {
    setProfitStrategy(null);
    setStrategyProgress(0);
  };

  const reset = () => {
    setStudents(180);
    setAverageFee(1500);
    setTeacherSalary(120000);
    setMarketingCost(50000);
    setPlatformCost(15000);
    setRentCost(30000);
    setOtherCost(20000);
    setTaxPercent(5);
    setProfitStrategy(null);
    setIsGeneratingStrategy(false);
    setStrategyProgress(0);
    setActionMessage("Ready to copy or download your monthly profit report.");
  };

  const resultText = [
    "Academy Profit Calculator Result",
    `Active students: ${result.activeStudents}`,
    `Average monthly fee: ${formatCurrency(result.monthlyFee)}`,
    `Gross monthly revenue: ${formatCurrency(result.grossRevenue)}`,
    `Operating expense: ${formatCurrency(result.operatingExpense)}`,
    `Tax/reserve amount: ${formatCurrency(result.reserveAmount)}`,
    `Total monthly expense: ${formatCurrency(result.totalExpense)}`,
    `Net monthly profit: ${formatCurrency(result.netProfit)}`,
    `Profit margin: ${result.profitMargin.toFixed(1)}%`,
    `Break-even students: ${result.breakEvenStudents}`,
    `Status: ${result.cashStatus}`,
    "",
    profitStrategy ? "AI Profit Strategy:" : null,
    profitStrategy?.summary,
    ...(profitStrategy?.profitMoves.map((item) => `- ${item}`) || []),
    profitStrategy ? "" : null,
    profitStrategy ? "Cost Warnings:" : null,
    ...(profitStrategy?.costWarnings.map((item) => `- ${item}`) || []),
    profitStrategy ? "" : null,
    profitStrategy ? "Growth Ideas:" : null,
    ...(profitStrategy?.growthIdeas.map((item) => `- ${item}`) || []),
    profitStrategy ? "" : null,
    profitStrategy ? `Owner note: ${profitStrategy.ownerNote}` : null,
    "",
    "Generated with KASA Academy Profit Calculator",
  ]
    .filter(Boolean)
    .join("\n");

  const generateProfitStrategy = async () => {
    setIsGeneratingStrategy(true);
    setStrategyProgress(12);
    setActionMessage("Generating AI profit strategy...");
    const intervalId = window.setInterval(() => {
      setStrategyProgress((progress) => Math.min(progress + (progress < 70 ? 9 : 3), 92));
    }, 420);

    try {
      const response = await fetch("/api/tools/profit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          students: result.activeStudents,
          averageFee: result.monthlyFee,
          teacherSalary,
          marketingCost,
          platformCost,
          rentCost,
          otherCost,
          taxPercent,
          grossRevenue: result.grossRevenue,
          totalExpense: result.totalExpense,
          netProfit: result.netProfit,
          profitMargin: result.profitMargin,
          breakEvenStudents: result.breakEvenStudents,
        }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(typeof data?.error === "string" ? data.error : "AI profit strategy failed.");
      if (!data.strategy) throw new Error("AI did not return a usable profit strategy.");
      setProfitStrategy(data.strategy);
      setStrategyProgress(100);
      setActionMessage(
        data.fallback
          ? data.notice || "AI is busy right now, so a smart profit strategy was generated from your numbers."
          : typeof data.remaining === "number"
            ? `AI profit strategy generated. ${data.remaining} free generations left today.`
            : "AI profit strategy generated.",
      );
    } catch (error) {
      setActionMessage(error instanceof Error ? error.message : "AI profit strategy failed. Please try again.");
    } finally {
      window.clearInterval(intervalId);
      window.setTimeout(() => {
        setIsGeneratingStrategy(false);
        setStrategyProgress(0);
      }, 350);
    }
  };

  const copyResult = async () => {
    try {
      await navigator.clipboard.writeText(resultText);
      setActionMessage("Academy profit report copied.");
    } catch {
      setActionMessage("Copy was blocked. Use download instead.");
    }
  };

  const downloadResult = () => {
    const blob = new Blob([resultText], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "kasa-academy-profit-report.txt";
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
    setActionMessage("Academy profit report downloaded.");
  };

  return (
    <section className="relative px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto grid w-full max-w-[108rem] gap-5 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="rounded-[1.25rem] border border-blue-950/10 bg-white/92 p-5 shadow-xl shadow-blue-950/8 backdrop-blur dark:border-white/10 dark:bg-surface/90 sm:p-7">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-primary dark:text-emerald-200">
                Academy profit setup
              </p>
              <h2 className="mt-2 font-heading text-3xl font-semibold text-slate-950 dark:text-white">
                Check monthly profit
              </h2>
              <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">
                Add students, average fee, salary, rent, marketing, tools, and reserves to see true monthly profit.
              </p>
            </div>
            <button
              type="button"
              onClick={reset}
              className="grid size-10 cursor-pointer place-items-center rounded-full border border-blue-950/10 bg-white text-slate-700 shadow-sm transition hover:border-primary/35 hover:text-primary dark:border-white/10 dark:bg-white/7 dark:text-white"
              aria-label="Reset calculator"
            >
              <RotateCcw className="size-4" aria-hidden="true" />
            </button>
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <NumberField label="Active students" value={students} onChange={(value) => { setStudents(value); clearStrategy(); }} min={1} max={3000} step={5} presets={[50, 100, 180, 300, 500]} />
            <NumberField label="Average monthly fee" value={averageFee} onChange={(value) => { setAverageFee(value); clearStrategy(); }} min={0} max={25000} step={100} prefix="₹" presets={[500, 1000, 1500, 3000, 5000]} />
            <NumberField label="Teacher salaries" value={teacherSalary} onChange={(value) => { setTeacherSalary(value); clearStrategy(); }} min={0} max={1000000} step={5000} prefix="₹" presets={[50000, 100000, 150000, 250000]} />
            <NumberField label="Marketing spend" value={marketingCost} onChange={(value) => { setMarketingCost(value); clearStrategy(); }} min={0} max={500000} step={5000} prefix="₹" presets={[10000, 30000, 50000, 100000]} />
            <NumberField label="Platform/tools cost" value={platformCost} onChange={(value) => { setPlatformCost(value); clearStrategy(); }} min={0} max={250000} step={1000} prefix="₹" presets={[5000, 15000, 30000, 60000]} />
            <NumberField label="Rent or office cost" value={rentCost} onChange={(value) => { setRentCost(value); clearStrategy(); }} min={0} max={500000} step={5000} prefix="₹" presets={[0, 15000, 30000, 75000]} />
            <NumberField label="Other monthly cost" value={otherCost} onChange={(value) => { setOtherCost(value); clearStrategy(); }} min={0} max={300000} step={1000} prefix="₹" presets={[5000, 10000, 20000, 50000]} />
            <NumberField label="Tax or reserve" value={taxPercent} onChange={(value) => { setTaxPercent(value); clearStrategy(); }} min={0} max={30} step={1} suffix="%" presets={[0, 5, 10, 15, 20]} />
          </div>
        </div>

        <div className="rounded-[1.25rem] border border-blue-950/10 bg-white/94 p-5 shadow-2xl shadow-blue-950/12 backdrop-blur dark:border-white/10 dark:bg-surface/92 sm:p-7">
          <div className="rounded-[1.1rem] border border-blue-950/10 bg-[linear-gradient(135deg,#f7fbff_0%,#eef8f3_100%)] p-5 dark:border-white/10 dark:bg-none dark:bg-white/[0.05]">
            <div className="flex flex-wrap items-start justify-between gap-5">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary dark:text-emerald-200">
                  Net monthly profit
                </p>
                <div className="mt-3 font-heading text-5xl font-semibold leading-none text-slate-950 sm:text-6xl dark:text-white">
                  {formatCurrency(result.netProfit)}
                </div>
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
                  {result.grossRevenue ? `${result.profitMargin.toFixed(1)}% margin on ${formatCurrency(result.grossRevenue)} revenue` : "Add revenue details to calculate margin"}
                </p>
              </div>
              <span className={`rounded-full px-3 py-2 text-sm font-semibold ${result.netProfit < 0 ? "bg-rose-50 text-rose-700 dark:bg-rose-400/10 dark:text-rose-200" : "bg-emerald-50 text-emerald-700 dark:bg-emerald-400/10 dark:text-emerald-200"}`}>
                {result.cashStatus}
              </span>
            </div>
          </div>

          <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <Metric label="Revenue" value={formatCurrency(result.grossRevenue)} />
            <Metric label="Expense" value={formatCurrency(result.totalExpense)} />
            <Metric label="Margin" value={`${result.profitMargin.toFixed(1)}%`} />
            <Metric label="Break even" value={`${result.breakEvenStudents} students`} />
          </div>

          <div className={`mt-6 rounded-[1.1rem] border p-5 ${result.netProfit < 0 ? "border-rose-200 bg-rose-50 dark:border-rose-300/30 dark:bg-rose-400/10" : "border-emerald-200 bg-emerald-50 dark:border-emerald-300/30 dark:bg-emerald-400/10"}`}>
            <h3 className="font-heading text-2xl font-semibold text-slate-950 dark:text-white">
              {result.netProfit < 0 ? "Your academy is below break-even." : "Your academy is profitable this month."}
            </h3>
            <p className="mt-2 text-sm leading-6 text-slate-700 dark:text-slate-200">
              {result.insight} Expenses are {result.expenseRatio.toFixed(1)}% of revenue.
            </p>
          </div>

          <div className="mt-6 grid gap-3 md:grid-cols-3">
            <CostCard label="Fixed monthly cost" value={formatCurrency(result.fixedCost)} note="Salary, rent, tools, and other costs" />
            <CostCard label="Marketing share" value={`${result.marketingShare.toFixed(1)}%`} note="Part of total expense used for acquisition" />
            <CostCard label="Reserve amount" value={formatCurrency(result.reserveAmount)} note={`${taxPercent}% kept aside from revenue`} />
          </div>

          <div className="mt-6 overflow-hidden rounded-[1.1rem] border border-blue-950/10 bg-white dark:border-white/10 dark:bg-white/[0.05]">
            <div className="flex flex-col gap-3 border-b border-blue-950/10 bg-slate-50 p-4 dark:border-white/10 dark:bg-slate-950/35 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <div className="inline-flex items-center gap-2 text-sm font-semibold text-slate-950 dark:text-white">
                  <Sparkles className="size-4 text-primary dark:text-emerald-300" aria-hidden="true" />
                  AI profit strategy
                </div>
                <p className="mt-1 text-xs leading-5 text-slate-600 dark:text-slate-300">
                  Get cost warnings, profit moves, growth ideas, and owner notes from your academy numbers.
                </p>
              </div>
              <button
                type="button"
                onClick={generateProfitStrategy}
                disabled={isGeneratingStrategy}
                className="inline-flex min-h-10 cursor-pointer items-center justify-center gap-2 rounded-full bg-[image:var(--button-solid)] px-4 py-2 text-xs font-semibold !text-white shadow-md shadow-blue-950/10 transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:translate-y-0"
              >
                <Sparkles className="size-3.5" aria-hidden="true" />
                {isGeneratingStrategy ? "Generating..." : "Generate AI strategy"}
              </button>
            </div>
            {isGeneratingStrategy ? (
              <div className="p-4">
                <div className="flex items-center justify-between gap-3 text-xs font-semibold uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">
                  <span>Building strategy</span>
                  <span>{Math.round(strategyProgress)}%</span>
                </div>
                <div className="mt-3 h-3 overflow-hidden rounded-full bg-slate-200 shadow-inner dark:bg-white/12">
                  <div className="h-full rounded-full bg-[image:var(--button-solid)] transition-[width] duration-500" style={{ width: `${clamp(strategyProgress, 0, 100)}%` }} />
                </div>
                <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300">
                  Reading your margin, expense ratio, break-even point, and growth room...
                </p>
              </div>
            ) : profitStrategy ? (
              <div className="grid gap-4 p-4">
                <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4 dark:border-emerald-300/25 dark:bg-emerald-400/10">
                  <div className="font-semibold text-slate-950 dark:text-white">Strategy summary</div>
                  <p className="mt-2 text-sm leading-6 text-slate-700 dark:text-slate-200">{profitStrategy.summary}</p>
                </div>
                <StrategyList title="Profit moves" items={profitStrategy.profitMoves} icon="check" />
                <StrategyList title="Cost warnings" items={profitStrategy.costWarnings} icon="warning" />
                <StrategyList title="Growth ideas" items={profitStrategy.growthIdeas} icon="check" />
                <div className="rounded-xl border border-blue-950/10 bg-blue-50/70 p-4 dark:border-white/10 dark:bg-white/[0.04]">
                  <div className="font-semibold text-slate-950 dark:text-white">Owner note</div>
                  <p className="mt-2 text-sm leading-6 text-slate-700 dark:text-slate-200">{profitStrategy.ownerNote}</p>
                </div>
              </div>
            ) : (
              <div className="p-4 text-sm leading-6 text-slate-600 dark:text-slate-300">
                The calculator gives instant profit numbers. AI adds a monthly action plan only when you need it.
              </div>
            )}
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
  step,
  prefix = "",
  suffix = "",
  presets,
}: {
  label: string;
  value: number;
  onChange: (value: number) => void;
  min: number;
  max: number;
  step: number;
  prefix?: string;
  suffix?: string;
  presets: readonly number[];
}) {
  const percent = ((value - min) / (max - min)) * 100;
  return (
    <div className="rounded-[1.1rem] border border-blue-950/10 bg-white/82 p-4 shadow-sm shadow-blue-950/5 dark:border-white/10 dark:bg-white/[0.04]">
      <div className="flex items-center justify-between gap-3">
        <span className="text-sm font-semibold text-slate-800 dark:text-slate-100">{label}</span>
        <span className="rounded-full bg-emerald-50 px-3 py-1 text-sm font-semibold text-emerald-700 dark:bg-emerald-400/10 dark:text-emerald-200">
          {prefix}{value.toLocaleString("en-IN")}{suffix}
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
        style={{ background: `linear-gradient(90deg,#22b573 ${percent}%,#d8e4ef ${percent}%)` }}
      />
      <div className="mt-3 flex flex-wrap gap-2">
        {presets.map((preset) => (
          <button
            key={preset}
            type="button"
            onClick={() => onChange(clamp(preset, min, max))}
            className={`cursor-pointer rounded-full border px-3 py-2 text-sm font-semibold transition ${value === preset ? "border-emerald-500 bg-emerald-50 text-emerald-800 dark:border-emerald-300 dark:bg-emerald-300 dark:text-slate-950" : "border-blue-950/10 bg-white text-slate-700 hover:border-emerald-300 hover:text-emerald-700 dark:border-white/10 dark:bg-white/7 dark:text-slate-200"}`}
          >
            {prefix}{preset.toLocaleString("en-IN")}{suffix}
          </button>
        ))}
      </div>
    </div>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="min-w-0 rounded-[1.1rem] border border-blue-950/10 bg-white p-4 shadow-sm shadow-blue-950/5 dark:border-white/10 dark:bg-white/[0.05]">
      <div className="flex items-center justify-between gap-3">
        <div className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">{label}</div>
        <IndianRupee className="size-4 shrink-0 text-primary dark:text-emerald-300" aria-hidden="true" />
      </div>
      <div className="mt-3 min-w-0 break-words text-[1.12rem] font-semibold leading-snug text-slate-950 dark:text-white" title={value}>
        {value}
      </div>
    </div>
  );
}

function CostCard({ label, value, note }: { label: string; value: string; note: string }) {
  return (
    <div className="rounded-[1.1rem] border border-blue-950/10 bg-white p-4 dark:border-white/10 dark:bg-white/[0.05]">
      <div className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">{label}</div>
      <div className="mt-2 font-heading text-2xl font-semibold text-slate-950 dark:text-white">{value}</div>
      <div className="mt-1 text-xs leading-5 text-slate-500 dark:text-slate-300">{note}</div>
    </div>
  );
}

function StrategyList({ title, items, icon }: { title: string; items: string[]; icon: "check" | "warning" }) {
  const Icon = icon === "warning" ? AlertTriangle : CheckCircle2;
  return (
    <div className="rounded-xl border border-blue-950/10 bg-slate-50 p-4 dark:border-white/10 dark:bg-slate-950/35">
      <div className="font-semibold text-slate-950 dark:text-white">{title}</div>
      <div className="mt-3 grid gap-2">
        {items.map((item) => (
          <div key={item} className="flex gap-3 rounded-lg bg-white px-3 py-2 text-sm leading-6 text-slate-700 dark:bg-white/[0.05] dark:text-slate-200">
            <Icon className={`mt-1 size-4 shrink-0 ${icon === "warning" ? "text-amber-600 dark:text-amber-300" : "text-primary dark:text-emerald-300"}`} aria-hidden="true" />
            <span>{item}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function ActionButton({ label, icon: Icon, onClick }: { label: string; icon: typeof Copy; onClick: () => void }) {
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
