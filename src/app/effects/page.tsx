import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ScrambleText,
  MagneticText,
  WaveText,
  SplitRevealText,
} from "@/components/text-effects";

const cssEffects = [
  {
    id: "highlight-wipe",
    name: "1. Sliding Highlight Wipe",
    type: "CSS-only",
    description: "Colored background slides in from left, like a marker stroke.",
    demoClass: "fx-highlight-wipe",
  },
  {
    id: "strike-underline",
    name: "2. Strikethrough → Underline",
    type: "CSS-only",
    description: "Thick line-through morphs into a wavy underline on hover.",
    demoClass: "fx-strike-underline",
  },
  {
    id: "letter-slam",
    name: "3. Letter-Spacing Slam",
    type: "CSS-only",
    description: "Compressed text slams together with a scale bump. Brutalist poster energy.",
    demoClass: "fx-letter-slam",
  },
  {
    id: "press-in",
    name: "4. Text-Shadow 3D Press-In",
    type: "CSS-only",
    description: "Stacked text-shadows collapse — the push-down effect, but for text.",
    demoClass: "fx-press-in",
  },
  {
    id: "rubber-band",
    name: "5. Skew Rubber Band",
    type: "CSS-only",
    description: "Text skews and springs back with elastic bounce. Cartoon physics.",
    demoClass: "fx-rubber-band",
  },
  {
    id: "invert-reveal",
    name: "6. Color-Invert + Border Reveal",
    type: "CSS-only",
    description: "Text inverts colors while a thick border box grows around it.",
    demoClass: "fx-invert-reveal",
  },
];

export default function EffectsPage() {
  return (
    <div className="mx-auto max-w-container px-4 py-16 md:px-6">
      <div className="mb-12">
        <h1 className="text-3xl md:text-5xl font-heading font-bold mb-4">
          hover effects
        </h1>
        <p className="text-lg text-foreground/60 max-w-2xl">
          Hover over each demo to preview the effect. Tell me which ones you
          want and where — I&apos;ll apply them to your actual cards.
        </p>
      </div>

      {/* CSS-only effects */}
      <div className="mb-12">
        <h2 className="text-xl md:text-2xl font-heading font-bold mb-6">
          CSS-only effects
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {cssEffects.map((fx) => (
            <Card key={fx.id} className="cursor-default">
              <CardHeader>
                <div className="flex items-center justify-between gap-2">
                  <CardTitle className="text-base">{fx.name}</CardTitle>
                  <Badge variant="neutral" className="text-xs shrink-0">
                    {fx.type}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-foreground/60 mb-4">{fx.description}</p>
                <div className="rounded-base border-2 border-border bg-secondary-background p-6 flex items-center justify-center">
                  <span className={`text-xl md:text-2xl font-heading font-bold cursor-pointer ${fx.demoClass}`}>
                    Soban Ejaz
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* JS effects */}
      <div>
        <h2 className="text-xl md:text-2xl font-heading font-bold mb-6">
          JavaScript effects
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Scramble */}
          <Card className="cursor-default">
            <CardHeader>
              <div className="flex items-center justify-between gap-2">
                <CardTitle className="text-base">7. Per-Letter Scramble</CardTitle>
                <Badge variant="neutral" className="text-xs shrink-0">
                  JS
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-foreground/60 mb-4">
                Characters cycle through random glyphs (Matrix/hacker feel) before settling.
              </p>
              <div className="rounded-base border-2 border-border bg-secondary-background p-6 flex items-center justify-center">
                <span className="text-xl md:text-2xl font-heading font-bold">
                  <ScrambleText text="Soban Ejaz" />
                </span>
              </div>
            </CardContent>
          </Card>

          {/* Magnetic */}
          <Card className="cursor-default">
            <CardHeader>
              <div className="flex items-center justify-between gap-2">
                <CardTitle className="text-base">8. Magnetic Distortion</CardTitle>
                <Badge variant="neutral" className="text-xs shrink-0">
                  JS
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-foreground/60 mb-4">
                Each letter pushes away from the cursor like a magnetic field.
              </p>
              <div className="rounded-base border-2 border-border bg-secondary-background p-6 flex items-center justify-center">
                <span className="text-xl md:text-2xl font-heading font-bold">
                  <MagneticText text="Soban Ejaz" />
                </span>
              </div>
            </CardContent>
          </Card>

          {/* Wave */}
          <Card className="cursor-default">
            <CardHeader>
              <div className="flex items-center justify-between gap-2">
                <CardTitle className="text-base">9. Wave Ripple</CardTitle>
                <Badge variant="neutral" className="text-xs shrink-0">
                  JS
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-foreground/60 mb-4">
                Letters bounce in a wave pattern left-to-right with staggered delays.
              </p>
              <div className="rounded-base border-2 border-border bg-secondary-background p-6 flex items-center justify-center">
                <span className="text-xl md:text-2xl font-heading font-bold">
                  <WaveText text="Soban Ejaz" />
                </span>
              </div>
            </CardContent>
          </Card>

          {/* Split Reveal */}
          <Card className="cursor-default">
            <CardHeader>
              <div className="flex items-center justify-between gap-2">
                <CardTitle className="text-base">10. Text Split Slide-Reveal</CardTitle>
                <Badge variant="neutral" className="text-xs shrink-0">
                  JS
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-foreground/60 mb-4">
                Text splits top/bottom and slides apart, revealing a color layer behind.
              </p>
              <div className="rounded-base border-2 border-border bg-secondary-background p-6 flex items-center justify-center">
                <span className="text-xl md:text-2xl font-heading font-bold">
                  <SplitRevealText text="Soban Ejaz" />
                </span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
