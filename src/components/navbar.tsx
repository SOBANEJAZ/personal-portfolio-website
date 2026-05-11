"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Menu, X, ExternalLink } from "lucide-react";
import { useState, useEffect, useCallback } from "react";

const links = [
  { href: "/", label: "Home" },
  { href: "/blog", label: "Blog" },
  { href: "/resume", label: "Resume" },
  { href: "/contact", label: "Contact" },
];

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const onScroll = useCallback(() => setScrolled(window.scrollY > 50), []);

  useEffect(() => {
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [onScroll]);

  return (
    <header className="sticky top-0 z-50 border-b-2 border-border" style={{ backgroundColor: "#f7e6c6" }}>
      <nav className="mx-auto max-w-container flex items-center justify-between px-4 py-3 md:px-6">
        <Link
          href="/"
          className="text-xl font-heading font-bold tracking-tight transition-all duration-300 ease-out"
          style={{ transform: scrolled ? "translateX(180px) scale(1.15)" : "translateX(0) scale(1)" }}
        >
          soban.tech
        </Link>

        {/* Desktop */}
        <ul
          className="hidden md:flex items-center gap-1 transition-all duration-300 ease-out"
          style={{ transform: scrolled ? "translateX(-180px)" : "translateX(0)" }}
        >
          {links.map((link) => (
            <li key={link.href}>
              <Link href={link.href}>
                <Button
                  variant={pathname === link.href ? "default" : "noShadow"}
                  size="sm"
                  className="transition-transform duration-300 ease-out"
                  style={{ transform: scrolled ? "scale(1.1)" : "scale(1)" }}
                >
                  {link.label}
                </Button>
              </Link>
            </li>
          ))}
          <li>
            <a href="https://github.com/SOBANEJAZ" target="_blank" rel="noopener noreferrer">
              <Button
                variant="reverse"
                size="sm"
                className="transition-transform duration-300 ease-out"
                style={{ transform: scrolled ? "scale(1.1)" : "scale(1)" }}
              >
                 GitHub <ExternalLink className="ml-1 h-3 w-3" />
               </Button>
            </a>
          </li>
        </ul>

        {/* Mobile toggle */}
        <button
          className="md:hidden p-2 min-h-[44px] min-w-[44px] inline-flex items-center justify-center"
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
          role="menu"
          className="md:hidden border-t-2 border-border"
          style={{ backgroundColor: "#f7e6c6" }}
        >
          <ul className="flex flex-col p-4 gap-2">
            {links.map((link) => (
              <li key={link.href} role="none">
                <Link href={link.href} onClick={() => setOpen(false)} role="menuitem">
                  <Button
                    variant={pathname === link.href ? "default" : "noShadow"}
                    className="w-full min-h-[44px]"
                  >
                    {link.label}
                  </Button>
                </Link>
              </li>
            ))}
            <li role="none">
              <a href="https://github.com/SOBANEJAZ" target="_blank" rel="noopener noreferrer" role="menuitem">
                <Button variant="reverse" className="w-full min-h-[44px]">
                  GitHub <ExternalLink className="ml-1 h-3 w-3" />
                </Button>
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
