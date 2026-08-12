import PersonalTravelers from "./PersonalTravelers";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Global eSIM Plans for Personal Travelers | Zoiko Orbit",
  description:
    "Travel smart with global eSIM plans for personal travelers. Enjoy instant activation, secure data, voice & roaming with coverage in 220+ countries."

};
export default function page(){

    return(
        <>
        
        <PersonalTravelers/>
        
        </>
    );
}