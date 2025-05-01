import { A, action, useSubmission } from "@solidjs/router"
import { type ComponentProps, createSignal, splitProps } from "solid-js"
import { IconSpinner } from "~/components/icons"
import { Button } from "~/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card"
import { Input } from "~/components/ui/input"
import { signIn } from "~/lib/auth-client"
import { cn } from "~/lib/utils"

export function LoginForm(props: ComponentProps<"div">) {
	const [local, rest] = splitProps(props, ["class"])

	let formRef!: HTMLFormElement
	const [errorMsg, setErrorMsg] = createSignal("")
	const [successMsg, setSuccessMsg] = createSignal("")

	const signInWithMagicLink = action(
		async (formData: FormData) => {
			const { error } = await signIn.magicLink({
				email: formData.get("email")?.toString() ?? "",
				callbackURL: "/dashboard",
			})

			if (error) {
				setErrorMsg(error?.message ?? error.statusText)
			} else {
				formRef.reset()
				setSuccessMsg(`Check ${formData.get("email")} for your magic link`)
			}
		},
		{
			name: "signInWithMagicLink",
		}
	)

	const submission = useSubmission(signInWithMagicLink)

	return (
		<div class={cn("flex flex-col gap-6", local.class)} {...rest}>
			<Card>
				<CardHeader class="text-center">
					<CardTitle class="text-xl">Login to your account</CardTitle>
				</CardHeader>

				<CardContent>
					<form action={signInWithMagicLink} method="post" ref={formRef}>
						<div class="flex flex-col gap-6">
							<Input id="email" name="email" type="email" placeholder="m@example.com" required />
							<Button type="submit" class="w-full relative" disabled={submission.pending}>
								Send magic link
								{submission.pending ? (
									<span class="absolute w-full px-2 place-items-end">
										<IconSpinner class="animate-spin text-muted-foreground" />
									</span>
								) : null}
							</Button>

							{errorMsg() ? <p class="text-sm text-red-500">{errorMsg()}</p> : null}
							{successMsg() ? <p class="text-sm text-green-500">{successMsg()}</p> : null}
						</div>
					</form>
				</CardContent>
			</Card>
			<div class="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 [&_a]:hover:text-primary  ">
				By continuing, you agree to our <A href="/terms">Terms of Service</A> and <A href="/privacy">Privacy Policy</A>.
			</div>
		</div>
	)
}
