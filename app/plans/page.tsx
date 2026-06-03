import { Suspense } from "react";
import PlansContent from "./plans-content";

export default function PlansPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PlansContent />
    </Suspense>
  );
}