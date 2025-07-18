import { AuthRequired, useBetterAuth } from "@nerdfolio/solid-better-auth"
import {
	IconBook,
	IconCheckList,
	IconDashboard,
	IconHome,
	IconListCheck,
	IconMathXPlusY,
	IconRocket,
	IconSparkes,
} from "@nerdfolio/ui-base-solid/icons"
import { SidebarLayout } from "@nerdfolio/ui-base-solid/layouts"
import {
	MenuAsSidebarGroupPrimary,
	MenuAsSidebarGroupSecondary,
	type NavMenu,
	NavMenus,
	UserSidebarMenu,
} from "@nerdfolio/ui-base-solid/nav-menu"
import { AA, useBreadcrumbs } from "@nerdfolio/ui-base-solid/solidstart"
import type { ParentProps } from "solid-js"
import { AppBranding } from "~/components/app-branding"

export default function ProtectedRoutesLayout(props: ParentProps) {
	const menus = [getPagesMenu(), getGuidesMenu(), getSecondaryMenu()]

	const { logout, sessionUser } = useBetterAuth()

	return (
		<AuthRequired>
			<SidebarLayout
				branding={<AppBranding />}
				userMenu={<UserSidebarMenu user={sessionUser} signOut={logout} />}
				menus={<NavMenus menus={menus} />}
				crumbs={useBreadcrumbs()}
			>
				{props.children}
			</SidebarLayout>
		</AuthRequired>
	)
}

function getPagesMenu() {
	const pagesMenu: NavMenu = {
		renderer: MenuAsSidebarGroupPrimary,
		linkComponent: AA,
		label: "Pages",
		items: [
			{
				label: "Dashboard",
				href: "/dashboard",
				icon: IconDashboard,
			},
			{
				label: "Counter",
				href: "/counter",
				icon: IconMathXPlusY,
			},
			{
				label: "Remult Todos",
				href: "/todos",
				icon: IconCheckList,
			},
		],
	}
	return pagesMenu
}

function getGuidesMenu() {
	return {
		renderer: MenuAsSidebarGroupPrimary,
		linkComponent: AA,
		label: "Guides",
		items: [
			{
				label: "SolidJS",
				href: "#",
				icon: IconSparkes,
				children: [
					{ label: "Getting started", href: "https://www.solidjs.com/guides/getting-started" },
					{ label: "Tutorial", href: "https://www.solidjs.com/tutorial/introduction_basics" },
					{ label: "Examples", href: "https://www.solidjs.com/examples" },
				],
			},
			{
				label: "Solid Start",
				href: "#",
				icon: IconRocket,
				children: [
					{ label: "Getting started", href: "https://docs.solidjs.com/solid-start/getting-started" },
					{ label: "Solid Router", href: "https://docs.solidjs.com/solid-router" },
				],
			},
		],
	} as NavMenu
}

function getSecondaryMenu() {
	return {
		renderer: MenuAsSidebarGroupSecondary,
		linkComponent: AA,
		rendererClass: "mt-auto",
		items: [
			{
				label: "Home",
				href: "/",
				icon: IconHome,
			},
			{
				label: "About",
				href: "/about",
				icon: IconBook,
			},
			{
				label: "Road map",
				href: "/roadmap",
				icon: IconListCheck,
			},
		],
	} as NavMenu
}
