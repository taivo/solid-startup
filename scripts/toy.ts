//export const options = [new Option("-t --test-option <test>", "test option").default("zzz")]

export const options = {
	"-a --alpha": {
		description: "alpha option",
		default: "a",
	},
}

export default function (opts) {
	//console.log("opts passed to script", opts)
	console.log("args for toy script:", opts)
	console.log("running toy script... done")
}
