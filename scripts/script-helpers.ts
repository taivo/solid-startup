import { readFileSync, readdirSync } from "node:fs"
import { parse as parseJSONC } from "jsonc-parser"
import { getPlatformProxy } from "wrangler"
import { getDb } from "~/lib/db"

export async function withLocalD1(action: (db: ReturnType<typeof getDb>) => Promise<void>) {
	const platform = await getPlatformProxy<Env>()
	console.log("scriptHelper")
	const db = getDb(platform.env.DB)

	await action(db)

	await platform.dispose()
}

// FIXME: this is problematic because there may be multiple .sqlite files in miniflare
// getLocalD1File only returns the first one found
export function getLocalD1File() {
	/**
	 * @example
	 * ```ts @import.meta.vitest
	 * expect(getMiniflareD1Path().endsWith(".sqlite")).toBe(true)
	 * ```
	 */

	const miniflarePath = ".wrangler/state/v3/d1/miniflare-D1DatabaseObject" as const
	const localD1File = readdirSync(miniflarePath).find((filename) => filename.endsWith(".sqlite"))

	if (!localD1File) {
		throw new Error("Could not find local d1 file")
	}

	return `${miniflarePath}/${localD1File}`
}

export function getWranglerD1Config(bindingName: string) {
	const cfg = getWranglerConfig().d1_databases.find((db: { binding: string }) => db.binding === bindingName)

	if (!cfg) {
		throw new Error(`Could not find wrangler config for D1 binding: [${bindingName}]`)
	}

	console.log("wrangler config", cfg)

	return cfg
}

function getWranglerConfig() {
	const configPath = "./wrangler.jsonc"
	const rawContent = readFileSync(configPath, "utf-8")
	return parseJSONC(rawContent)
}