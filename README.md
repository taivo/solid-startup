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


## Creating a project

```bash
# create a new project in the current directory
npm init solid@latest

# create a new project in my-app
npm init solid@latest my-app
```

## Developing

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

Solid apps are built with _presets_, which optimise your project for deployment to different environments.

By default, `npm run build` will generate a Node app that you can run with `npm start`. To use a different preset, add it to the `devDependencies` in `package.json` and specify in your `app.config.js`.

## Testing

Tests are written with `vitest`, `@solidjs/testing-library` and `@testing-library/jest-dom` to extend expect with some helpful custom matchers.

To run them, simply start:

```sh
npm test
```

## This project was created with the [Solid CLI](https://solid-cli.netlify.app)
