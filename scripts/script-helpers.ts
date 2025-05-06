import crypto from "node:crypto"
import { existsSync, readFileSync } from "node:fs"
import { parse as parseJSONC } from "jsonc-parser"
import { getPlatformProxy } from "wrangler"
import { getDb } from "~/lib/db"

export async function withLocalD1(doWerk: (db: ReturnType<typeof getDb>) => Promise<void>) {
	const platform = await getPlatformProxy<Env>()
	const db = getDb(platform.env.DB)

	await doWerk(db)

	await platform.dispose()
}

export function getLocalD1File(databaseId: string) {
	/**
	 * @example
	 * ```ts @import.meta.vitest
	 * expect(getMiniflareD1Path().endsWith(".sqlite")).toBe(true)
	 * ```
	 */
	const durableObjKey = "miniflare-D1DatabaseObject" as const
	const miniflarePath = `.wrangler/state/v3/d1/${durableObjKey}` as const
	const filename = `${miniflarePath}/${durableObjectNamespaceIdFromName(durableObjKey, databaseId)}.sqlite`

	if (!existsSync(filename)) {
		throw new Error(`Could not find local D1 file: [${filename}] for databaseId [${databaseId}]`)
	}

	return filename
}

export function getWranglerD1Config(bindingName?: string) {
	const d1_databases = getWranglerConfig().d1_databases

	if (d1_databases.length === 1 && !bindingName) {
		// return the only config if no bindingName is specified
		return d1_databases[0]
	}

	// find and return the specified binding
	const cfg = d1_databases.find((db: { binding: string }) => db.binding === bindingName)
	if (!cfg) {
		throw new Error(`Could not find wrangler config for D1 binding: [${bindingName}]`)
	}

	return cfg
}

function getWranglerConfig() {
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
