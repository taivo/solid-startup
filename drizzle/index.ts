import { drizzle as drizzleD1 } from "drizzle-orm/d1"
import { type D1Credentials, drizzle as drizzleD1Proxy } from "./d1-http"
import * as authSchema from "./schema/auth-schema"
import * as mainSchema from "./schema/main-schema"

export const fullSchema = {
	...authSchema,
	...mainSchema,
}

export { authSchema }

export function getD1(binding: D1Database) {
	return drizzleD1(binding, { schema: fullSchema })
}

export function getProxyD1(credentials: D1Credentials) {
	return drizzleD1Proxy(credentials, { schema: fullSchema })
}

export type BoundD1 = ReturnType<typeof getD1>
export type ProxyD1 = ReturnType<typeof getProxyD1>
