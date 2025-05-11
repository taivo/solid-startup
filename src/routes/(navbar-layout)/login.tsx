import { createAsync } from "@solidjs/router"
import { For, Suspense } from "solid-js"
import { AppBranding } from "~/components/app-shell/app-branding"
import { LoginForm } from "~/components/auth/login-card"
import { __demoOnlyGetDemoUserCreds } from "~/lib/auth"

export default function LoginPage() {
	const demoCreds = createAsync(__demoOnlyGetDemoUserCreds)

	return (
		<div class="flex min-h-[75svh] flex-col items-center justify-center">
			<div class="flex w-full max-w-sm flex-col gap-6">
				<AppBranding class="text-muted-foreground" />
				<LoginForm emailPassword magicLink={false} />

				<Suspense>
					<div class="self-center text-muted-foreground">
						<For each={demoCreds()}>
							{({ email, demoPW }) => (
								<p>
									{email} / {demoPW}
								</p>
							)}
						</For>
					</div>
				</Suspense>
			</div>
		</div>
	)
}
