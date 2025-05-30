import { Separator } from "ui-solid/ui/separator"
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarHeader,
	SidebarInset,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarProvider,
	SidebarTrigger,
} from "ui-solid/ui/sidebar"
import type { JSXElement, ParentProps } from "solid-js"
import type { ComponentProps } from "solid-js"
import Breadcrumbs from "./breadcrumbs"

export default function SidebarLayout(props: ParentProps) {
	return <SidebarProvider>{props.children}</SidebarProvider>
}

SidebarLayout.Sidebar = function SB(
	props: ComponentProps<typeof Sidebar> & {
		Branding: JSXElement
		UserMenu: JSXElement
		Menus: JSXElement
	}
) {
	return (
		<Sidebar variant="inset" {...props}>
			<SidebarHeader>
				<SidebarMenu>
					<SidebarMenuItem>
						<SidebarMenuButton size="lg" as={props.Branding} />
					</SidebarMenuItem>
				</SidebarMenu>
			</SidebarHeader>

			<SidebarContent>{props.Menus}</SidebarContent>
			<SidebarFooter>{props.UserMenu}</SidebarFooter>
		</Sidebar>
	)
}

SidebarLayout.ContentArea = (props: ComponentProps<typeof SidebarInset>) => {
	return (
		<SidebarInset>
			<header class="flex h-16 shrink-0 items-center gap-2">
				<div class="flex items-center gap-2 px-4">
					<SidebarTrigger class="-ml-1" />
					<Separator orientation="vertical" class="mr-2 data-[orientation=vertical]:h-4" />
					<Breadcrumbs />
				</div>
			</header>
			{props.children}
		</SidebarInset>
	)
}
