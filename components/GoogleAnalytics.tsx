"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ANALYTICS_CONSENT_EVENT, ANALYTICS_CONSENT_KEY } from "@/components/CookieConsent";

const MEASUREMENT_ID = "G-1SDPSCLJZV";
type Consent = "unknown" | "granted" | "denied";

type GoogleWindow = Window & {
  dataLayer?: unknown[][];
  gtag?: (...args: unknown[]) => void;
  [key: string]: unknown;
};

export function GoogleAnalytics() {
  const pathname = usePathname();
  const [consent, setConsent] = useState<Consent>("unknown");
  const initialized = useRef(false);
  const lastPagePath = useRef<string | null>(null);

  useEffect(() => {
    const syncConsent = () => {
      try {
        const stored = localStorage.getItem(ANALYTICS_CONSENT_KEY);
        setConsent(stored === "granted" || stored === "denied" ? stored : "unknown");
      } catch {
        setConsent("unknown");
      }
    };
    syncConsent();
    window.addEventListener("storage", syncConsent);
    window.addEventListener(ANALYTICS_CONSENT_EVENT, syncConsent);
    return () => {
      window.removeEventListener("storage", syncConsent);
      window.removeEventListener(ANALYTICS_CONSENT_EVENT, syncConsent);
    };
  }, []);

  useEffect(() => {
    const googleWindow = window as unknown as GoogleWindow;
    const disableKey = `ga-disable-${MEASUREMENT_ID}`;

    if (consent !== "granted") {
      googleWindow[disableKey] = true;
      if (googleWindow.gtag) {
        googleWindow.gtag("consent", "update", { analytics_storage: "denied" });
      }
      lastPagePath.current = null;
      return;
    }

    googleWindow[disableKey] = false;
    if (!googleWindow.gtag) {
      googleWindow.dataLayer = googleWindow.dataLayer || [];
      googleWindow.gtag = (...args: unknown[]) => googleWindow.dataLayer?.push(args);
      const script = document.createElement("script");
      script.async = true;
      script.src = `https://www.googletagmanager.com/gtag/js?id=${MEASUREMENT_ID}`;
      document.head.appendChild(script);
    }

    if (!initialized.current) {
      googleWindow.gtag("js", new Date());
      googleWindow.gtag("config", MEASUREMENT_ID, { send_page_view: false });
      initialized.current = true;
    }
    googleWindow.gtag("consent", "update", { analytics_storage: "granted" });

    if (lastPagePath.current !== pathname) {
      googleWindow.gtag("event", "page_view", {
        page_path: pathname,
        page_location: `${window.location.origin}${pathname}`,
      });
      lastPagePath.current = pathname;
    }
  }, [consent, pathname]);

  return null;
}
