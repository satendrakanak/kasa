"use client";

import { useMemo, useState } from "react";
import {
  BookOpenCheck,
  CalendarDays,
  CheckCircle2,
  Clock3,
  Copy,
  Download,
  Mail,
  Minus,
  Plus,
  Printer,
  RotateCcw,
  Share2,
  Trash2,
  TrendingUp,
} from "lucide-react";

type Subject = {
  id: number;
  name: string;
  difficulty: number;
  chapters: number;
};

type Session = {
  subject: string;
  label: string;
  minutes: number;
  start: string;
  end: string;
  period: string;
};

type StudySlotKey = "morning" | "afternoon" | "evening";

type StudySlotWindow = Record<StudySlotKey, { startHour: number; endHour: number }>;

type StudySlotEnabled = Record<StudySlotKey, boolean>;

const initialSubjects: Subject[] = [
  { id: 1, name: "Mathematics", difficulty: 5, chapters: 12 },
  { id: 2, name: "Science", difficulty: 4, chapters: 10 },
  { id: 3, name: "English", difficulty: 2, chapters: 7 },
  { id: 4, name: "Social Studies", difficulty: 3, chapters: 9 },
];

const studySlots = {
  morning: { label: "Morning", description: "Early focus sessions" },
  afternoon: { label: "Afternoon", description: "Daytime study block" },
  evening: { label: "Evening", description: "After-school study block" },
} satisfies Record<StudySlotKey, { label: string; description: string }>;

const allSlotsEnabled: StudySlotEnabled = {
  morning: true,
  afternoon: true,
  evening: true,
};

const defaultSlotWindows: StudySlotWindow = {
  morning: { startHour: 6, endHour: 9 },
  afternoon: { startHour: 14, endHour: 17 },
  evening: { startHour: 18, endHour: 22 },
};

const slotHourOptions = {
  morning: {
    start: [4, 5, 6, 7, 8, 9, 10, 11],
    end: [5, 6, 7, 8, 9, 10, 11, 12],
  },
  afternoon: {
    start: [12, 13, 14, 15, 16],
    end: [13, 14, 15, 16, 17, 18],
  },
  evening: {
    start: [17, 18, 19, 20, 21, 22, 23],
    end: [18, 19, 20, 21, 22, 23, 24],
  },
} satisfies Record<StudySlotKey, { start: number[]; end: number[] }>;

const clampNumber = (value: number) => (Number.isFinite(value) && value > 0 ? value : 0);

function formatTime(totalMinutes: number) {
  const normalized = ((Math.round(totalMinutes) % 1440) + 1440) % 1440;
  const hours = Math.floor(normalized / 60);
  const minutes = normalized % 60;
  const suffix = hours >= 12 ? "PM" : "AM";
  const displayHour = hours % 12 === 0 ? 12 : hours % 12;
  return `${displayHour}:${minutes.toString().padStart(2, "0")} ${suffix}`;
}

function getFocusLabel(index: number) {
  if (index % 5 === 4) return "Revision";
  if (index % 3 === 2) return "Practice";
  return "Study";
}

function closestHour(options: number[], value: number) {
  return options.reduce((closest, option) =>
    Math.abs(option - value) < Math.abs(closest - value) ? option : closest,
  );
}

function normalizeSlotWindow(slotKey: StudySlotKey, window: { startHour: number; endHour: number }) {
  const options = slotHourOptions[slotKey];
  let startHour = closestHour(options.start, Math.round(window.startHour));
  let endHour = closestHour(options.end, Math.round(window.endHour));
  if (endHour <= startHour) {
    endHour = options.end.find((hour) => hour > startHour) ?? options.end[options.end.length - 1];
  }
  if (endHour <= startHour) {
    startHour = options.start.find((hour) => hour < endHour) ?? options.start[0];
  }
  return { startHour, endHour };
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

export function StudyTimetableGenerator() {
  const [subjects, setSubjects] = useState<Subject[]>(initialSubjects);
  const [days, setDays] = useState(14);
  const [sessionMinutes, setSessionMinutes] = useState(50);
  const [breakMinutes, setBreakMinutes] = useState(10);
  const [enabledSlots, setEnabledSlots] = useState<StudySlotEnabled>(allSlotsEnabled);
  const [slotWindows, setSlotWindows] = useState<StudySlotWindow>(defaultSlotWindows);
  const [revisionPercent, setRevisionPercent] = useState(20);
  const [actionMessage, setActionMessage] = useState("Ready to save or share your plan.");

  const result = useMemo(() => {
    const safeDays = Math.min(Math.max(Math.round(clampNumber(days)), 1), 120);
    const safeSessionMinutes = Math.min(Math.max(Math.round(clampNumber(sessionMinutes)), 20), 180);
    const safeBreakMinutes = Math.min(Math.max(Math.round(breakMinutes), 0), 45);
    const safeRevisionPercent = Math.min(Math.max(Math.round(revisionPercent), 0), 50);
    const safeSlotWindows = {
      morning: normalizeSlotWindow("morning", slotWindows.morning),
      afternoon: normalizeSlotWindow("afternoon", slotWindows.afternoon),
      evening: normalizeSlotWindow("evening", slotWindows.evening),
    };
    const safeEnabledSlots = {
      morning: enabledSlots.morning,
      afternoon: enabledSlots.afternoon,
      evening: enabledSlots.evening,
    };
    const activeSlots = (Object.keys(studySlots) as StudySlotKey[])
      .map((slotKey) => ({
        key: slotKey,
        ...studySlots[slotKey],
        ...safeSlotWindows[slotKey],
        enabled: safeEnabledSlots[slotKey],
        minutes: Math.max(
          (safeSlotWindows[slotKey].endHour - safeSlotWindows[slotKey].startHour) * 60,
          0,
        ),
      }))
      .filter((slot) => slot.enabled && slot.minutes > 0);
    const fallbackSlot = {
      key: "evening" as const,
      ...studySlots.evening,
      ...safeSlotWindows.evening,
      enabled: true,
      minutes: Math.max((safeSlotWindows.evening.endHour - safeSlotWindows.evening.startHour) * 60, safeSessionMinutes),
    };
    const scheduleSlots = activeSlots.length > 0 ? activeSlots : [fallbackSlot];
    const dailyMinutes = scheduleSlots.reduce((sum, slot) => sum + slot.minutes, 0);
    const safeHours = dailyMinutes / 60;
    const totalStudyMinutes = dailyMinutes * safeDays;
    const revisionMinutes = Math.round((totalStudyMinutes * safeRevisionPercent) / 100);
    const learningMinutes = totalStudyMinutes - revisionMinutes;

    const weightedSubjects = subjects.map((subject) => {
      const difficulty = Math.min(Math.max(Math.round(clampNumber(subject.difficulty)), 1), 5);
      const chapters = Math.min(Math.max(Math.round(clampNumber(subject.chapters)), 1), 80);
      const weight = difficulty * 2 + chapters;
      return { ...subject, difficulty, chapters, weight };
    });
    const totalWeight = weightedSubjects.reduce((sum, subject) => sum + subject.weight, 0) || 1;
    const allocations = weightedSubjects.map((subject) => ({
      ...subject,
      minutes: Math.round((learningMinutes * subject.weight) / totalWeight),
    }));

    const queue = allocations.flatMap((subject) => {
      const count = Math.max(1, Math.round(subject.minutes / safeSessionMinutes));
      return Array.from({ length: count }, (_, index) => ({
        subject: subject.name,
        label: getFocusLabel(index),
        minutes: safeSessionMinutes,
      }));
    });

    const revisionQueue = allocations.flatMap((subject) => {
      const count = Math.max(1, Math.round((revisionMinutes * subject.weight) / totalWeight / safeSessionMinutes));
      return Array.from({ length: count }, () => ({
        subject: subject.name,
        label: "Revision",
        minutes: safeSessionMinutes,
      }));
    });

    const fullQueue = [...queue, ...revisionQueue];
    const timetable = Array.from({ length: safeDays }, (_, dayIndex) => {
      const daySessions: Session[] = [];
      const slotsForDay = scheduleSlots;

      slotsForDay.forEach((slot) => {
        let usedMinutes = 0;
        let clock = slot.startHour * 60;
        const windowMinutes = Math.max((slot.endHour - slot.startHour) * 60, safeSessionMinutes);
        const allocatedMinutes = slot.minutes;
        const availableMinutes = Math.min(Math.max(allocatedMinutes, 0), windowMinutes);

        while (usedMinutes + safeSessionMinutes <= availableMinutes && fullQueue.length > 0) {
          const next = fullQueue.shift();
          if (!next) break;
          const start = clock;
          const end = clock + next.minutes;
          daySessions.push({
            ...next,
            period: slot.label,
            start: formatTime(start),
            end: formatTime(end),
          });
          usedMinutes += next.minutes;
          clock = end + safeBreakMinutes;
        }
      });

      return {
        day: dayIndex + 1,
        sessions: daySessions,
        minutes: daySessions.reduce((sum, session) => sum + session.minutes, 0),
      };
    });

    const averageSessions = timetable.reduce((sum, day) => sum + day.sessions.length, 0) / safeDays;
    const hardestSubject = [...weightedSubjects].sort((a, b) => b.weight - a.weight)[0]?.name ?? "Subject";

    return {
      days: safeDays,
      hoursPerDay: safeHours,
      sessionMinutes: safeSessionMinutes,
      breakMinutes: safeBreakMinutes,
      revisionPercent: safeRevisionPercent,
      enabledSlots: safeEnabledSlots,
      slotWindows: safeSlotWindows,
      activeSlots: scheduleSlots,
      dailyMinutes,
      totalStudyMinutes,
      revisionMinutes,
      learningMinutes,
      allocations,
      timetable,
      averageSessions,
      hardestSubject,
      progress: Math.min((safeRevisionPercent / 50) * 100, 100),
    };
  }, [breakMinutes, days, enabledSlots, revisionPercent, sessionMinutes, slotWindows, subjects]);

  const updateSubject = (id: number, patch: Partial<Subject>) => {
    setSubjects((current) =>
      current.map((subject) => (subject.id === id ? { ...subject, ...patch } : subject)),
    );
  };

  const stepSubject = (id: number, key: "difficulty" | "chapters", delta: number) => {
    setSubjects((current) =>
      current.map((subject) => {
        if (subject.id !== id) return subject;
        const max = key === "difficulty" ? 5 : 80;
        const min = 1;
        return { ...subject, [key]: Math.min(Math.max(subject[key] + delta, min), max) };
      }),
    );
  };

  const addSubject = () => {
    const nextId = Math.max(...subjects.map((subject) => subject.id), 0) + 1;
    setSubjects((current) => [
      ...current,
      { id: nextId, name: `Subject ${nextId}`, difficulty: 3, chapters: 6 },
    ]);
  };

  const removeSubject = (id: number) => {
    setSubjects((current) =>
      current.length > 1 ? current.filter((subject) => subject.id !== id) : current,
    );
  };

  const resetGenerator = () => {
    setSubjects(initialSubjects);
    setDays(14);
    setSessionMinutes(50);
    setBreakMinutes(10);
    setEnabledSlots(allSlotsEnabled);
    setSlotWindows(defaultSlotWindows);
    setRevisionPercent(20);
    setActionMessage("Ready to save or share your plan.");
  };

  const applySlotPreset = (preset: StudySlotEnabled) => {
    setEnabledSlots(preset);
  };

  const toggleSlot = (slotKey: StudySlotKey) => {
    setEnabledSlots((current) => {
      const enabledCount = Object.values(current).filter(Boolean).length;
      if (current[slotKey] && enabledCount === 1) return current;
      return {
        ...current,
        [slotKey]: !current[slotKey],
      };
    });
  };

  const updateSlotWindow = (
    slotKey: StudySlotKey,
    field: "startHour" | "endHour",
    value: number,
  ) => {
    setSlotWindows((current) => {
      const nextWindow = normalizeSlotWindow(slotKey, {
        ...current[slotKey],
        [field]: value,
      });
      return {
        ...current,
        [slotKey]: nextWindow,
      };
    });
  };

  const planText = useMemo(() => {
    const lines = [
      "Study Timetable",
      "",
      `Plan length: ${result.days} days`,
      `Study time: ${result.hoursPerDay.toFixed(1)} hours per day`,
      `Session length: ${result.sessionMinutes} minutes`,
      `Break length: ${result.breakMinutes} minutes`,
      `Revision buffer: ${result.revisionPercent}%`,
      `Active study slots: ${result.activeSlots.map((slot) => slot.label).join(", ")}`,
      `Study windows: Morning ${formatTime(result.slotWindows.morning.startHour * 60)} to ${formatTime(result.slotWindows.morning.endHour * 60)}, Afternoon ${formatTime(result.slotWindows.afternoon.startHour * 60)} to ${formatTime(result.slotWindows.afternoon.endHour * 60)}, Evening ${formatTime(result.slotWindows.evening.startHour * 60)} to ${formatTime(result.slotWindows.evening.endHour * 60)}`,
      "",
      "Subject allocation",
      ...result.allocations.map(
        (subject) =>
          `- ${subject.name}: ${Math.round(subject.minutes / 60 * 10) / 10} hours, difficulty ${subject.difficulty}/5, ${subject.chapters} chapters`,
      ),
      "",
      "Day-wise plan",
      ...result.timetable.flatMap((day) => [
        `Day ${day.day}: ${Math.round(day.minutes / 60 * 10) / 10} study hours`,
        ...day.sessions.map(
          (session) =>
            `  - ${session.period}: ${session.start} to ${session.end}: ${session.subject} (${session.label})`,
        ),
      ]),
      "",
      "Generated with KASA Study Timetable Generator",
      "https://www.getkasa.in/tools/study-timetable-generator",
    ];

    return lines.join("\n");
  }, [result]);

  const copyPlan = async () => {
    try {
      await navigator.clipboard.writeText(planText);
      setActionMessage("Study timetable copied. You can paste it into notes, WhatsApp, or docs.");
    } catch {
      setActionMessage("Copy was blocked by the browser. Use download or print instead.");
    }
  };

  const downloadPlan = () => {
    const blob = new Blob([planText], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "kasa-study-timetable.txt";
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
    setActionMessage("Study timetable downloaded as a text file.");
  };

  const sharePlan = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "My Study Timetable",
          text: planText,
          url: "/tools/study-timetable-generator",
        });
        setActionMessage("Share sheet opened for your study timetable.");
      } catch {
        setActionMessage("Sharing was cancelled. You can copy or download the plan.");
      }
      return;
    }

    await copyPlan();
  };

  const emailPlan = () => {
    const subject = encodeURIComponent("My Study Timetable");
    const body = encodeURIComponent(planText);
    window.location.href = `mailto:?subject=${subject}&body=${body}`;
    setActionMessage("Email draft opened with your study timetable.");
  };

  const printPlan = () => {
    const subjectCards = result.allocations
      .map(
        (subject) => `
          <div class="summary-card">
            <div class="label">${escapeHtml(subject.name)}</div>
            <div class="value">${Math.round(subject.minutes / 60 * 10) / 10} hours</div>
            <div class="meta">Difficulty ${subject.difficulty}/5 · ${subject.chapters} chapters</div>
          </div>
        `,
      )
      .join("");

    const dayCards = result.timetable
      .map(
        (day) => `
          <section class="day-card">
            <div class="day-head">
              <div>
                <div class="label">Day ${day.day}</div>
                <h2>${Math.round(day.minutes / 60 * 10) / 10} study hours</h2>
              </div>
              <span>${day.sessions.length} sessions</span>
            </div>
            <div class="sessions">
              ${day.sessions
                .map(
                  (session) => `
                    <div class="session-row">
                      <strong>${escapeHtml(session.subject)}</strong>
                      <span>${escapeHtml(session.period)} · ${escapeHtml(session.label)} · ${session.start} to ${session.end}</span>
                    </div>
                  `,
                )
                .join("")}
            </div>
          </section>
        `,
      )
      .join("");

    const printHtml = `
      <!doctype html>
      <html>
        <head>
          <meta charset="utf-8" />
          <title>Study Timetable</title>
          <style>
            * { box-sizing: border-box; }
            body {
              margin: 0;
              padding: 32px;
              color: #071b3a;
              background: #ffffff;
              font-family: Arial, Helvetica, sans-serif;
            }
            .print-page { max-width: 920px; margin: 0 auto; }
            .eyebrow {
              color: #1647a3;
              font-size: 12px;
              font-weight: 700;
              letter-spacing: 0.16em;
              text-transform: uppercase;
            }
            h1 { margin: 8px 0 8px; font-size: 34px; line-height: 1.1; }
            h2 { margin: 4px 0 0; font-size: 20px; }
            p { margin: 0; color: #475569; line-height: 1.55; }
            .summary {
              display: grid;
              grid-template-columns: repeat(4, 1fr);
              gap: 10px;
              margin: 24px 0;
            }
            .summary-card, .day-card {
              border: 1px solid #d7e7f6;
              border-radius: 14px;
              padding: 14px;
              background: #f8fbff;
            }
            .label {
              color: #64748b;
              font-size: 11px;
              font-weight: 700;
              letter-spacing: 0.12em;
              text-transform: uppercase;
            }
            .value {
              margin-top: 6px;
              color: #071b3a;
              font-size: 22px;
              font-weight: 800;
            }
            .meta {
              margin-top: 4px;
              color: #64748b;
              font-size: 12px;
              line-height: 1.45;
            }
            .section-title {
              margin: 26px 0 12px;
              font-size: 18px;
              font-weight: 800;
            }
            .day-card {
              margin-bottom: 12px;
              break-inside: avoid;
              background: #ffffff;
            }
            .day-head {
              display: flex;
              justify-content: space-between;
              gap: 16px;
              align-items: flex-start;
              margin-bottom: 12px;
            }
            .day-head span {
              border-radius: 999px;
              background: #eef7ff;
              color: #1647a3;
              padding: 6px 10px;
              font-size: 12px;
              font-weight: 700;
              white-space: nowrap;
            }
            .sessions {
              display: grid;
              gap: 8px;
            }
            .session-row {
              display: flex;
              justify-content: space-between;
              gap: 14px;
              border-radius: 10px;
              background: #f1f5f9;
              padding: 10px 12px;
              font-size: 13px;
            }
            .session-row span { color: #475569; text-align: right; }
            .footer {
              margin-top: 24px;
              border-top: 1px solid #d7e7f6;
              padding-top: 14px;
              color: #64748b;
              font-size: 12px;
            }
            @media print {
              body { padding: 18px; }
              .summary { grid-template-columns: repeat(2, 1fr); }
              .day-card { page-break-inside: avoid; }
            }
          </style>
        </head>
        <body>
          <main class="print-page">
            <div class="eyebrow">KASA Study Timetable Generator</div>
            <h1>Study Timetable</h1>
            <p>${result.days} day plan · ${result.hoursPerDay.toFixed(1)} hours per day · ${result.sessionMinutes} minute sessions · ${result.breakMinutes} minute breaks</p>
            <p>Active study slots: ${result.activeSlots.map((slot) => slot.label).join(", ")}</p>
            <p>Study windows: Morning ${formatTime(result.slotWindows.morning.startHour * 60)} to ${formatTime(result.slotWindows.morning.endHour * 60)} · Afternoon ${formatTime(result.slotWindows.afternoon.startHour * 60)} to ${formatTime(result.slotWindows.afternoon.endHour * 60)} · Evening ${formatTime(result.slotWindows.evening.startHour * 60)} to ${formatTime(result.slotWindows.evening.endHour * 60)}</p>

            <div class="summary">
              <div class="summary-card">
                <div class="label">Plan length</div>
                <div class="value">${result.days} days</div>
              </div>
              <div class="summary-card">
                <div class="label">Study time</div>
                <div class="value">${Math.round(result.totalStudyMinutes / 60)}h</div>
              </div>
              <div class="summary-card">
                <div class="label">Subjects</div>
                <div class="value">${subjects.length}</div>
              </div>
              <div class="summary-card">
                <div class="label">Revision</div>
                <div class="value">${result.revisionPercent}%</div>
              </div>
            </div>

            <div class="section-title">Subject allocation</div>
            <div class="summary">${subjectCards}</div>

            <div class="section-title">Day-wise timetable</div>
            ${dayCards}

            <div class="footer">Generated with KASA Study Timetable Generator · https://www.getkasa.in/tools/study-timetable-generator</div>
          </main>
        </body>
      </html>
    `;

    const iframe = document.createElement("iframe");
    iframe.setAttribute("title", "Printable study timetable");
    iframe.style.position = "fixed";
    iframe.style.right = "0";
    iframe.style.bottom = "0";
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
    setActionMessage("Print dialog opened with only the study timetable.");
  };

  return (
    <section className="relative px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto grid w-full max-w-[108rem] gap-5 lg:grid-cols-[0.96fr_1.04fr]">
        <div className="relative overflow-hidden rounded-[1.25rem] border border-blue-950/10 bg-white/92 p-5 shadow-xl shadow-blue-950/8 backdrop-blur dark:border-white/10 dark:bg-surface/90 sm:p-7">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-primary dark:text-emerald-200">
                Timetable setup
              </p>
              <h2 className="mt-2 font-heading text-3xl font-semibold text-slate-950 dark:text-white">
                Add your study details
              </h2>
              <p className="mt-2 max-w-xl text-sm leading-6 text-slate-600 dark:text-slate-300">
                Add subjects, difficulty, chapters, and daily study time to generate a balanced plan.
              </p>
            </div>
            <button
              type="button"
              onClick={resetGenerator}
              className="inline-grid size-10 cursor-pointer place-items-center rounded-full border border-blue-950/10 bg-white/86 text-slate-700 shadow-sm transition hover:border-primary/35 hover:text-primary dark:border-white/10 dark:bg-white/7 dark:text-white dark:hover:bg-white/12"
              aria-label="Reset generator"
              title="Reset generator"
            >
              <RotateCcw className="size-4" aria-hidden="true" />
            </button>
          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            <SmallNumberField label="Days until exam" value={days} min={1} max={120} step={1} onChange={setDays} />
            <SmallNumberField label="Session length" value={sessionMinutes} min={20} max={180} step={5} onChange={setSessionMinutes} suffix="min" />
            <SmallNumberField label="Break length" value={breakMinutes} min={0} max={45} step={5} onChange={setBreakMinutes} suffix="min" />
            <div className="rounded-[1.1rem] border border-blue-950/10 bg-white/82 p-4 shadow-sm shadow-blue-950/5 dark:border-white/10 dark:bg-white/[0.04]">
              <div className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">
                Daily study time
              </div>
              <div className="mt-2 text-2xl font-semibold text-slate-950 dark:text-white">
                {result.hoursPerDay.toFixed(1)} hours
              </div>
              <p className="mt-1 text-xs leading-5 text-slate-500 dark:text-slate-400">
                Auto-calculated from selected time windows.
              </p>
            </div>
          </div>

          <div className="mt-5 grid gap-3">
            <div className="rounded-[1.1rem] border border-blue-950/10 bg-white/82 p-4 shadow-sm shadow-blue-950/5 dark:border-white/10 dark:bg-white/[0.04]">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <div className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">
                    Preferred study time
                  </div>
                  <p className="mt-1 text-xs leading-5 text-slate-500 dark:text-slate-400">
                    Choose when you can study. Daily hours update from selected slots.
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <SlotPresetButton
                    label="All day"
                    active={enabledSlots.morning && enabledSlots.afternoon && enabledSlots.evening}
                    onClick={() => applySlotPreset(allSlotsEnabled)}
                  />
                  {(Object.keys(studySlots) as StudySlotKey[]).map((slotKey) => (
                    <SlotPresetButton
                      key={slotKey}
                      label={studySlots[slotKey].label}
                      active={enabledSlots[slotKey]}
                      onClick={() => toggleSlot(slotKey)}
                    />
                  ))}
                </div>
              </div>
              <div className="mt-4 grid gap-3 md:grid-cols-3">
                {(Object.keys(studySlots) as StudySlotKey[]).map((slotKey) => {
                  const slot = studySlots[slotKey];
                  const startOptions = slotHourOptions[slotKey].start.filter(
                    (hour) => hour < result.slotWindows[slotKey].endHour,
                  );
                  const endOptions = slotHourOptions[slotKey].end.filter(
                    (hour) => hour > result.slotWindows[slotKey].startHour,
                  );
                  const isEnabled = result.enabledSlots[slotKey];
                  const slotHours =
                    (result.slotWindows[slotKey].endHour - result.slotWindows[slotKey].startHour);
                  return (
                    <div
                      key={slotKey}
                      className={[
                        "rounded-xl border p-3 transition",
                        isEnabled
                          ? "border-emerald-200 bg-white shadow-sm shadow-emerald-950/5 dark:border-emerald-300/25 dark:bg-slate-950/35"
                          : "border-blue-950/10 bg-slate-50/80 opacity-70 dark:border-white/10 dark:bg-white/[0.03]",
                      ].join(" ")}
                    >
                      <div className="grid gap-3">
                        <div className="flex min-w-0 items-start justify-between gap-2">
                          <div className="min-w-0">
                            <div className="text-sm font-semibold text-slate-950 dark:text-white">
                              {slot.label}
                            </div>
                            <div className="mt-2 inline-flex whitespace-nowrap rounded-full bg-slate-100 px-2.5 py-1 text-[0.7rem] font-semibold text-slate-600 dark:bg-slate-900/60 dark:text-slate-300">
                              {formatTime(result.slotWindows[slotKey].startHour * 60)} to{" "}
                              {formatTime(result.slotWindows[slotKey].endHour * 60)}
                            </div>
                          </div>
                          <button
                            type="button"
                            onClick={() => toggleSlot(slotKey)}
                            className={[
                              "shrink-0 cursor-pointer rounded-full px-2 py-1 text-[0.68rem] font-semibold leading-none transition",
                              isEnabled
                                ? "bg-emerald-50 text-emerald-700 hover:bg-emerald-100 dark:bg-emerald-400/10 dark:text-emerald-200"
                                : "bg-slate-100 text-slate-500 hover:bg-slate-200 dark:bg-white/8 dark:text-slate-300",
                            ].join(" ")}
                          >
                            {isEnabled ? "On" : "Off"}
                          </button>
                        </div>
                        <div className="rounded-lg bg-blue-50/70 px-2.5 py-2 text-xs font-semibold text-slate-700 dark:bg-white/[0.05] dark:text-slate-200">
                          {isEnabled ? `${slotHours} study hours selected` : "This time block is disabled"}
                        </div>
                      </div>
                      <div className="mt-3 grid gap-2">
                        <label className="block">
                          <span className="text-[0.65rem] font-semibold uppercase tracking-[0.12em] text-slate-500 dark:text-slate-400">
                            From
                          </span>
                          <select
                            value={result.slotWindows[slotKey].startHour}
                            onChange={(event) => updateSlotWindow(slotKey, "startHour", Number(event.target.value))}
                            className="mt-1 h-9 w-full cursor-pointer rounded-lg border border-blue-950/10 bg-white px-2 text-xs font-semibold text-slate-950 outline-none transition focus:border-primary/45 dark:border-white/10 dark:bg-slate-950/55 dark:text-white"
                          >
                            {startOptions.map((hour) => (
                              <option key={hour} value={hour}>
                                {formatTime(hour * 60)}
                              </option>
                            ))}
                          </select>
                        </label>
                        <label className="block">
                          <span className="text-[0.65rem] font-semibold uppercase tracking-[0.12em] text-slate-500 dark:text-slate-400">
                            To
                          </span>
                          <select
                            value={result.slotWindows[slotKey].endHour}
                            onChange={(event) => updateSlotWindow(slotKey, "endHour", Number(event.target.value))}
                            className="mt-1 h-9 w-full cursor-pointer rounded-lg border border-blue-950/10 bg-white px-2 text-xs font-semibold text-slate-950 outline-none transition focus:border-primary/45 dark:border-white/10 dark:bg-slate-950/55 dark:text-white"
                          >
                            {endOptions.map((hour) => (
                              <option key={hour} value={hour}>
                                {formatTime(hour * 60)}
                              </option>
                            ))}
                          </select>
                        </label>
                      </div>
                      <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">{slot.description}</p>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="rounded-[1.1rem] border border-blue-950/10 bg-white/82 p-4 shadow-sm shadow-blue-950/5 dark:border-white/10 dark:bg-white/[0.04]">
              <div className="mb-2 flex items-center justify-between gap-3">
                <label htmlFor="revision-percent" className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">
                  Revision time
                </label>
                <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700 dark:bg-emerald-400/10 dark:text-emerald-200">
                  {result.revisionPercent}%
                </span>
              </div>
              <input
                id="revision-percent"
                type="range"
                min="0"
                max="50"
                value={result.revisionPercent}
                onChange={(event) => setRevisionPercent(Number(event.target.value))}
                className="h-2 w-full cursor-pointer accent-[#22b573] dark:accent-[#58c98a]"
              />
            </div>
          </div>

          <div className="mt-6 grid gap-3">
            {subjects.map((subject) => (
              <div
                key={subject.id}
                className="rounded-[1.1rem] border border-blue-950/10 bg-white/82 p-4 shadow-sm shadow-blue-950/5 dark:border-white/10 dark:bg-white/[0.04]"
              >
                <div className="grid gap-3 lg:grid-cols-[1.2fr_0.75fr_0.75fr_auto] lg:items-end">
                  <label className="block">
                    <span className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">
                      Subject
                    </span>
                    <input
                      type="text"
                      value={subject.name}
                      onChange={(event) => updateSubject(subject.id, { name: event.target.value })}
                      className="mt-2 h-11 w-full rounded-xl border border-blue-950/10 bg-white px-3 text-sm font-semibold text-slate-950 outline-none transition focus:border-primary/45 dark:border-white/10 dark:bg-slate-950/55 dark:text-white"
                    />
                  </label>
                  <StepperField
                    label="Difficulty"
                    value={subject.difficulty}
                    min={1}
                    max={5}
                    onChange={(value) => updateSubject(subject.id, { difficulty: value })}
                    onDecrease={() => stepSubject(subject.id, "difficulty", -1)}
                    onIncrease={() => stepSubject(subject.id, "difficulty", 1)}
                  />
                  <StepperField
                    label="Chapters"
                    value={subject.chapters}
                    min={1}
                    max={80}
                    onChange={(value) => updateSubject(subject.id, { chapters: value })}
                    onDecrease={() => stepSubject(subject.id, "chapters", -1)}
                    onIncrease={() => stepSubject(subject.id, "chapters", 1)}
                  />
                  <button
                    type="button"
                    onClick={() => removeSubject(subject.id)}
                    className="inline-grid h-11 cursor-pointer place-items-center rounded-xl border border-blue-950/10 bg-white px-3 text-slate-500 transition hover:border-rose-200 hover:bg-rose-50 hover:text-rose-700 dark:border-white/10 dark:bg-white/[0.04] dark:text-slate-300 dark:hover:bg-rose-400/10 dark:hover:text-rose-200"
                    aria-label={`Remove ${subject.name}`}
                    title={`Remove ${subject.name}`}
                  >
                    <Trash2 className="size-4" aria-hidden="true" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-5 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={addSubject}
              className="inline-flex cursor-pointer items-center gap-2 rounded-full bg-[image:var(--button-solid)] px-4 py-2 text-sm font-semibold !text-white shadow-lg shadow-blue-950/12 transition hover:-translate-y-0.5"
            >
              <Plus className="size-4" aria-hidden="true" />
              Add subject
            </button>
            {[7, 14, 21, 30].map((preset) => (
              <button
                key={preset}
                type="button"
                onClick={() => setDays(preset)}
                className={[
                  "cursor-pointer rounded-full border px-3 py-2 text-sm font-semibold transition",
                  result.days === preset
                    ? "border-emerald-500 bg-emerald-50 text-emerald-800 shadow-sm shadow-emerald-950/8 dark:border-emerald-300 dark:bg-emerald-300 dark:text-slate-950"
                    : "border-blue-950/10 bg-white/86 text-slate-700 hover:border-emerald-300 hover:text-emerald-700 dark:border-white/10 dark:bg-white/7 dark:text-slate-200",
                ].join(" ")}
              >
                {preset} days
              </button>
            ))}
          </div>
        </div>

        <div className="rounded-[1.25rem] border border-blue-950/10 bg-white/94 p-5 shadow-2xl shadow-blue-950/12 backdrop-blur dark:border-white/10 dark:bg-surface/92 sm:p-7">
          <div className="flex flex-wrap items-start justify-between gap-5">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary dark:text-emerald-200">
                Generated plan
              </p>
              <div className="mt-3 font-heading text-6xl font-semibold leading-none text-slate-950 sm:text-7xl dark:text-white">
                {result.days}
              </div>
              <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">
                Day study timetable with {result.hoursPerDay.toFixed(1)} hours per day.
              </p>
            </div>
            <div className="flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-2 dark:bg-emerald-500/10">
              <CheckCircle2 className="size-5 text-emerald-700 dark:text-emerald-300" aria-hidden="true" />
              <span className="text-sm font-semibold text-emerald-700 dark:text-emerald-300">
                Balanced plan
              </span>
            </div>
          </div>

          <div className="mt-6 rounded-[1.1rem] border border-blue-950/10 bg-blue-50/70 p-4 dark:border-white/10 dark:bg-white/[0.05]">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <div className="text-sm font-semibold text-slate-950 dark:text-white">
                  Save, share, or print your timetable
                </div>
                <p className="mt-1 text-xs leading-5 text-slate-600 dark:text-slate-300">
                  Keep this plan for later, send it to yourself, or share it with a friend.
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                <ActionButton label="Copy" icon={Copy} onClick={copyPlan} />
                <ActionButton label="Share" icon={Share2} onClick={sharePlan} />
                <ActionButton label="Email" icon={Mail} onClick={emailPlan} />
                <ActionButton label="Print" icon={Printer} onClick={printPlan} />
                <ActionButton label="Download" icon={Download} onClick={downloadPlan} />
              </div>
            </div>
            <div className="mt-3 rounded-xl bg-white/80 px-3 py-2 text-xs font-semibold text-slate-600 dark:bg-slate-950/35 dark:text-slate-300">
              {actionMessage}
            </div>
          </div>

          <div className="mt-7">
            <div className="mb-2 flex items-center justify-between text-xs font-semibold uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">
              <span>Revision buffer</span>
              <span>{Math.round(result.revisionMinutes / 60)} hours</span>
            </div>
            <div className="relative h-4 w-full overflow-hidden rounded-full bg-slate-300/80 shadow-inner shadow-slate-400/35 dark:bg-white/14 dark:shadow-none">
              <div
                className="h-full rounded-full bg-[image:var(--button-solid)] transition-[width] duration-300"
                style={{ width: `${result.progress}%` }}
              />
            </div>
          </div>

          <div className="mt-7 rounded-[1.1rem] border border-blue-950/10 bg-emerald-50 p-5 dark:border-white/10 dark:bg-emerald-500/10">
            <h3 className="font-heading text-2xl font-semibold text-slate-950 dark:text-white">
              Start with {result.hardestSubject}
            </h3>
            <p className="mt-2 text-sm leading-6 text-slate-700 dark:text-slate-200">
              The generator gives more time to subjects with higher difficulty and more chapters,
              then adds revision sessions near the end of the schedule.
            </p>
          </div>

          <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <Metric label="Study time" value={`${Math.round(result.totalStudyMinutes / 60)}h`} icon={Clock3} tone="primary" />
            <Metric label="Subjects" value={subjects.length.toString()} icon={BookOpenCheck} tone="emerald" />
            <Metric label="Sessions" value={result.averageSessions.toFixed(1)} icon={CalendarDays} tone="amber" />
            <Metric label="Revision" value={`${result.revisionPercent}%`} icon={TrendingUp} tone="rose" />
          </div>

          <div className="mt-6 grid gap-3">
            {result.timetable.slice(0, 7).map((day) => (
              <div
                key={day.day}
                className="rounded-[1.1rem] border border-blue-950/10 bg-white p-4 shadow-sm shadow-blue-950/5 dark:border-white/10 dark:bg-white/[0.05]"
              >
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <div className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">
                      Day {day.day}
                    </div>
                    <div className="mt-1 font-heading text-xl font-semibold text-slate-950 dark:text-white">
                      {Math.round(day.minutes / 60 * 10) / 10} study hours
                    </div>
                  </div>
                  <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-primary dark:bg-primary/10 dark:text-emerald-200">
                    {day.sessions.length} sessions
                  </span>
                </div>
                <div className="mt-3 grid gap-2">
                  {day.sessions.map((session, index) => (
                    <div
                      key={`${day.day}-${session.subject}-${index}`}
                      className="flex flex-wrap items-center justify-between gap-2 rounded-xl bg-slate-50 px-3 py-2 text-sm dark:bg-slate-950/40"
                    >
                      <span className="font-semibold text-slate-950 dark:text-white">
                        {session.subject}
                      </span>
                      <span className="text-slate-600 dark:text-slate-300">
                        {session.period} · {session.label} · {session.start} to {session.end}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {result.timetable.length > 7 ? (
            <div className="mt-4 rounded-[1.1rem] border border-blue-950/10 bg-blue-50/70 p-4 text-sm font-semibold text-slate-700 dark:border-white/10 dark:bg-white/[0.05] dark:text-slate-300">
              Showing the first 7 days. Increase or reduce days to adjust the full timetable.
            </div>
          ) : null}
        </div>
      </div>
    </section>
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

function SlotPresetButton({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        "cursor-pointer rounded-full border px-3 py-1.5 text-xs font-semibold transition",
        active
          ? "border-emerald-500 bg-emerald-50 text-emerald-800 shadow-sm shadow-emerald-950/8 dark:border-emerald-300 dark:bg-emerald-300 dark:text-slate-950"
          : "border-blue-950/10 bg-white/86 text-slate-700 hover:border-emerald-300 hover:text-emerald-700 dark:border-white/10 dark:bg-white/7 dark:text-slate-200",
      ].join(" ")}
    >
      {label}
    </button>
  );
}

function SmallNumberField({
  label,
  value,
  min,
  max,
  step,
  suffix,
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  suffix?: string;
  onChange: (value: number) => void;
}) {
  const normalize = (nextValue: number) => Math.min(Math.max(nextValue, min), max);

  return (
    <div className="rounded-[1.1rem] border border-blue-950/10 bg-white/82 p-4 shadow-sm shadow-blue-950/5 dark:border-white/10 dark:bg-white/[0.04]">
      <div className="flex items-center justify-between gap-3">
        <span className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">
          {label}
        </span>
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
        onChange={(event) => onChange(normalize(Number(event.target.value)))}
        className="mt-4 h-2 w-full cursor-pointer accent-[#22b573] dark:accent-[#58c98a]"
      />
      <div className="mt-2 flex items-center gap-2">
        <input
          type="number"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(event) => onChange(normalize(Number(event.target.value)))}
          className="h-11 w-full rounded-xl border border-blue-950/10 bg-white px-3 text-lg font-semibold text-slate-950 outline-none transition focus:border-primary/45 dark:border-white/10 dark:bg-slate-950/55 dark:text-white"
        />
        {suffix ? (
          <span className="text-sm font-semibold text-slate-500 dark:text-slate-300">{suffix}</span>
        ) : null}
      </div>
    </div>
  );
}

function StepperField({
  label,
  value,
  min,
  max,
  onChange,
  onDecrease,
  onIncrease,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  onChange: (value: number) => void;
  onDecrease: () => void;
  onIncrease: () => void;
}) {
  const normalize = (nextValue: number) => Math.min(Math.max(nextValue, min), max);

  return (
    <label className="block">
      <span className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">
        {label}
      </span>
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(event) => onChange(normalize(Number(event.target.value)))}
        className="mt-2 h-2 w-full cursor-pointer accent-[#22b573] dark:accent-[#58c98a]"
      />
      <div className="mt-2 grid h-11 grid-cols-[2.35rem_1fr_2.35rem] overflow-hidden rounded-xl border border-blue-950/10 bg-white shadow-sm shadow-blue-950/5 dark:border-white/10 dark:bg-slate-950/55">
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
          onChange={(event) => onChange(normalize(Number(event.target.value)))}
          className="h-full w-full bg-transparent px-2 text-center text-sm font-semibold text-slate-950 outline-none dark:text-white"
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
    </label>
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
