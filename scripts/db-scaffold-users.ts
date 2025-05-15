import { type Database, initAuthApi, withDatabase } from "../dev/script-helpers"
import { scaffoldTestUsers } from "./scaffolding/users"

//
// https://orm.drizzle.team/docs/seed-overview
export default async function dbSeed(args: string[]) {
	const dbTarget = args.includes("--remote") ? "remote" : "local"
	withDatabase(dbTarget, async function seedDb(db: Database) {
		const authApi = initAuthApi(db)
		const users = await scaffoldTestUsers(db, authApi)
		for (const u of users) {
			console.log("Completed user:", u)
		}
	})
}
