"use client"

import { AuthForm, type AuthFormData } from "@/components/auth-form"
import { authClient } from "@/lib/auth-client"

export function LoginForm() {
  async function handleSignIn(data: AuthFormData) {
  const { data:signInResponse, error } = await authClient.signIn.email({
    email: data.email as string, // required, The email address of the user.
    password: data.password as string, // required, The password of the user. It should be at least 8 characters long and max 128 by default.
    rememberMe: true, // If false, the user will be signed out when the browser is closed. (optional) (default: true)
    callbackURL: "/", // An optional URL to redirect to after the user signs in. (optional)
});
    console.log("signInResponse", signInResponse, error)
  }

  return <AuthForm mode="login" onSubmit={handleSignIn} />
}
