import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import SiteHeader from "@/components/site-header";
import { ThemeInitializer } from "@/components/site/theme-initializer";
import { SiteFooter } from "@/components/site/site-footer";
import { SiteStructuredData } from "@/components/site/structured-data";
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
        <ThemeInitializer />
        <SiteStructuredData />
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
