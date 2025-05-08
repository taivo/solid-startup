import { drizzle } from "drizzle-orm/d1"
import { serverEnv } from "~/lib/env"

const db = getDb(serverEnv.DB)
export default db

export function getDb(binding: D1Database) {
	return drizzle(binding)
}
