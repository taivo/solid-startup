import { drizzle } from "drizzle-orm/d1"
import { serverEnv } from "~/lib/env"
import * as authSchema from "~schema/auth-schema"
import * as mainSchema from "~schema/schema"

const db = getDb(serverEnv.DB)
export default db

export function getDb(binding: D1Database) {
	return drizzle(binding, { schema: { ...authSchema, ...mainSchema } })
}
