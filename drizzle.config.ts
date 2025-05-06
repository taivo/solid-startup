import { type Config, defineConfig } from "drizzle-kit"
import { D1Config } from "./scripts/script-helpers"

export const drizzleBaseConfig = {
	out: "./migrations",
	schema: "./src/schema",
	dialect: "sqlite",
} satisfies Config

export default defineConfig({
	...drizzleBaseConfig,
	dbCredentials: {
		url: `file:${D1Config.load().localSqliteFile}`,
	}
})
