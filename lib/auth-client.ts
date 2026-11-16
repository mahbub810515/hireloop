import { createAuthClient } from "better-auth/react"
import { inferAdditionalFields } from "better-auth/client/plugins"
import type { auth } from "@/lib/auth"

export const authClient = createAuthClient({
    /** The base URL of the server (optional if you're using the same domain) */
    baseURL: process.env.BETTER_AUTH_URL,
    plugins: [
        // Lets the client know about the server's `user.additionalFields` (e.g. `role`)
        inferAdditionalFields<typeof auth>(),
    ],
})
export const {signIn,signUp,useSession} = createAuthClient();