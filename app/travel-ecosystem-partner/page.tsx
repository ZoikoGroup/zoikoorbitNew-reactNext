import TravelEcosystemPartners from "./TravelEcosystemPartners";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Travel Ecosystem Partner Program | Zoiko Orbit",
  description:
    "Join Zoiko Orbit travel ecosystem partner program to offer global eSIM connectivity, enhance customer experience, and grow your travel business."

};
export default function page(){

    return(
        <>
     
        <TravelEcosystemPartners/>
        </>
    );
}