import Link from "next/link";

export default function NotFound() {
  return (
    <section className="mx-auto max-w-3xl px-4 py-20 text-center space-y-5">
      <p className="text-sm font-semibold uppercase tracking-widest text-crust-primary">404 · Page not found</p>
      <h1 className="text-3xl sm:text-4xl font-extrabold text-foreground">Looks like this page wandered off the counter.</h1>
      <p className="mx-auto max-w-xl text-sm leading-relaxed text-foreground-muted">The address may be outdated or mistyped. Head back to the calculators or browse our practical baking guides.</p>
      <div className="flex flex-wrap justify-center gap-3">
        <Link href="/" className="rounded-lg bg-crust-primary px-5 py-3 text-sm font-semibold text-white">Open the sourdough calculator</Link>
        <Link href="/guides" className="rounded-lg border border-border-subtle bg-surface px-5 py-3 text-sm font-semibold text-foreground">Browse baking guides</Link>
      </div>
    </section>
  );
}
