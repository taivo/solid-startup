import type { ParentProps } from "solid-js"
import Breadcrumbs from "~/components/app-shell/breadcrumbs"
import { Separator } from "~/components/ui/separator"
import { SidebarInset, SidebarProvider, SidebarTrigger } from "~/components/ui/sidebar"
import AppSidebar from "./sidebar"

export default function SidebarLayout(props: ParentProps) {
	return (
		<SidebarProvider>
			<AppSidebar />
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
		</SidebarProvider>
	)
}
