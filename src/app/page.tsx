import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ArrowRight,
  ArrowUpRight,
  Bot,
  Brain,
  Code2,
  ExternalLink,
  Mic,
  Server,
  Zap,
} from "lucide-react";
import { GithubIcon } from "@/components/icons";
import PageLoader from "@/components/page-loader";
import { HeroStrip } from "@/components/hero-strip";
import { FooterRunner } from "@/components/footer-runner";

export const metadata: Metadata = {
  title: "Soban Ejaz — AI Engineer",
  description:
    "Portfolio of Soban Ejaz, a Generative AI Engineer specialized in autonomous agents, RAG systems, and LLM orchestration. View my projects, experience, and skills.",
  openGraph: {
    title: "Soban Ejaz — AI Engineer",
    description:
      "Portfolio of Soban Ejaz, a Generative AI Engineer specialized in autonomous agents, RAG systems, and LLM orchestration.",
  },
};

const skills = [
  {
    category: "AI & LLMs",
    tone: "card-tone-peach",
    icon: Brain,
    items: ["OpenAI", "Groq", "Gemini", "Anthropic", "MCP"],
  },
  {
    category: "Frameworks",
    tone: "card-tone-apricot",
    icon: Code2,
    items: ["CrewAI", "LangGraph", "LangChain", "LlamaIndex", "PydanticAI"],
  },
  {
    category: "Data & RAG",
    tone: "card-tone-peach",
    icon: Zap,
    items: ["Pinecone", "ChromaDB", "Crawl4AI", "Hybrid Search", "Reranking"],
  },
  {
    category: "Frontend",
    tone: "card-tone-apricot",
    icon: Server,
    items: ["React", "Next.js", "Tailwind CSS", "Streamlit", "Chainlit"],
  },
  {
    category: "Backend/Ops",
    tone: "card-tone-peach",
    icon: Bot,
    items: ["PostgreSQL", "Supabase", "Firebase", "Docker", "Linux"],
  },
  {
    category: "Voice AI",
    tone: "card-tone-apricot",
    icon: Mic,
    items: ["Whisper STT", "ElevenLabs TTS", "Real-time Streaming"],
  },
];

const experiences = [
  {
    role: "AI Engineer",
    company: "Spiral Lab",
    link: "https://www.linkedin.com/company/spiral-lab1/about/",
    period: "Dec 2025 — Apr 2026",
    bullets: [
      "Designed and optimized multi-agent systems using CrewAI, LangChain, and LlamaIndex",
      "Built and deployed RAG pipelines with Streamlit and Chainlit for production-ready workflows",
      "Integrated APIs from Groq, Gemini, and OpenAI for scalable multi-model AI solutions",
    ],
  },
  {
    role: "AI Engineer",
    company: "Skill2Success",
    link: "https://www.skill2success.com/",
    period: "Sept 2025 — Dec 2025",
    bullets: [
      "Integrated Generative AI into core EdTech products to enhance student engagement",
      "Implemented a RAG pipeline for personalized course recommendations at scale",
      "Pitched the GenAI-powered EdTech platform to the National Incubation Center, enabling curriculum-aligned learning through AI",
    ],
  },
];

const projects = [
  {
    title: "Narrate-AI",
    tone: "card-tone-peach",
    description:
      "Multiphase autonomous pipeline that converts any topic into a narrated documentary — research, script, image retrieval, and video rendering, fully automated.",
    tech: ["Python", "Groq", "Pinecone", "ElevenLabs", "OpenCLIP"],
    link: "https://github.com/SOBANEJAZ/Narrate-AI",
  },
  {
    title: "AI Competitor Analysis Agent",
    tone: "card-tone-apricot",
    description:
      "Parallel-crawling RAG tool that compares companies in real-time using Groq LPUs and Pinecone for near-instant competitor analysis.",
    tech: ["Python", "Firecrawl", "Groq", "Pinecone", "Streamlit"],
    link: "https://github.com/SOBANEJAZ/AI-Competitor-Analysis-Agent",
  },
  {
    title: "Agentic Employee Tracking & QA",
    tone: "card-tone-peach",
    description:
      "GPT-4o pipeline that syncs OpenPhone call data with Monday.com and auto-audits compliance. Cut runtime ~80% with modular in-memory architecture.",
    tech: ["Python", "GPT-4o", "OpenPhone", "Monday.com"],
    link: "https://github.com/SOBANEJAZ/Agentic-Employee-Tracking-and-QA",
  },
  {
    title: "Automatic Voice Chatbot",
    tone: "card-tone-apricot",
    description:
      "Real-time voice AI using Whisper STT, Gemini for reasoning, and ElevenLabs streaming TTS for low-latency spoken conversation.",
    tech: ["Python", "Whisper", "Gemini", "ElevenLabs"],
    link: "https://github.com/SOBANEJAZ/Automatic_Voice_Chatbot",
  },
  {
    title: "Gemini MCP Server",
    tone: "card-tone-peach",
    description:
      "MCP server exposing Gemini API docs and code snippets to any MCP-compatible AI client. Supports remote VM deployment via SSE with token-based auth.",
    tech: ["Python", "FastMCP", "SSE"],
    link: "https://github.com/SOBANEJAZ/Gemini-MCP-Server",
  },
  {
    title: "mem0 Memory Chatbot",
    tone: "card-tone-apricot",
    description:
      "Chatbot with long-term memory that remembers user facts across sessions using Mem0 for persistent, personalized conversations.",
    tech: ["Python", "Mem0", "LLMs"],
    link: "https://github.com/SOBANEJAZ/mem0-memory-chatbot",
  },
];

export default function HomePage() {
  return (
    <PageLoader>
      <div className="flex flex-col">
        {/* Hero */}
      <section className="hero-surface border-b-2 border-border">
        <div className="mx-auto max-w-container px-5 py-14 md:px-8 lg:py-20">
          <div className="grid items-center gap-12 lg:grid-cols-[1.2fr_1fr] lg:gap-16">
            <div className="min-w-0 hero-group">
              <p className="section-kicker">Generative AI Engineer</p>
              <h1 className="text-[clamp(3rem,6.5vw,5.5rem)] font-heading font-bold leading-[1.08] tracking-tight mb-6">
                hi, i&apos;m<br />
                <span className="fx-invert-reveal inline-block">soban<span className="text-link">.</span></span>
              </h1>
              <p className="max-w-lg text-lg md:text-xl mb-8 leading-relaxed font-bold text-foreground/80">
                I build AI that does something real. Autonomous agents,
                RAG pipelines, and useful tools from the first idea to
                production.
              </p>
              <div className="flex flex-wrap gap-3">
                <Button asChild size="lg"><a href="#projects">Explore my work <ArrowUpRight /></a></Button>
                <Button asChild variant="neutral" size="lg"><Link href="/contact">Let&apos;s talk <ArrowRight /></Link></Button>
              </div>
              <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm">
                <Link href="/resume" className="underline decoration-2 underline-offset-4 hover:text-link">View resume</Link>
                <a href="https://github.com/SOBANEJAZ" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 underline decoration-2 underline-offset-4 hover:text-link"><GithubIcon className="size-4" /> GitHub</a>
              </div>
            </div>
            <div className="relative mx-auto w-full max-w-[440px]">
              <div className="overflow-hidden rounded-base border-2 border-border bg-surface-apricot shadow-[8px_8px_0_var(--border)]">
                <div className="flex items-center justify-end border-b-2 border-border px-4 py-3 font-mono text-xs">
                  <div aria-hidden="true" className="flex gap-1.5"><span className="size-2.5 rounded-full border border-border bg-main" /><span className="size-2.5 rounded-full border border-border" /><span className="size-2.5 rounded-full border border-border" /></div>
                </div>
                <div className="bg-main px-6 pt-5">
              <Image
                src="/pic.png"
                alt="Soban Ejaz — AI Engineer"
                width={1000}
                height={1067}
                sizes="(max-width: 480px) 85vw, 390px"
                loading="eager"
                className="h-auto w-full"
              />
                </div>
                <div className="flex items-center border-t-2 border-border px-4 py-4">
                  <span className="font-black">Soban Ejaz</span>
                </div>
              </div>
              <span aria-hidden="true" className="absolute -right-2 top-20 flex size-16 rotate-12 items-center justify-center border-2 border-border bg-secondary-background text-3xl shadow-shadow sm:-right-5">✳</span>
            </div>
          </div>
        </div>
      </section>

      <HeroStrip />

      {/* Skills */}
      <section className="section-orange-gradient">
        <div className="mx-auto max-w-container px-5 py-16 md:px-8 md:py-20">
          <h2 className="text-3xl md:text-[42px] font-heading font-bold tracking-tight mb-8">
            what i work with
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {skills.map((skill) => (
              <Card key={skill.category} className={skill.tone}>
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-3">
                    <span className="flex size-10 items-center justify-center rounded-base border-2 border-border bg-main"><skill.icon className="h-5 w-5" /></span>
                    <CardTitle className="text-[20px] font-bold">{skill.category}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-1.5">
                    {skill.items.map((item) => (
                      <Badge key={item} variant="neutral" className="text-[14px]">
                        {item}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <div className="divider-orange-gradient" aria-hidden="true" />

      {/* Experience */}
      <section>
        <div className="mx-auto max-w-container px-5 py-16 md:px-8 md:py-20">
          <h2 className="text-3xl md:text-[42px] font-heading font-bold tracking-tight mb-8">
            experience
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {experiences.map((exp) => (
              <Card key={exp.company} className="card-tone-peach">
                <CardHeader>
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <div>
                      <CardTitle className="text-[22px] font-bold">{exp.role}</CardTitle>
                        <Button asChild size="sm" className="text-base mt-3">
                      <a href={exp.link} target="_blank" rel="noopener noreferrer">
                          {exp.company} <ExternalLink className="h-4 w-4" />
                      </a>
                        </Button>
                    </div>
                    <Badge variant="neutral" className="shrink-0 text-xs">
                      {exp.period}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {exp.bullets.map((bullet, i) => (
                      <li key={i} className="text-[16px] text-foreground/70 flex gap-2">
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-main" />
                        {bullet}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <div className="divider-orange-gradient" aria-hidden="true" />

      {/* Projects */}
      <section id="projects" className="section-orange-gradient">
        <div className="mx-auto max-w-container px-5 py-16 md:px-8 md:py-20">
          <div className="flex flex-wrap items-center justify-between gap-5 mb-8">
            <h2 className="text-3xl md:text-[42px] font-heading font-bold tracking-tight">
              things i&apos;ve built
            </h2>
              <Button asChild variant="neutral" size="sm">
            <a href="https://github.com/SOBANEJAZ" target="_blank" rel="noopener noreferrer">
                View all on GitHub <ExternalLink className="ml-2 h-3 w-3" />
            </a>
              </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {projects.map((project) => (
              <a
                key={project.title}
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group"
              >
                <Card className={`h-full gap-5 ${project.tone}`}>
                  <CardHeader>
                    <div className="mb-5 flex items-center justify-between border-b-2 border-border/20 pb-4">
                      <span className="font-heading text-xl leading-tight font-bold text-[#4a1805] md:text-2xl">{project.title}</span>
                      <span className="flex size-9 items-center justify-center rounded-base border-2 border-border bg-main"><ArrowUpRight className="size-5" /></span>
                    </div>
                  </CardHeader>
                  <CardContent className="flex flex-1 flex-col">
                    <p className="text-lg leading-relaxed text-foreground/75 mb-3">
                      {project.description}
                    </p>
                    <div className="mt-auto flex flex-wrap gap-1.5 pt-3">
                      {project.tech.map((t) => (
                        <Badge key={t} variant="neutral" className="text-xs">
                          {t}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </a>
            ))}
          </div>
        </div>
      </section>
      <section className="mx-auto w-full max-w-container px-5 pb-20 md:px-8">
        <div className="flex flex-col items-start justify-between gap-8 rounded-base border-2 border-border bg-main p-7 shadow-shadow md:flex-row md:items-center md:p-12">
          <div>
            <p className="section-kicker">Have something in mind?</p>
            <h2 className="max-w-xl text-3xl font-bold tracking-tight md:text-4xl">Let&apos;s build something crazyy!</h2>
          </div>
          <Button asChild variant="reverse" size="lg"><Link href="/contact">Get in touch <ArrowUpRight /></Link></Button>
        </div>
      </section>
      </div>
      <FooterRunner />
    </PageLoader>
  );
}
