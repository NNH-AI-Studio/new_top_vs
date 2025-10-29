import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
})

export const metadata: Metadata = {
  title: {
    default: "Products VS - Compare Everything | Smart Comparisons in English & Arabic",
    template: "%s | Products VS",
  },
  description:
    "Compare products, services, and lifestyle choices with Products VS. 70+ detailed comparisons in English and Arabic. Make informed decisions faster!",
  keywords: ["product comparison", "reviews", "vs", "compare products", "bilingual comparisons"],
  authors: [{ name: "Products VS" }],
  creator: "Products VS",
  publisher: "Products VS",
  metadataBase: new URL("https://www.productsvs.com"),
  alternates: {
    canonical: "/",
    languages: {
      en: "/en",
      ar: "/ar",
    },
  },
  openGraph: {
    title: "Products VS - Compare Everything | Smart Comparisons",
    description:
      "Compare products, services, and lifestyle choices. 70+ detailed comparisons in English and Arabic. Make informed decisions!",
    url: "https://www.productsvs.com",
    siteName: "Products VS",
    images: [
      {
        url: "/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "Products VS - Smart Product Comparisons",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Products VS - Compare Everything",
    description: "70+ detailed comparisons in English and Arabic. Make informed decisions faster!",
    images: ["/images/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        <link rel="icon" href="/images/favicon.ico" type="image/x-icon" />
        <link rel="apple-touch-icon" sizes="180x180" href="/images/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/images/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/images/favicon-16x16.png" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="font-sans antialiased">
        {children}
        <Analytics />
      </body>
    </html>
  )
}
