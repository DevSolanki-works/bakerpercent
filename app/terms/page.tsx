import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Terms for using BakerPercent's free bread, sourdough, pizza dough, hydration, and starter feeding calculators.",
  alternates: { canonical: "https://bakerpercent.com/terms" },
};

export default function TermsPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-8 sm:py-12 space-y-6 text-sm text-foreground-muted leading-relaxed">
      <h1 className="text-3xl font-extrabold text-foreground tracking-tight">Terms of Service</h1>
      <p className="text-xs text-foreground-subtle">Last Updated: October 2026</p>

      <section className="space-y-3 pt-4">
        <h2 className="text-lg font-bold text-foreground">1. Acceptance of Terms</h2>
        <p>
          By accessing and using BakerPercent, you agree to comply with these Terms of Service. If you do not agree with any part of these terms, please do not use the site.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-bold text-foreground">2. Description of Service &amp; Disclaimer</h2>
        <p>
          BakerPercent provides free mathematical calculation utilities, baker&rsquo;s percentage calculators, and fermentation guidance for informational and recreational baking purposes.
        </p>
        <p>
          The calculators apply the formulas described on the methodology page, with some displayed values rounded for readability. Baking outcomes depend on factors including flour, dough and room temperature, culture activity, and equipment. Calculator results and fermentation time windows are provided &ldquo;as is&rdquo; without warranty of any kind. Use a recipe suited to your ingredients and observe your dough.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-bold text-foreground">3. Intellectual Property</h2>
        <p>
          All website layouts, branding, proprietary code, and original educational guides are the intellectual property of BakerPercent. Traditional mathematical formulas for baker&rsquo;s percentages belong to the public culinary domain.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-bold text-foreground">4. Modifications to Service</h2>
        <p>
          We reserve the right to modify, update, or discontinue any feature of BakerPercent at any time without notice.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-bold text-foreground">5. Contact</h2>
        <p>For questions about these terms, use the <Link href="/contact" className="underline">contact page</Link> or email <a className="underline" href="mailto:dev.solanki.works@gmail.com">dev.solanki.works@gmail.com</a>.</p>
      </section>
    </div>
  );
}
