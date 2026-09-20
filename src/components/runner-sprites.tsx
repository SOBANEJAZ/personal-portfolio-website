// Keep the artwork static: the game moves its wrappers on each frame.
export const penguinSprite = (
  <svg viewBox="0 0 36 44" className="size-full" fill="none" aria-hidden="true">
    <path d="M10 19C4 22 2 29 2 34L10 31M26 19C32 22 34 29 34 34L26 31" fill="#20252b" stroke="#111820" strokeWidth="1.5" strokeLinejoin="round" />
    <path d="M8 18C6 7 11 2 18 2S30 7 28 18C34 29 31 39 18 40C5 39 2 29 8 18Z" fill="#20252b" stroke="#111820" strokeWidth="1.5" />
    <path d="M12 19C8 25 8 34 12 37C15 40 22 40 25 36C28 32 27 24 23 19Z" fill="#fff8e8" />
    <ellipse cx="14" cy="13" rx="4" ry="5" fill="#fff8e8" />
    <ellipse cx="22" cy="13" rx="4" ry="5" fill="#fff8e8" />
    <ellipse cx="15.5" cy="14" rx="1.5" ry="2" fill="#111820" />
    <ellipse cx="23" cy="14" rx="1.5" ry="2" fill="#111820" />
    <path d="M13 19L19 16L25 19L19 23Z" fill="#ffca45" stroke="#111820" strokeWidth="1.2" strokeLinejoin="round" />
    <path d="M5 36C8 34 13 36 15 40L14 42H2L1 40Z M23 37C27 34 30 35 32 38L35 40L34 42H21Z" fill="#ffca45" stroke="#111820" strokeWidth="1.5" strokeLinejoin="round" />
  </svg>
);

export const techObstacles = [
  {
    name: "React",
    width: 42,
    height: 36,
    sprite: (
      <svg viewBox="0 0 42 36" className="size-full" fill="none" aria-hidden="true">
        <g stroke="#087f9b" strokeWidth="2">
          <ellipse cx="21" cy="18" rx="19" ry="7" />
          <ellipse cx="21" cy="18" rx="19" ry="7" transform="rotate(60 21 18)" />
          <ellipse cx="21" cy="18" rx="19" ry="7" transform="rotate(120 21 18)" />
        </g>
        <circle cx="21" cy="18" r="3.5" fill="#087f9b" />
      </svg>
    ),
  },
  {
    name: "Supabase",
    width: 30,
    height: 42,
    sprite: (
      <svg viewBox="0 0 30 42" className="size-full" aria-hidden="true">
        <path d="M17 2L2 24H16V40L29 18H17Z" fill="#3ecf8e" stroke="#125d42" strokeWidth="2" strokeLinejoin="round" />
        <path d="M17 18H28L17 37Z" fill="#209e69" />
      </svg>
    ),
  },
  {
    name: "Python",
    width: 36,
    height: 36,
    sprite: (
      <svg viewBox="0 0 36 36" className="size-full" aria-hidden="true">
        <path d="M18 2C9 2 9 4 9 10H19V12H7C2 12 2 16 2 20S4 26 8 26V21C8 17 11 16 15 16H22C26 16 27 13 27 9V7C27 3 24 2 18 2Z" fill="#3776ab" stroke="#204d71" strokeWidth="1" />
        <path d="M18 34C27 34 27 32 27 26H17V24H29C34 24 34 20 34 16S32 10 28 10V15C28 19 25 20 21 20H14C10 20 9 23 9 27V29C9 33 12 34 18 34Z" fill="#ffd343" stroke="#957322" strokeWidth="1" />
        <circle cx="13" cy="7" r="1.5" fill="white" />
        <circle cx="23" cy="29" r="1.5" fill="#544516" />
      </svg>
    ),
  },
  {
    name: "TypeScript",
    width: 34,
    height: 34,
    sprite: (
      <svg viewBox="0 0 34 34" className="size-full" aria-hidden="true">
        <rect x="1" y="1" width="32" height="32" rx="2" fill="#3178c6" stroke="#174775" strokeWidth="2" />
        <text x="7" y="27" fill="white" fontFamily="Arial, sans-serif" fontSize="18" fontWeight="bold">TS</text>
      </svg>
    ),
  },
  {
    name: "Next.js",
    width: 36,
    height: 36,
    sprite: (
      <svg viewBox="0 0 36 36" className="size-full" aria-hidden="true">
        <circle cx="18" cy="18" r="17" fill="#171717" stroke="#737373" strokeWidth="1.5" />
        <path d="M11 25V11L28 31M25 11V22" fill="none" stroke="white" strokeWidth="2.5" strokeLinejoin="round" />
      </svg>
    ),
  },
] as const;
