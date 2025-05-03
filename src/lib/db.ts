
import { readdirSync } from "node:fs"
import { drizzle } from "drizzle-orm/d1"
import { serverEnv } from "~/lib/env"

const db = drizzle(serverEnv().DB)
export default db


export function getMiniflareD1Path() {
	/**
 * @example
 * ```ts @import.meta.vitest
 * expect(getMiniflareD1Path().endsWith(".sqlite")).toBe(true)
 * ```
 */


	const miniflarePath = ".wrangler/state/v3/d1/miniflare-D1DatabaseObject" as const
	const localD1File = readdirSync(miniflarePath).find((filename) => filename.endsWith('.sqlite'))

	if (!localD1File) {
		throw new Error("Could not find local d1 file")
	}

	return localD1File
}