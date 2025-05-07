import crypto from "node:crypto"
import { existsSync, readFileSync } from "node:fs"
import { confirm } from '@inquirer/prompts'
import { parse as parseJSONC } from "jsonc-parser"
import { getPlatformProxy } from "wrangler"
import { getDb } from "~/lib/db"
import { drizzle as drizzleD1Proxy } from "../drizzle/d1-http"

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
	const db = drizzleD1Proxy(getProdD1Credentials())
	await doWerk(db)
}

export async function withDatabase(doWerk: (db: Database) => Promise<void>) {
	if (process.argv.includes("--remote")) {
		const answer = await confirm({ message: '*** You are about to run this script on the production database. Are you sure?', default: false })
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

export function getProdD1Credentials(bindingName?: string) {
	//
	// NOTE: this is only used to run local scripts that needs to act on the
	// remote production database. Use it sparingly.
	// Interactions with D1 inside the deployed app do not need these credentials.
	//

	// biome-ignore lint/nursery/noProcessEnv: <explanation>
	const { CLOUDFLARE_ACCOUNT_ID, CLOUDFLARE_D1_TOKEN } = process.env
	if (!CLOUDFLARE_ACCOUNT_ID || !CLOUDFLARE_D1_TOKEN) {
		throw new Error("CLOUDFLARE_ACCOUNT_ID and CLOUDFLARE_D1_TOKEN not set")
	}

	return {
		accountId: CLOUDFLARE_ACCOUNT_ID as string,
		databaseId: D1Config.load(bindingName).databaseId as string,
		token: CLOUDFLARE_D1_TOKEN as string,
	}
}

export class D1Config {
	binding: string
	database_name: string
	database_id: string
	preview_database_id?: string
	migrations_dir?: string

	static load(bindingName?: string) {
		const d1_databases = loadWranglerConfig().d1_databases

		if (d1_databases.length === 1 && !bindingName) {
			// return the only config if no bindingName is specified
			return d1_databases[0]
		}

		// find and return the specified binding
		const cfg = d1_databases.find((db: { binding: string }) => db.binding === bindingName)
		if (!cfg) {
			throw new Error(`Could not find wrangler config for D1 binding: [${bindingName}]`)
		}

		return new D1Config(cfg)
	}

	private constructor(cfg: Record<string, string>) {
		this.binding = cfg.binding
		this.database_name = cfg.database_name
		this.database_id = cfg.database_id
		this.preview_database_id = cfg.preview_database_id
		this.migrations_dir = cfg.migrations_dir
	}

	get localDatabaseId() {
		return this.preview_database_id || this.database_id
	}

	get localSqliteFile() {
		const uniqueKey = "miniflare-D1DatabaseObject" as const
		const miniflarePath = `.wrangler/state/v3/d1/${uniqueKey}` as const
		const filename = `${miniflarePath}/${durableObjectNamespaceIdFromName(uniqueKey, this.localDatabaseId)}.sqlite`

		if (!existsSync(filename)) {
			throw new Error(`Could not find Sqlite file: [${filename}] for databaseId [${this.localDatabaseId}]`)
		}

		return filename
	}
}


function loadWranglerConfig() {
	const configPath = "./wrangler.jsonc"
	const rawContent = readFileSync(configPath, "utf-8")
	return parseJSONC(rawContent)
}

function durableObjectNamespaceIdFromName(uniqueKey: string, name: string) {
	// In v3.2, miniflare uses durable object to implement D1 and hashes the local sqlite filename.
	// See the following for more context:
	// https://github.com/cloudflare/workers-sdk/issues/4548 (understand the hash of the local D1 filename)
	// https://github.com/cloudflare/miniflare/releases/tag/v3.20230918.0
	//
	// This function is copied from these links
	//
	const key = crypto.createHash("sha256").update(uniqueKey).digest()
	const nameHmac = crypto.createHmac("sha256", key).update(name).digest().subarray(0, 16)
	const hmac = crypto.createHmac("sha256", key).update(nameHmac).digest().subarray(0, 16)
	return Buffer.concat([nameHmac, hmac]).toString("hex")
}
