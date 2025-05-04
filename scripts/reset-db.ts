import { reset } from "drizzle-seed"
import { user } from "~/schema/auth-schema"
import { withLocalD1 } from "./script-helpers"

//
// https://orm.drizzle.team/docs/seed-overview
//
async function main() {
	withLocalD1(async (db) => {
		const schema = { user }
		await reset(db, schema)
	})
}

main()
