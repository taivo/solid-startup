import { getRequestEvent } from "solid-js/web"

function getServerEnv() {
	"use server"

	// NOTE: ideally we should just extract the cloudflare env from the request event ourselves
	// but currently DEV mode runs in Node and cloudflare's getPlatformProxy is an async function.
	// We have to use middleware to inject env into locals so we can use it here synchronously.
	//
	// For this getServerEnv() function to work synchronously, we rely on middlewares to inject either
	// getPlatformProxy() env or real cloudflare env into locals.serverEnv
	//
	// Having a synchronous getServerEnv() makes many things simpler, including defining and exporting lib.db
	// synchronously.
	const event = getRequestEvent()
	const env = event?.locals.serverEnv

	if (event && !env) {
		console.warn(
			"*** serverEnv is empty ***"
		)
	}

	return (env ?? {}) as Env
}

// NOTE: May 2025: for some reason vite ssr does not hoist the getServerEnv() function (at least during pnpm dev)
// so we have to use it after it is defined
export const serverEnv = getServerEnv()
