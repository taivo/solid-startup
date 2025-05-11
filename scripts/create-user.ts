import { confirm, input, password } from "@inquirer/prompts"
import { betterAuth } from "better-auth"
import { drizzleAdapter } from "better-auth/adapters/drizzle"
import { eq } from "drizzle-orm"
import { z } from "zod"
import * as authSchema from "~schema/auth-schema"
import { type Database, withDatabase } from "../dev/script-helpers"

export default async function createUser(args: string[]) {
	const dbTarget = args.includes("--remote") ? "remote" : "local"

	withDatabase(dbTarget, async (db) => {
		const auth = betterAuth({
			database: drizzleAdapter(db, { provider: "sqlite", schema: { ...authSchema } }),
			emailAndPassword: {
				enabled: true,
				requireEmailVerification: false,
			},
		})

		console.info("Please enter user details")
		const name = await input({ message: "name:" })
		const email = await input({
			message: "email:",
			validate: (input: string) => z.string().email().safeParse(input).success,
		})
		const pw = await password({ message: "password:", mask: true })
		const isTest = await confirm({ message: "isTest?", default: true })

		await setupUser({ name, email, password: pw, isTest }, { auth, db })
	})
}

export function initAuthForScripts(db: Database) {
	return betterAuth({
		database: drizzleAdapter(db, { provider: "sqlite", schema: { ...authSchema } }),
		emailAndPassword: {
			enabled: true,
			requireEmailVerification: false,
		},
	})
}

type SetupUserData = Omit<typeof authSchema.user.$inferInsert & { password: string }, "createdAt" | "updatedAt" | "id" | "emailVerified">
export async function setupUser({ name, email, password, ...otherFields }: SetupUserData & { password: string }, { auth, db }: {
	auth: ReturnType<typeof initAuthForScripts>, db: Database
}) {
	const {
		user: newUser,
	} = await auth.api.signUpEmail({
		body: { name, email, password },
	})

	if (otherFields) {
		await db.update(authSchema.user).set(otherFields).where(eq(authSchema.user.id, newUser.id))
	}

	return { name, email, ...otherFields }
}