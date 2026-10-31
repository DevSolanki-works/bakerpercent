"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import {
  calculateSourdough,
  estimateBulkFermentation,
  formatRecipeText,
  SourdoughInputs,
  FlourBlend,
} from "@/lib/calculator/engine";
import { trackAnalyticsEvent } from "@/components/GoogleAnalytics";

interface RecipePreset {
  id: string;
  name: string;
  icon: string;
  badge: string;
  hydration: number;
  starter: number;
  salt: number;
  bread: number;
  wheat: number;
  rye: number;
  loafCount: number;
  loafWeight: number;
}

const POPULAR_PRESETS: RecipePreset[] = [
  {
    id: "classic",
    name: "Classic Country",
    icon: "🥖",
    badge: "75% Hydration • Balanced",
    hydration: 75,
    starter: 20,
    salt: 2.0,
    bread: 80,
    wheat: 20,
    rye: 0,
    loafCount: 2,
    loafWeight: 850,
  },
  {
    id: "beginner",
    name: "Beginner Friendly",
    icon: "🍞",
    badge: "68% Hydration • Easy Shaping",
    hydration: 68,
    starter: 20,
    salt: 2.0,
    bread: 100,
    wheat: 0,
    rye: 0,
    loafCount: 2,
    loafWeight: 750,
  },
  {
    id: "open-crumb",
    name: "Open Crumb Tartine",
    icon: "🫧",
    badge: "80% Hydration • Custardy",
    hydration: 80,
    starter: 20,
    salt: 2.0,
    bread: 90,
    wheat: 10,
    rye: 0,
    loafCount: 2,
    loafWeight: 900,
  },
  {
    id: "rustic",
    name: "Rustic Whole Grain",
    icon: "🌾",
    badge: "78% Hydration • High Flavor",
    hydration: 78,
    starter: 20,
    salt: 2.2,
    bread: 50,
    wheat: 40,
    rye: 10,
    loafCount: 2,
    loafWeight: 850,
  },
];

export function SourdoughCalculator() {
  // Mode: Reverse (target loaves) vs Forward (base flour)
  const [mode, setMode] = useState<"reverse" | "forward">("reverse");
  const [loafCount, setLoafCount] = useState<number>(2);
  const [loafWeightGrams, setLoafWeightGrams] = useState<number>(850);
  const [baseFlourGrams, setBaseFlourGrams] = useState<number>(1000);

  // Baker's percentages
  const [hydrationPct, setHydrationPct] = useState<number>(75);
  const [starterPct, setStarterPct] = useState<number>(20);
  const [saltPct, setSaltPct] = useState<number>(2.0);
  const [yeastPct, setYeastPct] = useState<number>(0);

  // Flour blend
  const [breadFlourPct, setBreadFlourPct] = useState<number>(80);
  const [wholeWheatPct, setWholeWheatPct] = useState<number>(15);
  const [ryePct, setRyePct] = useState<number>(5);

  // Ambient temperature assistant
  const [tempCelsius, setTempCelsius] = useState<number>(24);
  const [tempUnit, setTempUnit] = useState<"C" | "F">("F");

  // UI state: Simple vs Detailed View
  const [showAdvanced, setShowAdvanced] = useState<boolean>(false);
  const [activePreset, setActivePreset] = useState<string>("classic");

  // Units: metric grams vs imperial ounces
  const [unit, setUnit] = useState<"grams" | "ounces">("grams");
  const [copiedToast, setCopiedToast] = useState(false);

  // Load saved recipe from localStorage on mount (deferred to avoid React 19 cascading render lint)
  useEffect(() => {
    const timer = setTimeout(() => {
      try {
        const saved =
          localStorage.getItem("bakerpercent_recipe_v1") ??
          localStorage.getItem("doughratio_recipe_v1");
        if (saved) {
          const data = JSON.parse(saved);
          if (data.mode) setMode(data.mode);
          if (data.loafCount) setLoafCount(data.loafCount);
          if (data.loafWeightGrams) setLoafWeightGrams(data.loafWeightGrams);
          if (data.baseFlourGrams) setBaseFlourGrams(data.baseFlourGrams);
          if (data.hydrationPct) setHydrationPct(data.hydrationPct);
          if (data.starterPct) setStarterPct(data.starterPct);
          if (data.saltPct) setSaltPct(data.saltPct);
          if (data.breadFlourPct !== undefined) setBreadFlourPct(data.breadFlourPct);
          if (data.wholeWheatPct !== undefined) setWholeWheatPct(data.wholeWheatPct);
          if (data.ryePct !== undefined) setRyePct(data.ryePct);
          if (data.tempCelsius) setTempCelsius(data.tempCelsius);
        }
      } catch {
        // Ignore localStorage read errors
      }
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  // Save to localStorage when state changes
  useEffect(() => {
    try {
      const state = {
        mode,
        loafCount,
        loafWeightGrams,
        baseFlourGrams,
        hydrationPct,
        starterPct,
        saltPct,
        breadFlourPct,
        wholeWheatPct,
        ryePct,
        tempCelsius,
      };
      localStorage.setItem("bakerpercent_recipe_v1", JSON.stringify(state));
    } catch {
      // Ignore localStorage write errors
    }
  }, [
    mode,
    loafCount,
    loafWeightGrams,
    baseFlourGrams,
    hydrationPct,
    starterPct,
    saltPct,
    breadFlourPct,
    wholeWheatPct,
    ryePct,
    tempCelsius,
  ]);

  // Apply one-click preset
  const applyPreset = (preset: RecipePreset) => {
    setActivePreset(preset.id);
    setHydrationPct(preset.hydration);
    setStarterPct(preset.starter);
    setSaltPct(preset.salt);
    setBreadFlourPct(preset.bread);
    setWholeWheatPct(preset.wheat);
    setRyePct(preset.rye);
    setLoafCount(preset.loafCount);
    setLoafWeightGrams(preset.loafWeight);
  };

  // Handle flour blend balancing
  const handleFlourChange = useCallback(
    (type: "bread" | "wheat" | "rye", val: number) => {
      setActivePreset("");
      const clamped = Math.max(0, Math.min(100, val));
      if (type === "bread") {
        setBreadFlourPct(clamped);
        const rem = 100 - clamped;
        const subTotal = wholeWheatPct + ryePct;
        if (subTotal === 0) {
          setWholeWheatPct(rem);
          setRyePct(0);
        } else {
          setWholeWheatPct(Math.round((wholeWheatPct / subTotal) * rem));
          setRyePct(Math.max(0, rem - Math.round((wholeWheatPct / subTotal) * rem)));
        }
      } else if (type === "wheat") {
        setWholeWheatPct(clamped);
        const rem = 100 - clamped;
        const subTotal = breadFlourPct + ryePct;
        if (subTotal === 0) {
          setBreadFlourPct(rem);
          setRyePct(0);
        } else {
          setBreadFlourPct(Math.round((breadFlourPct / subTotal) * rem));
          setRyePct(Math.max(0, rem - Math.round((breadFlourPct / subTotal) * rem)));
        }
      } else {
        setRyePct(clamped);
        const rem = 100 - clamped;
        const subTotal = breadFlourPct + wholeWheatPct;
        if (subTotal === 0) {
          setBreadFlourPct(rem);
          setWholeWheatPct(0);
        } else {
          setBreadFlourPct(Math.round((breadFlourPct / subTotal) * rem));
          setWholeWheatPct(Math.max(0, rem - Math.round((breadFlourPct / subTotal) * rem)));
        }
      }
    },
    [breadFlourPct, wholeWheatPct, ryePct]
  );

  // Compute calculated recipe
  const flourBlend: FlourBlend = useMemo(
    () => ({ breadFlourPct, wholeWheatPct, ryePct }),
    [breadFlourPct, wholeWheatPct, ryePct]
  );

  const inputs: SourdoughInputs = useMemo(
    () => ({
      mode,
      loafCount,
      loafWeightGrams,
      baseFlourGrams,
      hydrationPct,
      starterPct,
      saltPct,
      yeastPct,
      flourBlend,
    }),
    [
      mode,
      loafCount,
      loafWeightGrams,
      baseFlourGrams,
      hydrationPct,
      starterPct,
      saltPct,
      yeastPct,
      flourBlend,
    ]
  );

  const outputs = useMemo(() => calculateSourdough(inputs), [inputs]);
  const fermentation = useMemo(
    () => estimateBulkFermentation(tempCelsius, starterPct),
    [tempCelsius, starterPct]
  );

  const toDisplayWeight = (grams: number) => {
    if (unit === "ounces") {
      return `${(grams * 0.035274).toFixed(1)} oz`;
    }
    return `${grams} g`;
  };

  const handleCopyRecipe = () => {
    const text = formatRecipeText(outputs, "Artisan Country Loaf");
    navigator.clipboard.writeText(text);
    trackAnalyticsEvent("recipe_copied", { calculator: "sourdough" });
    setCopiedToast(true);
    setTimeout(() => setCopiedToast(false), 2500);
  };

  const handleReset = () => {
    applyPreset(POPULAR_PRESETS[0]);
    setMode("reverse");
    setYeastPct(0);
    setTempCelsius(24);
  };

  const triggerTimer = (minutes: number, label: string) => {
    if (typeof window !== "undefined") {
      window.dispatchEvent(
        new CustomEvent("bakerpercent:start-timer", {
          detail: { minutes, label },
        })
      );
    }
  };

  const openTimer = () => {
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("bakerpercent:open-timer"));
    }
  };

  return (
    <div className="space-y-8">
      {/* Main Configuration Card */}
      <div className="bg-surface rounded-2xl border border-border-subtle p-5 sm:p-7 shadow-sm">
        {/* Unified Top Controls: Presets + Units/Mode */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-5 border-b border-border-subtle">
          {/* Quick Preset Pills */}
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-xs font-bold text-foreground mr-1">Formula:</span>
            {POPULAR_PRESETS.map((preset) => {
              const isSelected = activePreset === preset.id;
              return (
                <button
                  key={preset.id}
                  type="button"
                  onClick={() => applyPreset(preset)}
                  className={`px-3 py-1 rounded-full text-xs transition-all cursor-pointer ${
                    isSelected
                      ? "bg-crust-primary text-white shadow-2xs font-semibold"
                      : "bg-surface-subtle text-foreground-muted hover:text-foreground hover:bg-border-subtle/50 border border-border-subtle"
                  }`}
                >
                  <span>{preset.icon}</span>{" "}
                  <span>{preset.name}</span>{" "}
                  <span className="opacity-75 font-mono text-[11px]">({preset.hydration}%)</span>
                </button>
              );
            })}
          </div>

          <div className="flex items-center gap-2 self-start lg:self-auto">
            {/* Units Toggle */}
            <div className="inline-flex rounded-lg border border-border-subtle p-0.5 bg-surface-subtle text-xs">
              <button
                type="button"
                onClick={() => setUnit("grams")}
                className={`px-2.5 py-1 rounded-md font-medium transition-colors cursor-pointer ${
                  unit === "grams"
                    ? "bg-surface text-foreground shadow-2xs font-semibold"
                    : "text-foreground-muted hover:text-foreground"
                }`}
              >
                Grams
              </button>
              <button
                type="button"
                onClick={() => setUnit("ounces")}
                className={`px-2.5 py-1 rounded-md font-medium transition-colors cursor-pointer ${
                  unit === "ounces"
                    ? "bg-surface text-foreground shadow-2xs font-semibold"
                    : "text-foreground-muted hover:text-foreground"
                }`}
              >
                Oz
              </button>
            </div>

            {/* Mode Switcher */}
            <div className="inline-flex rounded-lg border border-border-subtle p-0.5 bg-surface-subtle text-xs">
              <button
                type="button"
                onClick={() => setMode("reverse")}
                className={`px-3 py-1 rounded-md font-medium transition-colors cursor-pointer ${
                  mode === "reverse"
                    ? "bg-crust-primary text-white shadow-2xs font-semibold"
                    : "text-foreground-muted hover:text-foreground"
                }`}
              >
                Loaf Count
              </button>
              <button
                type="button"
                onClick={() => setMode("forward")}
                className={`px-3 py-1 rounded-md font-medium transition-colors cursor-pointer ${
                  mode === "forward"
                    ? "bg-crust-primary text-white shadow-2xs font-semibold"
                    : "text-foreground-muted hover:text-foreground"
                }`}
              >
                Flour Weight
              </button>
            </div>
          </div>
        </div>

        {/* Primary Inputs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6">
          {/* Target Yield / Flour */}
          {mode === "reverse" ? (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <label className="text-sm font-semibold text-foreground">Number of Loaves</label>
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4].map((num) => (
                    <button
                      key={num}
                      type="button"
                      onClick={() => {
                        setActivePreset("");
                        setLoafCount(num);
                      }}
                      className={`w-8 h-8 rounded-lg text-xs font-semibold border transition-all cursor-pointer ${
                        loafCount === num
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
                <div className="flex items-center justify-between text-sm mb-1.5">
                  <label htmlFor="loaf-weight" className="font-semibold text-foreground">
                    Target Weight per Loaf
                  </label>
                  <span className="font-mono text-crust-primary font-bold">
                    {toDisplayWeight(loafWeightGrams)}
                  </span>
                </div>
                <input
                  id="loaf-weight"
                  type="range"
                  min="400"
                  max="1200"
                  step="25"
                  value={loafWeightGrams}
                  onChange={(e) => {
                    setActivePreset("");
                    setLoafWeightGrams(Number(e.target.value));
                  }}
                  className="w-full h-2 rounded-lg bg-surface-subtle cursor-pointer accent-crust-primary"
                />
                <div className="flex justify-between text-[11px] text-foreground-subtle mt-1">
                  <span>Small (500g)</span>
                  <span>Standard Boule (850g)</span>
                  <span>Large Miche (1000g+)</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <label htmlFor="base-flour" className="font-semibold text-foreground">
                  Total Base Flour Weight
                </label>
                <span className="font-mono text-crust-primary font-bold">
                  {toDisplayWeight(baseFlourGrams)}
                </span>
              </div>
              <input
                id="base-flour"
                type="range"
                min="200"
                max="3000"
                step="50"
                value={baseFlourGrams}
                onChange={(e) => {
                  setActivePreset("");
                  setBaseFlourGrams(Number(e.target.value));
                }}
                className="w-full h-2 rounded-lg bg-surface-subtle cursor-pointer accent-crust-primary"
              />
              <div className="flex justify-between text-[11px] text-foreground-subtle">
                <span>500g (1 loaf)</span>
                <span>1000g (2 loaves)</span>
                <span>2000g (Batch)</span>
              </div>
            </div>
          )}

          {/* Hydration Slider */}
          <div className="space-y-3">
            <div className="flex items-center justify-between text-sm">
              <label htmlFor="hydration-slider" className="font-semibold text-foreground">
                Dough Hydration
              </label>
              <span className="font-mono text-crust-primary font-bold text-base">
                {hydrationPct}%
              </span>
            </div>
            <input
              id="hydration-slider"
              type="range"
              min="55"
              max="90"
              step="1"
              value={hydrationPct}
              onChange={(e) => {
                setActivePreset("");
                setHydrationPct(Number(e.target.value));
              }}
              className="w-full h-2 rounded-lg bg-surface-subtle cursor-pointer accent-crust-primary"
            />
            {/* Quick Hydration Chips */}
            <div className="flex items-center gap-1.5 flex-wrap">
              <button
                type="button"
                onClick={() => {
                  setActivePreset("");
                  setHydrationPct(68);
                }}
                className={`px-2 py-0.5 rounded text-[11px] border transition-colors cursor-pointer ${
                  hydrationPct === 68
                    ? "bg-crust-soft border-crust-border text-crust-primary font-semibold"
                    : "bg-surface text-foreground-subtle border-border-subtle hover:text-foreground"
                }`}
              >
                68% Beginner Easy
              </button>
              <button
                type="button"
                onClick={() => {
                  setActivePreset("");
                  setHydrationPct(75);
                }}
                className={`px-2 py-0.5 rounded text-[11px] border transition-colors cursor-pointer ${
                  hydrationPct === 75
                    ? "bg-crust-soft border-crust-border text-crust-primary font-semibold"
                    : "bg-surface text-foreground-subtle border-border-subtle hover:text-foreground"
                }`}
              >
                75% Classic
              </button>
              <button
                type="button"
                onClick={() => {
                  setActivePreset("");
                  setHydrationPct(82);
                }}
                className={`px-2 py-0.5 rounded text-[11px] border transition-colors cursor-pointer ${
                  hydrationPct === 82
                    ? "bg-crust-soft border-crust-border text-crust-primary font-semibold"
                    : "bg-surface text-foreground-subtle border-border-subtle hover:text-foreground"
                }`}
              >
                82% Open Crumb
              </button>
            </div>
          </div>
        </div>

        {/* Starter Slider */}
        <div className="pt-6 border-t border-border-subtle mt-6">
          <div className="space-y-2 max-w-xl">
            <div className="flex items-center justify-between text-sm">
              <label htmlFor="starter-slider" className="font-semibold text-foreground">
                Sourdough Starter (Levain Inoculation)
              </label>
              <span className="font-mono text-wheat-gold font-bold">{starterPct}%</span>
            </div>
            <input
              id="starter-slider"
              type="range"
              min="5"
              max="35"
              step="1"
              value={starterPct}
              onChange={(e) => {
                setActivePreset("");
                setStarterPct(Number(e.target.value));
              }}
              className="w-full h-2 rounded-lg bg-surface-subtle cursor-pointer accent-crust-primary"
            />
            <div className="flex justify-between text-[11px] text-foreground-subtle">
              <span>10% (Slow Overnight)</span>
              <span>20% (Standard 4–5 hr)</span>
              <span>30% (Fast Rise)</span>
            </div>
          </div>
        </div>

        {/* Advanced Settings Collapsible Toggle */}
        <div className="pt-4 border-t border-border-subtle mt-6">
          <button
            type="button"
            onClick={() => setShowAdvanced(!showAdvanced)}
            className="w-full flex items-center justify-between py-2 text-xs font-bold text-crust-primary hover:text-crust-hover transition-colors cursor-pointer"
          >
            <span className="flex items-center gap-1.5">
              <span>⚙️</span>
              <span>
                {showAdvanced
                  ? "Hide Advanced Adjustments (Flour Blend & Salt %)"
                  : "Customize Flour Blend (Whole Wheat / Rye) & Salt %"}
              </span>
            </span>
            <span className="font-mono text-foreground-muted">{showAdvanced ? "▲" : "▼"}</span>
          </button>

          {showAdvanced && (
            <div className="pt-4 space-y-6 animate-in fade-in duration-200">
              {/* Salt Slider */}
              <div className="space-y-2 max-w-md">
                <div className="flex items-center justify-between text-sm">
                  <label htmlFor="salt-slider" className="font-semibold text-foreground">
                    Salt Percentage
                  </label>
                  <span className="font-mono text-foreground font-bold">{saltPct}%</span>
                </div>
                <input
                  id="salt-slider"
                  type="range"
                  min="1.0"
                  max="3.0"
                  step="0.1"
                  value={saltPct}
                  onChange={(e) => {
                    setActivePreset("");
                    setSaltPct(Number(e.target.value));
                  }}
                  className="w-full h-2 rounded-lg bg-surface-subtle cursor-pointer accent-crust-primary"
                />
                <div className="flex justify-between text-[11px] text-foreground-subtle">
                  <span>1.8% Light</span>
                  <span>2.0% Standard Artisan</span>
                  <span>2.2% Savory</span>
                </div>
              </div>

              {/* Flour Blend Sliders */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-semibold text-foreground">
                    Flour Blend Composition
                  </h3>
                  <span className="text-xs text-foreground-muted font-mono">
                    Total: {breadFlourPct + wholeWheatPct + ryePct}%
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-foreground-muted font-medium">Bread Flour (White)</span>
                      <span className="font-mono font-bold text-foreground">{breadFlourPct}%</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={breadFlourPct}
                      onChange={(e) => handleFlourChange("bread", Number(e.target.value))}
                      className="w-full h-1.5 rounded-lg bg-surface-subtle cursor-pointer accent-crust-primary"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-foreground-muted font-medium">Whole Wheat</span>
                      <span className="font-mono font-bold text-foreground">{wholeWheatPct}%</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={wholeWheatPct}
                      onChange={(e) => handleFlourChange("wheat", Number(e.target.value))}
                      className="w-full h-1.5 rounded-lg bg-surface-subtle cursor-pointer accent-crust-primary"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-foreground-muted font-medium">Rye / Spelt</span>
                      <span className="font-mono font-bold text-foreground">{ryePct}%</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={ryePct}
                      onChange={(e) => handleFlourChange("rye", Number(e.target.value))}
                      className="w-full h-1.5 rounded-lg bg-surface-subtle cursor-pointer accent-crust-primary"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Primary Formulation Results Card */}
      <div className="bg-surface rounded-2xl border-2 border-crust-primary/30 p-5 sm:p-7 shadow-sm recipe-card">
        <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-border-subtle">
          <div>
            <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
              <span>Baking Formulation</span>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-crust-soft text-crust-primary font-semibold">
                {mode === "reverse"
                  ? `${loafCount} Loaves (${toDisplayWeight(loafWeightGrams)} each)`
                  : `${toDisplayWeight(outputs.totalDoughGrams)} Total Dough`}
              </span>
            </h2>
            <p className="text-xs text-foreground-muted">Precise weights ready for kitchen scales</p>
          </div>

          <div className="flex items-center gap-2 no-print">
            <button
              onClick={openTimer}
              type="button"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-crust-soft text-crust-primary hover:bg-crust-border/40 border border-crust-border transition-all cursor-pointer"
              title="Open Kitchen Timer"
            >
              <span>⏱️</span>
              <span>Kitchen Timer</span>
            </button>
            <button
              onClick={handleCopyRecipe}
              type="button"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-surface-subtle text-foreground hover:bg-surface border border-border-subtle transition-all cursor-pointer"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                />
              </svg>
              <span>{copiedToast ? "Copied!" : "Copy Formula"}</span>
            </button>
            <button
              onClick={() => window.print()}
              type="button"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-surface-subtle text-foreground hover:bg-surface border border-border-subtle transition-all cursor-pointer"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"
                />
              </svg>
              <span>Print</span>
            </button>
            <button
              onClick={handleReset}
              type="button"
              title="Reset to default recipe"
              className="px-2.5 py-1.5 rounded-lg text-xs text-foreground-subtle hover:text-foreground hover:bg-surface-subtle border border-border-subtle cursor-pointer"
            >
              Reset
            </button>
          </div>
        </div>

        {/* Main Ingredients Table */}
        <div className="divide-y divide-border-subtle text-sm mt-4">
          {/* Total Flour Row */}
          <div className="py-3 flex items-center justify-between font-semibold">
            <div className="space-y-0.5">
              <span className="text-foreground">Base Flour</span>
              <div className="text-[11px] text-foreground-subtle font-normal">
                {breadFlourPct > 0 &&
                  `Bread: ${toDisplayWeight(outputs.flourBlendGrams.breadFlour)} (${breadFlourPct}%) `}
                {wholeWheatPct > 0 &&
                  `• WW: ${toDisplayWeight(outputs.flourBlendGrams.wholeWheat)} (${wholeWheatPct}%) `}
                {ryePct > 0 &&
                  `• Rye: ${toDisplayWeight(outputs.flourBlendGrams.rye)} (${ryePct}%)`}
              </div>
            </div>
            <div className="text-right">
              <span className="font-mono text-base font-bold text-foreground">
                {toDisplayWeight(outputs.baseFlourGrams)}
              </span>
              <span className="block text-[11px] text-foreground-subtle font-mono">100.0%</span>
            </div>
          </div>

          {/* Water Row */}
          <div className="py-3 flex items-center justify-between">
            <div>
              <span className="font-semibold text-foreground">Water (Added)</span>
              <span className="block text-[11px] text-foreground-subtle">
                Recommended temp: 80°F–85°F (27°C–29°C)
              </span>
            </div>
            <div className="text-right">
              <span className="font-mono text-base font-bold text-foreground">
                {toDisplayWeight(outputs.addedWaterGrams)}
              </span>
              <span className="block text-[11px] text-foreground-subtle font-mono">
                {outputs.bakersPercentages.hydration}%
              </span>
            </div>
          </div>

          {/* Starter Row */}
          <div className="py-3 flex items-center justify-between">
            <div>
              <span className="font-semibold text-foreground">Sourdough Starter (Levain)</span>
              <span className="block text-[11px] text-foreground-subtle">
                Assumes 100% hydration (50% water / 50% flour)
              </span>
            </div>
            <div className="text-right">
              <span className="font-mono text-base font-bold text-wheat-gold">
                {toDisplayWeight(outputs.starterGrams)}
              </span>
              <span className="block text-[11px] text-foreground-subtle font-mono">
                {outputs.bakersPercentages.starter}%
              </span>
            </div>
          </div>

          {/* Salt Row */}
          <div className="py-3 flex items-center justify-between">
            <div>
              <span className="font-semibold text-foreground">Fine Sea Salt</span>
              <span className="block text-[11px] text-foreground-subtle">
                Tightens gluten network &amp; regulates fermentation
              </span>
            </div>
            <div className="text-right">
              <span className="font-mono text-base font-bold text-foreground">
                {toDisplayWeight(outputs.saltGrams)}
              </span>
              <span className="block text-[11px] text-foreground-subtle font-mono">
                {outputs.bakersPercentages.salt}%
              </span>
            </div>
          </div>

          {/* Total Dough Row */}
          <div className="py-3.5 flex items-center justify-between font-bold bg-surface-subtle/60 px-3 rounded-xl mt-2">
            <span className="text-foreground">Total Dough Weight</span>
            <span className="font-mono text-lg text-crust-primary">
              {toDisplayWeight(outputs.totalDoughGrams)}
            </span>
          </div>
        </div>

        {/* True Hydration Explainer Box */}
        <div className="mt-6 rounded-xl bg-crust-soft border border-crust-border p-4 text-xs">
          <div className="flex items-start gap-3">
            <span className="text-lg">💡</span>
            <div className="space-y-1 text-foreground">
              <p className="font-bold">
                True Total Hydration:{" "}
                <span className="text-crust-primary text-sm font-mono">
                  {outputs.trueHydrationPct}%
                </span>
              </p>
              <p className="text-foreground-muted leading-relaxed">
                Your recipe calls for <strong>{outputs.bakersPercentages.hydration}%</strong> added
                water. But because your {toDisplayWeight(outputs.starterGrams)} sourdough starter
                contributes <strong>{toDisplayWeight(outputs.starterWaterGrams)} water</strong> and{" "}
                <strong>{toDisplayWeight(outputs.starterFlourGrams)} flour</strong>, your true
                overall dough hydration is <strong>{outputs.trueHydrationPct}%</strong>.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Ambient Kitchen Temperature & Bulk Fermentation Planner */}
      <div className="bg-surface rounded-2xl border border-border-subtle p-5 sm:p-7 shadow-sm">
        <div className="flex items-center justify-between pb-4 border-b border-border-subtle">
          <div>
            <h2 className="text-lg font-bold text-foreground">
              Bulk Fermentation Timing Assistant
            </h2>
            <p className="text-xs text-foreground-muted">
              Estimated fermentation duration based on kitchen ambient temperature
            </p>
          </div>

          <div className="inline-flex rounded-lg border border-border-subtle p-0.5 bg-surface-subtle text-xs">
            <button
              type="button"
              onClick={() => setTempUnit("F")}
              className={`px-2 py-0.5 rounded-md font-medium transition-colors cursor-pointer ${
                tempUnit === "F"
                  ? "bg-surface text-foreground font-semibold shadow-2xs"
                  : "text-foreground-muted"
              }`}
            >
              °F
            </button>
            <button
              type="button"
              onClick={() => setTempUnit("C")}
              className={`px-2 py-0.5 rounded-md font-medium transition-colors cursor-pointer ${
                tempUnit === "C"
                  ? "bg-surface text-foreground font-semibold shadow-2xs"
                  : "text-foreground-muted"
              }`}
            >
              °C
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6">
          {/* Temperature Slider */}
          <div className="space-y-3">
            <div className="flex items-center justify-between text-sm">
              <label htmlFor="temp-slider" className="font-semibold text-foreground">
                Dough / Room Temperature
              </label>
              <span className="font-mono text-base font-bold text-crust-primary">
                {tempUnit === "F"
                  ? `${fermentation.tempFahrenheit}°F`
                  : `${fermentation.tempCelsius}°C`}
              </span>
            </div>
            <input
              id="temp-slider"
              type="range"
              min="18"
              max="28"
              step="1"
              value={tempCelsius}
              onChange={(e) => setTempCelsius(Number(e.target.value))}
              className="w-full h-2 rounded-lg bg-surface-subtle cursor-pointer accent-crust-primary"
            />
            <div className="flex justify-between text-[11px] text-foreground-subtle">
              <span>Cool (68°F / 20°C)</span>
              <span>Ideal (75°F / 24°C)</span>
              <span>Warm (82°F / 28°C)</span>
            </div>

            <div className="mt-4 p-4 rounded-xl bg-wheat-soft border border-wheat-gold/30">
              <div className="text-xs text-foreground-muted">Estimated Bulk Fermentation Window:</div>
              <div className="text-2xl font-extrabold text-foreground font-mono mt-1">
                {fermentation.minHours} – {fermentation.maxHours} hours
              </div>
              <div className="text-[11px] text-foreground-subtle mt-1 mb-3">
                With {starterPct}% starter inoculation at{" "}
                {tempUnit === "F"
                  ? `${fermentation.tempFahrenheit}°F`
                  : `${fermentation.tempCelsius}°C`}
              </div>

              {/* Direct Timer Integration Buttons */}
              <div className="flex flex-wrap gap-2 pt-2 border-t border-border-subtle">
                <button
                  type="button"
                  onClick={() =>
                    triggerTimer(
                      Math.round(fermentation.minHours * 60),
                      `Bulk Proof Alarm (${fermentation.minHours}h)`
                    )
                  }
                  className="px-3 py-1.5 rounded-lg bg-crust-primary text-white font-bold text-xs hover:bg-crust-hover transition-colors shadow-2xs cursor-pointer flex items-center gap-1.5"
                >
                  <span>⏱️</span>
                  <span>Start Bulk Proof Alarm ({fermentation.minHours}h)</span>
                </button>
                <button
                  type="button"
                  onClick={() => triggerTimer(30, "Stretch & Fold 1")}
                  className="px-3 py-1.5 rounded-lg bg-surface text-foreground font-semibold text-xs border border-border-subtle hover:bg-surface-subtle transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  <span>🔄</span>
                  <span>Start 30m Fold Timer</span>
                </button>
              </div>
            </div>
          </div>

          {/* Visual Cues Checklist */}
          <div className="space-y-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-foreground-muted">
              Visual Dough Readiness Cues (Always watch dough, not the clock)
            </h3>
            <ul className="space-y-2 text-xs text-foreground-muted">
              {fermentation.visualCues.map((cue, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-crust-primary font-bold mt-0.5">✓</span>
                  <span>{cue}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
