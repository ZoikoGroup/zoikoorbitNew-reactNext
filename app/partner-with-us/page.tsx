import PartnerWithUs from "./PartnerWithUs";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Become a Partner | Zoiko Orbit eSIM Solutions",
  description:
    "Become a Partner with Zoiko Orbit to offer global eSIM connectivity. Join our network and unlock scalable solutions, revenue growth, and worldwide coverage."

};
export default function page(){

    return(
        <>
        
        <PartnerWithUs/>
        
        </>
    );
}