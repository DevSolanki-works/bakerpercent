import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service | DoughRatio",
  description: "Terms of service for using DoughRatio's free precision baker's percentage calculators.",
};

export default function TermsPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-8 sm:py-12 space-y-6 text-sm text-foreground-muted leading-relaxed">
      <h1 className="text-3xl font-extrabold text-foreground tracking-tight">Terms of Service</h1>
      <p className="text-xs text-foreground-subtle">Last Updated: October 2026</p>

      <section className="space-y-3 pt-4">
        <h2 className="text-lg font-bold text-foreground">1. Acceptance of Terms</h2>
        <p>
          By accessing and using DoughRatio (https://doughratio.pages.dev), you agree to comply with and be bound by these Terms of Service. If you do not agree with any part of these terms, please do not use our service.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-bold text-foreground">2. Description of Service &amp; Disclaimer</h2>
        <p>
          DoughRatio provides free mathematical calculation utilities, baker&rsquo;s percentage calculators, and fermentation guidance for informational and recreational baking purposes.
        </p>
        <p>
          While our mathematical formulas are mathematically precise, baking outcomes depend on environmental factors including flour moisture, ambient humidity, yeast viability, and oven accuracy. All calculators and fermentation time windows are provided &ldquo;as is&rdquo; without warranty of any kind. Always inspect your dough for visual cues and food safety standards.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-bold text-foreground">3. Intellectual Property</h2>
        <p>
          All website layouts, branding, proprietary code, and original educational guides are the intellectual property of DoughRatio. Traditional mathematical formulas for baker&rsquo;s percentages belong to the public culinary domain.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-bold text-foreground">4. Modifications to Service</h2>
        <p>
          We reserve the right to modify, update, or discontinue any feature of DoughRatio at any time without notice.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-bold text-foreground">5. Contact</h2>
        <p>
          Questions about these Terms should be sent to{" "}
          <a href="mailto:hello@doughratio.com" className="text-crust-primary underline font-medium">
            hello@doughratio.com
          </a>.
        </p>
      </section>
    </div>
  );
}
