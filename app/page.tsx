import type { Metadata } from "next";
import { SourdoughCalculator } from "@/components/SourdoughCalculator";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Sourdough Calculator & Baker's Percentage Calculator | BakerPercent",
  description:
    "Calculate artisan sourdough bread formulas with reverse loaf scaling, true total hydration, multi-flour blends, and ambient temperature bulk fermentation guidance.",
  alternates: {
    canonical: "https://bakerpercent.com/",
  },
};

export default function HomePage() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What is baker's percentage and how does it work?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "In baker's percentages (or baker's math), total flour weight is always defined as 100%. Every other ingredient (water, sourdough starter, salt) is measured and expressed as a percentage relative to that flour weight. This allows recipes to be scaled instantly for any batch size.",
        },
      },
      {
        "@type": "Question",
        name: "What is the difference between added water hydration and true total hydration?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Added water hydration only measures the liquid poured directly into the mixing bowl relative to dry flour. True total hydration includes both the water and flour contained inside your sourdough starter (which is typically 50% water and 50% flour by weight). BakerPercent calculates both so you can see your dough's total hydration.",
        },
      },
      {
        "@type": "Question",
        name: "How much sourdough starter should I use in my bread recipe?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Standard artisan sourdough recipes typically use 15% to 20% starter relative to total flour weight. For a long, slow overnight bulk fermentation in cool kitchens, 10% to 15% is recommended. In warm kitchens (above 78°F / 25°C), reducing starter inoculation prevents overproofing.",
        },
      },
      {
        "@type": "Question",
        name: "How do I calculate ingredients backward from my desired loaf weight?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Divide your desired total dough weight by the sum of all baker's percentages (Flour 100% + Hydration % + Starter % + Salt %). For example, if you want a 900g loaf at 75% hydration, 20% starter, and 2% salt, divide 900 by 1.97 to get ~457g of base flour.",
        },
      },
      {
        "@type": "Question",
        name: "How does ambient room temperature affect bulk fermentation?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Wild yeast and lactic acid bacteria ferment significantly faster in warm environments. At 75°F (24°C), bulk fermentation typically takes 4.5 to 5.5 hours. At 68°F (20°C), it can take 7 to 9 hours. Higher temperatures also require shaping at lower volume increases (45-50% rise) to prevent overproofing during handling.",
        },
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="max-w-6xl mx-auto px-4 py-8 sm:py-12">
        {/* Clean, Modern Header */}
        <section className="text-center max-w-2xl mx-auto mb-6 pt-2">
          <h1 className="text-2xl sm:text-4xl font-extrabold text-foreground tracking-tight">
            Sourdough <span className="text-crust-primary">&amp; Baker&rsquo;s Percentage</span> Calculator
          </h1>
          <p className="mt-2 text-xs sm:text-sm text-foreground-muted">
            Reverse loaf scaling, true starter hydration, and bulk fermentation timing.
          </p>
        </section>

        {/* The Interactive Calculator Component */}
        <section id="calculator" className="mb-14">
          <SourdoughCalculator />
        </section>

        {/* Deep Informational & Guide Content (Prevents Thin Content) */}
        <section className="space-y-16 border-t border-border-subtle pt-16">
          {/* Section 1: How Baker's Percentage Works */}
          <div className="max-w-3xl mx-auto space-y-4">
            <h2 className="text-2xl font-bold text-foreground">How Baker&rsquo;s Percentage Works</h2>
            <p className="text-sm text-foreground-muted leading-relaxed">
              Standard culinary recipes list ingredients in volumetric cups or grams that are tied to a fixed batch size. In professional baking, this makes scaling awkward and recipe comparisons impossible. 
            </p>
            <p className="text-sm text-foreground-muted leading-relaxed">
              <strong>Baker&rsquo;s math</strong> solves this by standardizing the total weight of flour to exactly <strong>100%</strong>. Every other ingredient is measured and expressed as a proportion of that flour weight:
            </p>

            <div className="bg-surface rounded-xl border border-border-subtle p-5 font-mono text-xs space-y-2">
              <div className="text-crust-primary font-bold">Ingredient % = (Weight of Ingredient ÷ Total Flour Weight) × 100</div>
              <div className="text-foreground-subtle">
                Example: 1,000g Flour (100%) + 750g Water (75% hydration) + 200g Starter (20%) + 20g Salt (2.0%) = 1,970g Total Dough
              </div>
            </div>

            <p className="text-sm text-foreground-muted leading-relaxed">
              Because flour is always 100%, the total percentage of all ingredients will always exceed 100% (in the example above, 197%). This is completely normal and is what allows bakers to scale formulas up to 100 loaves or down to a single roll without recalculating from scratch.
            </p>
          </div>

          {/* Section 2: Why Reverse Scaling is Superior */}
          <div className="max-w-3xl mx-auto space-y-4">
            <h2 className="text-2xl font-bold text-foreground">Why Reverse Loaf Scaling Matters</h2>
            <p className="text-sm text-foreground-muted leading-relaxed">
              Most online calculators force you to guess an arbitrary starting flour weight (like 500g or 1,000g). But home bakers have physical constraints: your banneton proofing baskets and Dutch ovens are designed for specific dough volumes—typically <strong>750g, 850g, or 900g per loaf</strong>.
            </p>
            <p className="text-sm text-foreground-muted leading-relaxed">
              If you start with 1,000g of flour at 75% hydration and 20% starter, you end up with 1,970g of dough. When you divide that into two loaves, each weighs 985g—which may overflow an 8-inch round banneton or touch the Dutch oven lid.
            </p>
            <p className="text-sm text-foreground-muted leading-relaxed">
              BakerPercent&rsquo;s <strong>reverse scaling</strong> lets you specify your target output (for example, <em>2 loaves at 850g each = 1,700g total dough</em>). The calculator uses:
            </p>
            <div className="bg-surface-subtle rounded-xl p-4 font-mono text-xs text-foreground">
              Base Flour = Total Target Dough Weight ÷ (1 + Hydration% + Starter% + Salt%)
            </div>
            <p className="text-sm text-foreground-muted leading-relaxed">
              You get zero wasted dough and perfectly portioned loaves every single bake.
            </p>
          </div>

          {/* Section 3: The True Hydration Breakdown */}
          <div className="max-w-3xl mx-auto space-y-4">
            <h2 className="text-2xl font-bold text-foreground">Understanding True Total Hydration</h2>
            <p className="text-sm text-foreground-muted leading-relaxed">
              A standard active sourdough starter (levain) is maintained at <strong>100% hydration</strong>, meaning it contains equal parts flour and water by weight (a 1:1 ratio).
            </p>
            <p className="text-sm text-foreground-muted leading-relaxed">
              When a recipe calls for 200g of starter, that starter introduces <strong>100g of water</strong> and <strong>100g of flour</strong> to the mixing bowl. If your base recipe called for 700g of water on 1,000g of flour (70% added hydration), your actual total wetness is:
            </p>
            <div className="bg-surface rounded-xl border border-border-subtle p-4 font-mono text-xs space-y-1">
              <div>Total Water = 700g added + 100g in starter = 800g</div>
              <div>Total Flour = 1,000g base + 100g in starter = 1,100g</div>
              <div className="font-bold text-crust-primary">True Total Hydration = 800 ÷ 1,100 = 72.7%</div>
            </div>
            <p className="text-sm text-foreground-muted leading-relaxed">
              Beginners often wonder why their dough feels wetter than expected. BakerPercent shows added-water hydration and true total hydration separately so you can adjust the recipe with both figures in view.
            </p>
          </div>

          {/* Section 4: Ambient Temperature Fermentation */}
          <div className="max-w-3xl mx-auto space-y-4">
            <h2 className="text-2xl font-bold text-foreground">Temperature &amp; Bulk Fermentation Kinetics</h2>
            <p className="text-sm text-foreground-muted leading-relaxed">
              Commercial bakeries control dough temperatures with proofing cabinets set to 78°F (25°C). Home kitchens, however, fluctuate with the seasons. A recipe written for a 78°F kitchen that advises &ldquo;bulk ferment for 4 hours&rdquo; will leave your dough severely underproofed in a 66°F (19°C) winter kitchen, or hopelessly overproofed on an 82°F (28°C) summer afternoon.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
              <div className="bg-surface rounded-xl border border-border-subtle p-4">
                <div className="font-bold text-foreground mb-1">Cool Kitchen (66°F–69°F / 19°C–21°C)</div>
                <p className="text-foreground-muted">Sluggish yeast activity. Expect 7 to 9 hours of bulk fermentation. Aim for a 75% volume rise before shaping.</p>
              </div>
              <div className="bg-surface rounded-xl border border-border-subtle p-4">
                <div className="font-bold text-crust-primary mb-1">Optimal Range (74°F–77°F / 23°C–25°C)</div>
                <p className="text-foreground-muted">Balanced yeast and bacterial acid production. Expect 4.5 to 5.5 hours. Aim for a 55–65% volume rise.</p>
              </div>
              <div className="bg-surface rounded-xl border border-border-subtle p-4">
                <div className="font-bold text-foreground mb-1">Warm Kitchen (80°F–84°F / 27°C–29°C)</div>
                <p className="text-foreground-muted">Rapid fermentation. Can finish in under 3.5 hours. Shape early at 40–50% rise to prevent gluten breakdown.</p>
              </div>
            </div>
          </div>

          {/* FAQ Accordion */}
          <div className="max-w-3xl mx-auto space-y-6">
            <h2 className="text-2xl font-bold text-foreground">Frequently Asked Questions</h2>
            <div className="space-y-3">
              {faqSchema.mainEntity.map((item, idx) => (
                <details
                  key={idx}
                  className="group rounded-xl border border-border-subtle bg-surface p-4 transition-colors"
                >
                  <summary className="cursor-pointer font-semibold text-sm text-foreground flex items-center justify-between list-none">
                    <span>{item.name}</span>
                    <span className="text-foreground-subtle group-open:rotate-180 transition-transform text-xs">
                      ▼
                    </span>
                  </summary>
                  <p className="mt-3 text-xs leading-relaxed text-foreground-muted border-t border-border-subtle pt-3">
                    {item.acceptedAnswer.text}
                  </p>
                </details>
              ))}
            </div>
          </div>

          {/* Explore Other Tools Hub Links */}
          <div className="max-w-3xl mx-auto rounded-2xl bg-surface-subtle p-6 border border-border-subtle text-center space-y-4">
            <h3 className="font-bold text-foreground text-base">Explore Specialized Baking Calculators</h3>
            <p className="text-xs text-foreground-muted">
              Looking for specific dough styles or maintenance schedules? Use our specialized companion utilities:
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link
                href="/pizza-dough-calculator"
                className="px-4 py-2 rounded-lg bg-surface text-foreground font-semibold text-xs border border-border-subtle hover:border-crust-primary transition-colors shadow-2xs"
              >
                🍕 Pizza Dough Calculator
              </Link>
              <Link
                href="/sourdough-hydration-calculator"
                className="px-4 py-2 rounded-lg bg-surface text-foreground font-semibold text-xs border border-border-subtle hover:border-crust-primary transition-colors shadow-2xs"
              >
                💧 Hydration &amp; Flour Guide
              </Link>
              <Link
                href="/sourdough-starter-feeding-calculator"
                className="px-4 py-2 rounded-lg bg-surface text-foreground font-semibold text-xs border border-border-subtle hover:border-crust-primary transition-colors shadow-2xs"
              >
                ⏳ Starter Feeding Calculator
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
