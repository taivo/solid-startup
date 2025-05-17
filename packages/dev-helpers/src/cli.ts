#!/usr/bin/env node

import path from "node:path"
import { createCommand, program } from "@commander-js/extra-typings"

async function main() {
	program
		.command("runscript")
		.argument("<scriptname>", "The script to run")
		.option("-p --path <path>", "The path prefix to the script", ".")
		.allowExcessArguments()
		.allowUnknownOption()
		.action(async (scriptName, opts, cmd) => {
			const scriptCmd = await loadScriptAsCommand(opts.path, scriptName)
			await scriptCmd.parseAsync(cmd.args.slice(1), { from: "user" })
		})

	program.parseAsync()
}

async function loadScriptAsCommand(pathPrefix: string, scriptName: string) {
	const fname = path.join(pathPrefix, `${scriptName}`)
	const { options: scriptOptions = {}, default: scriptAction } = await import(fname)

	const cmd = createCommand(scriptName)
	for (const [spec, { description, coerce, default: defaultVal, required }] of Object.entries(
		scriptOptions as ScriptOptions
	)) {
		if (required) {
			// biome-ignore lint/style/noNonNullAssertion: <explanation>
			cmd.requiredOption(spec, description, coerce!, defaultVal)
		} else {
			// biome-ignore lint/style/noNonNullAssertion: <explanation>
			cmd.option(spec, description, coerce!, defaultVal)
		}
	}

	return cmd.action(scriptAction)
}

main()

// do a setTimeout to allow node deprecation warnings that we don't control (e.g. punycode)
// to get printed upon importing a module. Without this, scripts that prompt the user for input
// may have its prompt messages interlaced with the Nodejs warnings
//await setTimeout(1)

type OptionExtra<T = string> = {
	description: string
	default?: T
	required?: boolean
	coerce?: (v: string, previous: string) => T
}
export type ScriptOptions = {
	[spec: string]: OptionExtra
}
