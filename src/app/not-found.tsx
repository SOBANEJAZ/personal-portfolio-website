import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-container px-4 py-16 md:px-6 md:py-24">
      <div className="max-w-3xl">
        <h1 className="text-6xl md:text-8xl font-heading font-bold tracking-tight mb-4 fx-invert-reveal">
          404
        </h1>
        <p className="text-xl md:text-2xl mb-8 leading-relaxed opacity-80">
          This page doesn&apos;t exist. Maybe it was moved, or maybe you
          mistyped the URL.
        </p>
        <Link href="/">
          <Button size="lg">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
          </Button>
        </Link>
      </div>
    </div>
  );
}
