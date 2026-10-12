"use client";

import { useState, useEffect, useRef, useCallback } from "react";

export interface TimerPreset {
  id: string;
  name: string;
  icon: string;
  minutes: number;
  description: string;
}

export const TIMER_PRESETS: TimerPreset[] = [
  {
    id: "stretch-fold",
    name: "Stretch & Fold",
    icon: "🔄",
    minutes: 30,
    description: "Standard 30-min fold interval to build gluten tension without tearing.",
  },
  {
    id: "coil-fold",
    name: "Coil Fold",
    icon: "🌀",
    minutes: 45,
    description: "Gentle folding technique for high-hydration or fragile doughs.",
  },
  {
    id: "autolyse",
    name: "Autolyse Rest",
    icon: "🌾",
    minutes: 45,
    description: "Initial flour + water rest to hydrate proteins and activate amylase enzymes.",
  },
  {
    id: "bulk-proof",
    name: "Bulk Proof Alarm",
    icon: "🕒",
    minutes: 120,
    description: "2-hour milestone check to inspect dough volume and aeration dome.",
  },
  {
    id: "bake-lid-on",
    name: "Dutch Oven (Lid On)",
    icon: "♨️",
    minutes: 20,
    description: "Steam-trapping stage for maximum oven spring and ear expansion.",
  },
  {
    id: "bake-lid-off",
    name: "Dutch Oven (Lid Off)",
    icon: "🍞",
    minutes: 25,
    description: "Dry baking stage to develop deep mahogany Maillard crust blister.",
  },
];

// Pure Web Audio API chime synthesis (0 external assets, works 100% offline)
function playBakeryChime() {
  try {
    const AudioContextClass =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof window.AudioContext }).webkitAudioContext;
    if (!AudioContextClass) return;
    const ctx = new AudioContextClass();
    const now = ctx.currentTime;

    // Chime Note 1: C5 (523.25 Hz)
    const osc1 = ctx.createOscillator();
    const gain1 = ctx.createGain();
    osc1.type = "sine";
    osc1.frequency.setValueAtTime(523.25, now);
    gain1.gain.setValueAtTime(0.2, now);
    gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.8);
    osc1.connect(gain1);
    gain1.connect(ctx.destination);
    osc1.start(now);
    osc1.stop(now + 0.8);

    // Chime Note 2: G5 (783.99 Hz)
    const osc2 = ctx.createOscillator();
    const gain2 = ctx.createGain();
    osc2.type = "sine";
    osc2.frequency.setValueAtTime(783.99, now + 0.25);
    gain2.gain.setValueAtTime(0.25, now + 0.25);
    gain2.gain.exponentialRampToValueAtTime(0.001, now + 1.2);
    osc2.connect(gain2);
    gain2.connect(ctx.destination);
    osc2.start(now + 0.25);
    osc2.stop(now + 1.2);

    // Chime Note 3: C6 (1046.5 Hz)
    const osc3 = ctx.createOscillator();
    const gain3 = ctx.createGain();
    osc3.type = "sine";
    osc3.frequency.setValueAtTime(1046.5, now + 0.5);
    gain3.gain.setValueAtTime(0.3, now + 0.5);
    gain3.gain.exponentialRampToValueAtTime(0.001, now + 1.8);
    osc3.connect(gain3);
    gain3.connect(ctx.destination);
    osc3.start(now + 0.5);
    osc3.stop(now + 1.8);
  } catch {
    // AudioContext blocked or unsupported
  }
}

export function KitchenTimer() {
  const [isOpen, setIsOpen] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState<number>(30 * 60);
  const [totalSeconds, setTotalSeconds] = useState<number>(30 * 60);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [activeLabel, setActiveLabel] = useState<string>("Stretch & Fold");
  const [customMinutes, setCustomMinutes] = useState<number>(30);
  const [completed, setCompleted] = useState<boolean>(false);

  // Target timestamp ref for background tab timing accuracy
  const targetTimeRef = useRef<number | null>(null);

  // Trigger timer from any component via custom browser event
  useEffect(() => {
    const handleStartEvent = (e: Event) => {
      const detail = (e as CustomEvent<{ minutes: number; label: string }>).detail;
      if (detail && detail.minutes > 0) {
        const secs = detail.minutes * 60;
        setTotalSeconds(secs);
        setSecondsLeft(secs);
        setActiveLabel(detail.label || "Kitchen Timer");
        setCustomMinutes(detail.minutes);
        setCompleted(false);
        setIsRunning(true);
        targetTimeRef.current = Date.now() + secs * 1000;
        setIsOpen(true);
      }
    };

    const handleOpenEvent = () => {
      setIsOpen(true);
    };

    window.addEventListener("bakerpercent:start-timer", handleStartEvent);
    window.addEventListener("bakerpercent:open-timer", handleOpenEvent);
    return () => {
      window.removeEventListener("bakerpercent:start-timer", handleStartEvent);
      window.removeEventListener("bakerpercent:open-timer", handleOpenEvent);
    };
  }, []);

  // Main countdown loop based on wall-clock time
  useEffect(() => {
    if (!isRunning) return;

    if (!targetTimeRef.current) {
      targetTimeRef.current = Date.now() + secondsLeft * 1000;
    }

    const interval = setInterval(() => {
      const now = Date.now();
      const diff = Math.max(0, Math.round(((targetTimeRef.current || now) - now) / 1000));
      setSecondsLeft(diff);

      if (diff <= 0) {
        setIsRunning(false);
        setCompleted(true);
        targetTimeRef.current = null;
        clearInterval(interval);
        playBakeryChime();

        // Browser push notification if supported & permitted
        if (typeof window !== "undefined" && "Notification" in window && Notification.permission === "granted") {
          try {
            new Notification("BakerPercent Baking Alarm 🍞", {
              body: `${activeLabel} complete! Time for the next step.`,
              icon: "/favicon.svg",
            });
          } catch {
            // Ignore notification error
          }
        }
      }
    }, 500);

    return () => clearInterval(interval);
  }, [isRunning, secondsLeft, activeLabel]);

  const handleStart = () => {
    if (completed) {
      setCompleted(false);
      setSecondsLeft(totalSeconds);
      targetTimeRef.current = Date.now() + totalSeconds * 1000;
    } else {
      targetTimeRef.current = Date.now() + secondsLeft * 1000;
    }
    setIsRunning(true);

    // Request notification permission on interaction if not yet prompted
    if (typeof window !== "undefined" && "Notification" in window && Notification.permission === "default") {
      try {
        Notification.requestPermission();
      } catch {
        // Ignore
      }
    }
  };

  const handlePause = () => {
    setIsRunning(false);
    targetTimeRef.current = null;
  };

  const handleReset = () => {
    setIsRunning(false);
    setCompleted(false);
    setSecondsLeft(totalSeconds);
    targetTimeRef.current = null;
  };

  const selectPreset = (preset: TimerPreset) => {
    const secs = preset.minutes * 60;
    setIsRunning(false);
    setCompleted(false);
    setActiveLabel(preset.name);
    setCustomMinutes(preset.minutes);
    setTotalSeconds(secs);
    setSecondsLeft(secs);
    targetTimeRef.current = null;
  };

  const handleCustomChange = (mins: number) => {
    const clamped = Math.max(1, Math.min(360, mins));
    setCustomMinutes(clamped);
    setIsRunning(false);
    setCompleted(false);
    setActiveLabel(`Custom (${clamped}m)`);
    setTotalSeconds(clamped * 60);
    setSecondsLeft(clamped * 60);
    targetTimeRef.current = null;
  };

  // Time formatters
  const formatTime = useCallback((totalSecs: number) => {
    const hrs = Math.floor(totalSecs / 3600);
    const mins = Math.floor((totalSecs % 3600) / 60);
    const secs = totalSecs % 60;
    if (hrs > 0) {
      return `${hrs}:${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
    }
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  }, []);

  const progressPct = totalSeconds > 0 ? ((totalSeconds - secondsLeft) / totalSeconds) * 100 : 0;

  return (
    <>
      {/* Navbar Timer Launcher Button */}
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className={`px-2.5 py-1.5 rounded-lg border text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer ${
          isRunning
            ? "bg-wheat-soft border-wheat-gold text-crust-primary animate-pulse"
            : completed
            ? "bg-amber-100 border-amber-300 text-amber-900 dark:bg-amber-950 dark:text-amber-200"
            : "border-border-subtle bg-surface text-foreground-muted hover:text-foreground hover:bg-surface-subtle"
        }`}
        aria-label="Kitchen Baking Timer"
        title="Kitchen Baking & Stretch-and-Fold Timer"
      >
        <span className="text-sm">⏱️</span>
        <span className="hidden sm:inline font-mono">
          {isRunning ? formatTime(secondsLeft) : "Timer"}
        </span>
      </button>

      {/* Floating or Modal Drawer */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="w-full max-w-lg bg-surface border border-border-subtle rounded-2xl shadow-2xl p-6 sm:p-8 space-y-6 relative overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            {/* Close Button */}
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 p-2 rounded-lg text-foreground-muted hover:text-foreground hover:bg-surface-subtle cursor-pointer transition-colors"
              aria-label="Close Timer"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Header */}
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-crust-soft text-crust-primary border border-crust-border mb-2">
                <span>⏱️ Artisan Kitchen Timer</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-foreground">
                Baking &amp; Fermentation Timer
              </h2>
              <p className="text-xs sm:text-sm text-foreground-muted">
                Track stretch &amp; fold intervals, autolyse, and bake timing. Works offline with audio alert.
              </p>
            </div>

            {/* Active Display Card */}
            <div
              className={`p-6 rounded-2xl border text-center transition-all ${
                completed
                  ? "bg-amber-500/10 border-amber-500 text-amber-900 dark:text-amber-200 ring-4 ring-amber-500/20"
                  : isRunning
                  ? "bg-crust-soft/50 border-crust-border text-foreground"
                  : "bg-surface-subtle border-border-subtle text-foreground"
              }`}
            >
              <div className="text-xs font-semibold uppercase tracking-wider text-crust-primary mb-1">
                {activeLabel}
              </div>

              {/* Large Digital Clock */}
              <div className="text-5xl sm:text-6xl font-mono font-extrabold tracking-tight my-2">
                {formatTime(secondsLeft)}
              </div>

              {/* Progress Bar */}
              <div className="w-full h-2 rounded-full bg-border-subtle overflow-hidden my-3">
                <div
                  className="h-full bg-crust-primary transition-all duration-500"
                  style={{ width: `${Math.min(100, Math.max(0, progressPct))}%` }}
                />
              </div>

              {completed && (
                <div className="text-xs font-bold text-amber-700 dark:text-amber-300 py-1 animate-bounce">
                  🔔 Interval Complete! Time for your next dough fold or oven check.
                </div>
              )}

              {/* Controls */}
              <div className="flex items-center justify-center gap-3 mt-4">
                {!isRunning ? (
                  <button
                    type="button"
                    onClick={handleStart}
                    className="px-6 py-2.5 rounded-xl bg-crust-primary text-white font-bold text-sm hover:bg-crust-hover transition-colors shadow-sm cursor-pointer flex items-center gap-1.5"
                  >
                    <span>▶</span> {completed ? "Restart" : secondsLeft < totalSeconds ? "Resume" : "Start Timer"}
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={handlePause}
                    className="px-6 py-2.5 rounded-xl bg-amber-600 text-white font-bold text-sm hover:bg-amber-700 transition-colors shadow-sm cursor-pointer flex items-center gap-1.5"
                  >
                    <span>⏸</span> Pause
                  </button>
                )}

                <button
                  type="button"
                  onClick={handleReset}
                  className="px-4 py-2.5 rounded-xl border border-border-subtle bg-surface text-foreground font-semibold text-sm hover:bg-surface-subtle transition-colors cursor-pointer"
                >
                  Reset
                </button>
              </div>
            </div>

            {/* Quick Sourdough Presets */}
            <div>
              <div className="text-xs font-bold text-foreground uppercase tracking-wider mb-2">
                Quick Sourdough Presets
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {TIMER_PRESETS.map((p) => {
                  const isSelected = activeLabel === p.name;
                  return (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => selectPreset(p)}
                      className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                        isSelected
                          ? "bg-crust-soft border-crust-border ring-2 ring-crust-primary/20"
                          : "bg-surface border-border-subtle hover:bg-surface-subtle hover:border-border-strong"
                      }`}
                    >
                      <div className="flex items-center justify-between text-sm mb-1">
                        <span>{p.icon}</span>
                        <span className="font-mono text-xs font-bold text-crust-primary">
                          {p.minutes}m
                        </span>
                      </div>
                      <div className="text-xs font-semibold text-foreground truncate">
                        {p.name}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Custom Minutes Slider */}
            <div className="pt-2 border-t border-border-subtle">
              <div className="flex items-center justify-between text-xs font-semibold text-foreground mb-1">
                <span>Custom Duration</span>
                <span className="font-mono text-crust-primary">{customMinutes} Minutes</span>
              </div>
              <input
                type="range"
                min="5"
                max="240"
                step="5"
                value={customMinutes}
                onChange={(e) => handleCustomChange(Number(e.target.value))}
                className="w-full cursor-pointer accent-crust-primary"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
