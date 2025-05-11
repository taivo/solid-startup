import { serverEnv } from "~/lib/env"
import { getD1 } from "~drizzle/index"
export { fullSchema } from "~drizzle/index"

const db = getD1(serverEnv.DB)
export default db
