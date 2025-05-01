import { type Icon, IconBook, IconDashboard, IconHome, IconListCheck, IconMathXPlusY, IconRocket, IconSparkes } from "~/components/icons"

type NavMenuSubItem = {
	title: string
	url: string
}

export type NavMenuItem = {
	title: string
	url: string
	icon: Icon
	isActive?: boolean
	items?: NavMenuSubItem[]
}

export type MenuGroup = {
	groupLabel: string
	items: NavMenuItem[]
}

export const primaryMenus: MenuGroup[] = [
	{
		groupLabel: "Pages",
		items: [
			{
				title: "Dashboard",
				url: "/dashboard",
				icon: IconDashboard,
				isActive: true,
			},
			{
				title: "Counter",
				url: "/counter",
				icon: IconMathXPlusY,
			},
		],
	},
	{
		groupLabel: "Guides",
		items: [
			{
				title: "SolidJS",
				url: "#",
				icon: IconSparkes,
				items: [
					{ title: "Getting started", url: "https://www.solidjs.com/guides/getting-started" },
					{ title: "Tutorial", url: "https://www.solidjs.com/tutorial/introduction_basics" },
					{ title: "Examples", url: "https://www.solidjs.com/examples" },
				],
			},
			{
				title: "Solid Start",
				url: "#",
				icon: IconRocket,
				items: [
					{ title: "Getting started", url: "https://docs.solidjs.com/solid-start/getting-started" },
					{ title: "Solid Router", url: "https://docs.solidjs.com/solid-router" },
				],
			},
		],
	},
]

export const secondaryMenu: NavMenuItem[] = [
	// flat menu items at the bottom of sidebar
	{
		title: "Home",
		url: "/",
		icon: IconHome,
	},
	{
		title: "About",
		url: "/about",
		icon: IconBook,
	},
	{
		title: "Road map",
		url: "/roadmap",
		icon: IconListCheck,
	},
]
