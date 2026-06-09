import Coverage from "./coverage";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Global Network Coverage | Zoiko Orbit",
  description:
    "Discover Zoiko Orbit’s global mobile network with coverage in over 220+ countries. Enjoy smooth, secure, and seamless connectivity worldwide."

};
export default function page(){


    return(
        <>

        <Coverage/>
        </>
    );
}