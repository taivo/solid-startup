# SolidStart

Everything you need to build a Solid project, powered by [`solid-start`](https://start.solidjs.com);

## What is included in this starter template:

- vitest
- biomejs
- tailwindcss v4
- cloudflare + wrangler (bindings not completely setup)
- solid-ui https://www.solid-ui.com/docs/introduction
- drizzle ORM with sqlite (or cloudflare d1 but not completely setup)
- better-auth (with magic link that mocks email sending via server console.log)

## How to get started

```bash
## pull repo
git clone https://github.com/taivo/solid-startup.git

## install dependencies
cd solid-startup
pnpm install

## initialize the local sqlite db
pnpm db:generate    # to generate migration files
pnpm db:migrate     # this will migrate database and make sure local D1 files exist
```

Look at package.json to see available scripts other than `db:push`


## Developing

```bash
pnpm dev
```


## Cloudflare setup resources
 - https://developers.cloudflare.com/pages/framework-guides/deploy-a-solid-start-site/
 - https://developers.cloudflare.com/pages/framework-guides/deploy-a-solid-start-site/ (has bindings info)
 - https://ryanjc.com/blog/solidstart-cloudflare-pages/
 - https://github.com/cloudflare/workers-sdk/issues/5912
 - https://github.com/solidjs/solid-start/issues/1833
 - https://github.com/cloudflare/workers-sdk/issues/4548 (understand the hash of the local D1 filename)
 - https://github.com/cloudflare/miniflare/releases/tag/v3.20230918.0 (code to generate local D1 filename)