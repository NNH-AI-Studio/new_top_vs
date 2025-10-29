import type { Metadata } from "next"
import AboutPageClient from "./_components/about-page-client"

export const metadata: Metadata = {
  title: "About Us - Products VS",
  description:
    "Learn about Products VS, your trusted source for comprehensive product and service comparisons in English and Arabic.",
}

export default function AboutPage() {
  return <AboutPageClient />
}
