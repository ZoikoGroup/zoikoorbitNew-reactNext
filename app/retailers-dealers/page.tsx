import RetailersDealers from "./Retailersdealers";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Zoiko Orbit eSIM Retailers & Dealers | Join Our Network",
  description:
    "Become a Zoiko Orbit eSIM retailer or dealer. Join our global network and offer top-tier eSIM plans with great margins and full partner support."

};
export default function page(){

    return(
        <>
        
        <RetailersDealers/>
        </>
    );
}