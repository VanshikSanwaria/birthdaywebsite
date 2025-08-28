import type React from "react"
import type { Metadata } from "next"
import { Playfair_Display, Source_Sans_3 } from "next/font/google"
import "./globals.css"
import PageTransition from "@/components/PageTransition"

const playfair = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-playfair",
  weight: ["400", "600", "700"],
})

const sourceSans = Source_Sans_3({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-source-sans",
  weight: ["400", "500", "600"],
})

export const metadata: Metadata = {
  title: "Happy Birthday - A Special Celebration",
  description: "A personalized birthday celebration website filled with love, memories, and wishes",
  generator: "v0.app",
  keywords: ["birthday", "celebration", "memories", "wishes", "special day"],
  authors: [{ name: "Birthday Website Creator" }],
  openGraph: {
    title: "Happy Birthday - A Special Celebration",
    description: "A personalized birthday celebration website filled with love, memories, and wishes",
    type: "website",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${sourceSans.variable}`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="font-sans antialiased birthday-gradient min-h-screen">
        <PageTransition>{children}</PageTransition>
      </body>
    </html>
  )
}
