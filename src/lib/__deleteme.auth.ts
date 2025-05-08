import type { magicLink } from "better-auth/plugins"

type SendMagicLinkFn = Parameters<typeof magicLink>[0]["sendMagicLink"]
export const __dangerousDemoMockSendMagicLink: SendMagicLinkFn = async ({ email, url }, _request) => {
	"use server"
	// NOTE: This mock function is to simplify the project template demo only.
	// Do not use it for your project
	//
	console.warn("For demo only. Do not use in real project.", email, url)
}

export function __dangerousDemoMockGenerateToken(email: string) {
	// NOTE: This mock function is to simplify the project template demo only.
	// Do not use it for your project
	return email.replace("@", "_AT_").replace(".", "_DOT_")
}

export function __dangerousDemoCreateFakeMagicLink(email: string, callbackUrl = "/dashboard") {
	// NOTE: This mock function is to simplify the project template demo only.
	// Do not use it for your project.
	//
	const siteRoot = "http://localhost:3000"
	const token = __dangerousDemoMockGenerateToken(email)
	return `${siteRoot}/api/auth/magic-link/verify?token=${token}&callbackURL=${callbackUrl}`
}
