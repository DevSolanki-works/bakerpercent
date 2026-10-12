"use client";

import { useState, useSyncExternalStore } from "react";
import Link from "next/link";

function subscribe(callback: () => void) {
  if (typeof window === "undefined") return () => {};
  window.addEventListener("storage", callback);
  return () => window.removeEventListener("storage", callback);
}

function getSnapshot(): boolean {
  if (typeof window === "undefined") return false;
  try {
    return localStorage.getItem("doughratio_consent_v1") !== "accepted";
  } catch {
    return false;
  }
}

function getServerSnapshot(): boolean {
  return false;
}

export function CookieConsent() {
  const needsConsent = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const [dismissed, setDismissed] = useState(false);

  const accept = () => {
    try {
      localStorage.setItem("doughratio_consent_v1", "accepted");
    } catch {
      // Ignore localStorage error
    }
    setDismissed(true);
  };

  if (!needsConsent || dismissed) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:max-w-md z-50 p-4 rounded-2xl bg-surface border border-border-strong shadow-xl animate-in fade-in slide-in-from-bottom-4 duration-300">
      <div className="flex items-start gap-3">
        <span className="text-xl">🍪</span>
        <div className="text-xs text-foreground-muted leading-relaxed">
          <p className="font-semibold text-foreground mb-1">
            Privacy &amp; Local Calculations
          </p>
          <p>
            BakerPercent calculates dough formulas in your browser. Local storage remembers your recipe adjustments and theme preferences on this device.
          </p>
          <div className="mt-2.5 flex items-center gap-3">
            <button
              type="button"
              onClick={accept}
              className="px-3.5 py-1.5 rounded-lg bg-crust-primary text-white font-bold text-xs hover:bg-crust-hover transition-colors cursor-pointer shadow-xs"
            >
              Got it
            </button>
            <Link
              href="/privacy"
              className="text-foreground-subtle hover:text-foreground text-xs underline underline-offset-2"
            >
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
