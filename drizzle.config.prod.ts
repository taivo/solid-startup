import { defineConfig } from "drizzle-kit"
import { drizzleBaseConfig } from "./drizzle.config"
import { getProdD1Credentials } from "./scripts/script-helpers"

export default defineConfig({
	...drizzleBaseConfig,
	driver: "d1-http",
	dbCredentials: getProdD1Credentials(),
})
