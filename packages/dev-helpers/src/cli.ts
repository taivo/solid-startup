#!/usr/bin/env node

import path from "node:path"
import { setTimeout } from "node:timers/promises"
import { program } from "commander"

async function main() {
	program
		.command("runscript")
		.argument("<scriptname>", "The script to run")
		.option("-p --path <path>", "The path prefix to the script", ".")
		.action(async (scriptname, options) => {
			console.log("scriptname", scriptname, options)

			// do a setTimeout to allow node deprecation warnings that we don't control (e.g. punycode)
			// to get printed before we move on. Without this, scripts that prompt the user for input
			// may have its prompt messages interlaced with the Nodejs warnings
			await setTimeout(1)
			console.log("")

			const scriptFilename = path.join(options.path, `${scriptname}.ts`)
			//const script = await import(`../scripts/${scriptFilename}`)
		})

	program.parseAsync()
}

main()
