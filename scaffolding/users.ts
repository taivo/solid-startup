import { eq } from "drizzle-orm"
import { authSchema } from "~drizzle/index"
import type { AuthApi, Database, initAuthApi } from "../dev/script-helpers"

export const DEMO_USERS_DATA = [
	{ name: "Alice", email: "alice@example.com", password: "demo-123" },
	{ name: "Bob", email: "bob@example.com", password: "demo-123" },
	{ name: "Charlie", email: "charlie@example.com", password: "demo-123" },
] as const

export async function scaffoldTestUsers(db: Database, authApi: AuthApi) {
	const usersData = DEMO_USERS_DATA.map((d) => ({ ...d, isTest: true }))
	return setupUsers(usersData, { authApi, db })
}

type SetupUserData = Omit<
	typeof authSchema.user.$inferInsert & { password: string },
	"createdAt" | "updatedAt" | "id" | "emailVerified"
>
export async function setupUsers(
	uData: SetupUserData[],
	{
		authApi,
		db,
	}: {
		authApi: ReturnType<typeof initAuthApi>
		db: Database
	}
) {
	async function setupOneUser({ name, email, password, ...otherFields }: SetupUserData) {
		const { user: newUser } = await authApi.signUpEmail({
			body: { name, email, password },
		})

		if (otherFields) {
			await db.update(authSchema.user).set(otherFields).where(eq(authSchema.user.id, newUser.id))
		}

		return { name, email, ...otherFields }
	}

	return Promise.all(uData.map(setupOneUser))
}
