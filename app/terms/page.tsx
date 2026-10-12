import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service | BakerPercent Baking Calculators",
  description: "Terms for using BakerPercent's free bread, sourdough, pizza dough, hydration, and starter feeding calculators.",
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
          While our mathematical formulas are mathematically precise, baking outcomes depend on environmental factors including flour moisture, ambient humidity, yeast viability, and oven accuracy. All calculators and fermentation time windows are provided &ldquo;as is&rdquo; without warranty of any kind. Always inspect your dough for visual cues and food safety standards.
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
        <p>
          Direct contact details for questions about these Terms will be published with the permanent domain.
        </p>
      </section>
    </div>
  );
}
