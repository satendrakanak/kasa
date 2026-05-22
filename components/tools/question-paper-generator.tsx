"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Copy, Download, FileQuestion, Printer, RotateCcw, Sparkles } from "lucide-react";

const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(Number.isFinite(value) ? value : min, min), max);

const classes = ["Class 6", "Class 7", "Class 8", "Class 9", "Class 10", "Class 11", "Class 12"] as const;
const subjects = ["Mathematics", "Science", "English", "Social Science", "Computer Science", "General Knowledge"] as const;
const difficultyLevels = ["Easy", "Balanced", "Challenging"] as const;
const paperDurations = [30, 45, 60, 90, 120, 180] as const;
const markPresets = [20, 30, 40, 50, 80, 100] as const;
const coveragePresets = ["Full syllabus", "Unit test syllabus", "Term exam syllabus", "Selected chapters"] as const;
const paperStorageKey = "kasa-ai-question-paper-generator:last";

type QuestionType = "mcq" | "short" | "long" | "caseStudy";

type QuestionConfig = {
  key: QuestionType;
  label: string;
  marks: number;
  count: number;
};

type GeneratedQuestion = {
  number: number;
  text: string;
  marks: number;
  answer: string;
};

type GeneratedSection = {
  key: string;
  label: string;
  sectionName: string;
  total: number;
  questions: GeneratedQuestion[];
};

type SavedPaper = {
  selectedClass: (typeof classes)[number];
  subject: (typeof subjects)[number];
  topic: string;
  totalMarks: number;
  duration: number;
  difficulty: (typeof difficultyLevels)[number];
  includeAnswerKey: boolean;
  questionMix: QuestionConfig[];
  aiPaper: { signature: string; sections: GeneratedSection[] };
};

const defaultQuestionMix: QuestionConfig[] = [
  { key: "mcq", label: "Multiple choice questions", marks: 1, count: 8 },
  { key: "short", label: "Short answer questions", marks: 2, count: 6 },
  { key: "long", label: "Long answer questions", marks: 5, count: 4 },
  { key: "caseStudy", label: "Case-based questions", marks: 4, count: 2 },
];

export function QuestionPaperGenerator() {
  const resultPanelRef = useRef<HTMLDivElement>(null);
  const [selectedClass, setSelectedClass] = useState<(typeof classes)[number]>("Class 10");
  const [subject, setSubject] = useState<(typeof subjects)[number]>("Science");
  const [topic, setTopic] = useState("Full syllabus");
  const [totalMarks, setTotalMarks] = useState(50);
  const [duration, setDuration] = useState(90);
  const [difficulty, setDifficulty] = useState<(typeof difficultyLevels)[number]>("Balanced");
  const [includeAnswerKey, setIncludeAnswerKey] = useState(true);
  const [questionMix, setQuestionMix] = useState(defaultQuestionMix);
  const [aiPaper, setAiPaper] = useState<{ signature: string; sections: GeneratedSection[] } | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationProgress, setGenerationProgress] = useState(0);
  const [actionMessage, setActionMessage] = useState("Choose your paper details, then generate a fresh AI question paper.");
  const [savedPaperAvailable, setSavedPaperAvailable] = useState(false);

  const restoreSavedPaper = () => {
    try {
      const raw = window.localStorage.getItem(paperStorageKey);
      if (!raw) return false;
      const saved = JSON.parse(raw) as Partial<SavedPaper>;
      if (!saved.aiPaper || !Array.isArray(saved.aiPaper.sections)) return false;
      setSelectedClass(saved.selectedClass || "Class 10");
      setSubject(saved.subject || "Science");
      setTopic(saved.topic || "Full syllabus");
      setTotalMarks(clamp(Number(saved.totalMarks), 10, 100));
      setDuration(clamp(Number(saved.duration), 30, 180));
      setDifficulty(saved.difficulty || "Balanced");
      setIncludeAnswerKey(Boolean(saved.includeAnswerKey));
      setQuestionMix(Array.isArray(saved.questionMix) && saved.questionMix.length ? saved.questionMix : defaultQuestionMix);
      setAiPaper(saved.aiPaper);
      setSavedPaperAvailable(true);
      setActionMessage("Last generated AI question paper restored.");
      return true;
    } catch {
      return false;
    }
  };

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      const restored = restoreSavedPaper();
      if (!restored) {
        setSavedPaperAvailable(Boolean(window.localStorage.getItem(paperStorageKey)));
      }
    }, 0);
    return () => window.clearTimeout(timeoutId);
  }, []);

  useEffect(() => {
    if (!isGenerating) {
      return;
    }

    const intervalId = window.setInterval(() => {
      setGenerationProgress((progress) => {
        if (progress < 35) return Math.min(progress + 7, 35);
        if (progress < 70) return Math.min(progress + 5, 70);
        return Math.min(progress + 2, 92);
      });
    }, 420);

    return () => window.clearInterval(intervalId);
  }, [isGenerating]);

  const currentSignature = useMemo(() => {
    return JSON.stringify({
      selectedClass,
      subject,
      topic,
      totalMarks,
      duration,
      difficulty,
      includeAnswerKey,
      questionMix,
    });
  }, [difficulty, duration, includeAnswerKey, questionMix, selectedClass, subject, topic, totalMarks]);

  const result = useMemo(() => {
    const matchingAiSections = aiPaper?.signature === currentSignature ? aiPaper.sections : null;
    const plannedMarks = matchingAiSections
      ? matchingAiSections.reduce((sum, section) => sum + section.total, 0)
      : questionMix.reduce((sum, item) => sum + item.count * item.marks, 0);
    const targetMarks = clamp(totalMarks, 10, 100);
    const difference = plannedMarks - targetMarks;

    return {
      sections: matchingAiSections ?? [],
      plannedMarks,
      targetMarks,
      difference,
      isBalanced: Math.abs(difference) <= 3,
      totalQuestions: matchingAiSections
        ? matchingAiSections.reduce((sum, section) => sum + section.questions.length, 0)
        : questionMix.reduce((sum, item) => sum + item.count, 0),
      status:
        Math.abs(difference) <= 3
          ? "Marks distribution looks balanced."
          : difference > 0
            ? "Question mix is above target marks."
            : "Question mix is below target marks.",
      isAiGenerated: Boolean(matchingAiSections),
    };
  }, [aiPaper, currentSignature, questionMix, totalMarks]);

  const paperText = [
    `${subject} AI Question Paper`,
    `${selectedClass} | ${topic}`,
    `Time: ${duration} minutes | Maximum Marks: ${result.plannedMarks}`,
    `Difficulty: ${difficulty}`,
    "",
    "General Instructions:",
    "1. Read all questions carefully.",
    "2. Marks are indicated against each question.",
    "3. Write answers neatly and show required steps.",
    "",
    ...result.sections.flatMap((section) => [
      `${section.sectionName}: ${section.label} (${section.total} marks)`,
      ...section.questions.map((question) => `${question.number}. ${question.text} [${question.marks}]`),
      "",
    ]),
    includeAnswerKey ? "Answer Key / Teacher Hints:" : "",
    ...(includeAnswerKey
      ? result.sections.flatMap((section) => [
          `${section.sectionName}`,
          ...section.questions.map((question) => `${question.number}. ${question.answer}`),
          "",
        ])
      : []),
    result.isAiGenerated
      ? "Generated with KASA AI Question Paper Generator"
      : "Prepared with KASA AI Question Paper Generator",
  ].filter(Boolean).join("\n");

  const updateQuestionCount = (key: QuestionType, count: number) => {
    setQuestionMix((items) =>
      items.map((item) => (item.key === key ? { ...item, count: clamp(count, 0, 20) } : item)),
    );
  };

  const updateSubject = (nextSubject: (typeof subjects)[number]) => {
    setSubject(nextSubject);
    setTopic("Full syllabus");
    setAiPaper(null);
    setActionMessage("Subject updated. Generate a fresh AI question paper for the selected syllabus.");
  };

  const reset = () => {
    setSelectedClass("Class 10");
    setSubject("Science");
    setTopic("Full syllabus");
    setTotalMarks(50);
    setDuration(90);
    setDifficulty("Balanced");
    setIncludeAnswerKey(true);
    setQuestionMix(defaultQuestionMix);
    setAiPaper(null);
    setGenerationProgress(0);
    setActionMessage("Choose your paper details, then generate a fresh AI question paper.");
  };

  const generateWithAi = async () => {
    setGenerationProgress(8);
    setIsGenerating(true);
    setActionMessage("Generating fresh questions with AI. This can take a few seconds...");
    try {
      const response = await fetch("/api/tools/question-paper", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          selectedClass,
          subject,
          topic,
          totalMarks,
          duration,
          difficulty,
          includeAnswerKey,
          questionMix,
        }),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(typeof data?.error === "string" ? data.error : "AI generation failed.");
      }
      if (!Array.isArray(data.sections)) {
        throw new Error("AI did not return a usable question paper.");
      }
      setGenerationProgress(96);
      const nextPaper = { signature: currentSignature, sections: data.sections };
      setAiPaper(nextPaper);
      window.localStorage.setItem(
        paperStorageKey,
        JSON.stringify({
          selectedClass,
          subject,
          topic,
          totalMarks,
          duration,
          difficulty,
          includeAnswerKey,
          questionMix,
          aiPaper: nextPaper,
        } satisfies SavedPaper),
      );
      setSavedPaperAvailable(true);
      setActionMessage(
        typeof data.remaining === "number"
          ? `Paper generated successfully. ${data.remaining} free generations left today.`
          : "Paper generated successfully.",
      );
      window.setTimeout(() => {
        resultPanelRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 450);
    } catch (error) {
      setActionMessage(error instanceof Error ? error.message : "AI generation failed. Please try again.");
    } finally {
      setGenerationProgress(100);
      window.setTimeout(() => setIsGenerating(false), 350);
    }
  };

  const copyPaper = async () => {
    if (!result.isAiGenerated) {
      setActionMessage("Generate the AI question paper first, then copy it.");
      return;
    }
    try {
      await navigator.clipboard.writeText(paperText);
      setActionMessage("Question paper copied.");
    } catch {
      setActionMessage("Copy was blocked. Use download or print instead.");
    }
  };

  const downloadPaper = () => {
    if (!result.isAiGenerated) {
      setActionMessage("Generate the AI question paper first, then download it.");
      return;
    }
    const blob = new Blob([paperText], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "kasa-question-paper.txt";
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
    setActionMessage("Question paper downloaded.");
  };

  const printPaper = () => {
    if (!result.isAiGenerated) {
      setActionMessage("Generate the AI question paper first, then print it.");
      return;
    }
    const printHtml = `
      <!doctype html>
      <html>
        <head>
          <meta charset="utf-8" />
          <title>${subject} AI Question Paper</title>
          <style>
            body { margin: 0; padding: 32px; color: #071b3a; font-family: Arial, Helvetica, sans-serif; }
            main { max-width: 820px; margin: 0 auto; }
            h1 { margin: 0 0 8px; text-align: center; font-size: 28px; }
            .meta { text-align: center; color: #475569; margin-bottom: 24px; line-height: 1.6; }
            .instructions { border: 1px solid #d7e7f6; border-radius: 12px; padding: 14px 18px; background: #f8fbff; margin-bottom: 22px; }
            h2 { margin: 24px 0 10px; font-size: 18px; border-bottom: 1px solid #d7e7f6; padding-bottom: 8px; }
            .question { display: flex; gap: 10px; margin: 12px 0; line-height: 1.55; }
            .marks { margin-left: auto; white-space: nowrap; font-weight: 700; }
            .answer { color: #475569; font-size: 13px; margin: 7px 0 7px 28px; }
            .footer { margin-top: 28px; border-top: 1px solid #d7e7f6; padding-top: 12px; color: #64748b; font-size: 12px; }
          </style>
        </head>
        <body>
          <main>
            <h1>${subject} Question Paper</h1>
            <div class="meta">${selectedClass} | ${topic}<br />Time: ${duration} minutes | Maximum Marks: ${result.plannedMarks} | Difficulty: ${difficulty}</div>
            <div class="instructions"><strong>General Instructions</strong><br />Read all questions carefully. Marks are indicated against each question. Write answers neatly and show required steps.</div>
            ${result.sections
              .map(
                (section) => `
                  <h2>${section.sectionName}: ${section.label} (${section.total} marks)</h2>
                  ${section.questions
                    .map(
                      (question) => `
                        <div class="question"><span>${question.number}.</span><span>${question.text}</span><span class="marks">[${question.marks}]</span></div>
                      `,
                    )
                    .join("")}
                `,
              )
              .join("")}
            ${
              includeAnswerKey
                ? `
                  <h2>Answer Key / Teacher Hints</h2>
                  ${result.sections
                    .map((section) =>
                      section.questions
                        .map((question) => `<div class="answer">${section.sectionName}.${question.number} ${question.answer}</div>`)
                        .join(""),
                    )
                    .join("")}
                `
                : ""
            }
            <div class="footer">Generated with KASA AI Question Paper Generator</div>
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
    setActionMessage("Print dialog opened with only the question paper.");
  };

  return (
    <section className="relative px-4 py-8 sm:px-6 lg:px-8">
      {isGenerating ? <GenerationOverlay progress={generationProgress} /> : null}
      <div className="mx-auto grid w-full max-w-[108rem] gap-5 lg:grid-cols-[0.92fr_1.08fr]">
        <div className="rounded-[1.25rem] border border-blue-950/10 bg-white/92 p-5 shadow-xl shadow-blue-950/8 backdrop-blur dark:border-white/10 dark:bg-surface/90 sm:p-7">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <p className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.16em] text-primary dark:text-emerald-200">
                <Sparkles className="size-4 animate-pulse" aria-hidden="true" />
                AI paper setup
              </p>
              <h2 className="mt-2 font-heading text-3xl font-semibold text-slate-950 dark:text-white">
                Create an AI question paper
              </h2>
              <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">
                Select class, subject, syllabus coverage, marks, difficulty, and question mix to generate a print-ready AI paper.
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
              <span className="text-sm font-semibold text-slate-800 dark:text-slate-100">Syllabus coverage</span>
              <span className="mt-1 block text-xs leading-5 text-slate-500 dark:text-slate-400">
                Keep full syllabus for a complete paper, or add units/chapters for a focused test.
              </span>
              <input
                value={topic}
                onChange={(event) => setTopic(event.target.value)}
                className="mt-3 h-12 w-full rounded-xl border border-blue-950/10 bg-white px-3 text-base font-semibold text-slate-950 outline-none transition focus:border-primary/45 dark:border-white/10 dark:bg-slate-950/55 dark:text-white"
              />
              <div className="mt-3 flex flex-wrap gap-2">
                {coveragePresets.map((preset) => (
                  <button
                    key={preset}
                    type="button"
                    onClick={() => setTopic(preset)}
                    className={`cursor-pointer rounded-full border px-3 py-2 text-xs font-semibold transition ${topic === preset ? "border-emerald-500 bg-emerald-50 text-emerald-800 dark:border-emerald-300 dark:bg-emerald-300 dark:text-slate-950" : "border-blue-950/10 bg-white text-slate-700 hover:border-emerald-300 hover:text-emerald-700 dark:border-white/10 dark:bg-white/7 dark:text-slate-200"}`}
                  >
                    {preset}
                  </button>
                ))}
              </div>
            </label>

            <div className="grid gap-4 sm:grid-cols-2">
              <RangeField label="Total marks target" value={totalMarks} setValue={setTotalMarks} min={10} max={100} step={5} suffix="marks" presets={markPresets} />
              <RangeField label="Duration" value={duration} setValue={setDuration} min={30} max={180} step={15} suffix="min" presets={paperDurations} />
            </div>

            <ChoiceGrid label="Difficulty" value={difficulty} options={difficultyLevels} onChange={setDifficulty} />

            <div className="rounded-[1.1rem] border border-blue-950/10 bg-white/82 p-4 shadow-sm shadow-blue-950/5 dark:border-white/10 dark:bg-white/[0.04]">
              <div className="text-sm font-semibold text-slate-800 dark:text-slate-100">Question mix</div>
              <div className="mt-4 grid gap-3">
                {questionMix.map((item) => (
                  <QuestionCountField key={item.key} config={item} onChange={(count) => updateQuestionCount(item.key, count)} />
                ))}
              </div>
            </div>

            <button
              type="button"
              onClick={() => setIncludeAnswerKey((value) => !value)}
              className={[
                "flex cursor-pointer items-center justify-between rounded-[1.1rem] border p-4 text-left transition",
                includeAnswerKey
                  ? "border-emerald-300 bg-emerald-50 text-emerald-800 dark:border-emerald-300/50 dark:bg-emerald-400/10 dark:text-emerald-100"
                  : "border-blue-950/10 bg-white text-slate-700 dark:border-white/10 dark:bg-white/[0.04] dark:text-slate-200",
              ].join(" ")}
            >
              <span className="font-semibold">Include answer key / teacher hints</span>
              <span className="text-sm font-semibold">{includeAnswerKey ? "Yes" : "No"}</span>
            </button>

            <button
              type="button"
              onClick={generateWithAi}
              disabled={isGenerating}
              className="inline-flex min-h-12 cursor-pointer items-center justify-center gap-2 rounded-full bg-[image:var(--button-solid)] px-5 py-3 text-sm font-semibold !text-white shadow-lg shadow-blue-950/12 transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:translate-y-0"
            >
              <Sparkles className="size-4" aria-hidden="true" />
              {isGenerating ? "Generating AI paper..." : "Generate paper with AI"}
            </button>
          </div>
        </div>

        <div ref={resultPanelRef} className="scroll-mt-28 rounded-[1.25rem] border border-blue-950/10 bg-white/94 p-5 shadow-2xl shadow-blue-950/12 backdrop-blur dark:border-white/10 dark:bg-surface/92 sm:p-7">
          <div className="flex flex-wrap items-start justify-between gap-5">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary dark:text-emerald-200">
                AI question paper
              </p>
              <div className="mt-3 font-heading text-6xl font-semibold leading-none text-slate-950 sm:text-7xl dark:text-white">
                {result.isAiGenerated ? result.plannedMarks : totalMarks}
              </div>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
                {result.isAiGenerated
                  ? `marks across ${result.totalQuestions} questions`
                  : "target marks for your AI paper"}
              </p>
            </div>
            <span className={`rounded-full px-3 py-2 text-sm font-semibold ${result.isAiGenerated || result.isBalanced ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-400/10 dark:text-emerald-200" : "bg-amber-50 text-amber-700 dark:bg-amber-400/10 dark:text-amber-200"}`}>
              {result.isAiGenerated ? "AI generated" : "Ready"}
            </span>
          </div>

          <div className="mt-7 h-4 overflow-hidden rounded-full bg-slate-300/80 shadow-inner shadow-slate-400/35 dark:bg-white/14">
            <div className="h-full rounded-full bg-[image:var(--button-solid)] transition-[width] duration-300" style={{ width: `${Math.min((result.plannedMarks / result.targetMarks) * 100, 100)}%` }} />
          </div>

          <div className={`mt-7 rounded-[1.1rem] border p-5 ${result.isBalanced ? "border-emerald-200 bg-emerald-50 dark:border-emerald-300/30 dark:bg-emerald-400/10" : "border-amber-200 bg-amber-50 dark:border-amber-300/30 dark:bg-amber-400/10"}`}>
            <h3 className="font-heading text-2xl font-semibold text-slate-950 dark:text-white">
              {result.isAiGenerated ? "Paper generated successfully." : "Ready to generate a real paper."}
            </h3>
            <p className="mt-2 text-sm leading-6 text-slate-700 dark:text-slate-200">
              {result.isAiGenerated
                ? `${result.status} Target is ${result.targetMarks} marks. Current mix is ${Math.abs(result.difference)} marks ${result.difference > 0 ? "above" : result.difference < 0 ? "below" : "on"} target.`
                : "No sample questions are shown before AI generation, so teachers only see a fresh paper created from their selected class, subject, syllabus coverage, and marks."}
            </p>
          </div>

          <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <Metric label="Class" value={selectedClass} />
            <Metric label="Subject" value={subject} />
            <Metric label="Duration" value={`${duration}m`} />
            <Metric label="Sections" value={`${result.sections.length}`} />
          </div>

          <div className="mt-6 rounded-[1.1rem] border border-blue-950/10 bg-white p-4 dark:border-white/10 dark:bg-white/[0.05]">
            <div className="mb-3 text-sm font-semibold text-slate-950 dark:text-white">Paper preview</div>
            {result.isAiGenerated ? (
              <div className="max-h-[32rem] space-y-4 overflow-auto pr-1">
                <div className="rounded-xl bg-slate-50 p-4 text-center dark:bg-slate-950/40">
                  <div className="font-heading text-xl font-semibold text-slate-950 dark:text-white">{subject} Question Paper</div>
                  <div className="mt-1 text-sm text-slate-600 dark:text-slate-300">
                    {selectedClass} | {topic} | {duration} minutes | {result.plannedMarks} marks
                  </div>
                </div>
                {result.sections.map((section) => (
                  <div key={section.key} className="rounded-xl border border-blue-950/10 bg-slate-50 p-4 dark:border-white/10 dark:bg-slate-950/40">
                    <div className="font-semibold text-slate-950 dark:text-white">
                      {section.sectionName}: {section.label} ({section.total} marks)
                    </div>
                    <div className="mt-3 grid gap-2">
                      {section.questions.slice(0, 4).map((question) => (
                        <div key={question.number} className="grid gap-2 rounded-lg bg-white px-3 py-2 text-sm dark:bg-white/[0.05] sm:grid-cols-[1fr_auto]">
                          <span className="text-slate-700 dark:text-slate-200">
                            {question.number}. {question.text}
                          </span>
                          <span className="font-semibold text-slate-500 dark:text-slate-300">[{question.marks}]</span>
                        </div>
                      ))}
                      {section.questions.length > 4 ? (
                        <div className="text-xs font-semibold text-slate-500 dark:text-slate-300">
                          +{section.questions.length - 4} more questions in this section
                        </div>
                      ) : null}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid min-h-[22rem] place-items-center rounded-xl border border-dashed border-blue-950/15 bg-slate-50 p-6 text-center dark:border-white/15 dark:bg-slate-950/35">
                <div className="max-w-md">
                  <div className="mx-auto grid size-12 place-items-center rounded-full bg-emerald-50 text-emerald-700 dark:bg-emerald-400/10 dark:text-emerald-200">
                    <Sparkles className="size-5" aria-hidden="true" />
                  </div>
                  <h3 className="mt-4 font-heading text-2xl font-semibold text-slate-950 dark:text-white">
                    Your AI-generated question paper will appear here.
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">
                    Click generate to create original questions, section-wise marks, and teacher hints from your selected details.
                  </p>
                </div>
              </div>
            )}
          </div>

          <div className="mt-6 rounded-[1.1rem] border border-blue-950/10 bg-blue-50/70 p-4 dark:border-white/10 dark:bg-white/[0.05]">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <div className="text-sm font-semibold text-slate-950 dark:text-white">Save or share this AI paper</div>
                <p className="mt-1 text-xs leading-5 text-slate-600 dark:text-slate-300">{actionMessage}</p>
              </div>
              <div className="flex flex-wrap gap-2">
                {!result.isAiGenerated && savedPaperAvailable ? (
                  <ActionButton label="Restore last" icon={Sparkles} onClick={restoreSavedPaper} />
                ) : null}
                <ActionButton label="Copy" icon={Copy} onClick={copyPaper} disabled={!result.isAiGenerated} />
                <ActionButton label="Print" icon={Printer} onClick={printPaper} disabled={!result.isAiGenerated} />
                <ActionButton label="Download" icon={Download} onClick={downloadPaper} disabled={!result.isAiGenerated} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ChoiceGrid<T extends string>({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: T;
  options: readonly T[];
  onChange: (value: T) => void;
}) {
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

function RangeField({
  label,
  value,
  setValue,
  min,
  max,
  step,
  suffix,
  presets,
}: {
  label: string;
  value: number;
  setValue: (value: number) => void;
  min: number;
  max: number;
  step: number;
  suffix: string;
  presets: readonly number[];
}) {
  return (
    <div className="rounded-[1.1rem] border border-blue-950/10 bg-white/82 p-4 shadow-sm shadow-blue-950/5 dark:border-white/10 dark:bg-white/[0.04]">
      <div className="flex items-center justify-between gap-3">
        <span className="text-sm font-semibold text-slate-800 dark:text-slate-100">{label}</span>
        <span className="rounded-full bg-emerald-50 px-3 py-1 text-sm font-semibold text-emerald-700 dark:bg-emerald-400/10 dark:text-emerald-200">
          {value} {suffix}
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
            key={preset}
            type="button"
            onClick={() => setValue(clamp(preset, min, max))}
            className={`cursor-pointer rounded-full border px-3 py-2 text-sm font-semibold transition ${value === preset ? "border-emerald-500 bg-emerald-50 text-emerald-800 dark:border-emerald-300 dark:bg-emerald-300 dark:text-slate-950" : "border-blue-950/10 bg-white text-slate-700 hover:border-emerald-300 hover:text-emerald-700 dark:border-white/10 dark:bg-white/7 dark:text-slate-200"}`}
          >
            {preset}
          </button>
        ))}
      </div>
    </div>
  );
}

function QuestionCountField({
  config,
  onChange,
}: {
  config: QuestionConfig;
  onChange: (count: number) => void;
}) {
  return (
    <div className="rounded-xl border border-blue-950/10 bg-white p-3 dark:border-white/10 dark:bg-white/[0.05]">
      <div className="flex items-center justify-between gap-3">
        <div>
          <div className="text-sm font-semibold text-slate-800 dark:text-slate-100">{config.label}</div>
          <div className="mt-1 text-xs text-slate-500 dark:text-slate-400">{config.marks} mark each</div>
        </div>
        <span className="rounded-full bg-emerald-50 px-3 py-1 text-sm font-semibold text-emerald-700 dark:bg-emerald-400/10 dark:text-emerald-200">
          {config.count}
        </span>
      </div>
      <input
        type="range"
        min={0}
        max={20}
        value={config.count}
        onChange={(event) => onChange(Number(event.target.value))}
        className="mt-3 h-2 w-full cursor-pointer accent-[#22b573] dark:accent-[#58c98a]"
      />
    </div>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="min-w-0 rounded-[1.1rem] border border-blue-950/10 bg-white p-4 shadow-sm shadow-blue-950/5 dark:border-white/10 dark:bg-white/[0.05]">
      <div className="flex items-center justify-between gap-3">
        <div className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">{label}</div>
        <FileQuestion className="size-4 shrink-0 text-primary dark:text-emerald-300" aria-hidden="true" />
      </div>
      <div
        className="mt-3 min-w-0 text-[1.28rem] font-semibold leading-snug text-slate-950 sm:text-[1.4rem] dark:text-white"
        title={value}
      >
        {value}
      </div>
    </div>
  );
}

function GenerationOverlay({ progress }: { progress: number }) {
  const stage =
    progress < 35
      ? "Reading your paper setup"
      : progress < 70
        ? "Writing original questions"
        : progress < 94
          ? "Balancing marks and sections"
          : "Preparing your preview";

  return (
    <div className="fixed inset-0 z-[90] grid place-items-center bg-slate-950/58 px-4 backdrop-blur-sm">
      <div className="w-full max-w-lg rounded-[1.4rem] border border-white/18 bg-white p-6 shadow-2xl shadow-slate-950/30 dark:bg-slate-950 dark:text-white">
        <div className="flex items-center gap-4">
          <div className="relative grid size-14 place-items-center rounded-full bg-emerald-50 text-emerald-700 dark:bg-emerald-400/12 dark:text-emerald-200">
            <Sparkles className="size-6 animate-pulse" aria-hidden="true" />
            <span className="absolute inset-0 rounded-full border-2 border-emerald-300/70 border-t-transparent animate-spin" />
          </div>
          <div>
            <div className="font-heading text-2xl font-semibold text-slate-950 dark:text-white">
              Generating question paper
            </div>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">{stage}...</p>
          </div>
        </div>
        <div className="mt-6 flex items-center justify-between gap-3 text-xs font-semibold uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">
          <span>AI generation</span>
          <span>{Math.round(progress)}%</span>
        </div>
        <div className="mt-3 h-3 overflow-hidden rounded-full bg-slate-200 shadow-inner dark:bg-white/12">
          <div
            className="h-full rounded-full bg-[image:var(--button-solid)] transition-[width] duration-500"
            style={{ width: `${clamp(progress, 0, 100)}%` }}
          />
        </div>
        <p className="mt-4 text-sm leading-6 text-slate-600 dark:text-slate-300">
          Creating fresh questions, marks distribution, and teacher hints. Please keep this tab open.
        </p>
      </div>
    </div>
  );
}

function ActionButton({
  label,
  icon: Icon,
  onClick,
  disabled = false,
}: {
  label: string;
  icon: typeof Copy;
  onClick: () => void;
  disabled?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-blue-950/10 bg-white px-3 py-2 text-xs font-semibold text-slate-700 shadow-sm shadow-blue-950/5 transition hover:border-primary/35 hover:text-primary disabled:cursor-not-allowed disabled:opacity-45 dark:border-white/10 dark:bg-white/[0.06] dark:text-slate-200 dark:hover:text-white"
    >
      <Icon className="size-3.5" aria-hidden="true" />
      {label}
    </button>
  );
}
