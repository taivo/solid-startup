import { seed } from "drizzle-seed"
import { type Database, withDatabase } from "../dev/script-helpers"
import { user } from "../drizzle/schema/auth-schema"
import { initAuthForScripts, setupUser } from "./create-user"

//
// https://orm.drizzle.team/docs/seed-overview
export default async function dbSeed(args: string[]) {
	const dbTarget = args.includes("--remote") ? "remote" : "local"
	withDatabase(dbTarget, async function seedDb(db: Database) {
		await seedDemoUsers(db)
	})
}

async function seedDemoUsers(db: Database) {
	const auth = await initAuthForScripts(db)

	const demoUsers = [
		{ name: "Alice", email: "alice@example.com", password: "demo-123" },
		{ name: "Bob", email: "bob@example.com", password: "demo-123" },
		{ name: "Charlie", email: "charlie@example.com", password: "demo-123" },
	]

	async function setupTestUser(u: (typeof demoUsers)[number]) {
		// const {
		// 	user: { id: userId },
		// } = await auth.api.signUpEmail({
		// 	body: {
		// 		name: u.name,
		// 		email: u.email,
		// 		password: u.password,
		// 	},
		// })
		// await db.update(user).set({ isTest: true }).where(eq(user.id, userId))
		await setupUser({ ...u, isTest: true }, { auth, db })
	}

	await Promise.all(demoUsers.map(setupTestUser))
}

async function seedData(db: Database) {
	const schema = { user }

	// the d1 driver doesn't like too many statements all at once, so we seed
	// in smaller batches. Use a controlled randSeeds array for determinism
	//
	await Promise.all(
		[1, 2].map(async (randSeed) =>
			seed(db, schema, { count: 10, seed: randSeed }).refine((f) => ({
				user: {
					columns: { image: f.default({ defaultValue: "" }) },
				},
			}))
		)
	)
}
