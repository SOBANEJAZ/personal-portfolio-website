import { Button } from "@/components/ui/button";
import { GithubIcon, LinkedinIcon } from "@/components/icons";
import { Mail } from "lucide-react";
import { FooterRunner } from "@/components/footer-runner";

export function Footer() {
  return (
    <footer className="relative border-t-2 border-border bg-surface-apricot overflow-hidden">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 footer-dashed-grid"
      />
      <div className="relative mx-auto max-w-container px-4 pt-8 pb-3 md:px-6 md:pt-10 md:pb-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 md:gap-4">
          <p className="font-heading text-2xl sm:text-3xl font-bold tracking-tight">soban.tech</p>
          <div className="flex items-center gap-3">
              <Button asChild variant="noShadow" size="icon" className="min-h-[44px] min-w-[44px]">
            <a aria-label="GitHub" href="https://github.com/SOBANEJAZ" target="_blank" rel="noopener noreferrer">
                <GithubIcon className="h-5 w-5" />
            </a>
              </Button>
              <Button asChild variant="noShadow" size="icon" className="min-h-[44px] min-w-[44px]">
            <a aria-label="LinkedIn" href="https://linkedin.com/in/sobanejaz" target="_blank" rel="noopener noreferrer">
                <LinkedinIcon className="h-5 w-5" />
            </a>
              </Button>
              <Button asChild variant="noShadow" size="icon" className="min-h-[44px] min-w-[44px]">
            <a aria-label="Email Soban" href="mailto:sobanpythonista@gmail.com">
                <Mail className="h-5 w-5" />
            </a>
              </Button>
          </div>
          <p className="text-base sm:text-lg md:text-xl font-medium text-foreground/80">
            &copy; {new Date().getFullYear()} Soban Ejaz. All rights reserved.
          </p>
        </div>
      </div>
      <div className="relative">
        <FooterRunner />
      </div>
    </footer>
  );
}
