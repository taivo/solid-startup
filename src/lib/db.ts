import { serverEnv } from "~/lib/env"
import { getD1 } from "../../packages/common-database/dist"
export { fullSchema } from "../../packages/common-database/dist"
export { authSchema } from "../../packages/common-database/dist"

const db = getD1(serverEnv.DB)
export default db
