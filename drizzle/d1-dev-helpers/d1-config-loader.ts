import crypto from "node:crypto"
import { existsSync } from "node:fs"
import { unstable_readConfig } from "wrangler"


export class D1Config {
	binding: string
	database_name: string
	database_id: string
	preview_database_id?: string
	migrations_dir?: string

	static load(bindingName?: string) {
		const d1_databases = D1Config.loadRawD1Configs()

		if (d1_databases.length === 1 && !bindingName) {
			// return the only config if no bindingName is specified
			return new D1Config(d1_databases[0])
		}

		// find and return the specified binding
		const cfg = d1_databases.find((db: { binding: string }) => db.binding === bindingName)
		if (!cfg) {
			throw new Error(`Could not find wrangler config for D1 binding: [${bindingName}]`)
		}
		return new D1Config(cfg)
	}

	static loadRawD1Configs() {
		return unstable_readConfig({}).d1_databases
	}

	private constructor(cfg: ReturnType<typeof D1Config.loadRawD1Configs>[number]) {
		this.binding = cfg.binding
		this.database_name = cfg.database_name ?? ""
		this.database_id = cfg.database_id ?? ""
		this.preview_database_id = cfg.preview_database_id
		this.migrations_dir = cfg.migrations_dir
	}

	get localDatabaseId() {
		return this.preview_database_id || this.database_id
	}

	get databaseId() {
		return this.database_id
	}

	get sqliteLocalFile() {
		const uniqueKey = "miniflare-D1DatabaseObject" as const
		const miniflarePath = `.wrangler/state/v3/d1/${uniqueKey}`
		const filename = `${miniflarePath}/${durableObjectNamespaceIdFromName(uniqueKey, this.localDatabaseId)}.sqlite`

		if (!existsSync(filename)) {
			throw new Error(`Could not find Sqlite file: [${filename}] for databaseId [${this.localDatabaseId}]`)
		}

		return filename
	}
}

function durableObjectNamespaceIdFromName(uniqueKey: string, name: string) {
	// In v3.2, miniflare uses durable object to implement D1 and hashes the local sqlite filename.
	// See the following for more context:
	// https://github.com/cloudflare/workers-sdk/issues/4548 (understand the hash of the local D1 filename)
	// https://github.com/cloudflare/miniflare/releases/tag/v3.20230918.0
	//
	// This function is copied from these links
	//
	const key = crypto.createHash("sha256").update(uniqueKey).digest()
	const nameHmac = crypto.createHmac("sha256", key).update(name).digest().subarray(0, 16)
	const hmac = crypto.createHmac("sha256", key).update(nameHmac).digest().subarray(0, 16)
	return Buffer.concat([nameHmac, hmac]).toString("hex")
}
