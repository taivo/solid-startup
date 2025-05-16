import { confirm } from "@inquirer/prompts"
import { betterAuth } from "better-auth"
import { drizzleAdapter } from "better-auth/adapters/drizzle"
import {
	type BoundD1,
	type ProxyD1,
	getD1LocalFileCredentials,
	getD1ProxyCredentials,
	withLocalD1,
	withProxyD1,
} from "drizzle-d1-helpers"
import { authSchema } from "~drizzle/index"

export type Database = BoundD1 | ProxyD1
export async function withDatabase(dbEnv: "local" | "remote", doWerk: (db: Database) => Promise<void>) {
	if (dbEnv === "remote") {
		const answer = await confirm({
			message: "*** Acquiring a handle to the PRODUCTION DATABASE. Are you sure?",
			default: false,
		})

		if (answer) {
			withProxyD1(d1RemoteProxyCredentials(), doWerk)
		} else {
			console.log("Aborting...")
			process.exit(0)
		}
	} else {
		withLocalD1("DB", doWerk)
	}
}

export type AuthApi = ReturnType<typeof initAuthApi>
export function initAuthApi(db: Database) {
	return betterAuth({
		database: drizzleAdapter(db, { provider: "sqlite", schema: authSchema }),
		emailAndPassword: {
			enabled: true,
			requireEmailVerification: false,
			autoSignIn: false,
		},
	}).api
}

export function d1RemoteProxyCredentials() {
	// biome-ignore lint/nursery/noProcessEnv: <explanation>
	const { CLOUDFLARE_ACCOUNT_ID, CLOUDFLARE_D1_TOKEN } = process.env
	if (!CLOUDFLARE_ACCOUNT_ID || !CLOUDFLARE_D1_TOKEN) {
		throw new Error("CLOUDFLARE_ACCOUNT_ID and CLOUDFLARE_D1_TOKEN not set")
	}
	console.log("Using CLOUDFLARE_ACCOUNT_ID and CLOUDFLARE_D1_TOKEN to generate sqlite proxy credentials")

	return getD1ProxyCredentials(CLOUDFLARE_ACCOUNT_ID, CLOUDFLARE_D1_TOKEN)
}

export function d1LocalFileCredentials() {
	// only used by drizzle-kit. Other local scripts use bindings from getPlatformProxy()
	return getD1LocalFileCredentials()
}
