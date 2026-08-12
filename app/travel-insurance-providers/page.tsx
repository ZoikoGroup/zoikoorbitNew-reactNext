import TravelInsuranceProviders from "./Travelinsuranceproviders";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Travel Insurance Providers | Zoiko Orbit eSIM Partner",
  description:
    "Travel insurance providers partner with Zoiko Orbit to embed eSIMs—offer global coverage, instant activation, dashboards, and API tools for better service."

};

export default function page(){


    return(
        <>
        <TravelInsuranceProviders/>
        </>
    );
}