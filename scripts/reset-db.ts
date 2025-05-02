import { reset } from "drizzle-seed"
import db from "~/lib/db"
import { user } from "~/schema/auth-schema"

//
// https://orm.drizzle.team/docs/seed-overview
//
async function main() {
	const schema = { user }
	await reset(db, schema)
}

main()
