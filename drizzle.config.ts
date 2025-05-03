import { readFileSync } from "node:fs"
import { defineConfig } from "drizzle-kit"
import { parse as parseJSONC } from "jsonc-parser"
import { getMiniflareD1Path } from "~/lib/cf-utils"

// biome-ignore lint/nursery/noProcessEnv: <explanation>
const { CLOUDFLARE_ACCOUNT_ID, CLOUDFLARE_D1_TOKEN } = process.env
const CLOUDFLARE_D1_ID = CLOUDFLARE_ACCOUNT_ID ? getD1Config('DB').database_id : null

const isRemote = CLOUDFLARE_ACCOUNT_ID && CLOUDFLARE_D1_TOKEN && CLOUDFLARE_D1_ID

if (isRemote) {
	console.info("Env for remote D1 detected. Using Cloudflare D1 database specified in wrangler.jsonc")
} else {
	console.info("No remote env vars for D1 are set. Using miniflare D1 database")
}

export default defineConfig({
	out: "./migrations",
	schema: "./src/schema",
	dialect: "sqlite",

	...(isRemote
		? {
			driver: "d1-http",
			dbCredentials: {
				accountId: CLOUDFLARE_ACCOUNT_ID,
				databaseId: CLOUDFLARE_D1_ID,
				token: CLOUDFLARE_D1_TOKEN,
			},
		}
		: {
			dbCredentials: {
				url: `file:${getMiniflareD1Path()}`,
			},
		}),
})

function getD1Config(bindingName: string) {
	return parseWranglerConfig().d1_databases.find((db: { binding: string }) => db.binding === bindingName)
}

function parseWranglerConfig() {
	const configPath = "./wrangler.jsonc"
	const rawContent = readFileSync(configPath, "utf-8")
	return parseJSONC(rawContent)
}

/*
export default defineConfig(
	process.env.CLOUDFLARE_ACCOUNT_ID ? {
		schema: './src/schema.ts',
		out: './migrations',
		dialect: 'sqlite',
		driver: 'd1-http',
		dbCredentials: {
			accountId: process.env.CLOUDFLARE_ACCOUNT_ID!,
			databaseId: process.env.CLOUDFLARE_DATABASE_ID!,
			token: process.env.CLOUDFLARE_D1_TOKEN!,
		},
	} :
		{
			out: "./migrations",
			schema: "./src/schema",
			dialect: "sqlite",
			dbCredentials: {
				// drizzle-kit runs outside of vite so no import meta
				url: `file:${getMiniflareD1Path()}`
			},
		})
*/
