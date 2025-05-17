type OptionExtra<T = string> = {
	description: string
	default?: T
	required?: boolean
	coerce?: (v: string, previous: string) => T
}
export type CliOptions = {
	[spec: string]: OptionExtra
}