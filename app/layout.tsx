import type React from "react"
import type { Metadata } from "next"
import { Cairo, Cormorant_Garamond, Inter } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { Toaster } from "@/components/ui/toaster"
import { LayoutWrapper } from "@/components/layout-wrapper"
import "./globals.css"

const cairo = Cairo({
  subsets: ["latin", "arabic"],
  weight: ["300", "400", "600", "700"],
  variable: "--font-arabic",
})

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "600", "700"],
  variable: "--font-serif",
})

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
})

export const metadata: Metadata = {
  title: "زغدان للبخور | Zoghdan for Incense - Luxury Bukhoor & Arabic Perfumes",
  description:
    "تسوق البخور الأصيل والعطور العربية من زغدان، الشركة المصرية الرائدة في العطور الفاخرة | Shop authentic Bukhoor and Arabic Perfumes from Zoghdan, Egypt's premier luxury fragrance manufacturer",
  keywords:
    "Bukhoor, Arabic Perfumes, Incense, Zoghdan, زغدان, بخور, عطور عربية, Egypt, Kafr El-Sheikh, Motubas, Luxury Fragrances",
  generator: "v0.app",
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html suppressHydrationWarning>
      <body className={`${inter.variable} ${cairo.variable} ${cormorant.variable} antialiased`}>
        <LayoutWrapper>{children}</LayoutWrapper>
        <Toaster />
        <Analytics />
      </body>
    </html>
  )
}
