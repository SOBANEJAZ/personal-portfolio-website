"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { penguinSprite, techObstacles } from "@/components/runner-sprites";

const GAME_WIDTH = 960;
const RUNNER_LEFT = 76;
const RUNNER_WIDTH = 36;
const RUNNER_HITBOX_LEFT = 6;
const RUNNER_HITBOX_WIDTH = RUNNER_WIDTH - RUNNER_HITBOX_LEFT * 2;
const OBSTACLE_HITBOX_INSET = 4;
const OBSTACLE_HITBOX_HEIGHT_INSET = 7;
const JUMP_VELOCITY = 710;
const SPEED = 320;

type GameStatus = "idle" | "running" | "game-over";

export function FooterRunner() {
  const [status, setStatus] = useState<GameStatus>("idle");
  const [obstacleIndex, setObstacleIndex] = useState(0);

  const arenaRef = useRef<HTMLDivElement>(null);
  const runnerRef = useRef<HTMLDivElement>(null);
  const obstacleRef = useRef<HTMLDivElement>(null);

  const arenaWidthRef = useRef(GAME_WIDTH);
  const frameRef = useRef<number | null>(null);
  const isVisibleRef = useRef(true);

  // Mutable game state held in ref for zero-re-render 60fps loop
  const stateRef = useRef({
    status: "idle" as GameStatus,
    runnerY: 0,
    velocity: 0,
    obstacleX: GAME_WIDTH * 0.72,
    obstacleIndex: 0,
    obstacleWidth: techObstacles[0].width,
    obstacleHeight: techObstacles[0].height,
    lastFrame: 0,
  });

  const stopGame = useCallback(() => {
    if (frameRef.current !== null) {
      cancelAnimationFrame(frameRef.current);
      frameRef.current = null;
    }
  }, []);

  const tick = useCallback((now: number) => {
    const state = stateRef.current;
    if (state.status !== "running") return;

    // Delta capped to 33ms to prevent tunneling / physics blowout on lag spikes
    const delta = Math.min((now - state.lastFrame) / 1000, 0.033);
    state.lastFrame = now;

    // Physics
    const nextVelocity = state.velocity - 2050 * delta;
    const nextRunnerY = Math.max(0, state.runnerY + state.velocity * delta);
    state.velocity = nextRunnerY === 0 ? 0 : nextVelocity;
    state.runnerY = nextRunnerY;
    state.obstacleX -= SPEED * delta;

    // Direct GPU translate3d updates: bypasses React rendering & browser reflow/layout
    if (runnerRef.current) {
      runnerRef.current.style.transform = `translate3d(0, ${-nextRunnerY}px, 0)`;
    }
    if (obstacleRef.current) {
      obstacleRef.current.style.transform = `translate3d(${state.obstacleX}px, 0, 0)`;
    }

    // Recycle obstacle when past left edge
    if (state.obstacleX + state.obstacleWidth < 0) {
      const nextIndex =
        (state.obstacleIndex + 1 + Math.floor(Math.random() * (techObstacles.length - 1))) %
        techObstacles.length;
      const nextObs = techObstacles[nextIndex];
      state.obstacleIndex = nextIndex;
      state.obstacleWidth = nextObs.width;
      state.obstacleHeight = nextObs.height;
      state.obstacleX = arenaWidthRef.current + 40 + Math.random() * 160;

      if (obstacleRef.current) {
        obstacleRef.current.style.width = `${nextObs.width}px`;
        obstacleRef.current.style.height = `${nextObs.height}px`;
      }
      setObstacleIndex(nextIndex);
    }

    // AABB Collision Detection
    const obstacleLeft = state.obstacleX + OBSTACLE_HITBOX_INSET;
    const obstacleRight = state.obstacleX + state.obstacleWidth - OBSTACLE_HITBOX_INSET;
    const runnerLeft = RUNNER_LEFT + RUNNER_HITBOX_LEFT;
    const runnerRight = runnerLeft + RUNNER_HITBOX_WIDTH;
    const overlapsRunner = obstacleLeft < runnerRight && obstacleRight > runnerLeft;
    const hitObstacle =
      overlapsRunner && state.runnerY < state.obstacleHeight - OBSTACLE_HITBOX_HEIGHT_INSET;

    if (hitObstacle) {
      state.status = "game-over";
      setStatus("game-over");
      frameRef.current = null;
      return;
    }

    frameRef.current = requestAnimationFrame(tick);
  }, []);

  const startGame = useCallback(
    (jumpImmediately = false) => {
      stopGame();
      const state = stateRef.current;
      const initialObstacle = techObstacles[state.obstacleIndex];

      state.status = "running";
      state.runnerY = 0;
      state.velocity = jumpImmediately ? JUMP_VELOCITY : 0;
      state.obstacleX = Math.min(arenaWidthRef.current + 40, 750);
      state.obstacleWidth = initialObstacle.width;
      state.obstacleHeight = initialObstacle.height;
      state.lastFrame = performance.now();

      if (runnerRef.current) {
        runnerRef.current.style.transform = "translate3d(0, 0, 0)";
      }
      if (obstacleRef.current) {
        obstacleRef.current.style.width = `${initialObstacle.width}px`;
        obstacleRef.current.style.height = `${initialObstacle.height}px`;
        obstacleRef.current.style.transform = `translate3d(${state.obstacleX}px, 0, 0)`;
      }

      setStatus("running");
      frameRef.current = requestAnimationFrame(tick);
    },
    [stopGame, tick]
  );

  const jump = useCallback(() => {
    const state = stateRef.current;
    if (state.status !== "running") {
      startGame(true);
      return;
    }
    if (state.runnerY <= 1) {
      state.velocity = JUMP_VELOCITY;
    }
  }, [startGame]);

  // Arena measurement and resize observation
  useEffect(() => {
    const arena = arenaRef.current;
    if (!arena) return;

    const measureArena = () => {
      arenaWidthRef.current = arena.clientWidth || GAME_WIDTH;
      if (stateRef.current.status === "idle" && obstacleRef.current) {
        stateRef.current.obstacleX = arenaWidthRef.current * 0.72;
        obstacleRef.current.style.transform = `translate3d(${stateRef.current.obstacleX}px, 0, 0)`;
      }
    };
    measureArena();

    const resizeObserver = new ResizeObserver(measureArena);
    resizeObserver.observe(arena);

    return () => resizeObserver.disconnect();
  }, []);

  // IntersectionObserver: auto-pause loop when scrolled off screen
  useEffect(() => {
    const arena = arenaRef.current;
    if (!arena) return;

    const intersectionObserver = new IntersectionObserver(
      ([entry]) => {
        isVisibleRef.current = entry.isIntersecting;
        if (!entry.isIntersecting) {
          if (frameRef.current) {
            cancelAnimationFrame(frameRef.current);
            frameRef.current = null;
          }
        } else if (stateRef.current.status === "running" && !frameRef.current) {
          stateRef.current.lastFrame = performance.now();
          frameRef.current = requestAnimationFrame(tick);
        }
      },
      { threshold: 0.05 }
    );

    intersectionObserver.observe(arena);
    return () => intersectionObserver.disconnect();
  }, [tick]);

  // Document visibility / tab blur handling to prevent background CPU drain
  useEffect(() => {
    const handleVisibility = () => {
      if (document.hidden) {
        if (frameRef.current) {
          cancelAnimationFrame(frameRef.current);
          frameRef.current = null;
        }
      } else if (stateRef.current.status === "running" && isVisibleRef.current && !frameRef.current) {
        stateRef.current.lastFrame = performance.now();
        frameRef.current = requestAnimationFrame(tick);
      }
    };

    document.addEventListener("visibilitychange", handleVisibility);
    window.addEventListener("blur", handleVisibility);
    window.addEventListener("focus", handleVisibility);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibility);
      window.removeEventListener("blur", handleVisibility);
      window.removeEventListener("focus", handleVisibility);
      stopGame();
    };
  }, [stopGame, tick]);

  const currentObstacle = techObstacles[obstacleIndex];
  const statusText =
    status === "running"
      ? "RUNNING"
      : status === "game-over"
        ? "SYSTEM HALTED — TAP TO RESTART"
        : "TAP, CLICK, OR PRESS SPACE TO START";

  return (
    <div className="bg-transparent text-foreground">
      <div className="mx-auto max-w-container px-4 pt-2 pb-8 md:px-6 md:pt-3 md:pb-10">
        <div
          aria-label="Footer runner game. Jump with Tux, the Linux penguin, over programming and framework symbols. Press Space or the up arrow to jump."
          className="relative h-[190px] cursor-pointer overflow-hidden outline-none sm:h-[220px]"
          onKeyDown={(event) => {
            if (event.key === " " || event.key === "ArrowUp") {
              event.preventDefault();
              jump();
            }
            if (event.key.toLowerCase() === "r") {
              event.preventDefault();
              startGame();
            }
          }}
          onPointerDown={(event) => {
            event.currentTarget.focus();
            jump();
          }}
          role="application"
          ref={arenaRef}
          tabIndex={0}
        >
          {/* Dashed ground line */}
          <div
            aria-hidden="true"
            className="absolute left-0 right-0 bottom-[28px] border-t-2 border-dashed border-link"
          />

          {/* Tux runner with GPU translate3d */}
          <div
            ref={runnerRef}
            aria-hidden="true"
            className="absolute bottom-[28px] h-11 w-[36px] transition-none"
            style={{
              left: `${RUNNER_LEFT}px`,
              willChange: "transform",
              transform: "translate3d(0, 0, 0)",
            }}
          >
            {penguinSprite}
          </div>

          {/* Obstacle with GPU translate3d */}
          <div
            ref={obstacleRef}
            aria-hidden="true"
            className="absolute bottom-[28px] transition-none"
            title={currentObstacle.name}
            style={{
              left: 0,
              width: `${currentObstacle.width}px`,
              height: `${currentObstacle.height}px`,
              willChange: "transform",
              transform: `translate3d(${GAME_WIDTH * 0.72}px, 0, 0)`,
            }}
          >
            {currentObstacle.sprite}
          </div>

          {/* Instructions under dashed line */}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-7 flex items-center justify-center text-center font-mono text-[10px] font-bold tracking-[0.14em] text-foreground/60 sm:text-xs">
            {statusText}
          </div>
        </div>
      </div>
    </div>
  );
}
