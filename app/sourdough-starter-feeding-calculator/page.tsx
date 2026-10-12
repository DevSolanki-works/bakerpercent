import type { Metadata } from "next";
import SourdoughStarterFeedingCalculator from "@/components/calculators/SourdoughStarterFeedingCalculator";

export const metadata: Metadata = {
  title: "Sourdough Starter Feeding Calculator: Ratios & Peak Time",
  description: "Plan a sourdough starter feeding by target quantity and feed ratio. Estimate peak timing using the selected ratio and room temperature.",
  alternates: { canonical: "https://doughratio.pages.dev/sourdough-starter-feeding-calculator" },
};

export default function Page() {
  return <SourdoughStarterFeedingCalculator />;
}
