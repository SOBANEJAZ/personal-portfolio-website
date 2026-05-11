import type { Metadata } from "next";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Calendar } from "lucide-react";
import { getAllPosts } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Thoughts on AI engineering, tools, and building things that actually work.",
  openGraph: {
    title: "Blog — Soban Ejaz",
    description:
      "Thoughts on AI engineering, tools, and building things that actually work.",
  },
};

function formatDate(dateStr: string): string {
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
  });
}

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <div className="mx-auto max-w-container px-4 py-16 md:px-6">
      <div className="mb-12">
        <h1 className="text-3xl md:text-5xl font-heading font-bold mb-4">
          blog
        </h1>
        <p className="text-lg text-foreground/60 max-w-2xl">
          Thoughts on AI engineering, tools, and building things that actually
          work.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {posts.map((post) => (
          <Link key={post.slug} href={`/blog/${post.slug}`}>
            <Card className="group cursor-pointer h-full">
              <CardHeader>
                <div className="flex items-center gap-2 text-sm text-foreground/50 mb-2">
                  <Calendar className="h-3.5 w-3.5" />
                  {formatDate(post.date)}
                </div>
                <CardTitle className="text-lg text-foreground group-hover:underline decoration-2 underline-offset-4">
                  {post.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-foreground/70 mb-4">
                  {post.excerpt}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {post.tags.map((tag) => (
                    <Badge key={tag} variant="neutral" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
