import { type Config, defineConfig } from "drizzle-kit"
import { D1Config } from "./dev/wrangler-helpers"

export const drizzleBaseConfig = {
	out: "./drizzle/migrations",
	schema: "./drizzle/schema",
	dialect: "sqlite",
} satisfies Config

export default defineConfig({
	...drizzleBaseConfig,
	dbCredentials: D1Config.load().sqliteLocalCredentials,
})
