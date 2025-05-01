import { drizzle } from "drizzle-orm/libsql"
import { serverEnv } from "~/lib/env"

const db = drizzle(serverEnv().DB_URL)
export default db