import SupportCenter from "./SupportCenter";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Customer Support & Help Center | Zoiko Orbit",
  description:
    "Need help with your Zoiko Orbit service? Access 24/7 support, FAQs, and troubleshooting tips for eSIM, SIM, activation, plans, and global connectivity."

};
export default function page(){


    return (
        <>
        
        <SupportCenter/>
        </>
    );
}