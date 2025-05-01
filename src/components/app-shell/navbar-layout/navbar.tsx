import { A } from "@solidjs/router"
import { NavigationMenu, NavigationMenuTrigger } from "~/components/ui/navigation-menu"
import { AppBranding } from "../app-branding"
import NavbarUserMenu from "./nb-user-menu"

export default function AppNavbar() {
	return (
		<div class="flex justify-between px-4 py-2 border-b">
			<AppBranding href="/" />
			<NavigationMenu>
				<NavigationMenuTrigger as={A} href="/about">
					About
				</NavigationMenuTrigger>
				<NavigationMenuTrigger as={A} href="/roadmap">
					Road map
				</NavigationMenuTrigger>
				<NavigationMenuTrigger as={A} href="/dashboard">
					Dashboard
				</NavigationMenuTrigger>
			</NavigationMenu>
			<NavigationMenu>
				<NavbarUserMenu />
			</NavigationMenu>
		</div>
	)
}
