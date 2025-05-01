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
pnpm db:push
```

Look at package.json to see available scripts other than `db:push`


## Developing

```bash
pnpm dev
```