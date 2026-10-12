# DoughRatio — Precision Sourdough & Baker's Percentage Calculator

A mobile-first, zero-runtime-server artisan bread and baker's math calculator designed to solve real kitchen pain points:
- **Reverse Loaf Scaling:** Calculate backward from desired loaf count and target weights (e.g., 2 loaves × 850g).
- **True Starter Hydration:** Accounts for the 50% water and 50% flour inside standard 100% hydration levains.
- **Kitchen Mode Screen Wake Lock:** Keeps phone/tablet screens awake using the HTML5 Screen Wake Lock API while hands are covered in dough and flour.
- **Multi-Flour Blending:** Balances bread flour, whole wheat, and rye automatically.
- **Ambient Temperature Assistant:** Estimates bulk fermentation windows (hours) based on room temperature and starter inoculation.
- **Companion Calculators:** Pizza Dough Calculator (`/pizza-dough-calculator`), Hydration Analyzer (`/sourdough-hydration-calculator`), and Starter Feeding Calculator (`/sourdough-starter-feeding-calculator`).

---

## Technical Architecture

* **Framework:** Next.js 16 (App Router) + React 19
* **Styling:** Tailwind CSS 4 with bespoke artisan bakery color tokens
* **Math Engine:** Centralized, deterministic library in `lib/calculator/engine.ts`
* **Test Suite:** Native Node.js test runner (`npm test`)
* **Output:** Pure static HTML/CSS/JS export in `out/` (Zero database, zero backend API dependencies)
* **Hosting Targets:** Cloudflare Pages (free), Vercel Hobby, GitHub Pages, or any static host

---

## Quick Start

### 1. Development Server
```bash
npm install
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view the tool.

### 2. Run Deterministic Unit Tests
```bash
npm test
```
Executes `node --test lib/calculator/__tests__/engine.test.ts`.

### 3. Production Static Build
```bash
npm run build
```
Generates production-ready static assets in the `out/` directory.

### 4. Deploy to Cloudflare Pages
```bash
# Direct CLI deploy
npm run deploy:cloudflare

# Or simply upload the `out/` folder directly in the Cloudflare Pages dashboard
```

---

## SEO & Site Structure

* `/` — Sourdough & Baker's Percentage Calculator (Flagship Tool) + Comprehensive Baker's Math Guide
* `/pizza-dough-calculator` — Neapolitan, NY Style, and Detroit Pan Pizza Calculator
* `/sourdough-hydration-calculator` — Crumb Structure Forecaster & Flour Absorption Matrix
* `/sourdough-starter-feeding-calculator` — Zero-waste feeding ratios (1:1:1 to 1:5:5) and peak timer
* `/methodology` — Formula derivations and fermentation kinetics
* `/about` — Mission & kitchen ergonomics principles
* `/contact` — Feedback and support
* `/privacy` & `/terms` — AdSense-compliant privacy policy and terms
* `/robots.txt` & `/sitemap.xml` — Static search engine indexing files
