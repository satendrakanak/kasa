"use client";

import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { CheckCircle2, ClipboardList, Copy, Download, Printer, RotateCcw, Sparkles } from "lucide-react";

const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(Number.isFinite(value) ? value : min, min), max);

const classes = ["Class 6", "Class 7", "Class 8", "Class 9", "Class 10", "Class 11", "Class 12"] as const;
const subjects = ["Mathematics", "Science", "English", "Social Science", "Computer Science", "General Knowledge"] as const;
const coveragePresets = ["Full syllabus", "Unit test syllabus", "Term exam syllabus", "Selected chapters"] as const;
const assignmentTypes = ["Homework assignment", "Project work", "Practice task", "Research assignment"] as const;
const difficultyLevels = ["Easy", "Balanced", "Challenging"] as const;
const skillOptions = ["Concept understanding", "Written explanation", "Problem solving", "Research", "Creativity", "Presentation"] as const;
const storageKey = "kasa-ai-assignment-generator:last";

type AssignmentTask = {
  title: string;
  instructions: string;
  marks: number;
};

type GeneratedAssignment = {
  title: string;
  brief: string;
  learningGoals: string[];
  tasks: AssignmentTask[];
  submissionChecklist: string[];
  rubric: string[];
  teacherNote: string;
};

type SavedAssignment = {
  selectedClass: (typeof classes)[number];
  subject: (typeof subjects)[number];
  coverage: string;
  assignmentType: (typeof assignmentTypes)[number];
  difficulty: (typeof difficultyLevels)[number];
  totalMarks: number;
  durationDays: number;
  includeRubric: boolean;
  skills: string[];
  assignment: GeneratedAssignment;
  signature: string;
};

export function AiAssignmentGenerator() {
  const resultPanelRef = useRef<HTMLDivElement>(null);
  const [selectedClass, setSelectedClass] = useState<(typeof classes)[number]>("Class 10");
  const [subject, setSubject] = useState<(typeof subjects)[number]>("Science");
  const [coverage, setCoverage] = useState("Full syllabus");
  const [assignmentType, setAssignmentType] = useState<(typeof assignmentTypes)[number]>("Homework assignment");
  const [difficulty, setDifficulty] = useState<(typeof difficultyLevels)[number]>("Balanced");
  const [totalMarks, setTotalMarks] = useState(30);
  const [durationDays, setDurationDays] = useState(7);
  const [includeRubric, setIncludeRubric] = useState(true);
  const [skills, setSkills] = useState<string[]>(["Concept understanding", "Written explanation"]);
  const [assignment, setAssignment] = useState<GeneratedAssignment | null>(null);
  const [assignmentSignature, setAssignmentSignature] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationProgress, setGenerationProgress] = useState(0);
  const [actionMessage, setActionMessage] = useState("Choose assignment details, then generate a fresh AI assignment.");
  const [savedAssignmentAvailable, setSavedAssignmentAvailable] = useState(false);

  const currentSignature = useMemo(
    () =>
      JSON.stringify({
        selectedClass,
        subject,
        coverage,
        assignmentType,
        difficulty,
        totalMarks,
        durationDays,
        includeRubric,
        skills,
      }),
    [assignmentType, coverage, difficulty, durationDays, includeRubric, selectedClass, skills, subject, totalMarks],
  );

  const isAiGenerated = Boolean(assignment && assignmentSignature === currentSignature);
  const generatedMarks = assignment?.tasks.reduce((sum, task) => sum + task.marks, 0) || totalMarks;

  const assignmentText = [
    assignment?.title || `${subject} Assignment`,
    `${selectedClass} | ${coverage} | ${assignmentType} | ${difficulty}`,
    `Marks: ${generatedMarks} | Completion time: ${durationDays} days`,
    "",
    assignment?.brief,
    "",
    "Learning Goals:",
    ...(assignment?.learningGoals.map((item) => `- ${item}`) || []),
    "",
    "Tasks:",
    ...(assignment?.tasks.map((task, index) => `${index + 1}. ${task.title} (${task.marks} marks)\n${task.instructions}`) || []),
    "",
    "Submission Checklist:",
    ...(assignment?.submissionChecklist.map((item) => `- ${item}`) || []),
    includeRubric ? "Rubric:" : "",
    ...(includeRubric ? assignment?.rubric.map((item) => `- ${item}`) || [] : []),
    "",
    assignment?.teacherNote,
    "",
    "Generated with KASA AI Assignment Generator",
  ].filter(Boolean).join("\n");

  const clearGenerated = () => {
    setAssignment(null);
    setAssignmentSignature("");
  };

  const restoreSavedAssignment = () => {
    try {
      const raw = window.localStorage.getItem(storageKey);
      if (!raw) return false;
      const saved = JSON.parse(raw) as Partial<SavedAssignment>;
      if (!saved.assignment) return false;
      setSelectedClass(saved.selectedClass || "Class 10");
      setSubject(saved.subject || "Science");
      setCoverage(saved.coverage || "Full syllabus");
      setAssignmentType(saved.assignmentType || "Homework assignment");
      setDifficulty(saved.difficulty || "Balanced");
      setTotalMarks(clamp(Number(saved.totalMarks), 10, 100));
      setDurationDays(clamp(Number(saved.durationDays), 1, 30));
      setIncludeRubric(Boolean(saved.includeRubric));
      setSkills(Array.isArray(saved.skills) && saved.skills.length ? saved.skills : ["Concept understanding"]);
      setAssignment(saved.assignment);
      setAssignmentSignature(saved.signature || "");
      setSavedAssignmentAvailable(true);
      setActionMessage("Last generated AI assignment restored.");
      return true;
    } catch {
      return false;
    }
  };

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      const restored = restoreSavedAssignment();
      if (!restored) setSavedAssignmentAvailable(Boolean(window.localStorage.getItem(storageKey)));
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
    }, 380);
    return () => window.clearInterval(intervalId);
  }, [isGenerating]);

  const updateSubject = (nextSubject: (typeof subjects)[number]) => {
    setSubject(nextSubject);
    setCoverage("Full syllabus");
    clearGenerated();
  };

  const toggleSkill = (skill: string) => {
    setSkills((current) => {
      if (current.includes(skill)) return current.length === 1 ? current : current.filter((item) => item !== skill);
      return [...current, skill];
    });
    clearGenerated();
  };

  const reset = () => {
    setSelectedClass("Class 10");
    setSubject("Science");
    setCoverage("Full syllabus");
    setAssignmentType("Homework assignment");
    setDifficulty("Balanced");
    setTotalMarks(30);
    setDurationDays(7);
    setIncludeRubric(true);
    setSkills(["Concept understanding", "Written explanation"]);
    clearGenerated();
    setGenerationProgress(0);
    setActionMessage("Choose assignment details, then generate a fresh AI assignment.");
  };

  const generateAssignment = async () => {
    setGenerationProgress(8);
    setIsGenerating(true);
    setActionMessage("Generating a classroom-ready AI assignment...");
    try {
      const response = await fetch("/api/tools/assignment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          selectedClass,
          subject,
          coverage,
          assignmentType,
          difficulty,
          totalMarks,
          durationDays,
          includeRubric,
          skills,
        }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(typeof data?.error === "string" ? data.error : "AI assignment generation failed.");
      if (!data.assignment) throw new Error("AI did not return a usable assignment.");
      setGenerationProgress(96);
      setAssignment(data.assignment);
      setAssignmentSignature(currentSignature);
      window.localStorage.setItem(
        storageKey,
        JSON.stringify({
          selectedClass,
          subject,
          coverage,
          assignmentType,
          difficulty,
          totalMarks,
          durationDays,
          includeRubric,
          skills,
          assignment: data.assignment,
          signature: currentSignature,
        } satisfies SavedAssignment),
      );
      setSavedAssignmentAvailable(true);
      setActionMessage(
        typeof data.remaining === "number"
          ? `Assignment generated successfully. ${data.remaining} free generations left today.`
          : "Assignment generated successfully.",
      );
      window.setTimeout(() => resultPanelRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 450);
    } catch (error) {
      setActionMessage(error instanceof Error ? error.message : "AI assignment generation failed. Please try again.");
    } finally {
      setGenerationProgress(100);
      window.setTimeout(() => setIsGenerating(false), 350);
    }
  };

  const copyAssignment = async () => {
    if (!isAiGenerated) {
      setActionMessage("Generate the AI assignment first, then copy it.");
      return;
    }
    try {
      await navigator.clipboard.writeText(assignmentText);
      setActionMessage("Assignment copied.");
    } catch {
      setActionMessage("Copy was blocked. Use download or print instead.");
    }
  };

  const downloadAssignment = () => {
    if (!isAiGenerated) {
      setActionMessage("Generate the AI assignment first, then download it.");
      return;
    }
    const blob = new Blob([assignmentText], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "kasa-ai-assignment.txt";
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
    setActionMessage("Assignment downloaded.");
  };

  const printAssignment = () => {
    if (!isAiGenerated || !assignment) {
      setActionMessage("Generate the AI assignment first, then print it.");
      return;
    }
    const printHtml = `
      <!doctype html>
      <html>
        <head>
          <meta charset="utf-8" />
          <title>${assignment.title}</title>
          <style>
            body { margin: 0; padding: 32px; color: #071b3a; font-family: Arial, Helvetica, sans-serif; }
            main { max-width: 840px; margin: 0 auto; }
            h1 { margin: 0 0 8px; text-align: center; font-size: 28px; }
            .meta { text-align: center; color: #475569; margin-bottom: 24px; line-height: 1.6; }
            section { break-inside: avoid; border: 1px solid #d7e7f6; border-radius: 14px; padding: 16px; margin: 14px 0; }
            h2 { margin: 0 0 8px; font-size: 18px; }
            p, li { line-height: 1.6; color: #334155; }
            .task { border-top: 1px solid #e2ecf6; padding: 12px 0; }
            .marks { float: right; font-weight: 700; color: #475569; }
            .footer { margin-top: 28px; border-top: 1px solid #d7e7f6; padding-top: 12px; color: #64748b; font-size: 12px; }
          </style>
        </head>
        <body>
          <main>
            <h1>${assignment.title}</h1>
            <div class="meta">${selectedClass} | ${subject} | ${coverage}<br />${assignmentType} | ${difficulty} | ${generatedMarks} marks | ${durationDays} days</div>
            <section><h2>Assignment Brief</h2><p>${assignment.brief}</p></section>
            <section><h2>Learning Goals</h2><ul>${assignment.learningGoals.map((item) => `<li>${item}</li>`).join("")}</ul></section>
            <section><h2>Tasks</h2>${assignment.tasks.map((task, index) => `<div class="task"><strong>${index + 1}. ${task.title}</strong><span class="marks">${task.marks} marks</span><p>${task.instructions}</p></div>`).join("")}</section>
            <section><h2>Submission Checklist</h2><ul>${assignment.submissionChecklist.map((item) => `<li>${item}</li>`).join("")}</ul></section>
            ${includeRubric ? `<section><h2>Rubric</h2><ul>${assignment.rubric.map((item) => `<li>${item}</li>`).join("")}</ul></section>` : ""}
            <section><h2>Teacher Note</h2><p>${assignment.teacherNote}</p></section>
            <div class="footer">Generated with KASA AI Assignment Generator</div>
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
    setActionMessage("Print dialog opened with only the AI assignment.");
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
                AI assignment setup
              </p>
              <h2 className="mt-2 font-heading text-3xl font-semibold text-slate-950 dark:text-white">
                Build an assignment
              </h2>
              <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">
                Create homework, project work, practice tasks, rubrics, and submission checklists.
              </p>
            </div>
            <button type="button" onClick={reset} className="grid size-10 cursor-pointer place-items-center rounded-full border border-blue-950/10 bg-white text-slate-700 shadow-sm transition hover:border-primary/35 hover:text-primary dark:border-white/10 dark:bg-white/7 dark:text-white" aria-label="Reset generator" title="Reset generator">
              <RotateCcw className="size-4" aria-hidden="true" />
            </button>
          </div>

          <div className="mt-6 grid gap-4">
            <ChoiceGrid label="Class" value={selectedClass} options={classes} onChange={(value) => { setSelectedClass(value); clearGenerated(); }} />
            <ChoiceGrid label="Subject" value={subject} options={subjects} onChange={updateSubject} />
            <label className="rounded-[1.1rem] border border-blue-950/10 bg-white/82 p-4 shadow-sm shadow-blue-950/5 dark:border-white/10 dark:bg-white/[0.04]">
              <span className="text-sm font-semibold text-slate-800 dark:text-slate-100">Syllabus coverage</span>
              <span className="mt-1 block text-xs leading-5 text-slate-500 dark:text-slate-400">Use full syllabus or add exact chapters, units, or topic names.</span>
              <input value={coverage} onChange={(event) => { setCoverage(event.target.value); clearGenerated(); }} className="mt-3 h-12 w-full rounded-xl border border-blue-950/10 bg-white px-3 text-base font-semibold text-slate-950 outline-none transition focus:border-primary/45 dark:border-white/10 dark:bg-slate-950/55 dark:text-white" />
              <div className="mt-3 flex flex-wrap gap-2">
                {coveragePresets.map((preset) => <Chip key={preset} active={coverage === preset} onClick={() => { setCoverage(preset); clearGenerated(); }}>{preset}</Chip>)}
              </div>
            </label>
            <div className="grid gap-4 sm:grid-cols-2">
              <ChoiceGrid label="Assignment type" value={assignmentType} options={assignmentTypes} onChange={(value) => { setAssignmentType(value); clearGenerated(); }} />
              <ChoiceGrid label="Difficulty" value={difficulty} options={difficultyLevels} onChange={(value) => { setDifficulty(value); clearGenerated(); }} />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <RangeField label="Total marks" value={totalMarks} setValue={(value) => { setTotalMarks(value); clearGenerated(); }} min={10} max={100} step={5} suffix="marks" presets={[20, 30, 50, 80, 100]} />
              <RangeField label="Completion time" value={durationDays} setValue={(value) => { setDurationDays(value); clearGenerated(); }} min={1} max={30} step={1} suffix="days" presets={[1, 3, 5, 7, 14]} />
            </div>
            <MultiChoice label="Skills to assess" selected={skills} options={skillOptions} onToggle={toggleSkill} />
            <ToggleCard label="Include rubric" value={includeRubric} onChange={(value) => { setIncludeRubric(value); clearGenerated(); }} />
            <button type="button" onClick={generateAssignment} disabled={isGenerating} className="inline-flex min-h-12 cursor-pointer items-center justify-center gap-2 rounded-full bg-[image:var(--button-solid)] px-5 py-3 text-sm font-semibold !text-white shadow-lg shadow-blue-950/12 transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:translate-y-0">
              <Sparkles className="size-4" aria-hidden="true" />
              {isGenerating ? "Generating AI assignment..." : "Generate assignment with AI"}
            </button>
          </div>
        </div>

        <div ref={resultPanelRef} className="scroll-mt-28 rounded-[1.25rem] border border-blue-950/10 bg-white/94 p-5 shadow-2xl shadow-blue-950/12 backdrop-blur dark:border-white/10 dark:bg-surface/92 sm:p-7">
          <div className="rounded-[1.1rem] border border-blue-950/10 bg-[linear-gradient(135deg,#f7fbff_0%,#eef8f3_100%)] p-5 dark:border-white/10 dark:bg-none dark:bg-white/[0.05]">
            <div className="flex flex-wrap items-start justify-between gap-5">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary dark:text-emerald-200">AI assignment</p>
                <h3 className="mt-3 font-heading text-3xl font-semibold leading-tight text-slate-950 sm:text-4xl dark:text-white">{isAiGenerated && assignment ? assignment.title : `${subject} assignment`}</h3>
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{selectedClass} · {assignmentType} · {generatedMarks} marks · {durationDays} days</p>
              </div>
              <span className="rounded-full bg-emerald-50 px-3 py-2 text-sm font-semibold text-emerald-700 dark:bg-emerald-400/10 dark:text-emerald-200">{isAiGenerated ? "AI generated" : "Ready"}</span>
            </div>
          </div>

          <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <Metric label="Subject" value={subject} />
            <Metric label="Marks" value={`${generatedMarks}`} />
            <Metric label="Time" value={`${durationDays} days`} />
            <Metric label="Tasks" value={`${assignment?.tasks.length || 0}`} />
          </div>

          <div className="mt-6 rounded-[1.1rem] border border-blue-950/10 bg-white p-4 dark:border-white/10 dark:bg-white/[0.05]">
            <div className="mb-3 text-sm font-semibold text-slate-950 dark:text-white">Assignment preview</div>
            {isAiGenerated && assignment ? (
              <div className="overflow-hidden rounded-2xl border border-blue-950/10 bg-[#fbfdff] shadow-sm shadow-blue-950/6 dark:border-white/10 dark:bg-slate-950/35">
                <div className="border-b border-blue-950/10 bg-white p-5 dark:border-white/10 dark:bg-white/[0.04]">
                  <div className="text-xs font-semibold uppercase tracking-[0.16em] text-primary dark:text-emerald-200">Student assignment brief</div>
                  <h3 className="mt-2 font-heading text-2xl font-semibold text-slate-950 dark:text-white">{assignment.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-700 dark:text-slate-200">{assignment.brief}</p>
                </div>
                <div className="grid gap-4 p-4 md:grid-cols-2">
                  <ListBlock title="Learning goals" items={assignment.learningGoals} tone="green" />
                  <ListBlock title="Submission checklist" items={assignment.submissionChecklist} tone="blue" />
                  <div className="rounded-xl border border-blue-950/10 bg-white p-4 dark:border-white/10 dark:bg-white/[0.04] md:col-span-2">
                    <div className="font-semibold text-slate-950 dark:text-white">Tasks</div>
                    <div className="mt-3 grid gap-3">
                      {assignment.tasks.map((task, index) => (
                        <div key={`${task.title}-${index}`} className="rounded-lg bg-slate-50 p-3 text-sm dark:bg-white/[0.05]">
                          <div className="flex gap-3 font-semibold text-slate-950 dark:text-white"><span>{index + 1}.</span><span>{task.title}</span><span className="ml-auto shrink-0 text-slate-500 dark:text-slate-300">{task.marks}m</span></div>
                          <p className="mt-2 leading-6 text-slate-700 dark:text-slate-200">{task.instructions}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                  {includeRubric ? <ListBlock title="Rubric" items={assignment.rubric} tone="amber" /> : null}
                  <div className="rounded-xl border border-blue-950/10 bg-white p-4 dark:border-white/10 dark:bg-white/[0.04]">
                    <div className="font-semibold text-slate-950 dark:text-white">Teacher note</div>
                    <p className="mt-2 text-sm leading-6 text-slate-700 dark:text-slate-200">{assignment.teacherNote}</p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="grid min-h-[22rem] place-items-center rounded-xl border border-dashed border-blue-950/15 bg-slate-50 p-6 text-center dark:border-white/15 dark:bg-slate-950/35">
                <div className="max-w-md">
                  <div className="mx-auto grid size-12 place-items-center rounded-full bg-emerald-50 text-emerald-700 dark:bg-emerald-400/10 dark:text-emerald-200"><Sparkles className="size-5" aria-hidden="true" /></div>
                  <h3 className="mt-4 font-heading text-2xl font-semibold text-slate-950 dark:text-white">Your AI assignment will appear here.</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">Click generate to create a brief, tasks, checklist, marks, and rubric.</p>
                </div>
              </div>
            )}
          </div>

          <div className="mt-6 rounded-[1.1rem] border border-blue-950/10 bg-blue-50/70 p-4 dark:border-white/10 dark:bg-white/[0.05]">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <div className="text-sm font-semibold text-slate-950 dark:text-white">Save or share this assignment</div>
                <p className="mt-1 text-xs leading-5 text-slate-600 dark:text-slate-300">{actionMessage}</p>
              </div>
              <div className="flex flex-wrap gap-2">
                {!isAiGenerated && savedAssignmentAvailable ? <ActionButton label="Restore last" icon={Sparkles} onClick={restoreSavedAssignment} /> : null}
                <ActionButton label="Copy" icon={Copy} onClick={copyAssignment} disabled={!isAiGenerated} />
                <ActionButton label="Print" icon={Printer} onClick={printAssignment} disabled={!isAiGenerated} />
                <ActionButton label="Download" icon={Download} onClick={downloadAssignment} disabled={!isAiGenerated} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ChoiceGrid<T extends string>({ label, value, options, onChange }: { label: string; value: T; options: readonly T[]; onChange: (value: T) => void }) {
  return <div className="rounded-[1.1rem] border border-blue-950/10 bg-white/82 p-4 shadow-sm shadow-blue-950/5 dark:border-white/10 dark:bg-white/[0.04]"><div className="text-sm font-semibold text-slate-800 dark:text-slate-100">{label}</div><div className="mt-3 flex flex-wrap gap-2">{options.map((option) => <Chip key={option} active={value === option} onClick={() => onChange(option)}>{option}</Chip>)}</div></div>;
}

function MultiChoice({ label, selected, options, onToggle }: { label: string; selected: string[]; options: readonly string[]; onToggle: (value: string) => void }) {
  return <div className="rounded-[1.1rem] border border-blue-950/10 bg-white/82 p-4 shadow-sm shadow-blue-950/5 dark:border-white/10 dark:bg-white/[0.04]"><div className="text-sm font-semibold text-slate-800 dark:text-slate-100">{label}</div><div className="mt-3 flex flex-wrap gap-2">{options.map((option) => <Chip key={option} active={selected.includes(option)} onClick={() => onToggle(option)}>{selected.includes(option) ? <CheckCircle2 className="size-3.5" aria-hidden="true" /> : null}{option}</Chip>)}</div></div>;
}

function Chip({ active, onClick, children }: { active: boolean; onClick: () => void; children: ReactNode }) {
  return <button type="button" onClick={onClick} className={`inline-flex cursor-pointer items-center gap-2 rounded-full border px-3 py-2 text-sm font-semibold transition ${active ? "border-emerald-500 bg-emerald-50 text-emerald-800 dark:border-emerald-300 dark:bg-emerald-300 dark:text-slate-950" : "border-blue-950/10 bg-white text-slate-700 hover:border-emerald-300 hover:text-emerald-700 dark:border-white/10 dark:bg-white/7 dark:text-slate-200"}`}>{children}</button>;
}

function RangeField({ label, value, setValue, min, max, step, suffix, presets }: { label: string; value: number; setValue: (value: number) => void; min: number; max: number; step: number; suffix: string; presets: readonly number[] }) {
  return <div className="rounded-[1.1rem] border border-blue-950/10 bg-white/82 p-4 shadow-sm shadow-blue-950/5 dark:border-white/10 dark:bg-white/[0.04]"><div className="flex items-center justify-between gap-3"><span className="text-sm font-semibold text-slate-800 dark:text-slate-100">{label}</span><span className="rounded-full bg-emerald-50 px-3 py-1 text-sm font-semibold text-emerald-700 dark:bg-emerald-400/10 dark:text-emerald-200">{value} {suffix}</span></div><input type="range" min={min} max={max} step={step} value={value} onChange={(event) => setValue(clamp(Number(event.target.value), min, max))} className="mt-4 h-2 w-full cursor-pointer accent-[#22b573] dark:accent-[#58c98a]" /><div className="mt-3 flex flex-wrap gap-2">{presets.map((preset) => <Chip key={preset} active={value === preset} onClick={() => setValue(clamp(preset, min, max))}>{preset}</Chip>)}</div></div>;
}

function ToggleCard({ label, value, onChange }: { label: string; value: boolean; onChange: (value: boolean) => void }) {
  return <button type="button" onClick={() => onChange(!value)} className={`flex cursor-pointer items-center justify-between rounded-[1.1rem] border p-4 text-left transition ${value ? "border-emerald-300 bg-emerald-50 text-emerald-800 dark:border-emerald-300/50 dark:bg-emerald-400/10 dark:text-emerald-100" : "border-blue-950/10 bg-white text-slate-700 dark:border-white/10 dark:bg-white/[0.04] dark:text-slate-200"}`}><span className="font-semibold">{label}</span><span className="text-sm font-semibold">{value ? "Yes" : "No"}</span></button>;
}

function Metric({ label, value }: { label: string; value: string }) {
  return <div className="min-w-0 rounded-[1.1rem] border border-blue-950/10 bg-white p-4 shadow-sm shadow-blue-950/5 dark:border-white/10 dark:bg-white/[0.05]"><div className="flex items-center justify-between gap-3"><div className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">{label}</div><ClipboardList className="size-4 shrink-0 text-primary dark:text-emerald-300" aria-hidden="true" /></div><div className="mt-3 min-w-0 break-words text-[1.12rem] font-semibold leading-snug text-slate-950 dark:text-white" title={value}>{value}</div></div>;
}

function ListBlock({ title, items, tone = "blue" }: { title: string; items: string[]; tone?: "green" | "amber" | "blue" }) {
  const styles = {
    green: "border-emerald-200 bg-emerald-50/70 dark:border-emerald-300/25 dark:bg-emerald-400/10",
    amber: "border-amber-200 bg-amber-50/70 dark:border-amber-300/25 dark:bg-amber-400/10",
    blue: "border-blue-950/10 bg-blue-50/70 dark:border-white/10 dark:bg-white/[0.04]",
  }[tone];
  return <div className={`rounded-xl border p-4 ${styles}`}><div className="font-semibold text-slate-950 dark:text-white">{title}</div><div className="mt-3 grid gap-2">{items.map((item) => <div key={item} className="rounded-lg bg-white px-3 py-2 text-sm leading-6 text-slate-700 dark:bg-white/[0.05] dark:text-slate-200">{item}</div>)}</div></div>;
}

function GenerationOverlay({ progress }: { progress: number }) {
  const stage = progress < 35 ? "Reading assignment setup" : progress < 72 ? "Writing classroom tasks" : progress < 94 ? "Balancing marks and rubric" : "Preparing preview";
  return <div className="fixed inset-0 z-[90] grid place-items-center bg-slate-950/58 px-4 backdrop-blur-sm"><div className="w-full max-w-lg rounded-[1.4rem] border border-white/18 bg-white p-6 shadow-2xl shadow-slate-950/30 dark:bg-slate-950 dark:!text-white"><div className="flex items-center gap-4"><div className="relative grid size-14 place-items-center rounded-full bg-emerald-50 text-emerald-700 dark:bg-emerald-400/12 dark:text-emerald-200"><Sparkles className="size-6 animate-pulse" aria-hidden="true" /><span className="absolute inset-0 rounded-full border-2 border-emerald-300/70 border-t-transparent animate-spin" /></div><div><div className="font-heading text-2xl font-semibold text-slate-950 dark:!text-white">Generating AI assignment</div><p className="mt-1 text-sm text-slate-600 dark:text-slate-300">{stage}...</p></div></div><div className="mt-6 flex items-center justify-between gap-3 text-xs font-semibold uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400"><span>AI generation</span><span>{Math.round(progress)}%</span></div><div className="mt-3 h-3 overflow-hidden rounded-full bg-slate-200 shadow-inner dark:bg-white/12"><div className="h-full rounded-full bg-[image:var(--button-solid)] transition-[width] duration-500" style={{ width: `${clamp(progress, 0, 100)}%` }} /></div><p className="mt-4 text-sm leading-6 text-slate-600 dark:text-slate-300">Creating brief, tasks, marks, checklist, and rubric.</p></div></div>;
}

function ActionButton({ label, icon: Icon, onClick, disabled = false }: { label: string; icon: typeof Copy; onClick: () => void; disabled?: boolean }) {
  return <button type="button" onClick={onClick} disabled={disabled} className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-blue-950/10 bg-white px-3 py-2 text-xs font-semibold text-slate-700 shadow-sm shadow-blue-950/5 transition hover:border-primary/35 hover:text-primary disabled:cursor-not-allowed disabled:opacity-45 dark:border-white/10 dark:bg-white/[0.06] dark:text-slate-200 dark:hover:text-white"><Icon className="size-3.5" aria-hidden="true" />{label}</button>;
}
