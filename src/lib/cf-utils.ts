import { readFileSync, readdirSync } from "node:fs"
import { parse as parseJSONC } from "jsonc-parser"
import { getRequestEvent } from "solid-js/web"
import { getPlatformProxy } from "wrangler"

export function getLocalD1File() {
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

	return `${miniflarePath}/${localD1File}`
}

export function getWranglerD1Config(bindingName: string) {
	const cfg = getWranglerConfig().d1_databases.find((db: { binding: string }) => db.binding === bindingName)

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

export async function cfDevEnv() {
	"use server"

	const { env } = await getPlatformProxy()
	return env as unknown as Cloudflare.Env
}

export function cfContext() {
	"use server"
	const event = getRequestEvent()

	return event?.nativeEvent?.context?.cloudflare ?? {}
}