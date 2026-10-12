import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CookieConsent } from "@/components/CookieConsent";

export const metadata: Metadata = {
  metadataBase: new URL("https://doughratio.pages.dev"),
  title: {
    default: "DoughRatio — Precision Sourdough & Baker's Percentage Calculator",
    template: "%s | DoughRatio",
  },
  description:
    "Free artisan sourdough and baker's percentage calculator. Scale dough backward from loaf count, calculate true hydration with starter, and keep your kitchen screen awake.",
  keywords: [
    "sourdough calculator",
    "bakers percentage calculator",
    "sourdough hydration calculator",
    "bread dough calculator",
    "pizza dough calculator",
    "reverse sourdough calculator",
    "sourdough starter feeding calculator",
    "bulk fermentation calculator",
  ],
  authors: [{ name: "DoughRatio Artisan Bakers" }],
  creator: "DoughRatio",
  publisher: "DoughRatio",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: "DoughRatio — Sourdough & Baker's Percentage Calculator",
    description:
      "Scale recipes backward from loaf count, calculate true total hydration with starter, and estimate bulk fermentation by ambient room temperature.",
    url: "https://doughratio.pages.dev",
    siteName: "DoughRatio",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "DoughRatio — Sourdough & Baker's Percentage Calculator",
    description:
      "Precision artisan sourdough calculator for home and professional bakers.",
  },
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#b85426" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="DoughRatio" />
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4922314688440658"
          crossOrigin="anonymous"
        />

        {/* Prevent Flash of Unstyled Theme */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem("doughratio_theme");var d=window.matchMedia("(prefers-color-scheme: dark)").matches;if(t==="dark"||(!t&&d)){document.documentElement.classList.add("dark");}else{document.documentElement.classList.remove("dark");}}catch(e){}})();`,
          }}
        />
        {/* Schema.org WebApplication */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              name: "DoughRatio Sourdough Calculator",
              url: "https://doughratio.pages.dev",
              description:
                "Free precision baker's percentage and sourdough hydration calculator with reverse loaf scaling and ambient temperature fermentation guide.",
              applicationCategory: "UtilityApplication",
              operatingSystem: "Any",
              offers: {
                "@type": "Offer",
                price: "0",
                priceCurrency: "USD",
              },
            }),
          }}
        />
      </head>
      <body className="min-h-screen flex flex-col bg-background text-foreground antialiased selection:bg-crust-soft selection:text-crust-primary">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <CookieConsent />
      </body>
    </html>
  );
}
