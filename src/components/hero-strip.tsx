"use client";

import { useCallback, useEffect, useRef } from "react";
import { Asterisk } from "lucide-react";

const WORDS = [
  "Autonomous Agents",
  "RAG Systems",
  "LLM Orchestration",
  "Multi-Agent Workflows",
  "LangGraph & CrewAI",
  "Production-Minded",
  "FastMCP & Custom Tools",
  "Vector Search & Embeddings",
  "Real-Time Voice AI",
  "Prompt Optimization",
  "Full-Stack AI Apps",
  "Self-Healing Pipelines",
  "Fine-Tuning & Evaluation",
  "LlamaIndex & LangChain",
];

const RESPAWN_MS = 2000;
const PARTICLE_COUNT = 38; // Rich, prominent explosion debris count

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  rotation: number;
  vRot: number;
  alpha: number;
  decay: number;
  char?: string;
};

type Shockwave = {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  alpha: number;
  decay: number;
};

const NEO_COLORS = [
  "#000000",
  "#ffffff",
  "#fff4e0",
  "#f7e6c6",
  "#facc15",
  "#ef4444",
  "#fd9745",
  "#9a360b",
];

export function HeroStrip() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);

  const particlesRef = useRef<Particle[]>([]);
  const shockwavesRef = useRef<Shockwave[]>([]);
  const animFrameRef = useRef<number | null>(null);
  const lastTimeRef = useRef(0);
  const lastMarqueeLeftRef = useRef<number | null>(null);
  const tickRef = useRef<((now: number) => void) | null>(null);

  // Animation frame loop — ONLY runs while particles or shockwaves are alive (0% idle CPU)
  useEffect(() => {
    tickRef.current = (now: number) => {
      const container = containerRef.current;
      const canvas = canvasRef.current;
      const marquee = marqueeRef.current;
      if (!container || !canvas) {
        animFrameRef.current = null;
        return;
      }

      const ctx = canvas.getContext("2d");
      if (!ctx) {
        animFrameRef.current = null;
        return;
      }

      const w = container.clientWidth;
      const h = container.clientHeight;
      if (w === 0 || h === 0) {
        animFrameRef.current = null;
        return;
      }

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      if (canvas.width !== Math.round(w * dpr) || canvas.height !== Math.round(h * dpr)) {
        canvas.width = Math.round(w * dpr);
        canvas.height = Math.round(h * dpr);
      }

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);

      const delta = Math.min((now - (lastTimeRef.current || now)) / 1000, 0.04);
      lastTimeRef.current = now;

      // Calculate strip conveyor movement delta (pixels moved this frame)
      let stripDx = 0;
      if (marquee) {
        const curLeft = marquee.getBoundingClientRect().left;
        if (lastMarqueeLeftRef.current !== null) {
          const rawDx = curLeft - lastMarqueeLeftRef.current;
          // Normal conveyor movement is negative (moving left). Ignore wrap-around jump (> 300px)
          if (Math.abs(rawDx) < 300) {
            stripDx = rawDx;
          }
        }
        lastMarqueeLeftRef.current = curLeft;
      }
      // Fallback if measurement hasn't established yet (~45px/s at 75s animation)
      if (stripDx === 0 && delta > 0) {
        stripDx = -45 * delta;
      }

      const particles = particlesRef.current;
      const shockwaves = shockwavesRef.current;

      // 1. Update & draw shockwave rings (moving along with strip)
      for (let i = shockwaves.length - 1; i >= 0; i--) {
        const sw = shockwaves[i];
        sw.x += stripDx;
        sw.radius += 150 * delta;
        sw.alpha -= sw.decay * delta;

        if (sw.alpha <= 0 || sw.radius >= sw.maxRadius) {
          shockwaves.splice(i, 1);
          continue;
        }

        const safeRadius = Math.max(0.1, sw.radius);
        ctx.save();
        ctx.globalAlpha = Math.max(0, Math.min(1, sw.alpha));
        ctx.lineWidth = 2.5;
        ctx.strokeStyle = "#000000";
        ctx.beginPath();
        ctx.arc(sw.x, sw.y, safeRadius, 0, Math.PI * 2);
        ctx.stroke();
        ctx.restore();
      }

      // 2. Update & draw explosion debris particles (moving along with strip + scattering)
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];

        p.x += p.vx * delta + stripDx; // Scramble/scatter velocity + strip conveyor motion
        p.y += p.vy * delta;
        p.vy += 320 * delta; // Gravity
        p.vx *= Math.max(0, 1 - 0.4 * delta); // Air drag
        p.rotation += p.vRot * delta;
        p.alpha -= p.decay * delta;

        // Bounce off container borders
        if (p.y < 3) {
          p.y = 3;
          p.vy = -p.vy * 0.55;
        } else if (p.y > h - 3) {
          p.y = h - 3;
          p.vy = -p.vy * 0.55;
        }

        if (p.alpha <= 0) {
          particles.splice(i, 1);
          continue;
        }

        const safeAlpha = Math.max(0, Math.min(1, p.alpha));
        const safeSize = Math.max(2, p.size);

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);
        ctx.globalAlpha = safeAlpha;

        if (p.char) {
          const fontSize = Math.max(8, Math.round(safeSize));
          ctx.font = `900 ${fontSize}px ui-monospace, monospace`;
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          ctx.fillStyle = p.color;
          ctx.fillText(p.char, 0, 0);
          ctx.lineWidth = 1;
          ctx.strokeStyle = "#000000";
          ctx.strokeText(p.char, 0, 0);
        } else {
          ctx.fillStyle = p.color;
          ctx.fillRect(-safeSize / 2, -safeSize / 2, safeSize, safeSize);
          ctx.lineWidth = 1.5;
          ctx.strokeStyle = "#000000";
          ctx.strokeRect(-safeSize / 2, -safeSize / 2, safeSize, safeSize);
        }

        ctx.restore();
      }

      // Stop RAF immediately if no particles or shockwaves remain (0% CPU at idle, clean strip)
      if (particles.length === 0 && shockwaves.length === 0) {
        ctx.clearRect(0, 0, w, h);
        animFrameRef.current = null;
        lastMarqueeLeftRef.current = null;
        return;
      }

      animFrameRef.current = requestAnimationFrame((t) => tickRef.current?.(t));
    };
  }, []);

  const ensureAnimationRunning = useCallback(() => {
    if (animFrameRef.current === null && tickRef.current) {
      lastTimeRef.current = performance.now();
      if (marqueeRef.current) {
        lastMarqueeLeftRef.current = marqueeRef.current.getBoundingClientRect().left;
      }
      animFrameRef.current = requestAnimationFrame((t) => tickRef.current?.(t));
    }
  }, []);

  const triggerExplosion = useCallback(
    (targetEl: HTMLElement, wordText: string) => {
      // Prevent re-triggering while already exploded
      if (targetEl.dataset.exploded === "true") return;
      targetEl.dataset.exploded = "true";

      const container = containerRef.current;
      if (!container) return;

      // Calculate position relative to container
      const wordRect = targetEl.getBoundingClientRect();
      const containerRect = container.getBoundingClientRect();
      const ox = wordRect.left + wordRect.width / 2 - containerRect.left;
      const oy = wordRect.top + wordRect.height / 2 - containerRect.top;

      // Direct DOM manipulation — instant vanish
      targetEl.style.transition = "transform 0.06s ease-out, opacity 0.06s ease-out";
      targetEl.style.transform = "scale(0)";
      targetEl.style.opacity = "0";
      targetEl.style.pointerEvents = "none";

      // Spawn shockwave rings
      shockwavesRef.current.push(
        {
          x: ox,
          y: oy,
          radius: 4,
          maxRadius: Math.max(55, wordRect.width * 0.7),
          alpha: 1,
          decay: 2.2,
        },
        {
          x: ox,
          y: oy,
          radius: 2,
          maxRadius: Math.max(40, wordRect.width * 0.5),
          alpha: 0.8,
          decay: 2.8,
        }
      );

      // Spawn particles: letters from the word + neobrutalist confetti debris
      const letters = wordText.replace(/[^a-zA-Z0-9]/g, "").split("");
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = 160 + Math.random() * 260;
        const vx = Math.cos(angle) * speed;
        const vy = Math.sin(angle) * speed * 0.8;

        const isChar = Math.random() < 0.35 && letters.length > 0;
        const char = isChar ? letters[Math.floor(Math.random() * letters.length)] : undefined;

        particlesRef.current.push({
          x: ox + (Math.random() - 0.5) * (wordRect.width * 0.5),
          y: oy + (Math.random() - 0.5) * (wordRect.height * 0.5),
          vx,
          vy,
          size: isChar ? 13 + Math.random() * 4 : 7 + Math.random() * 7,
          color: NEO_COLORS[Math.floor(Math.random() * NEO_COLORS.length)],
          rotation: Math.random() * Math.PI * 2,
          vRot: (Math.random() - 0.5) * 16,
          alpha: 1,
          decay: 0.85 + Math.random() * 0.5,
          char,
        });
      }

      // Wake up canvas animation loop
      ensureAnimationRunning();

      // Schedule reconstitution after RESPAWN_MS
      setTimeout(() => {
        targetEl.style.transition =
          "transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.25s ease-out";
        targetEl.style.transform = "scale(1)";
        targetEl.style.opacity = "1";
        targetEl.style.pointerEvents = "auto";
        targetEl.dataset.exploded = "false";
      }, RESPAWN_MS);
    },
    [ensureAnimationRunning]
  );

  useEffect(() => {
    return () => {
      if (animFrameRef.current !== null) {
        cancelAnimationFrame(animFrameRef.current);
        animFrameRef.current = null;
      }
    };
  }, []);

  const renderWordGroup = (groupIndex: number) => (
    <div key={`group-${groupIndex}`} className="flex shrink-0 items-center gap-x-8 px-4">
      {WORDS.map((word, wordIndex) => (
        <div key={`${groupIndex}-${wordIndex}`} className="flex items-center gap-x-8">
          <span
            onPointerEnter={(e) => triggerExplosion(e.currentTarget, word)}
            onClick={(e) => triggerExplosion(e.currentTarget, word)}
            className="relative inline-block cursor-pointer select-none rounded-base border-2 border-transparent px-3 py-1 font-mono text-xs font-bold uppercase tracking-wider text-foreground transition-all duration-300 hover:-translate-y-0.5 hover:border-border hover:bg-secondary-background hover:shadow-[3px_3px_0_var(--border)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none md:text-sm"
          >
            {word}
          </span>
          <Asterisk aria-hidden="true" className="size-4 shrink-0 text-link" />
        </div>
      ))}
    </div>
  );

  return (
    <div
      ref={containerRef}
      aria-label="Interactive AI Skills Strip. Hover over any skill word to explode it."
      className="relative w-full overflow-hidden border-b-2 border-border bg-main py-4 select-none"
    >
      {/* Absolute particle explosion canvas overlay (0% CPU at idle, only active when exploded) */}
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-30 h-full w-full"
      />

      {/* Hardware-accelerated GPU compositor infinite marquee */}
      <div ref={marqueeRef} className="flex w-max animate-hero-strip will-change-transform">
        {/* First Half */}
        <div className="flex shrink-0">
          {renderWordGroup(0)}
          {renderWordGroup(1)}
        </div>
        {/* Second Half (duplicate for seamless infinite loop) */}
        <div aria-hidden="true" className="flex shrink-0">
          {renderWordGroup(2)}
          {renderWordGroup(3)}
        </div>
      </div>
    </div>
  );
}
