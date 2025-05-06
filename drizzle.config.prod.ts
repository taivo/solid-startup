import { defineConfig } from "drizzle-kit"
import { drizzleBaseConfig } from "./drizzle.config"
import { D1Config } from "./scripts/script-helpers"

export default defineConfig({
	...drizzleBaseConfig,
	...getProdCredentials(),
})

function getProdCredentials() {
	// https://developers.cloudflare.com/workers/wrangler/system-environment-variables/

	// biome-ignore lint/nursery/noProcessEnv: <explanation>
	const { CLOUDFLARE_ACCOUNT_ID, CLOUDFLARE_D1_TOKEN } = process.env

	if (!CLOUDFLARE_ACCOUNT_ID || !CLOUDFLARE_D1_TOKEN) {
		throw new Error("CLOUDFLARE_ACCOUNT_ID and CLOUDFLARE_D1_TOKEN must be set")
	}

	const d1Config = D1Config.load()
	return {
		driver: "d1-http",
		dbCredentials: {
			accountId: CLOUDFLARE_ACCOUNT_ID,
			databaseId: d1Config.database_id,
			token: CLOUDFLARE_D1_TOKEN,
		},
	}
}