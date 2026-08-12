import Aboutus from "./Aboutus";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "About Zoiko Orbit | Our Mission and Vision",
  description:
    "Learn about Zoiko Orbit’s mission, values, and team dedicated to driving innovation and delivering exceptional solutions to our clients worldwide."

};
export default function page(){


    return(
        <>
        <Aboutus/>
        </>
    );
}