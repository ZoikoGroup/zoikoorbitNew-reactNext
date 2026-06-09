import CorporateResponsibility from "./CorporateResponsibility";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Corporate Responsibility & ESG Values | Zoiko Orbit",
  description:
    "Discover how Zoiko Orbit integrates ESG values and corporate responsibility to build a sustainable, ethical, and environmentally conscious business model."

};


export default function page() {
  return (
    <>
    <CorporateResponsibility/>
    { /* <corporateresponsibility/> */}
    </>
  )
}
