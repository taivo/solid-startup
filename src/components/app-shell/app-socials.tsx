import { type ComponentProps, splitProps } from "solid-js"
import { cn } from "~/lib/utils"
import { IconBluesky, IconGithub, IconX } from "../icons"

export const socialLinks = {
	github: "https://github.com/solidjs/solid-start",
	bluesky: "https://bsky.app/profile/solidjs.com",
	x: "https://x.com/solid_js",
}

export default function AppSocials(props: ComponentProps<"div"> & { linkClass?: string }) {
	const [local, _rest] = splitProps(props, ["class", "linkClass"])

	return (
		<div class={cn("flex flex-row gap-8", local.class)}>
			<a href={socialLinks.x} class={local.linkClass} target="_blank" rel="noreferrer">
				<span class="sr-only">Twitter</span>
				<IconX />
			</a>
			<a href={socialLinks.bluesky} class={local.linkClass} target="_blank" rel="noreferrer">
				<span class="sr-only">Bluesky</span>
				<IconBluesky />
			</a>
			<a href={socialLinks.github} class={local.linkClass} target="_blank" rel="noreferrer">
				<span class="sr-only">GitHub</span>
				<IconGithub />
			</a>
		</div>
	)
}
