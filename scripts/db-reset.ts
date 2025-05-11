import { reset } from "drizzle-seed"
import { fullSchema } from "~drizzle/index"
import { withDatabase } from "../dev/script-helpers"

//
// https://orm.drizzle.team/docs/seed-overview
//
export default async function dbReset(args: string[]) {
	const dbTarget = args.includes("--remote") ? "remote" : "local"
	withDatabase(dbTarget, async (db) => {
		await reset(db, fullSchema)
	})
}
