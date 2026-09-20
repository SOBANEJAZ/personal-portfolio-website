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
const STORAGE_KEY = "soban-tech-runner-high-score";

type GameStatus = "idle" | "running" | "game-over";

type Game = {
  obstacleIndex: number;
  obstacleHeight: number;
  obstacleWidth: number;
  obstacleX: number;
  runnerY: number;
  score: number;
  status: GameStatus;
};

const initialGame: Game = {
  obstacleIndex: 0,
  obstacleHeight: techObstacles[0].height,
  obstacleWidth: techObstacles[0].width,
  obstacleX: GAME_WIDTH,
  runnerY: 0,
  score: 0,
  status: "idle",
};

function nextObstacle(score: number, arenaWidth: number, previousIndex: number) {
  const obstacleIndex = (previousIndex + 1 + Math.floor(Math.random() * (techObstacles.length - 1))) % techObstacles.length;
  const obstacle = techObstacles[obstacleIndex];
  return {
    obstacleIndex,
    obstacleHeight: obstacle.height,
    obstacleWidth: obstacle.width,
    obstacleX: arenaWidth + 280 + Math.random() * 300 + Math.min(score * 2, 160),
  };
}

export function FooterRunner() {
  const [game, setGame] = useState<Game>(initialGame);
  const [highScore, setHighScore] = useState(0);
  const gameRef = useRef<Game>(initialGame);
  const frameRef = useRef<number | null>(null);
  const lastFrameRef = useRef(0);
  const velocityRef = useRef(0);
  const arenaRef = useRef<HTMLDivElement>(null);
  const arenaWidthRef = useRef(GAME_WIDTH);

  const updateGame = useCallback((next: Game) => {
    gameRef.current = next;
    setGame(next);
  }, []);

  const stopGame = useCallback(() => {
    if (frameRef.current !== null) {
      cancelAnimationFrame(frameRef.current);
      frameRef.current = null;
    }
  }, []);

  const startGame = useCallback((jumpImmediately = false) => {
    stopGame();
    velocityRef.current = jumpImmediately ? JUMP_VELOCITY : 0;
    lastFrameRef.current = performance.now();
    const freshGame = { ...initialGame, ...nextObstacle(0, arenaWidthRef.current, gameRef.current.obstacleIndex), status: "running" as const };
    updateGame(freshGame);

    const tick = (now: number) => {
      const delta = Math.min((now - lastFrameRef.current) / 1000, 0.04);
      lastFrameRef.current = now;
      const current = gameRef.current;
      const speed = 260 + Math.min(current.score * 4, 180);
      const nextVelocity = velocityRef.current - 2050 * delta;
      const nextRunnerY = Math.max(0, current.runnerY + velocityRef.current * delta);
      velocityRef.current = nextRunnerY === 0 ? 0 : nextVelocity;

      let next = {
        ...current,
        runnerY: nextRunnerY,
        obstacleX: current.obstacleX - speed * delta,
        score: current.score + delta * 10,
      };

      if (next.obstacleX + next.obstacleWidth < 0) {
        next = { ...next, ...nextObstacle(next.score, arenaWidthRef.current, next.obstacleIndex) };
      }

      const obstacleLeft = next.obstacleX + OBSTACLE_HITBOX_INSET;
      const obstacleRight = next.obstacleX + next.obstacleWidth - OBSTACLE_HITBOX_INSET;
      const runnerLeft = RUNNER_LEFT + RUNNER_HITBOX_LEFT;
      const runnerRight = runnerLeft + RUNNER_HITBOX_WIDTH;
      const overlapsRunner = obstacleLeft < runnerRight && obstacleRight > runnerLeft;
      const hitObstacle =
        overlapsRunner && next.runnerY < next.obstacleHeight - OBSTACLE_HITBOX_HEIGHT_INSET;

      if (hitObstacle) {
        const finalScore = Math.floor(next.score);
        const finalGame = { ...next, score: finalScore, status: "game-over" as const };
        updateGame(finalGame);
        setHighScore((currentHighScore) => {
          const nextHighScore = Math.max(currentHighScore, finalScore);
          window.localStorage.setItem(STORAGE_KEY, String(nextHighScore));
          return nextHighScore;
        });
        frameRef.current = null;
        return;
      }

      updateGame(next);
      frameRef.current = requestAnimationFrame(tick);
    };

    frameRef.current = requestAnimationFrame(tick);
  }, [stopGame, updateGame]);

  const jump = useCallback(() => {
    const current = gameRef.current;
    if (current.status !== "running") {
      startGame(true);
      return;
    }

    if (current.runnerY <= 1) {
      velocityRef.current = JUMP_VELOCITY;
    }
  }, [startGame]);

  useEffect(() => {
    const arena = arenaRef.current;
    if (!arena) return;

    const measureArena = () => {
      arenaWidthRef.current = arena.clientWidth;
    };
    measureArena();
    const observer = new ResizeObserver(measureArena);
    observer.observe(arena);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      const savedScore = Number(window.localStorage.getItem(STORAGE_KEY));
      if (Number.isFinite(savedScore) && savedScore > 0) {
        setHighScore(Math.floor(savedScore));
      }
    });

    return () => {
      cancelAnimationFrame(frame);
      stopGame();
    };
  }, [stopGame]);

  const score = Math.floor(game.score).toString().padStart(3, "0");
  const runnerTransform = `translateY(${-game.runnerY}px)`;
  const obstaclePosition = game.status === "idle" ? "72%" : `${game.obstacleX}px`;
  const obstacle = techObstacles[game.obstacleIndex];
  const statusText =
    game.status === "running"
      ? "RUNNING"
      : game.status === "game-over"
        ? "SYSTEM HALTED — TAP TO RESTART"
        : "TAP, CLICK, OR PRESS SPACE TO START";

  return (
    <section className="border-b-2 border-border bg-background text-foreground">
      <div className="mx-auto max-w-container px-4 py-6 md:px-6 md:py-8">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3 font-mono text-xs font-bold tracking-[0.16em]">
          <div className="flex items-center gap-2">
            <span className="size-2.5 rounded-full bg-main shadow-[0_0_0_2px_#d1fbed,0_0_0_3px_#01d695]" />
            <span>FOOTER RUNNER</span>
          </div>
          <div className="flex items-center gap-5 text-foreground/70">
            <span>SCORE <b className="text-main">{score}</b></span>
            <span>BEST <b className="text-main">{highScore.toString().padStart(3, "0")}</b></span>
          </div>
        </div>

        <div
          aria-describedby="runner-instructions"
          aria-label="Footer runner game. Jump with Tux, the Linux penguin, over programming and framework symbols. Press Space or the up arrow to jump."
          className="relative h-[190px] cursor-pointer overflow-hidden rounded-base border-2 border-border bg-secondary-background outline-none focus-visible:ring-2 focus-visible:ring-main focus-visible:ring-offset-4 focus-visible:ring-offset-background sm:h-[220px]"
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
          <div
            aria-hidden="true"
            className="absolute inset-0 opacity-50"
            style={{
              backgroundImage:
                "linear-gradient(#00674718 1px, transparent 1px), linear-gradient(90deg, #00674718 1px, transparent 1px)",
              backgroundSize: "28px 28px",
            }}
          />
          <div aria-hidden="true" className="absolute left-0 right-0 bottom-[28px] border-t-2 border-dashed border-link" />

          <div
            aria-hidden="true"
            className="absolute bottom-[28px] h-11 transition-none"
            style={{ left: RUNNER_LEFT, width: RUNNER_WIDTH, transform: runnerTransform }}
          >
            {penguinSprite}
          </div>

          <div
            aria-hidden="true"
            className="absolute bottom-[28px]"
            title={obstacle.name}
            style={{
              height: `${game.obstacleHeight}px`,
              left: obstaclePosition,
              width: `${game.obstacleWidth}px`,
            }}
          >
            {obstacle.sprite}
          </div>

          <div className="pointer-events-none absolute inset-x-4 top-4 text-center font-mono text-[10px] font-bold tracking-[0.12em] text-foreground/70 sm:text-xs">
            {statusText}
          </div>
        </div>
        <p id="runner-instructions" className="mt-3 text-center font-mono text-[10px] tracking-wide text-foreground/60">
          SPACE / ↑ TO JUMP · R TO RESTART
        </p>
      </div>
    </section>
  );
}
