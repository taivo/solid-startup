import { A } from "@solidjs/router"
import type { ComponentProps } from "solid-js"
import { For } from "solid-js"

import {
	SidebarGroup,
	SidebarGroupContent,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from "~/components/ui/sidebar"
import type { NavMenuItem } from "./sb-menu"

/*
Sidebar menu group with simpler items that has no subitem.
Rendered smaller to be a secondary menu, typically at the bottom of sidebar.
*/
export function SidebarSecondaryGroup(props: ComponentProps<typeof SidebarGroup> & { items: NavMenuItem[] }) {
	return (
		<SidebarGroup {...props}>
			<SidebarGroupContent>
				<SidebarMenu>
					<For each={props.items}>
						{(item) => (
							<SidebarMenuItem>
								<SidebarMenuButton as={A} href={item.url} size="sm">
									<item.icon />
									<span>{item.title}</span>
								</SidebarMenuButton>
							</SidebarMenuItem>
						)}
					</For>
				</SidebarMenu>
			</SidebarGroupContent>
		</SidebarGroup>
	)
}
