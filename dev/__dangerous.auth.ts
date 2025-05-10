import type { magicLink } from "better-auth/plugins"
import { asc } from "drizzle-orm"
import db from "~/lib/db"
import { user } from "~schema/auth-schema"

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

export async function __dangerousDemoGetDemoUsers() {
	const demoUsers = await db.query.user.findMany({
		columns: { email: true },
		orderBy: [asc(user.createdAt)],
		limit: 3
	})

	console.log('DEMO USERS', demoUsers)
	return demoUsers
}