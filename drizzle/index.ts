import { type AnyD1Database, drizzle as drizzleD1 } from "drizzle-orm/d1"
import * as authSchema from "./schema/auth-schema"
import * as mainSchema from "./schema/main-schema"

export const fullSchema = {
	...authSchema,
	...mainSchema,
}

export { authSchema }

export function getD1(binding: AnyD1Database) {
	return drizzleD1(binding, { schema: fullSchema })
}
