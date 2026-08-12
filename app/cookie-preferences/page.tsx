import CookiePreferences from "./CookiePreferences";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Manage Your Cookie Preferences | Zoiko Orbit",
  description:
    "Manage your cookie preferences on Zoiko Orbit. Choose which cookies to accept for a customized, secure, and privacy-respecting eSIM experience."

};
export default function page(){


    return (
        <>
        <CookiePreferences/>
        
        </>
    );
}