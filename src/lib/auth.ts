"use server"
import { betterAuth } from "better-auth"
import { drizzleAdapter } from "better-auth/adapters/drizzle"
import { magicLink } from "better-auth/plugins"
import db from "~/lib/db"
import * as authSchema from "~schema/auth-schema"

type SendMagicLinkFn = Parameters<typeof magicLink>[0]["sendMagicLink"]
const __devMockSendMagicLink: SendMagicLinkFn = async ({ email, url }, _request) => {
	if (import.meta.env.DEV) {
		// print to dev server console
		console.warn("DEV MODE ONLY:", email, url)
	} else {
		throw new Error("Bro. Implement your auth! We're not in dev mode any more!!")
	}
}


// https://www.better-auth.com/docs/installation
export const auth = betterAuth({
	database: drizzleAdapter(db, { provider: "sqlite", schema: { ...authSchema } }),
	plugins: [magicLink({
		sendMagicLink: __devMockSendMagicLink
	})]
})