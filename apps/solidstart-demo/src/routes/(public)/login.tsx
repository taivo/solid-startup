import { LoginCard } from "@nerdfolio/solid-better-auth"
import { GuestListForm } from "@nerdfolio/solid-better-auth/forms"
import { A } from "@solidjs/router"
import { AppBranding } from "~/components/app-branding"

export default function LoginPage() {
	const footer = (
		<div>
			By continuing, you agree to our <A href="/terms">Terms of Service</A> and&nbsp;
			<A href="/privacy">Privacy Policy</A>.
		</div>
	)

	return (
		<div class="flex min-h-[75svh] flex-col items-center justify-center">
			<div class="flex w-full max-w-sm flex-col gap-6">
				<AppBranding class="text-muted-foreground" />
				<LoginCard footer={footer}>
					<GuestListForm />
				</LoginCard>
			</div>
		</div>
	)
}
