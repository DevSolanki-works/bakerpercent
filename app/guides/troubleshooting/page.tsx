import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sourdough Troubleshooting: Dense, Sticky, or Flat Loaves",
  description: "A practical sourdough troubleshooting guide for dense crumb, sticky dough, weak rise, spreading loaves, and overproofing, with a repeatable bake log.",
  alternates: { canonical: "https://bakerpercent.com/guides/troubleshooting" },
};

const issues = [
  { title: "Dense crumb and little rise", cause: "The dough may have been under-fermented, the starter may have been sluggish, or the dough may have cooled more than expected. A tight crumb can also be intentional in some styles.", action: "Check whether the starter reliably rises after feeding. Record dough temperature and visible expansion during bulk; on the next bake, change one variable at a time." },
  { title: "Dough feels slack or spreads", cause: "High hydration, weak flour, incomplete gluten development, warm dough, or fermentation carried too far can all reduce shape retention.", action: "Use the hydration calculator to compare formulas, hold back a little water while mixing, and note whether folds improve strength. Lower water modestly on a later bake if the flour cannot absorb it." },
  { title: "Gummy or wet line near the base", cause: "A loaf can be underbaked, cut before cooling, or affected by fermentation and crumb structure. A gummy crumb alone does not identify one cause.", action: "Let the loaf cool fully before slicing, confirm the center is baked through using your recipe’s cues, and compare the crumb after cooling before changing fermentation." },
  { title: "Loaf is flat after scoring", cause: "Possible contributors include overproofing, weak shaping tension, low dough strength, or a blade that drags rather than making a clean cut.", action: "Compare the dough’s strength before shaping and its proofing cues. Shape with consistent tension and use a sharp blade; adjust fermentation only after reviewing the full process." },
  { title: "Starter peaks much earlier or later than expected", cause: "Feed ratio, culture temperature, flour, seed maturity, and starter condition all affect activity. A timer estimate cannot account for all of them.", action: "Mark the jar after feeding and record the peak time, temperature, and ratio. Use repeated observations from your own starter to set a practical schedule." },
];

export default function TroubleshootingGuide() {
  return <article className="mx-auto max-w-3xl space-y-8 px-4 py-8 text-sm leading-relaxed text-foreground-muted sm:py-12">
    <header className="space-y-3"><p className="text-xs text-foreground-subtle"><Link href="/guides" className="underline">Baking Guides</Link> / Troubleshooting</p><h1 className="text-3xl font-extrabold tracking-tight text-foreground">Sourdough troubleshooting: diagnose the process, not just the crumb</h1><p>A loaf is the result of several linked steps. Use the symptoms below as hypotheses, then compare your notes across bakes. Change one variable at a time so you can tell what helped.</p></header>
    <section className="space-y-4">{issues.map((issue) => <section key={issue.title} className="space-y-2 rounded-xl border border-border-subtle bg-surface p-5"><h2 className="text-lg font-bold text-foreground">{issue.title}</h2><p><strong>Possible reasons:</strong> {issue.cause}</p><p><strong>Next bake:</strong> {issue.action}</p></section>)}</section>
    <section className="space-y-3"><h2 className="text-xl font-bold text-foreground">A useful bake log</h2><p>Record flour brand and blend, ingredient weights, starter feed and maturity, mix and dough temperatures, fold times, bulk observations, proof conditions, bake settings, cooling time, and the result. Photos taken at mixing, shaping, and slicing make comparisons more useful. Keep the formula fixed while testing one process change.</p><p>Temperature and elapsed time are context, not universal readiness tests. Compare the dough’s rise, strength, aeration, and feel with the recipe and with your own previous batches.</p></section>
    <nav className="rounded-xl border border-border-subtle bg-surface-subtle p-5"><h2 className="font-bold text-foreground">Related tools and reading</h2><ul className="mt-3 list-disc space-y-2 pl-5"><li><Link className="underline" href="/sourdough-hydration-calculator">Compare dough hydration and flour choices</Link></li><li><Link className="underline" href="/guides/fermentation-timing">Track bulk fermentation with observations</Link></li><li><Link className="underline" href="/guides/starter-feeding">Understand starter feeding ratios</Link></li><li><Link className="underline" href="/methodology">Review calculator assumptions and limitations</Link></li></ul></nav>
    <p className="text-xs">This is general baking guidance. Flour, equipment, and room conditions vary; use a trusted recipe and your own observations.</p>
  </article>;
}
