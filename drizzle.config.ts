import { defineConfig } from "drizzle-kit"

export default defineConfig({
	out: "./migrations",
	schema: "./src/schema",
	dialect: "sqlite",
	dbCredentials: {
		// drizzle-kit runs outside of vite so no import meta
		// biome-ignore lint/nursery/noProcessEnv: <explanation>
		url: process.env.DB_URL,
	},
})
