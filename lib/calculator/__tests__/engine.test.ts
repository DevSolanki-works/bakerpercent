import { describe, it } from "node:test";
import assert from "node:assert/strict";
import {
  calculateSourdough,
  estimateBulkFermentation,
  calculateStarterFeed,
  normalizeFlourBlend,
} from "../engine.ts";

describe("BakerPercent Calculation Engine", () => {
  it("calculates reverse mode accurately from target loaf count and weight", () => {
    // 2 loaves at 850g each = 1700g total dough
    const res = calculateSourdough({
      mode: "reverse",
      loafCount: 2,
      loafWeightGrams: 850,
      baseFlourGrams: 0,
      hydrationPct: 75,
      starterPct: 20,
      saltPct: 2,
      flourBlend: { breadFlourPct: 80, wholeWheatPct: 15, ryePct: 5 },
    });

    // Multiplier = 1 + 0.75 + 0.20 + 0.02 = 1.97
    // Base flour = 1700 / 1.97 = ~862.94 -> 863g
    assert.equal(res.totalDoughGrams, 1700);
    assert.equal(res.baseFlourGrams, 863);
    assert.equal(res.addedWaterGrams, 647);
    assert.equal(res.starterGrams, 173);
    assert.equal(res.saltGrams, 17.3);

    // Sum of components should closely equal total dough weight
    const sum = res.baseFlourGrams + res.addedWaterGrams + res.starterGrams + res.saltGrams;
    assert.ok(Math.abs(sum - 1700) <= 2, `Sum ${sum} should be within 2g of 1700`);

    // True hydration check:
    // Starter has 86.5g water + 86.5g flour
    // Total flour = 863 + 86 = 949g
    // Total water = 647 + 86 = 733g
    // 733 / 949 = ~77.2%
    assert.equal(res.trueHydrationPct, 77.3);

    // Flour blend check:
    // 80% of 863 = 690g, 15% = 129g, 5% = 44g
    assert.equal(
      res.flourBlendGrams.breadFlour + res.flourBlendGrams.wholeWheat + res.flourBlendGrams.rye,
      res.baseFlourGrams
    );
  });

  it("calculates forward mode accurately from base flour", () => {
    // 1000g flour at 70% hydration, 20% starter, 2% salt
    const res = calculateSourdough({
      mode: "forward",
      loafCount: 1,
      loafWeightGrams: 0,
      baseFlourGrams: 1000,
      hydrationPct: 70,
      starterPct: 20,
      saltPct: 2,
      flourBlend: { breadFlourPct: 100, wholeWheatPct: 0, ryePct: 0 },
    });

    assert.equal(res.baseFlourGrams, 1000);
    assert.equal(res.addedWaterGrams, 700);
    assert.equal(res.starterGrams, 200);
    assert.equal(res.saltGrams, 20);
    assert.equal(res.totalDoughGrams, 1920);

    // Starter contributes 100g flour and 100g water
    // Total flour = 1100g, Total water = 800g
    // True hydration = 800 / 1100 = 72.7%
    assert.equal(res.trueHydrationPct, 72.7);
  });

  it("normalizes flour blends that do not sum to 100", () => {
    const blend = normalizeFlourBlend({
      breadFlourPct: 40,
      wholeWheatPct: 10,
      ryePct: 0, // total 50
    });
    assert.equal(blend.breadFlourPct, 80);
    assert.equal(blend.wholeWheatPct, 20);
    assert.equal(blend.ryePct, 0);
  });

  it("estimates bulk fermentation correctly based on temperature", () => {
    const warm = estimateBulkFermentation(26, 20); // 26°C / ~79°F
    const cold = estimateBulkFermentation(19, 20); // 19°C / ~66°F

    assert.ok(warm.minHours < cold.minHours, "Warm dough should ferment faster than cold dough");
    assert.ok(warm.targetVolumeRisePct < cold.targetVolumeRisePct, "Warm dough should have lower target rise to avoid overproofing");
  });

  it("calculates starter feed quantities for 1:2:2 ratio", () => {
    // Target 150g total starter with 1:2:2 ratio (1 part seed, 2 parts water, 2 parts flour = 5 parts)
    const feed = calculateStarterFeed(150, { seed: 1, water: 2, flour: 2 }, 22);

    // Each part is 30g
    assert.equal(feed.starterSeedGrams, 30);
    assert.equal(feed.waterGrams, 60);
    assert.equal(feed.flourGrams, 60);
    assert.equal(feed.totalStarterGrams, 150);
  });
});
