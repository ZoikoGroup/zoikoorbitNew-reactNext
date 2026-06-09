import Pressmedia from "./pressmedia";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Latest Press & Media Announcements | Zoiko Orbit",
  description:
    "Discover the latest press releases, media coverage, and official announcements from Zoiko Orbit. Stay updated on news, stories, and brand developments."

};
export default function page(){

    return(
        <>
        
        <Pressmedia/>
        </>
    );
}