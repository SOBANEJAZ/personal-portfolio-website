import { Button } from "@/components/ui/button";
import { GithubIcon, LinkedinIcon } from "@/components/icons";
import { Mail } from "lucide-react";

export function Footer() {
  return (
    <footer style={{ backgroundColor: "#f7e6c6" }}>
      <div className="mx-auto max-w-container px-4 py-8 md:px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 md:gap-4">
          <p className="font-heading text-lg font-bold">soban.tech</p>
          <div className="flex items-center gap-3">
            <a href="https://github.com/SOBANEJAZ" target="_blank" rel="noopener noreferrer">
              <Button variant="noShadow" size="icon" className="min-h-[44px] min-w-[44px]">
                <GithubIcon className="h-5 w-5" />
              </Button>
            </a>
            <a href="https://linkedin.com/in/sobanejaz" target="_blank" rel="noopener noreferrer">
              <Button variant="noShadow" size="icon" className="min-h-[44px] min-w-[44px]">
                <LinkedinIcon className="h-5 w-5" />
              </Button>
            </a>
            <a href="mailto:sobanpythonista@gmail.com">
              <Button variant="noShadow" size="icon" className="min-h-[44px] min-w-[44px]">
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
