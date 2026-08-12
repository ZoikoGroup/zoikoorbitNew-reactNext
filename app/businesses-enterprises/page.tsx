import React from 'react'
import BusinessesEnterprises from './BusinessesEnterprises'
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Best eSIM Plans for Business & Enterprise | Zoiko Orbit",
  description:
    "Zoiko Orbit offers eSIM plans for business & enterprise that deliver global connectivity, centralized billing and usage insights for modern mobile workforces."

};
export default function page() {
  return (
    <>
      <BusinessesEnterprises/>
    </>
  )
}
