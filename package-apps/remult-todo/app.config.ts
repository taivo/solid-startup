import { defineConfig } from "@solidjs/start/config"

export default defineConfig({
	// vite: {},
	solid: {
		babel: {
			plugins: [
				["@babel/plugin-proposal-decorators", { version: "legacy" }],
				["@babel/plugin-transform-class-properties"],
			],
		}
	},
	middleware: "./src/middleware.ts"
})
