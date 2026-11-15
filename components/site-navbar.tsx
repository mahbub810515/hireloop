"use client"

import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"

import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { MenuIcon } from "lucide-react"

import { cn } from "cn"

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/jobs", label: "Browse Jobs" },
  { href: "/companies", label: "Companies" },
  { href: "/pricing", label: "Pricing" },
]

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/"
  return pathname === href || pathname.startsWith(`${href}/`)
}

function Logo() {
  return (
    <Link
      href="/"
      className="flex shrink-0 items-center rounded-md outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
      aria-label="HireLoop home"
    >
      <Image
        src="/images/logo.png"
        alt="HireLoop"
        width={154}
        height={44}
        className="h-8 w-auto"
        priority
      />
    </Link>
  )
}

function NavLinks({ className }: { className?: string }) {
  const pathname = usePathname()

  return (
    <nav aria-label="Main" className={cn("flex items-center gap-1", className)}>
      {navLinks.map((link) => {
        const active = isActive(pathname, link.href)

        return (
          <Button
            key={link.href}
            variant="ghost"
            nativeButton={false}
            render={<Link href={link.href} />}
            aria-current={active ? "page" : undefined}
            className={cn(
              "text-muted-foreground hover:text-foreground aria-current:text-foreground",
              active && "bg-muted/50 text-foreground dark:bg-muted/30"
            )}
          >
            {link.label}
          </Button>
        )
      })}
    </nav>
  )
}

function AuthActions({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <Button variant="ghost" nativeButton={false} render={<Link href="/login" />}>
        Sign in
      </Button>
      <Button nativeButton={false} render={<Link href="/register" />}>
        Get Started
      </Button>
    </div>
  )
}

export function SiteNavbar() {
  return (
    <header className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur supports-backdrop-filter:bg-background/60">
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-8">
          <Logo />
          <NavLinks className="hidden md:flex" />
        </div>

        <div className="flex items-center gap-2">
          <AuthActions className="hidden md:flex" />

          <Sheet>
            <SheetTrigger
              render={
                <Button
                  variant="ghost"
                  size="icon"
                  className="md:hidden"
                  aria-label="Open menu"
                />
              }
            >
              <MenuIcon />
            </SheetTrigger>
            <SheetContent side="right" showCloseButton={false}>
              <SheetHeader>
                <SheetTitle className="sr-only">Navigation menu</SheetTitle>
              </SheetHeader>
              <NavLinks className="flex-col items-stretch gap-1 px-4" />
              <div className="mt-auto flex flex-col gap-2 p-4">
                <Button
                  variant="outline"
                  nativeButton={false}
                  render={<Link href="/login" />}
                  className="justify-center"
                >
                  Sign in
                </Button>
                <Button
                  nativeButton={false}
                  render={<Link href="/register" />}
                  className="justify-center"
                >
                  Get Started
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
