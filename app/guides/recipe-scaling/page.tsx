import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Scale a Bread Recipe by Target Dough Weight",
  description:
    "A worked baker’s percentage example for scaling a sourdough formula to a target dough weight, with starter accounting, rounding, and batch notes.",
  alternates: { canonical: "https://bakerpercent.com/guides/recipe-scaling" },
};

export default function RecipeScalingGuide() {
  return (
    <article className="mx-auto max-w-3xl space-y-7 px-4 py-8 text-sm leading-relaxed text-foreground-muted sm:py-12">
      <header className="space-y-3">
        <p className="text-xs text-foreground-subtle"><Link href="/guides" className="underline">Baking Guides</Link> / Recipe scaling</p>
        <h1 className="text-3xl font-extrabold text-foreground">Scale a bread recipe to the dough weight you need</h1>
        <p>Scaling a formula is more reliable when you separate the arithmetic from the baking schedule. First preserve the ingredient ratios, then decide how to divide and ferment the larger or smaller batch.</p>
      </header>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-foreground">Start with a complete formula</h2>
        <p>Suppose a recipe uses 750 g flour, 525 g added water, 150 g starter at 100% hydration, and 15 g salt. The batch weighs 1,440 g before mixing losses. Its baker’s percentages are 100% flour, 70% added water, 20% starter, and 2% salt.</p>
        <p>Those percentages describe the formula. They do not promise a fixed fermentation time or the same dough feel with every flour. Keep the original process notes with the ingredients when you scale.</p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-foreground">Worked example: three 650 g dough pieces</h2>
        <p>The target batch is 3 × 650 g = 1,950 g. The original batch is 1,440 g, so the scale factor is 1,950 ÷ 1,440 = 1.3542. Multiply each ingredient by the same factor:</p>
        <div className="overflow-x-auto rounded-xl border border-border-subtle bg-surface p-4">
          <table className="w-full border-collapse text-left text-xs">
            <thead><tr className="border-b border-border-subtle text-foreground"><th className="py-2 pr-4">Ingredient</th><th className="py-2 pr-4">Original</th><th className="py-2 pr-4">Scaled</th><th className="py-2">Rounded</th></tr></thead>
            <tbody>
              {[["Flour", "750 g", "1,015.6 g", "1,016 g"], ["Added water", "525 g", "710.9 g", "711 g"], ["100% hydration starter", "150 g", "203.1 g", "203 g"], ["Salt", "15 g", "20.3 g", "20 g"]].map((row) => <tr key={row[0]} className="border-b border-border-subtle last:border-0"><th scope="row" className="py-2 pr-4 font-medium text-foreground">{row[0]}</th><td className="py-2 pr-4">{row[1]}</td><td className="py-2 pr-4">{row[2]}</td><td className="py-2">{row[3]}</td></tr>)}
            </tbody>
          </table>
        </div>
        <p>The rounded ingredients total 1,950 g, so this example still divides evenly into three 650 g pieces. In other formulas, rounding can create a small difference. If exact portion weights matter, record the rounded ingredient total and divide that number rather than relying on unrounded calculator values.</p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-foreground">Account for flour and water in the starter</h2>
        <p>A 100% hydration starter has equal flour and water by weight. The original 150 g starter therefore contributes 75 g flour and 75 g water. The original formula has 825 g total flour and 600 g total water, for a total hydration of 72.7%, even though its added-water hydration is 70%.</p>
        <p>When you scale the recipe, the 203 g starter contributes about 101.5 g flour and 101.5 g water. This relationship stays the same because all ingredients were multiplied by one factor. If your starter has a different hydration, or the recipe already includes levain flour in its flour total, recalculate the split instead of assuming equal parts.</p>
        <p>For the difference between added and total hydration, see the <Link href="/guides/hydration" className="underline">hydration guide</Link> and check the assumptions in our <Link href="/methodology" className="underline">formula methodology</Link>.</p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-foreground">What scaling does not change automatically</h2>
        <ul className="list-disc space-y-2 pl-5">
          <li><strong className="text-foreground">Fermentation time:</strong> A larger mass can warm and cool differently, and dough temperature, starter condition, and container shape matter. Use the recipe’s cues and check the dough.</li>
          <li><strong className="text-foreground">Equipment capacity:</strong> Confirm that the mixer, bowl, proofing container, and oven can handle the scaled batch.</li>
          <li><strong className="text-foreground">Small ingredient precision:</strong> Tiny yeast or salt quantities may fall below the resolution of a kitchen scale. Use a more precise scale or a tested measurement method rather than rounding them away.</li>
          <li><strong className="text-foreground">Baked loaf weight:</strong> Target dough weight is the portion before baking. Water loss during baking means the cooled loaf weighs less.</li>
        </ul>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-foreground">A repeatable scaling checklist</h2>
        <ol className="list-decimal space-y-2 pl-5">
          <li>Write down every ingredient and confirm whether levain flour is included in the flour total.</li>
          <li>Choose a target dough mass based on the number and size of pieces you want.</li>
          <li>Apply one scale factor to every ingredient, then check the sum after rounding.</li>
          <li>Keep the original fermentation method unless you are intentionally testing a process change.</li>
          <li>Record dough temperature, fermentation cues, final portion weights, and any adjustment for the next bake.</li>
        </ol>
        <p>The <Link href="/" className="font-semibold underline">sourdough calculator</Link> works backward from a target loaf weight. The <Link href="/pizza-dough-calculator" className="font-semibold underline">pizza dough calculator</Link> uses the same portion-first idea for dough balls.</p>
      </section>

      <aside className="rounded-xl border border-border-subtle bg-surface-subtle p-4">
        <h2 className="font-bold text-foreground">Source and scope</h2>
        <p className="mt-2">The example uses ratio arithmetic and an explicitly stated 100% hydration starter. For an independent overview of baker’s math, see <a className="underline" href="https://www.kingarthurbaking.com/blog/2022/04/28/what-is-bakers-math-and-how-can-i-use-it-in-my-everyday-bread-baking" target="_blank" rel="noreferrer">King Arthur Baking’s baker’s math guide</a>. The scale calculation does not predict dough readiness.</p>
      </aside>
    </article>
  );
}
