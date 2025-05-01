import { A } from "@solidjs/router"
import { type ComponentProps, splitProps } from "solid-js"
import { cn } from "~/lib/utils"
import AppSocials from "./app-socials"
import { copyrightStatement } from "./app-branding"

export default function AppFooter(props: ComponentProps<"footer">) {
	const [local, _rest] = splitProps(props, ["class"])

	return (
		<footer class={cn("max-w-screen px-4 py-10", local.class)}>
			<nav class="flex flex-wrap justify-center gap-10">
				<A href="/about" class="text-muted-foreground hover:brightness-130">
					About
				</A>

				<A href="/contact" class="text-muted-foreground hover:brightness-130">
					Contact
				</A>

				<A href="/terms" class="text-muted-foreground hover:brightness-130">
					Terms
				</A>

				<A href="/privacy" class="text-muted-foreground hover:brightness-130">
					Privacy Policy
				</A>
			</nav>

			<AppSocials
				class="flex flex-row gap-8 justify-center my-8"
				linkClass="text-muted-foreground brightness-80 hover:brightness-130"
			/>
			<p class="text-sm text-center text-muted-foreground">{copyrightStatement}</p>
		</footer>
	)
}
