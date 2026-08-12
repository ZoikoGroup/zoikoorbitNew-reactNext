import PrivacyPolicy from "./Privacypolicy";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Zoiko Orbit Privacy Policy | Transparent Data Handling",
  description:
    "Learn how Zoiko Orbit ensures your data is protected. Our privacy policy covers data use, collection, security, and your rights under privacy laws."

};

export default function page(){

    return(
<>
<PrivacyPolicy/>
</>

    );
}