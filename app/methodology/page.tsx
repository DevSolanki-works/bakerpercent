import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Baker's Percentage Formulas & Methodology",
  description:
    "Formulas and practical limits for baker’s percentages, recipe scaling, starter hydration, and the site’s fermentation estimates.",
  alternates: { canonical: "https://bakerpercent.com/methodology" },
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
          See the formulas behind BakerPercent&apos;s baker&rsquo;s percentage, hydration, loaf scaling, and fermentation estimates.
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
          Fermentation timing depends on a range of factors, including dough and room temperature, starter activity, flour, and handling. This calculator uses a simple planning heuristic, not a tested or validated fermentation prediction.
        </p>
        <p className="text-xs text-foreground-muted leading-relaxed">
            The code uses a five-hour reference at 24°C (75°F) and 20% starter, then applies a temperature adjustment and a direct inverse starter-percentage adjustment:
        </p>
        <div className="bg-surface rounded-xl border border-border-subtle p-5 font-mono text-xs">
          <div className="text-foreground font-bold">
            Estimated Bulk Hours = 5.0 × (2.1 ^ ((24 - Temp_Celsius) / 10)) × (20 / Starter%)
          </div>
        </div>
        <p className="text-xs text-foreground-muted leading-relaxed">
          This simple equation omits starter maturity and activity, flour blend, dough temperature history, salt, mixing, and handling. Its time range and rise marker are prompts for observation, not instructions for when every dough should be shaped. Compare your dough with the recipe you are using and look for visible expansion, aeration, strength, and a gentle jiggle. A useful overview of these cues and the way desired dough temperature changes timing is available from <a className="underline underline-offset-2" href="https://www.kingarthurbaking.com/blog/2019/07/22/bulk-fermentation" target="_blank" rel="noreferrer">King Arthur Baking’s bulk fermentation guide</a>.
        </p>
      </section>

      <section className="space-y-4 border-t border-border-subtle pt-8">
        <h2 className="text-xl font-bold text-foreground">Sources and scope</h2>
        <p className="text-xs text-foreground-muted leading-relaxed">
          Baker&rsquo;s percentage and total hydration are arithmetic conventions. For an independent explanation of flour-relative percentages and counting the water and flour in a starter, see <a className="underline underline-offset-2" href="https://www.kingarthurbaking.com/blog/2022/04/28/what-is-bakers-math-and-how-can-i-use-it-in-my-everyday-bread-baking" target="_blank" rel="noreferrer">King Arthur Baking’s baker&rsquo;s math article</a> and its <a className="underline underline-offset-2" href="https://www.kingarthurbaking.com/blog/2023/01/11/bread-hydration" target="_blank" rel="noreferrer">bread hydration explanation</a>. Our dough and starter timing outputs are practical approximations; they are not derived from controlled tests of every flour, starter, or kitchen.
        </p>
        <p className="text-xs text-foreground-muted leading-relaxed">
          Explore the worked <Link href="/guides" className="text-crust-primary font-semibold hover:underline">baking guides</Link>, or report a correction through the <Link href="/contact" className="text-crust-primary font-semibold hover:underline">contact page</Link>.
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
