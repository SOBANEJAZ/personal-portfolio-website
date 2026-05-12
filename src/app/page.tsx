import type { Metadata } from "next";
import Link from "next/link";
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
    icon: Brain,
    items: ["OpenAI", "Groq", "Gemini", "Anthropic", "MCP"],
  },
  {
    category: "Frameworks",
    icon: Code2,
    items: ["CrewAI", "LangGraph", "LangChain", "LlamaIndex", "PydanticAI"],
  },
  {
    category: "Data & RAG",
    icon: Zap,
    items: ["Pinecone", "ChromaDB", "Crawl4AI", "Hybrid Search", "Reranking"],
  },
  {
    category: "Frontend",
    icon: Server,
    items: ["React", "Next.js", "Tailwind CSS", "Streamlit", "Chainlit"],
  },
  {
    category: "Backend/Ops",
    icon: Bot,
    items: ["PostgreSQL", "Supabase", "Firebase", "Docker", "Linux"],
  },
  {
    category: "Voice AI",
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
    description:
      "Multiphase autonomous pipeline that converts any topic into a narrated documentary — research, script, image retrieval, and video rendering, fully automated.",
    tech: ["Python", "Groq", "Pinecone", "ElevenLabs", "OpenCLIP"],
    link: "https://github.com/SOBANEJAZ/Narrate-AI",
  },
  {
    title: "AI Competitor Analysis Agent",
    description:
      "Parallel-crawling RAG tool that compares companies in real-time using Groq LPUs and Pinecone for near-instant competitor analysis.",
    tech: ["Python", "Firecrawl", "Groq", "Pinecone", "Streamlit"],
    link: "https://github.com/SOBANEJAZ/AI-Competitor-Analysis-Agent",
  },
  {
    title: "Agentic Employee Tracking & QA",
    description:
      "GPT-4o pipeline that syncs OpenPhone call data with Monday.com and auto-audits compliance. Cut runtime ~80% with modular in-memory architecture.",
    tech: ["Python", "GPT-4o", "OpenPhone", "Monday.com"],
    link: "https://github.com/SOBANEJAZ/Agentic-Employee-Tracking-and-QA",
  },
  {
    title: "Automatic Voice Chatbot",
    description:
      "Real-time voice AI using Whisper STT, Gemini for reasoning, and ElevenLabs streaming TTS for low-latency spoken conversation.",
    tech: ["Python", "Whisper", "Gemini", "ElevenLabs"],
    link: "https://github.com/SOBANEJAZ/Automatic_Voice_Chatbot",
  },
  {
    title: "Gemini MCP Server",
    description:
      "MCP server exposing Gemini API docs and code snippets to any MCP-compatible AI client. Supports remote VM deployment via SSE with token-based auth.",
    tech: ["Python", "FastMCP", "SSE"],
    link: "https://github.com/SOBANEJAZ/Gemini-MCP-Server",
  },
  {
    title: "mem0 Memory Chatbot",
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
      <section>
        <div className="mx-auto max-w-container px-4 py-16 md:px-6 md:py-24">
          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
            <div className="max-w-3xl flex-1 hero-group">
              <Badge className="mb-4">Open to opportunities</Badge>
              <h1 className="text-4xl md:text-6xl font-heading font-bold tracking-tight mb-6">
                <span className="fx-invert-reveal cursor-pointer">hi, i&apos;m soban</span>
              </h1>
              <p className="text-lg md:text-xl mb-8 leading-relaxed opacity-80">
                Generative AI Engineer specialized in autonomous agents, RAG
                systems, and LLM orchestration. I build agents, RAG pipelines,
                and tools that do something real.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link href="/resume">
                  <Button size="lg">
                    View Resume <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <a href="https://github.com/SOBANEJAZ" target="_blank" rel="noopener noreferrer">
                  <Button variant="reverse" size="lg">
                    <GithubIcon className="mr-2 h-4 w-4" /> GitHub
                  </Button>
                </a>
                <Link href="/contact">
                  <Button variant="noShadow" size="lg">
                    Get in Touch
                  </Button>
                </Link>
              </div>
            </div>
            <div className="shrink-0">
              <img
                src="/pic.png"
                alt="Soban Ejaz — AI Engineer"
                width={400}
                height={400}
                className="w-[250px] sm:w-[280px] md:w-[350px] lg:w-[500px] h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Skills */}
      <section>
        <div className="mx-auto max-w-container px-4 py-16 md:px-6">
          <h2 className="text-[28px] md:text-[34px] font-heading font-bold mb-8">
            what i work with
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {skills.map((skill) => (
              <Card key={skill.category}>
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-2">
                    <skill.icon className="h-5 w-5" />
                    <CardTitle className="text-[20px] fx-letter-slam cursor-pointer">{skill.category}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-1.5">
                    {skill.items.map((item) => (
                      <Badge key={item} variant="neutral" className="text-xs">
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

      {/* Experience */}
      <section>
        <div className="mx-auto max-w-container px-4 py-16 md:px-6">
          <h2 className="text-[28px] md:text-[34px] font-heading font-bold mb-8">
            experience
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {experiences.map((exp) => (
              <Card key={exp.company}>
                <CardHeader>
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <CardTitle className="text-[22px] fx-letter-slam cursor-pointer">{exp.role}</CardTitle>
                      <a href={exp.link} target="_blank" rel="noopener noreferrer">
                        <Button variant="noShadow" size="sm" className="text-base mt-1">
                          {exp.company} <ExternalLink className="h-4 w-4" />
                        </Button>
                      </a>
                    </div>
                    <Badge variant="neutral" className="shrink-0 text-[16px]">
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

      {/* Projects */}
      <section>
        <div className="mx-auto max-w-container px-4 py-16 md:px-6">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-[28px] md:text-[34px] font-heading font-bold">
              projects
            </h2>
            <a href="https://github.com/SOBANEJAZ" target="_blank" rel="noopener noreferrer">
              <Button variant="noShadow" size="sm">
                View all on GitHub <ExternalLink className="ml-2 h-3 w-3" />
              </Button>
            </a>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {projects.map((project) => (
              <a
                key={project.title}
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group"
              >
                <Card className="h-full">
                  <CardHeader>
                    <CardTitle className="text-[20px] flex items-center gap-2 fx-letter-slam cursor-pointer">
                      {project.title}
                      <ExternalLink className="h-3.5 w-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-[16px] text-foreground/70 mb-3">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-1.5">
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
      </div>
    </PageLoader>
  );
}
