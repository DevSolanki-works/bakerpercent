"use client";

interface AdSlotProps {
  slotId?: string;
  format?: "horizontal" | "rectangle";
  className?: string;
}

export function AdSlot({
  slotId = "default-slot",
  format = "horizontal",
  className = "",
}: AdSlotProps) {
  // Production AdSense integration placeholder
  // When Google AdSense ca-pub is connected, replace with <ins className="adsbygoogle" ... />
  const isHorizontal = format === "horizontal";

  return (
    <div
      className={`w-full mx-auto my-6 overflow-hidden flex flex-col items-center justify-center rounded-xl border border-dashed border-border-subtle/80 bg-surface-subtle/40 text-foreground-subtle transition-all ${
        isHorizontal ? "min-h-[90px] max-w-4xl p-2" : "min-h-[250px] max-w-[320px] p-4"
      } ${className}`}
      data-ad-slot={slotId}
    >
      <div className="flex items-center gap-2 text-[11px] font-semibold tracking-wider uppercase opacity-60">
        <span>Advertisement</span>
      </div>
      <div className="text-[10px] text-foreground-subtle mt-0.5">
        Display ads help keep DoughRatio 100% free with no account required.
      </div>
    </div>
  );
}
