import type { CliOptions } from "local-script"

//
// https://orm.drizzle.team/docs/seed-overview
//

export const options = {
	"-a --alpha <alpha>": {
		description: "alpha option",
		default: "a",
	},
} satisfies CliOptions

export default async function dbReset(cliOptions: Record<string, any>) {
	console.log(cliOptions)
	// const dbTarget = args.includes("--remote") ? "remote" : "local"
	// withDatabase(dbTarget, async (db) => {
	// 	await reset(db, fullSchema)
	// })
}
