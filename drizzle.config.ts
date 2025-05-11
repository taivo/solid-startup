import { type Config, defineConfig } from "drizzle-kit"
import { D1Config } from "./drizzle/d1-dev-helpers/d1-config-loader"


export const drizzleBaseConfig = {
	out: "./drizzle/migrations",
	schema: "./drizzle/schema",
	dialect: "sqlite",
} satisfies Config

export default defineConfig({
	...drizzleBaseConfig,
	dbCredentials: D1Config.load().sqliteLocalCredentials,
})
