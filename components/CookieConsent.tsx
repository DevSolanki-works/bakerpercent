"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export const ANALYTICS_CONSENT_KEY = "bakerpercent_analytics_consent_v1";
export const ANALYTICS_CONSENT_EVENT = "bakerpercent:analytics-consent-change";

export function saveAnalyticsConsent(allowed: boolean) {
  try {
    localStorage.setItem(ANALYTICS_CONSENT_KEY, allowed ? "granted" : "denied");
  } catch {
    // Consent choices are kept locally; continue without analytics if storage is unavailable.
  }
  window.dispatchEvent(new Event(ANALYTICS_CONSENT_EVENT));
}

type AnalyticsChoice = "unknown" | "granted" | "denied";

export function CookieConsent() {
  const [choice, setChoice] = useState<AnalyticsChoice>("unknown");

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

  if (choice !== "unknown") return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:max-w-md z-50 p-4 rounded-2xl bg-surface border border-border-strong shadow-xl animate-in fade-in slide-in-from-bottom-4 duration-300">
      <div className="flex items-start gap-3">
        <span className="text-xl">🍪</span>
        <div className="text-xs text-foreground-muted leading-relaxed">
          <p className="font-semibold text-foreground mb-1">Optional analytics</p>
          <p>
            Allow Google Analytics to measure page views and site interactions using cookies and similar signals. Your choice does not affect the calculators, and you can change it in the Privacy Policy.
          </p>
          <div className="mt-2.5 flex items-center gap-3">
            <button
              type="button"
              onClick={() => saveAnalyticsConsent(true)}
              className="px-3.5 py-1.5 rounded-lg bg-crust-primary text-white font-bold text-xs hover:bg-crust-hover transition-colors cursor-pointer shadow-xs"
            >
              Allow analytics
            </button>
            <button
              type="button"
              onClick={() => saveAnalyticsConsent(false)}
              className="px-3.5 py-1.5 rounded-lg border border-border-strong text-foreground font-bold text-xs hover:bg-surface-subtle transition-colors cursor-pointer"
            >
              Reject
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
