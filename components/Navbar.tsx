"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { WakeLockToggle } from "./WakeLockToggle";
import { KitchenTimer } from "./KitchenTimer";
import { ThemeToggle } from "./ThemeToggle";

export function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const links = [
    { href: "/pizza-dough-calculator", label: "Pizza Dough" },
    { href: "/sourdough-hydration-calculator", label: "Hydration Guide" },
    { href: "/sourdough-starter-feeding-calculator", label: "Starter Feeding" },
    { href: "/methodology", label: "Methodology" },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border-subtle bg-surface/90 backdrop-blur-md">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2.5 font-bold text-lg tracking-tight text-foreground hover:opacity-90">
          <span className="w-8 h-8 rounded-lg bg-crust-primary text-white flex items-center justify-center shadow-sm">
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2a9 9 0 0 1 9 9c0 4.97-4.03 9-9 9A9 9 0 0 1 3 11a9 9 0 0 1 9-9Z" />
              <path d="M7 11c1-2 3-3 5-3s4 1 5 3" />
              <path d="M8 15c1-1 2.5-1.5 4-1.5s3 .5 4 1.5" />
            </svg>
          </span>
          <span>Baker<span className="text-crust-primary">Percent</span></span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-6 text-sm font-medium">
          {links.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`transition-colors ${
                  isActive
                    ? "text-crust-primary font-semibold"
                    : "text-foreground-muted hover:text-foreground"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Right Tools (Timer + Wake Lock + Theme Toggle + Mobile Menu) */}
        <div className="flex items-center gap-2 sm:gap-3">
          <KitchenTimer />
          <WakeLockToggle />
          <ThemeToggle />

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            type="button"
            className="lg:hidden p-2 rounded-lg text-foreground-muted hover:text-foreground hover:bg-surface-subtle"
            aria-label="Toggle Menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-border-subtle bg-surface px-4 py-4 space-y-2">
          {links.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-crust-soft text-crust-primary font-semibold"
                    : "text-foreground-muted hover:bg-surface-subtle hover:text-foreground"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </div>
      )}
    </header>
  );
}
