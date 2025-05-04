import { getRequestEvent } from "solid-js/web"

export async function cfDevEnv() {
	"use server"

	//const { env } = await import("wrangler").then(({ getPlatformProxy }) => getPlatformProxy())
	//return env as unknown as Env
	return {} as Env
}

export function cfEnv() {
	"use server"
	const event = getRequestEvent()
	const cfContext = event?.nativeEvent?.context?.cloudflare ?? {}

	return cfContext.env as Env
}

export function isCfRuntime() {
	return navigator.userAgent === "Cloudflare-Workers"
}
