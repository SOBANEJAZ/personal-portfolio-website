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
const PARTICLE_COUNT = 24; // Lightweight count: snappy and zero-lag even on slow phones
const MIN_FORCE = 380;
const MAX_FORCE = 850;

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
];

export function HeroStrip() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Stored in refs to avoid React re-renders
  const particlesRef = useRef<Particle[]>([]);
  const shockwavesRef = useRef<Shockwave[]>([]);
  const animFrameRef = useRef<number | null>(null);
  const lastTimeRef = useRef(0);
  const canvasSizeRef = useRef({ w: 0, h: 0 });

  const tickRef = useRef<((now: number) => void) | null>(null);

  // Animation frame loop — ONLY runs while particles are alive
  useEffect(() => {
    tickRef.current = (now: number) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const delta = Math.min((now - (lastTimeRef.current || now)) / 1000, 0.04);
      lastTimeRef.current = now;

      const { w, h } = canvasSizeRef.current;
      if (w === 0 || h === 0) return;

      ctx.clearRect(0, 0, w, h);

      const particles = particlesRef.current;
      const shockwaves = shockwavesRef.current;

      // 1. Update & draw shockwaves
      for (let i = shockwaves.length - 1; i >= 0; i--) {
        const sw = shockwaves[i];
        sw.radius += (sw.maxRadius - sw.radius) * 16 * delta;
        sw.alpha -= sw.decay * delta;

        if (sw.alpha <= 0) {
          shockwaves.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.globalAlpha = Math.max(0, sw.alpha);
        ctx.lineWidth = 2;
        ctx.strokeStyle = "#000000";
        ctx.beginPath();
        ctx.arc(sw.x, sw.y, sw.radius, 0, Math.PI * 2);
        ctx.stroke();
        ctx.restore();
      }

      // 2. Update & draw lightweight geometric particles
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];

        p.x += p.vx * delta;
        p.y += p.vy * delta;
        p.vy += 380 * delta; // Gravity
        p.rotation += p.vRot * delta;
        p.alpha -= p.decay * delta;

        // Bounce off container borders
        if (p.y < 2) {
          p.y = 2;
          p.vy = -p.vy * 0.55;
        } else if (p.y > h - 2) {
          p.y = h - 2;
          p.vy = -p.vy * 0.55;
        }

        if (p.alpha <= 0) {
          particles.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);
        ctx.globalAlpha = Math.max(0, p.alpha);
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
        ctx.lineWidth = 1;
        ctx.strokeStyle = "#000000";
        ctx.strokeRect(-p.size / 2, -p.size / 2, p.size, p.size);
        ctx.restore();
      }

      // Stop RAF immediately if no particles or shockwaves remain (0% idle CPU)
      if (particles.length === 0 && shockwaves.length === 0) {
        ctx.clearRect(0, 0, w, h);
        animFrameRef.current = null;
        return;
      }

      animFrameRef.current = requestAnimationFrame((t) => tickRef.current?.(t));
    };
  }, []);

  const ensureAnimationRunning = useCallback(() => {
    if (animFrameRef.current === null && tickRef.current) {
      lastTimeRef.current = performance.now();
      animFrameRef.current = requestAnimationFrame((t) => tickRef.current?.(t));
    }
  }, []);

  const triggerExplosion = useCallback(
    (targetEl: HTMLElement) => {
      // Prevent re-triggering while already exploded
      if (targetEl.dataset.exploded === "true") return;
      targetEl.dataset.exploded = "true";

      const container = containerRef.current;
      if (!container) return;

      // Calculate position relative to container once
      const wordRect = targetEl.getBoundingClientRect();
      const containerRect = container.getBoundingClientRect();
      const ox = wordRect.left + wordRect.width / 2 - containerRect.left;
      const oy = wordRect.top + wordRect.height / 2 - containerRect.top;

      // Direct DOM manipulation — ZERO React re-renders
      targetEl.style.transition = "transform 0.08s ease-out, opacity 0.08s ease-out";
      targetEl.style.transform = "scale(0)";
      targetEl.style.opacity = "0";
      targetEl.style.pointerEvents = "none";

      // Spawn shockwave
      shockwavesRef.current.push({
        x: ox,
        y: oy,
        radius: 4,
        maxRadius: Math.max(50, wordRect.width * 0.7),
        alpha: 1,
        decay: 3.2,
      });

      // Spawn lightweight particles
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        const angle = Math.random() * Math.PI * 2;
        const force = MIN_FORCE + Math.random() * (MAX_FORCE - MIN_FORCE);
        const vx = Math.cos(angle) * force + 40; // slight forward drift
        const vy = Math.sin(angle) * force * 0.85;

        particlesRef.current.push({
          x: ox + (Math.random() - 0.5) * (wordRect.width * 0.4),
          y: oy + (Math.random() - 0.5) * (wordRect.height * 0.4),
          vx,
          vy,
          size: 5 + Math.random() * 6,
          color: NEO_COLORS[Math.floor(Math.random() * NEO_COLORS.length)],
          rotation: Math.random() * Math.PI * 2,
          vRot: (Math.random() - 0.5) * 20,
          alpha: 1,
          decay: 1.2 + Math.random() * 0.8,
        });
      }

      // Wake up canvas animation
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

  // ResizeObserver to track container & canvas dimensions cleanly without layout thrashing
  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const resize = () => {
      const rect = container.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvasSizeRef.current = { w: rect.width, h: rect.height };
      canvas.width = Math.round(rect.width * dpr);
      canvas.height = Math.round(rect.height * dpr);
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      }
    };

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(container);

    return () => {
      ro.disconnect();
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
            onPointerEnter={(e) => triggerExplosion(e.currentTarget)}
            onClick={(e) => triggerExplosion(e.currentTarget)}
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
      {/* Absolute particle explosion canvas overlay (0% CPU at idle) */}
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-20 h-full w-full"
      />

      {/* Hardware-accelerated GPU compositor infinite marquee (zero JS execution during scroll) */}
      <div className="flex w-max animate-hero-strip will-change-transform motion-reduce:animate-none">
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
