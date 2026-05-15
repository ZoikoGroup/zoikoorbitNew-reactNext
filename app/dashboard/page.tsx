import { Metadata } from "next";
import MyAccount from "./MyAccount";

export const metadata: Metadata = {
  title: "My Account | Zoiko",
  description:
    "Manage your profile, security, and support all in one place.",
};

// NOTE: Authentication is intentionally disabled here for now.
// To re-enable later, wrap the returned component in <ProtectedRoute> and import it.

export default function DashboardPage() {
  return <MyAccount />;
}
