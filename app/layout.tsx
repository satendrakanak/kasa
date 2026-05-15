import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import SiteHeader from "@/components/site-header";
import { SiteFooter } from "@/components/site/site-footer";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.getkasa.in"),
  title: {
    default: "KASA | LMS Software for Coaching Institutes and Online Academies",
    template: "%s | KASA",
  },
  description:
    "KASA is an all-in-one LMS software for coaching institutes, online academies, trainers, and EdTech teams to sell courses, run live classes, manage students, collect payments, issue certificates, and track growth.",
  keywords: [
    "LMS software for coaching institutes",
    "online academy software",
    "course selling platform",
    "learning management system India",
    "coaching institute management software",
    "online course platform",
    "live class management software",
    "student management system",
    "course payment and certificate software",
    "education CRM software",
    "EdTech platform for trainers",
    "white label LMS",
    "KASA LMS",
  ],
  applicationName: "KASA",
  authors: [{ name: "KASA", url: "https://www.getkasa.in" }],
  creator: "KASA",
  publisher: "KASA",
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: [
      { url: "/kasa-favicon.svg", type: "image/svg+xml" },
      { url: "/kasa-logo-dark.png", type: "image/png" },
    ],
    shortcut: "/kasa-favicon.svg",
    apple: "/kasa-logo-dark.png",
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://www.getkasa.in",
    siteName: "KASA",
    title: "KASA | LMS Software for Coaching Institutes and Online Academies",
    description:
      "Launch a branded academy website, sell courses, manage learners, live classes, payments, certificates, and institute operations from one LMS platform.",
    images: [
      {
        url: "/kasa-hero.png",
        width: 1200,
        height: 630,
        alt: "KASA LMS software for coaching institutes and online academies",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "KASA | LMS Software for Coaching Institutes",
    description:
      "All-in-one LMS, academy website, live classes, payments, certificates, and education CRM for modern training institutes.",
    images: ["/kasa-hero.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${poppins.variable} h-full scroll-smooth antialiased`}
      suppressHydrationWarning
    >
      <body className="flex min-h-full flex-col font-sans">
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
