import type { Metadata } from "next";
import { Rubik, Nunito } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

const rubik = Rubik({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const nunito = Nunito({
  variable: "--font-base",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const siteUrl = "https://soban.tech";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Soban Ejaz — AI Engineer",
    template: "%s — Soban Ejaz",
  },
  description:
    "Generative AI Engineer specialized in autonomous agents, RAG systems, and LLM orchestration. I build agents, pipelines, and tools that do something real.",
  keywords: [
    "AI Engineer",
    "Generative AI",
    "LLM",
    "RAG",
    "Autonomous Agents",
    "CrewAI",
    "LangChain",
    "Python",
    "Soban Ejaz",
  ],
  authors: [{ name: "Soban Ejaz" }],
  creator: "Soban Ejaz",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "Soban Ejaz — AI Engineer",
    title: "Soban Ejaz — AI Engineer",
    description:
      "Generative AI Engineer specialized in autonomous agents, RAG systems, and LLM orchestration.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Soban Ejaz — AI Engineer",
    description:
      "Generative AI Engineer specialized in autonomous agents, RAG systems, and LLM orchestration.",
  },
  alternates: {
    canonical: siteUrl,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Soban Ejaz",
  jobTitle: "Generative AI Engineer",
  url: siteUrl,
  email: "sobanpythonista@gmail.com",
  sameAs: [
    "https://github.com/SOBANEJAZ",
    "https://linkedin.com/in/sobanejaz",
  ],
  knowsAbout: [
    "Generative AI",
    "Large Language Models",
    "RAG Systems",
    "Autonomous Agents",
    "CrewAI",
    "LangChain",
    "Python",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${rubik.variable} ${nunito.variable} h-full`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col" suppressHydrationWarning>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:z-[100] focus:top-4 focus:left-4 focus:bg-main focus:text-main-foreground focus:px-4 focus:py-2 focus:font-heading focus:font-bold focus:border-2 focus:border-border focus:shadow-shadow"
        >
          Skip to content
        </a>
        <Navbar />
        <main id="main-content" className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
