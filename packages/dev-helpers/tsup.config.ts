import { defineConfig } from 'tsup'

export default defineConfig({
	entry: {
		index: 'src/index.ts',
		cli: 'src/cli.ts',
	},
	splitting: false,
	target: "node22",
	format: ["esm"],
	dts: true,
	clean: true,
	skipNodeModulesBundle: true,
	outExtension({ format }) {
		return { js: (format === "esm" ? ".mjs" : ".js") }
	},
})