import { Metadata } from "next";
import MyAccount from "./MyAccount";

export const metadata: Metadata = {
  title: "Zoiko Orbit | Dashboard",
  description: "Manage your Zoiko Orbit account — SIM data usage, orders, plans and support.",
};

export default function DashboardPage() {
  return <MyAccount />;
}