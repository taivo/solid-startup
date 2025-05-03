import { doctest } from 'vite-plugin-doctest'
import solid from "vite-plugin-solid"
import tsconfigPaths from "vite-tsconfig-paths"
import { defineConfig } from "vitest/config"

export default defineConfig({
	plugins: [solid(), tsconfigPaths(), doctest()],
	resolve: {
		conditions: ["development", "browser"],
	},
	test: {
		includeSource: [
			'./src/**/*.{js,jsx,ts,tsx,mjs,mts}',
		],
	},
})
