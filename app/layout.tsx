import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { SimpleToastProvider } from "@/components/simple-toast-provider"
const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "In pasi de Dans | Școală de dans",
  description: "Școală de dans cu tradiție din 2009, oferind cursuri pentru adulți și copii",
    generator: 'v0.dev',
    icons:"/images/favicon.ico"
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ro" suppressHydrationWarning>
      <link rel="icon" href="/favicon.ico" sizes="any" />
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
        <SimpleToastProvider>
          <Navbar />
          <main className="min-h-screen">{children}</main>
          <Footer />
          </SimpleToastProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}



import './globals.css'