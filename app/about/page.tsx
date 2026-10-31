import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About BakerPercent",
  description: "Learn about BakerPercent’s free browser-based baking calculators, scope, and approach to transparent educational guidance.",
  alternates: { canonical: "https://bakerpercent.com/about" },
};

export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-8 sm:py-12 space-y-8">
      <div>
        <h1 className="text-3xl font-extrabold text-foreground tracking-tight">About BakerPercent</h1>
        <p className="mt-2 text-sm text-foreground-muted">
          Free browser-based tools for working with baking formulas and ratios.
        </p>
      </div>

      <div className="space-y-4 text-sm text-foreground-muted leading-relaxed">
        <p>
          BakerPercent is an independent project built to make common baking calculations easier to check and use at home. The site provides calculators for sourdough formulas, added and total hydration, starter feeds, and pizza dough. It is maintained as a practical reference, not a baking school or a substitute for a tested recipe.
        </p>
        <p>
          BakerPercent is built around three principles:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
          <div className="p-4 rounded-xl bg-surface border border-border-subtle">
            <h3 className="font-bold text-foreground text-sm mb-1">1. Kitchen First</h3>
            <p className="text-xs">
              The calculators run in your browser without an account. Ingredient values can be adjusted to fit a recipe and the flour you use.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-surface border border-border-subtle">
            <h3 className="font-bold text-foreground text-sm mb-1">2. Mathematical Rigor</h3>
            <p className="text-xs">
              Formula calculations are described on the methodology page. Displayed ingredient weights may be rounded, and fermentation guidance is an estimate rather than a promise.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-surface border border-border-subtle">
            <h3 className="font-bold text-foreground text-sm mb-1">3. Zero Friction</h3>
            <p className="text-xs">
              Read the guides and source notes to understand how the examples work, what they assume, and where dough observation matters more than a timer.
            </p>
          </div>
        </div>

        <p>Educational explanations are kept separate from calculator outputs. Where a guide uses an external baking reference, it links to that source; where this site gives an estimate, the limitations are stated on the page.</p>
        <p>Start with the <Link href="/guides" className="text-crust-primary font-semibold hover:underline">baking guides</Link> or see the <Link href="/methodology" className="text-crust-primary font-semibold hover:underline">calculation methodology</Link> to understand how the tools work.</p>

        <p className="pt-4">
          Have an idea for a feature or a baking calculator you&rsquo;d like to see? We&rsquo;d love to hear from you on our{" "}
          <Link href="/contact" className="text-crust-primary font-semibold hover:underline">
            contact page
          </Link>.
        </p>
      </div>
    </div>
  );
}
