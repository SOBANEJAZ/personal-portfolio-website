"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Menu, X, ExternalLink } from "lucide-react";
import { useState } from "react";

const links = [
  { href: "/", label: "Home" },
  { href: "/blog", label: "Blog" },
  { href: "/resume", label: "Resume" },
  { href: "/contact", label: "Contact" },
];

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const isActive = (href: string) => pathname === href || (href !== "/" && pathname.startsWith(`${href}/`));

  return (
    <header className="sticky top-0 z-50 border-b-2 border-border bg-surface-apricot">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 surface-dashed-grid"
      />
      <nav aria-label="Main navigation" className="relative mx-auto max-w-container flex items-center justify-between gap-6 px-5 py-4 md:px-8">
        <Link
          href="/"
          className="flex items-center gap-3 text-xl font-heading font-bold tracking-tight"
        >
          <span aria-hidden="true" className="flex size-9 items-center justify-center rounded-base border-2 border-border bg-main text-sm shadow-[2px_2px_0_var(--border)]">se.</span>
          soban<span className="-ml-3 text-link">.tech</span>
        </Link>

        {/* Desktop */}
        <ul
          className="hidden md:flex items-center gap-3"
        >
          {links.map((link) => (
            <li key={link.href}>
                <Button asChild
                  variant={isActive(link.href) ? "default" : "noShadow"}
                  size="sm"
                >
                <Link href={link.href} aria-current={isActive(link.href) ? "page" : undefined}>
                  {link.label}
                </Link>
                </Button>
            </li>
          ))}
          <li>
              <Button asChild
                variant="reverse"
                size="sm"
              >
            <a href="https://github.com/SOBANEJAZ" target="_blank" rel="noopener noreferrer">
                 GitHub <ExternalLink className="ml-1 h-3 w-3" />
            </a>
               </Button>
          </li>
        </ul>

        {/* Mobile toggle */}
        <button
          className="md:hidden rounded-base border-2 border-border bg-main shadow-shadow p-2 min-h-[44px] min-w-[44px] inline-flex items-center justify-center hover:translate-x-boxShadowX hover:translate-y-boxShadowY hover:shadow-none transition-transform"
          onClick={() => setOpen(!open)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div
          id="mobile-menu"
          className="relative md:hidden border-t-2 border-border bg-surface-apricot"
          onKeyDown={(event) => {
            if (event.key === "Escape") {
              setOpen(false);
              document.querySelector<HTMLButtonElement>('[aria-controls="mobile-menu"]')?.focus();
            }
          }}
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 surface-dashed-grid"
          />
          <ul className="relative flex flex-col p-4 gap-2">
            {links.map((link) => (
              <li key={link.href}>
                  <Button asChild
                    variant={isActive(link.href) ? "default" : "noShadow"}
                    className="w-full min-h-[44px]"
                  >
                <Link href={link.href} onClick={() => setOpen(false)} aria-current={isActive(link.href) ? "page" : undefined}>
                    {link.label}
                </Link>
                  </Button>
              </li>
            ))}
            <li>
                <Button asChild variant="reverse" className="w-full min-h-[44px]">
              <a href="https://github.com/SOBANEJAZ" target="_blank" rel="noopener noreferrer">
                  GitHub <ExternalLink className="ml-1 h-3 w-3" />
              </a>
                </Button>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
