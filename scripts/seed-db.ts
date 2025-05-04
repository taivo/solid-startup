import { seed } from "drizzle-seed"
import { user } from "~/schema/auth-schema"
import { withLocalD1 } from "./script-helpers"

//
// https://orm.drizzle.team/docs/seed-overview
//
async function main() {
	withLocalD1(async (db) => {
		const schema = { user }

		// the d1 driver doesn't like too many statements all at once, so we seed
		// in smaller batches. Use a controlled randSeeds array for determinism
		//
		await Promise.all([1, 2].map(async (randSeed) =>
			seed(db, schema, { count: 10, seed: randSeed }).refine((f) => ({
				user: {
					columns: { image: f.default({ defaultValue: "" }) },
				},
			}))
		))
	})
}

main()
