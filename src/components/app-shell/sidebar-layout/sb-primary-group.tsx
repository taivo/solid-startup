"use client"
import { A } from "@solidjs/router"
import { type ComponentProps, For, Show } from "solid-js"
import { IconChevronRight } from "~/components/icons"
import SmartLink from "~/components/ui/smart-link"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "~/components/ui/collapsible"
import {
	SidebarGroup,
	SidebarGroupLabel,
	SidebarMenu,
	SidebarMenuAction,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarMenuSub,
	SidebarMenuSubButton,
	SidebarMenuSubItem,
} from "~/components/ui/sidebar"
import type { NavMenuItem } from "./sb-menu"

export function SidebarPrimaryGroup(
	props: {
		groupLabel: string
		items: NavMenuItem[]
	} & ComponentProps<typeof SidebarGroup>
) {
	return (
		<SidebarGroup {...props}>
			<SidebarGroupLabel>{props.groupLabel}</SidebarGroupLabel>
			<SidebarMenu>
				<For each={props.items}>
					{(item) => (
						<SidebarMenuItem>
							<Show
								when={item.items?.length}
								fallback={
									<SidebarMenuButton as={A} href={item.url}>
										<item.icon />
										<span>{item.title}</span>
									</SidebarMenuButton>
								}
							>
								<Collapsible defaultOpen={item.isActive}>
									<SidebarMenuButton as={CollapsibleTrigger}>
										<item.icon />
										<span>{item.title}</span>
									</SidebarMenuButton>
									<SidebarMenuAction as={CollapsibleTrigger} class="data-expanded:rotate-90">
										<IconChevronRight />
										<span class="sr-only">Open submenu</span>
									</SidebarMenuAction>

									<CollapsibleContent>
										<SidebarMenuSub>
											<For each={item.items} fallback={<div>Loading submenu...</div>}>
												{(subItem) => (
													<SidebarMenuSubItem>
														<SidebarMenuSubButton as={SmartLink} href={subItem.url} markExternalLink>
															<span>{subItem.title}</span>
														</SidebarMenuSubButton>
													</SidebarMenuSubItem>
												)}
											</For>
										</SidebarMenuSub>
									</CollapsibleContent>
								</Collapsible>
							</Show>
						</SidebarMenuItem>
					)}
				</For>
			</SidebarMenu>
		</SidebarGroup>
	)
}
