import Apiintegration from "./apiintegration";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "API Integrations for eSIM Connectivity | Zoiko Orbit",
  description:
    "Zoiko Orbit offers robust eSIM API integrations for global connectivity. Automate provisioning, activation, and device management with ease."

};
export default function page(){

    return(
        <>
        
        <Apiintegration/>
        </>
    );
}