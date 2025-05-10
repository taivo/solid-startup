import { AppBranding } from "~/components/app-shell/app-branding"
import { DemoLoginForm } from "../../../dev/__dangerous.auth-forms"

export default function LoginPage() {
	return (
		<div class="flex min-h-[75svh] flex-col items-center justify-center">
			<div class="flex w-full max-w-sm flex-col gap-6">
				<AppBranding class="text-muted-foreground" />
				<DemoLoginForm />
			</div>
		</div>
	)
}
