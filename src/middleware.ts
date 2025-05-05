import { createMiddleware } from "@solidjs/start/middleware"
import type { RequestEvent } from "solid-js/web"
import { getCfEnv } from "./lib/cf-utils"

export default createMiddleware({
	onRequest: injectCfEnvMiddleware,
})

async function injectCfEnvMiddleware(event: RequestEvent) {
	event.locals.serverEnv = await getCfEnv(event)
}
