import { reset } from "drizzle-seed"
import { user } from "~/schema/auth-schema"
import { withDatabase } from "../dev/script-helpers"

//
// https://orm.drizzle.team/docs/seed-overview
//
async function main() {
	withDatabase(async (db) => {
		const schema = { user }
		await reset(db, schema)
	})
}

main()
