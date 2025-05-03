import { defineConfig } from "drizzle-kit"
import { getMiniflareD1Path } from "~/lib/cf-utils"


// NOTE: this drizzle setup is for dev mode only.
// We can use d1-http driver for remote but may not want to make it that easy to f with production db
export default defineConfig({
	out: "./migrations",
	schema: "./src/schema",
	dialect: "sqlite",
	dbCredentials: {
		// drizzle-kit runs outside of vite so no import meta
		url: `file:${getMiniflareD1Path()}`
	},
})
