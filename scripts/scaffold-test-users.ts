import { type AuthApi, type Database, withDatabaseAndAuth } from "../dev/script-helpers"
import { scaffoldTestUsers } from "../scaffolding/users"

//
// https://orm.drizzle.team/docs/seed-overview
export default async function dbSeed(args: string[]) {
	const dbTarget = args.includes("--remote") ? "remote" : "local"
	withDatabaseAndAuth(dbTarget, async function seedDb(db: Database, authApi: AuthApi) {
		const users = await scaffoldTestUsers(db, authApi)
		for (const u of users) {
			console.log("setup user: ", u)
		}
	})
}

/////https://github.com/leonlarsson/leon-home/blob/main/app.config.ts