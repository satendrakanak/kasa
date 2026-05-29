"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  BarChart3,
  ChevronDown,
  CheckCircle2,
  Copy,
  Download,
  FileText,
  FileUser,
  LayoutTemplate,
  LoaderCircle,
  Palette,
  Printer,
  RotateCcw,
  Search,
  Share2,
  Sparkles,
  UploadCloud,
  X,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { ToolToast, type ToolToastState } from "@/components/tools/tool-toast";

const builderStorageKey = "kasa-ai-resume-builder:last";
const atsDraftKey = "kasa-ai-resume-builder:draft";
const resumeBuilderAtsHandoffKey = "kasa-resume-builder:ats-handoff";

const roleFamilies = [
  "Software Engineering",
  "Data & AI",
  "Product & Design",
  "Cloud & DevOps",
  "Cybersecurity",
  "Business & Marketing",
  "Finance & Operations",
] as const;

const templates = [
  { id: "modern", label: "Modern ATS", accent: "#12347c", description: "Clean two-column feel, ATS-safe headings." },
  { id: "classic", label: "Classic Pro", accent: "#0f766e", description: "Traditional recruiter-friendly structure." },
  { id: "compact", label: "Compact Impact", accent: "#7c3aed", description: "Dense layout for experienced profiles." },
] as const;

const tones = ["Confident", "Senior", "Fresher friendly", "Concise", "Achievement focused"] as const;

const starterSkills = ["JavaScript", "React", "Node.js", "SQL", "Python", "Excel", "Power BI", "AWS", "Git", "Figma", "Marketing", "Communication"];

const roleOptions = [
  "Frontend Developer",
  "Backend Developer",
  "Full Stack Developer",
  "React Developer",
  "Next.js Developer",
  "Angular Developer",
  "Vue.js Developer",
  "HTML CSS Developer",
  "WordPress Developer",
  "PHP Developer",
  "Laravel Developer",
  "Java Developer",
  "Python Developer",
  "C++ Developer",
  ".NET Developer",
  "Golang Developer",
  "Node.js Developer",
  "MERN Stack Developer",
  "Android Developer",
  "iOS Developer",
  "Flutter Developer",
  "React Native Developer",
  "Software Engineer",
  "Software Architect",
  "Engineering Manager",
  "Data Analyst",
  "Business Analyst",
  "Data Scientist",
  "Data Engineer",
  "Machine Learning Engineer",
  "AI Engineer",
  "Cloud Engineer",
  "DevOps Engineer",
  "QA Engineer",
  "Cybersecurity Analyst",
  "UI/UX Designer",
  "Product Designer",
  "Product Manager",
  "Project Manager",
  "Digital Marketing Executive",
  "SEO Executive",
  "Content Writer",
  "Finance Analyst",
  "Accountant",
  "HR Executive",
  "Recruiter",
  "Operations Executive",
  "Sales Development Representative",
  "Customer Support Executive",
  "Teacher",
  "Academic Counselor",
] as const;

type UploadedResume = {
  name: string;
  mimeType: string;
  data: string;
  size: number;
  text?: string;
};

type ResumeSection = {
  title: string;
  company?: string;
  location?: string;
  period?: string;
  bullets: string[];
};

type BuiltResume = {
  candidateName: string;
  headline: string;
  contactLine: string;
  professionalSummary: string;
  skills: string[];
  experience: ResumeSection[];
  projects: ResumeSection[];
  education: ResumeSection[];
  achievements: string[];
  certifications: string[];
  atsScoreEstimate: number;
  keywordCoverage: number;
  recruiterFit: string;
  templateAdvice: string;
  improvementNotes: string[];
};

type AtsDraft = {
  resumeText?: string;
  uploadedResume?: UploadedResume | null;
  candidateName?: string;
  targetRole?: string;
  roleFamily?: string;
  yearsExperience?: number;
  selectedSkills?: string[];
  customSkill?: string;
  analysis?: {
    atsScore?: number;
    missingKeywords?: string[];
    missingSkills?: string[];
    improvedBullets?: string[];
    weakAreas?: string[];
    quickWins?: string[];
  };
};

type SavedBuilder = {
  resumeText: string;
  uploadedResume: UploadedResume | null;
  candidateName: string;
  targetRole: string;
  roleFamily: string;
  yearsExperience: number;
  selectedSkills: string[];
  customSkill: string;
  template: string;
  tone: string;
  jobDescription: string;
  atsContext: AtsDraft["analysis"] | null;
  resume: BuiltResume;
};

const clamp = (value: number, min: number, max: number) => Math.min(Math.max(Number.isFinite(value) ? value : min, min), max);

export function AiResumeBuilder() {
  const previewRef = useRef<HTMLDivElement>(null);
  const [resumeText, setResumeText] = useState("");
  const [uploadedResume, setUploadedResume] = useState<UploadedResume | null>(null);
  const [candidateName, setCandidateName] = useState("Candidate");
  const [targetRole, setTargetRole] = useState("Frontend Developer");
  const [roleFamily, setRoleFamily] = useState<(typeof roleFamilies)[number]>("Software Engineering");
  const [yearsExperience, setYearsExperience] = useState(0);
  const [selectedSkills, setSelectedSkills] = useState<string[]>(["JavaScript", "React", "Git"]);
  const [customSkill, setCustomSkill] = useState("");
  const [template, setTemplate] = useState<(typeof templates)[number]["id"]>("modern");
  const [tone, setTone] = useState<(typeof tones)[number]>("Confident");
  const [jobDescription, setJobDescription] = useState("");
  const [atsContext, setAtsContext] = useState<AtsDraft["analysis"] | null>(null);
  const [resume, setResume] = useState<BuiltResume | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [downloadOpen, setDownloadOpen] = useState(false);
  const [actionMessage, setActionMessage] = useState("Upload a resume, paste text, or add profile details to build your resume.");
  const [savedAvailable, setSavedAvailable] = useState(false);
  const [toast, setToast] = useState<ToolToastState>(null);

  const notify = useCallback((type: NonNullable<ToolToastState>["type"], title: string, message: string) => {
    setToast({ id: Date.now(), type, title, message });
  }, []);

  const activeTemplate = templates.find((item) => item.id === template) || templates[0];
  const resumeWords = useMemo(() => resumeText.trim().split(/\s+/).filter(Boolean).length, [resumeText]);
  const skillText = useMemo(() => uniqueList([...selectedSkills, ...customSkill.split(",").map((item) => item.trim())], 32).join(", "), [customSkill, selectedSkills]);
  const hasSource = Boolean(uploadedResume || resumeText.trim().length >= 250 || atsContext?.improvedBullets?.length);

  useEffect(() => {
    if (!isGenerating) return;
    const intervalId = window.setInterval(() => {
      setProgress((value) => {
        if (value < 35) return Math.min(value + 7, 35);
        if (value < 78) return Math.min(value + 4, 78);
        return Math.min(value + 2, 94);
      });
    }, 420);
    return () => window.clearInterval(intervalId);
  }, [isGenerating]);

  const restoreSavedBuilder = useCallback((saved: Partial<SavedBuilder>, message = "Saved resume restored.") => {
    if (!saved.resume) return;
    setResumeText(saved.resumeText || "");
    setUploadedResume(saved.uploadedResume || null);
    setCandidateName(saved.candidateName || "Candidate");
    setTargetRole(saved.targetRole || "Frontend Developer");
    if (roleFamilies.includes(saved.roleFamily as (typeof roleFamilies)[number])) setRoleFamily(saved.roleFamily as (typeof roleFamilies)[number]);
    setYearsExperience(clamp(Number(saved.yearsExperience), 0, 25));
    setSelectedSkills(Array.isArray(saved.selectedSkills) ? saved.selectedSkills : []);
    setCustomSkill(saved.customSkill || "");
    if (templates.some((item) => item.id === saved.template)) setTemplate(saved.template as (typeof templates)[number]["id"]);
    if (tones.includes(saved.tone as (typeof tones)[number])) setTone(saved.tone as (typeof tones)[number]);
    setJobDescription(saved.jobDescription || "");
    setAtsContext(saved.atsContext || null);
    setResume(saved.resume);
    setSavedAvailable(true);
    setActionMessage(message);
    notify("success", "Resume restored", message);
  }, [notify]);

  useEffect(() => {
    const atsRaw = window.localStorage.getItem(atsDraftKey);
    if (atsRaw) {
      const draft = parseJson<AtsDraft>(atsRaw);
      if (draft) {
        setResumeText(draft.resumeText || "");
        setUploadedResume(draft.uploadedResume || null);
        setCandidateName(draft.candidateName || deriveNameFromResume(draft.uploadedResume?.name) || "Candidate");
        setTargetRole(draft.targetRole || "Frontend Developer");
        if (draft.roleFamily && roleFamilies.includes(draft.roleFamily as (typeof roleFamilies)[number])) setRoleFamily(draft.roleFamily as (typeof roleFamilies)[number]);
        setYearsExperience(clamp(Number(draft.yearsExperience), 0, 25));
        setSelectedSkills(uniqueList([...(draft.selectedSkills || []), ...(draft.customSkill || "").split(",")], 24));
        setAtsContext(draft.analysis || null);
        setActionMessage("ATS report connected. Review the template and build your improved resume.");
        notify("success", "ATS report connected", "Builder is prefilled from your ATS checker result.");
        window.localStorage.removeItem(atsDraftKey);
        return;
      }
    }

    const savedRaw = window.localStorage.getItem(builderStorageKey);
    setSavedAvailable(Boolean(savedRaw));
    if (!savedRaw) return;
    const saved = parseJson<Partial<SavedBuilder>>(savedRaw);
    if (saved?.resume) restoreSavedBuilder(saved);
  }, [notify, restoreSavedBuilder]);

  const clearGenerated = () => {
    if (resume) setActionMessage("Inputs changed. Build a fresh resume for the updated profile.");
    setResume(null);
  };

  const handleFileUpload = (file: File | undefined) => {
    if (!file) return;
    const mimeType = getSupportedMimeType(file);
    if (!mimeType) {
      setActionMessage("Upload a PDF, DOC, DOCX, or TXT resume file.");
      notify("error", "Unsupported file", "Upload a PDF, DOC, DOCX, or TXT resume file.");
      return;
    }
    if (file.size > 4_000_000) {
      setActionMessage("Please upload a resume under 4 MB.");
      notify("error", "File too large", "Please upload a resume under 4 MB.");
      return;
    }
    setUploadProgress(8);
    const reader = new FileReader();
    reader.onprogress = (event) => {
      if (event.lengthComputable) setUploadProgress(Math.min(95, Math.round((event.loaded / event.total) * 95)));
    };
    reader.onload = async () => {
      const raw = String(reader.result || "");
      const base64 = raw.includes(",") ? raw.split(",")[1] || "" : raw;
      const extractedText = await extractReadableTextFromUpload(file, mimeType);
      setUploadedResume({ name: file.name, mimeType, data: base64, size: file.size, text: extractedText || undefined });
      if (extractedText.length >= 250) setResumeText(extractedText);
      setCandidateName(deriveNameFromResume(file.name) || candidateName);
      setUploadProgress(100);
      clearGenerated();
      setActionMessage("Resume uploaded. Choose template and build the AI resume.");
      window.setTimeout(() => setUploadProgress(0), 600);
    };
    reader.onerror = () => {
      setUploadProgress(0);
      setActionMessage("Resume upload failed. Try another file.");
      notify("error", "Upload failed", "Resume upload failed. Try another file.");
    };
    reader.readAsDataURL(file);
  };

  const toggleSkill = (skill: string) => {
    setSelectedSkills((items) => {
      const normalized = normalizeSkill(skill);
      if (items.some((item) => normalizeSkill(item) === normalized)) return items.filter((item) => normalizeSkill(item) !== normalized);
      return uniqueList([...items, skill], 24);
    });
    clearGenerated();
  };

  const restoreLast = () => {
    const saved = parseJson<Partial<SavedBuilder>>(window.localStorage.getItem(builderStorageKey) || "");
    if (!saved?.resume) {
      setActionMessage("No saved resume found yet.");
      notify("error", "Nothing saved", "Build a resume once, then restore will appear here.");
      return;
    }
    restoreSavedBuilder(saved);
  };

  const reset = () => {
    setResumeText("");
    setUploadedResume(null);
    setCandidateName("Candidate");
    setTargetRole("Frontend Developer");
    setRoleFamily("Software Engineering");
    setYearsExperience(0);
    setSelectedSkills(["JavaScript", "React", "Git"]);
    setCustomSkill("");
    setTemplate("modern");
    setTone("Confident");
    setJobDescription("");
    setAtsContext(null);
    setResume(null);
    setProgress(0);
    setUploadProgress(0);
    setActionMessage("Upload a resume, paste text, or add profile details to build your resume.");
  };

  const buildResume = async () => {
    const effectiveResumeText = resumeText.trim() || uploadedResume?.text || "";
    const attachFile = shouldAttachResumeFile(uploadedResume, effectiveResumeText);
    if (!hasSource && candidateName.trim().toLowerCase() === "candidate") {
      setActionMessage("Add your name and either upload/paste a resume or connect an ATS report.");
      notify("error", "Profile needed", "Add your name and either upload/paste a resume or connect an ATS report.");
      return;
    }
    setIsGenerating(true);
    setProgress(8);
    setActionMessage("Building an ATS-friendly resume...");
    try {
      const response = await fetch("/api/tools/resume-builder", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          resumeText: effectiveResumeText,
          fileData: attachFile ? uploadedResume?.data : undefined,
          fileMimeType: attachFile ? uploadedResume?.mimeType : undefined,
          fileName: uploadedResume?.name,
          candidateName,
          targetRole,
          roleFamily,
          yearsExperience,
          currentSkills: skillText || "Not specified",
          template: activeTemplate.label,
          tone,
          jobDescription,
          atsContext,
        }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(typeof data?.error === "string" ? data.error : "AI resume builder failed.");
      if (!data.resume) throw new Error("AI did not return a usable resume.");
      setProgress(96);
      setResume(data.resume);
      window.localStorage.setItem(
        builderStorageKey,
        JSON.stringify({
          resumeText,
          uploadedResume,
          candidateName,
          targetRole,
          roleFamily,
          yearsExperience,
          selectedSkills,
          customSkill,
          template,
          tone,
          jobDescription,
          atsContext,
          resume: data.resume,
        } satisfies SavedBuilder),
      );
      setSavedAvailable(true);
      const message = typeof data.remaining === "number" ? `Resume built. ${data.remaining} free AI generations left today.` : "Resume built.";
      setActionMessage(message);
      notify("success", "Resume built", message);
      window.setTimeout(() => previewRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 100);
    } catch (error) {
      const message = error instanceof Error ? error.message : "AI resume builder failed. Please try again.";
      setActionMessage(message);
      notify("error", "Build failed", message);
    } finally {
      setProgress(100);
      window.setTimeout(() => {
        setIsGenerating(false);
        setProgress(0);
      }, 450);
    }
  };

  const copyResume = async () => {
    if (!resume) return;
    try {
      await navigator.clipboard.writeText(createPlainResume(resume));
      setActionMessage("Resume copied.");
      notify("success", "Copied", "Resume copied to clipboard.");
    } catch {
      setActionMessage("Copy was blocked. Use print or download instead.");
      notify("error", "Copy blocked", "Your browser blocked clipboard access.");
    }
  };

  const printResume = () => {
    if (!resume) return;
    const url = URL.createObjectURL(createResumePdf(resume));
    const frame = document.createElement("iframe");
    frame.style.position = "fixed";
    frame.style.right = "0";
    frame.style.bottom = "0";
    frame.style.width = "0";
    frame.style.height = "0";
    frame.style.border = "0";
    document.body.appendChild(frame);
    frame.onload = () => {
      const frameWindow = frame.contentWindow;
      if (!frameWindow) {
        frame.remove();
        URL.revokeObjectURL(url);
        setActionMessage("Print was blocked. Please try again.");
        notify("error", "Print blocked", "Print was blocked. Please try again.");
        return;
      }
      frameWindow.focus();
      frameWindow.addEventListener("afterprint", () => {
        frame.remove();
        URL.revokeObjectURL(url);
      }, { once: true });
      window.setTimeout(() => {
        frameWindow.print();
        window.setTimeout(() => {
          frame.remove();
          URL.revokeObjectURL(url);
        }, 4000);
      }, 350);
    };
    frame.onerror = () => {
      frame.remove();
      URL.revokeObjectURL(url);
      setActionMessage("Print was blocked. Please try again.");
      notify("error", "Print blocked", "Print was blocked. Please try again.");
    };
    frame.src = url;
    setActionMessage("Print view opened.");
    notify("success", "Print view opened", "Resume PDF print view opened.");
  };

  const shareResume = async () => {
    if (!resume) return;
    const shareUrl = `${window.location.origin}/tools/ai-resume-builder`;
    const shareTitle = `${resume.candidateName}'s AI-built resume`;
    const shareText = `Built an ATS-friendly resume for ${resume.candidateName} as ${resume.headline}. Try KASA AI Resume Builder: ${shareUrl}`;
    const pdfFile = new File([createResumePdf(resume)], `${slugify(resume.candidateName || targetRole)}-ai-resume.pdf`, { type: "application/pdf" });
    try {
      if (navigator.canShare?.({ files: [pdfFile] }) && navigator.share) {
        await navigator.share({ title: shareTitle, text: shareText, url: shareUrl, files: [pdfFile] });
        setActionMessage("Resume PDF shared.");
        notify("success", "Shared", "Resume PDF shared successfully.");
        return;
      }
      if (navigator.share) {
        await navigator.share({ title: shareTitle, text: shareText, url: shareUrl });
        setActionMessage("Resume builder link shared.");
        notify("success", "Link shared", "Resume builder link shared successfully.");
        return;
      }
      await navigator.clipboard.writeText(shareText);
      setActionMessage("Share text copied.");
      notify("success", "Share text copied", "Direct sharing is not supported, so the share text was copied.");
    } catch {
      setActionMessage("Share was cancelled or blocked.");
      notify("error", "Share blocked", "Sharing was cancelled or blocked by the browser.");
    }
  };

  const checkResumeInAts = () => {
    if (!resume) return;
    window.localStorage.setItem(
      resumeBuilderAtsHandoffKey,
      JSON.stringify({
        source: "ai-resume-builder",
        resumeText: createPlainResume(resume),
        candidateName: resume.candidateName,
        targetRole: resume.headline.split("|")[0]?.trim() || targetRole,
        roleFamily,
        selectedSkills: resume.skills.slice(0, 12),
        savedAt: new Date().toISOString(),
      }),
    );
    window.location.href = "/tools/resume-ats-checker?source=ai-resume-builder";
  };

  const downloadResume = (format: "pdf" | "doc" | "txt") => {
    if (!resume) return;
    const baseName = `${slugify(resume.candidateName || targetRole)}-ai-resume`;
    const blob =
      format === "pdf"
        ? createResumePdf(resume)
        : format === "doc"
          ? new Blob([createPrintableResume(resume, activeTemplate)], { type: "application/msword;charset=utf-8" })
          : new Blob([createPlainResume(resume)], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${baseName}.${format}`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
    setDownloadOpen(false);
    setActionMessage(`Resume ${format.toUpperCase()} downloaded.`);
    notify("success", "Downloaded", `Resume ${format.toUpperCase()} downloaded.`);
  };

  return (
    <section className="relative px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto grid w-full max-w-[108rem] gap-5 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="rounded-[1.25rem] border border-blue-950/10 bg-white/92 p-5 shadow-xl shadow-blue-950/8 backdrop-blur dark:border-white/10 dark:bg-surface/90 sm:p-7">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-primary dark:text-emerald-200">Resume studio</p>
              <h2 className="mt-2 font-heading text-3xl font-semibold text-slate-950 dark:text-white">Build your resume</h2>
              <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">Start direct, upload an old resume, or continue from ATS checker.</p>
            </div>
            <button type="button" onClick={reset} className="grid size-10 cursor-pointer place-items-center rounded-full border border-blue-950/10 bg-white text-slate-700 shadow-sm transition hover:border-primary/35 hover:text-primary dark:border-white/10 dark:bg-white/7 dark:text-white" aria-label="Reset resume builder">
              <RotateCcw className="size-4" aria-hidden="true" />
            </button>
          </div>

          {atsContext ? (
            <div className="mt-5 rounded-[1.1rem] border border-emerald-200 bg-emerald-50/80 p-4 text-sm leading-6 text-emerald-900 dark:border-emerald-300/20 dark:bg-emerald-400/10 dark:text-emerald-100">
              <div className="flex items-start gap-2">
                <CheckCircle2 className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
                <span>ATS checker connected. Missing keywords and improved bullets will be applied automatically.</span>
              </div>
            </div>
          ) : null}

          <div className="mt-6 grid gap-4">
            <div className="rounded-[1.2rem] border border-dashed border-primary/25 bg-[linear-gradient(135deg,rgba(43,168,255,0.08),rgba(34,181,115,0.08))] p-5 text-center dark:border-emerald-300/25 dark:bg-white/[0.04]">
              <div className="mx-auto grid size-14 place-items-center rounded-2xl bg-white text-primary shadow-sm dark:bg-white/10 dark:text-emerald-200">
                <UploadCloud className="size-7" aria-hidden="true" />
              </div>
              <h3 className="mt-4 font-heading text-2xl font-semibold text-slate-950 dark:text-white">Upload or paste your old resume</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">PDF, DOC, DOCX, TXT, or plain text. Direct users can also start with only profile details.</p>
              <div className="mt-4 flex flex-wrap justify-center gap-2">
                <label className="inline-flex h-11 cursor-pointer items-center gap-2 rounded-full bg-[image:var(--button-solid)] px-5 text-sm font-semibold !text-white shadow-lg shadow-primary/15 transition hover:-translate-y-0.5">
                  <UploadCloud className="size-4" aria-hidden="true" />
                  Choose resume
                  <input type="file" accept=".pdf,.doc,.docx,.txt,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,text/plain" onChange={(event) => { handleFileUpload(event.target.files?.[0]); event.currentTarget.value = ""; }} className="sr-only" />
                </label>
                {uploadedResume ? (
                  <button type="button" onClick={() => { setUploadedResume(null); clearGenerated(); }} className="inline-flex h-11 cursor-pointer items-center gap-2 rounded-full border border-blue-950/10 bg-white px-4 text-sm font-semibold text-slate-700 transition hover:border-rose-300 hover:text-rose-600 dark:border-white/10 dark:bg-white/7 dark:text-slate-200">
                    <X className="size-4" aria-hidden="true" />
                    Remove
                  </button>
                ) : null}
                {savedAvailable ? (
                  <button type="button" onClick={restoreLast} className="inline-flex h-11 cursor-pointer items-center gap-2 rounded-full border border-blue-950/10 bg-white px-4 text-sm font-semibold text-slate-700 transition hover:border-primary/35 hover:text-primary dark:border-white/10 dark:bg-white/7 dark:text-slate-200">
                    <Sparkles className="size-4" aria-hidden="true" />
                    Restore last
                  </button>
                ) : null}
              </div>
              {uploadProgress > 0 ? (
                <div className="mx-auto mt-4 max-w-md">
                  <div className="flex items-center justify-between gap-3 text-xs font-semibold uppercase tracking-[0.14em] text-slate-500"><span>Uploading</span><span>{uploadProgress}%</span></div>
                  <div className="mt-2 h-2 overflow-hidden rounded-full bg-slate-200"><div className="h-full rounded-full bg-[image:var(--button-solid)]" style={{ width: `${uploadProgress}%` }} /></div>
                </div>
              ) : null}
              {uploadedResume ? (
                <div className="mx-auto mt-4 max-w-md rounded-xl border border-emerald-200 bg-white/82 px-4 py-3 text-left text-sm dark:border-emerald-300/20 dark:bg-white/[0.06]">
                  <div className="font-semibold text-slate-950 dark:text-white">{uploadedResume.name}</div>
                  <div className="mt-1 text-xs text-slate-500 dark:text-slate-400">{formatFileSize(uploadedResume.size)} · ready for AI resume building</div>
                </div>
              ) : null}
            </div>

            <label className="rounded-[1.1rem] border border-blue-950/10 bg-white/82 p-4 shadow-sm shadow-blue-950/5 dark:border-white/10 dark:bg-white/[0.04]">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <span className="text-sm font-semibold text-slate-800 dark:text-slate-100">Paste resume text</span>
                <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-slate-600 dark:bg-white/[0.06] dark:text-slate-300">{resumeWords} words</span>
              </div>
              <textarea
                value={resumeText}
                onChange={(event) => { setResumeText(event.target.value); clearGenerated(); }}
                rows={5}
                placeholder="Paste your resume text here..."
                className="mt-3 w-full resize-y rounded-xl border border-blue-950/10 bg-blue-50/60 px-4 py-3 text-sm font-medium leading-6 text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-primary/50 dark:border-white/10 dark:bg-white/[0.06] dark:text-white"
              />
            </label>

            <div className="grid gap-4 sm:grid-cols-2">
              <TextField label="Name" value={candidateName} onChange={(value) => { setCandidateName(value); clearGenerated(); }} icon={FileUser} />
              <SearchSelect label="Target role" value={targetRole} onChange={(value) => { setTargetRole(value); clearGenerated(); }} options={roleOptions} />
              <SelectField label="Role family" value={roleFamily} options={roleFamilies} onChange={(value) => { setRoleFamily(value as (typeof roleFamilies)[number]); clearGenerated(); }} />
              <NumberField label="Experience" value={yearsExperience} onChange={(value) => { setYearsExperience(value); clearGenerated(); }} suffix={yearsExperience === 1 ? " year" : " years"} />
            </div>

            <div className="rounded-[1.1rem] border border-blue-950/10 bg-white/82 p-4 shadow-sm shadow-blue-950/5 dark:border-white/10 dark:bg-white/[0.04]">
              <div className="flex items-center gap-2 text-sm font-semibold text-slate-800 dark:text-slate-100">
                <BarChart3 className="size-4 text-primary dark:text-emerald-200" aria-hidden="true" />
                Skills to highlight
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                {starterSkills.map((skill) => {
                  const active = selectedSkills.some((item) => normalizeSkill(item) === normalizeSkill(skill));
                  return (
                    <button key={skill} type="button" onClick={() => toggleSkill(skill)} className={`cursor-pointer rounded-full border px-3 py-2 text-sm font-semibold transition ${active ? "border-emerald-500 bg-emerald-50 text-emerald-800 dark:border-emerald-300 dark:bg-emerald-300 dark:text-slate-950" : "border-blue-950/10 bg-white text-slate-700 hover:border-emerald-300 hover:text-emerald-700 dark:border-white/10 dark:bg-white/7 dark:text-slate-200"}`}>
                      {skill}
                    </button>
                  );
                })}
              </div>
              <input
                value={customSkill}
                onChange={(event) => { setCustomSkill(event.target.value); clearGenerated(); }}
                placeholder="Add more skills: Spring Boot, Docker, SEO, Tableau..."
                className="mt-4 h-12 w-full rounded-xl border border-blue-950/10 bg-blue-50/60 px-4 text-sm font-semibold text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-primary/50 dark:border-white/10 dark:bg-white/[0.06] dark:text-white"
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-[1.1rem] border border-blue-950/10 bg-white/82 p-4 shadow-sm shadow-blue-950/5 dark:border-white/10 dark:bg-white/[0.04]">
                <div className="flex items-center gap-2 text-sm font-semibold text-slate-800 dark:text-slate-100">
                  <LayoutTemplate className="size-4 text-primary dark:text-emerald-200" aria-hidden="true" />
                  Template
                </div>
                <div className="mt-3 grid gap-2">
                  {templates.map((item) => (
                    <button key={item.id} type="button" onClick={() => { setTemplate(item.id); clearGenerated(); }} className={`cursor-pointer rounded-xl border p-3 text-left transition ${template === item.id ? "border-primary bg-blue-50 text-slate-950 dark:border-emerald-300 dark:bg-emerald-300/10 dark:text-white" : "border-blue-950/10 bg-white text-slate-700 hover:border-primary/35 dark:border-white/10 dark:bg-white/7 dark:text-slate-200"}`}>
                      <span className="flex items-center gap-2 text-sm font-semibold"><i className="size-3 rounded-full" style={{ backgroundColor: item.accent }} />{item.label}</span>
                      <span className="mt-1 block text-xs leading-5 text-slate-500 dark:text-slate-400">{item.description}</span>
                    </button>
                  ))}
                </div>
              </div>
              <div className="rounded-[1.1rem] border border-blue-950/10 bg-white/82 p-4 shadow-sm shadow-blue-950/5 dark:border-white/10 dark:bg-white/[0.04]">
                <div className="flex items-center gap-2 text-sm font-semibold text-slate-800 dark:text-slate-100">
                  <Palette className="size-4 text-primary dark:text-emerald-200" aria-hidden="true" />
                  Tone
                </div>
                <div className="mt-3 flex flex-wrap gap-2">
                  {tones.map((item) => (
                    <button key={item} type="button" onClick={() => { setTone(item); clearGenerated(); }} className={`cursor-pointer rounded-full border px-3 py-2 text-sm font-semibold transition ${tone === item ? "border-primary bg-blue-50 text-primary dark:border-emerald-300 dark:bg-emerald-300/10 dark:text-emerald-200" : "border-blue-950/10 bg-white text-slate-700 hover:border-primary/35 dark:border-white/10 dark:bg-white/7 dark:text-slate-200"}`}>
                      {item}
                    </button>
                  ))}
                </div>
                <label className="mt-4 block">
                  <span className="text-sm font-semibold text-slate-800 dark:text-slate-100">Job description optional</span>
                  <textarea
                    value={jobDescription}
                    onChange={(event) => { setJobDescription(event.target.value); clearGenerated(); }}
                    rows={4}
                    placeholder="Paste target JD to tailor keywords..."
                    className="mt-2 w-full resize-y rounded-xl border border-blue-950/10 bg-blue-50/60 px-4 py-3 text-sm font-medium leading-6 text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-primary/50 dark:border-white/10 dark:bg-white/[0.06] dark:text-white"
                  />
                </label>
              </div>
            </div>

            <button type="button" onClick={buildResume} disabled={isGenerating} className="inline-flex min-h-12 cursor-pointer items-center justify-center gap-2 rounded-full bg-[image:var(--button-solid)] px-5 py-3 text-sm font-semibold !text-white shadow-xl shadow-primary/20 transition hover:-translate-y-0.5 disabled:pointer-events-none disabled:opacity-70">
              <Sparkles className="size-4 animate-pulse" aria-hidden="true" />
              Build AI Resume
            </button>
          </div>
        </div>

        <div ref={previewRef} className="rounded-[1.25rem] border border-blue-950/10 bg-white/94 p-5 shadow-2xl shadow-blue-950/12 dark:border-white/10 dark:bg-surface/92 sm:p-7 lg:self-start">
          {resume ? (
            <div className="sticky top-[5.25rem] z-20 -mx-1 mb-5 lg:top-[5.85rem]">
              <ResumeActionBar
                message="Resume ready"
                enabled
                onCopy={copyResume}
                onShare={shareResume}
                onPrint={printResume}
                onDownload={() => setDownloadOpen(true)}
                onCheckAts={checkResumeInAts}
              />
            </div>
          ) : null}
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-primary dark:text-emerald-200">Live preview</p>
              <h3 className="mt-2 font-heading text-3xl font-semibold text-slate-950 dark:text-white">{resume ? "Your AI-built resume" : "Resume preview will appear here"}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">{resume ? resume.recruiterFit : "Clean, readable, and focused on role fit. No noisy builder UI inside the final print."}</p>
            </div>
            <div className="flex flex-wrap gap-2 text-center sm:justify-end">
              <ScorePill label="ATS" value={resume?.atsScoreEstimate ?? 0} />
              <ScorePill label="Keywords" value={resume?.keywordCoverage ?? 0} />
            </div>
          </div>

          {resume ? (
            <div className="mt-5">
              <ResumePreview resume={resume} template={activeTemplate} />
              <div className="mt-5 grid gap-4 md:grid-cols-2">
                <ListCard title="AI improvement notes" items={resume.improvementNotes} />
                <div className="rounded-[1.1rem] border border-blue-950/10 bg-white p-4 dark:border-white/10 dark:bg-white/[0.05]">
                  <div className="font-semibold text-slate-950 dark:text-white">Template advice</div>
                  <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">{resume.templateAdvice}</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="mt-8 rounded-[1.1rem] border border-dashed border-blue-950/15 bg-blue-50/60 p-8 text-center dark:border-white/10 dark:bg-white/[0.05]">
              <div className="mx-auto grid size-12 place-items-center rounded-full bg-emerald-50 text-emerald-700 dark:bg-emerald-400/10 dark:text-emerald-200"><FileText className="size-5" aria-hidden="true" /></div>
              <h3 className="mt-4 font-heading text-2xl font-semibold text-slate-950 dark:text-white">One clean resume, not a confusing form.</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">Add source details on the left and generate a resume when ready.</p>
            </div>
          )}
        </div>
      </div>
      {isGenerating ? <GenerationOverlay progress={progress} /> : null}
      {downloadOpen && resume ? <DownloadModal onClose={() => setDownloadOpen(false)} onDownload={downloadResume} /> : null}
      <ToolToast toast={toast} onClose={() => setToast(null)} />
    </section>
  );
}

function TextField({ label, value, onChange, icon: Icon }: { label: string; value: string; onChange: (value: string) => void; icon: LucideIcon }) {
  return (
    <label className="rounded-[1.1rem] border border-blue-950/10 bg-white/82 p-4 shadow-sm shadow-blue-950/5 dark:border-white/10 dark:bg-white/[0.04]">
      <span className="flex items-center gap-2 text-sm font-semibold text-slate-800 dark:text-slate-100"><Icon className="size-4 text-primary dark:text-emerald-200" aria-hidden="true" />{label}</span>
      <input value={value} onChange={(event) => onChange(event.target.value)} className="mt-3 h-11 w-full rounded-xl border border-blue-950/10 bg-blue-50/60 px-4 text-sm font-semibold text-slate-950 outline-none transition focus:border-primary/50 dark:border-white/10 dark:bg-white/[0.06] dark:text-white" />
    </label>
  );
}

function SearchSelect({ label, value, onChange, options }: { label: string; value: string; onChange: (value: string) => void; options: readonly string[] }) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState(value);
  const wrapperRef = useRef<HTMLLabelElement>(null);
  const filteredOptions = useMemo(() => {
    const search = query.trim().toLowerCase();
    if (!search) return options.slice(0, 12);
    return options.filter((option) => option.toLowerCase().includes(search)).slice(0, 12);
  }, [options, query]);
  const canUseTyped = query.trim().length > 1 && !options.some((option) => option.toLowerCase() === query.trim().toLowerCase());

  useEffect(() => {
    setQuery(value);
  }, [value]);

  useEffect(() => {
    if (!open) return;
    const handlePointerDown = (event: PointerEvent) => {
      if (!wrapperRef.current?.contains(event.target as Node)) setOpen(false);
    };
    window.addEventListener("pointerdown", handlePointerDown);
    return () => window.removeEventListener("pointerdown", handlePointerDown);
  }, [open]);

  const choose = (nextValue: string) => {
    const cleanValue = nextValue.replace(/\s+/g, " ").trim();
    if (!cleanValue) return;
    setQuery(cleanValue);
    onChange(cleanValue);
    setOpen(false);
  };

  return (
    <label ref={wrapperRef} className="relative rounded-[1.1rem] border border-blue-950/10 bg-white/82 p-4 shadow-sm shadow-blue-950/5 dark:border-white/10 dark:bg-white/[0.04]">
      <span className="text-sm font-semibold text-slate-800 dark:text-slate-100">{label}</span>
      <div className="relative mt-3">
        <Search className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-primary dark:text-emerald-200" aria-hidden="true" />
        <input
          value={query}
          onFocus={() => setOpen(true)}
          onChange={(event) => {
            setQuery(event.target.value);
            setOpen(true);
          }}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              event.preventDefault();
              choose(filteredOptions[0] || query);
            }
            if (event.key === "Escape") setOpen(false);
          }}
          placeholder="Search role, technology, or position..."
          className="h-11 w-full rounded-xl border border-blue-950/10 bg-blue-50/60 pl-11 pr-11 text-sm font-semibold text-slate-950 outline-none transition focus:border-primary/50 dark:border-white/10 dark:bg-white/[0.06] dark:text-white"
        />
        <button type="button" onClick={() => setOpen((state) => !state)} className="absolute right-2 top-1/2 grid size-8 -translate-y-1/2 cursor-pointer place-items-center rounded-full text-slate-500 transition hover:bg-white hover:text-primary dark:text-slate-300 dark:hover:bg-white/10" aria-label="Show role options">
          <ChevronDown className={`size-4 transition ${open ? "rotate-180" : ""}`} aria-hidden="true" />
        </button>
      </div>
      {open ? (
        <div className="absolute left-4 right-4 top-[6.3rem] z-30 overflow-hidden rounded-2xl border border-blue-950/10 bg-white shadow-2xl shadow-blue-950/15 dark:border-white/10 dark:bg-slate-950">
          <div className="max-h-72 overflow-y-auto p-2">
            {filteredOptions.map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => choose(option)}
                className={`flex w-full cursor-pointer items-center justify-between gap-3 rounded-xl px-3 py-2.5 text-left text-sm font-semibold transition ${value === option ? "bg-emerald-50 text-emerald-800 dark:bg-emerald-400/12 dark:text-emerald-100" : "text-slate-700 hover:bg-blue-50 dark:text-slate-200 dark:hover:bg-white/8"}`}
              >
                <span>{option}</span>
                {value === option ? <CheckCircle2 className="size-4 shrink-0" aria-hidden="true" /> : null}
              </button>
            ))}
            {canUseTyped ? (
              <button type="button" onClick={() => choose(query)} className="mt-1 flex w-full cursor-pointer items-center gap-2 rounded-xl border border-dashed border-primary/25 bg-blue-50/80 px-3 py-2.5 text-left text-sm font-semibold text-primary transition hover:border-primary/50 dark:border-emerald-300/20 dark:bg-emerald-400/10 dark:text-emerald-100">
                <Sparkles className="size-4" aria-hidden="true" />
                Use &quot;{query.trim()}&quot;
              </button>
            ) : null}
            {!filteredOptions.length && !canUseTyped ? <div className="px-3 py-4 text-sm text-slate-500 dark:text-slate-400">Start typing a role name.</div> : null}
          </div>
        </div>
      ) : null}
    </label>
  );
}

function SelectField({ label, value, options, onChange }: { label: string; value: string; options: readonly string[]; onChange: (value: string) => void }) {
  return (
    <label className="rounded-[1.1rem] border border-blue-950/10 bg-white/82 p-4 shadow-sm shadow-blue-950/5 dark:border-white/10 dark:bg-white/[0.04]">
      <span className="text-sm font-semibold text-slate-800 dark:text-slate-100">{label}</span>
      <select value={value} onChange={(event) => onChange(event.target.value)} className="mt-3 h-11 w-full cursor-pointer rounded-xl border border-blue-950/10 bg-blue-50/60 px-4 text-sm font-semibold text-slate-950 outline-none transition focus:border-primary/50 dark:border-white/10 dark:bg-white/[0.06] dark:text-white">
        {options.map((item) => <option key={item} value={item}>{item}</option>)}
      </select>
    </label>
  );
}

function NumberField({ label, value, onChange, suffix }: { label: string; value: number; onChange: (value: number) => void; suffix: string }) {
  return (
    <label className="rounded-[1.1rem] border border-blue-950/10 bg-white/82 p-4 shadow-sm shadow-blue-950/5 dark:border-white/10 dark:bg-white/[0.04]">
      <span className="text-sm font-semibold text-slate-800 dark:text-slate-100">{label}</span>
      <div className="mt-3 flex items-center gap-2">
        <input type="number" min={0} max={25} value={value} onChange={(event) => onChange(clamp(Number(event.target.value), 0, 25))} className="h-11 w-full rounded-xl border border-blue-950/10 bg-blue-50/60 px-4 text-sm font-semibold text-slate-950 outline-none transition focus:border-primary/50 dark:border-white/10 dark:bg-white/[0.06] dark:text-white" />
        <span className="shrink-0 rounded-full bg-blue-50 px-3 py-2 text-xs font-semibold text-slate-600 dark:bg-white/[0.06] dark:text-slate-300">{suffix}</span>
      </div>
    </label>
  );
}

function ActionButton({ label, icon: Icon, onClick, disabled }: { label: string; icon: LucideIcon; onClick: () => void; disabled?: boolean }) {
  return (
    <button type="button" onClick={onClick} disabled={disabled} className="inline-flex h-10 min-w-[6.15rem] shrink-0 cursor-pointer items-center justify-center gap-2 rounded-full border border-blue-950/10 bg-white px-3 text-xs font-semibold text-slate-700 shadow-sm shadow-blue-950/5 transition hover:border-primary/35 hover:text-primary disabled:pointer-events-none disabled:opacity-45 dark:border-white/10 dark:bg-white/7 dark:text-slate-200">
      <Icon className={`size-4 ${label.includes("ATS") ? "animate-pulse" : ""}`} aria-hidden="true" />
      {label}
    </button>
  );
}

function ResumeActionBar({
  message,
  enabled,
  onCopy,
  onShare,
  onPrint,
  onDownload,
  onCheckAts,
  compact = false,
}: {
  message: string;
  enabled: boolean;
  onCopy: () => void;
  onShare: () => void;
  onPrint: () => void;
  onDownload: () => void;
  onCheckAts: () => void;
  compact?: boolean;
}) {
  return (
    <div className={`rounded-[1.1rem] border border-sky-200 bg-[linear-gradient(135deg,#f8fcff_0%,#edf7ff_52%,#eefcf5_100%)] shadow-xl shadow-blue-950/12 ring-1 ring-white/80 dark:border-emerald-300/20 dark:bg-[linear-gradient(135deg,rgba(12,24,48,0.98),rgba(14,42,35,0.96))] ${compact ? "p-3" : "p-3"}`}>
      <div className="flex items-center gap-3">
        {compact ? null : <p className="hidden shrink-0 rounded-full border border-emerald-200 bg-white px-3 py-2 text-xs font-bold uppercase tracking-[0.12em] text-emerald-800 shadow-sm dark:border-emerald-300/20 dark:bg-white/8 dark:text-emerald-100 lg:inline-flex">{message}</p>}
        <div className="flex min-w-0 flex-1 flex-nowrap justify-end gap-2 overflow-x-auto pb-1">
          <ActionButton label="ATS Check" icon={Sparkles} onClick={onCheckAts} disabled={!enabled} />
          <ActionButton label="Copy" icon={Copy} onClick={onCopy} disabled={!enabled} />
          <ActionButton label="Share" icon={Share2} onClick={onShare} disabled={!enabled} />
          <ActionButton label="Print" icon={Printer} onClick={onPrint} disabled={!enabled} />
          <ActionButton label="Download" icon={Download} onClick={onDownload} disabled={!enabled} />
        </div>
      </div>
    </div>
  );
}

function ScorePill({ label, value }: { label: string; value: number }) {
  return (
    <div className="min-w-28 rounded-xl border border-blue-950/10 bg-white px-4 py-3 shadow-sm shadow-blue-950/5 dark:border-white/10 dark:bg-white/[0.06]">
      <div className="text-2xl font-semibold text-slate-950 dark:text-white">{value}</div>
      <div className="mt-0.5 text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">{label}</div>
    </div>
  );
}

function DownloadModal({ onClose, onDownload }: { onClose: () => void; onDownload: (format: "pdf" | "doc" | "txt") => void }) {
  return (
    <div className="fixed inset-0 z-[80] grid place-items-center bg-slate-950/55 px-4 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-[1.25rem] border border-white/20 bg-white p-5 shadow-2xl shadow-slate-950/25 dark:bg-slate-950">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary dark:text-emerald-200">Download resume</p>
            <h3 className="mt-2 font-heading text-2xl font-semibold text-slate-950 dark:text-white">Choose a format</h3>
          </div>
          <button type="button" onClick={onClose} className="grid size-9 cursor-pointer place-items-center rounded-full border border-blue-950/10 text-slate-500 transition hover:border-rose-300 hover:text-rose-600 dark:border-white/10 dark:text-slate-300" aria-label="Close download options">
            <X className="size-4" aria-hidden="true" />
          </button>
        </div>
        <div className="mt-5 grid gap-3">
          <button type="button" onClick={() => onDownload("pdf")} className="flex cursor-pointer items-center justify-between gap-4 rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-left transition hover:border-emerald-400 dark:border-emerald-300/20 dark:bg-emerald-400/10">
            <span><strong className="block text-slate-950 dark:text-white">PDF</strong><span className="mt-1 block text-sm text-slate-600 dark:text-slate-300">Best for job applications and sharing.</span></span>
            <Download className="size-5 text-emerald-700 dark:text-emerald-200" aria-hidden="true" />
          </button>
          <button type="button" onClick={() => onDownload("doc")} className="flex cursor-pointer items-center justify-between gap-4 rounded-xl border border-blue-950/10 bg-white p-4 text-left transition hover:border-primary/35 dark:border-white/10 dark:bg-white/[0.06]">
            <span><strong className="block text-slate-950 dark:text-white">DOC</strong><span className="mt-1 block text-sm text-slate-600 dark:text-slate-300">Editable in Word or Google Docs.</span></span>
            <FileText className="size-5 text-primary dark:text-emerald-200" aria-hidden="true" />
          </button>
          <button type="button" onClick={() => onDownload("txt")} className="flex cursor-pointer items-center justify-between gap-4 rounded-xl border border-blue-950/10 bg-white p-4 text-left transition hover:border-primary/35 dark:border-white/10 dark:bg-white/[0.06]">
            <span><strong className="block text-slate-950 dark:text-white">TXT</strong><span className="mt-1 block text-sm text-slate-600 dark:text-slate-300">Plain text for forms and quick edits.</span></span>
            <Copy className="size-5 text-primary dark:text-emerald-200" aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
  );
}

function GenerationOverlay({ progress }: { progress: number }) {
  return (
    <div className="fixed inset-0 z-[70] grid place-items-center bg-slate-950/55 px-4 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-[1.35rem] border border-white/20 bg-white p-6 text-center shadow-2xl shadow-slate-950/25 dark:bg-slate-950">
        <div className="mx-auto grid size-14 place-items-center rounded-2xl bg-[image:var(--button-solid)] !text-white">
          <LoaderCircle className="size-7 animate-spin" aria-hidden="true" />
        </div>
        <h3 className="mt-4 font-heading text-2xl font-semibold text-slate-950 dark:text-white">Building your AI resume</h3>
        <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">Extracting your old resume, improving bullets, matching keywords, and formatting the preview.</p>
        <div className="mt-5 h-3 overflow-hidden rounded-full bg-slate-200 dark:bg-white/12">
          <div className="h-full rounded-full bg-[image:var(--button-solid)] transition-all duration-500" style={{ width: `${clamp(progress, 0, 100)}%` }} />
        </div>
        <div className="mt-3 text-xs font-semibold uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">{Math.round(clamp(progress, 0, 100))}% complete</div>
      </div>
    </div>
  );
}

function ResumePreview({ resume, template }: { resume: BuiltResume; template: (typeof templates)[number] }) {
  const compact = template.id === "compact";
  return (
    <article className="mx-auto min-h-[54rem] max-w-[52rem] bg-white p-8 text-slate-950 shadow-xl shadow-blue-950/10 ring-1 ring-blue-950/10 dark:bg-white dark:text-slate-950">
      <header className={compact ? "border-b pb-4" : "border-b-4 pb-5"} style={{ borderColor: template.accent }}>
        <h2 className="font-heading text-4xl font-semibold leading-tight">{resume.candidateName}</h2>
        <p className="mt-2 text-lg font-semibold" style={{ color: template.accent }}>{resume.headline}</p>
        <p className="mt-2 text-sm text-slate-600">{resume.contactLine}</p>
      </header>
      <section className="mt-5">
        <ResumeHeading title="Summary" accent={template.accent} />
        <p className="mt-2 text-sm leading-6 text-slate-700">{resume.professionalSummary}</p>
      </section>
      <section className="mt-5">
        <ResumeHeading title="Skills" accent={template.accent} />
        <div className="mt-2 flex flex-wrap gap-2">
          {resume.skills.map((skill) => <span key={skill} className="border border-slate-200 px-2.5 py-1 text-xs font-semibold text-slate-700">{skill}</span>)}
        </div>
      </section>
      <ResumeSectionGroup title="Experience" items={resume.experience} accent={template.accent} />
      <ResumeSectionGroup title="Projects" items={resume.projects} accent={template.accent} />
      <ResumeSectionGroup title="Education" items={resume.education} accent={template.accent} />
      {resume.achievements.length ? <BulletGroup title="Achievements" items={resume.achievements} accent={template.accent} /> : null}
      {resume.certifications.length ? <BulletGroup title="Certifications" items={resume.certifications} accent={template.accent} /> : null}
    </article>
  );
}

function ResumeHeading({ title, accent }: { title: string; accent: string }) {
  return <h3 className="text-sm font-extrabold uppercase tracking-[0.14em]" style={{ color: accent }}>{title}</h3>;
}

function ResumeSectionGroup({ title, items, accent }: { title: string; items: ResumeSection[]; accent: string }) {
  if (!items.length) return null;
  return (
    <section className="mt-5">
      <ResumeHeading title={title} accent={accent} />
      <div className="mt-3 grid gap-4">
        {items.map((item, index) => (
          <div key={`${item.title}-${index}`}>
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <div>
                <div className="font-semibold text-slate-950">{item.title}</div>
                {[item.company, item.location].filter(Boolean).length ? <div className="text-sm text-slate-600">{[item.company, item.location].filter(Boolean).join(" · ")}</div> : null}
              </div>
              {item.period ? <div className="text-xs font-semibold uppercase tracking-[0.1em] text-slate-500">{item.period}</div> : null}
            </div>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-sm leading-6 text-slate-700">
              {item.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}

function BulletGroup({ title, items, accent }: { title: string; items: string[]; accent: string }) {
  return (
    <section className="mt-5">
      <ResumeHeading title={title} accent={accent} />
      <ul className="mt-2 list-disc space-y-1 pl-5 text-sm leading-6 text-slate-700">
        {items.map((item) => <li key={item}>{item}</li>)}
      </ul>
    </section>
  );
}

function ListCard({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="rounded-[1.1rem] border border-blue-950/10 bg-white p-4 dark:border-white/10 dark:bg-white/[0.05]">
      <div className="font-semibold text-slate-950 dark:text-white">{title}</div>
      <ul className="mt-3 space-y-2 text-sm leading-6 text-slate-600 dark:text-slate-300">
        {items.map((item) => (
          <li key={item} className="flex gap-2">
            <CheckCircle2 className="mt-1 size-4 shrink-0 text-emerald-600 dark:text-emerald-300" aria-hidden="true" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function getSupportedMimeType(file: File) {
  const name = file.name.toLowerCase();
  if (file.type === "application/pdf" || name.endsWith(".pdf")) return "application/pdf";
  if (file.type === "application/msword" || name.endsWith(".doc")) return "application/msword";
  if (file.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document" || name.endsWith(".docx")) return "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
  if (file.type.startsWith("text/") || name.endsWith(".txt")) return "text/plain";
  return "";
}

function shouldAttachResumeFile(resumeFile: UploadedResume | null | undefined, resumeText: string) {
  if (!resumeFile?.data) return false;
  if (resumeFile.mimeType === "application/msword" && (resumeText.trim().length >= 250 || (resumeFile.text || "").trim().length >= 250)) return false;
  return true;
}

async function extractReadableTextFromUpload(file: File, mimeType: string) {
  const name = file.name.toLowerCase();
  const shouldReadAsText = mimeType === "application/msword" || mimeType === "text/plain" || name.endsWith(".html") || name.endsWith(".htm") || name.endsWith(".rtf");
  if (!shouldReadAsText) return "";
  try {
    const raw = await file.text();
    return normalizeReadableResumeText(raw);
  } catch {
    return "";
  }
}

function normalizeReadableResumeText(raw: string) {
  const looksHtml = /<\/?[a-z][\s\S]*>/i.test(raw);
  const withoutMarkup = looksHtml
    ? raw
        .replace(/<script[\s\S]*?<\/script>/gi, " ")
        .replace(/<style[\s\S]*?<\/style>/gi, " ")
        .replace(/<br\s*\/?>/gi, "\n")
        .replace(/<\/(p|div|li|tr|h[1-6]|section|table)>/gi, "\n")
        .replace(/<[^>]+>/g, " ")
    : raw;
  return withoutMarkup
    .replace(/\\'[0-9a-f]{2}/gi, " ")
    .replace(/[{}\\]/g, " ")
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">")
    .replace(/&quot;/gi, "\"")
    .replace(/&#039;|&#39;/gi, "'")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 14000);
}

function formatFileSize(size: number) {
  if (size < 1024 * 1024) return `${Math.max(1, Math.round(size / 1024))} KB`;
  return `${(size / (1024 * 1024)).toFixed(1)} MB`;
}

function parseJson<T>(raw: string) {
  try {
    return JSON.parse(raw) as T;
  } catch {
    return null;
  }
}

function deriveNameFromResume(fileName?: string) {
  if (!fileName) return "";
  const clean = fileName
    .replace(/\.(pdf|docx?|txt)$/i, "")
    .replace(/resume|cv|ats|latest|final|updated/gi, "")
    .replace(/[_-]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  return clean
    .split(" ")
    .filter(Boolean)
    .slice(0, 4)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
    .join(" ");
}

function normalizeSkill(value: string) {
  return value.toLowerCase().replace(/\bjs\b/g, "javascript").replace(/[^a-z0-9+#.]+/g, " ").trim();
}

function uniqueList(values: string[], max: number) {
  const seen = new Set<string>();
  const output: string[] = [];
  values.forEach((value) => {
    const item = value.trim();
    const key = normalizeSkill(item);
    if (!item || seen.has(key)) return;
    seen.add(key);
    output.push(item);
  });
  return output.slice(0, max);
}

function slugify(value: string) {
  return (value || "resume").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 80) || "resume";
}

function escapeHtml(value: string) {
  return value.replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "\"": "&quot;", "'": "&#39;" })[char] || char);
}

function createPlainResume(resume: BuiltResume) {
  const section = (title: string, rows: string[]) => rows.length ? [`\n${title}`, ...rows].join("\n") : "";
  const sectionRows = (items: ResumeSection[]) => items.flatMap((item) => [
    [item.title, item.company, item.location, item.period].filter(Boolean).join(" | "),
    ...item.bullets.map((bullet) => `- ${bullet}`),
  ]);
  return [
    resume.candidateName,
    resume.headline,
    resume.contactLine,
    "",
    "SUMMARY",
    resume.professionalSummary,
    section("SKILLS", [resume.skills.join(", ")]),
    section("EXPERIENCE", sectionRows(resume.experience)),
    section("PROJECTS", sectionRows(resume.projects)),
    section("EDUCATION", sectionRows(resume.education)),
    section("ACHIEVEMENTS", resume.achievements.map((item) => `- ${item}`)),
    section("CERTIFICATIONS", resume.certifications.map((item) => `- ${item}`)),
  ].filter(Boolean).join("\n");
}

function createResumePdf(resume: BuiltResume) {
  const pageWidth = 595;
  const pageHeight = 842;
  const margin = 46;
  const lineHeight = 14.8;
  const safe = (value: string) => value.replace(/[^\x20-\x7E]/g, " ").replace(/[\\()]/g, "\\$&");
  const wrap = (value: string, maxChars: number) => {
    const words = safe(value).split(/\s+/).filter(Boolean);
    const lines: string[] = [];
    let line = "";
    words.forEach((word) => {
      if (`${line} ${word}`.trim().length > maxChars) {
        if (line) lines.push(line);
        line = word;
      } else {
        line = `${line} ${word}`.trim();
      }
    });
    if (line) lines.push(line);
    return lines;
  };
  const sectionRows = (title: string, rows: string[]) => rows.length ? [`# ${title}`, ...rows] : [];
  const itemRows = (items: ResumeSection[]) => items.flatMap((item) => [
    `> ${[item.title, item.company, item.location, item.period].filter(Boolean).join(" | ")}`,
    ...item.bullets.map((bullet) => `- ${bullet}`),
  ]);
  const rows = [
    `! ${resume.candidateName}`,
    resume.headline,
    resume.contactLine,
    "",
    ...sectionRows("Summary", [resume.professionalSummary]),
    ...sectionRows("Skills", [resume.skills.join(", ")]),
    ...sectionRows("Experience", itemRows(resume.experience)),
    ...sectionRows("Projects", itemRows(resume.projects)),
    ...sectionRows("Education", itemRows(resume.education)),
    ...sectionRows("Achievements", resume.achievements.map((item) => `- ${item}`)),
    ...sectionRows("Certifications", resume.certifications.map((item) => `- ${item}`)),
  ];

  const pages: string[][] = [[]];
  let y = pageHeight - margin;
  rows.forEach((row) => {
    const isName = row.startsWith("! ");
    const isHeading = row.startsWith("# ");
    const maxChars = isName ? 34 : isHeading ? 54 : 86;
    const wrapped = row ? wrap(row.replace(/^! |^# /, ""), maxChars) : [""];
    const needed = wrapped.length * lineHeight + (isHeading ? 10 : row === "" ? 5 : 0);
    if (y - needed < margin) {
      pages.push([]);
      y = pageHeight - margin;
    }
    pages[pages.length - 1].push(row);
    y -= needed;
  });

  const pageObjects: string[] = [];
  const contentObjects: string[] = [];
  pages.forEach((pageRows, pageIndex) => {
    const commands: string[] = [];
    let cursorY = pageHeight - margin;
    const text = (value: string, x: number, size = 10, font = "F1", color = "0.200 0.255 0.333") => {
      commands.push(`BT /${font} ${size} Tf ${color} rg ${x} ${cursorY} Td (${safe(value).slice(0, 160)}) Tj ET`);
    };
    const rowsToDraw = pageIndex === 0 ? pageRows.slice(4) : pageRows;
    if (pageIndex === 0) {
      text(resume.candidateName, margin, 25, "F2", "0.027 0.067 0.122");
      cursorY -= 25;
      wrap(resume.headline, 70).slice(0, 2).forEach((line) => {
        text(line, margin, 11, "F2", "0.086 0.239 0.561");
        cursorY -= 15;
      });
      wrap(resume.contactLine, 88).slice(0, 2).forEach((line) => {
        text(line, margin, 9.5, "F1", "0.392 0.455 0.545");
        cursorY -= 13;
      });
      cursorY -= 4;
      commands.push(`0.086 0.239 0.561 rg ${margin} ${cursorY} ${pageWidth - margin * 2} 3 re f`);
      cursorY -= 22;
    }
    rowsToDraw.forEach((row) => {
      if (!row) {
        cursorY -= 8;
        return;
      }
      const isName = row.startsWith("! ");
      const isHeading = row.startsWith("# ");
      const isEntry = row.startsWith("> ");
      const clean = row.replace(/^! |^# |^> /, "");
      const wrapped = wrap(clean, isName ? 34 : isHeading ? 54 : 80);
      if (isHeading) {
        cursorY -= 10;
        text(clean.toUpperCase(), margin, 11.5, "F2", "0.086 0.239 0.561");
        cursorY -= lineHeight + 1;
        return;
      }
      wrapped.forEach((line, index) => {
        text(line, margin + (row.startsWith("- ") ? 12 : 0), isName ? 24 : isEntry ? 10.8 : 10.2, isName || isEntry ? "F2" : "F1", isName ? "0.027 0.067 0.122" : isEntry ? "0.027 0.067 0.122" : "0.200 0.255 0.333");
        cursorY -= isName && index === 0 ? 26 : lineHeight;
      });
    });
    const stream = commands.join("\n");
    contentObjects.push(`<< /Length ${new TextEncoder().encode(stream).length} >>\nstream\n${stream}\nendstream`);
  });

  const fontStart = 3 + pages.length * 2;
  pages.forEach((_, index) => {
    const contentObjectNumber = 3 + pages.length + index;
    pageObjects.push(`<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${pageWidth} ${pageHeight}] /Resources << /Font << /F1 ${fontStart} 0 R /F2 ${fontStart + 1} 0 R >> >> /Contents ${contentObjectNumber} 0 R >>`);
  });

  const objects = [
    "<< /Type /Catalog /Pages 2 0 R >>",
    `<< /Type /Pages /Kids [${pages.map((_, index) => `${3 + index} 0 R`).join(" ")}] /Count ${pages.length} >>`,
    ...pageObjects,
    ...contentObjects,
    "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>",
    "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>",
  ];
  let pdf = "%PDF-1.4\n";
  const offsets = [0];
  objects.forEach((object, index) => {
    offsets.push(pdf.length);
    pdf += `${index + 1} 0 obj\n${object}\nendobj\n`;
  });
  const xref = pdf.length;
  pdf += `xref\n0 ${objects.length + 1}\n0000000000 65535 f \n`;
  offsets.slice(1).forEach((offset) => {
    pdf += `${String(offset).padStart(10, "0")} 00000 n \n`;
  });
  pdf += `trailer << /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${xref}\n%%EOF`;
  return new Blob([new TextEncoder().encode(pdf)], { type: "application/pdf" });
}

function createPrintableResume(resume: BuiltResume, template: (typeof templates)[number]) {
  const list = (items: string[]) => items.map((item) => `<li>${escapeHtml(item)}</li>`).join("");
  const chips = resume.skills.map((skill) => `<span>${escapeHtml(skill)}</span>`).join("");
  const sections = (items: ResumeSection[]) => items.map((item) => `
    <div class="entry">
      <div class="row"><strong>${escapeHtml(item.title)}</strong><em>${escapeHtml(item.period || "")}</em></div>
      <p>${escapeHtml([item.company, item.location].filter(Boolean).join(" · "))}</p>
      <ul>${list(item.bullets)}</ul>
    </div>
  `).join("");
  const bulletSection = (title: string, items: string[]) => items.length ? `<section><h2>${title}</h2><ul>${list(items)}</ul></section>` : "";
  return `<!doctype html>
<html>
<head>
  <meta charset="utf-8" />
  <title>${escapeHtml(resume.candidateName)} Resume</title>
  <style>
    @page { size: A4; margin: 12mm; }
    * { box-sizing: border-box; }
    body { margin: 0; color: #111827; font-family: Inter, Arial, sans-serif; background: #fff; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
    main { width: 186mm; margin: 0 auto; padding: 0; background: #fff; }
    header { border-bottom: 4px solid ${template.accent}; padding-bottom: 18px; }
    h1 { margin: 0; font-size: 36px; line-height: 1.05; }
    .headline { margin: 8px 0 0; color: ${template.accent}; font-size: 18px; font-weight: 800; }
    .contact { margin: 8px 0 0; color: #475569; font-size: 13px; }
    section { margin-top: 18px; break-inside: avoid; page-break-inside: avoid; }
    h2 { margin: 0 0 8px; color: ${template.accent}; font-size: 13px; letter-spacing: .14em; text-transform: uppercase; }
    p { margin: 0; color: #334155; font-size: 13px; line-height: 1.55; }
    .skills { display: flex; flex-wrap: wrap; gap: 7px; }
    .skills span { border: 1px solid #dbe3ee; padding: 5px 8px; font-size: 12px; font-weight: 700; }
    .entry { margin-top: 12px; }
    .row { display: flex; justify-content: space-between; gap: 14px; }
    .row strong { font-size: 14px; }
    .row em { color: #64748b; font-size: 11px; font-style: normal; font-weight: 800; letter-spacing: .08em; text-transform: uppercase; }
    ul { margin: 7px 0 0; padding-left: 18px; color: #334155; font-size: 13px; line-height: 1.55; }
  </style>
</head>
<body>
  <main>
    <header>
      <h1>${escapeHtml(resume.candidateName)}</h1>
      <div class="headline">${escapeHtml(resume.headline)}</div>
      <div class="contact">${escapeHtml(resume.contactLine)}</div>
    </header>
    <section><h2>Summary</h2><p>${escapeHtml(resume.professionalSummary)}</p></section>
    <section><h2>Skills</h2><div class="skills">${chips}</div></section>
    <section><h2>Experience</h2>${sections(resume.experience)}</section>
    <section><h2>Projects</h2>${sections(resume.projects)}</section>
    <section><h2>Education</h2>${sections(resume.education)}</section>
    ${bulletSection("Achievements", resume.achievements)}
    ${bulletSection("Certifications", resume.certifications)}
  </main>
</body>
</html>`;
}
