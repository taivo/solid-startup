import { drizzle as drizzleProxy } from "drizzle-orm/sqlite-proxy"

export function drizzle({ accountId, token, databaseId }: { accountId: string; token: string; databaseId: string }) {

	const apiRoot = "https://api.cloudflare.com/client/v4/accounts" as const

	//
	// remoteCallback implementation is from
	// https://github.com/drizzle-team/drizzle-orm/blob/main/drizzle-kit/src/cli/connections.ts#L742
	//
	const remoteCallback: Parameters<typeof drizzleProxy>[0] = async (sql, params, method) => {
		const res = await fetch(
			`${apiRoot}/${accountId}/d1/database/${databaseId}/${method === "values" ? "raw" : "query"}`,
			{
				method: "POST",
				body: JSON.stringify({ sql, params }),
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
			}
		)

		const data = (await res.json()) as
			| {
				success: true
				result: {
					results:
					// biome-ignore lint/suspicious/noExplicitAny: <explanation>
					| any[]
					| {
						columns: string[]
						// biome-ignore lint/suspicious/noExplicitAny: <explanation>
						rows: any[][]
					}
				}[]
			}
			| {
				success: false
				errors: { code: number; message: string }[]
			}

		if (!data.success) {
			throw new Error(data.errors.map((it) => `${it.code}: ${it.message}`).join("\n"))
		}

		const result = data.result[0].results
		const rows = Array.isArray(result) ? result : result.rows

		return { rows }
	}

	return drizzleProxy(remoteCallback)
}
