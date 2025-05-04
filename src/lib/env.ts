import { cfEnv } from "./cf-utils"

// cloudflare directions: https://ryanjc.com/blog/solidstart-cloudflare-pages/
export function serverEnv() {
	"use server"

	// biome-ignore lint/nursery/noProcessEnv: solid+vite not picking up .env server variables for import.meta.env
	return cfEnv() ?? process.env //have to use processs.env bc server vars not showing up in import.meta.env
}
