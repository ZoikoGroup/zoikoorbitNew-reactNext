import IntegrationInterestForm from "./Integrationinterestform";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Travel Insurance eSIM Partnership Form | Zoiko Orbit",
  description:
    "Fill out the Zoiko Orbit travel insurance provider form to integrate eSIM solutions—enable global coverage, instant activation, and easy management tools."

};
export default function page(){


 return(
    <>

    <IntegrationInterestForm/>
    </>
 );   
}