import { defineConfig } from "drizzle-kit"
import { D1Config } from "./drizzle/d1-dev-helpers/d1-config-loader"

export default defineConfig({
	out: "./drizzle/migrations",
	schema: "./drizzle/schema",
	dialect: "sqlite",
	...getEnvConfig(),
})

function getEnvConfig() {
	const d1Config = D1Config.load()
	if (["remote", "production"].includes(process.env.NODE_ENV)) {
		return {
			driver: "d1-http",
			dbCredentials: d1Config.sqliteProxyCredentials,
		}
	}

	// else dev/local
	return {
		dbCredentials: d1Config.sqliteLocalCredentials,
	}
}
