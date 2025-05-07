import { reset } from "drizzle-seed"
import { user } from "~/schema/auth-schema"
import { withDatabase } from "../dev/script-helpers"

//
// https://orm.drizzle.team/docs/seed-overview
//
async function main() {
	const dbTarget = process.argv.includes("--remote") ? "remote" : "local"
	withDatabase(dbTarget, async (db) => {
		const schema = { user }
		await reset(db, schema)
	})
}

main()
