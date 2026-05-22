"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { BookOpenCheck, Copy, Download, Printer, RotateCcw, Sparkles } from "lucide-react";

const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(Number.isFinite(value) ? value : min, min), max);

const classes = ["Class 6", "Class 7", "Class 8", "Class 9", "Class 10", "Class 11", "Class 12"] as const;
const subjects = ["Mathematics", "Science", "English", "Social Science", "Computer Science", "General Knowledge"] as const;
const coveragePresets = ["Full syllabus", "Unit test syllabus", "Term exam syllabus", "Selected chapters"] as const;
const durations = [30, 40, 45, 60, 90] as const;
const teachingStyles = ["Interactive", "Activity based", "Discussion based", "Lecture + practice"] as const;
const classLevels = ["Mixed level", "Beginner", "Average", "Advanced"] as const;
const storageKey = "kasa-ai-lesson-plan-generator:last";

type LessonStep = {
  title: string;
  time: string;
  activity: string;
  teacherAction: string;
  studentAction: string;
};

type LessonPlan = {
  title: string;
  overview: string;
  objectives: string[];
  materials: string[];
  warmUp: string;
  steps: LessonStep[];
  assessment: string[];
  homework: string;
  differentiation: string[];
  closure: string;
};

type SavedLessonPlan = {
  selectedClass: (typeof classes)[number];
  subject: (typeof subjects)[number];
  topic: string;
  duration: number;
  teachingStyle: (typeof teachingStyles)[number];
  classLevel: (typeof classLevels)[number];
  includeHomework: boolean;
  includeAssessment: boolean;
  signature: string;
  plan: LessonPlan;
};

export function AiLessonPlanGenerator() {
  const resultPanelRef = useRef<HTMLDivElement>(null);
  const [selectedClass, setSelectedClass] = useState<(typeof classes)[number]>("Class 10");
  const [subject, setSubject] = useState<(typeof subjects)[number]>("Science");
  const [topic, setTopic] = useState("Full syllabus");
  const [duration, setDuration] = useState(45);
  const [teachingStyle, setTeachingStyle] = useState<(typeof teachingStyles)[number]>("Interactive");
  const [classLevel, setClassLevel] = useState<(typeof classLevels)[number]>("Mixed level");
  const [includeHomework, setIncludeHomework] = useState(true);
  const [includeAssessment, setIncludeAssessment] = useState(true);
  const [generated, setGenerated] = useState<{ signature: string; plan: LessonPlan } | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationProgress, setGenerationProgress] = useState(0);
  const [actionMessage, setActionMessage] = useState("Choose lesson details, then generate a fresh AI lesson plan.");
  const [savedPlanAvailable, setSavedPlanAvailable] = useState(false);

  const currentSignature = useMemo(
    () =>
      JSON.stringify({
        selectedClass,
        subject,
        topic,
        duration,
        teachingStyle,
        classLevel,
        includeHomework,
        includeAssessment,
      }),
    [classLevel, duration, includeAssessment, includeHomework, selectedClass, subject, teachingStyle, topic],
  );

  const plan = generated?.signature === currentSignature ? generated.plan : null;

  const restoreSavedPlan = () => {
    try {
      const raw = window.localStorage.getItem(storageKey);
      if (!raw) return false;
      const saved = JSON.parse(raw) as Partial<SavedLessonPlan>;
      if (!saved.plan || !Array.isArray(saved.plan.steps) || !saved.signature) return false;
      setSelectedClass(saved.selectedClass || "Class 10");
      setSubject(saved.subject || "Science");
      setTopic(saved.topic || "Full syllabus");
      setDuration(clamp(Number(saved.duration), 20, 120));
      setTeachingStyle(saved.teachingStyle || "Interactive");
      setClassLevel(saved.classLevel || "Mixed level");
      setIncludeHomework(Boolean(saved.includeHomework));
      setIncludeAssessment(Boolean(saved.includeAssessment));
      setGenerated({ signature: saved.signature, plan: saved.plan });
      setSavedPlanAvailable(true);
      setActionMessage("Last generated AI lesson plan restored.");
      return true;
    } catch {
      return false;
    }
  };

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      const restored = restoreSavedPlan();
      if (!restored) setSavedPlanAvailable(Boolean(window.localStorage.getItem(storageKey)));
    }, 0);
    return () => window.clearTimeout(timeoutId);
  }, []);

  useEffect(() => {
    if (!isGenerating) return;
    const intervalId = window.setInterval(() => {
      setGenerationProgress((progress) => {
        if (progress < 35) return Math.min(progress + 7, 35);
        if (progress < 72) return Math.min(progress + 5, 72);
        return Math.min(progress + 2, 93);
      });
    }, 410);
    return () => window.clearInterval(intervalId);
  }, [isGenerating]);

  const planText = plan
    ? [
        `${plan.title}`,
        `${selectedClass} | ${subject} | ${topic}`,
        `Duration: ${duration} minutes | Style: ${teachingStyle} | Level: ${classLevel}`,
        "",
        `Overview: ${plan.overview}`,
        "",
        "Learning Objectives:",
        ...plan.objectives.map((item) => `- ${item}`),
        "",
        "Materials:",
        ...plan.materials.map((item) => `- ${item}`),
        "",
        `Warm-up: ${plan.warmUp}`,
        "",
        "Lesson Flow:",
        ...plan.steps.flatMap((step, index) => [
          `${index + 1}. ${step.title} (${step.time})`,
          `   Activity: ${step.activity}`,
          `   Teacher: ${step.teacherAction}`,
          `   Students: ${step.studentAction}`,
        ]),
        "",
        "Assessment:",
        ...plan.assessment.map((item) => `- ${item}`),
        "",
        `Homework: ${plan.homework}`,
        "",
        "Differentiation:",
        ...plan.differentiation.map((item) => `- ${item}`),
        "",
        `Closure: ${plan.closure}`,
        "",
        "Generated with KASA AI Lesson Plan Generator",
      ].join("\n")
    : "";

  const updateSubject = (nextSubject: (typeof subjects)[number]) => {
    setSubject(nextSubject);
    setTopic("Full syllabus");
    setGenerated(null);
    setActionMessage("Subject updated. Generate a fresh AI lesson plan for the selected syllabus.");
  };

  const reset = () => {
    setSelectedClass("Class 10");
    setSubject("Science");
    setTopic("Full syllabus");
    setDuration(45);
    setTeachingStyle("Interactive");
    setClassLevel("Mixed level");
    setIncludeHomework(true);
    setIncludeAssessment(true);
    setGenerated(null);
    setGenerationProgress(0);
    setActionMessage("Choose lesson details, then generate a fresh AI lesson plan.");
  };

  const generateLessonPlan = async () => {
    setGenerationProgress(8);
    setIsGenerating(true);
    setActionMessage("Generating a fresh AI lesson plan. This can take a few seconds...");
    try {
      const response = await fetch("/api/tools/lesson-plan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          selectedClass,
          subject,
          topic,
          duration,
          teachingStyle,
          classLevel,
          includeHomework,
          includeAssessment,
        }),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(typeof data?.error === "string" ? data.error : "AI lesson plan generation failed.");
      }
      if (!data.plan || !Array.isArray(data.plan.steps)) {
        throw new Error("AI did not return a usable lesson plan.");
      }
      const nextGenerated = { signature: currentSignature, plan: data.plan as LessonPlan };
      setGenerationProgress(96);
      setGenerated(nextGenerated);
      window.localStorage.setItem(
        storageKey,
        JSON.stringify({
          selectedClass,
          subject,
          topic,
          duration,
          teachingStyle,
          classLevel,
          includeHomework,
          includeAssessment,
          signature: currentSignature,
          plan: data.plan,
        } satisfies SavedLessonPlan),
      );
      setSavedPlanAvailable(true);
      setActionMessage(
        typeof data.remaining === "number"
          ? `Lesson plan generated successfully. ${data.remaining} free generations left today.`
          : "Lesson plan generated successfully.",
      );
      window.setTimeout(() => {
        resultPanelRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 450);
    } catch (error) {
      setActionMessage(error instanceof Error ? error.message : "AI lesson plan generation failed. Please try again.");
    } finally {
      setGenerationProgress(100);
      window.setTimeout(() => setIsGenerating(false), 350);
    }
  };

  const copyPlan = async () => {
    if (!plan) {
      setActionMessage("Generate the AI lesson plan first, then copy it.");
      return;
    }
    try {
      await navigator.clipboard.writeText(planText);
      setActionMessage("Lesson plan copied.");
    } catch {
      setActionMessage("Copy was blocked. Use download or print instead.");
    }
  };

  const downloadPlan = () => {
    if (!plan) {
      setActionMessage("Generate the AI lesson plan first, then download it.");
      return;
    }
    const blob = new Blob([planText], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "kasa-ai-lesson-plan.txt";
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
    setActionMessage("Lesson plan downloaded.");
  };

  const printPlan = () => {
    if (!plan) {
      setActionMessage("Generate the AI lesson plan first, then print it.");
      return;
    }
    const printHtml = `
      <!doctype html>
      <html>
        <head>
          <meta charset="utf-8" />
          <title>${plan.title}</title>
          <style>
            body { margin: 0; padding: 32px; color: #071b3a; font-family: Arial, Helvetica, sans-serif; }
            main { max-width: 860px; margin: 0 auto; }
            h1 { margin: 0 0 8px; text-align: center; font-size: 28px; }
            .meta { text-align: center; color: #475569; margin-bottom: 24px; line-height: 1.6; }
            section { break-inside: avoid; border: 1px solid #d7e7f6; border-radius: 14px; padding: 16px; margin: 14px 0; }
            h2 { margin: 0 0 10px; font-size: 17px; }
            li, p { line-height: 1.55; color: #334155; }
            .step { padding: 10px 0; border-top: 1px solid #e2ecf6; }
            .step:first-child { border-top: 0; }
            .footer { margin-top: 28px; border-top: 1px solid #d7e7f6; padding-top: 12px; color: #64748b; font-size: 12px; }
          </style>
        </head>
        <body>
          <main>
            <h1>${plan.title}</h1>
            <div class="meta">${selectedClass} | ${subject} | ${topic}<br />${duration} minutes | ${teachingStyle} | ${classLevel}</div>
            <section><h2>Overview</h2><p>${plan.overview}</p></section>
            <section><h2>Objectives</h2><ul>${plan.objectives.map((item) => `<li>${item}</li>`).join("")}</ul></section>
            <section><h2>Materials</h2><ul>${plan.materials.map((item) => `<li>${item}</li>`).join("")}</ul></section>
            <section><h2>Warm-up</h2><p>${plan.warmUp}</p></section>
            <section><h2>Lesson Flow</h2>${plan.steps
              .map(
                (step) => `<div class="step"><strong>${step.title} (${step.time})</strong><p>${step.activity}</p><p><strong>Teacher:</strong> ${step.teacherAction}</p><p><strong>Students:</strong> ${step.studentAction}</p></div>`,
              )
              .join("")}</section>
            <section><h2>Assessment</h2><ul>${plan.assessment.map((item) => `<li>${item}</li>`).join("")}</ul></section>
            <section><h2>Homework</h2><p>${plan.homework}</p></section>
            <section><h2>Differentiation</h2><ul>${plan.differentiation.map((item) => `<li>${item}</li>`).join("")}</ul></section>
            <section><h2>Closure</h2><p>${plan.closure}</p></section>
            <div class="footer">Generated with KASA AI Lesson Plan Generator</div>
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
    setActionMessage("Print dialog opened with only the AI lesson plan.");
  };

  return (
    <section className="relative px-4 py-8 sm:px-6 lg:px-8">
      {isGenerating ? <GenerationOverlay progress={generationProgress} /> : null}
      <div className="mx-auto grid w-full max-w-[108rem] gap-5 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="rounded-[1.25rem] border border-blue-950/10 bg-white/92 p-5 shadow-xl shadow-blue-950/8 backdrop-blur dark:border-white/10 dark:bg-surface/90 sm:p-7">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <p className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.16em] text-primary dark:text-emerald-200">
                <Sparkles className="size-4 animate-pulse" aria-hidden="true" />
                AI lesson setup
              </p>
              <h2 className="mt-2 font-heading text-3xl font-semibold text-slate-950 dark:text-white">
                Create an AI lesson plan
              </h2>
              <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">
                Build a structured lesson with objectives, activities, assessment, homework, and closure.
              </p>
            </div>
            <button
              type="button"
              onClick={reset}
              className="grid size-10 cursor-pointer place-items-center rounded-full border border-blue-950/10 bg-white text-slate-700 shadow-sm transition hover:border-primary/35 hover:text-primary dark:border-white/10 dark:bg-white/7 dark:text-white"
              aria-label="Reset generator"
              title="Reset generator"
            >
              <RotateCcw className="size-4" aria-hidden="true" />
            </button>
          </div>

          <div className="mt-6 grid gap-4">
            <ChoiceGrid label="Class" value={selectedClass} options={classes} onChange={setSelectedClass} />
            <ChoiceGrid label="Subject" value={subject} options={subjects} onChange={updateSubject} />
            <label className="rounded-[1.1rem] border border-blue-950/10 bg-white/82 p-4 shadow-sm shadow-blue-950/5 dark:border-white/10 dark:bg-white/[0.04]">
              <span className="text-sm font-semibold text-slate-800 dark:text-slate-100">Topic / syllabus coverage</span>
              <span className="mt-1 block text-xs leading-5 text-slate-500 dark:text-slate-400">
                Use full syllabus for revision, or add the exact chapter/unit for a focused lesson.
              </span>
              <input
                value={topic}
                onChange={(event) => {
                  setTopic(event.target.value);
                  setGenerated(null);
                }}
                className="mt-3 h-12 w-full rounded-xl border border-blue-950/10 bg-white px-3 text-base font-semibold text-slate-950 outline-none transition focus:border-primary/45 dark:border-white/10 dark:bg-slate-950/55 dark:text-white"
              />
              <div className="mt-3 flex flex-wrap gap-2">
                {coveragePresets.map((preset) => (
                  <button
                    key={preset}
                    type="button"
                    onClick={() => {
                      setTopic(preset);
                      setGenerated(null);
                    }}
                    className={`cursor-pointer rounded-full border px-3 py-2 text-xs font-semibold transition ${topic === preset ? "border-emerald-500 bg-emerald-50 text-emerald-800 dark:border-emerald-300 dark:bg-emerald-300 dark:text-slate-950" : "border-blue-950/10 bg-white text-slate-700 hover:border-emerald-300 hover:text-emerald-700 dark:border-white/10 dark:bg-white/7 dark:text-slate-200"}`}
                  >
                    {preset}
                  </button>
                ))}
              </div>
            </label>
            <div className="grid gap-4 sm:grid-cols-2">
              <RangeField label="Duration" value={duration} setValue={setDuration} min={20} max={120} step={5} suffix="min" presets={durations} />
              <ChoiceGrid label="Class level" value={classLevel} options={classLevels} onChange={setClassLevel} />
            </div>
            <ChoiceGrid label="Teaching style" value={teachingStyle} options={teachingStyles} onChange={setTeachingStyle} />
            <div className="grid gap-3 sm:grid-cols-2">
              <ToggleCard label="Include homework" value={includeHomework} onChange={setIncludeHomework} />
              <ToggleCard label="Include assessment" value={includeAssessment} onChange={setIncludeAssessment} />
            </div>
            <button
              type="button"
              onClick={generateLessonPlan}
              disabled={isGenerating}
              className="inline-flex min-h-12 cursor-pointer items-center justify-center gap-2 rounded-full bg-[image:var(--button-solid)] px-5 py-3 text-sm font-semibold !text-white shadow-lg shadow-blue-950/12 transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:translate-y-0"
            >
              <Sparkles className="size-4" aria-hidden="true" />
              {isGenerating ? "Generating AI lesson plan..." : "Generate lesson plan with AI"}
            </button>
          </div>
        </div>

        <div ref={resultPanelRef} className="scroll-mt-28 rounded-[1.25rem] border border-blue-950/10 bg-white/94 p-5 shadow-2xl shadow-blue-950/12 backdrop-blur dark:border-white/10 dark:bg-surface/92 sm:p-7">
          <div className="flex flex-wrap items-start justify-between gap-5">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary dark:text-emerald-200">
                AI lesson plan
              </p>
              <div className="mt-3 font-heading text-6xl font-semibold leading-none text-slate-950 sm:text-7xl dark:text-white">
                {plan ? plan.steps.length : Math.ceil(duration / 10)}
              </div>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
                {plan ? "lesson flow steps" : "planned lesson segments"}
              </p>
            </div>
            <span className="rounded-full bg-emerald-50 px-3 py-2 text-sm font-semibold text-emerald-700 dark:bg-emerald-400/10 dark:text-emerald-200">
              {plan ? "AI generated" : "Ready"}
            </span>
          </div>

          <div className="mt-7 rounded-[1.1rem] border border-emerald-200 bg-emerald-50 p-5 dark:border-emerald-300/30 dark:bg-emerald-400/10">
            <h3 className="font-heading text-2xl font-semibold text-slate-950 dark:text-white">
              {plan ? "Lesson plan generated successfully." : "Ready to generate a real lesson plan."}
            </h3>
            <p className="mt-2 text-sm leading-6 text-slate-700 dark:text-slate-200">
              {plan
                ? `${plan.title} includes objectives, materials, lesson flow, assessment, homework, and differentiation.`
                : "No sample plan is shown before AI generation, so teachers only see a fresh plan created from their selected details."}
            </p>
          </div>

          <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <Metric label="Class" value={selectedClass} />
            <Metric label="Subject" value={subject} />
            <Metric label="Duration" value={`${duration}m`} />
            <Metric label="Style" value={teachingStyle} />
          </div>

          <div className="mt-6 rounded-[1.1rem] border border-blue-950/10 bg-white p-4 dark:border-white/10 dark:bg-white/[0.05]">
            <div className="mb-3 text-sm font-semibold text-slate-950 dark:text-white">Lesson plan preview</div>
            {plan ? (
              <div className="max-h-[34rem] space-y-4 overflow-auto pr-1">
                <div className="rounded-xl bg-slate-50 p-4 text-center dark:bg-slate-950/40">
                  <div className="font-heading text-xl font-semibold text-slate-950 dark:text-white">{plan.title}</div>
                  <div className="mt-1 text-sm text-slate-600 dark:text-slate-300">
                    {selectedClass} | {subject} | {topic} | {duration} minutes
                  </div>
                </div>
                <PreviewBlock title="Overview" body={plan.overview} />
                <PreviewList title="Objectives" items={plan.objectives} />
                <PreviewList title="Materials" items={plan.materials} />
                <PreviewBlock title="Warm-up" body={plan.warmUp} />
                <div className="rounded-xl border border-blue-950/10 bg-slate-50 p-4 dark:border-white/10 dark:bg-slate-950/40">
                  <div className="font-semibold text-slate-950 dark:text-white">Lesson flow</div>
                  <div className="mt-3 grid gap-3">
                    {plan.steps.map((step, index) => (
                      <div key={`${step.title}-${index}`} className="rounded-lg bg-white p-3 text-sm dark:bg-white/[0.05]">
                        <div className="font-semibold text-slate-950 dark:text-white">
                          {index + 1}. {step.title} <span className="text-slate-500 dark:text-slate-300">({step.time})</span>
                        </div>
                        <p className="mt-2 leading-6 text-slate-700 dark:text-slate-200">{step.activity}</p>
                        <p className="mt-1 leading-6 text-slate-600 dark:text-slate-300"><strong>Teacher:</strong> {step.teacherAction}</p>
                        <p className="mt-1 leading-6 text-slate-600 dark:text-slate-300"><strong>Students:</strong> {step.studentAction}</p>
                      </div>
                    ))}
                  </div>
                </div>
                <PreviewList title="Assessment" items={plan.assessment} />
                <PreviewBlock title="Homework" body={plan.homework} />
                <PreviewList title="Differentiation" items={plan.differentiation} />
                <PreviewBlock title="Closure" body={plan.closure} />
              </div>
            ) : (
              <div className="grid min-h-[22rem] place-items-center rounded-xl border border-dashed border-blue-950/15 bg-slate-50 p-6 text-center dark:border-white/15 dark:bg-slate-950/35">
                <div className="max-w-md">
                  <div className="mx-auto grid size-12 place-items-center rounded-full bg-emerald-50 text-emerald-700 dark:bg-emerald-400/10 dark:text-emerald-200">
                    <Sparkles className="size-5" aria-hidden="true" />
                  </div>
                  <h3 className="mt-4 font-heading text-2xl font-semibold text-slate-950 dark:text-white">
                    Your AI-generated lesson plan will appear here.
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">
                    Click generate to create objectives, activities, assessment, homework, and a classroom-ready flow.
                  </p>
                </div>
              </div>
            )}
          </div>

          <div className="mt-6 rounded-[1.1rem] border border-blue-950/10 bg-blue-50/70 p-4 dark:border-white/10 dark:bg-white/[0.05]">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <div className="text-sm font-semibold text-slate-950 dark:text-white">Save or share this AI lesson plan</div>
                <p className="mt-1 text-xs leading-5 text-slate-600 dark:text-slate-300">{actionMessage}</p>
              </div>
              <div className="flex flex-wrap gap-2">
                {!plan && savedPlanAvailable ? <ActionButton label="Restore last" icon={Sparkles} onClick={restoreSavedPlan} /> : null}
                <ActionButton label="Copy" icon={Copy} onClick={copyPlan} disabled={!plan} />
                <ActionButton label="Print" icon={Printer} onClick={printPlan} disabled={!plan} />
                <ActionButton label="Download" icon={Download} onClick={downloadPlan} disabled={!plan} />
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
          <button
            key={option}
            type="button"
            onClick={() => onChange(option)}
            className={`cursor-pointer rounded-full border px-3 py-2 text-sm font-semibold transition ${value === option ? "border-emerald-500 bg-emerald-50 text-emerald-800 dark:border-emerald-300 dark:bg-emerald-300 dark:text-slate-950" : "border-blue-950/10 bg-white text-slate-700 hover:border-emerald-300 hover:text-emerald-700 dark:border-white/10 dark:bg-white/7 dark:text-slate-200"}`}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}

function RangeField({ label, value, setValue, min, max, step, suffix, presets }: { label: string; value: number; setValue: (value: number) => void; min: number; max: number; step: number; suffix: string; presets: readonly number[] }) {
  return (
    <div className="rounded-[1.1rem] border border-blue-950/10 bg-white/82 p-4 shadow-sm shadow-blue-950/5 dark:border-white/10 dark:bg-white/[0.04]">
      <div className="flex items-center justify-between gap-3">
        <span className="text-sm font-semibold text-slate-800 dark:text-slate-100">{label}</span>
        <span className="rounded-full bg-emerald-50 px-3 py-1 text-sm font-semibold text-emerald-700 dark:bg-emerald-400/10 dark:text-emerald-200">{value} {suffix}</span>
      </div>
      <input type="range" min={min} max={max} step={step} value={value} onChange={(event) => setValue(clamp(Number(event.target.value), min, max))} className="mt-4 h-2 w-full cursor-pointer accent-[#22b573] dark:accent-[#58c98a]" />
      <div className="mt-3 flex flex-wrap gap-2">
        {presets.map((preset) => (
          <button key={preset} type="button" onClick={() => setValue(clamp(preset, min, max))} className={`cursor-pointer rounded-full border px-3 py-2 text-sm font-semibold transition ${value === preset ? "border-emerald-500 bg-emerald-50 text-emerald-800 dark:border-emerald-300 dark:bg-emerald-300 dark:text-slate-950" : "border-blue-950/10 bg-white text-slate-700 hover:border-emerald-300 hover:text-emerald-700 dark:border-white/10 dark:bg-white/7 dark:text-slate-200"}`}>
            {preset}
          </button>
        ))}
      </div>
    </div>
  );
}

function ToggleCard({ label, value, onChange }: { label: string; value: boolean; onChange: (value: boolean) => void }) {
  return (
    <button type="button" onClick={() => onChange(!value)} className={`flex cursor-pointer items-center justify-between rounded-[1.1rem] border p-4 text-left transition ${value ? "border-emerald-300 bg-emerald-50 text-emerald-800 dark:border-emerald-300/50 dark:bg-emerald-400/10 dark:text-emerald-100" : "border-blue-950/10 bg-white text-slate-700 dark:border-white/10 dark:bg-white/[0.04] dark:text-slate-200"}`}>
      <span className="font-semibold">{label}</span>
      <span className="text-sm font-semibold">{value ? "Yes" : "No"}</span>
    </button>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="min-w-0 rounded-[1.1rem] border border-blue-950/10 bg-white p-4 shadow-sm shadow-blue-950/5 dark:border-white/10 dark:bg-white/[0.05]">
      <div className="flex items-center justify-between gap-3">
        <div className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">{label}</div>
        <BookOpenCheck className="size-4 shrink-0 text-primary dark:text-emerald-300" aria-hidden="true" />
      </div>
      <div className="mt-3 min-w-0 text-[1.28rem] font-semibold leading-snug text-slate-950 sm:text-[1.4rem] dark:text-white" title={value}>
        {value}
      </div>
    </div>
  );
}

function PreviewBlock({ title, body }: { title: string; body: string }) {
  return (
    <div className="rounded-xl border border-blue-950/10 bg-slate-50 p-4 dark:border-white/10 dark:bg-slate-950/40">
      <div className="font-semibold text-slate-950 dark:text-white">{title}</div>
      <p className="mt-2 text-sm leading-6 text-slate-700 dark:text-slate-200">{body}</p>
    </div>
  );
}

function PreviewList({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="rounded-xl border border-blue-950/10 bg-slate-50 p-4 dark:border-white/10 dark:bg-slate-950/40">
      <div className="font-semibold text-slate-950 dark:text-white">{title}</div>
      <ul className="mt-2 grid gap-2 text-sm leading-6 text-slate-700 dark:text-slate-200">
        {items.map((item) => <li key={item}>- {item}</li>)}
      </ul>
    </div>
  );
}

function GenerationOverlay({ progress }: { progress: number }) {
  const stage = progress < 35 ? "Reading lesson setup" : progress < 72 ? "Designing classroom activities" : progress < 94 ? "Adding assessment and homework" : "Preparing preview";
  return (
    <div className="fixed inset-0 z-[90] grid place-items-center bg-slate-950/58 px-4 backdrop-blur-sm">
      <div className="w-full max-w-lg rounded-[1.4rem] border border-white/18 bg-white p-6 shadow-2xl shadow-slate-950/30 dark:bg-slate-950 dark:text-white">
        <div className="flex items-center gap-4">
          <div className="relative grid size-14 place-items-center rounded-full bg-emerald-50 text-emerald-700 dark:bg-emerald-400/12 dark:text-emerald-200">
            <Sparkles className="size-6 animate-pulse" aria-hidden="true" />
            <span className="absolute inset-0 rounded-full border-2 border-emerald-300/70 border-t-transparent animate-spin" />
          </div>
          <div>
            <div className="font-heading text-2xl font-semibold text-slate-950 dark:text-white">Generating AI lesson plan</div>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">{stage}...</p>
          </div>
        </div>
        <div className="mt-6 flex items-center justify-between gap-3 text-xs font-semibold uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">
          <span>AI generation</span>
          <span>{Math.round(progress)}%</span>
        </div>
        <div className="mt-3 h-3 overflow-hidden rounded-full bg-slate-200 shadow-inner dark:bg-white/12">
          <div className="h-full rounded-full bg-[image:var(--button-solid)] transition-[width] duration-500" style={{ width: `${clamp(progress, 0, 100)}%` }} />
        </div>
        <p className="mt-4 text-sm leading-6 text-slate-600 dark:text-slate-300">
          Creating objectives, lesson flow, assessment, homework, and differentiation.
        </p>
      </div>
    </div>
  );
}

function ActionButton({ label, icon: Icon, onClick, disabled = false }: { label: string; icon: typeof Copy; onClick: () => void; disabled?: boolean }) {
  return (
    <button type="button" onClick={onClick} disabled={disabled} className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-blue-950/10 bg-white px-3 py-2 text-xs font-semibold text-slate-700 shadow-sm shadow-blue-950/5 transition hover:border-primary/35 hover:text-primary disabled:cursor-not-allowed disabled:opacity-45 dark:border-white/10 dark:bg-white/[0.06] dark:text-slate-200 dark:hover:text-white">
      <Icon className="size-3.5" aria-hidden="true" />
      {label}
    </button>
  );
}
