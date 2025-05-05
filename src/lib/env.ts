import { getRequestEvent } from "solid-js/web"

// cloudflare directions: https://ryanjc.com/blog/solidstart-cloudflare-pages/
export function serverEnv() {
	"use server"

	// NOTE: ideally we should just extract the cloudflare env from the request event ourselves
	// but currently DEV mode runs in Node and cloudflare's getPlatformProxy is an async function.
	// We have to use middleware to inject env into locals so we can use it here synchronously.
	//
	// For this serverEnv() function to work synchronously, we rely on middlewares to inject either
	// getPlatformProxy() env or real cloudflare env into locals.serverEnv
	//
	// Having a synchronous serverEnv() makes many things simpler, including defining and exporting lib.db
	// synchronously.
	return getRequestEvent()?.locals.serverEnv


	// if(isCfRuntime()) {
	// 	return cfEnv()
	// } else {
	// 	const wrangler = await import('wrangler')
	// 	const platform = await wrangler.getPlatformProxy()
	// }
	// biome-ignore lint/nursery/noProcessEnv: solid+vite not picking up .env server variables for import.meta.env
	//return cfEnv() ?? process.env //have to use processs.env bc server vars not showing up in import.meta.env
}
