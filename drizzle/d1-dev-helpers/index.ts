import { getPlatformProxy } from "wrangler"
import { type BoundD1, type ProxyD1, getD1, getProxyD1 } from ".."
import { D1Config } from "./d1-config-loader"
export { D1Config }

export async function withLocalD1(doWerk: (db: BoundD1) => Promise<void>) {
	const platform = await getPlatformProxy<Env>()
	console.log("platform.env.DB", platform.env.DB)
	const db = getD1(platform.env.DB)

	await doWerk(db)

	await platform.dispose()
}

export async function withProxyD1(doWerk: (db: ProxyD1) => Promise<void>) {
	const db = getProxyD1(D1Config.load().sqliteProxyCredentials)
	await doWerk(db)
}
