import type { ComponentProps } from "solid-js"
import AppFooter from "~/components/app-shell/app-footer"
import AppNavbar from "./navbar"

export default function NavbarLayout(props: ComponentProps<"div">) {
	return (
		<div>
			<AppNavbar />
			<div class="min-h-svh">{props.children}</div>
			<AppFooter class="border-t-1" />
		</div>
	)
}
