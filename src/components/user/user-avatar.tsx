import { type ComponentProps, splitProps } from "solid-js"
import type { User } from "~/lib/auth-client"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"

function getAvatarFallback(user: User) {
	return (user.name || user.email).slice(0, 2)
}

export default function UserAvatar(props: { user: User } & ComponentProps<typeof Avatar>) {
	const [local, rest] = splitProps(props, ["user"])
	return (
		<Avatar {...rest}>
			<AvatarImage src={local.user?.image ?? ""} alt="user avatar" />
			<AvatarFallback class="uppercase">{getAvatarFallback(local?.user)}</AvatarFallback>
		</Avatar>
	)
}
