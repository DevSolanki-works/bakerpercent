"use client";

import { useState } from "react";
import Link from "next/link";

export default function SourdoughHydrationCalculatorPage() {
  const [flourGrams, setFlourGrams] = useState<number>(500);
  const [waterGrams, setWaterGrams] = useState<number>(375);
  const [starterGrams, setStarterGrams] = useState<number>(100);
  const [starterHydration, setStarterHydration] = useState<number>(100);

  // Math
  const sHydrationDec = starterHydration / 100;
  const starterFlour = starterGrams / (1 + sHydrationDec);
  const starterWater = starterGrams - starterFlour;

  const totalFlour = flourGrams + starterFlour;
  const totalWater = waterGrams + starterWater;

  const addedHydrationPct = flourGrams > 0 ? (waterGrams / flourGrams) * 100 : 0;
  const trueHydrationPct = totalFlour > 0 ? (totalWater / totalFlour) * 100 : 0;

  // Determine Crumb Profile
  let crumbProfile = {
    level: "Moderate hydration",
    color: "text-crust-primary",
    bgColor: "bg-crust-soft",
    borderColor: "border-crust-border",
    difficulty: "Context matters",
    description: "Hydration is one clue about dough handling, not a crumb prediction. Flour, mixing, fermentation, shaping, and baking all affect the result.",
  };

  if (trueHydrationPct < 66) {
    crumbProfile = {
      level: "Lower hydration",
      color: "text-emerald-700 dark:text-emerald-300",
      bgColor: "bg-emerald-50 dark:bg-emerald-950/40",
      borderColor: "border-emerald-200 dark:border-emerald-800",
      difficulty: "Often firmer to handle",
      description: "A lower water-to-flour ratio often makes dough feel firmer, but flour type and mixing still affect extensibility and the baked crumb.",
    };
  } else if (trueHydrationPct < 73) {
    crumbProfile = {
      level: "Moderate hydration",
      color: "text-blue-700 dark:text-blue-300",
      bgColor: "bg-blue-50 dark:bg-blue-950/40",
      borderColor: "border-blue-200 dark:border-blue-800",
      difficulty: "A starting point",
      description: "Use this ratio as a comparison point, then adjust for your flour and recipe. Hydration alone cannot forecast an open crumb or ear.",
    };
  } else if (trueHydrationPct >= 82) {
    crumbProfile = {
      level: "Very high hydration",
      color: "text-purple-700 dark:text-purple-300",
      bgColor: "bg-purple-50 dark:bg-purple-950/40",
      borderColor: "border-purple-200 dark:border-purple-800",
      difficulty: "Can be challenging to handle",
      description: "A very high water-to-flour ratio can make dough slack or sticky. Flour absorption and dough strength vary, so add water gradually and follow a recipe suited to your flour.",
    };
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 sm:py-12">
      <div className="text-center max-w-2xl mx-auto mb-10">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200 mb-3">
          <span>💧 True Hydration Analyzer</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight">
          Sourdough Hydration Calculator
        </h1>
        <p className="mt-2 text-sm sm:text-base text-foreground-muted leading-relaxed">
          Compare added-water hydration with total hydration after counting the flour and water in your starter. The result describes a ratio; it does not predict crumb structure.
        </p>
      </div>

      {/* Main Hydration Tool Box */}
      <div className="bg-surface rounded-2xl border border-border-subtle p-6 sm:p-8 shadow-sm space-y-6 mb-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          <div>
            <label className="block text-xs font-semibold text-foreground mb-1">Base Flour (g)</label>
            <input
              type="number"
              min="100"
              max="5000"
              value={flourGrams}
              onChange={(e) => setFlourGrams(Number(e.target.value))}
              className="w-full px-3 py-2 rounded-lg border border-border-subtle bg-surface text-foreground font-mono font-bold text-sm focus:border-crust-primary focus:outline-hidden"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-foreground mb-1">Added Water (g)</label>
            <input
              type="number"
              min="50"
              max="5000"
              value={waterGrams}
              onChange={(e) => setWaterGrams(Number(e.target.value))}
              className="w-full px-3 py-2 rounded-lg border border-border-subtle bg-surface text-foreground font-mono font-bold text-sm focus:border-crust-primary focus:outline-hidden"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-foreground mb-1">Sourdough Starter (g)</label>
            <input
              type="number"
              min="0"
              max="1000"
              value={starterGrams}
              onChange={(e) => setStarterGrams(Number(e.target.value))}
              className="w-full px-3 py-2 rounded-lg border border-border-subtle bg-surface text-foreground font-mono font-bold text-sm focus:border-crust-primary focus:outline-hidden"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-foreground mb-1">Starter Hydration (%)</label>
            <input
              type="number"
              min="50"
              max="200"
              value={starterHydration}
              onChange={(e) => setStarterHydration(Number(e.target.value))}
              className="w-full px-3 py-2 rounded-lg border border-border-subtle bg-surface text-foreground font-mono font-bold text-sm focus:border-crust-primary focus:outline-hidden"
            />
          </div>
        </div>

        {/* Results Banner */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-border-subtle">
          <div className="p-4 rounded-xl bg-surface-subtle border border-border-subtle">
            <span className="text-xs text-foreground-subtle block">Added Water Hydration</span>
            <span className="font-mono text-2xl font-bold text-foreground">
              {addedHydrationPct.toFixed(1)}%
            </span>
            <span className="text-[11px] text-foreground-muted block mt-1">
              Water relative to dry flour in the bowl
            </span>
          </div>

          <div className="p-4 rounded-xl bg-crust-soft border border-crust-border">
            <span className="text-xs text-crust-primary font-bold block">True Total Hydration</span>
            <span className="font-mono text-3xl font-extrabold text-crust-primary">
              {trueHydrationPct.toFixed(1)}%
            </span>
            <span className="text-[11px] text-foreground-muted block mt-1">
              Total water ({totalWater.toFixed(0)}g) ÷ Total flour ({totalFlour.toFixed(0)}g)
            </span>
          </div>
        </div>

        {/* Dynamic Crumb Forecast */}
        <div className={`p-5 rounded-xl border ${crumbProfile.bgColor} ${crumbProfile.borderColor}`}>
          <div className="flex items-center justify-between mb-2">
            <span className={`font-bold text-sm ${crumbProfile.color}`}>
              Hydration note: {crumbProfile.level}
            </span>
            <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-surface border border-border-subtle text-foreground">
              {crumbProfile.difficulty}
            </span>
          </div>
          <p className="text-xs text-foreground-muted leading-relaxed">
            {crumbProfile.description}
          </p>
        </div>
      </div>

      {/* Educational Guide to Flour Absorption */}
      <section id="flour-types" className="space-y-6 max-w-3xl mx-auto text-sm text-foreground-muted leading-relaxed">
        <h2 className="text-2xl font-bold text-foreground">Flour Absorption &amp; Hydration Limits</h2>
        <p>
          Hydration is calculated from weights, but the same percentage can feel different with different flours. Protein level, extraction, milling, freshness, and whole-grain content influence how a dough handles. Treat the notes below as tendencies, not fixed absorption limits:
        </p>

        <div className="divide-y divide-border-subtle bg-surface rounded-2xl border border-border-subtle overflow-hidden text-xs">
          <div className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <strong className="text-foreground block text-sm">Bread Flour (12.7%–14% Protein)</strong>
              <span>Protein percentage can offer a rough clue, but it does not guarantee a specific water capacity or dough strength.</span>
            </div>
            <span className="font-mono font-bold text-crust-primary sm:text-right">Test with your flour</span>
          </div>

          <div className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <strong className="text-foreground block text-sm">All-Purpose Flour (10.5%–11.5% Protein)</strong>
              <span>Brands and batches differ. Begin with a trusted formula and add reserved water gradually if the dough can absorb it.</span>
            </div>
            <span className="font-mono font-bold text-foreground-muted sm:text-right">No universal cutoff</span>
          </div>

          <div className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <strong className="text-foreground block text-sm">Whole Wheat Flour (Bran &amp; Germ)</strong>
              <span>Whole-grain particles and bran change water absorption and dough feel. A short rest can help you judge whether more water is useful.</span>
            </div>
            <span className="font-mono font-bold text-wheat-gold sm:text-right">Adjust gradually</span>
          </div>

          <div className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <strong className="text-foreground block text-sm">Rye Flour</strong>
              <span>Rye behaves differently from wheat because its structure and gluten-forming properties differ. Use a rye-specific formula to guide hydration.</span>
            </div>
            <span className="font-mono font-bold text-purple-600 sm:text-right">Use a rye formula</span>
          </div>
        </div>

        <p className="text-xs leading-relaxed">
          For an independent discussion of how flour and starter affect dough feel and total hydration, see <a className="underline underline-offset-2" href="https://www.kingarthurbaking.com/blog/2023/01/11/bread-hydration" target="_blank" rel="noreferrer">King Arthur Baking’s hydration guide</a>. A hydration percentage is useful for comparing formulas, but it is not a direct prediction of crumb openness.
        </p>

        <div className="pt-6 flex justify-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-crust-primary text-white text-xs font-semibold hover:bg-crust-hover transition-colors"
          >
            ← Return to Sourdough Loaf Calculator
          </Link>
        </div>
      </section>
    </div>
  );
}
