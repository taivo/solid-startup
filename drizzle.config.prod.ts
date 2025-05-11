import { defineConfig } from "drizzle-kit"
import { drizzleBaseConfig } from "./drizzle.config"
import { D1Config } from "./drizzle/d1-dev-helpers/d1-config-loader"

export default defineConfig({
	...drizzleBaseConfig,
	driver: "d1-http",
	dbCredentials: D1Config.load().sqliteProxyCredentials,
})
