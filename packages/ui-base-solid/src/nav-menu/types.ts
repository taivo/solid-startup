import type { ComponentProps, JSXElement } from "solid-js"
import type { Icon } from "../icons"
import type { AdaptedLink } from "../ui/link-adapter"

type NavMenuItemData = {
	label: string
	href?: string
	tooltip?: string
	icon?: Icon
	isActive?: boolean
	itemsLinkClass?: string
}

export type NavMenuItem = NavMenuItemData & {
	children?: NavMenuItem[]
}

export type NavMenu = {
	label?: string
	renderer: (props: ComponentProps<"div"> & { items: NavMenuItem[]; label?: string; linkClass?: string }) => JSXElement
	linkComponent: AdaptedLink

	rendererClass?: string
	linkClass?: string
	items: NavMenuItem[]
}
