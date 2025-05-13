import { confirm } from "@inquirer/prompts"
import { betterAuth } from "better-auth"
import { drizzleAdapter } from "better-auth/adapters/drizzle"
import { withLocalD1, withProxyD1 } from "~drizzle/d1-dev-helpers"
import { type BoundD1, type ProxyD1, authSchema } from "~drizzle/index"

export type Database = BoundD1 | ProxyD1
export async function withDatabase(dbTarget: "local" | "remote", doWerk: (db: Database) => Promise<void>) {
	if (dbTarget === "remote") {
		const answer = await confirm({
			message: "*** Acquiring a handle to the PRODUCTION DATABASE. Are you sure?",
			default: false,
		})

		if (answer) {
			withProxyD1(doWerk)
		} else {
			console.log("Aborting...")
			process.exit(0)
		}
	} else {
		withLocalD1(doWerk)
	}
}

export type AuthForScripts = ReturnType<typeof initAuthForScripts>
export function initAuthForScripts(db: Database) {
	console.log("initAuthForScripts")
	return betterAuth({
		database: drizzleAdapter(db, { provider: "sqlite", schema: authSchema }),
		emailAndPassword: {
			enabled: true,
			requireEmailVerification: false,
		},
	})
}