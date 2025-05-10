import { input, password } from "@inquirer/prompts"
import { betterAuth } from "better-auth"
import { drizzleAdapter } from "better-auth/adapters/drizzle"
import { z } from 'zod'
import * as authSchema from "~schema/auth-schema"
import { withDatabase } from "../dev/script-helpers"

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
		const email = await input({ message: "email:", validate: (input: string) => z.string().email().safeParse(input).success })
		const pw = await password({ message: "password:", mask: true })

		await auth.api.signUpEmail({ body: { name, email, password: pw } })
	})
}
