import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Baking Guides: Baker’s Math, Starter Feeding & Fermentation",
  description: "Practical guides to baker’s percentages, sourdough starter feeding ratios, and dough fermentation cues, with worked examples and source notes.",
  alternates: { canonical: "https://bakerpercent.com/guides" },
};

const guides = [
  { href: "/guides/bakers-percentage", title: "Baker’s percentages, with a worked example", description: "Understand why flour is 100%, scale a formula to a target dough weight, and account for rounding." },
  { href: "/guides/starter-feeding", title: "Sourdough starter feeding ratios", description: "Read seed:water:flour ratios, work out a target feed by weight, and use your starter’s rise as the timing guide." },
  { href: "/guides/fermentation-timing", title: "How to track bulk fermentation", description: "Use dough temperature, volume, texture, and a simple log to learn your own fermentation pattern." },
  { href: "/guides/troubleshooting", title: "Sourdough troubleshooting by symptom", description: "Work through common dense, slack, gummy, or flat loaves with practical checks and a repeatable bake log." },
  { href: "/guides/pizza-dough", title: "Pizza dough math and workflow", description: "Scale a dough batch with a worked example, understand ball weight, and build a repeatable process for your oven." },
  { href: "/guides/hydration", title: "Sourdough hydration, starter, and flour", description: "Compare hydration conventions, account for starter flour and water, and adjust for a new flour methodically." },
];

export default function GuidesPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-8 sm:py-12 space-y-8">
      <header className="space-y-3">
        <h1 className="text-3xl font-extrabold text-foreground tracking-tight">Baking Guides</h1>
        <p className="text-sm text-foreground-muted leading-relaxed">A working reference for home bakers: each guide explains a decision, shows the arithmetic or observations behind it, and points out where results depend on your flour, starter, equipment, and kitchen. Use the guides with your own bake notes, not as one-size-fits-all recipes.</p>
      </header>
      <div className="space-y-4">
        {guides.map((guide) => <article key={guide.href} className="rounded-xl border border-border-subtle bg-surface p-5 space-y-2">
          <h2 className="font-bold text-foreground"><Link className="text-crust-primary hover:underline" href={guide.href}>{guide.title}</Link></h2>
          <p className="text-sm text-foreground-muted leading-relaxed">{guide.description}</p>
        </article>)}
      </div>
      <section className="space-y-3 rounded-xl border border-border-subtle bg-surface-subtle p-5 text-sm text-foreground-muted leading-relaxed">
        <h2 className="font-bold text-foreground">How to use these guides</h2>
        <p>Start with the guide matching the question you have: formula math for scaling, starter feeding for culture maintenance, fermentation tracking for dough readiness, and troubleshooting when a loaf behaves differently than expected. Keep the ingredient formula stable while you learn a process, and change one factor at a time.</p>
        <p>Calculators handle repeatable arithmetic. They cannot inspect your dough or verify that a starter is mature. For that reason, timing outputs are planning prompts and the guides emphasize observable cues and record keeping.</p>
      </section>
      <p className="text-xs text-foreground-subtle">Our <Link className="underline" href="/methodology">methodology page</Link> describes calculator assumptions. Questions or corrections? <Link className="underline" href="/contact">Contact us</Link>.</p>
    </div>
  );
}
