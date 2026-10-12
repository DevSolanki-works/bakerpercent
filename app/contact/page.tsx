import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact | Feedback & Calculator Support",
  description: "Share feedback, report a calculator issue, or suggest a baking tool for BakerPercent.",
};

export default function ContactPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-8 sm:py-12 space-y-8">
      <div>
        <h1 className="text-3xl font-extrabold text-foreground tracking-tight">Contact BakerPercent</h1>
        <p className="mt-2 text-sm text-foreground-muted">
          Feedback, bug reports, and formula suggestions are always welcome.
        </p>
      </div>

      <div className="bg-surface rounded-2xl border border-border-subtle p-6 space-y-4 text-sm text-foreground-muted">
        <p>
          BakerPercent makes practical tools for home bakers and the artisan bread community. If you notice a calculation issue, want to suggest a flour type, or have an idea for another tool, email us and we&rsquo;ll review your feedback.
        </p>

        <div className="p-4 rounded-xl bg-surface-subtle border border-border-subtle space-y-2">
          <div className="text-xs font-semibold uppercase text-foreground-subtle">Support contact</div>
          <a className="text-sm text-crust-primary underline underline-offset-2" href="mailto:dev.solanki.works@gmail.com">
            dev.solanki.works@gmail.com
          </a>
        </div>

        <p className="text-xs text-foreground-subtle">
          For bug reports, please include your device type (e.g., iPhone Safari, Android Chrome) and the formula values you were using so we can reproduce and patch the issue promptly.
        </p>
      </div>
    </div>
  );
}
