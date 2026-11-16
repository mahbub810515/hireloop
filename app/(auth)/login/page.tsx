import type { Metadata } from "next"

import { AuthForm } from "@/components/auth-form"
import { LoginForm } from "@/components/login-form"

export const metadata: Metadata = {
  title: "Sign in | HireLoop",
}

export default function LoginPage() {
  return (
    <main className="flex min-h-svh items-center justify-center px-4 py-12">
      <LoginForm/>
    </main>
  )
}
