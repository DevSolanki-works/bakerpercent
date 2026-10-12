import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CookieConsent } from "@/components/CookieConsent";
import { GoogleAnalytics } from "@/components/GoogleAnalytics";

export const metadata: Metadata = {
  metadataBase: new URL("https://bakerpercent.com"),
  title: {
    default: "BakerPercent | Free Bread & Sourdough Calculators",
    template: "%s | BakerPercent",
  },
  description:
    "Free sourdough, pizza dough, hydration, and starter feeding calculators. Scale bread recipes by baker's percentage and plan dough with clear, practical results.",
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
  authors: [{ name: "BakerPercent" }],
  creator: "BakerPercent",
  publisher: "BakerPercent",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: "BakerPercent | Free Bread & Sourdough Calculators",
    description:
      "Scale recipes backward from loaf count, calculate true total hydration with starter, and estimate bulk fermentation by ambient room temperature.",
    url: "https://bakerpercent.com",
    siteName: "BakerPercent",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "BakerPercent | Free Bread & Sourdough Calculators",
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
        <meta name="apple-mobile-web-app-title" content="BakerPercent" />
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4922314688440658"
          crossOrigin="anonymous"
        />

        {/* Prevent Flash of Unstyled Theme */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem("bakerpercent_theme");if(!t){t=localStorage.getItem("doughratio_theme");if(t){localStorage.setItem("bakerpercent_theme",t);}}var d=window.matchMedia("(prefers-color-scheme: dark)").matches;if(t==="dark"||(!t&&d)){document.documentElement.classList.add("dark");}else{document.documentElement.classList.remove("dark");}}catch(e){}})();`,
          }}
        />
        {/* Schema.org WebApplication */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              name: "BakerPercent Baking Calculators",
              url: "https://bakerpercent.com",
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
        <GoogleAnalytics />
      </body>
    </html>
  );
}
