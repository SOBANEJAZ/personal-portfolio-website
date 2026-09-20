"use client";

import { useEffect, useRef } from "react";

const GRID = 48;
const RADIUS = 190;
const LIFETIME = 1100;
const MAX_DISPLACEMENT = 6;

type Wave = { x: number; y: number; started: number };

export function BackgroundRipple({ contained = false }: { contained?: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !context) return;

    const host = contained ? canvas.parentElement : document.body;
    if (!host) return;

    const media = matchMedia("(any-pointer: fine) and (prefers-reduced-motion: no-preference)");
    let dispose = () => {};

    function configure() {
      dispose();
      if (!media.matches || !canvas || !context || !host) return;

      const surface = canvas;
      const ctx = context;
      const container = host;
      let frame = 0;
      let width = 0;
      let height = 0;
      let lastMove = -Infinity;
      let lastWave = -Infinity;
      let pointerX = 0;
      let pointerY = 0;
      let waves: Wave[] = [];
      let gridColor = "";

      function schedule() {
        if (!frame && !document.hidden) frame = requestAnimationFrame(draw);
      }

      function resize() {
        const rect = surface.getBoundingClientRect();
        width = rect.width;
        height = rect.height;
        const ratio = Math.min(devicePixelRatio || 1, 2);
        surface.width = Math.round(width * ratio);
        surface.height = Math.round(height * ratio);
        ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
        gridColor = getComputedStyle(container).getPropertyValue("--grid-color").trim();
        schedule();
      }

      function draw(now: number) {
        frame = 0;
        ctx.clearRect(0, 0, width, height);
        const rect = contained ? surface.getBoundingClientRect() : null;
        const offsetX = rect ? rect.left + scrollX : scrollX;
        const offsetY = rect ? rect.top + scrollY : scrollY;
        const cursorX = pointerX - offsetX;
        const cursorY = pointerY - offsetY;
        const strength = Math.max(0, 1 - (now - lastMove) / LIFETIME);
        waves = waves.filter((wave) => now - wave.started < LIFETIME);

        // Draw only the visible part of tall sections.
        const top = rect ? Math.max(0, -rect.top) : 0;
        const bottom = rect ? Math.min(height, innerHeight - rect.top) : height;
        if (bottom <= top) return;

        if (strength > 0) {
          const glow = ctx.createRadialGradient(cursorX, cursorY, 0, cursorX, cursorY, RADIUS);
          glow.addColorStop(0, `rgba(255,255,255,${0.15 * strength})`);
          glow.addColorStop(0.5, `rgba(255,255,255,${0.065 * strength})`);
          glow.addColorStop(1, "rgba(255,255,255,0)");
          ctx.fillStyle = glow;
          ctx.fillRect(0, top, width, bottom - top);
        }

        const localWaves = waves.map((wave) => ({
          x: wave.x - offsetX,
          y: wave.y - offsetY,
          progress: (now - wave.started) / LIFETIME,
        }));

        function point(x: number, y: number) {
          let shiftX = 0;
          let shiftY = 0;
          for (const wave of localWaves) {
            const dx = x - wave.x;
            const dy = y - wave.y;
            const distance = Math.hypot(dx, dy);
            if (distance < 1 || distance > RADIUS) continue;
            const crest = distance - wave.progress * RADIUS;
            const envelope = Math.exp(-((crest / 42) ** 2));
            const edge = (1 - distance / RADIUS) ** 2;
            const displacement = Math.sin(crest / 13) * envelope * edge * (1 - wave.progress) * MAX_DISPLACEMENT;
            shiftX += (dx / distance) * displacement;
            shiftY += (dy / distance) * displacement;
          }
          ctx.lineTo(x + shiftX, y + shiftY);
        }

        ctx.strokeStyle = gridColor;
        ctx.lineWidth = 1;
        ctx.setLineDash([5, 5]);

        const gridTop = contained ? Math.floor(top / GRID) * GRID : -(scrollY % GRID);
        const gridLeft = contained ? 0 : -(scrollX % GRID);

        ctx.lineDashOffset = -(scrollY % 10);
        ctx.beginPath();
        for (let x = gridLeft; x <= width; x += GRID) {
          ctx.moveTo(x + 0.5, top);
          if (localWaves.length) {
            for (let y = top; y < bottom; y += 8) point(x + 0.5, y);
          }
          ctx.lineTo(x + 0.5, bottom);
        }
        ctx.stroke();

        ctx.lineDashOffset = -(scrollX % 10);
        ctx.beginPath();
        for (let y = gridTop; y <= bottom; y += GRID) {
          ctx.moveTo(0, y + 0.5);
          if (localWaves.length) {
            for (let x = 0; x < width; x += 8) point(x, y + 0.5);
          }
          ctx.lineTo(width, y + 0.5);
        }
        ctx.stroke();
        if (strength > 0 || waves.length) schedule();
      }

      function move(event: PointerEvent) {
        if (event.pointerType === "touch") return;
        const now = performance.now();
        pointerX = event.clientX + scrollX;
        pointerY = event.clientY + scrollY;
        lastMove = now;
        if (now - lastWave > 85) {
          waves.push({ x: pointerX, y: pointerY, started: now });
          waves = waves.slice(-5);
          lastWave = now;
        }
        schedule();
      }

      function reset() {
        waves = [];
        lastMove = -Infinity;
        cancelAnimationFrame(frame);
        frame = 0;
        ctx.clearRect(0, 0, width, height);
        schedule();
      }

      const observer = new ResizeObserver(resize);
      observer.observe(surface);
      const themeObserver = new MutationObserver(resize);
      themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
      resize();
      container.classList.add("ripple-grid-active");
      window.addEventListener("pointermove", move, { passive: true });
      window.addEventListener("scroll", schedule, { passive: true });
      window.addEventListener("resize", resize, { passive: true });
      window.addEventListener("blur", reset);
      document.documentElement.addEventListener("pointerleave", reset);
      document.addEventListener("visibilitychange", reset);

      dispose = () => {
        cancelAnimationFrame(frame);
        observer.disconnect();
        themeObserver.disconnect();
        window.removeEventListener("pointermove", move);
        window.removeEventListener("scroll", schedule);
        window.removeEventListener("resize", resize);
        window.removeEventListener("blur", reset);
        document.documentElement.removeEventListener("pointerleave", reset);
        document.removeEventListener("visibilitychange", reset);
        container.classList.remove("ripple-grid-active");
        ctx.clearRect(0, 0, width, height);
      };
    }

    configure();
    media.addEventListener("change", configure);
    return () => {
      dispose();
      media.removeEventListener("change", configure);
    };
  }, [contained]);

  return <canvas ref={canvasRef} aria-hidden="true" className={`background-ripple${contained ? " background-ripple-contained" : ""}`} />;
}
