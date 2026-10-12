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
    level: "Classic Open Crumb",
    color: "text-crust-primary",
    bgColor: "bg-crust-soft",
    borderColor: "border-crust-border",
    difficulty: "Intermediate",
    description: "The classic Tartine style. Golden blistered crust, custardy interior, and irregular artisan aeration. Holds sandwich toppings without leaking.",
  };

  if (trueHydrationPct < 66) {
    crumbProfile = {
      level: "Tight Sandwich Crumb",
      color: "text-emerald-700 dark:text-emerald-300",
      bgColor: "bg-emerald-50 dark:bg-emerald-950/40",
      borderColor: "border-emerald-200 dark:border-emerald-800",
      difficulty: "Beginner Friendly",
      description: "Dense, uniform crumb that slices easily. Dough holds shape with minimal gluten development and is very easy to score.",
    };
  } else if (trueHydrationPct < 73) {
    crumbProfile = {
      level: "Balanced Artisan Crumb",
      color: "text-blue-700 dark:text-blue-300",
      bgColor: "bg-blue-50 dark:bg-blue-950/40",
      borderColor: "border-blue-200 dark:border-blue-800",
      difficulty: "Beginner – Easy",
      description: "The sweet spot for home bakers. Moderate aeration, good ear formation, and forgiving dough handling during preshaping.",
    };
  } else if (trueHydrationPct >= 82) {
    crumbProfile = {
      level: "Wild Open Crumb / Ciabatta",
      color: "text-purple-700 dark:text-purple-300",
      bgColor: "bg-purple-50 dark:bg-purple-950/40",
      borderColor: "border-purple-200 dark:border-purple-800",
      difficulty: "Advanced / Expert",
      description: "Extreme hydration. Translucent, gelatinous crumb with large irregular air pockets. Requires high-protein flour (13%+) and gentle coil folds.",
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
          Discover your recipe&rsquo;s true total hydration by accounting for water contributed by your sourdough starter, and forecast your baked crumb structure.
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
              Crumb Structure: {crumbProfile.level}
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

      {/* Deep Educational Guide to Flour Absorption */}
      <section id="flour-types" className="space-y-6 max-w-3xl mx-auto text-sm text-foreground-muted leading-relaxed">
        <h2 className="text-2xl font-bold text-foreground">Flour Absorption &amp; Hydration Limits</h2>
        <p>
          Hydration is not an absolute number; it is relative to the thirst of your flour. Different grains and milling types absorb dramatically different amounts of water:
        </p>

        <div className="divide-y divide-border-subtle bg-surface rounded-2xl border border-border-subtle overflow-hidden text-xs">
          <div className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <strong className="text-foreground block text-sm">Bread Flour (12.7%–14% Protein)</strong>
              <span>High gluten network. Handles 75%–82% hydration effortlessly with strong elasticity.</span>
            </div>
            <span className="font-mono font-bold text-crust-primary sm:text-right">75%–82% Capacity</span>
          </div>

          <div className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <strong className="text-foreground block text-sm">All-Purpose Flour (10.5%–11.5% Protein)</strong>
              <span>Moderate gluten. Tends to slacken and puddle above 72% hydration unless mixed with bread flour.</span>
            </div>
            <span className="font-mono font-bold text-foreground-muted sm:text-right">65%–72% Capacity</span>
          </div>

          <div className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <strong className="text-foreground block text-sm">Whole Wheat Flour (Bran &amp; Germ)</strong>
              <span>Wheat bran acts like tiny sponges, absorbing up to 25% more water than refined white endosperm.</span>
            </div>
            <span className="font-mono font-bold text-wheat-gold sm:text-right">80%–90% Capacity</span>
          </div>

          <div className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <strong className="text-foreground block text-sm">Rye Flour</strong>
              <span>Contains high levels of pentosans (mucilage) which absorb huge water volumes with virtually zero gluten elasticity.</span>
            </div>
            <span className="font-mono font-bold text-purple-600 sm:text-right">82%–95% Capacity</span>
          </div>
        </div>

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
