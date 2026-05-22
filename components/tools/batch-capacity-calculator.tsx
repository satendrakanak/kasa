"use client";

import { useMemo, useState } from "react";
import { CheckCircle2, Copy, Download, RotateCcw, UsersRound } from "lucide-react";

const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(Number.isFinite(value) ? value : min, min), max);

type CurrencyCode = "INR" | "USD" | "EUR" | "GBP" | "AED" | "SGD" | "AUD" | "CAD";

const currencyOptions: { code: CurrencyCode; label: string; symbol: string }[] = [
  { code: "INR", label: "India INR", symbol: "₹" },
  { code: "USD", label: "US Dollar", symbol: "$" },
  { code: "EUR", label: "Euro", symbol: "€" },
  { code: "GBP", label: "British Pound", symbol: "£" },
  { code: "AED", label: "UAE Dirham", symbol: "د.إ" },
  { code: "SGD", label: "Singapore Dollar", symbol: "S$" },
  { code: "AUD", label: "Australian Dollar", symbol: "A$" },
  { code: "CAD", label: "Canadian Dollar", symbol: "C$" },
];

const formatCurrency = (value: number, currency: CurrencyCode) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(Math.round(value));

const batchModes = [
  { label: "Offline classroom", multiplier: 1 },
  { label: "Online live", multiplier: 2.2 },
  { label: "Hybrid batch", multiplier: 1.45 },
] as const;

export function BatchCapacityCalculator() {
  const [mode, setMode] = useState<(typeof batchModes)[number]["label"]>("Offline classroom");
  const [classrooms, setClassrooms] = useState(3);
  const [seatsPerRoom, setSeatsPerRoom] = useState(30);
  const [teachers, setTeachers] = useState(5);
  const [batchesPerDay, setBatchesPerDay] = useState(4);
  const [workingDays, setWorkingDays] = useState(6);
  const [currentStudents, setCurrentStudents] = useState(260);
  const [targetOccupancy, setTargetOccupancy] = useState(85);
  const [monthlyFee, setMonthlyFee] = useState(2500);
  const [currency, setCurrency] = useState<CurrencyCode>("INR");
  const [actionMessage, setActionMessage] = useState("Ready to copy or download your batch capacity report.");

  const currencySymbol = currencyOptions.find((item) => item.code === currency)?.symbol || currency;

  const result = useMemo(() => {
    const modeMultiplier = batchModes.find((item) => item.label === mode)?.multiplier ?? 1;
    const roomCount = clamp(classrooms, 1, 50);
    const seats = clamp(seatsPerRoom, 1, 1000);
    const teacherCount = clamp(teachers, 1, 500);
    const dailyBatches = clamp(batchesPerDay, 1, 20);
    const days = clamp(workingDays, 1, 7);
    const students = clamp(currentStudents, 0, 100000);
    const target = clamp(targetOccupancy, 1, 100);
    const fee = clamp(monthlyFee, 0, 1000000);

    const physicalCapacity = Math.floor(roomCount * seats * dailyBatches * modeMultiplier);
    const teacherCapacity = teacherCount * dailyBatches * Math.floor(seats * Math.min(modeMultiplier, 1.35));
    const monthlyCapacity = Math.max(1, Math.min(physicalCapacity, teacherCapacity));
    const targetStudents = Math.floor(monthlyCapacity * (target / 100));
    const availableSeats = Math.max(0, targetStudents - students);
    const overbooked = Math.max(0, students - targetStudents);
    const utilization = (students / monthlyCapacity) * 100;
    const weeklySessions = roomCount * dailyBatches * days;
    const revenueAtCurrent = students * fee;
    const revenueAtTarget = targetStudents * fee;
    const revenueGap = Math.max(0, revenueAtTarget - revenueAtCurrent);
    const teachersNeededForTarget = Math.max(1, Math.ceil(targetStudents / Math.max(1, dailyBatches * seats)));
    const extraTeachersNeeded = Math.max(0, teachersNeededForTarget - teacherCount);
    const status =
      overbooked > 0
        ? "Over target"
        : utilization >= target - 4
          ? "Almost full"
          : utilization >= 60
            ? "Healthy capacity"
            : "Room to fill";
    const advice =
      overbooked > 0
        ? "You are above the selected occupancy target. Add another batch, increase online seats, or open a waiting list."
        : availableSeats > 0
          ? `You can admit about ${availableSeats} more students before reaching the selected occupancy target.`
          : "Your selected capacity target is already reached.";

    return {
      roomCount,
      seats,
      teacherCount,
      dailyBatches,
      days,
      students,
      target,
      fee,
      monthlyCapacity,
      targetStudents,
      availableSeats,
      overbooked,
      utilization,
      weeklySessions,
      revenueAtCurrent,
      revenueAtTarget,
      revenueGap,
      teachersNeededForTarget,
      extraTeachersNeeded,
      status,
      advice,
    };
  }, [batchesPerDay, classrooms, currentStudents, mode, monthlyFee, seatsPerRoom, targetOccupancy, teachers, workingDays]);

  const reset = () => {
    setMode("Offline classroom");
    setClassrooms(3);
    setSeatsPerRoom(30);
    setTeachers(5);
    setBatchesPerDay(4);
    setWorkingDays(6);
    setCurrentStudents(260);
    setTargetOccupancy(85);
    setMonthlyFee(2500);
    setCurrency("INR");
    setActionMessage("Ready to copy or download your batch capacity report.");
  };

  const reportText = [
    "Batch Capacity Calculator Result",
    `Mode: ${mode}`,
    `Classrooms: ${result.roomCount}`,
    `Seats per room: ${result.seats}`,
    `Teachers: ${result.teacherCount}`,
    `Batches per day: ${result.dailyBatches}`,
    `Working days per week: ${result.days}`,
    `Current students: ${result.students}`,
    `Monthly capacity: ${result.monthlyCapacity}`,
    `Target students at ${result.target}% occupancy: ${result.targetStudents}`,
    `Available seats before target: ${result.availableSeats}`,
    `Students over target: ${result.overbooked}`,
    `Utilization: ${result.utilization.toFixed(1)}%`,
    `Current monthly revenue: ${formatCurrency(result.revenueAtCurrent, currency)}`,
    `Revenue at target: ${formatCurrency(result.revenueAtTarget, currency)}`,
    `Revenue room: ${formatCurrency(result.revenueGap, currency)}`,
    `Status: ${result.status}`,
    "",
    result.advice,
    "",
    "Generated with KASA Batch Capacity Calculator",
  ].join("\n");

  const copyReport = async () => {
    try {
      await navigator.clipboard.writeText(reportText);
      setActionMessage("Batch capacity report copied.");
    } catch {
      setActionMessage("Copy was blocked. Use download instead.");
    }
  };

  const downloadReport = () => {
    const blob = new Blob([reportText], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "kasa-batch-capacity-report.txt";
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
    setActionMessage("Batch capacity report downloaded.");
  };

  return (
    <section className="relative px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto grid w-full max-w-[108rem] gap-5 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="rounded-[1.25rem] border border-blue-950/10 bg-white/92 p-5 shadow-xl shadow-blue-950/8 backdrop-blur dark:border-white/10 dark:bg-surface/90 sm:p-7">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-primary dark:text-emerald-200">Batch capacity setup</p>
              <h2 className="mt-2 font-heading text-3xl font-semibold text-slate-950 dark:text-white">Plan student capacity</h2>
              <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">
                Estimate how many students your academy can handle from rooms, seats, teachers, batches, and occupancy target.
              </p>
            </div>
            <button type="button" onClick={reset} className="grid size-10 cursor-pointer place-items-center rounded-full border border-blue-950/10 bg-white text-slate-700 shadow-sm transition hover:border-primary/35 hover:text-primary dark:border-white/10 dark:bg-white/7 dark:text-white" aria-label="Reset calculator">
              <RotateCcw className="size-4" aria-hidden="true" />
            </button>
          </div>

          <div className="mt-6 grid gap-4">
            <ChoiceGrid label="Batch mode" value={mode} options={batchModes.map((item) => item.label)} onChange={setMode} />
            <div className="grid gap-4 sm:grid-cols-2">
              <NumberField label="Classrooms or live rooms" value={classrooms} onChange={setClassrooms} min={1} max={20} step={1} presets={[1, 2, 3, 5, 8]} />
              <NumberField label="Seats per room" value={seatsPerRoom} onChange={setSeatsPerRoom} min={5} max={200} step={5} presets={[20, 30, 40, 60, 100]} />
              <NumberField label="Teachers available" value={teachers} onChange={setTeachers} min={1} max={100} step={1} presets={[2, 3, 5, 8, 12]} />
              <NumberField label="Batches per day" value={batchesPerDay} onChange={setBatchesPerDay} min={1} max={12} step={1} presets={[2, 3, 4, 6, 8]} />
              <NumberField label="Working days per week" value={workingDays} onChange={setWorkingDays} min={1} max={7} step={1} presets={[3, 5, 6, 7]} />
              <NumberField label="Current students" value={currentStudents} onChange={setCurrentStudents} min={0} max={5000} step={10} presets={[100, 200, 300, 500, 1000]} />
              <NumberField label="Target occupancy" value={targetOccupancy} onChange={setTargetOccupancy} min={40} max={100} step={1} suffix="%" presets={[60, 75, 85, 90, 100]} />
              <NumberField label="Average monthly fee" value={monthlyFee} onChange={setMonthlyFee} min={0} max={100000} step={100} prefix={currencySymbol} presets={[500, 1000, 2500, 5000, 10000]} />
            </div>

            <div className="rounded-[1.1rem] border border-blue-950/10 bg-white/82 p-4 shadow-sm shadow-blue-950/5 dark:border-white/10 dark:bg-white/[0.04]">
              <div className="text-sm font-semibold text-slate-800 dark:text-slate-100">Currency</div>
              <div className="mt-3 grid gap-2 sm:grid-cols-2">
                {currencyOptions.map((item) => (
                  <button key={item.code} type="button" onClick={() => setCurrency(item.code)} className={`flex cursor-pointer items-center justify-between gap-3 rounded-xl border px-3 py-2 text-left text-sm font-semibold transition ${currency === item.code ? "border-emerald-500 bg-emerald-50 text-emerald-800 dark:border-emerald-300 dark:bg-emerald-300 dark:text-slate-950" : "border-blue-950/10 bg-white text-slate-700 hover:border-emerald-300 hover:text-emerald-700 dark:border-white/10 dark:bg-white/7 dark:text-slate-200"}`}>
                    <span>{item.label}</span>
                    <span>{item.symbol}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-[1.25rem] border border-blue-950/10 bg-white/94 p-5 shadow-2xl shadow-blue-950/12 backdrop-blur dark:border-white/10 dark:bg-surface/92 sm:p-7">
          <div className="rounded-[1.1rem] border border-blue-950/10 bg-[linear-gradient(135deg,#f7fbff_0%,#eef8f3_100%)] p-5 dark:border-white/10 dark:bg-none dark:bg-white/[0.05]">
            <div className="flex flex-wrap items-start justify-between gap-5">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary dark:text-emerald-200">Target capacity</p>
                <div className="mt-3 font-heading text-5xl font-semibold leading-none text-slate-950 sm:text-6xl dark:text-white">{result.targetStudents}</div>
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">students at {result.target}% occupancy</p>
              </div>
              <span className={`rounded-full px-3 py-2 text-sm font-semibold ${result.overbooked ? "bg-amber-50 text-amber-700 dark:bg-amber-400/10 dark:text-amber-200" : "bg-emerald-50 text-emerald-700 dark:bg-emerald-400/10 dark:text-emerald-200"}`}>{result.status}</span>
            </div>
          </div>

          <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <Metric label="Max capacity" value={`${result.monthlyCapacity}`} />
            <Metric label="Available seats" value={`${result.availableSeats}`} />
            <Metric label="Utilization" value={`${result.utilization.toFixed(1)}%`} />
            <Metric label="Weekly sessions" value={`${result.weeklySessions}`} />
          </div>

          <div className={`mt-6 rounded-[1.1rem] border p-5 ${result.overbooked ? "border-amber-200 bg-amber-50 dark:border-amber-300/30 dark:bg-amber-400/10" : "border-emerald-200 bg-emerald-50 dark:border-emerald-300/30 dark:bg-emerald-400/10"}`}>
            <h3 className="font-heading text-2xl font-semibold text-slate-950 dark:text-white">{result.overbooked ? "Capacity pressure is high." : "You have room to grow."}</h3>
            <p className="mt-2 text-sm leading-6 text-slate-700 dark:text-slate-200">{result.advice}</p>
          </div>

          <div className="mt-6 grid gap-3 md:grid-cols-3">
            <RevenueCard label="Current revenue" value={formatCurrency(result.revenueAtCurrent, currency)} note={`${result.students} current students`} />
            <RevenueCard label="Revenue at target" value={formatCurrency(result.revenueAtTarget, currency)} note={`${result.targetStudents} students at target`} />
            <RevenueCard label="Revenue room" value={formatCurrency(result.revenueGap, currency)} note="Potential before target occupancy" />
          </div>

          <div className="mt-6 rounded-[1.1rem] border border-blue-950/10 bg-white p-4 dark:border-white/10 dark:bg-white/[0.05]">
            <div className="text-sm font-semibold text-slate-950 dark:text-white">Capacity signals</div>
            <div className="mt-3 grid gap-2">
              {[
                `${mode} capacity is adjusted for the selected delivery mode.`,
                result.extraTeachersNeeded > 0
                  ? `Add about ${result.extraTeachersNeeded} more teacher${result.extraTeachersNeeded === 1 ? "" : "s"} to support the target comfortably.`
                  : "Teacher count looks sufficient for the selected target.",
                result.overbooked > 0
                  ? `You are ${result.overbooked} students above the selected occupancy target.`
                  : `${result.availableSeats} seats remain before reaching your selected target.`,
              ].map((item) => (
                <div key={item} className="flex gap-3 rounded-xl bg-slate-50 px-4 py-3 text-sm leading-6 text-slate-700 dark:bg-slate-950/40 dark:text-slate-200">
                  <CheckCircle2 className="mt-1 size-4 shrink-0 text-primary dark:text-emerald-300" aria-hidden="true" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 rounded-[1.1rem] border border-blue-950/10 bg-blue-50/70 p-4 dark:border-white/10 dark:bg-white/[0.05]">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-xs leading-5 text-slate-600 dark:text-slate-300">{actionMessage}</p>
              <div className="flex flex-wrap gap-2">
                <ActionButton label="Copy" icon={Copy} onClick={copyReport} />
                <ActionButton label="Download" icon={Download} onClick={downloadReport} />
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
  const percent = ((value - min) / Math.max(1, max - min)) * 100;
  return (
    <div className="rounded-[1.1rem] border border-blue-950/10 bg-white/82 p-4 shadow-sm shadow-blue-950/5 dark:border-white/10 dark:bg-white/[0.04]">
      <div className="flex items-center justify-between gap-3">
        <span className="text-sm font-semibold text-slate-800 dark:text-slate-100">{label}</span>
        <span className="rounded-full bg-emerald-50 px-3 py-1 text-sm font-semibold text-emerald-700 dark:bg-emerald-400/10 dark:text-emerald-200">{prefix}{value.toLocaleString("en-US")}{suffix}</span>
      </div>
      <input type="range" min={min} max={max} step={step} value={clamp(value, min, max)} onChange={(event) => onChange(clamp(Number(event.target.value), min, max))} className="mt-4 h-2 w-full cursor-pointer accent-[#22b573] dark:accent-[#58c98a]" style={{ background: `linear-gradient(90deg,#22b573 ${percent}%,#d8e4ef ${percent}%)` }} />
      <div className="mt-3 flex flex-wrap gap-2">
        {presets.map((preset) => (
          <button key={preset} type="button" onClick={() => onChange(clamp(preset, min, max))} className={`cursor-pointer rounded-full border px-3 py-2 text-sm font-semibold transition ${value === preset ? "border-emerald-500 bg-emerald-50 text-emerald-800 dark:border-emerald-300 dark:bg-emerald-300 dark:text-slate-950" : "border-blue-950/10 bg-white text-slate-700 hover:border-emerald-300 hover:text-emerald-700 dark:border-white/10 dark:bg-white/7 dark:text-slate-200"}`}>
            {prefix}{preset.toLocaleString("en-US")}{suffix}
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
        <UsersRound className="size-4 shrink-0 text-primary dark:text-emerald-300" aria-hidden="true" />
      </div>
      <div className="mt-3 min-w-0 break-words text-[1.12rem] font-semibold leading-snug text-slate-950 dark:text-white" title={value}>{value}</div>
    </div>
  );
}

function RevenueCard({ label, value, note }: { label: string; value: string; note: string }) {
  return (
    <div className="rounded-[1.1rem] border border-blue-950/10 bg-white p-4 dark:border-white/10 dark:bg-white/[0.05]">
      <div className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">{label}</div>
      <div className="mt-2 break-words font-heading text-2xl font-semibold text-slate-950 dark:text-white">{value}</div>
      <div className="mt-1 text-xs leading-5 text-slate-500 dark:text-slate-300">{note}</div>
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
