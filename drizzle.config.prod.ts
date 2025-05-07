import { defineConfig } from "drizzle-kit"
import { D1Config } from "./dev/wrangler-helpers"
import { drizzleBaseConfig } from "./drizzle.config"

export default defineConfig({
	...drizzleBaseConfig,
	driver: "d1-http",
	dbCredentials: D1Config.load().sqliteProxyCredentials,
})
