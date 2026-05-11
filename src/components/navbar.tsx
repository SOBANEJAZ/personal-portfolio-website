"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
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

  return (
    <header className="sticky top-0 z-50 bg-background border-b-2 border-border">
      <nav className="mx-auto max-w-container flex items-center justify-between px-4 py-3 md:px-6">
        <Link href="/" className="text-xl font-heading font-bold tracking-tight">
          soban.dev
        </Link>

        {/* Desktop */}
        <ul className="hidden md:flex items-center gap-1">
          {links.map((link) => (
            <li key={link.href}>
              <Link href={link.href}>
                <Button
                  variant={pathname === link.href ? "default" : "noShadow"}
                  size="sm"
                >
                  {link.label}
                </Button>
              </Link>
            </li>
          ))}
          <li>
            <a href="https://github.com/SOBANEJAZ" target="_blank" rel="noopener noreferrer">
              <Button variant="reverse" size="sm">
                GitHub
              </Button>
            </a>
          </li>
        </ul>

        {/* Mobile toggle */}
        <button
          className="md:hidden p-2"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden border-t-2 border-border bg-background">
          <ul className="flex flex-col p-4 gap-2">
            {links.map((link) => (
              <li key={link.href}>
                <Link href={link.href} onClick={() => setOpen(false)}>
                  <Button
                    variant={pathname === link.href ? "default" : "noShadow"}
                    className="w-full"
                  >
                    {link.label}
                  </Button>
                </Link>
              </li>
            ))}
            <li>
              <a href="https://github.com/SOBANEJAZ" target="_blank" rel="noopener noreferrer">
                <Button variant="reverse" className="w-full">
                  GitHub
                </Button>
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
