import type { Metadata } from "next";
import PizzaDoughCalculator from "@/components/calculators/PizzaDoughCalculator";

export const metadata: Metadata = {
  title: "Pizza Dough Calculator: Baker's Percentages & Dough Balls",
  description: "Scale pizza dough by dough ball count and weight. Compare Neapolitan, New York, and pan styles with hydration, yeast, salt, oil, and baker's percentages.",
  alternates: { canonical: "https://bakerpercent.com/pizza-dough-calculator" },
};

export default function Page() {
  return <PizzaDoughCalculator />;
}
