import { Metadata } from "next";
import Login from "./Login";

export const metadata: Metadata = {
  title: "Login to Zoiko Orbit | Manage Your eSIM Account",
  description:
    "Log in to your Zoiko Orbit account to manage global eSIM plans, monitor data usage, update settings, and stay securely connected worldwide anytime.",
};

export default function Page() {
  return <Login />;
}