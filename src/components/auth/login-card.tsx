import { A } from "@solidjs/router"
import { type ComponentProps, Show, createSignal, splitProps } from "solid-js"
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card"
import { cn } from "~/lib/utils"
import EmailPasswordForm from "./emailpassword-form"
import MagicLinkForm from "./magiclink-form"

export function LoginForm(props: ComponentProps<"div"> & { magicLink?: boolean; emailPassword?: boolean }) {
	const [local, rest] = splitProps(props, ["class", "magicLink", "emailPassword"])

	const { magicLink = true, emailPassword = false } = local
	const callbackURL = "/dashboard" as const

	const [errorMsg, setErrorMsg] = createSignal("")
	const [successMsg, setSuccessMsg] = createSignal("")

	return (
		<div class={cn("flex flex-col gap-6", local.class)} {...rest}>
			<Card>
				<CardHeader class="text-center">
					<CardTitle class="text-xl">Login to your account</CardTitle>
				</CardHeader>

				<CardContent>
					<div class="flex flex-col gap-12">
						<Show when={emailPassword}>
							<EmailPasswordForm callbackUrl={callbackURL} setErrorMsg={setErrorMsg} setSuccessMsg={setSuccessMsg} />
						</Show>
						<Show when={magicLink}>
							<MagicLinkForm callbackUrl={callbackURL} setErrorMsg={setErrorMsg} setSuccessMsg={setSuccessMsg} />
						</Show>
					</div>
					<div>
						{errorMsg() ? <p class="text-sm text-red-500 pt-2">{errorMsg()}</p> : null}
						{successMsg() ? <p class="text-sm text-green-500 pt-2">{successMsg()}</p> : null}
					</div>
				</CardContent>
			</Card>
			<div class="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 [&_a]:hover:text-primary  ">
				By continuing, you agree to our <A href="/terms">Terms of Service</A> and <A href="/privacy">Privacy Policy</A>.
			</div>
		</div>
	)
}
