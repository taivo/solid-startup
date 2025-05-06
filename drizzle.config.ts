import { defineConfig } from "drizzle-kit"
import { getLocalD1File, getWranglerD1Config } from "./scripts/script-helpers"

export default defineConfig({
	out: "./migrations",
	schema: "./src/schema",
	dialect: "sqlite",

	...getCredentials(),
})

function getCredentials() {
	console.log("GET CREDENTIALS")
	// biome-ignore lint/nursery/noProcessEnv: <explanation>
	const { CLOUDFLARE_ACCOUNT_ID, CLOUDFLARE_D1_TOKEN } = process.env
	const CLOUDFLARE_D1_ID = CLOUDFLARE_ACCOUNT_ID ? getWranglerD1Config("DB").database_id : null

	const isRemote = CLOUDFLARE_ACCOUNT_ID && CLOUDFLARE_D1_TOKEN && CLOUDFLARE_D1_ID

	if (isRemote) {
		console.info("Env for remote D1 detected. Using Cloudflare D1 database specified in wrangler.jsonc")
	} else {
		console.info("Local mode: using miniflare D1 database")
	}

	return isRemote
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
				// FIXME: this is problematic because there may be multiple .sqlite files in miniflare
				// getLocalD1File only returns the first one found
				url: `file:${getLocalD1File()}`,
			},
		}
}