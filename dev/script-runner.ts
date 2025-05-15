import { setTimeout } from "node:timers/promises"

async function main() {
	const scriptFilename = process.argv[2]
	const script = await import(`../scripts/${scriptFilename}`)

	// do a setTimeout to allow node deprecation warnings that we don't control (e.g. punycode)
	// to get printed before we move on. Without this, scripts that prompt the user for input
	// may have its prompt messages interlaced with the Nodejs warnings
	await setTimeout(1)
	console.log("")

	await script.default(process.argv.slice(3))
}

main()
