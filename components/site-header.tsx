import Image from "next/image";
import Link from "next/link";
import { LeadCaptureModalTrigger } from "@/components/lead-capture-form";

export default function SiteHeader() {
  const leadsEndpoint =
    process.env.NEXT_PUBLIC_LEADS_API_URL ?? "http://localhost:5000/api/v1/leads";

  return (
    <div className="sticky top-3 z-50 -mb-[3.75rem] w-full px-4 pt-3 sm:top-4 sm:-mb-16 sm:pt-4">
      <header className="mx-auto flex h-12 w-[min(92vw,46rem)] items-center justify-between rounded-full border border-white/15 bg-white/10 p-1.5 text-xs text-white/80 shadow-2xl shadow-black/20 backdrop-blur-xl">
        <Link
          href="/"
          className="relative ml-3 block h-6 w-24 sm:w-28"
          aria-label="KASA home"
        >
          <Image
            src="/kasa-logo-dark.png"
            alt="KASA"
            width={760}
            height={260}
            priority
            className="h-full w-full object-contain object-left"
          />
        </Link>
        <nav className="hidden items-center gap-6 sm:flex">
          <a href="#features" className="cursor-pointer transition hover:text-white">
            Features
          </a>
          <a href="#pricing" className="cursor-pointer transition hover:text-white">
            Pricing
          </a>
          <a href="#faq" className="cursor-pointer transition hover:text-white">
            FAQ
          </a>
        </nav>
        <LeadCaptureModalTrigger
          endpoint={leadsEndpoint}
          source="header-enquiry-modal"
          buttonLabel="Enquire Now"
          modalTitle="Tell us about your academy"
          modalEyebrow="Enquiry request"
          icon={<ChatBubbleIcon className="size-3.5" />}
          buttonClassName="inline-flex h-9 cursor-pointer items-center justify-center gap-1.5 rounded-full bg-primary px-4 text-[0.78rem] font-medium text-primary-foreground transition hover:bg-primary-hover"
        />
      </header>
    </div>
  );
}

function ChatBubbleIcon({ className = "size-3.5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true" className={className}>
      <path
        d="M5.833 14.167 3.333 16.25V5.833A2.5 2.5 0 0 1 5.833 3.333h8.334a2.5 2.5 0 0 1 2.5 2.5v5.834a2.5 2.5 0 0 1-2.5 2.5H5.833Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6.667 7.5h6.666M6.667 10.417h4.166"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}
