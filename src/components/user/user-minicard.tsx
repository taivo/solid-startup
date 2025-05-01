import type { User } from "better-auth"
import { cn } from "~/lib/utils"
import UserAvatar from "./user-avatar"

export default function UserMinicard(props: { user: User; class?: string }) {
	return (
		<div class={cn("flex items-center gap-2", props.class)}>
			<UserAvatar user={props.user} class="size-8 rounded-lg" />
			<div class="grid flex-1 text-left text-sm leading-tight">
				<span class="truncate font-semibold">{props.user.name}</span>
				<span class="truncate text-xs">{props.user.email}</span>
			</div>
		</div>
	)
}
