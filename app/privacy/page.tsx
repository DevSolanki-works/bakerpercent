import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Read how BakerPercent handles browser-based recipe calculations, local storage, cookies, and advertising partners.",
};

export default function PrivacyPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-8 sm:py-12 space-y-6 text-sm text-foreground-muted leading-relaxed">
      <h1 className="text-3xl font-extrabold text-foreground tracking-tight">Privacy Policy</h1>
      <p className="text-xs text-foreground-subtle">Last Updated: October 2026</p>

      <section className="space-y-3 pt-4">
        <h2 className="text-lg font-bold text-foreground">1. Our Commitment to Privacy</h2>
        <p>
          BakerPercent tools process recipe calculations in your browser. Some preferences are stored locally on your device; advertising partners may use cookies as described below.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-bold text-foreground">2. Client-Side Data Processing &amp; Local Storage</h2>
        <p>
          All recipe calculations, baker&rsquo;s percentages, loaf scaling, and ambient temperature adjustments occur entirely in your web browser using client-side JavaScript. 
        </p>
        <p>
          We do not transmit your recipe formulas or personal notes to any remote web server or database. We utilize your browser&rsquo;s native <code>localStorage</code> purely to remember your last entered recipe preferences (such as loaf count and hydration percentage) so your recipe is saved when you revisit the site. You can clear this data at any time by clearing your browser cache.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-bold text-foreground">3. Screen Wake Lock API</h2>
        <p>
          When you enable &ldquo;Kitchen Mode,&rdquo; our website uses the HTML5 Screen Wake Lock API to prevent your device screen from locking. This feature communicates solely with your device&rsquo;s operating system; no telemetry is sent over the network.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-bold text-foreground">4. Cookies &amp; Advertising Partners</h2>
        <p>
          BakerPercent uses Google AdSense to serve advertisements that help keep the service free. Google and its partners may use cookies or similar technologies to serve ads based on your visits to this or other websites, subject to your settings and applicable consent requirements.
        </p>
        <p>
          You can manage personalized advertising through <a className="underline underline-offset-2" href="https://adssettings.google.com/" target="_blank" rel="noreferrer">Google Ads Settings</a> or the <a className="underline underline-offset-2" href="https://optout.aboutads.info/" target="_blank" rel="noreferrer">Digital Advertising Alliance</a>.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-bold text-foreground">5. Contact Information</h2>
        <p>
          For privacy questions or requests, contact <a className="underline underline-offset-2" href="mailto:dev.solanki.works@gmail.com">dev.solanki.works@gmail.com</a>.
        </p>
      </section>
    </div>
  );
}
