import { drizzle } from "drizzle-orm/d1"
import { serverEnv } from "~/lib/env"
import { cfDevEnv } from "./cf-utils"

const db = drizzle(serverEnv().DB)
export default db

export async function getDevDb() {
	const { DB } = await cfDevEnv()
	return drizzle(DB)
}