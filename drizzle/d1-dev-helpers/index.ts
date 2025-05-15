import { getPlatformProxy } from "wrangler"
import { type BoundD1, type ProxyD1, getD1, getProxyD1 } from ".."
import { D1Config } from "./d1-config-loader"

export async function withLocalD1(doWerk: (db: BoundD1) => Promise<void>) {
	const platform = await getPlatformProxy<Env>()
	const db = getD1(platform.env.DB)

	await doWerk(db)

	await platform.dispose()
}

export async function withProxyD1({
	accountId,
	token,
	databaseId }: { accountId: string, token: string, databaseId: string },
	doWerk: (db: ProxyD1) => Promise<void>) {

	const db = getProxyD1({ accountId, token, databaseId })
	await doWerk(db)
}

export function getD1LocalFileCredentials() {
	// NOTE 5/15/2025: currently this is only used by drizzle-kit.
	// Local scripts use bindings from getPlatformProxy()
	//
	return {
		url: `file:${D1Config.load().sqliteLocalFile}`,
	}
}

export function getD1ProxyCredentials(accountId: string, token: string) {
	return {
		accountId,
		token,
		databaseId: D1Config.load().databaseId
	}
}