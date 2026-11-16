"use client"

import Link from "next/link"
import Image from "next/image"
import { usePathname, useRouter } from "next/navigation"
import {
  LogOutIcon,
  MenuIcon,
  UserIcon,
} from "lucide-react"

import { authClient } from "@/lib/auth-client"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

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

function UserMenu({ className }: { className?: string }) {
  const router = useRouter()
  const { data: session } = authClient.useSession()
  const user = session?.user

  async function handleSignOut() {
    await authClient.signOut()
    router.refresh()
  }

  if (!user) return null

  const initials = user.name
    .split(" ")
    .filter(Boolean)
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button
            variant="outline"
            size="sm"
            className={cn("gap-1.5", className)}
          />
        }
      >
        <Avatar size="sm">
          {user.image && (
            <AvatarImage src={user.image} alt={user.name} referrerPolicy="no-referrer" />
          )}
          <AvatarFallback className="font-medium">{initials || <UserIcon />}</AvatarFallback>
        </Avatar>
        <span className="max-w-28 truncate">{user.name}</span>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuGroup>
          <DropdownMenuLabel className="font-medium text-foreground">
            {user.name}
            <p className="truncate text-xs font-normal text-muted-foreground">
              {user.email}
            </p>
            {user.role && (
              <p className="mt-1 w-fit rounded-full border px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground capitalize">
                {user.role}
              </p>
            )}
          </DropdownMenuLabel>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleSignOut}>
          <LogOutIcon />
          Sign out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

function AuthPlaceholder() {
  return (
    <div className="h-7 w-32 animate-pulse rounded-lg bg-muted" aria-hidden />
  )
}

function AuthActions({ className }: { className?: string }) {
  const { data: session, isPending } = authClient.useSession()

  return (
    <div className={cn("flex items-center gap-2", className)}>
      {isPending ? (
        <AuthPlaceholder />
      ) : session ? (
        <UserMenu />
      ) : (
        <>
          <Button
            variant="ghost"
            nativeButton={false}
            render={<Link href="/login" />}
          >
            Sign in
          </Button>
          <Button nativeButton={false} render={<Link href="/register" />}>
            Get Started
          </Button>
        </>
      )}
    </div>
  )
}

function MobileAuthActions() {
  const { data: session, isPending } = authClient.useSession()

  if (isPending) return null

  return session ? (
    <UserMenu className="h-9 w-full justify-start" />
  ) : (
    <>
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
    </>
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
                <MobileAuthActions />
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
