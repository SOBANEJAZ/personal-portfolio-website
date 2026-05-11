"use client";

import { useRef, useState, useCallback } from "react";

const GLYPHS = "░▒▓█▀▄▌▐╳╬╋┼┤├┬┴─│01";

// ─── Scramble Text ───
export function ScrambleText({
  text,
  className = "",
}: {
  text: string;
  className?: string;
}) {
  const [display, setDisplay] = useState(text);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const origRef = useRef(text);

  const scramble = useCallback(() => {
    let iteration = 0;
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setDisplay(
        origRef.current
          .split("")
          .map((ch, i) => {
            if (ch === " ") return " ";
            if (i < iteration) return origRef.current[i];
            return GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
          })
          .join("")
      );
      iteration += 1 / 2;
      if (iteration >= origRef.current.length) {
        if (intervalRef.current) clearInterval(intervalRef.current);
        setDisplay(origRef.current);
      }
    }, 35);
  }, []);

  const reset = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    setDisplay(origRef.current);
  }, []);

  return (
    <span
      className={className}
      onMouseEnter={scramble}
      onMouseLeave={reset}
      role="text"
      aria-label={text}
      style={{ fontFamily: "monospace" }}
    >
      {display}
    </span>
  );
}

// ─── Magnetic Text ───
export function MagneticText({
  text,
  className = "",
  strength = 0.4,
}: {
  text: string;
  className?: string;
  strength?: number;
}) {
  const containerRef = useRef<HTMLSpanElement>(null);
  const [offsets, setOffsets] = useState<{ x: number; y: number }[]>(
    text.split("").map(() => ({ x: 0, y: 0 }))
  );

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!containerRef.current) return;
      const spans = containerRef.current.querySelectorAll<HTMLSpanElement>(":scope > span");
      const newOffsets = text.split("").map((_, i) => {
        const span = spans[i];
        if (!span) return { x: 0, y: 0 };
        const rect = span.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const dx = e.clientX - cx;
        const dy = e.clientY - cy;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const maxDist = 120;
        if (dist > maxDist) return { x: 0, y: 0 };
        const factor = (1 - dist / maxDist) * strength;
        return { x: -dx * factor, y: -dy * factor };
      });
      setOffsets(newOffsets);
    },
    [text, strength]
  );

  const handleMouseLeave = useCallback(() => {
    setOffsets(text.split("").map(() => ({ x: 0, y: 0 })));
  }, [text]);

  return (
    <span
      ref={containerRef}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      role="text"
      aria-label={text}
    >
      {text.split("").map((ch, i) => (
        <span
          key={i}
          style={{
            display: "inline-block",
            transform: `translate(${offsets[i]?.x ?? 0}px, ${offsets[i]?.y ?? 0}px)`,
            transition: "transform 0.15s ease-out",
            whiteSpace: ch === " " ? "pre" : undefined,
          }}
        >
          {ch}
        </span>
      ))}
    </span>
  );
}

// ─── Wave Text ───
export function WaveText({
  text,
  className = "",
}: {
  text: string;
  className?: string;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <span
      className={className}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      role="text"
      aria-label={text}
    >
      {text.split("").map((ch, i) => (
        <span
          key={i}
          style={{
            display: "inline-block",
            animationName: hovered ? "wave-bounce" : "none",
            animationDuration: "0.4s",
            animationTimingFunction: "ease",
            animationFillMode: "forwards",
            animationDelay: `${i * 40}ms`,
            whiteSpace: ch === " " ? "pre" : undefined,
          }}
        >
          {ch}
        </span>
      ))}
    </span>
  );
}

// ─── Split Reveal Text ───
export function SplitRevealText({
  text,
  className = "",
}: {
  text: string;
  className?: string;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <span
      className={`relative inline-block ${className}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      role="text"
      aria-label={text}
    >
      {/* Bottom layer — the reveal color */}
      <span className="text-main font-heading font-bold">{text}</span>

      {/* Top halves that split apart */}
      <span
        className="absolute inset-0 flex flex-col overflow-hidden pointer-events-none"
        aria-hidden="true"
      >
        <span
          className="bg-background transition-transform duration-300 ease-out"
          style={{
            transform: hovered ? "translateY(-100%)" : "translateY(0)",
            clipPath: "inset(0 0 50% 0)",
          }}
        >
          <span className="block">{text}</span>
        </span>
        <span
          className="bg-background transition-transform duration-300 ease-out"
          style={{
            transform: hovered ? "translateY(100%)" : "translateY(0)",
            marginTop: "-0.5em",
            clipPath: "inset(50% 0 0 0)",
          }}
        >
          <span className="block">{text}</span>
        </span>
      </span>
    </span>
  );
}
