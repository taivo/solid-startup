import { reset } from "drizzle-seed"
import { user } from "~/schema/auth-schema"
import { withLocalDb } from "./script-helpers"

//
// https://orm.drizzle.team/docs/seed-overview
//
async function main() {
	withLocalDb(async (db) => {
		const schema = { user }
		await reset(db, schema)
	})
}

main()
