import TermsOfService from "./TermsOfService";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Zoiko Orbit Terms of Service | Legal & Usage Policies",
  description:
    "Read Zoiko Orbit’s Terms of Service to understand your rights, responsibilities, and service conditions when using our global eSIM connectivity platform."

};

export default function page(){
    return(
    <>    
    <TermsOfService/>
    </>
    );
}