"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { CheckCircle2, ClipboardList, Copy, Download, Printer, RotateCcw, Sparkles } from "lucide-react";

const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(Number.isFinite(value) ? value : min, min), max);

const classes = ["Class 6", "Class 7", "Class 8", "Class 9", "Class 10", "Class 11", "Class 12"] as const;
const subjects = ["Mathematics", "Science", "English", "Social Science", "Computer Science", "General Knowledge"] as const;
const coveragePresets = ["Full syllabus", "Unit test syllabus", "Term exam syllabus", "Selected chapters"] as const;
const difficultyLevels = ["Easy", "Balanced", "Challenging"] as const;
const worksheetTypes = ["Practice worksheet", "Revision worksheet", "Homework worksheet", "Concept check"] as const;
const questionTypeOptions = ["Short answer", "Fill in the blank", "Multiple choice", "Word problems"] as const;
const storageKey = "kasa-ai-worksheet-generator:last";

type WorksheetQuestion = {
  number: number;
  type: string;
  question: string;
  marks: number;
  answer: string;
};

type WorksheetSection = {
  title: string;
  instructions: string;
  questions: WorksheetQuestion[];
};

type GeneratedWorksheet = {
  signature: string;
  sections: WorksheetSection[];
};

type SavedWorksheet = {
  selectedClass: (typeof classes)[number];
  subject: (typeof subjects)[number];
  coverage: string;
  questionCount: number;
  difficulty: (typeof difficultyLevels)[number];
  worksheetType: (typeof worksheetTypes)[number];
  includeAnswerKey: boolean;
  questionTypes: string[];
  worksheet: GeneratedWorksheet;
};

export function AiWorksheetGenerator() {
  const resultPanelRef = useRef<HTMLDivElement>(null);
  const [selectedClass, setSelectedClass] = useState<(typeof classes)[number]>("Class 10");
  const [subject, setSubject] = useState<(typeof subjects)[number]>("Science");
  const [coverage, setCoverage] = useState("Full syllabus");
  const [questionCount, setQuestionCount] = useState(15);
  const [difficulty, setDifficulty] = useState<(typeof difficultyLevels)[number]>("Balanced");
  const [worksheetType, setWorksheetType] = useState<(typeof worksheetTypes)[number]>("Practice worksheet");
  const [includeAnswerKey, setIncludeAnswerKey] = useState(true);
  const [questionTypes, setQuestionTypes] = useState<string[]>(["Short answer", "Fill in the blank"]);
  const [worksheet, setWorksheet] = useState<GeneratedWorksheet | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationProgress, setGenerationProgress] = useState(0);
  const [actionMessage, setActionMessage] = useState("Choose worksheet details, then generate a fresh AI worksheet.");
  const [savedWorksheetAvailable, setSavedWorksheetAvailable] = useState(false);

  const currentSignature = useMemo(
    () =>
      JSON.stringify({
        selectedClass,
        subject,
        coverage,
        questionCount,
        difficulty,
        worksheetType,
        includeAnswerKey,
        questionTypes,
      }),
    [coverage, difficulty, includeAnswerKey, questionCount, questionTypes, selectedClass, subject, worksheetType],
  );

  const result = useMemo(() => {
    const sections = worksheet?.signature === currentSignature ? worksheet.sections : [];
    return {
      sections,
      isAiGenerated: sections.length > 0,
      totalQuestions: sections.reduce((sum, section) => sum + section.questions.length, 0),
      totalMarks: sections.reduce((sum, section) => sum + section.questions.reduce((inner, question) => inner + question.marks, 0), 0),
    };
  }, [currentSignature, worksheet]);

  const restoreSavedWorksheet = () => {
    try {
      const raw = window.localStorage.getItem(storageKey);
      if (!raw) return false;
      const saved = JSON.parse(raw) as Partial<SavedWorksheet>;
      if (!saved.worksheet || !Array.isArray(saved.worksheet.sections)) return false;
      setSelectedClass(saved.selectedClass || "Class 10");
      setSubject(saved.subject || "Science");
      setCoverage(saved.coverage || "Full syllabus");
      setQuestionCount(clamp(Number(saved.questionCount), 5, 50));
      setDifficulty(saved.difficulty || "Balanced");
      setWorksheetType(saved.worksheetType || "Practice worksheet");
      setIncludeAnswerKey(Boolean(saved.includeAnswerKey));
      setQuestionTypes(Array.isArray(saved.questionTypes) && saved.questionTypes.length ? saved.questionTypes : ["Short answer"]);
      setWorksheet(saved.worksheet);
      setSavedWorksheetAvailable(true);
      setActionMessage("Last generated AI worksheet restored.");
      return true;
    } catch {
      return false;
    }
  };

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      const restored = restoreSavedWorksheet();
      if (!restored) setSavedWorksheetAvailable(Boolean(window.localStorage.getItem(storageKey)));
    }, 0);
    return () => window.clearTimeout(timeoutId);
  }, []);

  useEffect(() => {
    if (!isGenerating) return;
    const intervalId = window.setInterval(() => {
      setGenerationProgress((progress) => {
        if (progress < 35) return Math.min(progress + 8, 35);
        if (progress < 72) return Math.min(progress + 5, 72);
        return Math.min(progress + 2, 93);
      });
    }, 390);
    return () => window.clearInterval(intervalId);
  }, [isGenerating]);

  const worksheetText = [
    `${subject} AI Worksheet`,
    `${selectedClass} | ${coverage}`,
    `${worksheetType} | ${difficulty} | ${result.totalQuestions} questions | ${result.totalMarks} marks`,
    "",
    ...result.sections.flatMap((section) => [
      section.title,
      section.instructions,
      ...section.questions.map((question) => `${question.number}. [${question.type}] ${question.question} (${question.marks} marks)`),
      "",
    ]),
    includeAnswerKey ? "Answer Key:" : "",
    ...(includeAnswerKey
      ? result.sections.flatMap((section) => [
          section.title,
          ...section.questions.map((question) => `${question.number}. ${question.answer}`),
          "",
        ])
      : []),
    "Generated with KASA AI Worksheet Generator",
  ].filter(Boolean).join("\n");

  const updateSubject = (nextSubject: (typeof subjects)[number]) => {
    setSubject(nextSubject);
    setCoverage("Full syllabus");
    setWorksheet(null);
    setActionMessage("Subject updated. Generate a fresh AI worksheet for the selected syllabus.");
  };

  const toggleQuestionType = (type: string) => {
    setQuestionTypes((types) => {
      if (types.includes(type)) return types.length === 1 ? types : types.filter((item) => item !== type);
      return [...types, type];
    });
    setWorksheet(null);
  };

  const reset = () => {
    setSelectedClass("Class 10");
    setSubject("Science");
    setCoverage("Full syllabus");
    setQuestionCount(15);
    setDifficulty("Balanced");
    setWorksheetType("Practice worksheet");
    setIncludeAnswerKey(true);
    setQuestionTypes(["Short answer", "Fill in the blank"]);
    setWorksheet(null);
    setGenerationProgress(0);
    setActionMessage("Choose worksheet details, then generate a fresh AI worksheet.");
  };

  const generateWorksheet = async () => {
    setGenerationProgress(8);
    setIsGenerating(true);
    setActionMessage("Generating a fresh AI worksheet. This can take a few seconds...");
    try {
      const response = await fetch("/api/tools/worksheet", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          selectedClass,
          subject,
          coverage,
          questionCount,
          difficulty,
          worksheetType,
          includeAnswerKey,
          questionTypes,
        }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(typeof data?.error === "string" ? data.error : "AI worksheet generation failed.");
      if (!Array.isArray(data.sections)) throw new Error("AI did not return a usable worksheet.");
      const nextWorksheet = { signature: currentSignature, sections: data.sections };
      setGenerationProgress(96);
      setWorksheet(nextWorksheet);
      window.localStorage.setItem(
        storageKey,
        JSON.stringify({
          selectedClass,
          subject,
          coverage,
          questionCount,
          difficulty,
          worksheetType,
          includeAnswerKey,
          questionTypes,
          worksheet: nextWorksheet,
        } satisfies SavedWorksheet),
      );
      setSavedWorksheetAvailable(true);
      setActionMessage(
        typeof data.remaining === "number"
          ? `Worksheet generated successfully. ${data.remaining} free generations left today.`
          : "Worksheet generated successfully.",
      );
      window.setTimeout(() => resultPanelRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 450);
    } catch (error) {
      setActionMessage(error instanceof Error ? error.message : "AI worksheet generation failed. Please try again.");
    } finally {
      setGenerationProgress(100);
      window.setTimeout(() => setIsGenerating(false), 350);
    }
  };

  const copyWorksheet = async () => {
    if (!result.isAiGenerated) {
      setActionMessage("Generate the AI worksheet first, then copy it.");
      return;
    }
    try {
      await navigator.clipboard.writeText(worksheetText);
      setActionMessage("Worksheet copied.");
    } catch {
      setActionMessage("Copy was blocked. Use download or print instead.");
    }
  };

  const downloadWorksheet = () => {
    if (!result.isAiGenerated) {
      setActionMessage("Generate the AI worksheet first, then download it.");
      return;
    }
    const blob = new Blob([worksheetText], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "kasa-ai-worksheet.txt";
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
    setActionMessage("Worksheet downloaded.");
  };

  const printWorksheet = () => {
    if (!result.isAiGenerated) {
      setActionMessage("Generate the AI worksheet first, then print it.");
      return;
    }
    const printHtml = `
      <!doctype html>
      <html>
        <head>
          <meta charset="utf-8" />
          <title>${subject} AI Worksheet</title>
          <style>
            body { margin: 0; padding: 32px; color: #071b3a; font-family: Arial, Helvetica, sans-serif; }
            main { max-width: 840px; margin: 0 auto; }
            h1 { margin: 0 0 8px; text-align: center; font-size: 28px; }
            .meta { text-align: center; color: #475569; margin-bottom: 24px; line-height: 1.6; }
            section { break-inside: avoid; border: 1px solid #d7e7f6; border-radius: 14px; padding: 16px; margin: 14px 0; }
            h2 { margin: 0 0 6px; font-size: 18px; }
            .instructions { color: #64748b; margin-bottom: 12px; }
            .question { display: flex; gap: 10px; padding: 10px 0; border-top: 1px solid #e2ecf6; line-height: 1.5; }
            .marks { margin-left: auto; white-space: nowrap; font-weight: 700; color: #475569; }
            .answer { color: #475569; font-size: 13px; margin: 7px 0; }
            .footer { margin-top: 28px; border-top: 1px solid #d7e7f6; padding-top: 12px; color: #64748b; font-size: 12px; }
          </style>
        </head>
        <body>
          <main>
            <h1>${subject} AI Worksheet</h1>
            <div class="meta">${selectedClass} | ${coverage}<br />${worksheetType} | ${difficulty} | ${result.totalQuestions} questions | ${result.totalMarks} marks</div>
            ${result.sections.map((section) => `
              <section>
                <h2>${section.title}</h2>
                <div class="instructions">${section.instructions}</div>
                ${section.questions.map((question) => `<div class="question"><span>${question.number}.</span><span>${question.question}</span><span class="marks">${question.marks} marks</span></div>`).join("")}
              </section>
            `).join("")}
            ${includeAnswerKey ? `<section><h2>Answer Key</h2>${result.sections.flatMap((section) => section.questions.map((question) => `<div class="answer"><strong>${question.number}.</strong> ${question.answer}</div>`)).join("")}</section>` : ""}
            <div class="footer">Generated with KASA AI Worksheet Generator</div>
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
    setActionMessage("Print dialog opened with only the AI worksheet.");
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
                AI worksheet setup
              </p>
              <h2 className="mt-2 font-heading text-3xl font-semibold text-slate-950 dark:text-white">
                Create an AI worksheet
              </h2>
              <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">
                Generate printable practice sheets with sections, marks, and optional answer key.
              </p>
            </div>
            <button type="button" onClick={reset} className="grid size-10 cursor-pointer place-items-center rounded-full border border-blue-950/10 bg-white text-slate-700 shadow-sm transition hover:border-primary/35 hover:text-primary dark:border-white/10 dark:bg-white/7 dark:text-white" aria-label="Reset generator" title="Reset generator">
              <RotateCcw className="size-4" aria-hidden="true" />
            </button>
          </div>

          <div className="mt-6 grid gap-4">
            <ChoiceGrid label="Class" value={selectedClass} options={classes} onChange={setSelectedClass} />
            <ChoiceGrid label="Subject" value={subject} options={subjects} onChange={updateSubject} />
            <label className="rounded-[1.1rem] border border-blue-950/10 bg-white/82 p-4 shadow-sm shadow-blue-950/5 dark:border-white/10 dark:bg-white/[0.04]">
              <span className="text-sm font-semibold text-slate-800 dark:text-slate-100">Syllabus coverage</span>
              <span className="mt-1 block text-xs leading-5 text-slate-500 dark:text-slate-400">Use full syllabus for broad practice, or add exact chapters for a focused worksheet.</span>
              <input value={coverage} onChange={(event) => { setCoverage(event.target.value); setWorksheet(null); }} className="mt-3 h-12 w-full rounded-xl border border-blue-950/10 bg-white px-3 text-base font-semibold text-slate-950 outline-none transition focus:border-primary/45 dark:border-white/10 dark:bg-slate-950/55 dark:text-white" />
              <div className="mt-3 flex flex-wrap gap-2">
                {coveragePresets.map((preset) => (
                  <button key={preset} type="button" onClick={() => { setCoverage(preset); setWorksheet(null); }} className={`cursor-pointer rounded-full border px-3 py-2 text-xs font-semibold transition ${coverage === preset ? "border-emerald-500 bg-emerald-50 text-emerald-800 dark:border-emerald-300 dark:bg-emerald-300 dark:text-slate-950" : "border-blue-950/10 bg-white text-slate-700 hover:border-emerald-300 hover:text-emerald-700 dark:border-white/10 dark:bg-white/7 dark:text-slate-200"}`}>
                    {preset}
                  </button>
                ))}
              </div>
            </label>
            <div className="grid gap-4 sm:grid-cols-2">
              <RangeField label="Questions" value={questionCount} setValue={setQuestionCount} min={5} max={50} step={1} suffix="questions" presets={[10, 15, 20, 30, 40]} />
              <ChoiceGrid label="Worksheet type" value={worksheetType} options={worksheetTypes} onChange={setWorksheetType} />
            </div>
            <ChoiceGrid label="Difficulty" value={difficulty} options={difficultyLevels} onChange={setDifficulty} />
            <div className="rounded-[1.1rem] border border-blue-950/10 bg-white/82 p-4 shadow-sm shadow-blue-950/5 dark:border-white/10 dark:bg-white/[0.04]">
              <div className="text-sm font-semibold text-slate-800 dark:text-slate-100">Question types</div>
              <div className="mt-3 flex flex-wrap gap-2">
                {questionTypeOptions.map((type) => {
                  const selected = questionTypes.includes(type);
                  return (
                    <button key={type} type="button" onClick={() => toggleQuestionType(type)} className={`inline-flex cursor-pointer items-center gap-2 rounded-full border px-3 py-2 text-sm font-semibold transition ${selected ? "border-emerald-500 bg-emerald-50 text-emerald-800 dark:border-emerald-300 dark:bg-emerald-300 dark:text-slate-950" : "border-blue-950/10 bg-white text-slate-700 hover:border-emerald-300 hover:text-emerald-700 dark:border-white/10 dark:bg-white/7 dark:text-slate-200"}`}>
                      {selected ? <CheckCircle2 className="size-3.5" aria-hidden="true" /> : null}
                      {type}
                    </button>
                  );
                })}
              </div>
            </div>
            <ToggleCard label="Include answer key" value={includeAnswerKey} onChange={setIncludeAnswerKey} />
            <button type="button" onClick={generateWorksheet} disabled={isGenerating} className="inline-flex min-h-12 cursor-pointer items-center justify-center gap-2 rounded-full bg-[image:var(--button-solid)] px-5 py-3 text-sm font-semibold !text-white shadow-lg shadow-blue-950/12 transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:translate-y-0">
              <Sparkles className="size-4" aria-hidden="true" />
              {isGenerating ? "Generating AI worksheet..." : "Generate worksheet with AI"}
            </button>
          </div>
        </div>

        <div ref={resultPanelRef} className="scroll-mt-28 rounded-[1.25rem] border border-blue-950/10 bg-white/94 p-5 shadow-2xl shadow-blue-950/12 backdrop-blur dark:border-white/10 dark:bg-surface/92 sm:p-7">
          <div className="flex flex-wrap items-start justify-between gap-5">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary dark:text-emerald-200">AI worksheet</p>
              <div className="mt-3 font-heading text-6xl font-semibold leading-none text-slate-950 sm:text-7xl dark:text-white">{result.isAiGenerated ? result.totalQuestions : questionCount}</div>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{result.isAiGenerated ? `${result.totalMarks} total marks` : "target questions for your worksheet"}</p>
            </div>
            <span className="rounded-full bg-emerald-50 px-3 py-2 text-sm font-semibold text-emerald-700 dark:bg-emerald-400/10 dark:text-emerald-200">{result.isAiGenerated ? "AI generated" : "Ready"}</span>
          </div>

          <div className="mt-7 rounded-[1.1rem] border border-emerald-200 bg-emerald-50 p-5 dark:border-emerald-300/30 dark:bg-emerald-400/10">
            <h3 className="font-heading text-2xl font-semibold text-slate-950 dark:text-white">{result.isAiGenerated ? "Worksheet generated successfully." : "Ready to generate a real worksheet."}</h3>
            <p className="mt-2 text-sm leading-6 text-slate-700 dark:text-slate-200">
              {result.isAiGenerated ? `${subject} ${worksheetType.toLowerCase()} with ${result.sections.length} sections, ${result.totalQuestions} questions, and ${result.totalMarks} marks.` : "No sample worksheet is shown before AI generation, so teachers only see fresh questions created from their selected details."}
            </p>
          </div>

          <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <Metric label="Class" value={selectedClass} />
            <Metric label="Subject" value={subject} />
            <Metric label="Sections" value={`${result.sections.length}`} />
            <Metric label="Marks" value={`${result.totalMarks}`} />
          </div>

          <div className="mt-6 rounded-[1.1rem] border border-blue-950/10 bg-white p-4 dark:border-white/10 dark:bg-white/[0.05]">
            <div className="mb-3 text-sm font-semibold text-slate-950 dark:text-white">Worksheet preview</div>
            {result.isAiGenerated ? (
              <div className="max-h-[34rem] space-y-4 overflow-auto pr-1">
                <div className="rounded-xl bg-slate-50 p-4 text-center dark:bg-slate-950/40">
                  <div className="font-heading text-xl font-semibold text-slate-950 dark:text-white">{subject} AI Worksheet</div>
                  <div className="mt-1 text-sm text-slate-600 dark:text-slate-300">{selectedClass} | {coverage} | {worksheetType} | {difficulty}</div>
                </div>
                {result.sections.map((section) => (
                  <div key={section.title} className="rounded-xl border border-blue-950/10 bg-slate-50 p-4 dark:border-white/10 dark:bg-slate-950/40">
                    <div className="font-semibold text-slate-950 dark:text-white">{section.title}</div>
                    <p className="mt-1 text-xs leading-5 text-slate-500 dark:text-slate-400">{section.instructions}</p>
                    <div className="mt-3 grid gap-2">
                      {section.questions.map((question) => (
                        <div key={`${section.title}-${question.number}`} className="rounded-lg bg-white px-3 py-2 text-sm dark:bg-white/[0.05]">
                          <div className="flex gap-3 text-slate-700 dark:text-slate-200">
                            <span>{question.number}.</span>
                            <span>{question.question}</span>
                            <span className="ml-auto shrink-0 font-semibold text-slate-500 dark:text-slate-300">{question.marks}m</span>
                          </div>
                          {includeAnswerKey ? <div className="mt-2 rounded-lg bg-emerald-50 px-3 py-2 text-xs text-emerald-800 dark:bg-emerald-400/10 dark:text-emerald-100"><strong>Answer:</strong> {question.answer}</div> : null}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid min-h-[22rem] place-items-center rounded-xl border border-dashed border-blue-950/15 bg-slate-50 p-6 text-center dark:border-white/15 dark:bg-slate-950/35">
                <div className="max-w-md">
                  <div className="mx-auto grid size-12 place-items-center rounded-full bg-emerald-50 text-emerald-700 dark:bg-emerald-400/10 dark:text-emerald-200"><Sparkles className="size-5" aria-hidden="true" /></div>
                  <h3 className="mt-4 font-heading text-2xl font-semibold text-slate-950 dark:text-white">Your AI-generated worksheet will appear here.</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">Click generate to create printable sections, questions, marks, and answer key.</p>
                </div>
              </div>
            )}
          </div>

          <div className="mt-6 rounded-[1.1rem] border border-blue-950/10 bg-blue-50/70 p-4 dark:border-white/10 dark:bg-white/[0.05]">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <div className="text-sm font-semibold text-slate-950 dark:text-white">Save or share this AI worksheet</div>
                <p className="mt-1 text-xs leading-5 text-slate-600 dark:text-slate-300">{actionMessage}</p>
              </div>
              <div className="flex flex-wrap gap-2">
                {!result.isAiGenerated && savedWorksheetAvailable ? <ActionButton label="Restore last" icon={Sparkles} onClick={restoreSavedWorksheet} /> : null}
                <ActionButton label="Copy" icon={Copy} onClick={copyWorksheet} disabled={!result.isAiGenerated} />
                <ActionButton label="Print" icon={Printer} onClick={printWorksheet} disabled={!result.isAiGenerated} />
                <ActionButton label="Download" icon={Download} onClick={downloadWorksheet} disabled={!result.isAiGenerated} />
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
        {options.map((option) => <button key={option} type="button" onClick={() => onChange(option)} className={`cursor-pointer rounded-full border px-3 py-2 text-sm font-semibold transition ${value === option ? "border-emerald-500 bg-emerald-50 text-emerald-800 dark:border-emerald-300 dark:bg-emerald-300 dark:text-slate-950" : "border-blue-950/10 bg-white text-slate-700 hover:border-emerald-300 hover:text-emerald-700 dark:border-white/10 dark:bg-white/7 dark:text-slate-200"}`}>{option}</button>)}
      </div>
    </div>
  );
}

function RangeField({ label, value, setValue, min, max, step, suffix, presets }: { label: string; value: number; setValue: (value: number) => void; min: number; max: number; step: number; suffix: string; presets: readonly number[] }) {
  return (
    <div className="rounded-[1.1rem] border border-blue-950/10 bg-white/82 p-4 shadow-sm shadow-blue-950/5 dark:border-white/10 dark:bg-white/[0.04]">
      <div className="flex items-center justify-between gap-3"><span className="text-sm font-semibold text-slate-800 dark:text-slate-100">{label}</span><span className="rounded-full bg-emerald-50 px-3 py-1 text-sm font-semibold text-emerald-700 dark:bg-emerald-400/10 dark:text-emerald-200">{value} {suffix}</span></div>
      <input type="range" min={min} max={max} step={step} value={value} onChange={(event) => setValue(clamp(Number(event.target.value), min, max))} className="mt-4 h-2 w-full cursor-pointer accent-[#22b573] dark:accent-[#58c98a]" />
      <div className="mt-3 flex flex-wrap gap-2">{presets.map((preset) => <button key={preset} type="button" onClick={() => setValue(clamp(preset, min, max))} className={`cursor-pointer rounded-full border px-3 py-2 text-sm font-semibold transition ${value === preset ? "border-emerald-500 bg-emerald-50 text-emerald-800 dark:border-emerald-300 dark:bg-emerald-300 dark:text-slate-950" : "border-blue-950/10 bg-white text-slate-700 hover:border-emerald-300 hover:text-emerald-700 dark:border-white/10 dark:bg-white/7 dark:text-slate-200"}`}>{preset}</button>)}</div>
    </div>
  );
}

function ToggleCard({ label, value, onChange }: { label: string; value: boolean; onChange: (value: boolean) => void }) {
  return <button type="button" onClick={() => onChange(!value)} className={`flex cursor-pointer items-center justify-between rounded-[1.1rem] border p-4 text-left transition ${value ? "border-emerald-300 bg-emerald-50 text-emerald-800 dark:border-emerald-300/50 dark:bg-emerald-400/10 dark:text-emerald-100" : "border-blue-950/10 bg-white text-slate-700 dark:border-white/10 dark:bg-white/[0.04] dark:text-slate-200"}`}><span className="font-semibold">{label}</span><span className="text-sm font-semibold">{value ? "Yes" : "No"}</span></button>;
}

function Metric({ label, value }: { label: string; value: string }) {
  return <div className="min-w-0 rounded-[1.1rem] border border-blue-950/10 bg-white p-4 shadow-sm shadow-blue-950/5 dark:border-white/10 dark:bg-white/[0.05]"><div className="flex items-center justify-between gap-3"><div className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">{label}</div><ClipboardList className="size-4 shrink-0 text-primary dark:text-emerald-300" aria-hidden="true" /></div><div className="mt-3 min-w-0 text-[1.28rem] font-semibold leading-snug text-slate-950 sm:text-[1.4rem] dark:text-white" title={value}>{value}</div></div>;
}

function GenerationOverlay({ progress }: { progress: number }) {
  const stage = progress < 35 ? "Reading worksheet setup" : progress < 72 ? "Writing practice questions" : progress < 94 ? "Balancing sections and marks" : "Preparing preview";
  return <div className="fixed inset-0 z-[90] grid place-items-center bg-slate-950/58 px-4 backdrop-blur-sm"><div className="w-full max-w-lg rounded-[1.4rem] border border-white/18 bg-white p-6 shadow-2xl shadow-slate-950/30 dark:bg-slate-950 dark:!text-white"><div className="flex items-center gap-4"><div className="relative grid size-14 place-items-center rounded-full bg-emerald-50 text-emerald-700 dark:bg-emerald-400/12 dark:text-emerald-200"><Sparkles className="size-6 animate-pulse" aria-hidden="true" /><span className="absolute inset-0 rounded-full border-2 border-emerald-300/70 border-t-transparent animate-spin" /></div><div><div className="font-heading text-2xl font-semibold text-slate-950 dark:!text-white">Generating AI worksheet</div><p className="mt-1 text-sm text-slate-600 dark:text-slate-300">{stage}...</p></div></div><div className="mt-6 flex items-center justify-between gap-3 text-xs font-semibold uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400"><span>AI generation</span><span>{Math.round(progress)}%</span></div><div className="mt-3 h-3 overflow-hidden rounded-full bg-slate-200 shadow-inner dark:bg-white/12"><div className="h-full rounded-full bg-[image:var(--button-solid)] transition-[width] duration-500" style={{ width: `${clamp(progress, 0, 100)}%` }} /></div><p className="mt-4 text-sm leading-6 text-slate-600 dark:text-slate-300">Creating worksheet sections, questions, marks, and teacher answer key.</p></div></div>;
}

function ActionButton({ label, icon: Icon, onClick, disabled = false }: { label: string; icon: typeof Copy; onClick: () => void; disabled?: boolean }) {
  return <button type="button" onClick={onClick} disabled={disabled} className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-blue-950/10 bg-white px-3 py-2 text-xs font-semibold text-slate-700 shadow-sm shadow-blue-950/5 transition hover:border-primary/35 hover:text-primary disabled:cursor-not-allowed disabled:opacity-45 dark:border-white/10 dark:bg-white/[0.06] dark:text-slate-200 dark:hover:text-white"><Icon className="size-3.5" aria-hidden="true" />{label}</button>;
}
