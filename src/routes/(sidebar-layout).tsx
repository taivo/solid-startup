import type { ParentProps } from "solid-js"
import SidebarLayout from "~/components/app-shell/sidebar-layout"
import AuthRequired from "~/components/auth/auth-required"

export default function ProtectedSidebarLayout(props: ParentProps) {
	return (
		<AuthRequired>
			<SidebarLayout>{props.children}</SidebarLayout>
		</AuthRequired>
	)
}
