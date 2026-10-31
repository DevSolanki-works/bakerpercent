import type { Metadata } from "next";
import { AnalyticsConsentSettings } from "@/components/AnalyticsConsentSettings";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Read how BakerPercent handles browser-based recipe calculations, local storage, cookies, and advertising partners.",
  alternates: { canonical: "https://bakerpercent.com/privacy" },
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
          Recipe calculations run in your browser; the site does not have a recipe account or recipe database. Browser storage is used for local interface preferences and your analytics choice. Clearing this site&rsquo;s browser data removes those saved values.
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
        <h2 className="text-lg font-bold text-foreground">5. Optional Google Analytics</h2>
        <p>
          If you choose “Allow analytics,” BakerPercent uses Google Analytics 4 to measure page views and site interactions. The Google Analytics tag is not loaded unless you allow it. If you reject analytics, or withdraw consent below, analytics remains off. Your choice is stored in this browser and does not affect the calculators or your separate advertising privacy choices.
        </p>
        <p>
          Google may process information such as pages visited, browser and device details, and interaction events to provide these reports. If you copy a recipe, the optional event records only that action and which calculator was used; ingredient values and recipe text are not sent as event parameters. See <a className="underline underline-offset-2" href="https://policies.google.com/privacy" target="_blank" rel="noreferrer">How Google handles information from sites or apps that use its services</a> for more details.
        </p>
        <AnalyticsConsentSettings />
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-bold text-foreground">6. Contact Information</h2>
        <p>
          For privacy questions or requests, contact <a className="underline underline-offset-2" href="mailto:dev.solanki.works@gmail.com">dev.solanki.works@gmail.com</a>.
        </p>
      </section>
    </div>
  );
}
