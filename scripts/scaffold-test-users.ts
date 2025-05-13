import { type Database, initAuthForScripts, withDatabase } from "../dev/script-helpers"
import { scaffoldTestUsers } from "../scaffolding/users"

//
// https://orm.drizzle.team/docs/seed-overview
export default async function dbSeed(args: string[]) {
	const dbTarget = args.includes("--remote") ? "remote" : "local"
	withDatabase(dbTarget, async function seedDb(db: Database) {
		const auth = initAuthForScripts(db)
		const users = await scaffoldTestUsers(db, auth)
		for (const u of users) {
			console.log("setup user: ", u)
		}
	})
}
