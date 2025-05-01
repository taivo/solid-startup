import { cn } from "~/lib/utils"
import { IconSpinner } from "../icons"

export default function Spinner(props: { class?: string }) {
	return <IconSpinner class={cn("animate-spin text-muted-foreground", props.class)} />
}
