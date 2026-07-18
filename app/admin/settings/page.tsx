import { AdminShell } from "@/components/admin/layouts/admin-shell";
import { ArticleAdminHero } from "@/components/admin/articles/article-admin-primitives";
import { SettingsSaveToast } from "@/components/admin/settings-save-toast";
import { Button } from "@/components/ui/button";
import { requireAdmin } from "@/lib/admin/auth";
import { getDemoOperationsSettings } from "@/lib/admin/demo-settings";
import { getAiProviderEnvironmentStatus, getAiProviderSettings, type AiProvider } from "@/lib/ai/settings";
import { updateAiProviderAction, updateDemoOperationsAction } from "@/actions/admin/settings";
import {
  BotIcon,
  CheckCircle2Icon,
  CircleAlertIcon,
  KeyRoundIcon,
  MailCheckIcon,
  PlayCircleIcon,
  RotateCcwIcon,
  ShieldCheckIcon,
  SparklesIcon,
  ChevronRightIcon,
} from "lucide-react";
import Link from "next/link";

export const dynamic = "force-dynamic";

type SettingsPageProps = {
  searchParams: Promise<{ saved?: string }>;
};

export default async function AdminSettingsPage({ searchParams }: SettingsPageProps) {
  const admin = await requireAdmin();
  const [demoSettings, aiSettings, query] = await Promise.all([
    getDemoOperationsSettings(),
    getAiProviderSettings(),
    searchParams,
  ]);
  const aiEnvironment = getAiProviderEnvironmentStatus();
  const emailConfigured = Boolean(
    process.env.RESEND_API_KEY?.trim() &&
      process.env.LEADS_FROM_EMAIL?.trim() &&
      process.env.LEADS_NOTIFICATION_EMAIL?.trim(),
  );

  return (
    <AdminShell
      adminName={admin.name}
      adminEmail={admin.email}
      pageTitle="Settings"
      pageEyebrow="Admin workspace"
      pageDescription="Manage AI generation, demo behaviour, and delivery services."
      showHero={false}
      headerContent={
        <div className="flex min-w-0 items-center gap-2 text-sm font-medium text-muted-foreground">
          <Link href="/admin" className="hover:text-foreground">Admin</Link>
          <ChevronRightIcon className="size-4" />
          <span className="truncate text-foreground">Settings</span>
        </div>
      }
    >
      <SettingsSaveToast saved={query.saved} />

      <ArticleAdminHero
        eyebrow="Workspace controls"
        title="Settings"
        description="Choose the AI engine used by every generator and review essential operational services."
        actions={
          <div className="flex items-center gap-2 rounded-xl bg-white px-3.5 py-2.5 text-xs font-medium text-slate-600 shadow-sm dark:bg-white/10 dark:text-slate-200">
            <ShieldCheckIcon className="size-4 text-primary" />
            Secrets stay server-side
          </div>
        }
      />

      <section className="rounded-2xl border border-blue-200 bg-[linear-gradient(135deg,#ffffff_0%,#eff7ff_60%,#e8fff4_100%)] p-6 shadow-sm shadow-blue-950/5 dark:border-white/10 dark:bg-[linear-gradient(135deg,rgba(15,23,42,.92),rgba(15,59,117,.45),rgba(6,78,59,.28))]">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-start gap-3">
              <div className="rounded-xl bg-primary/10 p-2.5 text-primary">
                <BotIcon className="size-5" />
              </div>
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <h2 className="text-lg font-semibold text-card-foreground">AI generation engine</h2>
                  <span className="rounded-full bg-primary/10 px-2.5 py-1 text-xs font-semibold text-primary">
                    {aiSettings.provider === "openai" ? "OpenAI active" : "Gemini active"}
                  </span>
                </div>
                <p className="mt-1 text-sm text-muted-foreground">One selection controls all 14 public AI tools.</p>
              </div>
            </div>
          </div>

          <form action={updateAiProviderAction}>
            <div className="mt-5 grid gap-4 md:grid-cols-2">
              <ProviderChoice
                value="gemini"
                name="Google Gemini"
                shortName="G"
                description="Fast generation with your existing Google AI configuration."
                model={aiEnvironment.geminiModel}
                configured={aiEnvironment.gemini}
                active={aiSettings.provider === "gemini"}
              />
              <ProviderChoice
                value="openai"
                name="OpenAI"
                shortName="AI"
                description="Paid, production-ready generation with structured outputs."
                model={aiEnvironment.openaiModel}
                configured={aiEnvironment.openai}
                active={aiSettings.provider === "openai"}
              />
            </div>

            <div className="mt-4 flex flex-col gap-3 rounded-xl bg-white/75 p-3.5 shadow-sm sm:flex-row sm:items-center sm:justify-between dark:bg-white/[0.06]">
              <p className="flex items-center gap-2 text-xs text-muted-foreground">
                <KeyRoundIcon className="size-3.5" />
                Keys are read from environment variables; only the provider choice is saved here.
              </p>
              <Button type="submit" className="h-10 px-5">
                <SparklesIcon className="size-4" />
                Apply AI provider
              </Button>
            </div>
          </form>
      </section>

      <div className="grid gap-6 xl:grid-cols-2">
        <section className="rounded-2xl bg-white/90 p-6 shadow-sm shadow-blue-950/5 dark:bg-white/[0.055]">
          <div className="flex items-start gap-3">
            <div className={emailConfigured ? "rounded-xl bg-primary/10 p-2.5 text-primary" : "rounded-xl bg-amber-500/10 p-2.5 text-amber-600"}>
              {emailConfigured ? <MailCheckIcon className="size-5" /> : <CircleAlertIcon className="size-5" />}
            </div>
            <div>
              <h2 className="text-lg font-semibold text-card-foreground">Lead email delivery</h2>
              <p className="mt-1 text-sm text-muted-foreground">Notifications and customer acknowledgements.</p>
            </div>
          </div>

          <div className={emailConfigured ? "mt-5 rounded-xl bg-blue-50/80 p-4 dark:bg-primary/10" : "mt-5 rounded-xl bg-amber-50 p-4 dark:bg-amber-500/10"}>
            <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
              {emailConfigured ? <CheckCircle2Icon className="size-4 text-primary" /> : <CircleAlertIcon className="size-4 text-amber-600" />}
              {emailConfigured ? "Email service is ready" : "Configuration required"}
            </div>
            <p className="mt-2 text-xs leading-5 text-muted-foreground">
              {emailConfigured
                ? "New enquiries are saved and delivery emails are enabled."
                : "Enquiries will still be saved, but delivery emails remain paused."}
            </p>
          </div>

          <div className="mt-4 text-xs text-muted-foreground">
            <p className="font-medium text-foreground">Required server variables</p>
            <div className="mt-2 flex flex-wrap gap-2">
              <code className="rounded-lg bg-blue-50 px-3 py-2 text-slate-700 dark:bg-white/10 dark:text-slate-200">RESEND_API_KEY</code>
              <code className="rounded-lg bg-blue-50 px-3 py-2 text-slate-700 dark:bg-white/10 dark:text-slate-200">LEADS_FROM_EMAIL</code>
              <code className="rounded-lg bg-blue-50 px-3 py-2 text-slate-700 dark:bg-white/10 dark:text-slate-200">LEADS_NOTIFICATION_EMAIL</code>
            </div>
          </div>
        </section>

      <section className="rounded-2xl bg-white/90 p-6 shadow-sm shadow-blue-950/5 dark:bg-white/[0.055]">
        <form action={updateDemoOperationsAction}>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-start gap-3">
              <div className="rounded-xl bg-primary/10 p-2.5 text-primary">
                <PlayCircleIcon className="size-5" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-card-foreground">Demo experience</h2>
                <p className="mt-1 text-sm text-muted-foreground">Control temporary product tours used by lead flows.</p>
              </div>
            </div>
            <Button type="submit" variant="outline" className="h-10">Save demo preferences</Button>
          </div>

          <div className="mt-5 grid gap-3">
            <ToggleSetting
              name="demoToursEnabled"
              icon={<PlayCircleIcon className="size-4" />}
              title="Issue demo tours"
              description="Allow website visitors to receive temporary demo URLs."
              defaultChecked={demoSettings.demoToursEnabled}
            />
            <ToggleSetting
              name="demoResetOnExpiry"
              icon={<RotateCcwIcon className="size-4" />}
              title="Reset expired demos"
              description="Clear temporary demo state when visitor access expires."
              defaultChecked={demoSettings.demoResetOnExpiry}
            />
          </div>
        </form>
      </section>
      </div>
    </AdminShell>
  );
}

function ProviderChoice({
  value,
  name,
  shortName,
  description,
  model,
  configured,
  active,
}: {
  value: AiProvider;
  name: string;
  shortName: string;
  description: string;
  model: string;
  configured: boolean;
  active: boolean;
}) {
  return (
    <label className="group relative cursor-pointer rounded-2xl border border-blue-200 bg-white/85 p-4 shadow-sm shadow-blue-950/5 transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md has-[:checked]:border-primary/55 has-[:checked]:bg-blue-50/80 has-[:checked]:shadow-md has-[:disabled]:cursor-not-allowed has-[:disabled]:opacity-55 dark:border-white/10 dark:bg-white/[0.06] dark:has-[:checked]:border-primary/50 dark:has-[:checked]:bg-primary/10">
      <input
        type="radio"
        name="provider"
        value={value}
        defaultChecked={active}
        disabled={!configured}
        className="peer sr-only"
      />
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <span className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-sm font-bold text-primary">{shortName}</span>
          <div>
            <p className="font-semibold text-foreground">{name}</p>
            <p className="mt-0.5 text-xs text-muted-foreground">{model}</p>
          </div>
        </div>
        <span className="flex size-5 items-center justify-center rounded-full border-2 border-primary/25 bg-white transition-colors after:size-2.5 after:rounded-full group-has-[:checked]:border-primary group-has-[:checked]:after:bg-primary dark:bg-white/10" />
      </div>
      <p className="mt-4 min-h-10 text-sm leading-5 text-muted-foreground">{description}</p>
      <div className="mt-4 flex items-center justify-between pt-3 text-xs">
        <span className={configured ? "flex items-center gap-1.5 font-medium text-primary" : "flex items-center gap-1.5 font-medium text-destructive"}>
          {configured ? <CheckCircle2Icon className="size-3.5" /> : <CircleAlertIcon className="size-3.5" />}
          {configured ? "Ready to use" : "API key missing"}
        </span>
        {active ? <span className="rounded-full bg-primary px-2.5 py-1 font-semibold text-primary-foreground">Currently active</span> : null}
      </div>
    </label>
  );
}

function ToggleSetting({
  name,
  icon,
  title,
  description,
  defaultChecked,
}: {
  name: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  defaultChecked: boolean;
}) {
  return (
    <label className="flex cursor-pointer items-start gap-3 rounded-xl bg-blue-50/75 p-4 transition-all hover:bg-blue-100/70 has-[:checked]:bg-blue-50 dark:bg-white/[0.06] dark:hover:bg-white/[0.09] dark:has-[:checked]:bg-primary/10">
      <input type="checkbox" name={name} defaultChecked={defaultChecked} className="peer sr-only" />
      <span className="mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-lg bg-surface-muted text-primary peer-checked:bg-primary/10 peer-checked:text-primary">{icon}</span>
      <span className="min-w-0 flex-1">
        <span className="block text-sm font-semibold text-foreground">{title}</span>
        <span className="mt-1 block text-xs leading-5 text-muted-foreground">{description}</span>
      </span>
      <span className="relative mt-1 h-6 w-11 shrink-0 rounded-full bg-primary/20 transition-colors after:absolute after:left-1 after:top-1 after:size-4 after:rounded-full after:bg-white after:shadow-sm after:transition-transform peer-checked:bg-primary peer-checked:after:translate-x-5" />
    </label>
  );
}
