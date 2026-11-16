"use client"

import { AuthForm, type AuthFormData } from "@/components/auth-form"
import { authClient } from "@/lib/auth-client"

export function RegisterForm() {
  async function handleSignUp(data: AuthFormData) {
    const { data: signUpResponse, error } = await authClient.signUp.email({
      name: data.name as string, // required, The name of the user.
      email: data.email as string, // required, The email address of the user.
      password: data.password as string, // required, The password of the user. It should be at least 8 characters long and max 128 by default.
      role: (data.role as string) as "seeker" | "recruiter" | "admin", // required, saved as a user additional field.
      callbackURL: "/", // An optional URL to redirect to after the user signs up.
    })
    console.log("signUpResponse", signUpResponse, error)
  }

  return <AuthForm mode="register" onSubmit={handleSignUp} />
}
