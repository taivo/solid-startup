import { createMiddleware } from "@solidjs/start/middleware"
import { injectCfEnvMiddleware } from "./lib/cf-utils"

export default createMiddleware({
	onRequest: injectCfEnvMiddleware,
})

// async function injectCfEnv(event: Parameters<RequestMiddleware>[0]) {
// 	if (import.meta.env.DEV) {
// 		const platform = await import("wrangler").then(({ getPlatformProxy }) => getPlatformProxy<Env>())
// 		event.locals.serverEnv = platform.env
// 	} else {
// 		event.locals.serverEnv = event.nativeEvent.context.cloudflare?.env as Env
// 	}
// }
