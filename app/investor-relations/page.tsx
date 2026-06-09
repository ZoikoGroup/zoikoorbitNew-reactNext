import React from 'react'
import InvestorRelations from './InvestorRelations'
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Investor Relations & Financial News | Zoiko Orbit",
  description:
    "Stay updated with Zoiko Orbit’s investor relations and financial news, including earnings, stock info, and key market insights to support your decisions."

};
export default function page() {
  return (
    <>
    <InvestorRelations/>
    </>
  )
}
