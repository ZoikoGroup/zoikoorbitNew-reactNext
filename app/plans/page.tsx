import { Suspense } from "react";
import { Metadata } from "next";
import PlansContent from "./plans-content";
export const metadata: Metadata = {
  title: "Best eSIM Plan for your Trip | Zoiko Orbit",
  description:
    "Zoiko Orbit offers the best eSIM plans for global travel. Activate instantly, choose your data, and stay connected in over 220+ destinations worldwide."

};  
export default function PlansPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PlansContent />
    </Suspense>
  );
}