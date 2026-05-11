import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Calendar } from "lucide-react";
import { getPost, getAllPostSlugs } from "@/lib/blog";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllPostSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  try {
    const post = getPost(slug);
    return {
      title: post.title,
      description: post.excerpt,
      openGraph: {
        title: `${post.title} — Soban Ejaz`,
        description: post.excerpt,
        type: "article",
        publishedTime: post.date,
      },
    };
  } catch {
    return { title: "Post Not Found" };
  }
}

function formatDate(dateStr: string): string {
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function estimateReadTime(html: string): string {
  const text = html.replace(/<[^>]+>/g, "");
  const words = text.split(/\s+/).length;
  const mins = Math.max(1, Math.round(words / 200));
  return `${mins} min read`;
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;

  let post;
  try {
    post = getPost(slug);
  } catch {
    notFound();
  }

  const readTime = estimateReadTime(post.contentHtml);

  return (
    <div className="mx-auto max-w-container px-4 py-16 md:px-6">
      <div className="max-w-[860px] mx-auto">
        <Link href="/blog">
          <Button variant="noShadow" size="sm" className="mb-8">
            <ArrowLeft className="mr-2 h-4 w-4" /> all posts
          </Button>
        </Link>

        <article className="border-2 border-border rounded-base shadow-shadow bg-secondary-background p-6 md:p-10">
          <header className="mb-8 pb-8 border-b-2 border-border">
            <div className="flex items-center gap-3 text-sm text-foreground/50 mb-4">
              <Calendar className="h-4 w-4" />
              <time dateTime={post.date}>{formatDate(post.date)}</time>
              <span className="text-foreground/30">|</span>
              <span>{readTime}</span>
            </div>

            <h1 className="text-3xl md:text-4xl font-heading font-bold mb-4">
              {post.title}
            </h1>

            <p className="text-lg text-foreground/60 mb-5">{post.excerpt}</p>

            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <Badge key={tag} variant="neutral">
                  {tag}
                </Badge>
              ))}
            </div>
          </header>

          <div
            className="blog-prose"
            dangerouslySetInnerHTML={{ __html: post.contentHtml }}
          />
        </article>
      </div>
    </div>
  );
}
