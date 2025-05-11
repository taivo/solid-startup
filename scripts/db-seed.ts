import { seed } from "drizzle-seed"
import { exampleTable } from "~drizzle/schema/main-schema"
import { type Database, withDatabase } from "../dev/script-helpers"
import { initAuthForScripts, setupUsers } from "./create-user"

//
// https://orm.drizzle.team/docs/seed-overview
export default async function dbSeed(args: string[]) {
	const dbTarget = args.includes("--remote") ? "remote" : "local"
	withDatabase(dbTarget, async function seedDb(db: Database) {
		await seedTestUsers(db)
	})
}

export const TEST_USERS_DATA = [
	{ name: "Alice", email: "alice@example.com", password: "demo-123" },
	{ name: "Bob", email: "bob@example.com", password: "demo-123" },
	{ name: "Charlie", email: "charlie@example.com", password: "demo-123" },
] as const

async function seedTestUsers(db: Database) {
	const auth = initAuthForScripts(db)
	return setupUsers(
		TEST_USERS_DATA.map((d) => ({ ...d, isTest: true })),
		{ auth, db }
	)
}

async function seedData(db: Database) {
	const schema = { exampleTable }

	// the d1 driver doesn't like too many statements all at once, so we seed
	// in smaller batches. Use a controlled randSeeds array for determinism
	//
	await Promise.all(
		[1, 2].map(
			async (randSeed) => seed(db, schema, { count: 10, seed: randSeed })
			// .refine((f) => ({
			// 		exampleTable: {
			// 			columns: { content: f.default({ defaultValue: "blah blah" }) },
			// 		},
			// 	}))
		)
	)
}
