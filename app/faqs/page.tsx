import React from 'react'
import Faqs from './Faqs'
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Frequently Asked Questions | Zoiko Orbit Support",
  description:
    "Get answers to your top questions on Zoiko Orbit FAQs—covering billing, plans, connectivity, and support to help you navigate effortlessly."

};
export default function page() {
  return (
    <>
    <Faqs/>
    </>
  )
}
