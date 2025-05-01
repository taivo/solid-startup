import { defineConfig } from "@solidjs/start/config"
import tailwindcss from "@tailwindcss/vite"
import Icons from 'unplugin-icons/vite'


export default defineConfig({
	vite: {
		plugins: [tailwindcss(),
		Icons({ compiler: 'solid', autoInstall: true }),
		],
		define: {
			// biome-ignore lint/nursery/noProcessEnv: <explanation>
			__APP_VERSION__: JSON.stringify(process.env.npm_package_version),
		}
	},
	server: {
		preset: "cloudflare-pages",
		rollupConfig: {
			external: ["node:async_hooks"]
		}
	}
})
