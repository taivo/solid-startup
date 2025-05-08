import { useLocation, useNavigate } from "@solidjs/router"
import { magicLinkClient } from "better-auth/client/plugins"
import { createAuthClient } from "better-auth/solid"
export type { User, Session } from "better-auth"

const { signIn, signOut, useSession } = createAuthClient({
	plugins: [
		// https://www.better-auth.com/docs/plugins/magic-link
		magicLinkClient(),
	],
})

export { signIn }

export function useAuth() {
	const session = useSession()
	const { data, ...statusProps } = session()

	return { ...data, ...statusProps }
}

export function useSignOut(redirectUrl = "/") {
	// This has to be a hook because solidjs needs useNavigate to
	// be called within a route.
	//
	const navigate = useNavigate()
	const location = useLocation()

	return async function out() {
		await signOut({
			fetchOptions: {
				onSuccess() {
					navigate(redirectUrl)

					// 4/30/2025: solid-router may have a bug. After the navigation above is already complete,
					// the dashboard page and its route-guard still attemps to render and kicks start the navigation
					// fallback that goes to /login, even though we've already navigated to "/" (redirectUrl).
					// Same situation occurs when we try this with action + onComplete + useAction.
					//
					// Hack: after a quick delay, attempt to re-navigate again if location !== redirectUrl
					//
					// Another way to avoid the forced renavigation is goto /logout instead of calling signOut/useSignout
					// directly so that routeguards aren't even part of the picture
					setTimeout(() => {
						if (location.pathname !== redirectUrl)
							navigate(redirectUrl)
					}, 30)
				},
			},
		})
	}
}
