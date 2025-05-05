import { getRequestEvent } from "solid-js/web"

export const serverEnv = getServerEnv()


// cloudflare env directions: https://ryanjc.com/blog/solidstart-cloudflare-pages/
function getServerEnv() {
	"use server"

	// NOTE: ideally we should just extract the cloudflare env from the request event ourselves
	// but currently DEV mode runs in Node and cloudflare's getPlatformProxy is an async function.
	// We have to use middleware to inject env into locals so we can use it here synchronously.
	//
	// For this getServerEnv() function to work synchronously, we rely on middlewares to inject either
	// getPlatformProxy() env or real cloudflare env into locals.serverEnv
	//
	// Having a synchronous serverEnv() makes many things simpler, including defining and exporting lib.db
	// synchronously.
	return getRequestEvent()?.locals.serverEnv
}
