import { Button } from "@/components/ui/button";
import { GithubIcon, LinkedinIcon } from "@/components/icons";
import { Mail } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t-2 border-border bg-secondary-background">
      <div className="mx-auto max-w-container px-4 py-8 md:px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-heading text-lg font-bold">soban.dev</p>
          <div className="flex items-center gap-2">
            <a href="https://github.com/SOBANEJAZ" target="_blank" rel="noopener noreferrer">
              <Button variant="noShadow" size="icon">
                <GithubIcon className="h-5 w-5" />
              </Button>
            </a>
            <a href="https://linkedin.com/in/sobanejaz" target="_blank" rel="noopener noreferrer">
              <Button variant="noShadow" size="icon">
                <LinkedinIcon className="h-5 w-5" />
              </Button>
            </a>
            <a href="mailto:sobanpythonista@gmail.com">
              <Button variant="noShadow" size="icon">
                <Mail className="h-5 w-5" />
              </Button>
            </a>
          </div>
          <p className="text-sm text-foreground/60">
            &copy; {new Date().getFullYear()} Soban Ejaz. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
