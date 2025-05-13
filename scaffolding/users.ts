import { eq } from "drizzle-orm"
import { authSchema } from "~drizzle/index"
import type { AuthForScripts, Database } from "../dev/script-helpers"

const DEMO_USERS_DATA = [
	{ name: "Alice", email: "alice@example.com" },
	{ name: "Bob", email: "bob@example.com" },
	{ name: "Charlie", email: "charlie@example.com" },
].map((d) => ({ ...d, password: "demo-123", isTest: true }))

export async function scaffoldTestUsers(db: Database, auth: AuthForScripts) {
	return setupUsers(DEMO_USERS_DATA, { auth, db })
}

type SetupUserData = Omit<
	typeof authSchema.user.$inferInsert & { password: string },
	"createdAt" | "updatedAt" | "id" | "emailVerified"
>
export async function setupUsers(
	uData: SetupUserData[],
	{
		auth,
		db,
	}: {
		auth: AuthForScripts
		db: Database
	}
) {
	async function setupOneUser({ name, email, password, ...otherFields }: SetupUserData) {
		const { user: newUser } = await auth.api.signUpEmail({
			body: { name, email, password }
		})

		if (otherFields) {
			await db.update(authSchema.user).set(otherFields).where(eq(authSchema.user.id, newUser.id))
		}

		return { name, email, ...otherFields }
	}

	return Promise.all(uData.map(setupOneUser))
}
