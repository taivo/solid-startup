import type { RequestEvent } from "solid-js/web"

export function isCfRuntime() {
	return navigator.userAgent === "Cloudflare-Workers"
}

export async function getCfEnv(event: RequestEvent) {
	return import.meta.env.DEV ? (await __devGetPlatformProxy()).env : (event.nativeEvent.context.cloudflare?.env as Env)
}

const __devGetPlatformProxy = async () => {
	console.log("IMPORTING WRANGLER")
	return import("wrangler").then(({ getPlatformProxy }) => getPlatformProxy<Env>())
}
