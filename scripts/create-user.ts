import { confirm, input, password } from "@inquirer/prompts"
import { z } from "zod"
import { withDatabaseAndAuth } from "../dev/script-helpers"
import { setupUsers } from "../scaffolding/users"

export default async function createUser(args: string[]) {
	const dbTarget = args.includes("--remote") ? "remote" : "local"

	withDatabaseAndAuth(dbTarget, async (db, authApi) => {
		console.info("Please enter user details")
		const name = await input({ message: "name:" })
		const email = await input({
			message: "email:",
			validate: (input: string) => z.string().email().safeParse(input).success,
		})
		const pw = await password({ message: "password:", mask: true })
		const isTest = await confirm({ message: "isTest?", default: true })

		await setupUsers([{ name, email, password: pw, isTest }], { authApi, db })
	})
}
