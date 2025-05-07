import { confirm } from "@inquirer/prompts"
import { getPlatformProxy } from "wrangler"
import { getDb } from "~/lib/db"
import { drizzle as drizzleD1Proxy } from "../drizzle/d1-http"
import { D1Config } from "./wrangler-helpers"

export type LocalDatabase = ReturnType<typeof getDb>
export type RemoteDatabase = ReturnType<typeof drizzleD1Proxy>
export type Database = LocalDatabase | RemoteDatabase

export async function withLocalDb(doWerk: (db: LocalDatabase) => Promise<void>) {
	const platform = await getPlatformProxy<Env>()
	const db = getDb(platform.env.DB)

	await doWerk(db)

	await platform.dispose()
}

export async function withRemoteDb(doWerk: (db: RemoteDatabase) => Promise<void>) {
	const db = drizzleD1Proxy(D1Config.load().sqliteProxyCredentials)
	await doWerk(db)
}

export async function withDatabase(doWerk: (db: Database) => Promise<void>) {
	if (process.argv.includes("--remote")) {
		const answer = await confirm({
			message: "*** You are about to run this script on the production database. Are you sure?",
			default: false,
		})
		if (answer) {
			withRemoteDb(doWerk)
		} else {
			console.log("Aborting...")
			process.exit(0)
		}
	} else {
		withLocalDb(doWerk)
	}
}
