import { confirm } from "@inquirer/prompts"
import { withLocalD1, withProxyD1 } from "~drizzle/d1-dev-helpers"
import type { BoundD1, ProxyD1 } from "~drizzle/index"

export async function withDatabase(dbTarget: "local" | "remote", doWerk: (db: BoundD1 | ProxyD1) => Promise<void>) {
	if (dbTarget === "remote") {
		const answer = await confirm({
			message: "*** Acquiring a handle to the PRODUCTION DATABASE. Are you sure?",
			default: false,
		})

		if (answer) {
			withProxyD1(doWerk)
		} else {
			console.log("Aborting...")
			process.exit(0)
		}
	} else {
		withLocalD1(doWerk)
	}
}
