import { defineConfig } from "drizzle-kit"
import { d1LocalFileCredentials, d1RemoteProxyCredentials } from "../../dev/script-helpers"


export default defineConfig({
	out: "./migrations",
	schema: "./schema",
	dialect: "sqlite",
	...getEnvConfig(),
})

function getEnvConfig() {
	// biome-ignore lint/nursery/noProcessEnv: <explanation>
	if (process.env.NODE_ENV === "production") {
		return {
			driver: "d1-http",
			dbCredentials: d1RemoteProxyCredentials(),
		}
	}

	// else dev/local
	return {
		dbCredentials: d1LocalFileCredentials(),
	}
}
