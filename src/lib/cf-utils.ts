import { once } from "lodash-es"
import type { RequestEvent } from "solid-js/web"

export const isCfRuntime = navigator.userAgent === "Cloudflare-Workers"

export const getCfEnv = async (event: RequestEvent) => {
	return import.meta.env.DEV ? (await __devGetPlatformProxy()).env : (event.nativeEvent.context.cloudflare?.env as Env)
}

const __devGetPlatformProxy = import.meta.env.DEV ?
	once(async () => import("wrangler").then(({ getPlatformProxy }) => getPlatformProxy<Env>()))
	: () => Promise.reject("getPlatformProxy is only available in DEV mode")
