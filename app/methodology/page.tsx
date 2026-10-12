import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Baker's Math Formulas & Methodology | DoughRatio",
  description:
    "Complete mathematical derivations for baker's percentages, reverse loaf weight formulas, starter hydration decomposition, and fermentation temperature kinetics.",
};

export default function MethodologyPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-8 sm:py-12 space-y-10">
      <div>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-surface-subtle text-foreground-muted border border-border-subtle mb-3">
          <span>📐 Mathematical Derivations</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight">
          Formulas &amp; Methodology
        </h1>
        <p className="mt-2 text-sm text-foreground-muted leading-relaxed">
          Full transparency into every mathematical calculation and biological fermentation curve used across DoughRatio.
        </p>
      </div>

      {/* 1. Baker's Percentage Core */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-foreground">1. The Baker&rsquo;s Percentage Definition</h2>
        <p className="text-xs text-foreground-muted leading-relaxed">
          In commercial and artisan baking, recipes are expressed relative to total flour weight, which is always standardized to exactly 100%. All other ingredients are expressed as:
        </p>
        <div className="bg-surface rounded-xl border border-border-subtle p-5 font-mono text-xs">
          <div className="text-crust-primary font-bold mb-1">
            Ingredient % = (Weight of Ingredient ÷ Base Flour Weight) × 100%
          </div>
          <div className="text-foreground-subtle">
            Flour is always the 100% benchmark. Hydration, starter, and salt percentages are calculated against that base flour weight.
          </div>
        </div>
      </section>

      {/* 2. Reverse Loaf Weight Formula */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-foreground">2. Reverse Loaf Weight Derivation</h2>
        <p className="text-xs text-foreground-muted leading-relaxed">
          When scaling backward from a target total dough weight (W_target) for N loaves of weight L:
        </p>
        <div className="bg-surface rounded-xl border border-border-subtle p-5 font-mono text-xs space-y-2">
          <div>W_target = Loaf Count × Target Loaf Weight</div>
          <div>Multiplier (M) = 1 + (Hydration% / 100) + (Starter% / 100) + (Salt% / 100) + (Yeast% / 100)</div>
          <div className="text-crust-primary font-bold text-sm pt-1">
            Base Flour Weight = W_target ÷ M
          </div>
        </div>
        <p className="text-xs text-foreground-muted leading-relaxed">
          Component weights are subsequently derived as:
        </p>
        <ul className="list-disc list-inside text-xs text-foreground-muted space-y-1 font-mono">
          <li>Added Water = Base Flour × (Hydration% / 100)</li>
          <li>Starter = Base Flour × (Starter% / 100)</li>
          <li>Salt = Base Flour × (Salt% / 100)</li>
        </ul>
      </section>

      {/* 3. Starter Hydration Decomposition */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-foreground">3. Starter Hydration Decomposition &amp; True Hydration</h2>
        <p className="text-xs text-foreground-muted leading-relaxed">
          A standard active starter at 100% hydration consists of equal parts water and flour by weight (1:1 ratio). For a starter with hydration H_s:
        </p>
        <div className="bg-surface rounded-xl border border-border-subtle p-5 font-mono text-xs space-y-1.5">
          <div>Starter Flour = Starter Weight ÷ (1 + H_s / 100)</div>
          <div>Starter Water = Starter Weight - Starter Flour</div>
          <div>Total Flour = Base Flour + Starter Flour</div>
          <div>Total Water = Added Water + Starter Water</div>
          <div className="text-crust-primary font-bold text-sm pt-1">
            True Total Hydration % = (Total Water ÷ Total Flour) × 100%
          </div>
        </div>
      </section>

      {/* 4. Ambient Temperature Kinetics */}
      <section id="fermentation-temperature" className="space-y-4">
        <h2 className="text-xl font-bold text-foreground">4. Fermentation Kinetics Model</h2>
        <p className="text-xs text-foreground-muted leading-relaxed">
          The rate of fermentation in sourdough is predominantly governed by the temperature dependence of wild yeast (<em>Saccharomyces cerevisiae / Candida humilis</em>) and lactic acid bacteria (<em>Lactobacillus sanfranciscensis</em>).
        </p>
        <p className="text-xs text-foreground-muted leading-relaxed">
          DoughRatio uses an empirical Q_10 temperature coefficient approximation (Q_10 ≈ 2.1) centered at a baseline of 24°C (75°F) with 20% starter inoculation:
        </p>
        <div className="bg-surface rounded-xl border border-border-subtle p-5 font-mono text-xs">
          <div className="text-foreground font-bold">
            Estimated Bulk Hours = 5.0 × (2.1 ^ ((24 - Temp_Celsius) / 10)) × √(20 / Starter%)
          </div>
        </div>
        <p className="text-xs text-foreground-muted leading-relaxed">
          Because biological activity accelerates non-linearly at higher temperatures, target volume increases before shaping are dynamically decreased from 75% rise at 19°C (66°F) to 45% rise at 28°C (82°F) to prevent dough degradation during final shaping and bench rest.
        </p>
      </section>

      <div className="pt-6 border-t border-border-subtle">
        <Link
          href="/"
          className="text-xs text-crust-primary font-semibold hover:underline"
        >
          ← Back to Sourdough Calculator
        </Link>
      </div>
    </div>
  );
}
