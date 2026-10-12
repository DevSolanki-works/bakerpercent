import type { Metadata } from "next";
import SourdoughHydrationCalculator from "@/components/calculators/SourdoughHydrationCalculator";

export const metadata: Metadata = {
  title: "Sourdough Hydration Calculator: Total vs Added Water",
  description: "Calculate sourdough hydration with the flour and water in your starter included. Compare added-water hydration with true total dough hydration.",
  alternates: { canonical: "https://bakerpercent.com/sourdough-hydration-calculator" },
};

export default function Page() {
  return <SourdoughHydrationCalculator />;
}
