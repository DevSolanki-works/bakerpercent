import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us | DoughRatio",
  description: "Get in touch with the DoughRatio team for feedback, recipe questions, or feature suggestions.",
};

export default function ContactPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-8 sm:py-12 space-y-8">
      <div>
        <h1 className="text-3xl font-extrabold text-foreground tracking-tight">Contact DoughRatio</h1>
        <p className="mt-2 text-sm text-foreground-muted">
          Feedback, bug reports, and formula suggestions are always welcome.
        </p>
      </div>

      <div className="bg-surface rounded-2xl border border-border-subtle p-6 space-y-4 text-sm text-foreground-muted">
        <p>
          We build DoughRatio for the global home baking and artisan bread community. If you noticed an issue with our mathematical calculations, want to suggest a new flour type, or have an idea for a companion tool, reach out:
        </p>

        <div className="p-4 rounded-xl bg-surface-subtle border border-border-subtle space-y-2">
          <div className="text-xs font-semibold uppercase text-foreground-subtle">Direct Email Support</div>
          <div className="text-sm font-bold text-foreground">
            <a href="mailto:hello@doughratio.com" className="text-crust-primary hover:underline">
              hello@doughratio.com
            </a>
          </div>
          <div className="text-xs text-foreground-subtle">
            We typically respond within 24–48 hours.
          </div>
        </div>

        <p className="text-xs text-foreground-subtle">
          For bug reports, please include your device type (e.g., iPhone Safari, Android Chrome) and the formula values you were using so we can reproduce and patch the issue promptly.
        </p>
      </div>
    </div>
  );
}
