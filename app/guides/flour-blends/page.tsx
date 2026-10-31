import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Plan and Record a Bread Flour Blend",
  description:
    "Calculate flour blends by weight, translate blend percentages into grams, and run a controlled test bake without changing several variables at once.",
  alternates: { canonical: "https://bakerpercent.com/guides/flour-blends" },
};

export default function FlourBlendsGuide() {
  return (
    <article className="mx-auto max-w-3xl space-y-7 px-4 py-8 text-sm leading-relaxed text-foreground-muted sm:py-12">
      <header className="space-y-3">
        <p className="text-xs text-foreground-subtle"><Link href="/guides" className="underline">Baking Guides</Link> / Flour blends</p>
        <h1 className="text-3xl font-extrabold text-foreground">Plan a flour blend by weight, then test it deliberately</h1>
        <p>A flour blend is a formula inside your formula. Express each flour as a share of total flour, convert the shares to grams, and keep the other ingredients steady while you learn how the blend behaves in your kitchen.</p>
      </header>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-foreground">Set the flour total first</h2>
        <p>Suppose a bread formula uses 1,000 g total flour and you want to compare a blend of 70% bread flour, 20% whole wheat flour, and 10% rye flour. Convert each percentage to a decimal and multiply by the total flour:</p>
        <div className="rounded-xl border border-border-subtle bg-surface p-4 font-mono text-xs text-foreground">
          <p>Bread flour: 1,000 × 0.70 = 700 g</p>
          <p>Whole wheat flour: 1,000 × 0.20 = 200 g</p>
          <p>Rye flour: 1,000 × 0.10 = 100 g</p>
          <p className="mt-2 border-t border-border-subtle pt-2 font-bold">Check: 700 + 200 + 100 = 1,000 g total flour</p>
        </div>
        <p>The blend percentages should add to 100%. If your planned mix totals 105%, normalize it before scaling: divide each component’s percentage by 105 and multiply by 100, or choose the intended shares again.</p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-foreground">Keep ingredient accounting consistent</h2>
        <p>In a baker’s percentage formula, every flour that goes into the dough belongs in the total flour reference. If your starter contains flour, decide whether you are counting it in the blend. A 100% hydration starter added on top of 1,000 g base flour brings additional flour; if your goal is exactly 1,000 g total flour including the starter, reserve that starter flour from the blend total.</p>
        <p>This distinction matters when comparing recipes. Two formulas both labelled “1,000 g flour” can have different total flour if one includes levain flour and the other does not. Our <Link href="/guides/hydration" className="underline">hydration guide</Link> shows how to decompose starter flour and water.</p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-foreground">Change one variable at a time</h2>
        <p>Different flours can behave differently, but a label alone does not tell you exactly how much water a particular batch will absorb. Milling, brand, storage, and the flour’s whole-grain fraction all contribute. Treat a blend change as an experiment rather than assuming the same water percentage will give the same handling.</p>
        <ol className="list-decimal space-y-2 pl-5">
          <li>Choose a base formula you already know and record its flour weights and water.</li>
          <li>Change the flour blend while keeping the total flour, salt, starter, and process notes the same.</li>
          <li>If you want to test water as well, reserve a small measured amount and add it in stages only if the dough incorporates it comfortably.</li>
          <li>Record the final water amount, dough feel after mixing and resting, fermentation observations, shaping behavior, and cooled crumb.</li>
          <li>Repeat the same formula before drawing a broad conclusion from one bake.</li>
        </ol>
        <p>This method will not identify the cause of every result, but it makes comparisons more useful than changing flour, hydration, starter, and timing together.</p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-foreground">A small-batch comparison plan</h2>
        <p>When a full batch is inconvenient, make two smaller doughs with the same total flour and process. For example, use 500 g flour in each dough. Keep one as your reference blend. In the second, replace 50 g of the reference flour with another flour: that is a 10% substitution in the test blend.</p>
        <p>Use the same water, salt, starter, mixing order, dough temperature target, container, and observation schedule. Label the containers before mixing. If you need to adjust water for one dough, write down the change; the final formulas are no longer identical except for flour.</p>
        <p>Compare dough behavior at the same points in the process, not only at the same clock time. If fermentation speeds differ, record the visible cues and the time at which each dough reaches the shaping decision you use.</p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-foreground">What to record</h2>
        <div className="overflow-x-auto rounded-xl border border-border-subtle bg-surface p-4">
          <table className="w-full border-collapse text-left text-xs">
            <thead><tr className="border-b border-border-subtle text-foreground"><th className="py-2 pr-4">Stage</th><th className="py-2">Useful notes</th></tr></thead>
            <tbody>{[["Formula", "Flour brands and weights, total flour, water, starter hydration, salt"], ["Mix", "Water temperature, dough temperature, water held back, mixing and resting"], ["Bulk", "Times, dough temperature, visible rise, bubbles, folds, texture"], ["Shape and bake", "Piece weight, handling notes, bake setup and time"], ["Result", "Cool-down time, crumb observations, crust, what to keep or change"]].map((row) => <tr key={row[0]} className="border-b border-border-subtle last:border-0"><th scope="row" className="py-2 pr-4 font-medium text-foreground">{row[0]}</th><td className="py-2">{row[1]}</td></tr>)}</tbody>
          </table>
        </div>
        <p>Use the <Link href="/sourdough-hydration-calculator#flour-types" className="underline">hydration and flour reference</Link> as a starting point for organizing a test, not as a universal absorption chart. The <Link href="/guides/troubleshooting" className="underline">troubleshooting guide</Link> helps connect observations to the next controlled change.</p>
      </section>

      <aside className="rounded-xl border border-border-subtle bg-surface-subtle p-4">
        <h2 className="font-bold text-foreground">How to use this guide</h2>
        <p className="mt-2">The blend example is arithmetic, not a recommended recipe for every flour or loaf. BakerPercent does not measure flour strength or test each flour brand. Use a trusted recipe’s process, keep your records, and treat the next bake as a new observation.</p>
      </aside>
    </article>
  );
}
