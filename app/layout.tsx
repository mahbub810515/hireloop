import { Inter } from "next/font/google"

import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { SiteNavbar } from "@/components/site-navbar"
import { cn } from "@/lib/utils";

const inter = Inter(
  {
    subsets: ['latin'],
    variable: '--font-sans'    
  })


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn("antialiased", inter.className)}
    >
      <body>
        <ThemeProvider defaultTheme="dark">
          <SiteNavbar />
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
