import React from 'react'
import Accessibility from './Accessibility'
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Website Accessibility Guide | Zoiko Orbit ",
  description:
    "Zoiko Orbit is committed to accessibility, ensuring our website is inclusive, user-friendly, and compliant with global accessibility standards."

};
export default function page() {
  return (
    <>
    <Accessibility />
    </>
  )
}
