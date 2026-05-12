import type { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Download, ExternalLink } from "lucide-react";

export const metadata: Metadata = {
  title: "Resume",
  description:
    "Experience, technical skills, and education of Soban Ejaz — Generative AI Engineer specializing in autonomous agents and RAG systems.",
  openGraph: {
    title: "Resume — Soban Ejaz",
    description:
      "Experience, technical skills, and education of Soban Ejaz — Generative AI Engineer specializing in autonomous agents and RAG systems.",
  },
};

const skills = {
  "AI & LLMs": ["OpenAI", "Groq", "Gemini", "Anthropic", "OpenClaw", "MCP"],
  Frameworks: ["CrewAI", "LangGraph", "LangChain", "LlamaIndex", "PydanticAI", "FastMCP"],
  "Data & RAG": ["Pinecone", "ChromaDB", "Crawl4AI", "Firecrawl", "Hybrid Search", "Reranking"],
  Frontend: ["React", "Tailwind CSS", "Next.js", "Streamlit", "Chainlit"],
  "Backend/Ops": ["PostgreSQL", "Supabase", "Firebase", "Docker", "Linux"],
};

const education = {
  degree: "BS Computer Science",
  school: "NASTP Institute of Information Technology",
  period: "Sep 2025 — Present",
  coursework: ["Machine Learning", "Data Science", "Deep Learning"],
};

const experience = [
  {
    role: "AI Engineer",
    company: "Spiral Lab, Lahore",
    link: "https://www.linkedin.com/company/spiral-lab1/about/",
    period: "Dec 2025 — Apr 2026",
    bullets: [
      "Designed and optimized multi-agent systems using CrewAI, LangChain, and LlamaIndex, improving reliability of LLM-powered applications",
      "Built and deployed RAG pipelines and AI prototypes with Streamlit and Chainlit for production-ready workflows",
      "Integrated APIs from Groq, Gemini, and OpenAI to deliver scalable, multi-model AI solutions",
      "Collaborated in agile teams on innovative AI-driven software across remote and cross-functional environments",
    ],
  },
  {
    role: "AI Engineer",
    company: "Skill2Success, Lahore",
    link: "https://www.skill2success.com/",
    period: "Sept 2025 — Dec 2025",
    bullets: [
      "Integrated Generative AI into core EdTech products to enhance student engagement and personalized learning",
      "Implemented a RAG pipeline to deliver personalized course recommendations to students at scale",
      "Collaborated with the technical lead to refine AI features around student engagement and learning outcomes",
      "Pitched the GenAI-powered EdTech platform to the National Incubation Center, enabling curriculum-aligned learning through AI",
    ],
  },
];

const projects = [
  {
    title: "Narrate-AI",
    tech: "Python, Groq, Pinecone, ElevenLabs, OpenCLIP",
    bullets: [
      "Built a multiphase autonomous pipeline (Research → Script → Image Retrieval → Video) that converts any topic into a narrated documentary with zero manual input",
      "Engineered a full RAG stack: web crawling with Crawl4AI, chunked indexing into Pinecone, and semantic retrieval to ground the LLM script writer in real sources",
      "Integrated OpenCLIP for vision-language image ranking and ElevenLabs TTS for high-quality narration; output renders as a final MP4 at 1280×720",
    ],
    link: "https://github.com/SOBANEJAZ/Narrate-AI",
  },
  {
    title: "Agentic Employee Tracking & QA System",
    tech: "Python, GPT-4o, OpenPhone, Monday.com",
    bullets: [
      "Refactored 20+ scripts into a modular in-memory pipeline, cutting end-to-end execution time by ~80%",
      "Automated two-way sync between OpenPhone call logs and Monday.com boards, with GPT-4o Structured Output auditing for billing compliance and transcript relevance",
      "Implemented Pydantic validation and asynchronous requests for robust, production-grade data handling",
    ],
    link: "https://github.com/SOBANEJAZ/Agentic-Employee-Tracking-and-QA",
  },
  {
    title: "AI Voice Agent",
    tech: "Python, Whisper, Gemini, ElevenLabs",
    bullets: [
      "Built a real-time voice AI using faster-Whisper STT, Gemini for reasoning, and ElevenLabs streaming TTS for low-latency spoken conversation",
      "Achieved seamless microphone-to-speaker loop with minimal perceptible delay via optimized async audio streaming",
    ],
    link: "https://github.com/SOBANEJAZ/Automatic_Voice_Chatbot",
  },
  {
    title: "Gemini MCP Server",
    tech: "Python, FastMCP, SSE",
    bullets: [
      "Developed an MCP server exposing Gemini API documentation lookups and ready-to-use code snippets to any MCP-compatible client",
      "Supports both local and remote VM deployment via SSE over HTTP with token-based secure authentication",
    ],
    link: "https://github.com/SOBANEJAZ/Gemini-MCP-Server",
  },
  {
    title: "AI Competitor Analysis Agent",
    tech: "Python, Firecrawl, Groq, Pinecone, Streamlit",
    bullets: [
      "Built a high-performance RAG tool using async parallel crawling (asyncio + ThreadPoolExecutor) to reduce data acquisition time by ~50% vs. sequential scrapers",
      "Leveraged Groq LPU inference (Llama-3-70b) and ephemeral Pinecone namespaces for near-instant competitor analysis with automatic context cleanup",
    ],
    link: "https://github.com/SOBANEJAZ/AI-Competitor-Analysis-Agent",
  },
];

export default function ResumePage() {
  return (
    <div className="mx-auto max-w-container px-4 py-16 md:px-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-12">
        <div>
          <h1 className="text-3xl md:text-5xl font-heading font-bold mb-2">
            Soban Ejaz
          </h1>
          <p className="text-lg text-foreground/60">
            Generative AI Engineer — Autonomous Agents, RAG Systems, LLM Orchestration
          </p>
          <div className="flex flex-wrap gap-2 mt-3 text-sm text-foreground/50">
            <a href="mailto:sobanpythonista@gmail.com" className="hover:text-main transition-colors">
              sobanpythonista@gmail.com
            </a>
            <span>·</span>
            <a href="https://github.com/SOBANEJAZ" target="_blank" rel="noopener noreferrer" className="hover:text-main transition-colors">
              github.com/SOBANEJAZ
            </a>
            <span>·</span>
            <a href="https://linkedin.com/in/sobanejaz" target="_blank" rel="noopener noreferrer" className="hover:text-main transition-colors">
              linkedin.com/in/sobanejaz
            </a>
            <span>·</span>
            <span>Lahore, Pakistan</span>
          </div>
        </div>
        <a href="/Soban_Ejaz_Resume.pdf" download>
          <Button size="lg">
            <Download className="mr-2 h-4 w-4" /> Download Resume
          </Button>
        </a>
      </div>

      {/* Summary */}
      <Card className="mb-8">
        <CardContent className="pt-6">
          <p className="text-foreground/80 leading-relaxed">
            Generative AI Engineer specialized in autonomous agents, RAG
            systems, and LLM orchestration. Expert in designing scalable
            multi-agent architectures and production-ready AI pipelines that
            bridge the gap between prototyping and deployment.
          </p>
        </CardContent>
      </Card>

      {/* Skills */}
      <section className="mb-8">
        <h2 className="text-[24px] md:text-[28px] font-heading font-bold mb-4 pb-2 border-b-2 border-border">
          Technical Skills
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {Object.entries(skills).map(([category, items]) => (
            <div key={category} className="flex gap-2">
              <span className="font-heading font-bold text-sm shrink-0 min-w-[100px]">
                {category}:
              </span>
              <div className="flex flex-wrap gap-1">
                {items.map((item) => (
                  <Badge key={item} variant="neutral" className="text-xs">
                    {item}
                  </Badge>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Education */}
      <section className="mb-8">
        <h2 className="text-[24px] md:text-[28px] font-heading font-bold mb-4 pb-2 border-b-2 border-border">
          Education
        </h2>
        <Card>
          <CardHeader>
            <div className="flex items-start justify-between gap-2">
              <div>
                <CardTitle className="text-[22px]">{education.degree}</CardTitle>
                <p className="text-foreground/60 mt-1">{education.school}</p>
              </div>
              <Badge variant="neutral" className="shrink-0 text-xs">
                {education.period}
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-foreground/70">
              <span className="font-heading font-bold">Relevant Coursework: </span>
              {education.coursework.join(", ")}
            </p>
          </CardContent>
        </Card>
      </section>

      {/* Experience */}
      <section className="mb-8">
        <h2 className="text-[24px] md:text-[28px] font-heading font-bold mb-4 pb-2 border-b-2 border-border">
          Experience
        </h2>
        <div className="space-y-4">
          {experience.map((exp) => (
            <Card key={exp.company}>
              <CardHeader>
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <CardTitle className="text-[22px]">{exp.role}</CardTitle>
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
      </section>

      {/* Projects */}
      <section>
        <h2 className="text-[24px] md:text-[28px] font-heading font-bold mb-4 pb-2 border-b-2 border-border">
          Key Projects
        </h2>
        <div className="space-y-4">
          {projects.map((project) => (
            <a
              key={project.title}
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group block"
            >
              <Card>
                <CardHeader>
                  <CardTitle className="text-[22px] flex items-center gap-2">
                    {project.title}
                    <ExternalLink className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </CardTitle>
                  <p className="text-sm text-foreground/50">{project.tech}</p>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {project.bullets.map((bullet, i) => (
                      <li key={i} className="text-[16px] text-foreground/70 flex gap-2">
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-main" />
                        {bullet}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </a>
          ))}
        </div>
      </section>
    </div>
  );
}
