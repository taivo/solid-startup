import {
	type AsyncBatchRemoteCallback,
	type AsyncRemoteCallback,
	drizzle as drizzleProxy,
} from "drizzle-orm/sqlite-proxy"


type D1HttpResponse = {
	errors?: { code: number; message: string }[]
	messages?: { code: number; message: string }[]
	result?: { results: unknown[]; success: boolean }[]
	success?: boolean
}

export function drizzle({ accountId, token, databaseId }: { accountId: string, token: string, databaseId: string }) {
	async function query(json: { sql: string, params: unknown[], method: "run" | "all" | "values" | "get" }) {
		return fetch(`https://api.cloudflare.com/client/v4/accounts/${accountId}/d1/database/${databaseId}`, {
			method: "POST",
			headers: {
				Authorization: `Bearer ${token}`,
				"Content-Type": "application/json",
			},
			body: JSON.stringify(json),
		})
	}

	const httpQueryD1: AsyncRemoteCallback = async (sql, params, method) => {
		const res = await query({ sql, params, method })

		if (res.status !== 200) {
			throw new Error(`Query failed with status [${res.status}] and statusText [${res.statusText}]`)
		}

		// Based on the Cloudflare docs
		// In practice, the type should be validated at runtime
		const dbResponse: D1HttpResponse = await res.json()
		if ((dbResponse.errors?.length ?? 0) > 0 || !dbResponse.success) {
			throw new Error(`query failed with errors from Cloudflare: ${JSON.stringify(dbResponse)}`)
		}

		const queryResult = dbResponse?.result?.at(0)
		if (!queryResult?.success) {
			throw new Error(`Unable to get first result from ${JSON.stringify(dbResponse)}`)
		}

		// Format row data
		const rows = queryResult?.results.map((row) => {
			if (row instanceof Object) {
				return Object.values(row)
			}

			throw new Error("Unexpected Response", {
				cause: dbResponse,
			})
		})

		return { rows }
	}

	const httpBatchQueryD1: AsyncBatchRemoteCallback = async (
		batch: { sql: string, params: unknown[], method: "run" | "all" | "values" | "get" }[]
	) => {
		const results = [] as Awaited<ReturnType<typeof httpQueryD1>>[]

		for (const query of batch) {
			const { sql, params, method } = query
			const result = await httpQueryD1(sql, params, method)
			results.push(result)
		}

		return results
	}

	return drizzleProxy(httpQueryD1, httpBatchQueryD1)
}
