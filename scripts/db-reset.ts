import { reset } from "drizzle-seed"
import { withDatabase } from "../dev/script-helpers"
import { user } from "../drizzle/schema/auth-schema"

//
// https://orm.drizzle.team/docs/seed-overview
//
export default async function main(args: string[]) {
	const dbTarget = args.includes("--remote") ? "remote" : "local"
	withDatabase(dbTarget, async (db) => {
		const schema = { user }
		await reset(db, schema)
	})
}
