import { query } from "@solidjs/router"
import type { RequestMiddleware } from "@solidjs/start/middleware"

export async function cfDevEnv() {
	"use server"

	//const { env } = await import("wrangler").then(({ getPlatformProxy }) => getPlatformProxy())
	//return env as unknown as Env
	return {} as Env
}

export function isCfRuntime() {
	return navigator.userAgent === "Cloudflare-Workers"
}

export const injectCfEnvMiddleware: RequestMiddleware = async (event) => {
	if (import.meta.env.DEV) {
		// This must be wrapped with DEV because it's dev only code. Without the wrapper, build will fail.
		// wrangler is a devDependency
		event.locals.serverEnv = (await __devGetPlatformProxy()).env
	} else {
		event.locals.serverEnv = event.nativeEvent.context.cloudflare?.env as Env
	}
}

const __devGetPlatformProxy = query(async () => {
	console.log("IMPORTING WRANGLER")
	return import("wrangler").then(({ getPlatformProxy }) => getPlatformProxy<Env>())
}, "__devGetPlatformProxy")