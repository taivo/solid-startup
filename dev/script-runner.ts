async function main() {
	const scriptFilename = process.argv[2]
	const script = await import(`../scripts/${scriptFilename}`)
	await script.default(process.argv.slice(3))
}

main()
