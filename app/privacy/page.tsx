import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | BakerPercent",
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
          BakerPercent may partner with third-party advertising vendors (such as Google AdSense) to serve display advertisements that keep the service free. Third-party vendors, including Google, use cookies to serve ads based on a user&rsquo;s prior visits to this or other websites.
        </p>
        <p>
          You may opt out of personalized advertising by visiting Google Ads Settings (https://adssettings.google.com) or via the Digital Advertising Alliance at optout.aboutads.info.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-bold text-foreground">5. Contact Information</h2>
        <p>
          Direct privacy inquiries contact details will be published with the permanent domain. The site currently runs at a temporary hosting address.
        </p>
      </section>
    </div>
  );
}
