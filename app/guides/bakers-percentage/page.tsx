import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Baker’s Percentage: Formula and Worked Scaling Example",
  description: "Learn the baker’s percentage formula and scale a dough recipe to a target weight with a clear worked example and rounding notes.",
  alternates: { canonical: "https://bakerpercent.com/guides/bakers-percentage" },
};

export default function BakersPercentageGuide() {
  return <article className="max-w-3xl mx-auto px-4 py-8 sm:py-12 space-y-6 text-sm text-foreground-muted leading-relaxed">
    <header className="space-y-2"><p className="text-xs text-foreground-subtle"><Link href="/guides" className="underline">Baking Guides</Link> / Baker’s math</p><h1 className="text-3xl font-extrabold text-foreground tracking-tight">Baker’s percentage: a formula you can scale</h1><p>In baker’s percentage, the combined flour in a formula is the reference weight and is written as 100%. Each other ingredient is expressed relative to that flour weight.</p></header>
    <section className="space-y-2"><h2 className="text-xl font-bold text-foreground">The basic calculation</h2><p><strong>Ingredient percentage = ingredient weight ÷ total flour weight × 100.</strong> If a dough contains 1,000 g flour and 700 g added water, added-water hydration is 70%. If it also has 20 g salt, salt is 2%.</p><p>Flour blends count together. For 700 g bread flour and 300 g whole wheat flour, total flour is 1,000 g. The blend is the 100% reference.</p></section>
    <section className="space-y-2"><h2 className="text-xl font-bold text-foreground">Scale backward from a target dough weight</h2><p>Add all ingredient percentages as decimals to get the formula multiplier. For 70% water, 20% 100%-hydration starter, and 2% salt:</p><div className="rounded-xl bg-surface border border-border-subtle p-4 font-mono text-xs text-foreground space-y-1"><p>Multiplier = 1 + 0.70 + 0.20 + 0.02 = 1.92</p><p>For 960 g target dough: flour = 960 ÷ 1.92 = 500 g</p><p>Added water = 350 g; starter = 100 g; salt = 10 g</p></div><p>Those ingredient weights total 960 g before rounding. A starter at 100% hydration contains 50 g flour and 50 g water in that example. If you want total hydration rather than added-water hydration, include those starter components in the totals. A different starter hydration changes the split.</p></section>
    <section className="space-y-2"><h2 className="text-xl font-bold text-foreground">Rounding and practical use</h2><p>For small batches, rounding each ingredient can make the displayed sum differ slightly from the target. A scale readable to 0.1 g helps with small salt or yeast quantities. Calculator math gives ingredient weights; it cannot account for dough left in the bowl, evaporation, or your preferred shaping and bake loss.</p><p>For background on baker’s math, see <a className="underline" href="https://www.kingarthurbaking.com/blog/2022/04/28/what-is-bakers-math-and-how-can-i-use-it-in-my-everyday-bread-baking" target="_blank" rel="noreferrer">King Arthur Baking’s baker’s math explanation</a>.</p></section>
    <p className="rounded-xl bg-surface-subtle border border-border-subtle p-4">Try the <Link className="font-semibold text-crust-primary underline" href="/">sourdough calculator</Link> to scale a formula, or read the <Link className="font-semibold text-crust-primary underline" href="/methodology">methodology</Link> for the site’s calculation assumptions.</p>
  </article>;
}
