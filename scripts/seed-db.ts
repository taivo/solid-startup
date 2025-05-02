import { seed } from "drizzle-seed"
import db from "~/lib/db"
import { user } from "~/schema/auth-schema"

//
// https://orm.drizzle.team/docs/seed-overview
//
async function main() {
	const schema = { user }
	// await reset(db, schema)
	await seed(db, schema, { count: 20, seed: 123 }).refine((f) => ({
		user: {
			columns: { image: f.default({ defaultValue: "" }) },
		},
	}))
}

main()
