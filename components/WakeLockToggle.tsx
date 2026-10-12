"use client";

import { useEffect, useState, useCallback, useSyncExternalStore } from "react";

// Check wake lock support in a React 19 compliant manner
const subscribe = () => () => {};
const getSnapshot = () => typeof window !== "undefined" && "wakeLock" in navigator;
const getServerSnapshot = () => false;

export function WakeLockToggle() {
  const isSupported = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const [isActive, setIsActive] = useState(false);
  const [wakeLockSentinel, setWakeLockSentinel] = useState<WakeLockSentinel | null>(null);

  const releaseWakeLock = useCallback(async () => {
    if (wakeLockSentinel) {
      try {
        await wakeLockSentinel.release();
      } catch (err) {
        console.error("Error releasing wake lock:", err);
      }
      setWakeLockSentinel(null);
      setIsActive(false);
    }
  }, [wakeLockSentinel]);

  const requestWakeLock = useCallback(async () => {
    if (typeof window === "undefined" || !("wakeLock" in navigator)) return;
    try {
      const sentinel = await navigator.wakeLock.request("screen");
      sentinel.addEventListener("release", () => {
        setIsActive(false);
        setWakeLockSentinel(null);
      });
      setWakeLockSentinel(sentinel);
      setIsActive(true);
    } catch (err) {
      console.warn("Wake Lock request failed or denied:", err);
      setIsActive(false);
    }
  }, []);

  const toggleWakeLock = async () => {
    if (isActive) {
      await releaseWakeLock();
    } else {
      await requestWakeLock();
    }
  };

  // Re-acquire wake lock if document becomes visible again
  useEffect(() => {
    const handleVisibilityChange = async () => {
      if (document.visibilityState === "visible" && isActive && !wakeLockSentinel) {
        await requestWakeLock();
      }
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [isActive, wakeLockSentinel, requestWakeLock]);

  if (!isSupported) {
    return null;
  }

  return (
    <button
      onClick={toggleWakeLock}
      type="button"
      title={
        isActive
          ? "Screen Awake Active (display will stay awake)"
          : "Keep screen awake while baking"
      }
      className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
        isActive
          ? "bg-amber-100 dark:bg-amber-950/70 text-amber-900 dark:text-amber-200 border border-amber-300 dark:border-amber-700 shadow-2xs"
          : "bg-surface text-foreground-muted hover:text-foreground border border-border-subtle hover:bg-surface-subtle"
      }`}
    >
      <span
        className={`w-1.5 h-1.5 rounded-full transition-all ${
          isActive ? "bg-amber-500 animate-pulse" : "bg-foreground-subtle/60"
        }`}
      />
      <span className="hidden sm:inline">
        {isActive ? "Screen Awake" : "Keep Awake"}
      </span>
    </button>
  );
}
