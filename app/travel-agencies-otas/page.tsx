import Travelagency from "./travelagency";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "eSIM for Travel Agencies & OTAs | Zoiko Orbit",
  description:
    "Boost your travel platform with eSIM for travel agencies & OTAs. Zoiko Orbit delivers global data, easy setup, and smart management tools."

};
export default function page(){

    return(
        <>
        
        <Travelagency/>
        </>
    );
}