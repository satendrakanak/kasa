"use client";

import { forwardRef, useEffect, useMemo, useRef, useState } from "react";
import {
  AlertCircle,
  BarChart3,
  BriefcaseBusiness,
  ChevronDown,
  CheckCircle2,
  Copy,
  Download,
  FileText,
  LoaderCircle,
  Printer,
  RotateCcw,
  Search,
  Share2,
  Sparkles,
  UploadCloud,
  X,
} from "lucide-react";

const roleFamilies = [
  "Software Engineering",
  "Data & AI",
  "Product & Design",
  "Cloud & DevOps",
  "Cybersecurity",
  "Business & Marketing",
  "Finance & Operations",
] as const;

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
  "Analytics Engineer",
  "Machine Learning Engineer",
  "AI Engineer",
  "Generative AI Engineer",
  "MLOps Engineer",
  "Prompt Engineer",
  "Computer Vision Engineer",
  "NLP Engineer",
  "Cloud Engineer",
  "DevOps Engineer",
  "Site Reliability Engineer",
  "AWS Cloud Engineer",
  "Azure Cloud Engineer",
  "GCP Cloud Engineer",
  "QA Engineer",
  "SDET",
  "Automation Test Engineer",
  "Cybersecurity Analyst",
  "Security Engineer",
  "SOC Analyst",
  "Network Engineer",
  "Database Administrator",
  "UI/UX Designer",
  "Product Designer",
  "Graphic Designer",
  "Product Manager",
  "Project Manager",
  "Scrum Master",
  "Digital Marketing Executive",
  "SEO Executive",
  "Performance Marketing Manager",
  "Content Writer",
  "Social Media Manager",
  "Finance Analyst",
  "Accountant",
  "CA Articleship",
  "HR Executive",
  "Recruiter",
  "Operations Executive",
  "Sales Development Representative",
  "Customer Support Executive",
  "Teacher",
  "Academic Counselor",
] as const;

const languageOptions = ["English", "Hindi", "Hinglish"] as const;
const popularSkills = [
  "HTML",
  "CSS",
  "JavaScript",
  "TypeScript",
  "React",
  "Next.js",
  "Node.js",
  "Java",
  "Spring Boot",
  "Python",
  "Django",
  "SQL",
  "MongoDB",
  "Git",
  "AWS",
  "Docker",
  "Kubernetes",
  "Power BI",
  "Excel",
  "Machine Learning",
  "Deep Learning",
  "NLP",
  "LLMs",
  "LangChain",
  "Prompt Engineering",
  "Figma",
] as const;

const storageKey = "kasa-ai-resume-ats:last";
const clamp = (value: number, min: number, max: number) => Math.min(Math.max(Number.isFinite(value) ? value : min, min), max);

type UploadedResume = {
  name: string;
  mimeType: string;
  data: string;
  size: number;
};

type ResumeAnalysis = {
  atsScore: number;
  roleFit: string;
  verdict: string;
  summary: string;
  missingKeywords: string[];
  missingSkills: string[];
  strengths: string[];
  weakAreas: string[];
  improvedBullets: string[];
  projectsToAdd: string[];
  interviewQuestions: string[];
  roadmap: { week: string; focus: string; tasks: string[] }[];
  salaryRange: string;
  recruiterChecklist: string[];
  componentScores: { label: string; score: number }[];
  quickWins: string[];
};

type ResumeProfile = {
  candidateName: string;
  detectedRole: string;
  roleFamily: string;
  yearsExperience: number;
  experienceLevel: string;
  skills: string[];
  summary: string;
};

type SavedResumeAnalysis = {
  resumeText: string;
  uploadedResume: UploadedResume | null;
  targetRole: string;
  roleFamily: string;
  candidateName: string;
  yearsExperience: number;
  experienceLevel?: string;
  selectedSkills: string[];
  customSkill: string;
  targetPackage: number;
  dailyHours: number;
  language: string;
  analysis: ResumeAnalysis;
};

export function ResumeAtsChecker() {
  const resultPanelRef = useRef<HTMLDivElement>(null);
  const [resumeText, setResumeText] = useState("");
  const [uploadedResume, setUploadedResume] = useState<UploadedResume | null>(null);
  const [roleFamily, setRoleFamily] = useState<(typeof roleFamilies)[number]>("Software Engineering");
  const [candidateName, setCandidateName] = useState("Candidate");
  const [targetRole, setTargetRole] = useState("Frontend Developer");
  const [yearsExperience, setYearsExperience] = useState(0);
  const [selectedSkills, setSelectedSkills] = useState<string[]>(["JavaScript", "React", "Git"]);
  const [customSkill, setCustomSkill] = useState("");
  const [targetPackage, setTargetPackage] = useState(8);
  const [dailyHours, setDailyHours] = useState(2);
  const [language, setLanguage] = useState<(typeof languageOptions)[number]>("English");
  const [analysis, setAnalysis] = useState<ResumeAnalysis | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isDetectingProfile, setIsDetectingProfile] = useState(false);
  const [detectedSummary, setDetectedSummary] = useState("");
  const [actionMessage, setActionMessage] = useState("Upload your resume PDF/DOC/DOCX or paste resume text to begin.");
  const [savedAvailable, setSavedAvailable] = useState(false);

  const restoreSavedReport = (saved: Partial<SavedResumeAnalysis>, message = "Last AI resume report restored.") => {
    if (!saved.analysis) return;
    setResumeText(saved.resumeText || "");
    setUploadedResume(saved.uploadedResume || null);
    setCandidateName(saved.candidateName || deriveNameFromResume(saved.uploadedResume?.name) || "Candidate");
    setTargetRole(saved.targetRole || "Frontend Developer");
    setRoleFamily((saved.roleFamily as (typeof roleFamilies)[number]) || "Software Engineering");
    setYearsExperience(clamp(Number(saved.yearsExperience ?? legacyExperienceToYears(saved.experienceLevel)), 0, 20));
    setSelectedSkills(Array.isArray(saved.selectedSkills) ? saved.selectedSkills : []);
    setCustomSkill(saved.customSkill || "");
    setTargetPackage(clamp(Number(saved.targetPackage), 0, 100));
    setDailyHours(clamp(Number(saved.dailyHours), 1, 10));
    setLanguage((saved.language as (typeof languageOptions)[number]) || "English");
    setAnalysis(saved.analysis);
    setSavedAvailable(true);
    setActionMessage(message);
  };

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      const raw = window.localStorage.getItem(storageKey);
      setSavedAvailable(Boolean(raw));
      if (!raw) return;
      const saved = parseSavedReport(raw);
      if (!saved?.analysis) return;
      restoreSavedReport(saved, "Last AI resume report restored.");
    }, 0);
    return () => window.clearTimeout(timeoutId);
  }, []);

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

  const readiness = analysis ? getReadiness(analysis.atsScore) : { label: "Ready to analyze", tone: "blue" };
  const resumeWords = useMemo(() => resumeText.trim().split(/\s+/).filter(Boolean).length, [resumeText]);
  const skillText = [...selectedSkills, customSkill].filter(Boolean).join(", ");
  const experienceLabel = formatExperienceLabel(yearsExperience);

  const resultText = useMemo(() => {
    if (!analysis) return "";
    return [
      "AI Resume ATS Report",
      `Candidate: ${candidateName}`,
      `Target role: ${targetRole}`,
      `Role family: ${roleFamily}`,
      `Target package: ${targetPackage} LPA`,
      `ATS score: ${analysis.atsScore}/100`,
      `Role fit: ${analysis.roleFit}`,
      "",
      `Verdict: ${analysis.verdict}`,
      `Summary: ${analysis.summary}`,
      "",
      "Score breakdown:",
      ...analysis.componentScores.map((item) => `- ${item.label}: ${item.score}/100`),
      "",
      "Quick wins:",
      ...analysis.quickWins.map((item) => `- ${item}`),
      "",
      "Missing keywords:",
      ...analysis.missingKeywords.map((item) => `- ${item}`),
      "",
      "Missing skills:",
      ...analysis.missingSkills.map((item) => `- ${item}`),
      "",
      "Improved resume bullets:",
      ...analysis.improvedBullets.map((item) => `- ${item}`),
      "",
      "Projects to add:",
      ...analysis.projectsToAdd.map((item) => `- ${item}`),
      "",
      "Interview questions:",
      ...analysis.interviewQuestions.map((item) => `- ${item}`),
      "",
      "Roadmap:",
      ...analysis.roadmap.flatMap((item) => [`${item.week}: ${item.focus}`, ...item.tasks.map((task) => `- ${task}`)]),
      "",
      `Salary note: ${analysis.salaryRange}`,
      "Generated with KASA AI Resume ATS Checker",
    ].join("\n");
  }, [analysis, candidateName, roleFamily, targetPackage, targetRole]);

  const clearGenerated = () => {
    if (analysis) setActionMessage("Inputs changed. Generate a fresh ATS report for the updated resume.");
    setAnalysis(null);
  };

  const handleFileUpload = (file: File | undefined) => {
    if (!file) return;
    const mimeType = getSupportedMimeType(file);
    if (!mimeType) {
      setActionMessage("Upload a PDF, DOC, DOCX, or TXT resume file.");
      return;
    }
    if (file.size > 4_000_000) {
      setActionMessage("Please upload a resume under 4 MB.");
      return;
    }
    setUploadProgress(8);
    const reader = new FileReader();
    reader.onprogress = (event) => {
      if (event.lengthComputable) setUploadProgress(Math.min(95, Math.round((event.loaded / event.total) * 95)));
    };
    reader.onload = () => {
      const raw = String(reader.result || "");
      const base64 = raw.includes(",") ? raw.split(",")[1] || "" : raw;
      const nextResume = { name: file.name, mimeType, data: base64, size: file.size };
      setUploadedResume(nextResume);
      setCandidateName(deriveNameFromResume(file.name) || "Candidate");
      setUploadProgress(100);
      clearGenerated();
      setActionMessage("Resume uploaded. Detecting role, experience, and skills from the file...");
      void detectResumeProfile(nextResume, resumeText);
      window.setTimeout(() => setUploadProgress(0), 600);
    };
    reader.onerror = () => {
      setUploadProgress(0);
      setActionMessage("Resume upload failed. Try another file.");
    };
    reader.readAsDataURL(file);
  };

  const detectResumeProfile = async (resumeFile = uploadedResume, pastedText = resumeText) => {
    if (!resumeFile && pastedText.trim().length < 300) {
      setActionMessage("Upload a resume file or paste enough resume text before auto-detecting profile.");
      return;
    }
    setIsDetectingProfile(true);
    setDetectedSummary("");
    try {
      const response = await fetch("/api/tools/resume-profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          resumeText: pastedText,
          fileData: resumeFile?.data,
          fileMimeType: resumeFile?.mimeType,
          fileName: resumeFile?.name,
        }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(typeof data?.error === "string" ? data.error : "Resume profile detection failed.");
      const profile = data.profile as Partial<ResumeProfile> | undefined;
      if (!profile) throw new Error("AI could not detect a usable profile from this resume.");

      if (profile.candidateName) setCandidateName(profile.candidateName);
      if (profile.detectedRole) setTargetRole(profile.detectedRole);
      if (profile.roleFamily && roleFamilies.includes(profile.roleFamily as (typeof roleFamilies)[number])) {
        setRoleFamily(profile.roleFamily as (typeof roleFamilies)[number]);
      }
      const nextYears = clamp(Number(profile.yearsExperience), 0, 20);
      setYearsExperience(nextYears);
      if (Array.isArray(profile.skills) && profile.skills.length) {
        setSelectedSkills(uniqueList(profile.skills, 16));
      }
      clearGenerated();
      setDetectedSummary(profile.summary || `Detected ${formatExperienceLabel(nextYears)} profile from your resume.`);
      setActionMessage("Profile detected from resume. Review the role and generate your AI ATS report.");
    } catch (error) {
      setActionMessage(error instanceof Error ? error.message : "Resume profile detection failed. You can still generate the ATS report.");
    } finally {
      setIsDetectingProfile(false);
    }
  };

  const toggleSkill = (skill: string) => {
    setSelectedSkills((items) => {
      const active = items.some((item) => skillsMatch(item, skill));
      if (active) return items.filter((item) => !skillsMatch(item, skill));
      return uniqueList([...items, skill], 24);
    });
    clearGenerated();
  };

  const restoreLast = () => {
    try {
      const raw = window.localStorage.getItem(storageKey);
      if (!raw) return;
      const saved = parseSavedReport(raw);
      if (!saved?.analysis) return;
      restoreSavedReport(saved);
      window.setTimeout(() => resultPanelRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 100);
    } catch {
      setActionMessage("Could not restore the last report.");
    }
  };

  const reset = () => {
    setResumeText("");
    setUploadedResume(null);
    setRoleFamily("Software Engineering");
    setCandidateName("Candidate");
    setTargetRole("Frontend Developer");
    setYearsExperience(0);
    setSelectedSkills(["JavaScript", "React", "Git"]);
    setCustomSkill("");
    setTargetPackage(8);
    setDailyHours(2);
    setLanguage("English");
    setAnalysis(null);
    setProgress(0);
    setUploadProgress(0);
    setDetectedSummary("");
    setActionMessage("Upload your resume PDF/DOC/DOCX or paste resume text to begin.");
  };

  const generateAnalysis = async () => {
    if (!uploadedResume && resumeText.trim().length < 300) {
      setActionMessage("Upload a resume file or paste at least 300 characters from your resume.");
      return;
    }
    setIsGenerating(true);
    setProgress(8);
    setActionMessage("AI is extracting resume data, checking ATS score, and building your roadmap...");
    try {
      const response = await fetch("/api/tools/resume-ats", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          resumeText,
          fileData: uploadedResume?.data,
          fileMimeType: uploadedResume?.mimeType,
          fileName: uploadedResume?.name,
          targetRole,
          roleFamily,
          yearsExperience,
          experienceLevel: experienceLabel,
          currentSkills: skillText || "Not specified",
          targetPackage,
          dailyHours,
          language,
        }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(typeof data?.error === "string" ? data.error : "AI resume analysis failed.");
      if (!data.analysis) throw new Error("AI did not return a usable resume report.");
      setProgress(96);
      setAnalysis(data.analysis);
      window.localStorage.setItem(
        storageKey,
        JSON.stringify({ resumeText, uploadedResume, targetRole, roleFamily, candidateName, yearsExperience, selectedSkills, customSkill, targetPackage, dailyHours, language, analysis: data.analysis } satisfies SavedResumeAnalysis),
      );
      setSavedAvailable(true);
      setActionMessage(typeof data.remaining === "number" ? `ATS report generated. ${data.remaining} free AI generations left today.` : "ATS report generated.");
      window.setTimeout(() => resultPanelRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 100);
    } catch (error) {
      setActionMessage(error instanceof Error ? error.message : "AI resume analysis failed. Please try again.");
    } finally {
      setProgress(100);
      window.setTimeout(() => {
        setIsGenerating(false);
        setProgress(0);
      }, 450);
    }
  };

  const copyReport = async () => {
    if (!resultText) return;
    try {
      await navigator.clipboard.writeText(resultText);
      setActionMessage("Resume ATS report copied.");
    } catch {
      setActionMessage("Copy was blocked. Use download instead.");
    }
  };

  const downloadReport = () => {
    if (!analysis) return;
    const blob = createResumeAtsPdf({
      analysis,
      candidateName,
      targetRole,
      roleFamily,
      yearsExperience,
      targetPackage,
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${slugify(candidateName || targetRole)}-ats-score-report.pdf`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
    setActionMessage("Beautiful ATS score PDF downloaded.");
  };

  const printReport = () => {
    if (!analysis) return;
    const frame = document.createElement("iframe");
    frame.style.position = "fixed";
    frame.style.right = "0";
    frame.style.bottom = "0";
    frame.style.width = "0";
    frame.style.height = "0";
    frame.style.border = "0";
    document.body.appendChild(frame);
    const frameWindow = frame.contentWindow;
    const frameDocument = frame.contentDocument;
    if (!frameWindow || !frameDocument) {
      frame.remove();
      setActionMessage("Print was blocked. Please try again.");
      return;
    }
    frameDocument.open();
    frameDocument.write(createPrintableAtsReport({ analysis, candidateName, targetRole, roleFamily, yearsExperience, targetPackage }));
    frameDocument.close();
    frameWindow.focus();
    window.setTimeout(() => {
      frameWindow.print();
      frame.remove();
    }, 300);
    setActionMessage("Print view opened with only the ATS report.");
  };

  const shareReport = async () => {
    if (!analysis) return;
    const shareUrl = `${window.location.origin}/tools/resume-ats-checker`;
    const shareTitle = `${candidateName}'s ATS score is ${analysis.atsScore}/100`;
    const shareText = `${candidateName}'s ATS score is ${analysis.atsScore}/100 for ${targetRole}. Check your resume score free on KASA: ${shareUrl}`;
    const pdfFile = new File(
      [createResumeAtsPdf({ analysis, candidateName, targetRole, roleFamily, yearsExperience, targetPackage })],
      `${slugify(candidateName || targetRole)}-ats-score-report.pdf`,
      { type: "application/pdf" },
    );

    try {
      if (navigator.canShare?.({ files: [pdfFile] }) && navigator.share) {
        await navigator.share({ title: shareTitle, text: shareText, url: shareUrl, files: [pdfFile] });
        setActionMessage("ATS score PDF shared.");
        return;
      }
      if (navigator.share) {
        await navigator.share({ title: shareTitle, text: shareText, url: shareUrl });
        setActionMessage("ATS score link shared. PDF sharing is not supported on this browser.");
        return;
      }
      await navigator.clipboard.writeText(shareText);
      setActionMessage("Share text copied. This browser does not support direct sharing.");
    } catch {
      setActionMessage("Share was cancelled or blocked.");
    }
  };

  return (
    <section className="relative px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto grid w-full max-w-[108rem] gap-5 lg:grid-cols-[0.92fr_1.08fr]">
        <div className="rounded-[1.25rem] border border-blue-950/10 bg-white/92 p-5 shadow-xl shadow-blue-950/8 backdrop-blur dark:border-white/10 dark:bg-surface/90 sm:p-7">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-primary dark:text-emerald-200">Career OS setup</p>
              <h2 className="mt-2 font-heading text-3xl font-semibold text-slate-950 dark:text-white">Upload your resume</h2>
              <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">PDF, DOC, DOCX, or pasted text. Choose your target role and let AI build the report.</p>
            </div>
            <button type="button" onClick={reset} className="grid size-10 cursor-pointer place-items-center rounded-full border border-blue-950/10 bg-white text-slate-700 shadow-sm transition hover:border-primary/35 hover:text-primary dark:border-white/10 dark:bg-white/7 dark:text-white" aria-label="Reset resume checker">
              <RotateCcw className="size-4" aria-hidden="true" />
            </button>
          </div>

          <div className="mt-6 grid gap-4">
            <div className="rounded-[1.2rem] border border-dashed border-primary/25 bg-[linear-gradient(135deg,rgba(43,168,255,0.08),rgba(34,181,115,0.08))] p-5 text-center dark:border-emerald-300/25 dark:bg-white/[0.04]">
              <div className="mx-auto grid size-14 place-items-center rounded-2xl bg-white text-primary shadow-sm dark:bg-white/10 dark:text-emerald-200">
                <UploadCloud className="size-7" aria-hidden="true" />
              </div>
              <h3 className="mt-4 font-heading text-2xl font-semibold text-slate-950 dark:text-white">Drop your resume here</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">Upload PDF, DOC, DOCX, or TXT. AI will extract the resume content and analyze it.</p>
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
                {savedAvailable ? <ActionButton label="Restore last" icon={Sparkles} onClick={restoreLast} /> : null}
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
                  <div className="mt-1 text-xs text-slate-500 dark:text-slate-400">{formatFileSize(uploadedResume.size)} · {isDetectingProfile ? "detecting profile..." : "ready for AI extraction"}</div>
                  <button
                    type="button"
                    onClick={() => void detectResumeProfile()}
                    disabled={isDetectingProfile}
                    className="mt-3 inline-flex h-9 cursor-pointer items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 text-xs font-semibold text-emerald-800 transition hover:border-emerald-400 disabled:pointer-events-none disabled:opacity-60 dark:border-emerald-300/20 dark:bg-emerald-400/10 dark:text-emerald-200"
                  >
                    {isDetectingProfile ? <LoaderCircle className="size-3.5 animate-spin" aria-hidden="true" /> : <Sparkles className="size-3.5" aria-hidden="true" />}
                    Auto-detect profile
                  </button>
                </div>
              ) : null}
            </div>

            <label className="rounded-[1.1rem] border border-blue-950/10 bg-white/82 p-4 shadow-sm shadow-blue-950/5 dark:border-white/10 dark:bg-white/[0.04]">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <span className="text-sm font-semibold text-slate-800 dark:text-slate-100">Or paste resume text</span>
                <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-slate-600 dark:bg-white/[0.06] dark:text-slate-300">{resumeWords} words</span>
              </div>
              <textarea
                value={resumeText}
                onChange={(event) => { setResumeText(event.target.value); clearGenerated(); }}
                rows={6}
                placeholder="Paste resume text here if you do not want to upload a file..."
                className="mt-3 w-full resize-y rounded-xl border border-blue-950/10 bg-blue-50/60 px-4 py-3 text-sm font-medium leading-6 text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-primary/50 dark:border-white/10 dark:bg-white/[0.06] dark:text-white"
              />
            </label>

            <div className="grid gap-4 sm:grid-cols-2">
              <SearchSelect key={targetRole} label="Target role" value={targetRole} onChange={(value) => { setTargetRole(value); clearGenerated(); }} options={roleOptions} />
              <NumberField label="Experience" value={yearsExperience} onChange={(value) => { setYearsExperience(value); clearGenerated(); }} min={0} max={20} suffix={yearsExperience === 1 ? " year" : " years"} presets={[0, 1, 3, 5, 8, 11, 15]} note={experienceLabel} />
            </div>

            {detectedSummary ? (
              <div className="rounded-[1.1rem] border border-emerald-200 bg-emerald-50/80 p-4 text-sm leading-6 text-emerald-900 dark:border-emerald-300/20 dark:bg-emerald-400/10 dark:text-emerald-100">
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
                  <span>{detectedSummary}</span>
                </div>
              </div>
            ) : null}

            <ChoiceGrid label="Role family" value={roleFamily} options={roleFamilies} onChange={(value) => { setRoleFamily(value); clearGenerated(); }} />

            <div className="rounded-[1.1rem] border border-blue-950/10 bg-white/82 p-4 shadow-sm shadow-blue-950/5 dark:border-white/10 dark:bg-white/[0.04]">
              <div className="flex items-center gap-2 text-sm font-semibold text-slate-800 dark:text-slate-100">
                <BarChart3 className="size-4 text-primary dark:text-emerald-200" aria-hidden="true" />
                Skills you already know
              </div>
              {selectedSkills.length ? (
                <div className="mt-3 flex flex-wrap gap-2 rounded-xl bg-emerald-50/70 p-3 dark:bg-emerald-400/10">
                  {selectedSkills.map((skill) => (
                    <button
                      key={skill}
                      type="button"
                      onClick={() => toggleSkill(skill)}
                      className="inline-flex cursor-pointer items-center gap-1.5 rounded-full border border-emerald-200 bg-white px-3 py-1.5 text-xs font-semibold text-emerald-800 transition hover:border-rose-300 hover:text-rose-600 dark:border-emerald-300/20 dark:bg-white/8 dark:text-emerald-100"
                    >
                      {skill}
                      <X className="size-3" aria-hidden="true" />
                    </button>
                  ))}
                </div>
              ) : null}
              <div className="mt-3 flex flex-wrap gap-2">
                {popularSkills.map((skill) => {
                  const active = selectedSkills.some((item) => skillsMatch(item, skill));
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
                placeholder="Add other skills: C++, Tableau, SAP, Unreal Engine..."
                className="mt-4 h-12 w-full rounded-xl border border-blue-950/10 bg-blue-50/60 px-4 text-sm font-semibold text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-primary/50 dark:border-white/10 dark:bg-white/[0.06] dark:text-white"
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <NumberField label="Target package" value={targetPackage} onChange={(value) => { setTargetPackage(value); clearGenerated(); }} min={0} max={100} suffix=" LPA" presets={[3, 6, 12, 25, 50]} />
              <NumberField label="Daily prep time" value={dailyHours} onChange={(value) => { setDailyHours(value); clearGenerated(); }} min={1} max={10} suffix="h" presets={[1, 2, 3, 4, 6]} />
            </div>

            <ChoiceGrid label="Output language" value={language} options={languageOptions} onChange={(value) => { setLanguage(value); clearGenerated(); }} />

            <button type="button" onClick={generateAnalysis} className="inline-flex h-12 cursor-pointer items-center justify-center gap-2 rounded-full bg-[image:var(--button-solid)] px-5 text-sm font-semibold !text-white shadow-xl shadow-primary/20 transition hover:-translate-y-0.5">
              <Sparkles className="size-4 animate-pulse" aria-hidden="true" />
              Generate AI ATS Report
            </button>
          </div>
        </div>

        <ResultPanel
          ref={resultPanelRef}
          analysis={analysis}
          readiness={readiness}
          actionMessage={actionMessage}
          onCopy={copyReport}
          onDownload={downloadReport}
          onPrint={printReport}
          onShare={shareReport}
          savedAvailable={savedAvailable}
          onRestore={restoreLast}
        />
      </div>

      {isGenerating ? <GenerationOverlay progress={progress} /> : null}
    </section>
  );
}

type ResultPanelProps = {
  analysis: ResumeAnalysis | null;
  readiness: { label: string; tone: string };
  actionMessage: string;
  onCopy: () => void;
  onDownload: () => void;
  onPrint: () => void;
  onShare: () => void;
  savedAvailable: boolean;
  onRestore: () => void;
};

const ResultPanel = forwardRef<HTMLDivElement, ResultPanelProps>(function ResultPanel({
  analysis,
  readiness,
  actionMessage,
  onCopy,
  onDownload,
  onPrint,
  onShare,
  savedAvailable,
  onRestore,
}, ref) {
  return (
    <div ref={ref} className="rounded-[1.25rem] border border-blue-950/10 bg-white/94 p-5 shadow-2xl shadow-blue-950/12 backdrop-blur dark:border-white/10 dark:bg-surface/92 sm:p-7">
      <div className="grid gap-5 xl:grid-cols-[0.82fr_1.18fr] xl:items-center">
        <div className="grid place-items-center rounded-[1.2rem] border border-blue-950/10 bg-[radial-gradient(circle_at_50%_20%,rgba(43,168,255,0.12),transparent_15rem),linear-gradient(180deg,#ffffff,#f1f8ff)] p-6 dark:border-white/10 dark:bg-white/[0.04]">
          <ScoreRing score={analysis?.atsScore ?? 0} />
          <span className={`mt-4 inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold ${getToneClasses(readiness.tone)}`}>
            {analysis && analysis.atsScore < 55 ? <AlertCircle className="size-4" aria-hidden="true" /> : <CheckCircle2 className="size-4" aria-hidden="true" />}
            {analysis ? readiness.label : "Not analyzed"}
          </span>
        </div>
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-primary dark:text-emerald-200">Your ATS result</p>
          <h3 className="mt-3 font-heading text-3xl font-semibold text-slate-950 dark:text-white">{analysis ? analysis.roleFit : "Upload a resume to unlock your score"}</h3>
          <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300">{analysis ? analysis.summary : "Get ATS score, skill gaps, missing keywords, better bullet points, project ideas, interview questions, and a roadmap."}</p>
          {analysis ? <p className="mt-4 rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-sm leading-6 text-slate-700 dark:border-emerald-300/25 dark:bg-emerald-400/10 dark:text-slate-200">{analysis.verdict}</p> : null}
        </div>
      </div>

      {analysis ? (
        <div className="mt-6 grid gap-4">
          <div className="grid gap-3 md:grid-cols-3">
            {analysis.componentScores.map((item) => <MetricBar key={item.label} label={item.label} score={item.score} />)}
          </div>
          <ListCard title="Quick wins" items={analysis.quickWins} large />
          <div className="grid gap-4 md:grid-cols-2">
            <ListCard title="Missing keywords" items={analysis.missingKeywords} />
            <ListCard title="Missing skills" items={analysis.missingSkills} />
            <ListCard title="Strengths" items={analysis.strengths} />
            <ListCard title="Weak areas" items={analysis.weakAreas} />
          </div>
          <ListCard title="Improved resume bullets" items={analysis.improvedBullets} large />
          <ListCard title="Projects to add" items={analysis.projectsToAdd} large />
          <div className="grid gap-4 md:grid-cols-2">
            <ListCard title="Interview questions" items={analysis.interviewQuestions} />
            <ListCard title="Recruiter checklist" items={analysis.recruiterChecklist} />
          </div>
          <RoadmapCard roadmap={analysis.roadmap} />
          <div className="rounded-[1.1rem] border border-blue-950/10 bg-blue-50/70 p-4 dark:border-white/10 dark:bg-white/[0.05]">
            <div className="font-semibold text-slate-950 dark:text-white">Salary note</div>
            <p className="mt-1 text-sm leading-6 text-slate-600 dark:text-slate-300">{analysis.salaryRange}</p>
          </div>
        </div>
      ) : (
        <div className="mt-8 rounded-[1.1rem] border border-dashed border-blue-950/15 bg-blue-50/60 p-8 text-center dark:border-white/10 dark:bg-white/[0.05]">
          <div className="mx-auto grid size-12 place-items-center rounded-full bg-emerald-50 text-emerald-700 dark:bg-emerald-400/10 dark:text-emerald-200"><FileText className="size-5" aria-hidden="true" /></div>
          <h3 className="mt-4 font-heading text-2xl font-semibold text-slate-950 dark:text-white">Your AI resume report will appear here.</h3>
          <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">No fake sample report. Upload your real resume and generate a fresh analysis.</p>
          {savedAvailable ? (
            <button type="button" onClick={onRestore} className="mt-5 inline-flex h-11 cursor-pointer items-center gap-2 rounded-full bg-[image:var(--button-solid)] px-5 text-sm font-semibold !text-white shadow-lg shadow-primary/15 transition hover:-translate-y-0.5">
              <Sparkles className="size-4" aria-hidden="true" />
              See last result
            </button>
          ) : null}
        </div>
      )}

      <div className="mt-6 rounded-[1.1rem] border border-blue-950/10 bg-white p-4 dark:border-white/10 dark:bg-white/[0.05]">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs leading-5 text-slate-600 dark:text-slate-300">{actionMessage}</p>
          <div className="flex flex-wrap gap-2">
            <ActionButton label="Copy" icon={Copy} onClick={onCopy} disabled={!analysis} />
            <ActionButton label="Share PDF" icon={Share2} onClick={onShare} disabled={!analysis} />
            <ActionButton label="Print" icon={Printer} onClick={onPrint} disabled={!analysis} />
            <ActionButton label="Download PDF" icon={Download} onClick={onDownload} disabled={!analysis} />
          </div>
        </div>
      </div>
    </div>
  );
});

function getSupportedMimeType(file: File) {
  const name = file.name.toLowerCase();
  if (file.type === "application/pdf" || name.endsWith(".pdf")) return "application/pdf";
  if (file.type === "application/msword" || name.endsWith(".doc")) return "application/msword";
  if (file.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document" || name.endsWith(".docx")) return "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
  if (file.type.startsWith("text/") || name.endsWith(".txt")) return "text/plain";
  return "";
}

function formatFileSize(size: number) {
  if (size < 1024 * 1024) return `${Math.max(1, Math.round(size / 1024))} KB`;
  return `${(size / (1024 * 1024)).toFixed(1)} MB`;
}

function parseSavedReport(raw: string) {
  try {
    return JSON.parse(raw) as Partial<SavedResumeAnalysis>;
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

function slugify(value: string) {
  return (value || "resume")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80) || "resume";
}

function normalizeSkill(value: string) {
  return value
    .toLowerCase()
    .replace(/\b(html|css)\s*\d+\b/g, "$1")
    .replace(/\bjavascript\s*es\d+\+?\b/g, "javascript")
    .replace(/\bjs\b/g, "javascript")
    .replace(/\breact\.?js\b/g, "react")
    .replace(/\bnode\.?js\b/g, "node")
    .replace(/\bnext\.?js\b/g, "next")
    .replace(/\bnest\.?js\b/g, "nest")
    .replace(/[^a-z0-9+#.]+/g, " ")
    .trim();
}

function skillsMatch(left: string, right: string) {
  const leftSkill = normalizeSkill(left);
  const rightSkill = normalizeSkill(right);
  return leftSkill === rightSkill || leftSkill.startsWith(`${rightSkill} `) || rightSkill.startsWith(`${leftSkill} `);
}

function escapeHtml(value: string) {
  return value.replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "\"": "&quot;", "'": "&#39;" })[char] || char);
}

function createPrintableAtsReport({
  analysis,
  candidateName,
  targetRole,
  roleFamily,
  yearsExperience,
  targetPackage,
}: {
  analysis: ResumeAnalysis;
  candidateName: string;
  targetRole: string;
  roleFamily: string;
  yearsExperience: number;
  targetPackage: number;
}) {
  const list = (items: string[]) => items.map((item) => `<li>${escapeHtml(item)}</li>`).join("");
  const bars = analysis.componentScores
    .map((item) => `<div class="bar-row"><span>${escapeHtml(item.label)}</span><strong>${item.score}%</strong><i><b style="width:${clamp(item.score, 0, 100)}%"></b></i></div>`)
    .join("");
  return `<!doctype html>
<html>
<head>
  <meta charset="utf-8" />
  <title>${escapeHtml(candidateName)} ATS Score Report</title>
  <style>
    @page { size: A4; margin: 14mm; }
    * { box-sizing: border-box; }
    body { margin: 0; color: #07111f; font-family: Inter, Arial, sans-serif; background: #fff; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
    .report { border: 1px solid #cbdcf0; border-radius: 22px; overflow: hidden; background: #fff; }
    .hero { display: grid; grid-template-columns: 1fr auto; gap: 18px; align-items: end; padding: 30px; color: white; background: linear-gradient(135deg, #12347c 0%, #1f6fbf 54%, #22b573 100%); -webkit-print-color-adjust: exact; print-color-adjust: exact; }
    .eyebrow { font-size: 11px; font-weight: 800; letter-spacing: .18em; text-transform: uppercase; opacity: .92; color: #eaf7ff; }
    h1 { margin: 10px 0 8px; font-size: 34px; line-height: 1.05; }
    .hero p { margin: 0; color: #eaf7ff; font-weight: 700; }
    .score { min-width: 124px; text-align: center; padding: 18px 16px; border-radius: 24px; background: #ffffff; color: #12347c; font-weight: 800; box-shadow: 0 18px 36px rgba(0,0,0,.16); -webkit-print-color-adjust: exact; print-color-adjust: exact; }
    .score strong { display: block; font-size: 42px; line-height: 1; }
    .score span { display: block; margin-top: 6px; color: #64748b; font-size: 10px; letter-spacing: .14em; text-transform: uppercase; }
    .content { padding: 24px; }
    .grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 10px; margin-bottom: 18px; }
    .card { border: 1px solid #e0ebf6; border-radius: 14px; padding: 13px; background: #f8fbff; }
    .label { color: #65748b; font-size: 10px; font-weight: 800; letter-spacing: .14em; text-transform: uppercase; }
    .value { margin-top: 6px; font-size: 16px; font-weight: 800; }
    .notice { margin: 16px 0; padding: 16px; border-radius: 16px; background: #ecfdf4; border: 1px solid #bcebd1; font-weight: 700; }
    h2 { margin: 22px 0 10px; font-size: 18px; }
    ul { margin: 0; padding-left: 18px; color: #334155; line-height: 1.55; }
    .columns { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
    .panel { border: 1px solid #e0ebf6; border-radius: 16px; padding: 16px; break-inside: avoid; }
    .bar-row { display: grid; grid-template-columns: 1fr auto; gap: 10px; align-items: center; margin: 10px 0; font-size: 13px; font-weight: 700; }
    .bar-row i { grid-column: 1 / -1; height: 8px; border-radius: 999px; background: #dbe8f5; overflow: hidden; }
    .bar-row b { display: block; height: 100%; border-radius: inherit; background: linear-gradient(90deg, #163d8f, #22b573); }
    .footer { margin-top: 20px; padding-top: 14px; border-top: 1px solid #e0ebf6; color: #64748b; font-size: 12px; }
  </style>
</head>
<body>
  <main class="report">
    <section class="hero">
      <div>
        <div class="eyebrow">KASA AI Resume ATS Checker</div>
        <h1>${escapeHtml(candidateName)} ATS Score Report</h1>
        <p>${escapeHtml(targetRole)} · ${escapeHtml(roleFamily)} · ${yearsExperience} years experience · Target ${targetPackage} LPA</p>
      </div>
      <div class="score"><strong>${analysis.atsScore}</strong><span>ATS Score</span></div>
    </section>
    <section class="content">
      <div class="grid">
        <div class="card"><div class="label">Role fit</div><div class="value">${escapeHtml(analysis.roleFit)}</div></div>
        <div class="card"><div class="label">Readiness</div><div class="value">${escapeHtml(getReadiness(analysis.atsScore).label)}</div></div>
        <div class="card"><div class="label">Missing keywords</div><div class="value">${analysis.missingKeywords.length}</div></div>
        <div class="card"><div class="label">Skill gaps</div><div class="value">${analysis.missingSkills.length}</div></div>
      </div>
      <div class="notice">${escapeHtml(analysis.verdict)}</div>
      <div class="panel"><h2>Score Breakdown</h2>${bars}</div>
      <div class="columns">
        <div class="panel"><h2>Quick Wins</h2><ul>${list(analysis.quickWins)}</ul></div>
        <div class="panel"><h2>Missing Keywords</h2><ul>${list(analysis.missingKeywords)}</ul></div>
        <div class="panel"><h2>Missing Skills</h2><ul>${list(analysis.missingSkills)}</ul></div>
        <div class="panel"><h2>Improved Bullets</h2><ul>${list(analysis.improvedBullets.slice(0, 5))}</ul></div>
      </div>
      <div class="panel"><h2>30-Day Roadmap</h2><ul>${list(analysis.roadmap.flatMap((item) => [`${item.week}: ${item.focus}`, ...item.tasks]))}</ul></div>
      <div class="footer">Generated by KASA. Check your resume score free at /tools/resume-ats-checker.</div>
    </section>
  </main>
</body>
</html>`;
}

function createResumeAtsPdf({
  analysis,
  candidateName,
  targetRole,
  roleFamily,
  yearsExperience,
  targetPackage,
}: {
  analysis: ResumeAnalysis;
  candidateName: string;
  targetRole: string;
  roleFamily: string;
  yearsExperience: number;
  targetPackage: number;
}) {
  const commands: string[] = [];
  const pageWidth = 595;
  const pageHeight = 842;
  const safe = (value: string) => value.replace(/[^\x20-\x7E]/g, " ").replace(/[\\()]/g, "\\$&");
  const colors = {
    slate950: "0.027 0.067 0.122",
    slate700: "0.200 0.255 0.333",
    slate500: "0.392 0.455 0.545",
    blue: "0.086 0.239 0.561",
    lightBlue: "0.886 0.945 1",
    green: "0.133 0.710 0.443",
    border: "0.863 0.910 0.965",
    white: "1 1 1",
  };
  const text = (value: string, x: number, y: number, size = 11, color = colors.slate700, font = "F1") => {
    commands.push(`BT /${font} ${size} Tf ${color} rg ${x} ${y} Td (${safe(value).slice(0, 110)}) Tj ET`);
  };
  const rect = (x: number, y: number, w: number, h: number, color: string) => commands.push(`${color} rg ${x} ${y} ${w} ${h} re f`);
  const strokeRect = (x: number, y: number, w: number, h: number, color: string) => commands.push(`${color} RG ${x} ${y} ${w} ${h} re S`);
  const wrapText = (value: string, x: number, y: number, maxChars: number, size = 10, color = colors.slate700) => {
    const words = safe(value).split(/\s+/);
    const lines: string[] = [];
    let line = "";
    words.forEach((word) => {
      if (`${line} ${word}`.trim().length > maxChars) {
        lines.push(line);
        line = word;
      } else {
        line = `${line} ${word}`.trim();
      }
    });
    if (line) lines.push(line);
    lines.slice(0, 4).forEach((row, index) => text(row, x, y - index * (size + 5), size, color));
    return y - Math.min(lines.length, 4) * (size + 5);
  };
  const list = (title: string, items: string[], x: number, y: number, maxItems = 5) => {
    text(title, x, y, 13, colors.slate950, "F2");
    let nextY = y - 20;
    items.slice(0, maxItems).forEach((item) => {
      nextY = wrapText(`- ${item}`, x, nextY, 58, 9, colors.slate700) - 4;
    });
    return nextY;
  };

  rect(0, pageHeight - 150, pageWidth, 150, colors.blue);
  rect(0, pageHeight - 150, pageWidth, 18, colors.green);
  text("KASA AI RESUME ATS CHECKER", 40, 790, 11, colors.white, "F2");
  text(`${candidateName} ATS Score Report`, 40, 752, 28, colors.white, "F2");
  text(`${targetRole} | ${roleFamily} | ${yearsExperience} years | Target ${targetPackage} LPA`, 40, 724, 11, "0.886 0.945 1");
  rect(410, 705, 120, 76, colors.white);
  text(`${analysis.atsScore}/100`, 430, 744, 26, colors.blue, "F2");
  text("ATS SCORE", 438, 724, 9, colors.slate500, "F2");

  text("Verdict", 40, 650, 15, colors.slate950, "F2");
  wrapText(analysis.verdict, 40, 628, 88, 10);

  const metricY = 565;
  analysis.componentScores.slice(0, 6).forEach((item, index) => {
    const col = index % 3;
    const row = Math.floor(index / 3);
    const x = 40 + col * 175;
    const y = metricY - row * 64;
    strokeRect(x, y - 42, 150, 48, colors.border);
    text(item.label, x + 12, y - 8, 8, colors.slate500, "F2");
    text(`${item.score}%`, x + 12, y - 28, 18, colors.slate950, "F2");
    rect(x + 76, y - 30, 58, 6, colors.border);
    rect(x + 76, y - 30, clamp(item.score, 0, 100) * 0.58, 6, colors.green);
  });

  list("Quick Wins", analysis.quickWins, 40, 410);
  list("Missing Keywords", analysis.missingKeywords, 315, 410);
  list("Missing Skills", analysis.missingSkills, 40, 255);
  list("Projects To Add", analysis.projectsToAdd, 315, 255);
  text("Generated by KASA. Check your resume score free at kasa.co/tools/resume-ats-checker", 40, 44, 9, colors.slate500);

  const stream = commands.join("\n");
  const streamLength = new TextEncoder().encode(stream).length;
  const objects = [
    "<< /Type /Catalog /Pages 2 0 R >>",
    "<< /Type /Pages /Kids [3 0 R] /Count 1 >>",
    `<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${pageWidth} ${pageHeight}] /Resources << /Font << /F1 4 0 R /F2 5 0 R >> >> /Contents 6 0 R >>`,
    "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>",
    "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>",
    `<< /Length ${streamLength} >>\nstream\n${stream}\nendstream`,
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

function uniqueList(items: unknown[], limit: number) {
  const seen = new Set<string>();
  return items
    .map((item) => String(item || "").replace(/\s+/g, " ").trim())
    .filter((item) => {
      const key = item.toLowerCase();
      if (!item || seen.has(key)) return false;
      seen.add(key);
      return true;
    })
    .slice(0, limit);
}

function formatExperienceLabel(years: number) {
  if (years <= 0) return "Fresher / entry level";
  if (years <= 1) return "0-1 year experience";
  if (years <= 3) return "1-3 years experience";
  if (years <= 6) return "3-6 years experience";
  if (years <= 10) return "6-10 years experience";
  return "10+ years senior experience";
}

function legacyExperienceToYears(value: unknown) {
  const text = String(value || "").toLowerCase();
  if (text.includes("10")) return 10;
  if (text.includes("6")) return 6;
  if (text.includes("3")) return 3;
  if (text.includes("1")) return 1;
  return 0;
}

function getReadiness(score: number) {
  if (score >= 80) return { label: "Strong resume", tone: "green" };
  if (score >= 65) return { label: "Good, improve keywords", tone: "blue" };
  if (score >= 50) return { label: "Needs work", tone: "amber" };
  return { label: "High rejection risk", tone: "red" };
}

function getToneClasses(tone: string) {
  if (tone === "green") return "bg-emerald-50 text-emerald-700 dark:bg-emerald-400/10 dark:text-emerald-200";
  if (tone === "amber") return "bg-amber-50 text-amber-700 dark:bg-amber-400/10 dark:text-amber-200";
  if (tone === "red") return "bg-rose-50 text-rose-700 dark:bg-rose-400/10 dark:text-rose-200";
  return "bg-blue-50 text-primary dark:bg-primary/10 dark:text-emerald-200";
}

function ScoreRing({ score }: { score: number }) {
  const safeScore = clamp(score, 0, 100);
  return (
    <div className="relative grid size-52 place-items-center rounded-full" style={{ background: `conic-gradient(#22b573 ${safeScore * 3.6}deg,#dbe8f5 ${safeScore * 3.6}deg)` }}>
      <div className="grid size-40 place-items-center rounded-full bg-white shadow-inner dark:bg-slate-950">
        <div className="text-center">
          <div className="font-heading text-5xl font-semibold text-slate-950 dark:text-white">{score ? safeScore : "--"}</div>
          <div className="mt-1 text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">ATS Score</div>
        </div>
      </div>
    </div>
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
          placeholder="Search any role, technology, or position..."
          className="h-12 w-full rounded-xl border border-blue-950/10 bg-blue-50/60 pl-11 pr-11 text-sm font-semibold text-slate-950 outline-none transition focus:border-primary/50 dark:border-white/10 dark:bg-white/[0.06] dark:text-white"
        />
        <button type="button" onClick={() => setOpen((state) => !state)} className="absolute right-2 top-1/2 grid size-8 -translate-y-1/2 cursor-pointer place-items-center rounded-full text-slate-500 transition hover:bg-white hover:text-primary dark:text-slate-300 dark:hover:bg-white/10">
          <ChevronDown className={`size-4 transition ${open ? "rotate-180" : ""}`} aria-hidden="true" />
        </button>
      </div>
      {open ? (
        <div className="absolute left-4 right-4 top-[6.8rem] z-30 overflow-hidden rounded-2xl border border-blue-950/10 bg-white shadow-2xl shadow-blue-950/15 dark:border-white/10 dark:bg-slate-950">
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

function NumberField({ label, value, onChange, min, max, suffix, presets, note }: { label: string; value: number; onChange: (value: number) => void; min: number; max: number; suffix: string; presets: number[]; note?: string }) {
  const percent = ((value - min) / Math.max(1, max - min)) * 100;
  return (
    <div className="rounded-[1.1rem] border border-blue-950/10 bg-white/82 p-4 shadow-sm shadow-blue-950/5 dark:border-white/10 dark:bg-white/[0.04]">
      <div className="flex items-center justify-between gap-3">
        <div className="text-sm font-semibold text-slate-800 dark:text-slate-100">{label}</div>
        <div className="rounded-full bg-emerald-50 px-3 py-1 text-sm font-semibold text-emerald-700 dark:bg-emerald-400/10 dark:text-emerald-200">{value}{suffix}</div>
      </div>
      {note ? <div className="mt-2 text-xs font-semibold text-slate-500 dark:text-slate-400">{note}</div> : null}
      <input type="range" min={min} max={max} value={value} onChange={(event) => onChange(Number(event.target.value))} className="mt-4 h-2 w-full cursor-pointer accent-[#22b573]" style={{ background: `linear-gradient(90deg,#22b573 ${percent}%,#d8e4ef ${percent}%)` }} />
      <div className="mt-4 flex flex-wrap gap-2">
        {presets.map((preset) => (
          <button key={preset} type="button" onClick={() => onChange(preset)} className={`cursor-pointer rounded-full border px-3 py-2 text-sm font-semibold transition ${value === preset ? "border-emerald-500 bg-emerald-50 text-emerald-800" : "border-blue-950/10 bg-white text-slate-700 hover:border-emerald-300 hover:text-emerald-700 dark:border-white/10 dark:bg-white/7 dark:text-slate-200"}`}>
            {preset}{suffix}
          </button>
        ))}
      </div>
    </div>
  );
}

function MetricBar({ label, score }: { label: string; score: number }) {
  return (
    <div className="rounded-[1rem] border border-blue-950/10 bg-white p-4 dark:border-white/10 dark:bg-white/[0.05]">
      <div className="flex items-center justify-between gap-3 text-xs font-semibold uppercase tracking-[0.13em] text-slate-500 dark:text-slate-400"><span>{label}</span><span>{score}%</span></div>
      <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-200 dark:bg-white/12"><div className="h-full rounded-full bg-[image:var(--button-solid)]" style={{ width: `${clamp(score, 0, 100)}%` }} /></div>
    </div>
  );
}

function ListCard({ title, items, large }: { title: string; items: string[]; large?: boolean }) {
  return (
    <div className="rounded-[1.1rem] border border-blue-950/10 bg-white p-5 dark:border-white/10 dark:bg-white/[0.05]">
      <h3 className="font-heading text-xl font-semibold text-slate-950 dark:text-white">{title}</h3>
      <ul className={`mt-3 grid gap-2 text-sm leading-6 text-slate-600 dark:text-slate-300 ${large ? "sm:grid-cols-2" : ""}`}>
        {items.length ? items.map((item) => <li key={item} className="rounded-xl bg-blue-50/75 px-3 py-2 dark:bg-white/[0.06]">{item}</li>) : <li>No major gaps found.</li>}
      </ul>
    </div>
  );
}

function RoadmapCard({ roadmap }: { roadmap: ResumeAnalysis["roadmap"] }) {
  return (
    <div className="rounded-[1.1rem] border border-blue-950/10 bg-white p-5 dark:border-white/10 dark:bg-white/[0.05]">
      <div className="flex items-center gap-2 font-heading text-xl font-semibold text-slate-950 dark:text-white">
        <BriefcaseBusiness className="size-5 text-primary dark:text-emerald-300" aria-hidden="true" />
        30-day roadmap
      </div>
      <div className="mt-4 grid gap-3">
        {roadmap.map((item) => (
          <div key={`${item.week}-${item.focus}`} className="rounded-xl bg-blue-50/75 p-4 dark:bg-white/[0.06]">
            <div className="text-sm font-semibold text-slate-950 dark:text-white">{item.week}: {item.focus}</div>
            <ul className="mt-2 grid gap-1.5 text-sm leading-6 text-slate-600 dark:text-slate-300">
              {item.tasks.map((task) => <li key={task}>- {task}</li>)}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

function ActionButton({ label, icon: Icon, onClick, disabled }: { label: string; icon: typeof Copy; onClick: () => void; disabled?: boolean }) {
  return (
    <button type="button" onClick={onClick} disabled={disabled} className="inline-flex h-10 cursor-pointer items-center gap-2 rounded-full border border-blue-950/10 bg-white px-3 py-2 text-xs font-semibold text-slate-700 shadow-sm shadow-blue-950/5 transition hover:border-primary/35 hover:text-primary disabled:pointer-events-none disabled:opacity-45 dark:border-white/10 dark:bg-white/[0.06] dark:text-slate-200 dark:hover:text-white">
      <Icon className="size-3.5" aria-hidden="true" />
      {label}
    </button>
  );
}

function GenerationOverlay({ progress }: { progress: number }) {
  return (
    <div className="fixed inset-0 z-[90] grid place-items-center bg-slate-950/58 px-4 backdrop-blur-sm">
      <div className="w-full max-w-lg rounded-[1.4rem] border border-white/18 bg-white p-6 shadow-2xl shadow-slate-950/30 dark:bg-slate-950 dark:text-white">
        <div className="flex items-center gap-4">
          <div className="relative grid size-14 place-items-center rounded-full bg-emerald-50 text-emerald-700 dark:bg-emerald-400/12 dark:text-emerald-200">
            <Sparkles className="size-6 animate-pulse" aria-hidden="true" />
            <span className="absolute inset-0 animate-spin rounded-full border-2 border-emerald-300/70 border-t-transparent" />
          </div>
          <div>
            <div className="font-heading text-2xl font-semibold text-slate-950 dark:text-white">Analyzing resume</div>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">Extracting resume, scoring ATS fit, and building roadmap...</p>
          </div>
        </div>
        <div className="mt-6 flex items-center justify-between gap-3 text-xs font-semibold uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400"><span>AI analysis</span><span>{Math.round(progress)}%</span></div>
        <div className="mt-3 h-3 overflow-hidden rounded-full bg-slate-200 shadow-inner dark:bg-white/12"><div className="h-full rounded-full bg-[image:var(--button-solid)] transition-[width] duration-500" style={{ width: `${clamp(progress, 0, 100)}%` }} /></div>
      </div>
    </div>
  );
}
