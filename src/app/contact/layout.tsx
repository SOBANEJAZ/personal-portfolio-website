import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Soban Ejaz. Have a project idea, want to collaborate, or just want to chat about AI?",
  openGraph: {
    title: "Contact — Soban Ejaz",
    description:
      "Get in touch with Soban Ejaz. Have a project idea, want to collaborate, or just want to chat about AI?",
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
