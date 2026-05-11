import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Calendar } from "lucide-react";

const posts = [
  {
    title: "Building Narrate-AI: From Topic to Documentary in Minutes",
    excerpt:
      "How I built a fully autonomous pipeline that researches any topic, writes a script, retrieves images, and renders a narrated documentary video — zero manual input required.",
    date: "Mar 2026",
    tags: ["RAG", "Pipeline", "ElevenLabs", "OpenCLIP"],
    slug: "building-narrate-ai",
  },
  {
    title: "Multi-Agent Systems with CrewAI: Lessons from Production",
    excerpt:
      "Reflections on designing and optimizing multi-agent architectures using CrewAI, LangChain, and LlamaIndex during my internship at Spiral Lab.",
    date: "Feb 2026",
    tags: ["CrewAI", "Agents", "LangChain"],
    slug: "multi-agent-systems-crewai",
  },
  {
    title: "The MCP Protocol: Giving AI Agents Real Tools",
    excerpt:
      "An introduction to the Model Context Protocol and how I built a Gemini MCP Server that exposes API docs and code snippets to any MCP-compatible client.",
    date: "Jan 2026",
    tags: ["MCP", "Gemini", "Tool Use"],
    slug: "mcp-protocol-ai-agents",
  },
  {
    title: "Real-Time Voice AI: Bridging Whisper, Gemini, and ElevenLabs",
    excerpt:
      "The architecture behind a low-latency voice chatbot that listens with Whisper, reasons with Gemini, and speaks with ElevenLabs — all in real-time.",
    date: "Dec 2025",
    tags: ["Voice AI", "Whisper", "Streaming"],
    slug: "real-time-voice-ai",
  },
  {
    title: "RAG in EdTech: Personalized Learning at Scale",
    excerpt:
      "How I implemented a RAG pipeline at Skill2Success to deliver personalized course recommendations to students based on their learning patterns.",
    date: "Nov 2025",
    tags: ["RAG", "EdTech", "Personalization"],
    slug: "rag-edtech-personalized-learning",
  },
  {
    title: "Async Parallel Crawling for Competitor Intelligence",
    excerpt:
      "Building a high-performance RAG tool using asyncio and ThreadPoolExecutor to reduce data acquisition time by ~50% versus sequential scrapers.",
    date: "Oct 2025",
    tags: ["Async", "Crawling", "RAG", "Groq"],
    slug: "async-parallel-crawling",
  },
];

export default function BlogPage() {
  return (
    <div className="mx-auto max-w-container px-4 py-16 md:px-6">
      <div className="mb-12">
        <h1 className="text-3xl md:text-5xl font-heading font-bold mb-4">
          blog
        </h1>
        <p className="text-lg text-foreground/60 max-w-2xl">
          Thoughts on AI engineering, agentic systems, RAG pipelines, and
          building things that actually work in production.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {posts.map((post) => (
          <Card key={post.slug} className="group cursor-pointer">
            <CardHeader>
              <div className="flex items-center gap-2 text-sm text-foreground/50 mb-2">
                <Calendar className="h-3.5 w-3.5" />
                {post.date}
              </div>
              <CardTitle className="text-lg group-hover:text-main transition-colors">
                {post.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-foreground/70 mb-4">{post.excerpt}</p>
              <div className="flex flex-wrap gap-1.5">
                {post.tags.map((tag) => (
                  <Badge key={tag} variant="neutral" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
