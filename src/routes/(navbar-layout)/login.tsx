import { AppBranding } from "~/components/app-shell/app-branding"
import { LoginForm } from "~/components/auth/login-card"

export default function LoginPage() {
	return (
		<div class="flex min-h-[75svh] flex-col items-center justify-center">
			<div class="flex w-full max-w-sm flex-col gap-6">
				<AppBranding class="text-muted-foreground" />
				<LoginForm emailPassword magicLink />
			</div>
		</div>
	)
}

function __dangerousGetDemoUsers() {
	"use server"
	
}