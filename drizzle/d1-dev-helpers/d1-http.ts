import Cloudflare from "cloudflare"
import type { DatabaseQueryParams, DatabaseRawParams } from "cloudflare/resources/d1/database.mjs"
import type { DrizzleConfig } from "drizzle-orm"
import { drizzle as drizzleProxy } from "drizzle-orm/sqlite-proxy"

export type D1Credentials = {
	accountId: string
	databaseId: string
	token: string
}

export function drizzle<TSchema extends Record<string, unknown> = Record<string, never>>(
	{ accountId, token, databaseId }: D1Credentials,
	config?: DrizzleConfig<TSchema>
) {
	const d1Proxy = new D1Proxy({ accountId, apiToken: token })

	const remoteCallback: Parameters<typeof drizzleProxy>[0] = async (sql, params, method) => {
		console.log("remoteCallback:: sql:", sql, "params:", params, "method:", method)

		return method === "values" ? d1Proxy.rawQuery(databaseId, sql, params) : d1Proxy.query(databaseId, sql, params)
	}
	return drizzleProxy(remoteCallback, config)
}


// looks like cloudflare 4.2.0 does not define "errors" in its database and query response types so we help out
// typescript a little
type WithErrors<T> = T & {
	success: boolean
	errors?: { code: string; message: string }[]
}

class D1Proxy {
	#cf: Cloudflare
	#accountId: string

	constructor({ accountId, apiToken }: { accountId: string; apiToken?: string }) {
		this.#cf = new Cloudflare({ apiToken })
		this.#accountId = accountId
	}

	get d1() {
		return this.#cf.d1.database
	}

	async rawQuery(databaseId: string, sql: string, params: DatabaseRawParams["params"]) {
		const response = await this.d1.raw(databaseId, { account_id: this.#accountId, sql, params })
		const {
			result: [page],
			errors,
		} = response as WithErrors<typeof response>
		if (errors) {
			throw new Error(errors.map((it) => `${it.code}: ${it.message}`).join("\n"))
		}

		// the "raw" endpoint is optimized to to return entries as array
		// raw results is an object of {columns?: [], rows?: [][]}. We reformat it here to make "rows" non-optional
		return {
			columns: page.results?.columns,
			rows: page.results?.rows ?? []
		}
	}

	async query(databaseId: string, sql: string, params: DatabaseQueryParams["params"]) {
		const response = await this.d1.query(databaseId, { account_id: this.#accountId, sql, params })
		const {
			result: [page],
			errors,
		} = response as WithErrors<typeof response>
		if (errors) {
			throw new Error(errors.map((it) => `${it.code}: ${it.message}`).join("\n"))
		}

		// query results is an array of objects. Here we wrap it with {rows: []}
		return { rows: page.results ?? [] }
	}
}

/*
remoteCallback insert into "account" ("id", "account_id", "provider_id", "user_id", "access_token", "refresh_token", "id_token", "access_token_expires_at", "refresh_token_expires_at", "scope", "password", "created_at", "updated_at") values (?, null, ?, null, null, null, null, null, null, null, ?, ?, ?) returning "id", "account_id", "provider_id", "user_id", "access_token", "refresh_token", "id_token", "access_token_expires_at", "refresh_token_expires_at", "scope", "password", "created_at", "updated_at" [
	'9UERMadnLTIHjkSMm3KVffT0E0QJwbc1',
	'credential',
	'31f2c15dbec32647e709f50be483a30f:10db9528b25d58b77b6a6f9e361f21fae410a5a096f5d03b6ed4176a2d91e2deda243a30246515f8461c0cea558e9f2c93dc829ffa6816e6619ba636f4aa83ff',
	1747187848,
	1747187848
] all
*/
