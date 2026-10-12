import Link from "next/link";

export function Footer() {
  return (
    <footer className="mt-20 border-t border-border-subtle bg-surface-subtle text-foreground-muted">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand Info */}
          <div className="md:col-span-1 space-y-3">
            <div className="flex items-center gap-2 font-bold text-base text-foreground">
              <span className="w-6 h-6 rounded-md bg-crust-primary text-white flex items-center justify-center text-xs">
                🍞
              </span>
              <span>Dough<span className="text-crust-primary">Ratio</span></span>
            </div>
            <p className="text-xs leading-relaxed text-foreground-subtle">
              The precision baker&rsquo;s math calculator built for artisan sourdough, pizza, and bread makers. Fast, client-side, and designed for kitchen counter ergonomics.
            </p>
          </div>

          {/* Calculators */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-foreground mb-3">Calculators</h3>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/" className="hover:text-crust-primary transition-colors">
                  Sourdough Calculator
                </Link>
              </li>
              <li>
                <Link href="/pizza-dough-calculator" className="hover:text-crust-primary transition-colors">
                  Pizza Dough Calculator
                </Link>
              </li>
              <li>
                <Link href="/sourdough-hydration-calculator" className="hover:text-crust-primary transition-colors">
                  Hydration Calculator
                </Link>
              </li>
              <li>
                <Link href="/sourdough-starter-feeding-calculator" className="hover:text-crust-primary transition-colors">
                  Starter Feeding Calculator
                </Link>
              </li>
            </ul>
          </div>

          {/* Guides & Science */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-foreground mb-3">Baking Science</h3>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/methodology" className="hover:text-crust-primary transition-colors">
                  Baker&rsquo;s Percentage Formulas
                </Link>
              </li>
              <li>
                <Link href="/sourdough-hydration-calculator#flour-types" className="hover:text-crust-primary transition-colors">
                  Flour Absorption Rates
                </Link>
              </li>
              <li>
                <Link href="/sourdough-starter-feeding-calculator#ratios" className="hover:text-crust-primary transition-colors">
                  Starter Ratios (1:1:1 to 1:5:5)
                </Link>
              </li>
              <li>
                <Link href="/methodology#fermentation-temperature" className="hover:text-crust-primary transition-colors">
                  Temperature Kinetics
                </Link>
              </li>
            </ul>
          </div>

          {/* Trust & Legal */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-foreground mb-3">Trust &amp; Legal</h3>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/about" className="hover:text-crust-primary transition-colors">
                  About &amp; Mission
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-crust-primary transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-crust-primary transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-crust-primary transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-border-subtle flex flex-col sm:flex-row items-center justify-between text-xs text-foreground-subtle gap-4">
          <p>&copy; {new Date().getFullYear()} DoughRatio. All rights reserved. Free for home bakers &amp; culinary students.</p>
          <p className="text-[11px]">
            Tip: Keep Screen Awake mode uses the HTML5 Screen Wake Lock API locally on your device.
          </p>
        </div>
      </div>
    </footer>
  );
}
