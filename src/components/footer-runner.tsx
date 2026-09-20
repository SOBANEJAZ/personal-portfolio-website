"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const GAME_WIDTH = 960;
const RUNNER_LEFT = 76;
const RUNNER_WIDTH = 28;
const STORAGE_KEY = "soban-tech-runner-high-score";

type GameStatus = "idle" | "running" | "game-over";

type Game = {
  obstacleHeight: number;
  obstacleWidth: number;
  obstacleX: number;
  runnerY: number;
  score: number;
  status: GameStatus;
};

const initialGame: Game = {
  obstacleHeight: 28,
  obstacleWidth: 18,
  obstacleX: GAME_WIDTH,
  runnerY: 0,
  score: 0,
  status: "idle",
};

function nextObstacle(score: number) {
  const tall = Math.random() > 0.65;
  return {
    obstacleHeight: tall ? 44 : 28,
    obstacleWidth: tall ? 16 : 24,
    obstacleX: GAME_WIDTH + 280 + Math.random() * 300 + Math.min(score * 2, 160),
  };
}

export function FooterRunner() {
  const [game, setGame] = useState<Game>(initialGame);
  const [highScore, setHighScore] = useState(0);
  const gameRef = useRef<Game>(initialGame);
  const frameRef = useRef<number | null>(null);
  const lastFrameRef = useRef(0);
  const velocityRef = useRef(0);

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

  const startGame = useCallback(() => {
    stopGame();
    velocityRef.current = 0;
    lastFrameRef.current = performance.now();
    const freshGame = { ...initialGame, ...nextObstacle(0), status: "running" as const };
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
        next = { ...next, ...nextObstacle(next.score) };
      }

      const overlapsRunner =
        next.obstacleX < RUNNER_LEFT + RUNNER_WIDTH &&
        next.obstacleX + next.obstacleWidth > RUNNER_LEFT;
      const hitObstacle = overlapsRunner && next.runnerY < next.obstacleHeight;

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
      startGame();
      window.setTimeout(() => {
        velocityRef.current = 710;
      }, 0);
      return;
    }

    if (current.runnerY <= 1) {
      velocityRef.current = 710;
    }
  }, [startGame]);

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
  const obstaclePosition = `${Math.max(-5, (game.obstacleX / GAME_WIDTH) * 100)}%`;
  const statusText =
    game.status === "running"
      ? "RUNNING"
      : game.status === "game-over"
        ? "SYSTEM HALTED — TAP TO RESTART"
        : "TAP, CLICK, OR PRESS SPACE TO START";

  return (
    <section className="border-b-2 border-border bg-foreground text-secondary-background">
      <div className="mx-auto max-w-container px-4 py-6 md:px-6 md:py-8">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3 font-mono text-xs font-bold tracking-[0.16em]">
          <div className="flex items-center gap-2">
            <span className="size-2.5 rounded-full bg-main shadow-[0_0_0_2px_#10251e,0_0_0_3px_#01d695]" />
            <span>FOOTER RUNNER</span>
          </div>
          <div className="flex items-center gap-5 text-secondary-background/75">
            <span>SCORE <b className="text-main">{score}</b></span>
            <span>BEST <b className="text-main">{highScore.toString().padStart(3, "0")}</b></span>
          </div>
        </div>

        <div
          aria-describedby="runner-instructions"
          aria-label="Footer runner game. Press Space or the up arrow to jump."
          className="relative h-[190px] cursor-pointer overflow-hidden rounded-base border-2 border-secondary-background/80 bg-[#0b1d17] outline-none focus-visible:ring-2 focus-visible:ring-main focus-visible:ring-offset-4 focus-visible:ring-offset-foreground sm:h-[220px]"
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
          tabIndex={0}
        >
          <div
            aria-hidden="true"
            className="absolute inset-0 opacity-30"
            style={{
              backgroundImage:
                "linear-gradient(#01d69522 1px, transparent 1px), linear-gradient(90deg, #01d69522 1px, transparent 1px)",
              backgroundSize: "28px 28px",
            }}
          />
          <div aria-hidden="true" className="absolute left-0 right-0 bottom-[28px] border-t-2 border-dashed border-main/70" />

          <div
            aria-hidden="true"
            className="absolute bottom-[28px] left-[76px] h-9 w-7 transition-none"
            style={{ transform: runnerTransform }}
          >
            <span className="absolute left-1 top-0 size-5 rounded-full border-2 border-secondary-background bg-main" />
            <span className="absolute bottom-0 left-0 h-6 w-7 rounded-t-sm border-2 border-secondary-background bg-main" />
            <span className="absolute bottom-0 left-0 h-2 w-2 border-r-2 border-secondary-background" />
            <span className="absolute -right-1 bottom-0 h-3 w-2 border-l-2 border-secondary-background" />
            <span className="absolute left-3 top-2 h-1.5 w-1.5 rounded-full bg-foreground" />
          </div>

          <div
            aria-hidden="true"
            className="absolute bottom-[28px] bg-main"
            style={{
              height: `${game.obstacleHeight}px`,
              left: obstaclePosition,
              width: `${game.obstacleWidth}px`,
            }}
          >
            <span className="absolute -left-1 top-1/3 h-2 w-[calc(100%+8px)] border-2 border-secondary-background bg-main" />
            <span className="absolute inset-0 border-2 border-secondary-background" />
          </div>

          <div className="absolute inset-x-4 bottom-10 text-center font-mono text-[10px] font-bold tracking-[0.12em] text-secondary-background/75 sm:text-xs">
            {statusText}
          </div>
        </div>
        <p id="runner-instructions" className="mt-3 text-center font-mono text-[10px] tracking-wide text-secondary-background/60">
          SPACE / ↑ TO JUMP · R TO RESTART
        </p>
      </div>
    </section>
  );
}
