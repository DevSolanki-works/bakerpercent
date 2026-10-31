"use client";

import { useState } from "react";
import Link from "next/link";
import { calculateStarterFeed } from "@/lib/calculator/engine";

export default function StarterFeedingCalculatorPage() {
  const [targetGrams, setTargetGrams] = useState<number>(150);
  const [selectedRatio, setSelectedRatio] = useState<string>("1:2:2");
  const [roomTempCelsius, setRoomTempCelsius] = useState<number>(22);

  const ratios: Record<string, { seed: number; water: number; flour: number; desc: string; timingNote: string }> = {
    "1:1:1": {
      seed: 1,
      water: 1,
      flour: 1,
      desc: "A smaller feed relative to the seed often peaks sooner. Useful when your baking schedule calls for a shorter interval.",
      timingNote: "Lower feed amount",
    },
    "1:2:2": {
      seed: 1,
      water: 2,
      flour: 2,
      desc: "A common everyday feed. Compare the estimate with your starter's actual rise pattern before setting a bake time.",
      timingNote: "Moderate feed amount",
    },
    "1:3:3": {
      seed: 1,
      water: 3,
      flour: 3,
      desc: "A larger feed may take longer than a 1:1:1 or 1:2:2 feed. It may or may not fit an overnight schedule in your kitchen.",
      timingNote: "Larger feed amount",
    },
    "1:5:5": {
      seed: 1,
      water: 5,
      flour: 5,
      desc: "A high feed ratio gives the seed more flour and water relative to its starting mass. Check the culture before relying on an overnight schedule.",
      timingNote: "High feed amount",
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
          Scale the seed, water, and flour toward a target amount. The peak-time range is only a planning estimate; follow your starter&rsquo;s rise and texture.
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
                  {ratios[ratioKey].timingNote}
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
            <span>Rough peak-time estimate:</span>
            <span className="font-bold text-foreground font-mono">{feedResult.estimatedPeakHours}</span>
          </div>
          <p className="text-xs leading-relaxed text-foreground-subtle">
            This is a broad starting window, not a timer or guarantee. Starter maturity and activity, flour, water, and actual starter temperature can shift the peak substantially. Watch for expansion, bubbles, and a top that is just reaching its highest point. See the <Link href="/guides/starter-feeding" className="underline underline-offset-2 hover:text-foreground">starter feeding guide</Link> for the assumptions and source notes.
          </p>
        </div>
      </div>

      {/* Guide to Reading Peak Starter */}
      <section className="space-y-6 max-w-3xl mx-auto text-sm text-foreground-muted leading-relaxed">
        <h2 className="text-2xl font-bold text-foreground">How to Know When Your Starter is at Peak</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div className="p-4 rounded-xl bg-surface border border-border-subtle space-y-1">
            <strong className="text-foreground block">1. Domed to Flat Top</strong>
            <p>A dome that begins to flatten can indicate that the starter is near its high point. Rise shape is one cue; compare it with bubbles, texture, and the pattern you have observed in your own starter.</p>
          </div>
          <div className="p-4 rounded-xl bg-surface border border-border-subtle space-y-1">
            <strong className="text-foreground block">2. Sponge Webbing</strong>
            <p>Look for bubbles throughout the culture and visible expansion against a mark on the jar. The pattern varies with flour and starter consistency.</p>
          </div>
          <div className="p-4 rounded-xl bg-surface border border-border-subtle space-y-1">
            <strong className="text-foreground block">3. Pleasant Aroma</strong>
            <p>Smell can change with feeding and culture conditions. Aroma alone cannot diagnose starter health; consider rise, bubbles, and whether the culture has been maintained safely.</p>
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
