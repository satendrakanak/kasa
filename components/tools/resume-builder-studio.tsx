"use client";

import { useEffect, useMemo, useState, type ReactNode } from "react";
import {
  ArrowLeft,
  ArrowRight,
  BriefcaseBusiness,
  CheckCircle2,
  Copy,
  Download,
  FilePenLine,
  FileText,
  FileUp,
  GraduationCap,
  GripVertical,
  LayoutTemplate,
  LoaderCircle,
  Palette,
  PenLine,
  Plus,
  Printer,
  Save,
  Share2,
  Sparkles,
  Trash2,
  UploadCloud,
  UserRound,
  WandSparkles,
  X,
  type LucideIcon,
} from "lucide-react";
import ThemeToggle from "@/components/theme-toggle";
import { ToolToast, type ToolToastState } from "@/components/tools/tool-toast";

type StudioStage = "templates" | "method" | "editor";
type SectionKey = "header" | "summary" | "experience" | "projects" | "skills" | "education";
type UploadStatus = "idle" | "scanning" | "ready" | "error";

type TemplateId = string;
const resumeBuilderAtsHandoffKey = "kasa-resume-builder:ats-handoff";
type AccentId = "blue" | "green" | "slate" | "purple" | "amber";

type ResumeExperience = {
  id: string;
  role: string;
  company: string;
  location: string;
  period: string;
  bullets: string[];
};

type ResumeProject = {
  id: string;
  name: string;
  stack: string;
  bullets: string[];
};

type ResumeEducation = {
  id: string;
  degree: string;
  school: string;
  period: string;
  location: string;
};

type StudioResume = {
  firstName: string;
  lastName: string;
  headline: string;
  city: string;
  country: string;
  phone: string;
  email: string;
  portfolio: string;
  photoDataUrl: string;
  summary: string;
  skills: string[];
  experience: ResumeExperience[];
  projects: ResumeProject[];
  education: ResumeEducation[];
};

type StudioUploadedResume = {
  name: string;
  mimeType: string;
  data: string;
  size: number;
  text?: string;
};

type StudioUploadState = {
  file: StudioUploadedResume | null;
  status: UploadStatus;
  progress: number;
  message: string;
};

type ApiResumeSection = {
  title: string;
  company?: string;
  location?: string;
  period?: string;
  bullets: string[];
};

type ApiBuiltResume = {
  candidateName: string;
  headline: string;
  contactLine: string;
  professionalSummary: string;
  skills: string[];
  experience: ApiResumeSection[];
  projects: ApiResumeSection[];
  education: ApiResumeSection[];
};

type TemplateOption = {
  id: TemplateId;
  name: string;
  tag: string;
  description: string;
  layout: "One column" | "Two column" | "Compact" | "Photo";
  recommended?: boolean;
  generated?: boolean;
};

const baseTemplates: TemplateOption[] = [
  {
    id: "modern",
    name: "Modern ATS",
    tag: "Best match",
    description: "Clean one-page layout for software, operations, and business roles.",
    layout: "One column",
    recommended: true,
  },
  {
    id: "executive",
    name: "Executive Focus",
    tag: "Leadership",
    description: "Strong profile header for managers, senior developers, and leads.",
    layout: "One column",
    recommended: true,
  },
  {
    id: "compact",
    name: "Compact Impact",
    tag: "Experienced",
    description: "Fits more experience, projects, and skills without looking crowded.",
    layout: "Compact",
  },
  {
    id: "creative",
    name: "Clean Creative",
    tag: "Creative",
    description: "Two-column design for product, marketing, design, and startup roles.",
    layout: "Two column",
  },
  {
    id: "classic",
    name: "Classic Pro",
    tag: "Traditional",
    description: "Formal resume layout for finance, admin, education, and enterprise roles.",
    layout: "One column",
  },
  {
    id: "photo",
    name: "Photo Profile",
    tag: "Optional photo",
    description: "Photo-ready format for roles or regions where a headshot is expected.",
    layout: "Photo",
  },
];

const accentMap: Record<AccentId, { name: string; dot: string; text: string; border: string; bg: string }> = {
  blue: {
    name: "Blue",
    dot: "bg-[#1e4aa8]",
    text: "text-[#173f93]",
    border: "border-[#1e4aa8]",
    bg: "bg-[#eef5ff]",
  },
  green: {
    name: "Green",
    dot: "bg-[#2f7d73]",
    text: "text-[#276b63]",
    border: "border-[#2f7d73]",
    bg: "bg-[#eefaf6]",
  },
  slate: {
    name: "Slate",
    dot: "bg-[#2f3a45]",
    text: "text-[#2f3a45]",
    border: "border-[#2f3a45]",
    bg: "bg-[#f2f5f8]",
  },
  purple: {
    name: "Purple",
    dot: "bg-[#7551d6]",
    text: "text-[#6443c0]",
    border: "border-[#7551d6]",
    bg: "bg-[#f5f1ff]",
  },
  amber: {
    name: "Amber",
    dot: "bg-[#d98922]",
    text: "text-[#a86116]",
    border: "border-[#d98922]",
    bg: "bg-[#fff7e8]",
  },
};

const sectionNav: Array<{ key: SectionKey; label: string; icon: LucideIcon }> = [
  { key: "header", label: "Header", icon: UserRound },
  { key: "summary", label: "Summary", icon: FileText },
  { key: "experience", label: "Experience", icon: BriefcaseBusiness },
  { key: "projects", label: "Projects", icon: FilePenLine },
  { key: "skills", label: "Skills", icon: Sparkles },
  { key: "education", label: "Education", icon: GraduationCap },
];

const blankResume: StudioResume = {
  firstName: "",
  lastName: "",
  headline: "",
  city: "",
  country: "",
  phone: "",
  email: "",
  portfolio: "",
  photoDataUrl: "",
  summary: "",
  skills: [],
  experience: [],
  projects: [],
  education: [],
};

const initialUploadState: StudioUploadState = {
  file: null,
  status: "idle",
  progress: 0,
  message: "PDF, DOC, DOCX, TXT, or RTF",
};

function inputClasses(extra = "") {
  return `w-full rounded-[0.85rem] border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-primary/60 focus:ring-4 focus:ring-primary/10 dark:border-white/10 dark:bg-white/[0.06] dark:text-white ${extra}`;
}

function textareaClasses(extra = "") {
  return `min-h-32 w-full resize-y rounded-[0.85rem] border border-slate-200 bg-white px-4 py-3 text-sm font-medium leading-6 text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-primary/60 focus:ring-4 focus:ring-primary/10 dark:border-white/10 dark:bg-white/[0.06] dark:text-slate-100 ${extra}`;
}

function pillClasses(active: boolean) {
  return active
    ? "border-primary bg-primary text-primary-foreground shadow-lg shadow-primary/20"
    : "border-slate-200 bg-white text-slate-600 hover:border-primary/35 hover:text-primary dark:border-white/10 dark:bg-white/[0.06] dark:text-slate-300";
}

function buildPlainResume(resume: StudioResume) {
  return [
    `${resume.firstName} ${resume.lastName}`,
    resume.headline,
    `${resume.city}, ${resume.country} | ${resume.phone} | ${resume.email}`,
    resume.portfolio,
    "",
    "SUMMARY",
    resume.summary,
    "",
    "SKILLS",
    resume.skills.join(", "),
    "",
    "EXPERIENCE",
    ...resume.experience.flatMap((item) => [
      `${item.role} | ${item.company} | ${item.location} | ${item.period}`,
      ...item.bullets.map((bullet) => `- ${bullet}`),
      "",
    ]),
    "PROJECTS",
    ...resume.projects.flatMap((item) => [
      `${item.name}`,
      item.stack,
      ...item.bullets.map((bullet) => `- ${bullet}`),
      "",
    ]),
    "EDUCATION",
    ...resume.education.map((item) => `${item.degree} | ${item.school} | ${item.location} | ${item.period}`),
  ].join("\n");
}

function mergeUniqueItems(current: string[], incoming: string[]) {
  const seen = new Set<string>();
  return [...current, ...incoming]
    .map((item) => item.trim())
    .filter(Boolean)
    .filter((item) => {
      const key = item.toLowerCase();
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
}

function splitCandidateName(name: string) {
  const parts = name.replace(/\s+/g, " ").trim().split(" ").filter(Boolean);
  return {
    firstName: parts[0] || "",
    lastName: parts.slice(1).join(" "),
  };
}

function parseContactLine(contactLine: string) {
  const parts = contactLine
    .split(/\||•|,/)
    .map((item) => item.trim())
    .filter(Boolean);
  const email = parts.find((item) => /\S+@\S+\.\S+/.test(item)) || "";
  const phone = parts.find((item) => /(\+?\d[\d\s().-]{7,})/.test(item)) || "";
  const portfolio = parts.find((item) => /linkedin|github|https?:\/\//i.test(item)) || "";
  const location = parts.find((item) => item !== email && item !== phone && item !== portfolio) || "";
  const [city = "", country = ""] = location.split("/").join(",").split(",").map((item) => item.trim());
  return { city, country, phone, email, portfolio };
}

function mapApiResumeToStudioResume(apiResume: ApiBuiltResume): StudioResume {
  const { firstName, lastName } = splitCandidateName(apiResume.candidateName);
  const contact = parseContactLine(apiResume.contactLine || "");

  return {
    firstName,
    lastName,
    headline: apiResume.headline || "",
    city: contact.city,
    country: contact.country,
    phone: contact.phone,
    email: contact.email,
    portfolio: contact.portfolio,
    photoDataUrl: "",
    summary: apiResume.professionalSummary || "",
    skills: mergeUniqueItems([], apiResume.skills || []),
    experience: (apiResume.experience || []).map((item, index) => ({
      id: `import-exp-${index}-${Date.now()}`,
      role: item.title || "Role",
      company: item.company || "",
      location: item.location || "",
      period: item.period || "",
      bullets: item.bullets?.length ? item.bullets : ["Add your strongest achievement for this role."],
    })),
    projects: (apiResume.projects || []).map((item, index) => ({
      id: `import-project-${index}-${Date.now()}`,
      name: item.title || "Project",
      stack: item.company || "",
      bullets: item.bullets?.length ? item.bullets : ["Describe your ownership and result."],
    })),
    education: (apiResume.education || []).map((item, index) => ({
      id: `import-edu-${index}-${Date.now()}`,
      degree: item.title || "Education",
      school: item.company || "",
      location: item.location || "",
      period: item.period || "",
    })),
  };
}

function getStudioSupportedMimeType(file: File) {
  const name = file.name.toLowerCase();
  if (file.type === "application/pdf" || name.endsWith(".pdf")) return "application/pdf";
  if (file.type === "application/msword" || name.endsWith(".doc")) return "application/msword";
  if (file.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document" || name.endsWith(".docx")) return "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
  if (file.type === "text/plain" || name.endsWith(".txt") || name.endsWith(".rtf")) return "text/plain";
  return "";
}

function shouldAttachStudioResumeFile(resumeFile: StudioUploadedResume | null | undefined, resumeText: string) {
  if (!resumeFile?.data) return false;
  if (resumeFile.mimeType === "application/msword" && (resumeText.trim().length >= 250 || (resumeFile.text || "").trim().length >= 250)) return false;
  return true;
}

async function extractStudioReadableTextFromUpload(file: File, mimeType: string) {
  const name = file.name.toLowerCase();
  const shouldReadAsText = mimeType === "application/msword" || mimeType === "text/plain" || name.endsWith(".html") || name.endsWith(".htm") || name.endsWith(".rtf");
  if (!shouldReadAsText) return "";
  try {
    const raw = await file.text();
    return normalizeStudioReadableResumeText(raw);
  } catch {
    return "";
  }
}

function normalizeStudioReadableResumeText(raw: string) {
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

function normalizeTemplateOption(template: Partial<TemplateOption>, index: number): TemplateOption {
  const validLayouts: TemplateOption["layout"][] = ["One column", "Two column", "Compact", "Photo"];
  const layout = validLayouts.includes(template.layout as TemplateOption["layout"]) ? template.layout as TemplateOption["layout"] : "One column";
  const name = String(template.name || `AI Template ${index + 1}`).replace(/\s+/g, " ").trim().slice(0, 32);
  return {
    id: template.id || `ai-${name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")}-${Date.now()}-${index}`,
    name,
    tag: String(template.tag || "AI generated").replace(/\s+/g, " ").trim().slice(0, 18),
    description: String(template.description || "Fresh AI-generated resume layout.").replace(/\s+/g, " ").trim().slice(0, 120),
    layout,
    generated: true,
  };
}

function fallbackAiTemplates(existingCount: number): TemplateOption[] {
  const stamp = Date.now();
  const generatedTemplates: TemplateOption[] = [
    {
      id: `ai-minimal-impact-${stamp}`,
      name: "Minimal Impact",
      tag: "AI clean",
      description: "Minimal layout with strong spacing for freshers, analysts, and support roles.",
      layout: "One column",
      generated: true,
    },
    {
      id: `ai-product-story-${stamp}`,
      name: "Product Story",
      tag: "AI modern",
      description: "Two-column resume for product, design, marketing, and startup profiles.",
      layout: "Two column",
      generated: true,
    },
    {
      id: `ai-senior-compact-${stamp}`,
      name: "Senior Compact",
      tag: "AI dense",
      description: "Compact format for experienced profiles with more roles, projects, and skills.",
      layout: "Compact",
      generated: true,
    },
    {
      id: `ai-photo-elegant-${stamp}`,
      name: "Photo Elegant",
      tag: "AI photo",
      description: "Photo-ready profile layout for roles where a headshot is useful.",
      layout: "Photo",
      generated: true,
    },
  ];
  return generatedTemplates.slice(0, Math.max(2, Math.min(4, 10 - existingCount)));
}

function mergeTemplates(current: TemplateOption[], incoming: TemplateOption[]) {
  const seen = new Set(current.map((template) => template.name.trim().toLowerCase()));
  const next = [...current];
  incoming.forEach((template) => {
    const key = template.name.trim().toLowerCase();
    if (!key || seen.has(key)) return;
    seen.add(key);
    next.push(template);
  });
  return next;
}

function hasResumeContent(resume: StudioResume) {
  return Boolean(
    resume.firstName.trim() ||
      resume.lastName.trim() ||
      resume.headline.trim() ||
      resume.email.trim() ||
      resume.summary.trim() ||
      resume.skills.length ||
      resume.experience.length ||
      resume.projects.length ||
      resume.education.length,
  );
}

export function ResumeBuilderStudio() {
  const [stage, setStage] = useState<StudioStage>("templates");
  const [activeSection, setActiveSection] = useState<SectionKey>("header");
  const [selectedTemplate, setSelectedTemplate] = useState<TemplateId>("modern");
  const [studioTemplates, setStudioTemplates] = useState<TemplateOption[]>(baseTemplates);
  const [accent, setAccent] = useState<AccentId>("blue");
  const [resume, setResume] = useState<StudioResume>(blankResume);
  const [uploadState, setUploadState] = useState<StudioUploadState>(initialUploadState);
  const [isImportingResume, setIsImportingResume] = useState(false);
  const [importProgress, setImportProgress] = useState(0);
  const [downloadOpen, setDownloadOpen] = useState(false);
  const [toast, setToast] = useState<ToolToastState>(null);

  const currentTemplate = studioTemplates.find((template) => template.id === selectedTemplate) ?? studioTemplates[0];
  const accentTheme = accentMap[accent];

  const completion = useMemo(() => {
    const filled = [
      resume.firstName,
      resume.lastName,
      resume.headline,
      resume.email,
      resume.summary,
      resume.skills.length > 4 ? "skills" : "",
      resume.experience.length ? "experience" : "",
      resume.education.length ? "education" : "",
    ].filter(Boolean).length;
    return Math.round((filled / 8) * 100);
  }, [resume]);
  const resumeStarted = hasResumeContent(resume);

  const notify = (type: NonNullable<ToolToastState>["type"], title: string, message: string) => {
    setToast({ id: Date.now(), type, title, message });
  };

  useEffect(() => {
    if (!isImportingResume) return;
    const progressStartId = window.setTimeout(() => setImportProgress(12), 0);
    const intervalId = window.setInterval(() => {
      setImportProgress((value) => (value < 82 ? value + 7 : Math.min(value + 2, 94)));
    }, 420);
    return () => {
      window.clearTimeout(progressStartId);
      window.clearInterval(intervalId);
    };
  }, [isImportingResume]);

  const updateResume = <K extends keyof StudioResume>(key: K, value: StudioResume[K]) => {
    setResume((current) => ({ ...current, [key]: value }));
  };

  const importUploadedResume = async () => {
    if (!uploadState.file || uploadState.status !== "ready") {
      notify("error", "Valid resume needed", "Please upload a valid resume before continuing.");
      return;
    }

    setIsImportingResume(true);
    try {
      const resumeText = uploadState.file.text || "";
      const attachFile = shouldAttachStudioResumeFile(uploadState.file, resumeText);
      const response = await fetch("/api/tools/resume-builder", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          resumeText,
          fileData: attachFile ? uploadState.file.data : undefined,
          fileMimeType: attachFile ? uploadState.file.mimeType : undefined,
          fileName: uploadState.file.name,
          candidateName: "Candidate",
          targetRole: resume.headline || "Professional",
          roleFamily: "General",
          yearsExperience: 0,
          currentSkills: "Not specified",
          template: currentTemplate.name,
          tone: "Confident",
        }),
      });
      const data = await response.json();
      if (!response.ok || !data.resume) {
        throw new Error(typeof data?.error === "string" ? data.error : "Resume could not be imported.");
      }
      setImportProgress(96);
      setResume(mapApiResumeToStudioResume(data.resume as ApiBuiltResume));
      setStage("editor");
      notify("success", "Resume imported", "Your old resume details are now filled in the editor.");
    } catch (error) {
      notify("error", "Import failed", error instanceof Error ? error.message : "Resume import failed. Please try another file.");
    } finally {
      window.setTimeout(() => {
        setIsImportingResume(false);
        setImportProgress(0);
      }, 350);
    }
  };

  const printResume = () => {
    const frame = document.createElement("iframe");
    frame.style.position = "fixed";
    frame.style.right = "0";
    frame.style.bottom = "0";
    frame.style.width = "1px";
    frame.style.height = "1px";
    frame.style.opacity = "0";
    frame.style.pointerEvents = "none";
    frame.style.border = "0";
    document.body.appendChild(frame);
    const frameDocument = frame.contentDocument;
    if (!frameDocument) {
      frame.remove();
      notify("error", "Print blocked", "Browser blocked the print view.");
      return;
    }
    frameDocument.open();
    frameDocument.write(createStudioPrintableResume(resume, currentTemplate, accentTheme));
    frameDocument.close();

    waitForPrintableAssets(frameDocument).then(() => {
      frame.contentWindow?.focus();
      frame.contentWindow?.print();
      window.setTimeout(() => frame.remove(), 1800);
    });
    notify("success", "Print opened", "Resume layout and photo are prepared for print.");
  };

  const downloadResume = (format: "pdf" | "doc" | "txt") => {
    if (format === "pdf") {
      setDownloadOpen(false);
      printResume();
      return;
    }
    const baseName = `${slugify(`${resume.firstName} ${resume.lastName}`.trim() || "resume")}-resume`;
    const blob =
      format === "doc"
          ? new Blob([createStudioPrintableResume(resume, currentTemplate, accentTheme)], { type: "application/msword;charset=utf-8" })
          : new Blob([buildPlainResume(resume)], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${baseName}.${format}`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
    setDownloadOpen(false);
    notify("success", "Downloaded", `Resume ${format.toUpperCase()} downloaded.`);
  };

  const copyResume = async () => {
    try {
      await navigator.clipboard.writeText(buildPlainResume(resume));
      notify("success", "Resume copied", "Plain resume text copied for quick sharing or editing.");
    } catch {
      notify("error", "Copy failed", "Clipboard permission was blocked by the browser.");
    }
  };

  const saveDraft = () => {
    try {
      window.localStorage.setItem(
        "kasa-resume-builder-studio:draft",
        JSON.stringify({ resume, selectedTemplate, accent, savedAt: new Date().toISOString() }),
      );
      notify("success", "Draft saved", "Your studio draft has been saved in this browser.");
    } catch {
      notify("error", "Draft not saved", "Browser storage is unavailable right now.");
    }
  };

  const shareStudio = async () => {
    const shareUrl = `${window.location.origin}/tools/resume-builder-studio`;
    const shareText = `I am building a resume with KASA Resume Builder Studio: ${shareUrl}`;
    if (navigator.share) {
      try {
        await navigator.share({ title: "KASA Resume Builder Studio", text: shareText, url: shareUrl });
        notify("success", "Share opened", "Choose where you want to share the resume studio.");
        return;
      } catch {
        return;
      }
    }
    await navigator.clipboard.writeText(shareText);
    notify("success", "Share link copied", "Resume studio link copied to clipboard.");
  };

  const checkResumeInAts = () => {
    const fullName = `${resume.firstName} ${resume.lastName}`.trim() || "Candidate";
    window.localStorage.setItem(
      resumeBuilderAtsHandoffKey,
      JSON.stringify({
        source: "resume-builder-studio",
        resumeText: buildPlainResume(resume),
        candidateName: fullName,
        targetRole: resume.headline.split("|")[0]?.trim() || "Frontend Developer",
        roleFamily: "Software Engineering",
        selectedSkills: resume.skills.slice(0, 12),
        savedAt: new Date().toISOString(),
      }),
    );
    window.location.href = "/tools/resume-ats-checker?source=resume-builder";
  };

  return (
    <section className="relative min-w-0 overflow-x-clip px-2 pb-8 sm:px-6 lg:px-8 [&_button]:cursor-pointer">
      <div className="mx-auto w-full max-w-[118rem] min-w-0 space-y-4 sm:space-y-5">
        <StudioHero />
        <StudioProductHeader stage={stage} />
        <StudioTopBar
          stage={stage}
          completion={completion}
          resumeStarted={resumeStarted}
          onCopy={copyResume}
          onSave={saveDraft}
          onShare={shareStudio}
        />

        {stage === "templates" ? (
          <TemplateStage
            templates={studioTemplates}
            selectedTemplate={selectedTemplate}
            accent={accent}
            onAccentChange={setAccent}
            onSelectTemplate={setSelectedTemplate}
            onTemplatesGenerated={(nextTemplates) => {
              setStudioTemplates((current) => mergeTemplates(current, nextTemplates));
              notify("success", "Templates added", `${nextTemplates.length} new resume templates added.`);
            }}
            onContinue={() => setStage("method")}
          />
        ) : null}

        {stage === "method" ? (
          <MethodStage
            uploadState={uploadState}
            onUploadStateChange={setUploadState}
            isImportingResume={isImportingResume}
            onBack={() => setStage("templates")}
            onContinue={(method) => {
              if (method === "ats") {
                const atsDraft = window.localStorage.getItem("kasa-ai-resume-builder:draft");
                if (!atsDraft) {
                  notify("error", "No ATS report found", "Run the ATS checker first, then come back here to rebuild from that report.");
                  return;
                }
                notify("info", "ATS import selected", "Use ATS gaps and missing keywords while rebuilding the resume.");
              }
              if (method === "new") {
                setResume(blankResume);
                setStage("editor");
                return;
              }
              if (method === "upload") {
                void importUploadedResume();
                return;
              }
              setStage("editor");
            }}
          />
        ) : null}

        {stage === "editor" ? (
          <EditorStage
            resume={resume}
            activeSection={activeSection}
            selectedTemplate={currentTemplate}
            accentTheme={accentTheme}
            onBack={() => setStage("method")}
            onSectionChange={setActiveSection}
            onUpdateResume={updateResume}
            onSetResume={setResume}
            resumeStarted={resumeStarted}
            onCopy={copyResume}
            onPrint={printResume}
            onDownload={() => setDownloadOpen(true)}
            onShare={shareStudio}
            onCheckAts={checkResumeInAts}
          />
        ) : null}
      </div>

      <ToolToast toast={toast} onClose={() => setToast(null)} />
      {isImportingResume ? <ImportResumeOverlay progress={importProgress} fileName={uploadState.file?.name || "resume"} /> : null}
      {downloadOpen ? <StudioDownloadModal onClose={() => setDownloadOpen(false)} onDownload={downloadResume} /> : null}
      <div className="fixed bottom-4 left-4 z-40 sm:bottom-5 sm:left-5">
        <ThemeToggle />
      </div>
    </section>
  );
}

function StudioHero() {
  return (
    <div className="px-1 py-7 text-center sm:px-6 lg:px-10 lg:py-12">
      <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-primary/15 bg-primary/8 px-4 py-2 text-xs font-black uppercase tracking-[0.16em] text-primary">
        <WandSparkles className="size-4" aria-hidden="true" />
        Free Online Resume Builder
      </div>
      <h1 className="mx-auto mt-5 max-w-5xl text-balance font-heading text-[2.35rem] font-semibold leading-[1.08] text-slate-950 dark:text-white sm:text-5xl lg:text-[3.7rem]">
        Build a professional resume online for free, without signup or hidden charges.
      </h1>
      <p className="mx-auto mt-4 max-w-3xl text-base leading-7 text-slate-600 dark:text-slate-300 sm:text-lg">
        Choose an ATS-friendly resume template, start from scratch or upload an old resume, edit every section live, add a photo if needed, and prepare a clean resume for PDF or print.
      </p>
      <div className="mt-6 flex flex-wrap justify-center gap-2 sm:gap-3">
        {["No signup needed", "Free resume maker", "Student & fresher friendly", "ATS-friendly templates"].map((item) => (
          <span key={item} className="rounded-full border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-black text-slate-700 dark:border-white/10 dark:bg-white/[0.06] dark:text-slate-200 sm:px-4 sm:text-sm">
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

function StudioProductHeader({ stage }: { stage: StudioStage }) {
  const label =
    stage === "templates"
      ? "Select a professional resume design"
      : stage === "method"
        ? "Start fresh or bring an existing resume"
        : "Edit sections with live preview";

  return (
    <div className="rounded-[1.1rem] border border-slate-200/90 bg-white/92 px-3 py-3 shadow-lg shadow-blue-950/5 backdrop-blur-xl sm:rounded-[1.35rem] sm:px-4 dark:border-white/10 dark:bg-slate-950/82">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex min-w-0 items-center gap-3">
          <div className="grid size-11 shrink-0 place-items-center rounded-[0.9rem] bg-primary text-primary-foreground shadow-lg shadow-primary/20">
            <LayoutTemplate className="size-5" aria-hidden="true" />
          </div>
          <div className="min-w-0">
            <h1 className="font-heading text-lg font-semibold leading-tight text-slate-950 sm:text-2xl dark:text-white">
              KASA Resume Builder Studio
            </h1>
            <p className="mt-0.5 text-sm font-semibold text-slate-500 dark:text-slate-300">{label}</p>
          </div>
        </div>

        <div className="flex min-w-0 flex-wrap items-center gap-2 lg:flex-nowrap">
          <span className="rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-xs font-black text-emerald-700 dark:border-emerald-300/20 dark:bg-emerald-400/10 dark:text-emerald-200">
            Free
          </span>
          <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-black text-slate-600 dark:border-white/10 dark:bg-white/[0.06] dark:text-slate-300">
            No signup
          </span>
          <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-black text-slate-600 dark:border-white/10 dark:bg-white/[0.06] dark:text-slate-300">
            Live preview
          </span>
        </div>
      </div>
    </div>
  );
}

function StudioTopBar({
  stage,
  completion,
  resumeStarted,
  onCopy,
  onSave,
  onShare,
}: {
  stage: StudioStage;
  completion: number;
  resumeStarted: boolean;
  onCopy: () => void;
  onSave: () => void;
  onShare: () => void;
}) {
  const steps: Array<{ key: StudioStage; label: string }> = [
    { key: "templates", label: "Choose template" },
    { key: "method", label: "Add resume" },
    { key: "editor", label: "Edit & export" },
  ];
  const activeIndex = steps.findIndex((step) => step.key === stage);

  return (
    <div className="sticky top-[4.65rem] z-30 rounded-[1.1rem] border border-slate-200/90 bg-white/96 p-2.5 shadow-xl shadow-blue-950/8 backdrop-blur-xl sm:top-[5.5rem] sm:rounded-[1.35rem] sm:p-3 dark:border-white/10 dark:bg-slate-950/88">
      <div className="flex min-w-0 flex-col gap-3 xl:flex-row xl:items-center xl:justify-between">
        <div className="flex min-w-0 flex-wrap items-center gap-2">
          {steps.map((step, index) => {
            const isActive = step.key === stage;
            const isDone = index < activeIndex;
            return (
              <div key={step.key} className="flex items-center gap-2">
                <span
                  className={`grid size-9 place-items-center rounded-full text-sm font-black ${
                    isActive || isDone
                      ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25"
                      : "bg-slate-100 text-slate-500 dark:bg-white/10 dark:text-slate-300"
                  }`}
                >
                  {isDone ? <CheckCircle2 className="size-4" aria-hidden="true" /> : index + 1}
                </span>
                <span className={`text-xs font-bold sm:text-sm ${isActive ? "text-slate-950 dark:text-white" : "text-slate-500 dark:text-slate-400"}`}>
                  {step.label}
                </span>
                {index < steps.length - 1 ? <span className="hidden h-px w-8 bg-slate-200 sm:block dark:bg-white/10" /> : null}
              </div>
            );
          })}
        </div>

        <div className="flex min-w-0 flex-wrap items-center gap-2">
          <div className="rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-bold text-slate-700 dark:border-white/10 dark:bg-white/[0.05] dark:text-slate-200">
            {resumeStarted ? `${completion}% ready` : "Start editing"}
          </div>
          <StudioIconButton icon={Copy} label="Copy resume text" onClick={onCopy} />
          <StudioIconButton icon={Share2} label="Share resume builder" onClick={onShare} />
          <StudioIconButton icon={Save} label="Save draft" onClick={onSave} />
        </div>
      </div>
    </div>
  );
}

function TemplateStage({
  templates,
  selectedTemplate,
  accent,
  onAccentChange,
  onSelectTemplate,
  onTemplatesGenerated,
  onContinue,
}: {
  templates: TemplateOption[];
  selectedTemplate: TemplateId;
  accent: AccentId;
  onAccentChange: (accent: AccentId) => void;
  onSelectTemplate: (template: TemplateId) => void;
  onTemplatesGenerated: (templates: TemplateOption[]) => void;
  onContinue: () => void;
}) {
  const [layoutFilter, setLayoutFilter] = useState<string>("All");
  const [styleFilter, setStyleFilter] = useState<string>("All");
  const [isGeneratingTemplates, setIsGeneratingTemplates] = useState(false);

  const filteredTemplates = templates.filter((template) => {
    const layoutOk = layoutFilter === "All" || template.layout === layoutFilter;
    const styleOk =
      styleFilter === "All" ||
      template.tag === styleFilter ||
      (styleFilter === "Best match" && template.recommended) ||
      (styleFilter === "AI generated" && template.generated);
    return layoutOk && styleOk;
  });

  const generateTemplates = async () => {
    setIsGeneratingTemplates(true);
    try {
      const response = await fetch("/api/tools/resume-builder/templates", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          existingTemplates: templates.map((template) => template.name),
          accent: accentMap[accent].name,
        }),
      });
      const data = await response.json();
      const generated = Array.isArray(data?.templates)
        ? data.templates.map((template: Partial<TemplateOption>, index: number) => normalizeTemplateOption(template, index))
        : [];
      const nextTemplates = generated.length ? generated : fallbackAiTemplates(templates.length);
      onTemplatesGenerated(nextTemplates);
      setStyleFilter("AI generated");
    } catch {
      onTemplatesGenerated(fallbackAiTemplates(templates.length));
      setStyleFilter("AI generated");
    } finally {
      setIsGeneratingTemplates(false);
    }
  };

  return (
    <div className="min-w-0 rounded-[1.25rem] border border-slate-200 bg-white p-3 shadow-2xl shadow-blue-950/8 sm:rounded-[1.55rem] sm:p-4 dark:border-white/10 dark:bg-white/[0.04]">
      <div className="grid min-w-0 grid-cols-1 gap-4 xl:grid-cols-[17rem_minmax(0,1fr)]">
        <aside className="min-w-0 rounded-[1.1rem] border border-slate-200 bg-slate-50 p-4 dark:border-white/10 dark:bg-white/[0.04] xl:sticky xl:top-[13.5rem] xl:self-start">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/15 bg-white px-4 py-2 text-xs font-black uppercase tracking-[0.16em] text-primary shadow-sm dark:bg-white/[0.06]">
            <LayoutTemplate className="size-4" aria-hidden="true" />
            Choose template
          </div>
          <h2 className="mt-5 text-pretty font-heading text-2xl font-semibold leading-tight text-slate-950 dark:text-white">
            Choose your resume template
          </h2>
          <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300">
            Select a layout that fits your role. You can change the design later while editing.
          </p>
          <button
            type="button"
            onClick={generateTemplates}
            disabled={isGeneratingTemplates}
            className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-4 py-3 text-sm font-black text-primary-foreground shadow-lg shadow-primary/20 transition hover:-translate-y-0.5 hover:bg-primary-hover disabled:cursor-wait disabled:opacity-70"
          >
            {isGeneratingTemplates ? <LoaderCircle className="size-4 animate-spin" aria-hidden="true" /> : <WandSparkles className="size-4" aria-hidden="true" />}
            {isGeneratingTemplates ? "Creating templates..." : "Generate more with AI"}
          </button>

          <div className="mt-5 rounded-[1.15rem] border border-slate-200 bg-white p-4 dark:border-white/10 dark:bg-white/[0.04]">
            <div className="flex items-center gap-2 text-sm font-black text-slate-900 dark:text-white">
              <Palette className="size-4 text-primary" aria-hidden="true" />
              Accent color
            </div>
            <div className="mt-4 grid grid-cols-5 gap-2 sm:grid-cols-5 xl:grid-cols-3">
              {(Object.keys(accentMap) as AccentId[]).map((accentKey) => (
                <button
                  key={accentKey}
                  type="button"
                  onClick={() => onAccentChange(accentKey)}
                  className={`grid size-10 place-items-center rounded-full border-2 bg-white transition hover:-translate-y-0.5 ${
                    accent === accentKey ? "border-slate-950 shadow-lg shadow-blue-950/12" : "border-slate-200"
                  }`}
                  aria-label={`Use ${accentMap[accentKey].name} accent`}
                >
                  <span className={`size-6 rounded-full ${accentMap[accentKey].dot}`} />
                </button>
              ))}
            </div>
          </div>
        </aside>

        <div className="min-w-0 space-y-5">
          <div className="min-w-0 rounded-[1.15rem] border border-slate-200 bg-white p-3 shadow-sm shadow-blue-950/5 sm:p-4 dark:border-white/10 dark:bg-white/[0.04]">
            <div className="flex min-w-0 flex-col gap-3 2xl:flex-row 2xl:items-center">
              <span className="text-sm font-black text-slate-900 dark:text-white">Show</span>
              <div className="flex min-w-0 max-w-full gap-2 overflow-x-auto pb-1">
                {["All", "One column", "Two column", "Compact", "Photo"].map((filter) => (
                  <button
                    key={filter}
                    type="button"
                    onClick={() => setLayoutFilter(filter)}
                    className={`shrink-0 rounded-full border px-4 py-2 text-sm font-bold transition ${pillClasses(layoutFilter === filter)}`}
                  >
                    {filter === "All" ? "All layouts" : filter}
                  </button>
                ))}
              </div>
              <div className="flex min-w-0 max-w-full gap-2 overflow-x-auto pb-1 2xl:ml-auto">
                {["All", "Best match", "AI generated", "Creative", "Traditional"].map((filter) => (
                  <button
                    key={filter}
                    type="button"
                    onClick={() => setStyleFilter(filter)}
                    className={`shrink-0 rounded-full border px-4 py-2 text-sm font-bold transition ${pillClasses(styleFilter === filter)}`}
                  >
                    {filter === "All" ? "All styles" : filter}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="grid min-w-0 grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
            {filteredTemplates.map((template) => (
              <TemplateCard
                key={template.id}
                template={template}
                active={template.id === selectedTemplate}
                accent={accent}
                onSelect={() => onSelectTemplate(template.id)}
              />
            ))}
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm font-semibold text-slate-500 dark:text-slate-400">
              {filteredTemplates.length} templates shown. Use AI to add more layouts anytime.
            </p>
            <button
              type="button"
              onClick={onContinue}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-7 py-3 text-sm font-black text-primary-foreground shadow-xl shadow-primary/25 transition hover:-translate-y-0.5 hover:bg-primary-hover"
            >
              Use this template
              <ArrowRight className="size-4" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function TemplateCard({
  template,
  active,
  accent,
  onSelect,
}: {
  template: TemplateOption;
  active: boolean;
  accent: AccentId;
  onSelect: () => void;
}) {
  const theme = accentMap[accent];
  const displayTag = template.generated ? formatAiTemplateTag(template.tag) : template.tag;
  return (
    <button
      type="button"
      onClick={onSelect}
      className={`group w-full min-w-0 text-left transition hover:-translate-y-1 ${
        active ? "rounded-[1.1rem] ring-2 ring-primary ring-offset-2 ring-offset-white dark:ring-offset-slate-950" : ""
      }`}
    >
      <div className="min-w-0 rounded-[1.05rem] border border-slate-200 bg-white p-3 shadow-lg shadow-blue-950/8 transition group-hover:shadow-xl dark:border-white/10 dark:bg-slate-950">
        <div className={`relative aspect-[0.72] overflow-hidden rounded-[0.8rem] border border-slate-200 ${theme.bg}`}>
          {template.recommended || template.generated ? (
            <span className="absolute right-3 top-3 z-10 rounded-full bg-white px-3 py-1 text-[0.65rem] font-black uppercase tracking-[0.1em] text-primary shadow-md">
              {template.generated ? "AI made" : "Best match"}
            </span>
          ) : null}
          <MiniResumePreview template={template.id} layout={template.layout} accent={accent} />
        </div>
        <div className="mt-3 space-y-2">
          <div className="break-words font-heading text-lg font-semibold leading-tight text-slate-950 dark:text-white">{template.name}</div>
          {template.generated ? (
            <span className="inline-flex w-fit max-w-full items-center gap-1.5 rounded-full border border-primary/25 bg-gradient-to-r from-primary/10 via-sky-50 to-emerald-50 px-3 py-1.5 text-[0.66rem] font-black uppercase tracking-[0.08em] text-primary shadow-sm dark:from-primary/20 dark:via-white/10 dark:to-emerald-400/10">
              <Sparkles className="size-3 animate-pulse" aria-hidden="true" />
              {displayTag}
            </span>
          ) : (
            <span className={`inline-flex w-fit rounded-full border px-2.5 py-1 text-[0.66rem] font-black uppercase tracking-[0.1em] ${theme.border} ${theme.text}`}>
              {displayTag}
            </span>
          )}
          <p className="text-sm leading-6 text-slate-500 dark:text-slate-400">{template.description}</p>
        </div>
      </div>
    </button>
  );
}

function formatAiTemplateTag(tag: string) {
  const cleaned = tag.replace(/^ai\s*/i, "").replace(/professional/i, "pro").trim();
  const words = cleaned.split(/\s+/).filter(Boolean).slice(0, 2).join(" ");
  return `AI ${words || "made"}`;
}

function MiniResumePreview({ template, layout, accent }: { template: TemplateId; layout: TemplateOption["layout"]; accent: AccentId }) {
  const theme = accentMap[accent];
  const hasSidebar = template === "creative" || template === "photo" || layout === "Two column" || layout === "Photo";
  const compact = template === "compact" || layout === "Compact";
  const executive = template === "executive" || template.includes("executive") || template.includes("senior");
  const classic = template === "classic" || template.includes("classic") || template.includes("minimal");
  const sample =
    template === "classic"
      ? { name: "Howard Jones", role: "Business Analyst", initials: "HJ" }
      : template === "photo"
        ? { name: "Samantha Williams", role: "Marketing Manager", initials: "SW" }
        : template === "creative"
          ? { name: "Olivia Carter", role: "Product Designer", initials: "OC" }
          : template === "compact"
            ? { name: "Ethan Brooks", role: "Senior Data Engineer", initials: "EB" }
            : template === "executive"
              ? { name: "Michael Bennett", role: "Engineering Manager", initials: "MB" }
              : { name: "Emma Richardson", role: "Frontend Developer", initials: "ER" };

  return (
    <div className="absolute inset-4 overflow-hidden rounded-sm bg-white p-3 text-[0.46rem] leading-snug text-slate-700 shadow-sm">
      <div className={hasSidebar ? "grid h-full grid-cols-[0.34fr_0.66fr] gap-2" : "h-full"}>
        {hasSidebar ? (
          <div className={`${theme.bg} h-full rounded-sm p-2`}>
            {template === "photo" || layout === "Photo" ? (
              <div className="mb-2 grid size-9 place-items-center rounded-full bg-white text-[0.62rem] font-black text-slate-700 ring-2 ring-white shadow-sm">
                {sample.initials}
              </div>
            ) : null}
            <div className={`h-1.5 w-12 ${theme.dot}`} />
            <div className="mt-1 text-[0.42rem] font-bold uppercase tracking-[0.08em] text-slate-600">Contact</div>
            <div className="mt-1 space-y-0.5 text-[0.38rem] text-slate-500">
              <p>New York, USA</p>
              <p>{sample.name.split(" ")[0].toLowerCase()}@email.com</p>
              <p>+1 555 0134</p>
            </div>
            <div className="mt-3 text-[0.42rem] font-bold uppercase tracking-[0.08em] text-slate-600">Skills</div>
            <div className="mt-1 space-y-1">
              {["Sales CRM", "Inventory", "Reports", "POS"].map((skill) => (
                <div key={skill} className="rounded bg-white/75 px-1 py-0.5 font-semibold text-slate-600">
                  {skill}
                </div>
              ))}
            </div>
          </div>
        ) : null}
        <div className={classic ? "font-serif" : ""}>
          <header className={`${executive || classic ? "text-center" : ""}`}>
            <div className={`text-[0.82rem] font-black uppercase tracking-[0.04em] ${classic ? "text-slate-800" : "text-slate-900"}`}>
              {sample.name}
            </div>
            <div className={`mt-0.5 text-[0.48rem] font-bold ${theme.text}`}>
              {sample.role}
            </div>
            <div className="mt-0.5 text-[0.36rem] text-slate-500">New York, USA | email@example.com | +1 555 0134</div>
            <div className={`mt-2 h-0.5 w-full ${classic ? "bg-slate-700" : theme.dot}`} />
          </header>

          <PreviewMiniSection title="Summary" theme={theme}>
            <p>
              Results-driven professional with experience building reliable systems, improving workflows, and delivering
              measurable business outcomes.
            </p>
          </PreviewMiniSection>

          {!hasSidebar ? (
            <PreviewMiniSection title="Skills" theme={theme}>
              <div className="grid grid-cols-2 gap-1">
                {["React.js", "Next.js", "AWS", "PostgreSQL", "Docker", "Leadership"].map((skill) => (
                  <span key={skill} className="rounded border border-slate-200 px-1 py-0.5 font-semibold">
                    {skill}
                  </span>
                ))}
              </div>
            </PreviewMiniSection>
          ) : null}

          <PreviewMiniSection title="Experience" theme={theme}>
            <div className="space-y-1.5">
              {["Senior Software Developer", "Software Developer", compact ? "Frontend Engineer" : ""].filter(Boolean).map((role) => (
                <div key={role}>
                  <div className="flex justify-between gap-2 font-black text-slate-900">
                    <span>{role}</span>
                    <span>2019-2026</span>
                  </div>
                  <ul className="mt-0.5 list-disc space-y-0.5 pl-3">
                    <li>Improved platform speed and reliability for high-volume users.</li>
                    <li>Built reusable modules, dashboards, and secure API workflows.</li>
                  </ul>
                </div>
              ))}
            </div>
          </PreviewMiniSection>

          <PreviewMiniSection title="Education" theme={theme}>
            <div className="font-semibold">Master of Computer Applications | 2014</div>
          </PreviewMiniSection>
        </div>
      </div>
    </div>
  );
}

function PreviewMiniSection({
  title,
  theme,
  children,
}: {
  title: string;
  theme: (typeof accentMap)[AccentId];
  children: ReactNode;
}) {
  return (
    <section className="mt-2">
      <div className={`mb-1 border-b pb-0.5 text-[0.44rem] font-black uppercase tracking-[0.14em] ${theme.text}`}>
        {title}
      </div>
      <div>{children}</div>
    </section>
  );
}

function MethodStage({
  uploadState,
  onUploadStateChange,
  isImportingResume,
  onBack,
  onContinue,
}: {
  uploadState: StudioUploadState;
  onUploadStateChange: (state: StudioUploadState) => void;
  isImportingResume: boolean;
  onBack: () => void;
  onContinue: (method: "new" | "upload" | "ats") => void;
}) {
  const [atsMessage, setAtsMessage] = useState("");

  const scanResumeFile = (file: File) => {
    const mimeType = getStudioSupportedMimeType(file);
    const suspiciousName = /(invoice|receipt|bill|marksheet|certificate|statement|ticket)/i.test(file.name);

    if (!mimeType) {
      onUploadStateChange({
        file: { name: file.name, mimeType: "", data: "", size: file.size },
        status: "error",
        progress: 0,
        message: "Please upload a resume file in PDF, DOC, DOCX, TXT, or RTF format.",
      });
      return;
    }

    if (suspiciousName) {
      onUploadStateChange({
        file: { name: file.name, mimeType, data: "", size: file.size },
        status: "error",
        progress: 0,
        message: "This does not look like a resume. Please choose a CV or resume file.",
      });
      return;
    }

    if (file.size > 4_000_000) {
      onUploadStateChange({
        file: { name: file.name, mimeType, data: "", size: file.size },
        status: "error",
        progress: 0,
        message: "Please upload a resume under 4 MB.",
      });
      return;
    }

    onUploadStateChange({
      file: { name: file.name, mimeType, data: "", size: file.size },
      status: "scanning",
      progress: 8,
      message: "Reading file and preparing resume extraction...",
    });

    const reader = new FileReader();
    reader.onprogress = (event) => {
      if (!event.lengthComputable) return;
      const progress = Math.min(95, Math.round((event.loaded / event.total) * 95));
      onUploadStateChange({
        file: { name: file.name, mimeType, data: "", size: file.size },
        status: "scanning",
        progress,
        message: "Reading file and preparing resume extraction...",
      });
    };
    reader.onload = async () => {
      const raw = String(reader.result || "");
      const data = raw.includes(",") ? raw.split(",")[1] || "" : raw;
      const extractedText = await extractStudioReadableTextFromUpload(file, mimeType);
      onUploadStateChange({
        file: { name: file.name, mimeType, data, size: file.size, text: extractedText || undefined },
        status: "ready",
        progress: 100,
        message: "Resume file is ready. Continue to auto-fill the editor.",
      });
    };
    reader.onerror = () => {
      onUploadStateChange({
        file: { name: file.name, mimeType, data: "", size: file.size },
        status: "error",
        progress: 0,
        message: "Resume upload failed. Please choose another file.",
      });
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="min-w-0 rounded-[1.25rem] border border-slate-200 bg-white p-4 shadow-2xl shadow-blue-950/8 sm:rounded-[1.75rem] sm:p-8 dark:border-white/10 dark:bg-white/[0.04]">
      <button
        type="button"
        onClick={onBack}
        className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-bold text-slate-600 transition hover:border-primary/40 hover:text-primary dark:border-white/10 dark:bg-white/[0.06] dark:text-slate-300"
      >
        <ArrowLeft className="size-4" aria-hidden="true" />
        Back to templates
      </button>
      <div className="mx-auto mt-8 max-w-4xl text-center">
        <h2 className="text-balance font-heading text-3xl font-semibold leading-tight text-slate-950 sm:text-5xl dark:text-white">
          How would you like to build your resume?
        </h2>
        <p className="mt-4 text-base leading-7 text-slate-600 dark:text-slate-300">
          Start with a blank resume, improve an old one, or use your ATS report to focus on missing keywords.
        </p>
      </div>

      <div className="mt-8 grid min-w-0 grid-cols-1 gap-4 sm:mt-10 lg:grid-cols-3">
        <MethodCard
          icon={PenLine}
          title="Start with a new resume"
          description="Best for freshers, career switchers, or anyone who wants guided section-by-section writing."
          button="Start fresh"
          onClick={() => onContinue("new")}
        />
        <MethodCard
          icon={UploadCloud}
          title="Upload existing resume"
          description="Upload an old PDF, DOC, DOCX, TXT, or paste content, then rebuild it in a better template."
          button={isImportingResume ? "Importing resume..." : uploadState.status === "ready" ? "Continue with file" : uploadState.file ? "Choose another file" : "Choose file"}
          onClick={() => {
            if (isImportingResume) return;
            if (uploadState.status === "ready") {
              onContinue("upload");
              return;
            }
            document.getElementById("resume-studio-file")?.click();
          }}
          secondary
        >
          <input
            id="resume-studio-file"
            type="file"
            accept=".pdf,.doc,.docx,.txt,.rtf"
            className="sr-only"
            onChange={(event) => {
              const file = event.target.files?.[0];
              if (!file) return;
              scanResumeFile(file);
              event.currentTarget.value = "";
            }}
          />
          <div
            className={`mt-4 rounded-[0.9rem] border px-3 py-3 text-left ${
              uploadState.status === "error"
                ? "border-rose-200 bg-rose-50 text-rose-700 dark:border-rose-300/20 dark:bg-rose-400/10 dark:text-rose-200"
                : uploadState.status === "ready"
                  ? "border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-300/20 dark:bg-emerald-400/10 dark:text-emerald-200"
                  : "border-slate-200 bg-slate-50 text-slate-600 dark:border-white/10 dark:bg-white/[0.04] dark:text-slate-300"
            }`}
          >
            <div className="truncate text-xs font-black">{uploadState.file?.name || "No file selected"}</div>
            <p className="mt-1 text-xs font-semibold leading-5">{isImportingResume ? "AI is reading this resume and filling the editor..." : uploadState.message}</p>
            {uploadState.status === "scanning" || isImportingResume ? (
              <div className="mt-2 h-2 overflow-hidden rounded-full bg-white/80 dark:bg-white/10">
                <div className="h-full rounded-full bg-primary transition-all" style={{ width: `${isImportingResume ? 100 : uploadState.progress}%` }} />
              </div>
            ) : null}
            {uploadState.status === "error" ? (
              <button
                type="button"
                onClick={() => document.getElementById("resume-studio-file")?.click()}
                className="mt-3 inline-flex items-center gap-2 rounded-full bg-white px-3 py-1.5 text-xs font-black text-rose-700 shadow-sm transition hover:-translate-y-0.5 dark:bg-white/10 dark:text-rose-100"
              >
                <UploadCloud className="size-3.5" aria-hidden="true" />
                Choose another file
              </button>
            ) : null}
          </div>
        </MethodCard>
        <MethodCard
          icon={WandSparkles}
          title="Use ATS report"
          description="Use score gaps, weak sections, and missing skills from the ATS checker while editing."
          button="Use ATS report"
          onClick={() => {
            const atsDraft = window.localStorage.getItem("kasa-ai-resume-builder:draft");
            if (!atsDraft) {
              setAtsMessage("No ATS report found. Check your resume first, then come back here to rebuild it with the report.");
              return;
            }
            onContinue("ats");
          }}
        >
          {atsMessage ? (
            <div className="mt-4 rounded-[0.95rem] border border-amber-200 bg-amber-50 px-4 py-3 text-left text-amber-800 dark:border-amber-300/20 dark:bg-amber-400/10 dark:text-amber-100">
              <p className="text-xs font-bold leading-5">{atsMessage}</p>
              <button
                type="button"
                onClick={() => {
                  window.location.href = "/tools/resume-ats-checker";
                }}
                className="mt-3 inline-flex items-center gap-2 rounded-full bg-white px-3 py-1.5 text-xs font-black text-amber-800 shadow-sm transition hover:-translate-y-0.5 dark:bg-white/10 dark:text-amber-100"
              >
                <ArrowRight className="size-3.5" aria-hidden="true" />
                Check ATS now
              </button>
            </div>
          ) : null}
        </MethodCard>
      </div>
    </div>
  );
}

function MethodCard({
  icon: Icon,
  title,
  description,
  button,
  onClick,
  secondary,
  children,
}: {
  icon: LucideIcon;
  title: string;
  description: string;
  button: string;
  onClick: () => void;
  secondary?: boolean;
  children?: ReactNode;
}) {
  return (
    <div className="min-w-0 rounded-[1.15rem] border border-slate-200 bg-white p-5 text-center shadow-lg shadow-blue-950/6 transition hover:-translate-y-1 hover:shadow-2xl sm:rounded-[1.35rem] sm:p-6 dark:border-white/10 dark:bg-slate-950">
      <div className="mx-auto grid size-16 place-items-center rounded-[1.05rem] bg-primary/10 text-primary">
        <Icon className="size-8" aria-hidden="true" />
      </div>
      <h3 className="mt-5 text-pretty font-heading text-2xl font-semibold text-slate-950 dark:text-white">{title}</h3>
      <p className="mx-auto mt-3 max-w-sm text-sm leading-6 text-slate-600 dark:text-slate-300">{description}</p>
      {children}
      <button
        type="button"
        onClick={onClick}
        className={`mt-6 inline-flex min-w-44 items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-black shadow-lg transition hover:-translate-y-0.5 ${
          secondary ? "bg-primary/12 text-primary shadow-primary/10 hover:bg-primary/18" : "bg-primary text-primary-foreground shadow-primary/20 hover:bg-primary-hover"
        }`}
      >
        {secondary ? <FileUp className="size-4" aria-hidden="true" /> : null}
        {button}
      </button>
    </div>
  );
}

function EditorStage({
  resume,
  activeSection,
  selectedTemplate,
  accentTheme,
  resumeStarted,
  onBack,
  onSectionChange,
  onUpdateResume,
  onSetResume,
  onCopy,
  onPrint,
  onDownload,
  onShare,
  onCheckAts,
}: {
  resume: StudioResume;
  activeSection: SectionKey;
  selectedTemplate: TemplateOption;
  accentTheme: (typeof accentMap)[AccentId];
  resumeStarted: boolean;
  onBack: () => void;
  onSectionChange: (section: SectionKey) => void;
  onUpdateResume: <K extends keyof StudioResume>(key: K, value: StudioResume[K]) => void;
  onSetResume: (resume: StudioResume | ((resume: StudioResume) => StudioResume)) => void;
  onCopy: () => void;
  onPrint: () => void;
  onDownload: () => void;
  onShare: () => void;
  onCheckAts: () => void;
}) {
  return (
    <div className="grid min-w-0 grid-cols-1 gap-4 xl:grid-cols-[5.35rem_minmax(0,0.93fr)_minmax(32rem,1.07fr)] xl:gap-5">
      <aside className="hidden rounded-[1.35rem] border border-slate-200 bg-white p-3 shadow-lg shadow-blue-950/6 xl:block dark:border-white/10 dark:bg-white/[0.04]">
        <div className="space-y-2">
          {sectionNav.map(({ key, label, icon: Icon }, index) => (
            <button
              key={key}
              type="button"
              onClick={() => onSectionChange(key)}
              className={`group relative grid h-16 w-full place-items-center rounded-[1rem] transition ${
                activeSection === key ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25" : "text-slate-500 hover:bg-slate-100 hover:text-primary dark:text-slate-300 dark:hover:bg-white/10"
              }`}
              aria-label={`Edit ${label}`}
            >
              <Icon className="size-5" aria-hidden="true" />
              <span className="absolute left-[4.55rem] top-1/2 z-20 hidden -translate-y-1/2 whitespace-nowrap rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-black text-slate-900 shadow-xl group-hover:block dark:border-white/10 dark:bg-slate-900 dark:text-white">
                {index + 1}. {label}
              </span>
            </button>
          ))}
        </div>
      </aside>

      <div className="min-w-0 rounded-[1.25rem] border border-slate-200 bg-white shadow-2xl shadow-blue-950/8 sm:rounded-[1.55rem] dark:border-white/10 dark:bg-white/[0.04]">
        <div className="border-b border-slate-200 p-4 sm:p-5 dark:border-white/10">
          <button
            type="button"
            onClick={onBack}
            className="inline-flex items-center gap-2 text-sm font-bold text-primary"
          >
            <ArrowLeft className="size-4" aria-hidden="true" />
            Back to build method
          </button>
          <div className="mt-4 flex min-w-0 flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <div className="text-xs font-black uppercase tracking-[0.18em] text-primary">AI resume editor</div>
              <h2 className="mt-2 text-pretty font-heading text-3xl font-semibold leading-tight text-slate-950 dark:text-white">
                Write stronger sections with AI
              </h2>
              <p className="mt-2 max-w-2xl text-sm font-semibold leading-6 text-slate-500 dark:text-slate-300">
                Use AI prompts to draft, improve, and polish the six ATS-friendly resume sections.
              </p>
            </div>
            <div className="flex max-w-full overflow-x-auto rounded-full border border-slate-200 bg-slate-50 p-1 dark:border-white/10 dark:bg-white/[0.04]">
              {sectionNav.map(({ key, label }) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => onSectionChange(key)}
                  className={`shrink-0 rounded-full px-3 py-2 text-xs font-black transition ${activeSection === key ? "bg-white text-primary shadow-sm dark:bg-white/10" : "text-slate-500"}`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
        </div>
        <div className="p-4 sm:p-5">
          <SectionEditor
            resume={resume}
            activeSection={activeSection}
            selectedTemplate={selectedTemplate}
            onUpdateResume={onUpdateResume}
            onSetResume={onSetResume}
          />
        </div>
      </div>

      <div className="min-w-0 rounded-[1.25rem] border border-slate-200 bg-white p-3 shadow-2xl shadow-blue-950/8 sm:rounded-[1.55rem] sm:p-4 dark:border-white/10 dark:bg-white/[0.04]">
        <div className="mb-4 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <div className="text-xs font-black uppercase tracking-[0.18em] text-primary">Live preview</div>
            <h2 className="mt-2 font-heading text-2xl font-semibold text-slate-950 dark:text-white">
              {selectedTemplate.name}
            </h2>
          </div>
          <div className="flex flex-wrap gap-2">
            <StudioIconButton icon={Copy} label="Copy resume text" onClick={onCopy} />
            <StudioIconButton icon={Share2} label="Share resume builder" onClick={onShare} />
            <StudioIconButton icon={Printer} label="Print resume" onClick={onPrint} />
            <StudioIconButton icon={Download} label="Download resume" onClick={onDownload} />
          </div>
        </div>
        {resumeStarted ? (
          <button
            type="button"
            onClick={onCheckAts}
            className="mb-4 flex w-full items-center justify-between gap-3 rounded-[1rem] border border-primary/20 bg-[linear-gradient(135deg,#eef5ff_0%,#f1fff8_100%)] px-4 py-3 text-left text-sm font-black text-primary shadow-lg shadow-blue-950/8 transition hover:-translate-y-0.5 hover:border-primary/40 dark:border-emerald-300/20 dark:bg-[linear-gradient(135deg,rgba(31,61,118,0.35),rgba(22,101,52,0.22))] dark:text-emerald-100"
          >
            <span className="inline-flex items-center gap-2">
              <Sparkles className="size-4 animate-pulse" aria-hidden="true" />
              Check this resume with ATS
            </span>
            <ArrowRight className="size-4" aria-hidden="true" />
          </button>
        ) : null}

        <div className="xl:sticky xl:top-[12.6rem]">
          <div className="overflow-x-auto overflow-y-hidden rounded-[1rem] border border-slate-200 bg-slate-100 p-2 sm:rounded-[1.2rem] sm:p-4 dark:border-white/10 dark:bg-slate-900">
            <div className="mx-auto w-full min-w-[38rem] max-w-[48rem] sm:min-w-0">
              <ResumePreview resume={resume} template={selectedTemplate.id} layout={selectedTemplate.layout} accentTheme={accentTheme} />
            </div>
          </div>
          {resumeStarted ? (
            <div className="mt-4 grid gap-3 sm:grid-cols-3">
              <PreviewMetric label="Completion" value="Live" />
              <PreviewMetric label="Keywords" value={`${Math.min(95, 55 + resume.skills.length * 5)}%`} />
              <PreviewMetric label="Sections" value={`${[
                resume.summary,
                resume.skills.length ? "skills" : "",
                resume.experience.length ? "experience" : "",
                resume.projects.length ? "projects" : "",
                resume.education.length ? "education" : "",
              ].filter(Boolean).length}/5`} />
            </div>
          ) : (
            <div className="mt-4 rounded-[1rem] border border-dashed border-slate-300 bg-white px-4 py-4 text-center text-sm font-bold text-slate-500 dark:border-white/15 dark:bg-white/[0.04] dark:text-slate-300">
              Resume insights will appear after you add your details.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function SectionEditor({
  resume,
  activeSection,
  selectedTemplate,
  onUpdateResume,
  onSetResume,
}: {
  resume: StudioResume;
  activeSection: SectionKey;
  selectedTemplate: TemplateOption;
  onUpdateResume: <K extends keyof StudioResume>(key: K, value: StudioResume[K]) => void;
  onSetResume: (resume: StudioResume | ((resume: StudioResume) => StudioResume)) => void;
}) {
  const targetRole = resume.headline.trim() || "your target role";
  const photoEnabled = selectedTemplate.layout === "Photo" || selectedTemplate.id === "photo";

  if (activeSection === "header") {
    return (
      <div className="space-y-4">
        <EditorIntro title="Header details" description="Name, headline, and contact information stay visible at the top of every template." />
        <div className="grid gap-4 sm:grid-cols-2">
          {photoEnabled ? (
            <PhotoUploader
              photoDataUrl={resume.photoDataUrl}
              onChange={(photoDataUrl) => onUpdateResume("photoDataUrl", photoDataUrl)}
            />
          ) : null}
          <Field label="First name" value={resume.firstName} onChange={(value) => onUpdateResume("firstName", value)} />
          <Field label="Last name" value={resume.lastName} onChange={(value) => onUpdateResume("lastName", value)} />
          <Field className="sm:col-span-2" label="Professional headline" value={resume.headline} onChange={(value) => onUpdateResume("headline", value)} />
          <Field label="City" value={resume.city} onChange={(value) => onUpdateResume("city", value)} />
          <Field label="Country" value={resume.country} onChange={(value) => onUpdateResume("country", value)} />
          <Field label="Phone" value={resume.phone} onChange={(value) => onUpdateResume("phone", value)} />
          <Field label="Email" value={resume.email} onChange={(value) => onUpdateResume("email", value)} />
          <Field className="sm:col-span-2" label="Portfolio or LinkedIn" value={resume.portfolio} onChange={(value) => onUpdateResume("portfolio", value)} />
        </div>
        <AiSuggestionPanel
          suggestions={["Suggest headline", "Clean contact format", "Add LinkedIn reminder"]}
          onApply={(suggestion, value) => {
            if (suggestion === "Suggest headline") {
              onUpdateResume("headline", value || "Frontend Developer | React.js, Next.js, TypeScript");
            }
          }}
        />
      </div>
    );
  }

  if (activeSection === "summary") {
    return (
      <div className="space-y-4">
        <EditorIntro title="Professional summary" description="Keep it sharp, role-specific, and believable. AI suggestions can rewrite this later." />
        <textarea
          className={textareaClasses("min-h-44")}
          value={resume.summary}
          onChange={(event) => onUpdateResume("summary", event.target.value)}
        />
        <AiSuggestionPanel
          suggestions={["Make it concise", "Add leadership angle", "Add target role keywords", "Make fresher friendly"]}
          onApply={(suggestion, value) => {
            if (value) {
              onUpdateResume("summary", value.replace("{role}", targetRole === "your target role" ? "software professional" : targetRole));
              return;
            }
            const role = targetRole === "your target role" ? "software professional" : targetRole;
            const next =
              suggestion === "Make fresher friendly"
                ? `Motivated ${role} with strong project experience, practical problem-solving skills, and a focus on building reliable, user-friendly solutions. Comfortable learning new tools quickly and contributing to clean, well-documented work.`
                : suggestion === "Add leadership angle"
                  ? `Experienced ${role} with a strong record of owning delivery, coordinating with stakeholders, and improving product quality through clear technical decisions, reusable systems, and measurable execution.`
                  : `Results-focused ${role} with hands-on experience in building reliable products, improving workflows, and delivering measurable outcomes. Strong in problem solving, collaboration, and translating business needs into clean execution.`;
            onUpdateResume("summary", next);
          }}
        />
      </div>
    );
  }

  if (activeSection === "skills") {
    return (
      <div className="space-y-4">
        <EditorIntro title="Skills" description="Add skills as chips to keep the resume clean while still targeting keywords." />
        <ChipEditor
          items={resume.skills}
          onChange={(skills) => onUpdateResume("skills", skills)}
          placeholder="Add a skill like React.js"
        />
        <AiSuggestionPanel
          suggestions={["Add ATS keywords", "Add frontend skills", "Add backend skills", "Add soft skills"]}
          onApply={(suggestion, value) => {
            if (value) {
              onUpdateResume("skills", mergeUniqueItems(resume.skills, value.split(",")));
              return;
            }
            const packs: Record<string, string[]> = {
              "Add ATS keywords": ["Communication", "Problem Solving", "Project Ownership", "Documentation"],
              "Add frontend skills": ["React.js", "Next.js", "TypeScript", "Responsive UI"],
              "Add backend skills": ["Node.js", "REST APIs", "Database Design", "Authentication"],
              "Add soft skills": ["Leadership", "Collaboration", "Stakeholder Management", "Mentoring"],
            };
            onUpdateResume("skills", mergeUniqueItems(resume.skills, packs[suggestion] ?? []));
          }}
        />
      </div>
    );
  }

  if (activeSection === "experience") {
    return (
      <ExperienceEditor
        items={resume.experience}
        onChange={(experience) => onUpdateResume("experience", experience)}
      />
    );
  }

  if (activeSection === "projects") {
    return (
      <ProjectEditor
        items={resume.projects}
        onChange={(projects) => onUpdateResume("projects", projects)}
      />
    );
  }

  return (
    <EducationEditor
      items={resume.education}
      onChange={(education) => onSetResume((current) => ({ ...current, education }))}
    />
  );
}

function EditorIntro({ title, description }: { title: string; description: string }) {
  return (
    <div>
      <h3 className="font-heading text-2xl font-semibold text-slate-950 dark:text-white">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">{description}</p>
    </div>
  );
}

function PhotoUploader({ photoDataUrl, onChange }: { photoDataUrl: string; onChange: (value: string) => void }) {
  const inputId = "resume-studio-photo";

  const handlePhoto = (file: File | undefined) => {
    if (!file) return;
    if (!file.type.startsWith("image/")) return;
    const reader = new FileReader();
    reader.onload = () => onChange(String(reader.result || ""));
    reader.readAsDataURL(file);
  };

  return (
    <div className="sm:col-span-2 rounded-[1rem] border border-slate-200 bg-slate-50 p-4 dark:border-white/10 dark:bg-white/[0.04]">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <div className="grid size-16 shrink-0 place-items-center overflow-hidden rounded-full border border-slate-200 bg-white text-sm font-black text-primary shadow-sm dark:border-white/10 dark:bg-white/[0.08]">
            {photoDataUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={photoDataUrl} alt="Resume profile" className="size-full object-cover" />
            ) : (
              <UserRound className="size-7" aria-hidden="true" />
            )}
          </div>
          <div>
            <div className="text-sm font-black text-slate-900 dark:text-white">Profile photo</div>
            <p className="mt-1 text-xs font-semibold leading-5 text-slate-500 dark:text-slate-300">
              This appears only on photo templates.
            </p>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          <input
            id={inputId}
            type="file"
            accept="image/*"
            className="sr-only"
            onChange={(event) => {
              handlePhoto(event.target.files?.[0]);
              event.currentTarget.value = "";
            }}
          />
          <button
            type="button"
            onClick={() => document.getElementById(inputId)?.click()}
            className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-xs font-black text-primary-foreground shadow-sm transition hover:-translate-y-0.5"
          >
            <UploadCloud className="size-4" aria-hidden="true" />
            Upload photo
          </button>
          {photoDataUrl ? (
            <button
              type="button"
              onClick={() => onChange("")}
              className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-black text-slate-600 transition hover:border-rose-300 hover:text-rose-600 dark:border-white/10 dark:bg-white/[0.06] dark:text-slate-200"
            >
              <Trash2 className="size-4" aria-hidden="true" />
              Remove
            </button>
          ) : null}
        </div>
      </div>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  className = "",
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  className?: string;
}) {
  return (
    <label className={`block ${className}`}>
      <span className="mb-2 block text-sm font-black text-slate-800 dark:text-slate-200">{label}</span>
      <input className={inputClasses()} value={value} onChange={(event) => onChange(event.target.value)} />
    </label>
  );
}

function buildAssistantOptions(suggestion: string) {
  const lower = suggestion.toLowerCase();
  if (lower.includes("headline")) {
    return [
      { title: "Software role", value: "Frontend Developer | React.js, Next.js, TypeScript" },
      { title: "Full stack role", value: "Full Stack Developer | Node.js, React.js, Cloud APIs" },
      { title: "Fresher role", value: "Entry-Level Software Developer | Projects, JavaScript, Problem Solving" },
    ];
  }
  if (lower.includes("frontend")) {
    return [
      { title: "Modern frontend", value: "React.js, Next.js, TypeScript, Responsive UI, Tailwind CSS" },
      { title: "Performance focused", value: "JavaScript, Web Performance, SEO, Accessibility, Component Design" },
      { title: "Product UI", value: "React.js, Design Systems, Figma Handoff, State Management, API Integration" },
    ];
  }
  if (lower.includes("backend")) {
    return [
      { title: "API focused", value: "Node.js, REST APIs, Authentication, PostgreSQL, Redis" },
      { title: "Cloud backend", value: "AWS, Lambda, S3, SQS, API Gateway, Docker" },
      { title: "System design", value: "Database Design, Caching, Webhooks, Security, Background Jobs" },
    ];
  }
  if (lower.includes("soft") || lower.includes("ats")) {
    return [
      { title: "Recruiter keywords", value: "Communication, Problem Solving, Ownership, Documentation, Collaboration" },
      { title: "Leadership keywords", value: "Stakeholder Management, Mentoring, Planning, Delivery Ownership, Cross-functional Collaboration" },
      { title: "Fresher keywords", value: "Learning Agility, Teamwork, Debugging, Project Documentation, Presentation Skills" },
    ];
  }
  if (lower.includes("fresher")) {
    return [
      { title: "Project first", value: "Motivated {role} with strong project experience, practical problem-solving skills, and a focus on building reliable, user-friendly solutions. Comfortable learning new tools quickly and contributing to clean, well-documented work." },
      { title: "Internship ready", value: "Entry-level {role} with hands-on practice across projects, coursework, and collaborative problem solving. Strong foundation in core tools, clean documentation, and consistent learning." },
      { title: "Simple and honest", value: "Aspiring {role} with a practical foundation, strong learning mindset, and experience building academic or personal projects from idea to working output." },
    ];
  }
  if (lower.includes("leadership")) {
    return [
      { title: "Delivery ownership", value: "Experienced {role} with a strong record of owning delivery, coordinating with stakeholders, and improving product quality through clear technical decisions, reusable systems, and measurable execution." },
      { title: "Team impact", value: "Senior {role} skilled at guiding teams, improving engineering practices, and translating business goals into reliable, maintainable product outcomes." },
      { title: "Architecture angle", value: "Results-driven {role} with experience shaping architecture, mentoring developers, and delivering scalable systems with strong product and stakeholder alignment." },
    ];
  }
  return [
    { title: "Concise version", value: "Results-focused {role} with hands-on experience building reliable products, improving workflows, and delivering measurable outcomes." },
    { title: "Keyword rich", value: "ATS-friendly {role} profile with strong skills in execution, collaboration, problem solving, documentation, and role-specific tools." },
    { title: "Balanced version", value: "Practical {role} with a strong mix of technical execution, communication, ownership, and continuous improvement." },
  ];
}

function AiSuggestionPanel({ suggestions, onApply }: { suggestions: string[]; onApply?: (suggestion: string, value?: string) => void }) {
  const [appliedSuggestion, setAppliedSuggestion] = useState("");
  const [activeSuggestion, setActiveSuggestion] = useState("");

  const applySuggestion = (suggestion: string, value?: string) => {
    onApply?.(suggestion, value);
    setAppliedSuggestion(suggestion);
    setActiveSuggestion("");
    window.setTimeout(() => setAppliedSuggestion((current) => (current === suggestion ? "" : current)), 1800);
  };

  const activeOptions = activeSuggestion ? buildAssistantOptions(activeSuggestion) : [];

  return (
    <div className="rounded-[1.15rem] border border-primary/15 bg-gradient-to-br from-[#f3f9ff] to-[#eefaf6] p-4 dark:from-white/[0.06] dark:to-emerald-400/10">
      <div className="flex items-center gap-2 text-sm font-black text-slate-900 dark:text-white">
        <WandSparkles className="size-4 text-primary" aria-hidden="true" />
        AI writing assistant
      </div>
      <p className="mt-2 text-sm font-semibold leading-6 text-slate-600 dark:text-slate-300">
        Use these prompts when you are not sure what to write. You can edit the AI draft after it appears.
      </p>
      <div className="mt-3 flex flex-wrap gap-2">
        {suggestions.map((suggestion) => (
          <button
            key={suggestion}
            type="button"
            onClick={() => setActiveSuggestion(suggestion)}
            className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-bold shadow-sm transition hover:-translate-y-0.5 ${
              appliedSuggestion === suggestion
                ? "border-emerald-200 bg-emerald-50 text-emerald-700 ring-4 ring-emerald-100 dark:border-emerald-300/25 dark:bg-emerald-400/10 dark:text-emerald-200 dark:ring-emerald-400/10"
                : "border-white bg-white/82 text-slate-700 hover:text-primary dark:border-white/10 dark:bg-white/10 dark:text-slate-200"
            }`}
          >
            {appliedSuggestion === suggestion ? <CheckCircle2 className="size-4" aria-hidden="true" /> : null}
            {suggestion}
          </button>
        ))}
      </div>
      <div
        className={`mt-3 flex min-h-6 items-center gap-2 text-xs font-black text-emerald-700 transition ${
          appliedSuggestion ? "translate-y-0 opacity-100" : "-translate-y-1 opacity-0"
        } dark:text-emerald-200`}
        aria-live="polite"
      >
        <CheckCircle2 className="size-4" aria-hidden="true" />
        Applied: {appliedSuggestion}
      </div>
      {activeSuggestion ? (
        <div className="fixed inset-0 z-[80] grid place-items-center bg-slate-950/55 px-4 backdrop-blur-sm">
          <div className="w-full max-w-2xl rounded-[1.35rem] border border-white/20 bg-white p-5 shadow-2xl shadow-slate-950/25 dark:bg-slate-950">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.16em] text-primary">AI suggestions</p>
                <h3 className="mt-2 font-heading text-2xl font-semibold text-slate-950 dark:text-white">{activeSuggestion}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">Choose the version you like. It will be added to the resume immediately.</p>
              </div>
              <button type="button" onClick={() => setActiveSuggestion("")} className="grid size-9 place-items-center rounded-full border border-slate-200 text-slate-500 hover:border-rose-300 hover:text-rose-600 dark:border-white/10 dark:text-slate-300" aria-label="Close AI suggestions">
                <X className="size-4" aria-hidden="true" />
              </button>
            </div>
            <div className="mt-5 grid gap-3">
              {activeOptions.map((option) => (
                <button
                  key={option.title}
                  type="button"
                  onClick={() => applySuggestion(activeSuggestion, option.value)}
                  className="rounded-[1rem] border border-slate-200 bg-slate-50 p-4 text-left transition hover:-translate-y-0.5 hover:border-primary/30 hover:bg-white dark:border-white/10 dark:bg-white/[0.05] dark:hover:bg-white/[0.08]"
                >
                  <span className="flex items-center gap-2 text-sm font-black text-slate-950 dark:text-white">
                    <Sparkles className="size-4 text-primary" aria-hidden="true" />
                    {option.title}
                  </span>
                  <span className="mt-2 block text-sm leading-6 text-slate-600 dark:text-slate-300">{option.value}</span>
                  <span className="mt-3 inline-flex rounded-full bg-primary px-3 py-1.5 text-xs font-black text-primary-foreground">Use this</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

function ChipEditor({
  items,
  onChange,
  placeholder,
}: {
  items: string[];
  onChange: (items: string[]) => void;
  placeholder: string;
}) {
  const [draft, setDraft] = useState("");
  const [error, setError] = useState("");

  const addItem = () => {
    const next = draft.trim();
    if (!next) return;
    const alreadyExists = items.some((item) => item.trim().toLowerCase() === next.toLowerCase());
    if (alreadyExists) {
      setError(`${next} is already added.`);
      return;
    }
    onChange(mergeUniqueItems(items, [next]));
    setDraft("");
    setError("");
  };

  return (
    <div>
      <div className="relative">
        <input
          className={inputClasses("pr-14")}
          value={draft}
          onChange={(event) => {
            setDraft(event.target.value);
            if (error) setError("");
          }}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              event.preventDefault();
              addItem();
            }
          }}
          placeholder={placeholder}
        />
        <button
          type="button"
          onClick={addItem}
          className="absolute right-2 top-1/2 grid size-9 -translate-y-1/2 place-items-center rounded-full bg-primary text-primary-foreground shadow-lg shadow-primary/20 transition hover:-translate-y-[52%] hover:bg-primary-hover"
          aria-label="Add skill"
          title="Add skill"
        >
          <Plus className="size-4" aria-hidden="true" />
        </button>
      </div>
      <p
        className={`mt-2 min-h-5 text-xs font-bold transition ${
          error ? "text-rose-600 opacity-100 dark:text-rose-300" : "text-transparent opacity-0"
        }`}
        aria-live="polite"
      >
        {error || "No duplicate skill"}
      </p>
      <div className="mt-4 flex flex-wrap gap-2">
        {mergeUniqueItems([], items).map((item) => (
          <span key={item} className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-2 text-sm font-bold text-slate-700 dark:border-white/10 dark:bg-white/[0.05] dark:text-slate-200">
            {item}
            <button
              type="button"
              onClick={() => onChange(items.filter((current) => current.trim().toLowerCase() !== item.trim().toLowerCase()))}
              aria-label={`Remove ${item}`}
              className="text-slate-400 hover:text-rose-500"
            >
              <Trash2 className="size-3.5" aria-hidden="true" />
            </button>
          </span>
        ))}
      </div>
    </div>
  );
}

function ExperienceEditor({
  items,
  onChange,
}: {
  items: ResumeExperience[];
  onChange: (items: ResumeExperience[]) => void;
}) {
  const updateItem = (id: string, patch: Partial<ResumeExperience>) => {
    onChange(items.map((item) => (item.id === id ? { ...item, ...patch } : item)));
  };
  const addExperience = () => {
    onChange([
      ...items,
      {
        id: `exp-${Date.now()}`,
        role: "Job title",
        company: "Company name",
        location: "City, Country",
        period: "2024-Present",
        bullets: ["Describe your strongest achievement with a measurable result."],
      },
    ]);
  };

  return (
    <div className="space-y-4">
      <EditorIntro title="Experience" description="Each role supports editable bullets, so weak content can be improved without fighting the preview." />
      {items.map((item) => (
        <div key={item.id} className="rounded-[1.15rem] border border-slate-200 bg-slate-50 p-4 dark:border-white/10 dark:bg-white/[0.04]">
          <div className="mb-4 flex items-center justify-between gap-3">
            <div className="inline-flex items-center gap-2 text-sm font-black text-slate-700 dark:text-slate-200">
              <GripVertical className="size-4 text-slate-400" aria-hidden="true" />
              Work role
            </div>
            <button
              type="button"
              onClick={() => onChange(items.filter((current) => current.id !== item.id))}
              className="text-sm font-bold text-rose-600"
            >
              Remove
            </button>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <Field label="Role" value={item.role} onChange={(value) => updateItem(item.id, { role: value })} />
            <Field label="Company" value={item.company} onChange={(value) => updateItem(item.id, { company: value })} />
            <Field label="Location" value={item.location} onChange={(value) => updateItem(item.id, { location: value })} />
            <Field label="Period" value={item.period} onChange={(value) => updateItem(item.id, { period: value })} />
          </div>
          <BulletEditor
            bullets={item.bullets}
            onChange={(bullets) => updateItem(item.id, { bullets })}
          />
        </div>
      ))}
      <button
        type="button"
        onClick={addExperience}
        className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/8 px-4 py-2 text-sm font-black text-primary"
      >
        <Plus className="size-4" aria-hidden="true" />
        Add experience
      </button>
      <AiSuggestionPanel
        suggestions={["Draft role", "Rewrite bullets", "Add numbers", "Make senior level"]}
        onApply={(suggestion) => {
          if (items.length === 0 || suggestion === "Draft role") {
            onChange([
              ...items,
              {
                id: `exp-${Date.now()}`,
                role: "Job title",
                company: "Company name",
                location: "City, Country",
                period: "2023-Present",
                bullets: [
                  "Owned key workstreams and delivered improvements that increased quality, speed, or customer satisfaction.",
                  "Collaborated with cross-functional teams to solve problems, document workflows, and improve delivery.",
                ],
              },
            ]);
            return;
          }
          onChange(
            items.map((item, index) =>
              index === 0
                ? {
                    ...item,
                    bullets: [
                      "Improved a key workflow by 25% through better planning, execution, and follow-up.",
                      "Led cross-functional coordination across product, operations, and technical teams to deliver reliable outcomes.",
                    ],
                  }
                : item,
            ),
          );
        }}
      />
    </div>
  );
}

function ProjectEditor({
  items,
  onChange,
}: {
  items: ResumeProject[];
  onChange: (items: ResumeProject[]) => void;
}) {
  const updateItem = (id: string, patch: Partial<ResumeProject>) => {
    onChange(items.map((item) => (item.id === id ? { ...item, ...patch } : item)));
  };
  const addProject = () => {
    onChange([
      ...items,
      {
        id: `project-${Date.now()}`,
        name: "Project name",
        stack: "Tech stack",
        bullets: ["Explain the product, your ownership, and the business or technical impact."],
      },
    ]);
  };

  return (
    <div className="space-y-4">
      <EditorIntro title="Projects" description="Projects are especially important for freshers, career switchers, and product engineers." />
      {items.map((item) => (
        <div key={item.id} className="rounded-[1.15rem] border border-slate-200 bg-slate-50 p-4 dark:border-white/10 dark:bg-white/[0.04]">
          <div className="mb-4 flex items-center justify-between gap-3">
            <div className="inline-flex items-center gap-2 text-sm font-black text-slate-700 dark:text-slate-200">
              <GripVertical className="size-4 text-slate-400" aria-hidden="true" />
              Project
            </div>
            <button type="button" onClick={() => onChange(items.filter((current) => current.id !== item.id))} className="text-sm font-bold text-rose-600">
              Remove
            </button>
          </div>
          <div className="grid gap-3">
            <Field label="Project name" value={item.name} onChange={(value) => updateItem(item.id, { name: value })} />
            <Field label="Tech stack" value={item.stack} onChange={(value) => updateItem(item.id, { stack: value })} />
          </div>
          <BulletEditor bullets={item.bullets} onChange={(bullets) => updateItem(item.id, { bullets })} />
        </div>
      ))}
      <button type="button" onClick={addProject} className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/8 px-4 py-2 text-sm font-black text-primary">
        <Plus className="size-4" aria-hidden="true" />
        Add project
      </button>
      <AiSuggestionPanel
        suggestions={["Draft project", "Turn project into impact", "Add stack keywords", "Make fresher friendly"]}
        onApply={(suggestion) => {
          if (items.length === 0 || suggestion === "Draft project") {
            onChange([
              ...items,
              {
                id: `project-${Date.now()}`,
                name: "Portfolio Project",
                stack: "React.js, Node.js, REST APIs, Database",
                bullets: [
                  "Built an end-to-end project with clean UI, reusable components, and structured backend APIs.",
                  "Added authentication, dashboard flows, and clear documentation to make the project easy to review.",
                ],
              },
            ]);
            return;
          }
          onChange(
            items.map((item, index) =>
              index === 0
                ? {
                    ...item,
                    bullets: [
                      "Converted the project into a business-focused product story with clear ownership, technical decisions, and measurable user value.",
                      "Highlighted architecture, data flow, error handling, and deployment readiness for stronger recruiter review.",
                    ],
                  }
                : item,
            ),
          );
        }}
      />
    </div>
  );
}

function EducationEditor({
  items,
  onChange,
}: {
  items: ResumeEducation[];
  onChange: (items: ResumeEducation[]) => void;
}) {
  const updateItem = (id: string, patch: Partial<ResumeEducation>) => {
    onChange(items.map((item) => (item.id === id ? { ...item, ...patch } : item)));
  };
  const addEducation = () => {
    onChange([
      ...items,
      {
        id: `edu-${Date.now()}`,
        degree: "Degree or certification",
        school: "Institute name",
        period: "2020-2024",
        location: "City, Country",
      },
    ]);
  };

  return (
    <div className="space-y-4">
      <EditorIntro title="Education" description="Keep education clean and scan-friendly. Freshers can keep it higher in the final layout." />
      {items.map((item) => (
        <div key={item.id} className="rounded-[1.15rem] border border-slate-200 bg-slate-50 p-4 dark:border-white/10 dark:bg-white/[0.04]">
          <div className="mb-4 flex items-center justify-between gap-3">
            <div className="inline-flex items-center gap-2 text-sm font-black text-slate-700 dark:text-slate-200">
              <GraduationCap className="size-4 text-primary" aria-hidden="true" />
              Education
            </div>
            <button type="button" onClick={() => onChange(items.filter((current) => current.id !== item.id))} className="text-sm font-bold text-rose-600">
              Remove
            </button>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <Field label="Degree" value={item.degree} onChange={(value) => updateItem(item.id, { degree: value })} />
            <Field label="School" value={item.school} onChange={(value) => updateItem(item.id, { school: value })} />
            <Field label="Location" value={item.location} onChange={(value) => updateItem(item.id, { location: value })} />
            <Field label="Period" value={item.period} onChange={(value) => updateItem(item.id, { period: value })} />
          </div>
        </div>
      ))}
      <button type="button" onClick={addEducation} className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/8 px-4 py-2 text-sm font-black text-primary">
        <Plus className="size-4" aria-hidden="true" />
        Add education
      </button>
      <AiSuggestionPanel
        suggestions={["Add coursework", "Add certification", "Keep education concise"]}
        onApply={(suggestion) => {
          if (suggestion === "Add certification") {
            onChange([
              ...items,
              {
                id: `edu-${Date.now()}`,
                degree: "Professional Certification",
                school: "Issuing organization",
                period: "2024",
                location: "Online",
              },
            ]);
          }
        }}
      />
    </div>
  );
}

function BulletEditor({ bullets, onChange }: { bullets: string[]; onChange: (bullets: string[]) => void }) {
  return (
    <div className="mt-4 space-y-3">
      <div className="text-sm font-black text-slate-800 dark:text-slate-200">Bullets</div>
      {bullets.map((bullet, index) => (
        <div key={index} className="flex gap-2">
          <textarea
            className={textareaClasses("min-h-20")}
            value={bullet}
            onChange={(event) => onChange(bullets.map((item, bulletIndex) => (bulletIndex === index ? event.target.value : item)))}
          />
          <button
            type="button"
            onClick={() => onChange(bullets.filter((_, bulletIndex) => bulletIndex !== index))}
            className="grid size-11 shrink-0 place-items-center rounded-[0.85rem] border border-slate-200 bg-white text-slate-500 hover:text-rose-600 dark:border-white/10 dark:bg-white/[0.05]"
            aria-label="Remove bullet"
          >
            <Trash2 className="size-4" aria-hidden="true" />
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={() => onChange([...bullets, "Add another achievement with action, scope, and result."])}
        className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-bold text-slate-700 hover:border-primary/35 hover:text-primary dark:border-white/10 dark:bg-white/[0.05] dark:text-slate-200"
      >
        <Plus className="size-4" aria-hidden="true" />
        Add bullet
      </button>
    </div>
  );
}

function ResumePreview({
  resume,
  template,
  layout,
  accentTheme,
}: {
  resume: StudioResume;
  template: TemplateId;
  layout: TemplateOption["layout"];
  accentTheme: (typeof accentMap)[AccentId];
}) {
  const twoColumn = template === "creative" || template === "photo" || layout === "Two column" || layout === "Photo";
  const compact = template === "compact" || layout === "Compact";
  const executive = template === "executive" || template.includes("executive") || template.includes("senior");
  const fullName = `${resume.firstName} ${resume.lastName}`.trim() || "Your Name";
  const headline = resume.headline.trim() || "Target job title";
  const contactItems = [resume.city && resume.country ? `${resume.city}, ${resume.country}` : resume.city || resume.country, resume.phone, resume.email, resume.portfolio].filter(Boolean);
  const summary = resume.summary.trim() || "Write a short professional summary that highlights your role, strengths, tools, and strongest career achievements.";
  const skills = resume.skills.length ? resume.skills : ["Skill 1", "Skill 2", "Skill 3", "Tool or technology"];
  const experience = resume.experience.length
    ? resume.experience
    : [
        {
          id: "preview-exp",
          role: "Add your latest role",
          company: "Company name",
          location: "Location",
          period: "Year-Year",
          bullets: ["Add a bullet with action, scope, and measurable result."],
        },
      ];
  const projects = resume.projects.length
    ? resume.projects
    : [
        {
          id: "preview-project",
          name: "Project name",
          stack: "Tools or technologies used",
          bullets: ["Describe the project, your ownership, and the outcome."],
        },
      ];
  const education = resume.education.length
    ? resume.education
    : [
        {
          id: "preview-education",
          degree: "Degree or certification",
          school: "Institute name",
          location: "Location",
          period: "Year",
        },
      ];

  return (
    <article className={`min-h-[64rem] bg-white p-8 text-slate-800 shadow-xl ${compact ? "text-[0.78rem]" : "text-[0.86rem]"}`}>
      <div className={twoColumn ? "grid gap-6 sm:grid-cols-[0.34fr_0.66fr]" : ""}>
        {twoColumn ? (
          <aside className={`${accentTheme.bg} -m-8 mr-0 min-h-[64rem] p-6`}>
            {template === "photo" || layout === "Photo" ? (
              <div className={`mb-5 grid size-20 place-items-center overflow-hidden rounded-full ${accentTheme.dot} text-xl font-black text-white`}>
                {resume.photoDataUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={resume.photoDataUrl} alt={fullName} className="size-full object-cover" />
                ) : (
                  fullName.split(" ").map((part) => part.charAt(0)).join("").slice(0, 2) || "YN"
                )}
              </div>
            ) : null}
            <PreviewHeading title="Contact" accentTheme={accentTheme} />
            <div className="mt-2 space-y-1">
              {(contactItems.length ? contactItems : ["City, Country", "Phone number", "Email address"]).map((item) => (
                <p key={item} className="break-all leading-5">{item}</p>
              ))}
            </div>
            <PreviewHeading title="Skills" accentTheme={accentTheme} className="mt-6" />
            <div className="mt-3 space-y-1.5">
              {skills.slice(0, 12).map((skill) => (
                <div key={skill} className="rounded border border-white/80 bg-white/70 px-2 py-1 font-semibold">
                  {skill}
                </div>
              ))}
            </div>
          </aside>
        ) : null}

        <main>
          <header className={executive ? "border-b-4 border-slate-900 pb-5 text-center" : "border-b-4 pb-4"}>
            <h1 className="font-heading text-4xl font-semibold leading-tight text-slate-950">
              {fullName}
            </h1>
            <p className={`mt-2 text-base font-black leading-6 ${accentTheme.text}`}>{headline}</p>
            {!twoColumn ? (
              <p className="mt-2 text-sm leading-5 text-slate-600">
                {contactItems.length ? contactItems.join(" | ") : "City, Country | Phone number | Email address | Portfolio"}
              </p>
            ) : null}
          </header>

          <PreviewSection title="Summary" accentTheme={accentTheme}>
            <p className="leading-6">{summary}</p>
          </PreviewSection>

          {!twoColumn ? (
            <PreviewSection title="Skills" accentTheme={accentTheme}>
              <div className="flex flex-wrap gap-1.5">
                {skills.map((skill) => (
                  <span key={skill} className="rounded border border-slate-200 px-2 py-1 text-xs font-bold">
                    {skill}
                  </span>
                ))}
              </div>
            </PreviewSection>
          ) : null}

          <PreviewSection title="Experience" accentTheme={accentTheme}>
            <div className="space-y-4">
              {experience.map((item) => (
                <div key={item.id}>
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <div>
                      <h3 className="font-heading text-lg font-semibold text-slate-950">{item.role}</h3>
                      <p className="font-semibold text-slate-600">{item.company} | {item.location}</p>
                    </div>
                    <span className="font-black text-slate-500">{item.period}</span>
                  </div>
                  <ul className="mt-2 list-disc space-y-1 pl-5 leading-6">
                    {item.bullets.map((bullet, index) => <li key={index}>{bullet}</li>)}
                  </ul>
                </div>
              ))}
            </div>
          </PreviewSection>

          <PreviewSection title="Projects" accentTheme={accentTheme}>
            <div className="space-y-4">
              {projects.map((item) => (
                <div key={item.id}>
                  <h3 className="font-heading text-lg font-semibold text-slate-950">{item.name}</h3>
                  <p className={`font-bold ${accentTheme.text}`}>{item.stack}</p>
                  <ul className="mt-2 list-disc space-y-1 pl-5 leading-6">
                    {item.bullets.map((bullet, index) => <li key={index}>{bullet}</li>)}
                  </ul>
                </div>
              ))}
            </div>
          </PreviewSection>

          <PreviewSection title="Education" accentTheme={accentTheme}>
            {education.map((item) => (
              <div key={item.id} className="flex flex-wrap items-start justify-between gap-2">
                <div>
                  <h3 className="font-heading text-lg font-semibold text-slate-950">{item.degree}</h3>
                  <p className="font-semibold text-slate-600">{item.school} | {item.location}</p>
                </div>
                <span className="font-black text-slate-500">{item.period}</span>
              </div>
            ))}
          </PreviewSection>
        </main>
      </div>
    </article>
  );
}

function PreviewHeading({ title, accentTheme, className = "" }: { title: string; accentTheme: (typeof accentMap)[AccentId]; className?: string }) {
  return <h2 className={`font-heading text-sm font-black uppercase tracking-[0.18em] ${accentTheme.text} ${className}`}>{title}</h2>;
}

function PreviewSection({
  title,
  accentTheme,
  children,
}: {
  title: string;
  accentTheme: (typeof accentMap)[AccentId];
  children: ReactNode;
}) {
  return (
    <section className="mt-5">
      <h2 className={`mb-2 border-b-2 pb-1 font-heading text-sm font-black uppercase tracking-[0.18em] ${accentTheme.text}`}>
        {title}
      </h2>
      {children}
    </section>
  );
}

function PreviewMetric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-[1rem] border border-slate-200 bg-white p-4 text-center shadow-sm dark:border-white/10 dark:bg-white/[0.05]">
      <div className="font-heading text-2xl font-semibold text-slate-950 dark:text-white">{value}</div>
      <div className="mt-1 text-[0.66rem] font-black uppercase tracking-[0.16em] text-slate-500">{label}</div>
    </div>
  );
}

function ImportResumeOverlay({ progress, fileName }: { progress: number; fileName: string }) {
  const steps = ["Reading resume file", "Extracting profile details", "Filling editor sections", "Preparing live preview"];
  return (
    <div className="fixed inset-0 z-[80] grid place-items-center bg-slate-950/60 px-4 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-[1.35rem] border border-white/20 bg-white p-6 text-center shadow-2xl shadow-slate-950/25 dark:bg-slate-950">
        <div className="mx-auto grid size-14 place-items-center rounded-2xl bg-primary text-primary-foreground">
          <LoaderCircle className="size-7 animate-spin" aria-hidden="true" />
        </div>
        <h3 className="mt-4 font-heading text-2xl font-semibold text-slate-950 dark:text-white">Importing your resume</h3>
        <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">
          AI is reading <span className="font-black">{fileName}</span> and auto-filling the editor.
        </p>
        <div className="mt-5 h-3 overflow-hidden rounded-full bg-slate-200 dark:bg-white/12">
          <div className="h-full rounded-full bg-primary transition-all duration-500" style={{ width: `${Math.min(Math.max(progress, 0), 100)}%` }} />
        </div>
        <div className="mt-3 text-xs font-black uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">{Math.round(progress)}% complete</div>
        <div className="mt-5 grid gap-2 text-left">
          {steps.map((step, index) => {
            const done = progress >= (index + 1) * 22;
            return (
              <div key={step} className={`flex items-center gap-2 rounded-full px-3 py-2 text-xs font-black ${done ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-400/10 dark:text-emerald-200" : "bg-slate-50 text-slate-500 dark:bg-white/[0.05] dark:text-slate-300"}`}>
                {done ? <CheckCircle2 className="size-4" aria-hidden="true" /> : <LoaderCircle className="size-4 animate-spin" aria-hidden="true" />}
                {step}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function StudioDownloadModal({ onClose, onDownload }: { onClose: () => void; onDownload: (format: "pdf" | "doc" | "txt") => void }) {
  return (
    <div className="fixed inset-0 z-[80] grid place-items-center bg-slate-950/55 px-4 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-[1.25rem] border border-white/20 bg-white p-5 shadow-2xl shadow-slate-950/25 dark:bg-slate-950">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.16em] text-primary">Download resume</p>
            <h3 className="mt-2 font-heading text-2xl font-semibold text-slate-950 dark:text-white">Choose a format</h3>
          </div>
          <button type="button" onClick={onClose} className="grid size-9 place-items-center rounded-full border border-slate-200 text-slate-500 transition hover:border-rose-300 hover:text-rose-600 dark:border-white/10 dark:text-slate-300" aria-label="Close download options">
            <X className="size-4" aria-hidden="true" />
          </button>
        </div>
        <div className="mt-5 grid gap-3">
          <button type="button" onClick={() => onDownload("pdf")} className="flex items-center justify-between gap-4 rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-left transition hover:border-emerald-400 dark:border-emerald-300/20 dark:bg-emerald-400/10">
            <span><strong className="block text-slate-950 dark:text-white">PDF</strong><span className="mt-1 block text-sm text-slate-600 dark:text-slate-300">Opens a clean print view. Choose Save as PDF.</span></span>
            <Download className="size-5 text-emerald-700 dark:text-emerald-200" aria-hidden="true" />
          </button>
          <button type="button" onClick={() => onDownload("doc")} className="flex items-center justify-between gap-4 rounded-xl border border-slate-200 bg-white p-4 text-left transition hover:border-primary/35 dark:border-white/10 dark:bg-white/[0.06]">
            <span><strong className="block text-slate-950 dark:text-white">Word</strong><span className="mt-1 block text-sm text-slate-600 dark:text-slate-300">Editable in Word or Google Docs.</span></span>
            <FileText className="size-5 text-primary" aria-hidden="true" />
          </button>
          <button type="button" onClick={() => onDownload("txt")} className="flex items-center justify-between gap-4 rounded-xl border border-slate-200 bg-white p-4 text-left transition hover:border-primary/35 dark:border-white/10 dark:bg-white/[0.06]">
            <span><strong className="block text-slate-950 dark:text-white">Text</strong><span className="mt-1 block text-sm text-slate-600 dark:text-slate-300">Plain text for job portals and forms.</span></span>
            <Copy className="size-5 text-primary" aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
  );
}

function StudioIconButton({
  icon: Icon,
  label,
  onClick,
}: {
  icon: LucideIcon;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="grid size-10 place-items-center rounded-full border border-slate-200 bg-white text-slate-700 shadow-sm transition hover:-translate-y-0.5 hover:border-primary/35 hover:text-primary dark:border-white/10 dark:bg-white/[0.06] dark:text-slate-200"
      aria-label={label}
      title={label}
    >
      <Icon className="size-[1.05rem]" aria-hidden="true" />
    </button>
  );
}

function slugify(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || "resume";
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function waitForPrintableAssets(frameDocument: Document) {
  const images = Array.from(frameDocument.images);
  if (!images.length) return Promise.resolve();
  return Promise.all(
    images.map((image) => {
      if (image.complete && image.naturalWidth > 0) return Promise.resolve();
      return new Promise<void>((resolve) => {
        const done = () => resolve();
        image.addEventListener("load", done, { once: true });
        image.addEventListener("error", done, { once: true });
        window.setTimeout(done, 900);
      });
    }),
  ).then(() => undefined);
}

function createStudioPrintableResume(resume: StudioResume, template: TemplateOption, accentTheme: (typeof accentMap)[AccentId]) {
  const fullName = `${resume.firstName} ${resume.lastName}`.trim() || "Your Name";
  const contactLine = [resume.city && resume.country ? `${resume.city}, ${resume.country}` : resume.city || resume.country, resume.phone, resume.email, resume.portfolio].filter(Boolean).join(" | ");
  const accentColor = accentTheme.name === "Green" ? "#2f7d73" : accentTheme.name === "Slate" ? "#2f3a45" : accentTheme.name === "Purple" ? "#7551d6" : accentTheme.name === "Amber" ? "#d98922" : "#1e4aa8";
  const softAccent = accentTheme.name === "Green" ? "#eefaf6" : accentTheme.name === "Slate" ? "#f2f5f8" : accentTheme.name === "Purple" ? "#f5f1ff" : accentTheme.name === "Amber" ? "#fff7e8" : "#eef5ff";
  const hasPhotoHeader = template.layout === "Photo";
  const list = (items: string[]) => items.map((item) => `<li>${escapeHtml(item)}</li>`).join("");
  const sectionRows = (items: Array<{ role?: string; name?: string; degree?: string; company?: string; school?: string; location?: string; period?: string; stack?: string; bullets?: string[] }>) =>
    items.map((item) => `
      <div class="entry">
        <table class="row-table">
          <tr>
            <td class="row-title">${escapeHtml(item.role || item.name || item.degree || "")}</td>
            <td class="row-period">${escapeHtml(item.period || "")}</td>
          </tr>
        </table>
        <p class="meta">${escapeHtml([item.company || item.school || item.stack, item.location].filter(Boolean).join(" | "))}</p>
        ${item.bullets?.length ? `<ul>${list(item.bullets)}</ul>` : ""}
      </div>
    `).join("");
  const skills = resume.skills.length ? escapeHtml(resume.skills.join(", ")) : "Add skills that match your target role.";
  const initials = escapeHtml(fullName.split(" ").map((part) => part[0]).join("").slice(0, 2) || "YN");

  return `<!doctype html>
<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:w="urn:schemas-microsoft-com:office:word" xmlns="http://www.w3.org/TR/REC-html40">
<head>
  <meta charset="utf-8" />
  <title>${escapeHtml(fullName)} Resume</title>
  <style>
    @page { size: A4; margin: 10mm 11mm; }
    * { box-sizing: border-box; }
    html, body { margin: 0; padding: 0; background: #fff; }
    body { color: #172033; font-family: Arial, Helvetica, sans-serif; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
    main { width: 188mm; max-width: 188mm; margin: 0 auto; padding: 0; background: #fff; }
    .header-table { width: 100%; border-collapse: collapse; border-bottom: 3px solid ${accentColor}; margin-bottom: 12px; }
    .photo-cell { width: 26mm; padding: 0 8mm 8px 0; vertical-align: top; }
    .photo-wrap { width: 22mm; height: 22mm; border-radius: 50%; overflow: hidden; background: ${softAccent}; border: 2px solid ${accentColor}; color: ${accentColor}; font-size: 18px; font-weight: 800; text-align: center; line-height: 21mm; }
    .photo-wrap img { width: 22mm; height: 22mm; display: block; object-fit: cover; border-radius: 50%; }
    .name-cell { padding: 0 0 8px; vertical-align: top; }
    h1 { margin: 0; color: #070b1a; font-size: 28px; line-height: 1.05; font-weight: 800; }
    .headline { margin-top: 6px; color: ${accentColor}; font-size: 13px; line-height: 1.35; font-weight: 800; }
    .contact { margin-top: 6px; color: #475569; font-size: 10.5px; line-height: 1.4; }
    section { margin-top: 10px; }
    h2 { margin: 0 0 6px; color: ${accentColor}; border-bottom: 1.5px solid ${accentColor}; padding-bottom: 3px; font-size: 10.5px; line-height: 1.2; letter-spacing: .12em; text-transform: uppercase; font-weight: 900; }
    p { margin: 0; color: #334155; font-size: 10.7px; line-height: 1.38; }
    .skills { color: #26364d; font-size: 10.5px; line-height: 1.42; font-weight: 700; }
    .entry { margin-top: 8px; break-inside: avoid; page-break-inside: avoid; }
    .row-table { width: 100%; border-collapse: collapse; }
    .row-title { color: #0f172a; font-size: 11.2px; line-height: 1.25; font-weight: 800; vertical-align: top; }
    .row-period { width: 26mm; color: #64748b; font-size: 9.6px; line-height: 1.25; text-align: right; vertical-align: top; font-weight: 800; }
    .meta { margin-top: 2px; color: #475569; font-size: 10.2px; line-height: 1.28; }
    ul { margin: 4px 0 0; padding-left: 15px; color: #334155; font-size: 10.4px; line-height: 1.35; }
    li { margin: 1.5px 0; }
    @media print {
      body { background: #fff !important; }
      main { width: auto; max-width: none; }
      a { color: inherit; text-decoration: none; }
    }
  </style>
</head>
<body>
  <main>
    <table class="header-table">
      <tr>
        ${hasPhotoHeader ? `<td class="photo-cell"><div class="photo-wrap">${resume.photoDataUrl ? `<img src="${resume.photoDataUrl}" alt="${escapeHtml(fullName)}" />` : initials}</div></td>` : ""}
        <td class="name-cell">
          <h1>${escapeHtml(fullName)}</h1>
          <div class="headline">${escapeHtml(resume.headline || "Target job title")}</div>
          <div class="contact">${escapeHtml(contactLine || "City, Country | Phone | Email | Portfolio")}</div>
        </td>
      </tr>
    </table>
    <section><h2>Summary</h2><p>${escapeHtml(resume.summary || "Write a short professional summary.")}</p></section>
    <section><h2>Skills</h2><p class="skills">${skills}</p></section>
    <section><h2>Experience</h2>${sectionRows(resume.experience)}</section>
    <section><h2>Projects</h2>${sectionRows(resume.projects)}</section>
    <section><h2>Education</h2>${sectionRows(resume.education)}</section>
  </main>
</body>
</html>`;
}
