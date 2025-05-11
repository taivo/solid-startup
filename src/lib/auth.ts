"use server"
import { betterAuth } from "better-auth"
import { drizzleAdapter } from "better-auth/adapters/drizzle"
import { magicLink } from "better-auth/plugins"
import db from "~/lib/db"
import * as authSchema from "~schema/auth-schema"
import { __dangerousMockGenerateToken, __dangerousMockSendMagicLink } from "../demo-only/__dangerous.auth"

//
// NOTE: Per better-auth docs, `src/lib/auth.ts` is one of the few locations this file can be
// so don't just move it anywhere. Consult https://www.better-auth.com/docs/installation for more info.
//

export const auth = betterAuth({
	database: drizzleAdapter(db, { provider: "sqlite", schema: { ...authSchema } }),
	user: {
		additionalFields: {
			theme: { type: "string" },
			isTest: { type: "boolean", defaultValue: false },
		},
	},
	plugins: [
		magicLink({
			sendMagicLink: __dangerousMockSendMagicLink,
			generateToken: __dangerousMockGenerateToken,
			disableSignUp: true
		}),
	],
})