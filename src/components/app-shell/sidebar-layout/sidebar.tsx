import { type ComponentProps, For } from "solid-js"

import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from "~/components/ui/sidebar"
import { AppBranding } from "../app-branding"
import { primaryMenus, secondaryMenu } from "./sb-menu"
import { SidebarPrimaryGroup } from "./sb-primary-group"
import { SidebarSecondaryGroup } from "./sb-secondary-group"
import SidebarUserMenu from "./sb-user-menu"

export default function AppSidebar(props: ComponentProps<typeof Sidebar>) {
	return (
		<Sidebar variant="inset" {...props}>
			<SidebarHeader>
				<SidebarMenu>
					<SidebarMenuItem>
						<SidebarMenuButton size="lg" as={AppBranding} />
					</SidebarMenuItem>
				</SidebarMenu>
			</SidebarHeader>

			<SidebarContent>
				<For each={primaryMenus}>
					{(menu) => <SidebarPrimaryGroup items={menu.items} groupLabel={menu.groupLabel} />}
				</For>

				<SidebarSecondaryGroup items={secondaryMenu} class="mt-auto" />
			</SidebarContent>

			<SidebarFooter>
				<SidebarUserMenu />
			</SidebarFooter>
		</Sidebar>
	)
}
