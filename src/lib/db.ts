import { drizzle } from "drizzle-orm/d1"
import { serverEnv } from "~/lib/env"

const db = drizzle(serverEnv().DB)
export default db
