import { defineConfig } from "@solidjs/start/config"
import tailwindcss from "@tailwindcss/vite"
import Icons from "unplugin-icons/vite"
import { mergeConfig } from "vite"
import tsconfigPaths from "vite-tsconfig-paths"
import { viteBaseConfig } from "../../root-config"

export default defineConfig({
	vite: mergeConfig(viteBaseConfig, {
		plugins: [tsconfigPaths(), tailwindcss(), Icons({ compiler: "solid", autoInstall: true })],
		define: {
			__APP_INFO__: {
				name: "Solid Demo",
				legalName: "Solid Demo, Inc.",
				copyrightStatement: "© 2025 Solid Demo, Inc. All rights reserved.",
				// biome-ignore lint/style/noProcessEnv: whatev
				version: process.env.npm_package_version,
				socialLinks: {
					github: "https://github.com/solidjs/solid-start",
					bluesky: "https://bsky.app/profile/solidjs.com",
					x: "https://x.com/solid_js",
				},
			},
		},
	}),
	solid: {
		babel: {
			plugins: [
				["@babel/plugin-proposal-decorators", { version: "legacy" }],
				["@babel/plugin-transform-class-properties"],
				["@babel/plugin-transform-private-methods"]
			],
		},
	},
	server: {
		preset: "cloudflare-pages",
		compatibilityDate: "2025-06-20",
		rollupConfig: {
			external: ["node:async_hooks"],
		},
	},
	middleware: "./src/middleware.ts",
})
