import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About | Bread Baking Calculators",
  description: "Learn why BakerPercent builds practical, browser-based sourdough, pizza dough, hydration, and starter feeding calculators for home bakers.",
};

export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-8 sm:py-12 space-y-8">
      <div>
        <h1 className="text-3xl font-extrabold text-foreground tracking-tight">About BakerPercent</h1>
        <p className="mt-2 text-sm text-foreground-muted">
          Crafting tools that make artisan baking accessible, repeatable, and scientific.
        </p>
      </div>

      <div className="space-y-4 text-sm text-foreground-muted leading-relaxed">
        <p>
          BakerPercent began with a practical goal: make baker&rsquo;s math easier to use at the kitchen counter. The free tools help home bakers calculate sourdough formulas, compare added and total hydration, feed a starter, and scale pizza dough without a spreadsheet.
        </p>
        <p>
          BakerPercent is built around three principles:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
          <div className="p-4 rounded-xl bg-surface border border-border-subtle">
            <h3 className="font-bold text-foreground text-sm mb-1">1. Kitchen First</h3>
            <p className="text-xs">
              Every button, slider, and text block is designed for readability from 3 feet away on a kitchen counter, complete with a native &ldquo;Keep Screen Awake&rdquo; toggle.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-surface border border-border-subtle">
            <h3 className="font-bold text-foreground text-sm mb-1">2. Mathematical Rigor</h3>
            <p className="text-xs">
              No rounding shortcuts. We separate starter water from added water so bakers understand their dough&rsquo;s true hydration.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-surface border border-border-subtle">
            <h3 className="font-bold text-foreground text-sm mb-1">3. Zero Friction</h3>
            <p className="text-xs">
              100% free, zero accounts, zero trackers, and instant client-side execution that works even if your kitchen Wi-Fi is spotty.
            </p>
          </div>
        </div>

        <p className="pt-4">
          Have an idea for a feature or a baking calculator you&rsquo;d like to see? We&rsquo;d love to hear from you on our{" "}
          <Link href="/contact" className="text-crust-primary font-semibold hover:underline">
            contact page
          </Link>.
        </p>
      </div>
    </div>
  );
}
