import { Button } from "@/components/ui/button";
import { GithubIcon, LinkedinIcon } from "@/components/icons";
import { Mail } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t-2 border-border bg-secondary-background">
      <div className="mx-auto max-w-container px-4 py-8 md:px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 md:gap-4">
          <p className="font-heading text-lg font-bold">soban.tech</p>
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
          <p className="text-sm text-foreground/60">
            &copy; {new Date().getFullYear()} Soban Ejaz. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
