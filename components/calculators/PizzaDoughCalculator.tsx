"use client";

import { useState, useMemo } from "react";
import Link from "next/link";

interface PizzaStyleConfig {
  name: string;
  defaultHydration: number;
  defaultSalt: number;
  defaultOil: number;
  defaultSugar: number;
  defaultYeast: number;
  defaultBallWeight: number;
  description: string;
}

const PIZZA_STYLES: Record<string, PizzaStyleConfig> = {
  neapolitan: {
    name: "Neapolitan (High Heat / Wood-Fired)",
    defaultHydration: 60,
    defaultSalt: 3.0,
    defaultOil: 0,
    defaultSugar: 0,
    defaultYeast: 0.15,
    defaultBallWeight: 260,
    description: "Crisp leopard-spotted crust, baked at 850°F–950°F (450°C). Zero oil or sugar.",
  },
  ny: {
    name: "New York Style (Baking Steel / Stone)",
    defaultHydration: 65,
    defaultSalt: 2.5,
    defaultOil: 2.0,
    defaultSugar: 1.5,
    defaultYeast: 0.4,
    defaultBallWeight: 320,
    description: "Foldable slice with tender chew. Olive oil preserves moisture; sugar aids caramelization in 500°F–550°F home ovens.",
  },
  detroit: {
    name: "Detroit Style Pan / Sicilian",
    defaultHydration: 72,
    defaultSalt: 2.5,
    defaultOil: 3.0,
    defaultSugar: 1.0,
    defaultYeast: 0.5,
    defaultBallWeight: 450,
    description: "Thick, airy focaccia-like crumb with crispy cheese-crusted edges baked in a deep steel pan.",
  },
};

export default function PizzaDoughCalculatorPage() {
  const [selectedStyle, setSelectedStyle] = useState<string>("ny");
  const [ballCount, setBallCount] = useState<number>(4);
  const [ballWeight, setBallWeight] = useState<number>(320);

  // Baker's percentages
  const [hydrationPct, setHydrationPct] = useState<number>(65);
  const [saltPct, setSaltPct] = useState<number>(2.5);
  const [oilPct, setOilPct] = useState<number>(2.0);
  const [sugarPct, setSugarPct] = useState<number>(1.5);
  const [yeastPct, setYeastPct] = useState<number>(0.4);
  const [fermentType, setFermentType] = useState<"instantYeast" | "sourdough">("instantYeast");
  const [starterPct, setStarterPct] = useState<number>(15);

  const [copiedToast, setCopiedToast] = useState(false);

  // Apply style presets
  const handleStyleChange = (styleKey: string) => {
    setSelectedStyle(styleKey);
    const cfg = PIZZA_STYLES[styleKey];
    setHydrationPct(cfg.defaultHydration);
    setSaltPct(cfg.defaultSalt);
    setOilPct(cfg.defaultOil);
    setSugarPct(cfg.defaultSugar);
    setYeastPct(cfg.defaultYeast);
    setBallWeight(cfg.defaultBallWeight);
  };

  // Mathematical formulation
  const totalDoughGrams = ballCount * ballWeight;

  const results = useMemo(() => {
    // Multiplier = 1 + (Hydration + Salt + Oil + Sugar + Yeast/Starter) / 100
    const yeastContribution = fermentType === "instantYeast" ? yeastPct : starterPct;
    const multiplier = 1 + (hydrationPct + saltPct + oilPct + sugarPct + yeastContribution) / 100;
    const baseFlour = totalDoughGrams / multiplier;

    const water = baseFlour * (hydrationPct / 100);
    const salt = baseFlour * (saltPct / 100);
    const oil = baseFlour * (oilPct / 100);
    const sugar = baseFlour * (sugarPct / 100);
    const yeast = fermentType === "instantYeast" ? baseFlour * (yeastPct / 100) : 0;
    const starter = fermentType === "sourdough" ? baseFlour * (starterPct / 100) : 0;

    return {
      baseFlour: Math.round(baseFlour),
      water: Math.round(water),
      salt: Number(salt.toFixed(1)),
      oil: Number(oil.toFixed(1)),
      sugar: Number(sugar.toFixed(1)),
      yeast: Number(yeast.toFixed(2)),
      starter: Math.round(starter),
      totalDough: totalDoughGrams,
      ballCount,
      ballWeight,
    };
  }, [
    totalDoughGrams,
    hydrationPct,
    saltPct,
    oilPct,
    sugarPct,
    yeastPct,
    starterPct,
    fermentType,
    ballCount,
    ballWeight,
  ]);

  const handleCopy = () => {
    const text = `=== ${PIZZA_STYLES[selectedStyle].name} Formula ===
Total Dough: ${results.totalDough}g (${ballCount} dough balls @ ${ballWeight}g each)

• Flour: ${results.baseFlour}g (100%)
• Water: ${results.water}g (${hydrationPct}%)
• Salt: ${results.salt}g (${saltPct}%)
${results.oil > 0 ? `• Olive Oil: ${results.oil}g (${oilPct}%)\n` : ""}${results.sugar > 0 ? `• Sugar: ${results.sugar}g (${sugarPct}%)\n` : ""}${fermentType === "instantYeast" ? `• Instant Yeast: ${results.yeast}g (${yeastPct}%)` : `• Sourdough Starter: ${results.starter}g (${starterPct}%)`}

Calculated with BakerPercent`;

    navigator.clipboard.writeText(text);
    setCopiedToast(true);
    setTimeout(() => setCopiedToast(false), 2500);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 sm:py-12">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-10">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-crust-soft text-crust-primary border border-crust-border mb-3">
          <span>🍕 Professional Pizza Math</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight">
          Pizza Dough Calculator
        </h1>
        <p className="mt-2 text-sm sm:text-base text-foreground-muted leading-relaxed">
          Scale dough balls for Neapolitan, New York style, or Detroit pan pizza. Precise baker&rsquo;s percentages for home ovens or high-heat pizza ovens.
        </p>
      </div>

      {/* Style Presets */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-8">
        {Object.entries(PIZZA_STYLES).map(([key, cfg]) => {
          const isSelected = selectedStyle === key;
          return (
            <button
              key={key}
              type="button"
              onClick={() => handleStyleChange(key)}
              className={`p-4 rounded-xl border text-left transition-all ${
                isSelected
                  ? "bg-surface border-crust-primary shadow-sm ring-1 ring-crust-primary"
                  : "bg-surface/50 border-border-subtle hover:border-border-strong hover:bg-surface"
              }`}
            >
              <div className="font-bold text-sm text-foreground flex items-center justify-between mb-1">
                <span>{cfg.name}</span>
                {isSelected && <span className="text-xs text-crust-primary">● Active</span>}
              </div>
              <p className="text-xs text-foreground-subtle leading-relaxed">{cfg.description}</p>
            </button>
          );
        })}
      </div>

      {/* Calculator Body */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
        {/* Controls (7 cols) */}
        <div className="lg:col-span-7 bg-surface rounded-2xl border border-border-subtle p-5 sm:p-6 space-y-6">
          <h2 className="text-base font-bold text-foreground pb-3 border-b border-border-subtle">
            Batch Size &amp; Dough Ball Dimensions
          </h2>

          {/* Ball Steppers */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-foreground mb-1.5">Number of Dough Balls</label>
              <div className="flex items-center gap-2">
                {[1, 2, 3, 4, 6, 8].map((num) => (
                  <button
                    key={num}
                    type="button"
                    onClick={() => setBallCount(num)}
                    className={`w-8 h-8 rounded-lg text-xs font-semibold border transition-all ${
                      ballCount === num
                        ? "bg-crust-primary text-white border-crust-primary shadow-2xs"
                        : "bg-surface text-foreground-muted border-border-subtle hover:border-border-strong"
                    }`}
                  >
                    {num}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="font-semibold text-foreground">Ball Weight (g)</span>
                <span className="font-mono font-bold text-crust-primary">{ballWeight}g</span>
              </div>
              <input
                type="range"
                min="180"
                max="500"
                step="10"
                value={ballWeight}
                onChange={(e) => setBallWeight(Number(e.target.value))}
                className="w-full h-2 rounded-lg bg-surface-subtle cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-foreground-subtle mt-0.5">
                <span>10&quot; (200g)</span>
                <span>12&quot; (260g)</span>
                <span>14&quot; (320g)</span>
                <span>Pan (450g)</span>
              </div>
            </div>
          </div>

          <h2 className="text-base font-bold text-foreground pt-4 pb-2 border-b border-border-subtle">
            Formula Baker&rsquo;s Percentages
          </h2>

          {/* Sliders Grid */}
          <div className="space-y-4 text-xs">
            <div>
              <div className="flex justify-between mb-1">
                <span className="font-semibold text-foreground">Hydration</span>
                <span className="font-mono font-bold text-foreground">{hydrationPct}%</span>
              </div>
              <input
                type="range"
                min="55"
                max="80"
                step="1"
                value={hydrationPct}
                onChange={(e) => setHydrationPct(Number(e.target.value))}
                className="w-full h-1.5 rounded-lg bg-surface-subtle cursor-pointer"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="font-semibold text-foreground">Salt</span>
                  <span className="font-mono font-bold text-foreground">{saltPct}%</span>
                </div>
                <input
                  type="range"
                  min="1.5"
                  max="3.5"
                  step="0.1"
                  value={saltPct}
                  onChange={(e) => setSaltPct(Number(e.target.value))}
                  className="w-full h-1.5 rounded-lg bg-surface-subtle cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between mb-1">
                  <span className="font-semibold text-foreground">Olive Oil</span>
                  <span className="font-mono font-bold text-foreground">{oilPct}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="6"
                  step="0.5"
                  value={oilPct}
                  onChange={(e) => setOilPct(Number(e.target.value))}
                  className="w-full h-1.5 rounded-lg bg-surface-subtle cursor-pointer"
                />
              </div>
            </div>

            {/* Leavening Switch */}
            <div className="pt-2">
              <label className="block font-semibold text-foreground mb-1.5">Leavening Agent</label>
              <div className="inline-flex rounded-lg border border-border-subtle p-0.5 bg-surface-subtle mb-3">
                <button
                  type="button"
                  onClick={() => setFermentType("instantYeast")}
                  className={`px-3 py-1 rounded-md transition-colors ${
                    fermentType === "instantYeast"
                      ? "bg-surface text-foreground font-semibold shadow-2xs"
                      : "text-foreground-muted hover:text-foreground"
                  }`}
                >
                  Instant Dry Yeast
                </button>
                <button
                  type="button"
                  onClick={() => setFermentType("sourdough")}
                  className={`px-3 py-1 rounded-md transition-colors ${
                    fermentType === "sourdough"
                      ? "bg-surface text-foreground font-semibold shadow-2xs"
                      : "text-foreground-muted hover:text-foreground"
                  }`}
                >
                  Sourdough Starter
                </button>
              </div>

              {fermentType === "instantYeast" ? (
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-foreground-muted">Instant Dry Yeast</span>
                    <span className="font-mono font-bold text-foreground">{yeastPct}%</span>
                  </div>
                  <input
                    type="range"
                    min="0.1"
                    max="1.5"
                    step="0.05"
                    value={yeastPct}
                    onChange={(e) => setYeastPct(Number(e.target.value))}
                    className="w-full h-1.5 rounded-lg bg-surface-subtle cursor-pointer"
                  />
                  <div className="text-[10px] text-foreground-subtle mt-0.5">
                    Use 0.15%–0.3% for 24–72 hour cold ferment in refrigerator.
                  </div>
                </div>
              ) : (
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-foreground-muted">Sourdough Starter</span>
                    <span className="font-mono font-bold text-wheat-gold">{starterPct}%</span>
                  </div>
                  <input
                    type="range"
                    min="5"
                    max="30"
                    step="1"
                    value={starterPct}
                    onChange={(e) => setStarterPct(Number(e.target.value))}
                    className="w-full h-1.5 rounded-lg bg-surface-subtle cursor-pointer"
                  />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Output Formulation Card (5 cols) */}
        <div className="lg:col-span-5 bg-surface rounded-2xl border-2 border-crust-primary/30 p-5 sm:p-6 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-border-subtle">
              <div>
                <h3 className="font-bold text-foreground text-lg">Batch Formula</h3>
                <p className="text-xs text-foreground-muted">
                  {ballCount} balls × {ballWeight}g = {results.totalDough}g Total
                </p>
              </div>
              <button
                onClick={handleCopy}
                type="button"
                className="px-2.5 py-1 text-xs font-semibold rounded-lg bg-surface-subtle hover:bg-surface border border-border-subtle text-foreground"
              >
                {copiedToast ? "Copied!" : "Copy"}
              </button>
            </div>

            <div className="divide-y divide-border-subtle text-sm mt-3">
              <div className="py-2.5 flex justify-between">
                <span className="font-semibold text-foreground">Flour (00 or Bread)</span>
                <span className="font-mono font-bold text-foreground">{results.baseFlour} g</span>
              </div>
              <div className="py-2.5 flex justify-between">
                <span className="text-foreground">Water</span>
                <span className="font-mono font-bold text-foreground">{results.water} g</span>
              </div>
              <div className="py-2.5 flex justify-between">
                <span className="text-foreground">Fine Salt</span>
                <span className="font-mono font-bold text-foreground">{results.salt} g</span>
              </div>
              {results.oil > 0 && (
                <div className="py-2.5 flex justify-between">
                  <span className="text-foreground">Extra Virgin Olive Oil</span>
                  <span className="font-mono font-bold text-foreground">{results.oil} g</span>
                </div>
              )}
              {results.sugar > 0 && (
                <div className="py-2.5 flex justify-between">
                  <span className="text-foreground">Sugar / Honey</span>
                  <span className="font-mono font-bold text-foreground">{results.sugar} g</span>
                </div>
              )}
              {fermentType === "instantYeast" ? (
                <div className="py-2.5 flex justify-between">
                  <span className="text-foreground">Instant Dry Yeast</span>
                  <span className="font-mono font-bold text-foreground">{results.yeast} g</span>
                </div>
              ) : (
                <div className="py-2.5 flex justify-between">
                  <span className="text-foreground">Sourdough Starter</span>
                  <span className="font-mono font-bold text-wheat-gold">{results.starter} g</span>
                </div>
              )}
              <div className="py-3 flex justify-between font-bold bg-surface-subtle/60 px-3 rounded-lg mt-2">
                <span>Total Dough Weight</span>
                <span className="font-mono text-crust-primary">{results.totalDough} g</span>
              </div>
            </div>
          </div>

          <div className="mt-6 p-3.5 rounded-xl bg-wheat-soft border border-wheat-gold/30 text-xs text-foreground-muted space-y-1">
            <span className="font-bold text-foreground block">💡 Pro Fermentation Tip:</span>
            <span>
              Mix, knead until smooth, rest for 2 hours at room temp, portion into {ballCount} balls, and place in oiled containers in the fridge for 24 to 72 hours for maximum flavor and blistered crust.
            </span>
          </div>
        </div>
      </div>

      {/* Educational Pizza Science Section */}
      <section className="space-y-8 border-t border-border-subtle pt-12 max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold text-foreground">The Science of Pizza Dough Hydration</h2>
        <div className="space-y-4 text-sm text-foreground-muted leading-relaxed">
          <p>
            The secret to pizzeria-quality pizza at home is matching your dough hydration to your oven&rsquo;s maximum temperature. 
          </p>
          <ul className="list-disc list-inside space-y-2 ml-2">
            <li>
              <strong>Neapolitan (60% Hydration):</strong> Designed for 900°F (480°C) wood-fired ovens. At such intense heat, pizzas bake in 60–90 seconds. Higher hydration would result in a gummy, undercooked center.
            </li>
            <li>
              <strong>New York Style (65% Hydration + Oil &amp; Sugar):</strong> Standard home ovens max out around 500°F–550°F (260°C–285°C), taking 5–8 minutes to bake on a preheated baking steel. Adding 2% olive oil coats gluten strands to keep the crust supple, while 1.5% sugar prevents pale crusts by caramelizing at lower home temperatures.
            </li>
            <li>
              <strong>Detroit / Pan Style (70%–75% Hydration):</strong> High water content creates massive steam pockets during baking, producing an airy, light focaccia texture under heavy Wisconsin brick cheese and red sauce.
            </li>
          </ul>
        </div>

        <div className="p-5 rounded-2xl bg-surface border border-border-subtle flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h3 className="font-bold text-sm text-foreground">Baking sourdough bread too?</h3>
            <p className="text-xs text-foreground-muted">Switch back to our flagship sourdough calculator with reverse loaf scaling.</p>
          </div>
          <Link
            href="/"
            className="px-4 py-2 rounded-lg bg-crust-primary text-white text-xs font-semibold hover:bg-crust-hover transition-colors"
          >
            Open Sourdough Calculator
          </Link>
        </div>
      </section>
    </div>
  );
}
