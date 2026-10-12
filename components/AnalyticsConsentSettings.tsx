"use client";

import { useEffect, useState } from "react";
import {
  ANALYTICS_CONSENT_EVENT,
  ANALYTICS_CONSENT_KEY,
  saveAnalyticsConsent,
} from "@/components/CookieConsent";

type Choice = "unknown" | "granted" | "denied";

export function AnalyticsConsentSettings() {
  const [choice, setChoice] = useState<Choice>("unknown");

  useEffect(() => {
    const syncChoice = () => {
      try {
        const stored = localStorage.getItem(ANALYTICS_CONSENT_KEY);
        setChoice(stored === "granted" || stored === "denied" ? stored : "unknown");
      } catch {
        setChoice("unknown");
      }
    };
    syncChoice();
    window.addEventListener("storage", syncChoice);
    window.addEventListener(ANALYTICS_CONSENT_EVENT, syncChoice);
    return () => {
      window.removeEventListener("storage", syncChoice);
      window.removeEventListener(ANALYTICS_CONSENT_EVENT, syncChoice);
    };
  }, []);

  const status =
    choice === "granted"
      ? "Analytics allowed"
      : choice === "denied"
        ? "Analytics rejected"
        : "No analytics choice saved; analytics is off";

  return (
    <div className="rounded-xl border border-border-subtle bg-surface-subtle p-4 space-y-3">
      <p className="font-semibold text-foreground" aria-live="polite">{status}</p>
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => saveAnalyticsConsent(true)}
          className="px-3.5 py-2 rounded-lg bg-crust-primary text-white font-bold text-xs hover:bg-crust-hover transition-colors cursor-pointer"
        >
          Allow analytics
        </button>
        <button
          type="button"
          onClick={() => saveAnalyticsConsent(false)}
          className="px-3.5 py-2 rounded-lg border border-border-strong text-foreground font-bold text-xs hover:bg-surface-subtle transition-colors cursor-pointer"
        >
          Reject or withdraw consent
        </button>
      </div>
    </div>
  );
}
