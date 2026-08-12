import type { Metadata } from "next";
import HomePage from "./home/HomePage";


export const metadata: Metadata = {
  title: "Best Global eSIM Plans | Zoiko Orbit",
  description: "Zoiko Orbit offers the best global eSIM plans with data, voice & roaming in 220+ countries. Stay connected anywhere with instant eSIM activation & low rates.",
};

export default function Page() {
  return <HomePage/>
}