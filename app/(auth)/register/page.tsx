import type { Metadata } from "next"

import { RegisterForm } from "@/components/register-form"

export const metadata: Metadata = {
  title: "Create account | HireLoop",
}

export default function RegisterPage() {
  return (
    <main className="flex min-h-svh items-center justify-center px-4 py-12">
      <RegisterForm />
    </main>
  )
}
