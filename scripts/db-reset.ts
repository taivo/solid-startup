import { reset } from "drizzle-seed"
import { user } from "~/schema/auth-schema"
import { withDatabase } from "../dev/script-helpers"

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
