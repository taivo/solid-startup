# Why is this needed?

In production, it's easy to access D1 with Drizzle via Cloudflare bindings. However, during development, local scripting, or drizzle-kit, different mechanisms are needed to acquire access to the D1 database. This table
illustrates those scenarios


Scenario                     | solution provided or simplified by this package | Applicable to
-----------------------------|-----------------------------------------------------------------
server dev local db          | getPlatformProxy() to obtain miniflare binding  |
running scripts on local db  | getPlatformProxy() to obtain miniflare binding  | drizzle-seed, any node script
running scripts on remote db | custom d1-http driver                           | drizzle-seed, any node script
drizzle-kit on local db      | parse wrangler config and locate the miniflare sqlite file | migrate, studio
drizzle-kit on remote db     | parse wrangler config to get databaseId and format access credential | migrate, studio

# Installation
```
```

# Usage

## Local d1 scripting
```
withLocalD1("DB", async (db) => {
	// do whatever you need with the db that is locally bound to "DB" in wrangler config
})
```

## Remote d1 scripting
```
const {CLOUDFLARE_ACCOUNT_ID: accountId, CLOUDFLARE_D1_TOKEN: apiToken } = process.env
const d1Credentials = getD1ProxyCredentials(accountId, apiToken)
withProxyD1(d1Credentials, async (db) => {
	// do work on remote db
})
```

## Local d1 credentials for drizzle-kit

`getD1LocalFileCredentials()` returns an object that looks something like this

```
{
		url: "file:.wrangler/state/v3/d1/miniflare-D1DatabaseObject/a9be733ec67eab6dbefcb5090b084c719daf1851f57b2901eda41a3e4683d794.sqlite",
	}
```

The hash is generated in this package using the same hashing mechanism mentioned by [cloudflare here](https://github.com/cloudflare/miniflare/releases/tag/v3.20230918.0)

## Remote d1 credentials for drizzle-kit
`getD1ProxyCredentials(accountId, apiToken)` automatically parses the wrangler configuration to get the databaseId and put the 3 pieces of information together for drizzle. You'll need to
supply the accountId and apiToken, probably by setting and parsing `process.env`