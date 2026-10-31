import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sourdough Starter Feeding Ratios Explained",
  description: "Understand sourdough starter seed:water:flour ratios, calculate a feed by weight, and track peak activity without relying on a fixed timer.",
  alternates: { canonical: "https://bakerpercent.com/guides/starter-feeding" },
};

export default function StarterFeedingGuide() {
  return <article className="max-w-3xl mx-auto px-4 py-8 sm:py-12 space-y-6 text-sm text-foreground-muted leading-relaxed">
    <header className="space-y-2"><p className="text-xs text-foreground-subtle"><Link href="/guides" className="underline">Baking Guides</Link> / Starter feeding</p><h1 className="text-3xl font-extrabold text-foreground tracking-tight">Sourdough starter feeding ratios</h1><p>A ratio such as 1:2:2 means one part starter seed, two parts water, and two parts flour by weight. It describes the feed, not a guaranteed rise time.</p></header>
    <section className="space-y-2"><h2 className="text-xl font-bold text-foreground">Work out a feed by weight</h2><p>For a 1:2:2 feed with 150 g total ripe starter, there are five total parts (1 + 2 + 2). One part is 150 ÷ 5 = 30 g.</p><div className="rounded-xl bg-surface border border-border-subtle p-4 font-mono text-xs text-foreground space-y-1"><p>Starter seed: 30 g</p><p>Water: 60 g</p><p>Flour: 60 g</p><p>Total after feeding: 150 g</p></div><p>Keep any amount needed to maintain the culture separate from the amount you plan to use in a recipe. If you need 150 g for dough and want to retain 20 g, calculate a 170 g feed instead (34 g seed, 68 g water, 68 g flour) and reserve the remainder.</p></section>
    <section className="space-y-2"><h2 className="text-xl font-bold text-foreground">Timing depends on conditions</h2><p>A larger feed often takes longer to peak under otherwise similar conditions, but there is no clock that applies to every starter. Starter strength, flour, water temperature, and the actual culture temperature all matter. In a controlled comparison at 78°F, King Arthur Baking observed different peak windows for different feeding ratios; the authors also note that starters can behave differently. Treat any calculator estimate as a prompt to observe, not as a promise.</p><p>Watch a marked jar for expansion and bubbles. Note when the dome forms, levels, or begins to recede, along with the room temperature and feed ratio. That record helps you choose a feed schedule for your own culture.</p><p>Source: <a className="underline" href="https://www.kingarthurbaking.com/blog/2025/03/13/sourdough-feeding-ratios" target="_blank" rel="noreferrer">King Arthur Baking’s sourdough feeding ratio comparison</a>.</p></section>
    <p className="rounded-xl bg-surface-subtle border border-border-subtle p-4">Use the <Link className="font-semibold text-crust-primary underline" href="/sourdough-starter-feeding-calculator">starter feeding calculator</Link> for the arithmetic and read the estimate caveat alongside it.</p>
  </article>;
}
