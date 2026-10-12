"use client";

import { useState } from "react";
import Link from "next/link";
import { calculateStarterFeed } from "@/lib/calculator/engine";

export default function StarterFeedingCalculatorPage() {
  const [targetGrams, setTargetGrams] = useState<number>(150);
  const [selectedRatio, setSelectedRatio] = useState<string>("1:2:2");
  const [roomTempCelsius, setRoomTempCelsius] = useState<number>(22);

  const ratios: Record<string, { seed: number; water: number; flour: number; desc: string; peakDesc: string }> = {
    "1:1:1": {
      seed: 1,
      water: 1,
      flour: 1,
      desc: "Fast rise. Ideal for same-day morning baking or feeding a sluggish starter.",
      peakDesc: "3 to 5 hours at room temperature",
    },
    "1:2:2": {
      seed: 1,
      water: 2,
      flour: 2,
      desc: "Standard bake-day feed. Perfect for feeding before work or late morning.",
      peakDesc: "6 to 8 hours at room temperature",
    },
    "1:3:3": {
      seed: 1,
      water: 3,
      flour: 3,
      desc: "Overnight feed for standard 70°F (21°C) kitchens. Ready when you wake up.",
      peakDesc: "8 to 10 hours at room temperature",
    },
    "1:5:5": {
      seed: 1,
      water: 5,
      flour: 5,
      desc: "High dilution feed. Ideal for warm summer kitchens or extended 12+ hour overnight rests.",
      peakDesc: "10 to 14 hours at room temperature",
    },
  };

  const currentRatio = ratios[selectedRatio];
  const feedResult = calculateStarterFeed(targetGrams, currentRatio, roomTempCelsius);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 sm:py-12">
      <div className="text-center max-w-2xl mx-auto mb-10">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-50 text-amber-800 border border-amber-200 mb-3">
          <span>⏳ Sourdough Levain Planner</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight">
          Sourdough Starter Feeding Calculator
        </h1>
        <p className="mt-2 text-sm sm:text-base text-foreground-muted leading-relaxed">
          Scale your feeding quantities to build the exact amount of ripe starter needed for your dough with zero discard waste.
        </p>
      </div>

      {/* Main Feeding Tool */}
      <div className="bg-surface rounded-2xl border border-border-subtle p-6 sm:p-8 shadow-sm space-y-6 mb-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className="block text-xs font-semibold text-foreground mb-1">
              Target Ripe Starter Amount (g)
            </label>
            <input
              type="number"
              min="50"
              max="2000"
              step="10"
              value={targetGrams}
              onChange={(e) => setTargetGrams(Number(e.target.value))}
              className="w-full px-3 py-2 rounded-lg border border-border-subtle bg-surface text-foreground font-mono font-bold text-sm focus:border-crust-primary focus:outline-hidden"
            />
            <div className="flex justify-between text-[11px] text-foreground-subtle mt-1">
              <span>Single Loaf: ~100g</span>
              <span>Double Loaf: ~200g</span>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-foreground mb-1">
              Room Temperature (°C / °F)
            </label>
            <div className="flex items-center gap-2">
              <input
                type="range"
                min="18"
                max="28"
                step="1"
                value={roomTempCelsius}
                onChange={(e) => setRoomTempCelsius(Number(e.target.value))}
                className="w-full h-2 rounded-lg bg-surface-subtle cursor-pointer"
              />
              <span className="font-mono text-sm font-bold text-foreground w-16 text-right">
                {roomTempCelsius}°C / {Math.round((roomTempCelsius * 9) / 5 + 32)}°F
              </span>
            </div>
          </div>
        </div>

        {/* Feeding Ratio Presets */}
        <div id="ratios" className="space-y-2 pt-2">
          <label className="block text-xs font-semibold text-foreground">Select Feeding Ratio (Starter : Water : Flour)</label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {Object.keys(ratios).map((ratioKey) => (
              <button
                key={ratioKey}
                type="button"
                onClick={() => setSelectedRatio(ratioKey)}
                className={`p-3 rounded-xl border text-center transition-all ${
                  selectedRatio === ratioKey
                    ? "bg-crust-soft border-crust-primary text-crust-primary font-bold shadow-2xs"
                    : "bg-surface border-border-subtle text-foreground-muted hover:border-border-strong"
                }`}
              >
                <div className="font-mono text-base">{ratioKey}</div>
                <div className="text-[10px] text-foreground-subtle mt-0.5 font-normal">
                  {ratios[ratioKey].peakDesc.split(" at ")[0]}
                </div>
              </button>
            ))}
          </div>
          <p className="text-xs text-foreground-muted pt-1">{currentRatio.desc}</p>
        </div>

        {/* Results Card */}
        <div className="rounded-2xl bg-wheat-soft border border-wheat-gold/30 p-6 space-y-4">
          <h2 className="text-sm font-bold text-foreground uppercase tracking-wider">
            Feeding Formula for {feedResult.totalStarterGrams}g Starter
          </h2>

          <div className="grid grid-cols-3 gap-3 text-center">
            <div className="bg-surface rounded-xl p-3 border border-border-subtle shadow-2xs">
              <span className="text-[11px] text-foreground-subtle block">Starter Seed</span>
              <span className="font-mono text-xl sm:text-2xl font-bold text-crust-primary">
                {feedResult.starterSeedGrams}g
              </span>
            </div>

            <div className="bg-surface rounded-xl p-3 border border-border-subtle shadow-2xs">
              <span className="text-[11px] text-foreground-subtle block">Water (Room Temp)</span>
              <span className="font-mono text-xl sm:text-2xl font-bold text-foreground">
                {feedResult.waterGrams}g
              </span>
            </div>

            <div className="bg-surface rounded-xl p-3 border border-border-subtle shadow-2xs">
              <span className="text-[11px] text-foreground-subtle block">Flour (White or Blend)</span>
              <span className="font-mono text-xl sm:text-2xl font-bold text-foreground">
                {feedResult.flourGrams}g
              </span>
            </div>
          </div>

          <div className="pt-2 text-xs text-foreground-muted flex items-center justify-between border-t border-wheat-gold/20">
            <span>Estimated Peak Rise Window:</span>
            <span className="font-bold text-foreground font-mono">{feedResult.estimatedPeakHours}</span>
          </div>
        </div>
      </div>

      {/* Guide to Reading Peak Starter */}
      <section className="space-y-6 max-w-3xl mx-auto text-sm text-foreground-muted leading-relaxed">
        <h2 className="text-2xl font-bold text-foreground">How to Know When Your Starter is at Peak</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div className="p-4 rounded-xl bg-surface border border-border-subtle space-y-1">
            <strong className="text-foreground block">1. Domed to Flat Top</strong>
            <p>A rising starter has a convex (domed) center. When it levels out flat, it has peaked and is at maximum yeast activity.</p>
          </div>
          <div className="p-4 rounded-xl bg-surface border border-border-subtle space-y-1">
            <strong className="text-foreground block">2. Sponge Webbing</strong>
            <p>Look through the glass jar: you should see vertical aeration channels and a webbed, honeycomb gluten network.</p>
          </div>
          <div className="p-4 rounded-xl bg-surface border border-border-subtle space-y-1">
            <strong className="text-foreground block">3. Pleasant Aroma</strong>
            <p>Should smell sweet, fruity, and mildly alcoholic—not intensely vinegary or nail-polish-like (which indicates hunger).</p>
          </div>
        </div>

        <div className="pt-6 flex justify-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-crust-primary text-white text-xs font-semibold hover:bg-crust-hover transition-colors"
          >
            ← Ready to mix? Open Sourdough Loaf Calculator
          </Link>
        </div>
      </section>
    </div>
  );
}
