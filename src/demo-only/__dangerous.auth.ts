export function __dangerousMockGenerateToken(email: string) {
	// NOTE: This mock function is to simplify the project template demo only.
	// Do not use it for your project
	return email.replace("@", "_AT_").replace(".", "_DOT_")
}

export function __dangerousCreateFakeMagicLink(email: string, callbackUrl = "/dashboard") {
	"user server"
	// NOTE: This mock function is to simplify the project template demo only.
	// Do not use it for your project.
	//
	const siteRoot = "http://localhost:3000"
	const token = __dangerousMockGenerateToken(email)
	return `${siteRoot}/api/auth/magic-link/verify?token=${token}&callbackURL=${callbackUrl}`
}
