"use client";

import { useCallback, useEffect, useRef, useState } from "react";
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

const BASE_SPEED = 70; // px/s at resting state
const MAX_SPEED = 520; // px/s at peak acceleration
const ACCELERATION = 260; // px/s^2 when hovered/exploding
const DECELERATION = 280; // px/s^2 when cursor leaves strip
const RESPAWN_MS = 2200; // time before exploded word reconstitutes

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
  shape: "square" | "circle" | "char" | "triangle";
  char?: string;
  hasBorder?: boolean;
};

type Shockwave = {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  alpha: number;
  decay: number;
  color: string;
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
  const trackRef = useRef<HTMLDivElement>(null);
  const trackContainerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [explodedIds, setExplodedIds] = useState<Set<string>>(() => new Set());
  const explodedIdsRef = useRef<Set<string>>(new Set());
  const [rumble, setRumble] = useState(false);

  // Animation values stored in refs for 60/120fps direct RAF performance
  const xRef = useRef(0);
  const speedRef = useRef(BASE_SPEED);
  const isAcceleratingRef = useRef(false);
  const trackWidthRef = useRef(0);
  const pointerPosRef = useRef<{ x: number; y: number } | null>(null);
  const lastHitTestRef = useRef(0);
  const lastTimeRef = useRef(0);
  const animFrameRef = useRef<number | null>(null);

  const particlesRef = useRef<Particle[]>([]);
  const shockwavesRef = useRef<Shockwave[]>([]);

  // Keep ref synchronized with state
  useEffect(() => {
    explodedIdsRef.current = explodedIds;
  }, [explodedIds]);

  const triggerExplosion = useCallback((id: string, wordText: string, targetEl: HTMLElement) => {
    if (explodedIdsRef.current.has(id)) return;

    const container = containerRef.current;
    if (!container) return;

    // Mark as exploded in state & ref
    setExplodedIds((prev) => {
      const next = new Set(prev);
      next.add(id);
      return next;
    });
    explodedIdsRef.current.add(id);

    // Accelerate the entire strip
    isAcceleratingRef.current = true;

    // Subtle tactile rumble effect
    setRumble(true);
    setTimeout(() => setRumble(false), 120);

    // Compute explosion origin relative to canvas/container
    const wordRect = targetEl.getBoundingClientRect();
    const containerRect = container.getBoundingClientRect();
    const ox = wordRect.left + wordRect.width / 2 - containerRect.left;
    const oy = wordRect.top + wordRect.height / 2 - containerRect.top;

    // Spawn expanding shockwaves
    shockwavesRef.current.push({
      x: ox,
      y: oy,
      radius: 4,
      maxRadius: Math.max(55, wordRect.width * 0.75),
      alpha: 1,
      decay: 2.2,
      color: "#000000",
    });

    // Spawn rich neobrutalist debris particles
    const letters = wordText.replace(/[^a-zA-Z0-9]/g, "").split("");
    const spawnCount = 45;
    const currentSpeed = speedRef.current;

    // Limit active particles to prevent frame drops
    if (particlesRef.current.length > 200) {
      particlesRef.current = particlesRef.current.slice(-100);
    }

    for (let i = 0; i < spawnCount; i++) {
      const angle = Math.random() * Math.PI * 2;
      const force = 140 + Math.random() * 340;
      // Inherit lane forward momentum (moving left to right)
      const vx = Math.cos(angle) * force + currentSpeed * 0.45;
      const vy = Math.sin(angle) * force * 0.75;

      const rand = Math.random();
      let shape: Particle["shape"] = "square";
      let char: string | undefined = undefined;

      if (rand < 0.35 && letters.length > 0) {
        shape = "char";
        char = letters[Math.floor(Math.random() * letters.length)];
      } else if (rand < 0.65) {
        shape = "square";
      } else if (rand < 0.85) {
        shape = "triangle";
      } else {
        shape = "circle";
      }

      particlesRef.current.push({
        x: ox + (Math.random() - 0.5) * (wordRect.width * 0.5),
        y: oy + (Math.random() - 0.5) * (wordRect.height * 0.6),
        vx,
        vy,
        size: shape === "char" ? 11 + Math.random() * 4 : 5 + Math.random() * 8,
        color: NEO_COLORS[Math.floor(Math.random() * NEO_COLORS.length)],
        rotation: Math.random() * Math.PI * 2,
        vRot: (Math.random() - 0.5) * 14,
        alpha: 1,
        decay: 0.85 + Math.random() * 0.8,
        shape,
        char,
        hasBorder: Math.random() > 0.3,
      });
    }

    // Schedule word reconstitution/respawn
    setTimeout(() => {
      setExplodedIds((prev) => {
        const next = new Set(prev);
        next.delete(id);
        return next;
      });
      explodedIdsRef.current.delete(id);
    }, RESPAWN_MS);
  }, []);

  const handlePointerEnterWord = useCallback(
    (e: React.PointerEvent<HTMLSpanElement>, word: string, id: string) => {
      triggerExplosion(id, word, e.currentTarget);
    },
    [triggerExplosion]
  );

  const handlePointerMoveContainer = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    pointerPosRef.current = { x: e.clientX, y: e.clientY };
  }, []);

  const handlePointerLeaveContainer = useCallback(() => {
    pointerPosRef.current = null;
    isAcceleratingRef.current = false;
  }, []);

  // Measure single track width via ResizeObserver
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const measure = () => {
      const width = track.offsetWidth;
      if (width > 0) {
        trackWidthRef.current = width;
        if (xRef.current === 0) {
          xRef.current = -width;
        }
      }
    };

    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(track);

    return () => ro.disconnect();
  }, []);

  // Main animation frame loop
  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    const trackContainer = trackContainerRef.current;
    const ctx = canvas?.getContext("2d");

    lastTimeRef.current = performance.now();

    const loop = (now: number) => {
      const delta = Math.min((now - lastTimeRef.current) / 1000, 0.05);
      lastTimeRef.current = now;

      const trackWidth = trackWidthRef.current;

      // 1. Acceleration / Deceleration
      if (isAcceleratingRef.current) {
        speedRef.current = Math.min(MAX_SPEED, speedRef.current + ACCELERATION * delta);
      } else {
        speedRef.current = Math.max(BASE_SPEED, speedRef.current - DECELERATION * delta);
      }

      // 2. Continuous Left-to-Right Translation
      xRef.current += speedRef.current * delta;

      // Wrap-around seamlessly when full track width is traversed
      if (trackWidth > 0 && xRef.current >= 0) {
        xRef.current -= trackWidth;
      }

      if (trackContainer) {
        trackContainer.style.transform = `translate3d(${xRef.current}px, 0, 0)`;
      }

      // 3. Collision hit-test when cursor is stationary in the strip during fast running
      if (isAcceleratingRef.current && pointerPosRef.current && now - lastHitTestRef.current > 50) {
        lastHitTestRef.current = now;
        const p = pointerPosRef.current;
        const el = document.elementFromPoint(p.x, p.y);
        const wordEl = el?.closest("[data-strip-word]") as HTMLElement | null;
        if (wordEl) {
          const id = wordEl.getAttribute("data-strip-word");
          const wordText = wordEl.getAttribute("data-word-text") || "";
          if (id && !explodedIdsRef.current.has(id)) {
            triggerExplosion(id, wordText, wordEl);
          }
        }
      }

      // 4. Particle & Canvas Physics
      if (canvas && ctx && container) {
        const containerRect = container.getBoundingClientRect();
        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        const w = containerRect.width;
        const h = containerRect.height;

        if (canvas.width !== Math.round(w * dpr) || canvas.height !== Math.round(h * dpr)) {
          canvas.width = Math.round(w * dpr);
          canvas.height = Math.round(h * dpr);
          ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        }

        ctx.clearRect(0, 0, w, h);

        // Render & update shockwaves
        for (let i = shockwavesRef.current.length - 1; i >= 0; i--) {
          const sw = shockwavesRef.current[i];
          sw.radius += (sw.maxRadius - sw.radius) * 9 * delta;
          sw.alpha -= sw.decay * delta;

          if (sw.alpha <= 0) {
            shockwavesRef.current.splice(i, 1);
            continue;
          }

          ctx.save();
          ctx.globalAlpha = Math.max(0, sw.alpha);
          ctx.lineWidth = 2.5;
          ctx.strokeStyle = sw.color;
          ctx.beginPath();
          ctx.arc(sw.x, sw.y, sw.radius, 0, Math.PI * 2);
          ctx.stroke();
          ctx.restore();
        }

        // Render & update particles
        for (let i = particlesRef.current.length - 1; i >= 0; i--) {
          const p = particlesRef.current[i];

          // Physics integration
          p.x += p.vx * delta;
          p.y += p.vy * delta;
          p.vy += 320 * delta; // Gravity
          p.vx *= Math.max(0, 1 - 0.5 * delta); // Air drag
          p.rotation += p.vRot * delta;
          p.alpha -= p.decay * delta;

          // Bounce off top and bottom borders of the strip
          if (p.y < 3) {
            p.y = 3;
            p.vy = -p.vy * 0.55;
          } else if (p.y > h - 3) {
            p.y = h - 3;
            p.vy = -p.vy * 0.55;
          }

          if (p.alpha <= 0) {
            particlesRef.current.splice(i, 1);
            continue;
          }

          ctx.save();
          ctx.translate(p.x, p.y);
          ctx.rotate(p.rotation);
          ctx.globalAlpha = Math.max(0, p.alpha);

          if (p.shape === "square") {
            ctx.fillStyle = p.color;
            ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
            if (p.hasBorder) {
              ctx.lineWidth = 1.5;
              ctx.strokeStyle = "#000000";
              ctx.strokeRect(-p.size / 2, -p.size / 2, p.size, p.size);
            }
          } else if (p.shape === "circle") {
            ctx.fillStyle = p.color;
            ctx.beginPath();
            ctx.arc(0, 0, p.size / 2, 0, Math.PI * 2);
            ctx.fill();
            if (p.hasBorder) {
              ctx.lineWidth = 1.5;
              ctx.strokeStyle = "#000000";
              ctx.stroke();
            }
          } else if (p.shape === "triangle") {
            ctx.fillStyle = p.color;
            ctx.beginPath();
            ctx.moveTo(0, -p.size / 2);
            ctx.lineTo(p.size / 2, p.size / 2);
            ctx.lineTo(-p.size / 2, p.size / 2);
            ctx.closePath();
            ctx.fill();
            if (p.hasBorder) {
              ctx.lineWidth = 1.5;
              ctx.strokeStyle = "#000000";
              ctx.stroke();
            }
          } else if (p.shape === "char" && p.char) {
            ctx.font = `900 ${Math.max(10, Math.round(p.size))}px ui-monospace, monospace`;
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.fillStyle = p.color;
            ctx.fillText(p.char, 0, 0);
            ctx.lineWidth = 1;
            ctx.strokeStyle = "#000000";
            ctx.strokeText(p.char, 0, 0);
          }

          ctx.restore();
        }
      }

      animFrameRef.current = requestAnimationFrame(loop);
    };

    animFrameRef.current = requestAnimationFrame(loop);

    return () => {
      if (animFrameRef.current !== null) {
        cancelAnimationFrame(animFrameRef.current);
      }
    };
  }, [triggerExplosion]);

  const renderTrackItems = (setIndex: number, isFirst = false) => (
    <div
      key={`set-${setIndex}`}
      ref={isFirst ? trackRef : undefined}
      aria-hidden={!isFirst}
      className="flex shrink-0 items-center gap-x-8 px-4"
    >
      {WORDS.map((word, wordIndex) => {
        const id = `${setIndex}-${wordIndex}`;
        const isExploded = explodedIds.has(id);

        return (
          <div key={id} className="flex items-center gap-x-8">
            <span
              data-strip-word={id}
              data-word-text={word}
              onPointerEnter={(e) => handlePointerEnterWord(e, word, id)}
              onClick={(e) => triggerExplosion(id, word, e.currentTarget)}
              className={`relative inline-block cursor-pointer select-none rounded-base border-2 px-3 py-1 font-mono text-xs font-bold uppercase tracking-wider transition-all duration-200 md:text-sm ${
                isExploded
                  ? "pointer-events-none scale-0 opacity-0"
                  : "border-transparent text-foreground hover:-translate-y-0.5 hover:border-border hover:bg-secondary-background hover:shadow-[3px_3px_0_var(--border)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none"
              }`}
            >
              {word}
            </span>
            <Asterisk aria-hidden="true" className="size-4 shrink-0 text-link" />
          </div>
        );
      })}
    </div>
  );

  return (
    <div
      ref={containerRef}
      onPointerMove={handlePointerMoveContainer}
      onPointerLeave={handlePointerLeaveContainer}
      aria-label="Interactive AI Skills Strip. Hover over any skill word to explode it and accelerate the strip."
      className={`relative w-full overflow-hidden border-b-2 border-border bg-main py-4 transition-transform duration-75 select-none ${
        rumble ? "translate-y-[1px]" : ""
      }`}
    >
      {/* Absolute particle explosion canvas overlay */}
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-20 h-full w-full"
      />

      {/* Continuously translating left-to-right track container */}
      <div
        ref={trackContainerRef}
        className="flex w-max will-change-transform"
        style={{ transform: "translate3d(0, 0, 0)" }}
      >
        {renderTrackItems(0, true)}
        {renderTrackItems(1)}
        {renderTrackItems(2)}
        {renderTrackItems(3)}
      </div>
    </div>
  );
}
