"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Send } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/icons";
import { useState } from "react";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="mx-auto max-w-container px-4 py-16 md:px-6">
      <div className="mb-12">
        <h1 className="text-3xl md:text-5xl font-heading font-bold mb-4">
          get in touch
        </h1>
        <p className="text-lg text-foreground/60 max-w-2xl">
          Have a project idea, want to collaborate, or just want to chat about
          AI? Reach out — I&apos;m always open to interesting conversations.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Contact Info */}
        <div className="space-y-4">
          <Card>
            <CardContent className="pt-6">
              <a
                href="mailto:sobanpythonista@gmail.com"
                className="flex items-center gap-3 group"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-base border-2 border-border bg-main">
                  <Mail className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-heading font-bold text-sm">Email</p>
                  <p className="text-sm text-foreground/60 group-hover:text-main transition-colors">
                    sobanpythonista@gmail.com
                  </p>
                </div>
              </a>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <a
                href="https://linkedin.com/in/sobanejaz"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 group"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-base border-2 border-border bg-main">
                  <LinkedinIcon className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-heading font-bold text-sm">LinkedIn</p>
                  <p className="text-sm text-foreground/60 group-hover:text-main transition-colors">
                    linkedin.com/in/sobanejaz
                  </p>
                </div>
              </a>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <a
                href="https://github.com/SOBANEJAZ"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 group"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-base border-2 border-border bg-main">
                  <GithubIcon className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-heading font-bold text-sm">GitHub</p>
                  <p className="text-sm text-foreground/60 group-hover:text-main transition-colors">
                    github.com/SOBANEJAZ
                  </p>
                </div>
              </a>
            </CardContent>
          </Card>
        </div>

        {/* Contact Form */}
        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>send me a message</CardTitle>
            </CardHeader>
            <CardContent>
              {submitted ? (
                <div className="text-center py-12">
                  <div className="inline-flex h-16 w-16 items-center justify-center rounded-full border-2 border-border bg-main mb-4">
                    <Send className="h-7 w-7" />
                  </div>
                  <h3 className="text-xl font-heading font-bold mb-2">
                    message sent!
                  </h3>
                  <p className="text-foreground/60">
                    Thanks for reaching out. I&apos;ll get back to you soon.
                  </p>
                  <Button
                    variant="noShadow"
                    className="mt-6"
                    onClick={() => setSubmitted(false)}
                  >
                    Send another
                  </Button>
                </div>
              ) : (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    setSubmitted(true);
                  }}
                  className="space-y-6"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Name</Label>
                      <Input
                        id="name"
                        placeholder="Your name"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="you@example.com"
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject</Label>
                    <Input
                      id="subject"
                      placeholder="What's this about?"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea
                      id="message"
                      placeholder="Tell me about your project, idea, or just say hi..."
                      rows={6}
                      required
                    />
                  </div>
                  <Button type="submit" size="lg" className="w-full sm:w-auto">
                    <Send className="mr-2 h-4 w-4" /> Send Message
                  </Button>
                </form>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
