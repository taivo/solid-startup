"use server"
import { betterAuth } from "better-auth"
import { drizzleAdapter } from "better-auth/adapters/drizzle"
import { magicLink } from "better-auth/plugins"
import db, { authSchema } from "~/lib/db"

//
// NOTE: Per better-auth docs, `src/lib/auth.ts` is one of the few locations this file can be
// so don't just move it anywhere. Consult https://www.better-auth.com/docs/installation for more info.
//

type SendMagicLinkFn = Parameters<typeof magicLink>[0]["sendMagicLink"]
export const logMagicLinkToServerConsole: SendMagicLinkFn = async ({ email, url }, _request) => {
	"use server"
	// NOTE: This mock function is to simplify the project template demo only.
	// Do not use it for your project
	//
	if (import.meta.env.DEV) {
		console.warn("Logging to console for testing/dev only. Do not use in real project.", email, url)
	} else {
		throw new Error("sendMagicLink not implemented!")
	}
}

export const auth = betterAuth({
	database: drizzleAdapter(db, { provider: "sqlite", schema: authSchema }),
	emailAndPassword: {
		enabled: true,
		requireEmailVerification: false,
		autoSignIn: true,
	},
	user: {
		additionalFields: {
			theme: { type: "string" },
			isTest: { type: "boolean", defaultValue: false },
		},
	},
	plugins: [
		magicLink({
			sendMagicLink: logMagicLinkToServerConsole,
			//disableSignUp: true
		}),
	],
})

export async function __demoOnlyGetDemoUserCreds() {
	"user server"

	// const demoUsers = await db.query.user.findMany({
	// 	where: eq(authSchema.user.isTest, true),
	// 	columns: { email: true },
	// 	limit: 2
	// })

	// return demoUsers.map(({ email }) => ({ email, demoPW: "demo-123" }))
	console.log("TESTING...")
	return [
		{ email: "test@example.com", demoPW: "demo-123" },
		{ email: "example@test.com", demoPW: "demo-123" },
	]
}
