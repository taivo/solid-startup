import type { ComponentProps } from "solid-js"
import { cn } from "~/lib/utils"
import { IconSolidjs } from "../icons"

export const appName = "SolidStartup" as const
export const appLegalName = "SolidStartup, Inc." as const
export const copyrightStatement = `© 2025 ${appLegalName}. All rights reserved.` as const
export const appVersion = __APP_VERSION__

export function AppName(props: ComponentProps<"span">) {
	return <span {...props}>{appName}</span>
}

export function AppLogo(props: { class?: string; noBackground?: boolean }) {
	const appIcon = <IconSolidjs class="size-full text-blue-500" />

	if (props.noBackground) return appIcon

	return (
		<div
			class={cn("flex size-8 items-center justify-center rounded-md bg-primary text-primary-foreground", props.class)}
		>
			{appIcon}
		</div>
	)
}

export function AppBranding(props: { class?: string; href?: string }) {
	const wrapClass = cn("flex items-center gap-2 self-center font-medium", props.class)

	return props.href ? (
		<a href={props.href} class={wrapClass}>
			<AppLogo />
			<AppName />
		</a>
	) : (
		<div class={wrapClass}>
			<AppLogo />
			<AppName />
		</div>
	)
}
