"use client";

import { useMemo, useState } from "react";
import { CheckCircle2, Copy, Download, IndianRupee, RotateCcw, Sparkles } from "lucide-react";

const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(Number.isFinite(value) ? value : min, min), max);

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(Math.round(value));

const courseTypes = [
  { label: "Recorded course", priceMultiplier: 1 },
  { label: "Live cohort", priceMultiplier: 1.3 },
  { label: "Hybrid course", priceMultiplier: 1.15 },
] as const;

type PricingStrategy = {
  summary: string;
  strategy: string[];
  tierIdeas: string[];
  launchOffer: string;
  riskWarning: string;
  whatsappPromo: string;
};

export function CoursePricingCalculator() {
  const [students, setStudents] = useState(120);
  const [contentCost, setContentCost] = useState(45000);
  const [marketingCost, setMarketingCost] = useState(30000);
  const [supportCost, setSupportCost] = useState(18000);
  const [platformFee, setPlatformFee] = useState(8);
  const [targetProfit, setTargetProfit] = useState(35);
  const [courseType, setCourseType] = useState<(typeof courseTypes)[number]["label"]>("Recorded course");
  const [actionMessage, setActionMessage] = useState("Ready to copy or download your pricing plan.");
  const [pricingStrategy, setPricingStrategy] = useState<PricingStrategy | null>(null);
  const [isGeneratingStrategy, setIsGeneratingStrategy] = useState(false);
  const [strategyProgress, setStrategyProgress] = useState(0);

  const result = useMemo(() => {
    const learnerCount = clamp(students, 1, 10000);
    const fixedCost = clamp(contentCost, 0, 10000000) + clamp(marketingCost, 0, 10000000) + clamp(supportCost, 0, 10000000);
    const feeRate = clamp(platformFee, 0, 40) / 100;
    const profitRate = clamp(targetProfit, 0, 200) / 100;
    const typeMultiplier = courseTypes.find((item) => item.label === courseType)?.priceMultiplier ?? 1;
    const basePrice = fixedCost / Math.max(1, learnerCount) / Math.max(0.01, 1 - feeRate);
    const recommendedPrice = Math.ceil((basePrice * (1 + profitRate) * typeMultiplier) / 50) * 50;
    const netPerStudent = recommendedPrice * (1 - feeRate);
    const revenue = recommendedPrice * learnerCount;
    const netRevenue = netPerStudent * learnerCount;
    const profit = netRevenue - fixedCost;
    const profitMargin = netRevenue > 0 ? (profit / netRevenue) * 100 : 0;
    const breakEvenStudents = Math.ceil(fixedCost / Math.max(1, netPerStudent));
    const lowTier = Math.max(100, Math.ceil((recommendedPrice * 0.8) / 50) * 50);
    const premiumTier = Math.ceil((recommendedPrice * 1.35) / 50) * 50;

    return {
      learnerCount,
      fixedCost,
      recommendedPrice,
      revenue,
      netRevenue,
      profit,
      profitMargin,
      breakEvenStudents,
      lowTier,
      premiumTier,
      status:
        profitMargin >= 45
          ? "High margin"
          : profitMargin >= 25
            ? "Healthy pricing"
            : profitMargin >= 10
              ? "Thin margin"
              : "Needs repricing",
      note:
        profitMargin >= 25
          ? "This pricing leaves room for delivery, support, and future ad spend."
          : "Increase price, reduce acquisition cost, or improve expected enrollment before launch.",
    };
  }, [contentCost, courseType, marketingCost, platformFee, students, supportCost, targetProfit]);

  const resultText = [
    "Course Pricing Calculator Result",
    `Course type: ${courseType}`,
    `Expected students: ${result.learnerCount}`,
    `Total launch cost: ${formatCurrency(result.fixedCost)}`,
    `Recommended course price: ${formatCurrency(result.recommendedPrice)}`,
    `Projected revenue: ${formatCurrency(result.revenue)}`,
    `Net revenue after platform/payment fee: ${formatCurrency(result.netRevenue)}`,
    `Estimated profit: ${formatCurrency(result.profit)}`,
    `Profit margin: ${result.profitMargin.toFixed(1)}%`,
    `Break-even students: ${result.breakEvenStudents}`,
    `Starter tier: ${formatCurrency(result.lowTier)}`,
    `Premium tier: ${formatCurrency(result.premiumTier)}`,
    pricingStrategy ? "" : null,
    pricingStrategy ? "AI Pricing Strategy:" : null,
    pricingStrategy?.summary,
    ...(pricingStrategy?.strategy.map((item) => `- ${item}`) || []),
    pricingStrategy ? "" : null,
    pricingStrategy ? "Package Ideas:" : null,
    ...(pricingStrategy?.tierIdeas.map((item) => `- ${item}`) || []),
    pricingStrategy ? "" : null,
    pricingStrategy ? `Launch offer: ${pricingStrategy.launchOffer}` : null,
    pricingStrategy ? `Risk warning: ${pricingStrategy.riskWarning}` : null,
    pricingStrategy ? "" : null,
    pricingStrategy ? `WhatsApp promo: ${pricingStrategy.whatsappPromo}` : null,
    "",
    "Generated with KASA Course Pricing Calculator",
  ].filter(Boolean).join("\n");

  const reset = () => {
    setStudents(120);
    setContentCost(45000);
    setMarketingCost(30000);
    setSupportCost(18000);
    setPlatformFee(8);
    setTargetProfit(35);
    setCourseType("Recorded course");
    setPricingStrategy(null);
    setIsGeneratingStrategy(false);
    setStrategyProgress(0);
    setActionMessage("Ready to copy or download your pricing plan.");
  };

  const clearStrategy = () => {
    setPricingStrategy(null);
    setStrategyProgress(0);
  };

  const generatePricingStrategy = async () => {
    setIsGeneratingStrategy(true);
    setStrategyProgress(12);
    setActionMessage("Generating AI pricing strategy...");
    const intervalId = window.setInterval(() => {
      setStrategyProgress((progress) => Math.min(progress + (progress < 70 ? 9 : 3), 92));
    }, 420);

    try {
      const response = await fetch("/api/tools/course-pricing", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          courseType,
          expectedStudents: result.learnerCount,
          totalLaunchCost: result.fixedCost,
          recommendedPrice: result.recommendedPrice,
          starterPrice: result.lowTier,
          premiumPrice: result.premiumTier,
          projectedRevenue: result.revenue,
          estimatedProfit: result.profit,
          profitMargin: result.profitMargin,
          breakEvenStudents: result.breakEvenStudents,
          platformFee,
          targetProfit,
        }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(typeof data?.error === "string" ? data.error : "AI pricing strategy failed.");
      if (!data.strategy) throw new Error("AI did not return a usable pricing strategy.");
      setPricingStrategy(data.strategy);
      setStrategyProgress(100);
      setActionMessage(
        data.fallback
          ? data.notice || "AI is busy right now, so a smart pricing strategy was generated from your numbers."
          : typeof data.remaining === "number"
          ? `AI pricing strategy generated. ${data.remaining} free generations left today.`
          : "AI pricing strategy generated.",
      );
    } catch (error) {
      setActionMessage(error instanceof Error ? error.message : "AI pricing strategy failed. Please try again.");
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
      setActionMessage("Course pricing plan copied.");
    } catch {
      setActionMessage("Copy was blocked. Use download instead.");
    }
  };

  const downloadResult = () => {
    const blob = new Blob([resultText], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "kasa-course-pricing-plan.txt";
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
    setActionMessage("Course pricing plan downloaded.");
  };

  return (
    <section className="relative px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto grid w-full max-w-[108rem] gap-5 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="rounded-[1.25rem] border border-blue-950/10 bg-white/92 p-5 shadow-xl shadow-blue-950/8 backdrop-blur dark:border-white/10 dark:bg-surface/90 sm:p-7">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-primary dark:text-emerald-200">
                Course pricing setup
              </p>
              <h2 className="mt-2 font-heading text-3xl font-semibold text-slate-950 dark:text-white">
                Price your course profitably
              </h2>
              <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">
                Estimate a smart selling price from launch costs, expected students, platform fees, and target profit.
              </p>
            </div>
            <button type="button" onClick={reset} className="grid size-10 cursor-pointer place-items-center rounded-full border border-blue-950/10 bg-white text-slate-700 shadow-sm transition hover:border-primary/35 hover:text-primary dark:border-white/10 dark:bg-white/7 dark:text-white" aria-label="Reset calculator">
              <RotateCcw className="size-4" aria-hidden="true" />
            </button>
          </div>

          <div className="mt-6 grid gap-4">
            <ChoiceGrid label="Course type" value={courseType} options={courseTypes.map((item) => item.label)} onChange={(value) => { setCourseType(value); clearStrategy(); }} />
            <div className="grid gap-4 sm:grid-cols-2">
              <NumberField label="Expected students" value={students} onChange={(value) => { setStudents(value); clearStrategy(); }} min={1} max={5000} step={5} presets={[50, 100, 200, 500]} />
              <NumberField label="Content creation cost" value={contentCost} onChange={(value) => { setContentCost(value); clearStrategy(); }} min={0} max={500000} step={1000} prefix="₹" presets={[10000, 25000, 50000, 100000]} />
              <NumberField label="Marketing budget" value={marketingCost} onChange={(value) => { setMarketingCost(value); clearStrategy(); }} min={0} max={500000} step={1000} prefix="₹" presets={[10000, 30000, 75000, 150000]} />
              <NumberField label="Support and operations" value={supportCost} onChange={(value) => { setSupportCost(value); clearStrategy(); }} min={0} max={300000} step={1000} prefix="₹" presets={[5000, 15000, 30000, 60000]} />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <NumberField label="Platform/payment fee" value={platformFee} onChange={(value) => { setPlatformFee(value); clearStrategy(); }} min={0} max={30} step={1} suffix="%" presets={[3, 5, 8, 12, 18]} />
              <NumberField label="Target profit margin" value={targetProfit} onChange={(value) => { setTargetProfit(value); clearStrategy(); }} min={0} max={100} step={1} suffix="%" presets={[20, 30, 40, 50, 60]} />
            </div>
          </div>
        </div>

        <div className="rounded-[1.25rem] border border-blue-950/10 bg-white/94 p-5 shadow-2xl shadow-blue-950/12 backdrop-blur dark:border-white/10 dark:bg-surface/92 sm:p-7">
          <div className="rounded-[1.1rem] border border-blue-950/10 bg-[linear-gradient(135deg,#f7fbff_0%,#eef8f3_100%)] p-5 dark:border-white/10 dark:bg-none dark:bg-white/[0.05]">
            <div className="flex flex-wrap items-start justify-between gap-5">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary dark:text-emerald-200">Recommended price</p>
                <div className="mt-3 font-heading text-5xl font-semibold leading-none text-slate-950 sm:text-6xl dark:text-white">{formatCurrency(result.recommendedPrice)}</div>
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">per student for {courseType.toLowerCase()}</p>
              </div>
              <span className="rounded-full bg-emerald-50 px-3 py-2 text-sm font-semibold text-emerald-700 dark:bg-emerald-400/10 dark:text-emerald-200">{result.status}</span>
            </div>
          </div>

          <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <Metric label="Revenue" value={formatCurrency(result.revenue)} />
            <Metric label="Profit" value={formatCurrency(result.profit)} />
            <Metric label="Margin" value={`${result.profitMargin.toFixed(1)}%`} />
            <Metric label="Break even" value={`${result.breakEvenStudents} students`} />
          </div>

          <div className="mt-6 rounded-[1.1rem] border border-emerald-200 bg-emerald-50 p-5 dark:border-emerald-300/30 dark:bg-emerald-400/10">
            <h3 className="font-heading text-2xl font-semibold text-slate-950 dark:text-white">
              {result.note}
            </h3>
            <p className="mt-2 text-sm leading-6 text-slate-700 dark:text-slate-200">
              Total cost is {formatCurrency(result.fixedCost)}. You need about {result.breakEvenStudents} paid students to recover the launch cost at this price.
            </p>
          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            <PriceTier label="Starter" value={formatCurrency(result.lowTier)} note="Lower entry price" />
            <PriceTier label="Recommended" value={formatCurrency(result.recommendedPrice)} note="Balanced margin" highlighted />
            <PriceTier label="Premium" value={formatCurrency(result.premiumTier)} note="With bonuses or live support" />
          </div>

          <div className="mt-6 grid gap-3">
            {[
              "Use the starter tier for early-bird campaigns or limited-time launch offers.",
              "Keep the recommended tier as your main public price.",
              "Use the premium tier when adding live doubt sessions, certificates, or personal feedback.",
            ].map((item) => (
              <div key={item} className="flex gap-3 rounded-xl bg-slate-50 px-4 py-3 text-sm text-slate-700 dark:bg-slate-950/40 dark:text-slate-200">
                <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-primary dark:text-emerald-300" aria-hidden="true" />
                <span>{item}</span>
              </div>
            ))}
          </div>

          <div className="mt-6 overflow-hidden rounded-[1.1rem] border border-blue-950/10 bg-white dark:border-white/10 dark:bg-white/[0.05]">
            <div className="flex flex-col gap-3 border-b border-blue-950/10 bg-slate-50 p-4 dark:border-white/10 dark:bg-slate-950/35 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <div className="inline-flex items-center gap-2 text-sm font-semibold text-slate-950 dark:text-white">
                  <Sparkles className="size-4 text-primary dark:text-emerald-300" aria-hidden="true" />
                  AI pricing strategy
                </div>
                <p className="mt-1 text-xs leading-5 text-slate-600 dark:text-slate-300">
                  Get package ideas, launch offer, risk warning, and WhatsApp promo copy from your numbers.
                </p>
              </div>
              <button type="button" onClick={generatePricingStrategy} disabled={isGeneratingStrategy} className="inline-flex min-h-10 cursor-pointer items-center justify-center gap-2 rounded-full bg-[image:var(--button-solid)] px-4 py-2 text-xs font-semibold !text-white shadow-md shadow-blue-950/10 transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:translate-y-0">
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
                <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300">Reading your margin, break-even point, and tier prices...</p>
              </div>
            ) : pricingStrategy ? (
              <div className="grid gap-4 p-4">
                <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4 dark:border-emerald-300/25 dark:bg-emerald-400/10">
                  <div className="font-semibold text-slate-950 dark:text-white">Strategy summary</div>
                  <p className="mt-2 text-sm leading-6 text-slate-700 dark:text-slate-200">{pricingStrategy.summary}</p>
                </div>
                <StrategyList title="Recommended moves" items={pricingStrategy.strategy} />
                <StrategyList title="Package ideas" items={pricingStrategy.tierIdeas} />
                <div className="grid gap-3 md:grid-cols-2">
                  <TextBlock title="Launch offer" text={pricingStrategy.launchOffer} />
                  <TextBlock title="Risk warning" text={pricingStrategy.riskWarning} />
                </div>
                <div className="rounded-xl border border-blue-950/10 bg-blue-50/70 p-4 dark:border-white/10 dark:bg-white/[0.04]">
                  <div className="font-semibold text-slate-950 dark:text-white">WhatsApp promo copy</div>
                  <p className="mt-2 whitespace-pre-line text-sm leading-6 text-slate-700 dark:text-slate-200">{pricingStrategy.whatsappPromo}</p>
                </div>
              </div>
            ) : (
              <div className="p-4 text-sm leading-6 text-slate-600 dark:text-slate-300">
                The calculator gives instant numbers. AI adds launch strategy only when you need it.
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

function NumberField({ label, value, onChange, min, max, step, prefix = "", suffix = "", presets }: { label: string; value: number; onChange: (value: number) => void; min: number; max: number; step: number; prefix?: string; suffix?: string; presets: readonly number[] }) {
  const percent = ((value - min) / (max - min)) * 100;
  return (
    <div className="rounded-[1.1rem] border border-blue-950/10 bg-white/82 p-4 shadow-sm shadow-blue-950/5 dark:border-white/10 dark:bg-white/[0.04]">
      <div className="flex items-center justify-between gap-3">
        <span className="text-sm font-semibold text-slate-800 dark:text-slate-100">{label}</span>
        <span className="rounded-full bg-emerald-50 px-3 py-1 text-sm font-semibold text-emerald-700 dark:bg-emerald-400/10 dark:text-emerald-200">{prefix}{value.toLocaleString("en-IN")}{suffix}</span>
      </div>
      <input type="range" min={min} max={max} step={step} value={value} onChange={(event) => onChange(clamp(Number(event.target.value), min, max))} className="mt-4 h-2 w-full cursor-pointer accent-[#22b573] dark:accent-[#58c98a]" style={{ background: `linear-gradient(90deg,#22b573 ${percent}%,#d8e4ef ${percent}%)` }} />
      <div className="mt-3 flex flex-wrap gap-2">
        {presets.map((preset) => (
          <button key={preset} type="button" onClick={() => onChange(clamp(preset, min, max))} className={`cursor-pointer rounded-full border px-3 py-2 text-sm font-semibold transition ${value === preset ? "border-emerald-500 bg-emerald-50 text-emerald-800 dark:border-emerald-300 dark:bg-emerald-300 dark:text-slate-950" : "border-blue-950/10 bg-white text-slate-700 hover:border-emerald-300 hover:text-emerald-700 dark:border-white/10 dark:bg-white/7 dark:text-slate-200"}`}>
            {prefix}{preset.toLocaleString("en-IN")}{suffix}
          </button>
        ))}
      </div>
    </div>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return <div className="min-w-0 rounded-[1.1rem] border border-blue-950/10 bg-white p-4 shadow-sm shadow-blue-950/5 dark:border-white/10 dark:bg-white/[0.05]"><div className="flex items-center justify-between gap-3"><div className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">{label}</div><IndianRupee className="size-4 shrink-0 text-primary dark:text-emerald-300" aria-hidden="true" /></div><div className="mt-3 min-w-0 break-words text-[1.12rem] font-semibold leading-snug text-slate-950 dark:text-white" title={value}>{value}</div></div>;
}

function PriceTier({ label, value, note, highlighted = false }: { label: string; value: string; note: string; highlighted?: boolean }) {
  return (
    <div className={`rounded-[1.1rem] border p-4 ${highlighted ? "border-emerald-300 bg-emerald-50 dark:border-emerald-300/35 dark:bg-emerald-400/10" : "border-blue-950/10 bg-white dark:border-white/10 dark:bg-white/[0.05]"}`}>
      <div className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">{label}</div>
      <div className="mt-2 font-heading text-2xl font-semibold text-slate-950 dark:text-white">{value}</div>
      <div className="mt-1 text-xs leading-5 text-slate-500 dark:text-slate-300">{note}</div>
    </div>
  );
}

function StrategyList({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="rounded-xl border border-blue-950/10 bg-slate-50 p-4 dark:border-white/10 dark:bg-slate-950/35">
      <div className="font-semibold text-slate-950 dark:text-white">{title}</div>
      <div className="mt-3 grid gap-2">
        {items.map((item) => (
          <div key={item} className="flex gap-3 rounded-lg bg-white px-3 py-2 text-sm leading-6 text-slate-700 dark:bg-white/[0.05] dark:text-slate-200">
            <CheckCircle2 className="mt-1 size-4 shrink-0 text-primary dark:text-emerald-300" aria-hidden="true" />
            <span>{item}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function TextBlock({ title, text }: { title: string; text: string }) {
  return (
    <div className="rounded-xl border border-blue-950/10 bg-white p-4 dark:border-white/10 dark:bg-white/[0.04]">
      <div className="font-semibold text-slate-950 dark:text-white">{title}</div>
      <p className="mt-2 text-sm leading-6 text-slate-700 dark:text-slate-200">{text}</p>
    </div>
  );
}

function ActionButton({ label, icon: Icon, onClick }: { label: string; icon: typeof Copy; onClick: () => void }) {
  return <button type="button" onClick={onClick} className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-blue-950/10 bg-white px-3 py-2 text-xs font-semibold text-slate-700 shadow-sm shadow-blue-950/5 transition hover:border-primary/35 hover:text-primary dark:border-white/10 dark:bg-white/[0.06] dark:text-slate-200 dark:hover:text-white"><Icon className="size-3.5" aria-hidden="true" />{label}</button>;
}
