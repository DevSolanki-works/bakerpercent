/**
 * BakerPercent Calculation Engine
 * 
 * Centralized, deterministic mathematics for baker's percentage,
 * reverse loaf scaling, starter hydration decomposition,
 * multi-flour blending, and ambient temperature fermentation curves.
 */

export interface FlourBlend {
  breadFlourPct: number; // e.g. 80
  wholeWheatPct: number; // e.g. 15
  ryePct: number;        // e.g. 5
}

export interface SourdoughInputs {
  mode: 'reverse' | 'forward'; // 'reverse' scales from total dough, 'forward' from flour
  // Reverse mode inputs:
  loafCount: number;         // e.g. 2
  loafWeightGrams: number;   // e.g. 850 (total dough = 1700g)
  // Forward mode input:
  baseFlourGrams: number;    // e.g. 1000
  // Baker's percentages relative to base flour:
  hydrationPct: number;      // e.g. 75 (%)
  starterPct: number;        // e.g. 20 (%)
  saltPct: number;           // e.g. 2.0 (%)
  yeastPct?: number;         // optional commercial yeast e.g. 0 (%)
  starterHydrationPct?: number; // default 100% (50/50 water & flour)
  flourBlend: FlourBlend;
}

export interface SourdoughOutputs {
  totalDoughGrams: number;
  baseFlourGrams: number;
  addedWaterGrams: number;
  starterGrams: number;
  saltGrams: number;
  yeastGrams: number;
  // Flour blend breakdown in grams
  flourBlendGrams: {
    breadFlour: number;
    wholeWheat: number;
    rye: number;
  };
  // Decomposed starter contribution
  starterFlourGrams: number;
  starterWaterGrams: number;
  // True total formulation accounting for starter
  totalFlourGrams: number;
  totalWaterGrams: number;
  trueHydrationPct: number;
  // Baker's percentage checks
  bakersPercentages: {
    flour: 100;
    hydration: number;
    starter: number;
    salt: number;
    yeast: number;
  };
}

/**
 * Calculates complete sourdough ingredient weights from inputs.
 */
export function calculateSourdough(inputs: SourdoughInputs): SourdoughOutputs {
  const hydrationPct = Math.max(40, Math.min(100, inputs.hydrationPct));
  const starterPct = Math.max(0, Math.min(50, inputs.starterPct));
  const saltPct = Math.max(0.5, Math.min(5, inputs.saltPct));
  const yeastPct = Math.max(0, Math.min(5, inputs.yeastPct || 0));
  const starterHydrationPct = inputs.starterHydrationPct ?? 100;

  // Baker's multiplier: 1 + (H/100) + (S/100) + (Salt/100) + (Yeast/100)
  const multiplier = 1 + (hydrationPct / 100) + (starterPct / 100) + (saltPct / 100) + (yeastPct / 100);

  let baseFlourGrams: number;
  let totalDoughGrams: number;

  if (inputs.mode === 'reverse') {
    const loafCount = Math.max(1, Math.round(inputs.loafCount || 1));
    const loafWeight = Math.max(100, Math.round(inputs.loafWeightGrams || 500));
    totalDoughGrams = loafCount * loafWeight;
    baseFlourGrams = totalDoughGrams / multiplier;
  } else {
    baseFlourGrams = Math.max(50, inputs.baseFlourGrams || 500);
    totalDoughGrams = baseFlourGrams * multiplier;
  }

  // Derive component weights
  const addedWaterGrams = baseFlourGrams * (hydrationPct / 100);
  const starterGrams = baseFlourGrams * (starterPct / 100);
  const saltGrams = baseFlourGrams * (saltPct / 100);
  const yeastGrams = baseFlourGrams * (yeastPct / 100);

  // Decompose starter into flour and water
  // Starter hydration: water / flour = H_s. Total starter = flour + water = flour * (1 + H_s)
  // Therefore: flour = starter / (1 + H_s), water = starter - flour
  const sHydrationDecimal = starterHydrationPct / 100;
  const starterFlourGrams = starterGrams > 0 ? starterGrams / (1 + sHydrationDecimal) : 0;
  const starterWaterGrams = starterGrams - starterFlourGrams;

  // True total flour and water
  const totalFlourGrams = baseFlourGrams + starterFlourGrams;
  const totalWaterGrams = addedWaterGrams + starterWaterGrams;
  const trueHydrationPct = totalFlourGrams > 0 ? (totalWaterGrams / totalFlourGrams) * 100 : hydrationPct;

  // Flour blend distribution
  const blend = normalizeFlourBlend(inputs.flourBlend);
  const breadFlour = Math.round(baseFlourGrams * (blend.breadFlourPct / 100));
  const wholeWheat = Math.round(baseFlourGrams * (blend.wholeWheatPct / 100));
  const rye = Math.max(0, Math.round(baseFlourGrams) - breadFlour - wholeWheat); // ensure sum equals baseFlour

  return {
    totalDoughGrams: Math.round(totalDoughGrams),
    baseFlourGrams: Math.round(baseFlourGrams),
    addedWaterGrams: Math.round(addedWaterGrams),
    starterGrams: Math.round(starterGrams),
    saltGrams: Number(saltGrams.toFixed(1)),
    yeastGrams: Number(yeastGrams.toFixed(1)),
    flourBlendGrams: {
      breadFlour,
      wholeWheat,
      rye,
    },
    starterFlourGrams: Math.round(starterFlourGrams),
    starterWaterGrams: Math.round(starterWaterGrams),
    totalFlourGrams: Math.round(totalFlourGrams),
    totalWaterGrams: Math.round(totalWaterGrams),
    trueHydrationPct: Number(trueHydrationPct.toFixed(1)),
    bakersPercentages: {
      flour: 100,
      hydration: Number(hydrationPct.toFixed(1)),
      starter: Number(starterPct.toFixed(1)),
      salt: Number(saltPct.toFixed(1)),
      yeast: Number(yeastPct.toFixed(1)),
    },
  };
}

/**
 * Normalizes flour blend percentages to ensure they total 100%.
 */
export function normalizeFlourBlend(blend: FlourBlend): FlourBlend {
  const total = blend.breadFlourPct + blend.wholeWheatPct + blend.ryePct;
  if (total <= 0) {
    return { breadFlourPct: 100, wholeWheatPct: 0, ryePct: 0 };
  }
  return {
    breadFlourPct: Number(((blend.breadFlourPct / total) * 100).toFixed(1)),
    wholeWheatPct: Number(((blend.wholeWheatPct / total) * 100).toFixed(1)),
    ryePct: Number(((blend.ryePct / total) * 100).toFixed(1)),
  };
}

/**
 * Ambient Temperature Bulk Fermentation Estimator
 * 
 * Fermentation kinetics baseline:
 * At 75°F (24°C) with 20% starter inoculation: typical bulk fermentation takes ~4.5 - 5.5 hours.
 * Every 5°F (2.8°C) change shifts rate by ~25-35%.
 * Starter inoculation percentage inversely affects time.
 */
export interface FermentationEstimate {
  tempCelsius: number;
  tempFahrenheit: number;
  minHours: number;
  maxHours: number;
  targetVolumeRisePct: number; // e.g. 50% to 75%
  visualCues: string[];
}

export function estimateBulkFermentation(tempCelsius: number, starterPct: number): FermentationEstimate {
  const c = Math.max(16, Math.min(32, tempCelsius));
  const f = Math.round((c * 9) / 5 + 32);
  const s = Math.max(5, Math.min(40, starterPct));

  // Baseline at 24°C (75°F) with 20% starter is ~5.0 hours
  // Q10 temperature coefficient approximation for sourdough kinetics (~2.1)
  const tempFactor = Math.pow(2.1, (24 - c) / 10);
  const starterFactor = 20 / s;

  const baseHours = 5.0 * tempFactor * Math.sqrt(starterFactor);
  const minHours = Number(Math.max(1.5, baseHours * 0.85).toFixed(1));
  const maxHours = Number(Math.max(2.0, baseHours * 1.2).toFixed(1));

  // Higher temperatures require lower volume rises to avoid overproofing
  let targetRise = 60;
  if (c >= 27) targetRise = 45; // Warm dough ferments fast during shaping
  else if (c <= 20) targetRise = 75; // Cold dough needs more volume before fridge

  const cues = [
    `Target dough volume rise: approximately ${targetRise}% (do not wait for 100% doubling)`,
    "Surface is slightly domed with smooth, semi-translucent skin",
    "Visible small fermentation bubbles underneath surface and along container walls",
    "Gentle bowl shake reveals a soft, aerated, gelatinous jiggle",
    "Dough releases cleanly from container edges when tipped",
  ];

  return {
    tempCelsius: Math.round(c),
    tempFahrenheit: f,
    minHours,
    maxHours,
    targetVolumeRisePct: targetRise,
    visualCues: cues,
  };
}

/**
 * Starter Feeding & Maintenance Calculator
 */
export interface StarterFeedResult {
  starterSeedGrams: number;
  waterGrams: number;
  flourGrams: number;
  totalStarterGrams: number;
  ratioLabel: string;
  estimatedPeakHours: string;
}

export function calculateStarterFeed(
  targetGrams: number,
  ratioParts: { seed: number; water: number; flour: number },
  tempCelsius = 22
): StarterFeedResult {
  const totalParts = ratioParts.seed + ratioParts.water + ratioParts.flour;
  const partWeight = targetGrams / totalParts;

  const starterSeedGrams = Math.round(partWeight * ratioParts.seed);
  const waterGrams = Math.round(partWeight * ratioParts.water);
  const flourGrams = Math.round(targetGrams - starterSeedGrams - waterGrams);

  let peakMin = 4;
  let peakMax = 6;
  const ratioMultiple = ratioParts.flour / ratioParts.seed;

  if (ratioMultiple <= 1) { // 1:1:1
    peakMin = tempCelsius >= 25 ? 3 : 4;
    peakMax = tempCelsius >= 25 ? 5 : 6;
  } else if (ratioMultiple <= 3) { // 1:2:2
    peakMin = tempCelsius >= 25 ? 5 : 6;
    peakMax = tempCelsius >= 25 ? 7 : 9;
  } else { // 1:5:5 or higher
    peakMin = tempCelsius >= 25 ? 8 : 10;
    peakMax = tempCelsius >= 25 ? 12 : 14;
  }

  return {
    starterSeedGrams,
    waterGrams,
    flourGrams,
    totalStarterGrams: starterSeedGrams + waterGrams + flourGrams,
    ratioLabel: `1:${ratioParts.water / ratioParts.seed}:${ratioParts.flour / ratioParts.seed}`,
    estimatedPeakHours: `${peakMin}–${peakMax} hours`,
  };
}

/**
 * Generates formatted text recipe summary for copy/share
 */
export function formatRecipeText(outputs: SourdoughOutputs, recipeName = "Artisan Sourdough"): string {
  const b = outputs.bakersPercentages;
  return `=== ${recipeName} (BakerPercent) ===
Total Dough: ${outputs.totalDoughGrams}g | True Hydration: ${outputs.trueHydrationPct}%

INGREDIENTS:
• Flour: ${outputs.baseFlourGrams}g (${b.flour}%)
  - Bread Flour: ${outputs.flourBlendGrams.breadFlour}g
  - Whole Wheat: ${outputs.flourBlendGrams.wholeWheat}g
  - Rye: ${outputs.flourBlendGrams.rye}g
• Water: ${outputs.addedWaterGrams}g (${b.hydration}%)
• Sourdough Starter: ${outputs.starterGrams}g (${b.starter}%)
• Salt: ${outputs.saltGrams}g (${b.salt}%)
${outputs.yeastGrams > 0 ? `• Yeast: ${outputs.yeastGrams}g (${b.yeast}%)\n` : ''}
TRUE HYDRATION BREAKDOWN:
Total Flour (including starter): ${outputs.totalFlourGrams}g
Total Water (including starter): ${outputs.totalWaterGrams}g
True Total Hydration: ${outputs.trueHydrationPct}%

Calculated via BakerPercent`;
}
