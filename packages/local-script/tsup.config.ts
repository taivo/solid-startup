import { defineConfig } from 'tsup'

export default defineConfig({
	entry: {
		index: 'src/helpers.ts',
		cli: 'src/cli.ts',
	},
	splitting: false,
	target: "node22",
	format: ["esm"],
	dts: true,
	clean: true,
	skipNodeModulesBundle: true,
	noExternal: ["commander/esm.mjs"],
	outExtension({ format }) {
		return { js: (format === "esm" ? ".mjs" : ".js") }
	},
})