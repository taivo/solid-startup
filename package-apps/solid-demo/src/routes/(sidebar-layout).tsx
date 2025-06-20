import type { Accessor, ParentProps } from "solid-js"
import {
	IconBook,
	IconDashboard,
	IconHome,
	IconListCheck,
	IconMathXPlusY,
	IconRocket,
	IconSparkes,
} from "ui-base-solid/icons"
import { SidebarLayout } from "ui-base-solid/layouts"
import {
	MenuAsSidebarGroupPrimary,
	MenuAsSidebarGroupSecondary,
	type NavMenu,
	NavMenus,
	UserSidebarMenu,
} from "ui-base-solid/nav-menu"
import AA from "ui-base-solid/solidstart/aa"
import type { AvatarUser } from "ui-base-solid/ui/user-avatar"
import { AuthRequired } from "ui-better-auth/solidstart"
import { AppBranding } from "~/components/app-branding"
import { authClient } from "~/lib/clients"

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
	],
}

const guidesMenu: NavMenu = {
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
}

const secondaryMenu: NavMenu = {
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
}

export default function ProtectedSidebarLayout(props: ParentProps) {
	const menus = [pagesMenu, guidesMenu, secondaryMenu]

	const s = authClient.useSession()
	const user: Accessor<AvatarUser | undefined> = () => s().data?.user

	return (
		<AuthRequired authClient={authClient}>
			<SidebarLayout>
				<SidebarLayout.Sidebar
					Branding={<AppBranding />}
					UserMenu={<UserSidebarMenu user={user} signOut={authClient.signOut} />}
					Menus={<NavMenus menus={menus} />}
				/>
				<SidebarLayout.ContentArea>{props.children}</SidebarLayout.ContentArea>
			</SidebarLayout>
		</AuthRequired>
	)
}
