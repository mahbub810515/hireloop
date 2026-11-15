"use client"

import * as React from "react"
import Link from "next/link"
import Image from "next/image"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { PasswordInput } from "@/components/password-input"
import { cn } from "cn"

type AuthFormMode = "login" | "register"

export type AuthFormData = Record<string, FormDataEntryValue>

const copy: Record<
  AuthFormMode,
  { title: string; description: string; submitLabel: string }
> = {
  login: {
    title: "Welcome back",
    description: "Sign in to your HireLoop account to continue your search.",
    submitLabel: "Sign in",
  },
  register: {
    title: "Create your account",
    description:
      "Join HireLoop to discover jobs, track applications, and get hired faster.",
    submitLabel: "Create account",
  },
}

export function AuthForm({
  mode,
  className,
  onSubmit,
}: {
  mode: AuthFormMode
  className?: string
  /** Optional submit handler (must be defined in a Client Component). */
  onSubmit?: (data: AuthFormData) => void | Promise<void>
}) {
  const [submitted, setSubmitted] = React.useState<AuthFormData | null>(null)
  const isLogin = mode === "login"
  const text = copy[mode]

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const data = Object.fromEntries(
      new FormData(event.currentTarget)
    ) as AuthFormData

    if (onSubmit) {
      try {
        await onSubmit(data)
      } catch (error) {
        console.error(`[auth:${mode}] submit failed:`, error)
      }
      return
    }

    // Placeholder handler — replaced once onSubmit is provided.
    setSubmitted(data)
    console.log(`[auth:${mode}] form data:`, data)
  }

  return (
    <div className={cn("flex w-full max-w-sm flex-col items-center", className)}>
      <Link
        href="/"
        aria-label="HireLoop home"
        className="rounded-md outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
      >
        <Image
          src="/images/logo.png"
          alt="HireLoop"
          width={154}
          height={44}
          className="h-9 w-auto"
          priority
        />
      </Link>

      <div className="mt-6 w-full rounded-2xl border bg-card/60 p-6 backdrop-blur">
        <h1 className="text-2xl font-semibold tracking-tight">{text.title}</h1>
        <p className="mt-1 text-sm text-muted-foreground">{text.description}</p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          {!isLogin && (
            <div className="space-y-1.5">
              <Label htmlFor="name">Full name</Label>
              <Input
                id="name"
                name="name"
                type="text"
                placeholder="John Doe"
                autoComplete="name"
                required
              />
            </div>
          )}

          <div className="space-y-1.5">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="you@example.com"
              autoComplete="email"
              required
            />
          </div>

          <div className="space-y-1.5">
            <div className="flex items-center justify-between gap-2">
              <Label htmlFor="password">Password</Label>
              {isLogin && (
                <Link
                  href="/"
                  className="text-xs text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
                >
                  Forgot password?
                </Link>
              )}
            </div>
            <PasswordInput
              id="password"
              name="password"
              placeholder={isLogin ? "Enter your password" : "At least 8 characters"}
              autoComplete={isLogin ? "current-password" : "new-password"}
              minLength={isLogin ? undefined : 8}
              required
            />
          </div>

          {isLogin && (
            <Label className="w-fit cursor-pointer text-sm font-normal text-muted-foreground">
              <Checkbox name="remember" defaultChecked />
              Remember me
            </Label>
          )}

          <Button type="submit" className="h-9 w-full">
            {text.submitLabel}
          </Button>
        </form>

        {submitted && (
          <p className="mt-4 rounded-lg border bg-muted/40 p-2.5 font-mono text-xs break-all text-muted-foreground">
            Captured: {JSON.stringify(submitted)}
          </p>
        )}
      </div>

      <p className="mt-6 text-sm text-muted-foreground">
        {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
        <Link
          href={isLogin ? "/register" : "/login"}
          className="font-medium text-primary underline-offset-4 hover:underline"
        >
          {isLogin ? "Create account" : "Sign in"}
        </Link>
      </p>
    </div>
  )
}
