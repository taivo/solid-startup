//
// Define icons used within this app for both consistency and flexibility if we need to swith icon library
// Go to https://icon-sets.iconify.design/ or https://icones.js.org/ to see lists of available icons
//

//
// NOTE: these ~icons paths are virtual and auto-resolved by unplugin-icons/vite.
// The plugin downloads the icons we use and only bundle those.
// The ~icon/ paths don't actually exist in this app repo. See app.config.ts
//

//
// tabler icons
//
export { default as IconLogout } from "~icons/tabler/logout"
export { default as IconSpinner } from "~icons/tabler/loader-3"
export { default as IconChevronRight } from "~icons/tabler/chevron-right"
export { default as IconExternalLink } from "~icons/tabler/external-link"
export { default as IconListCheck } from "~icons/tabler/list-check"
export { default as IconCheckList } from "~icons/tabler/checklist"
export { default as IconTerminal } from "~icons/tabler/terminal-2"
export { default as IconWWW } from "~icons/tabler/world-www"
export { default as IconBook } from "~icons/tabler/book"
export { default as IconCreditCard } from "~icons/tabler/credit-card"
export { default as IconSparkes } from "~icons/tabler/sparkles"
export { default as IconBell } from "~icons/tabler/bell"
export { default as IconHome } from "~icons/tabler/home"
export { default as IconMail } from "~icons/tabler/mail"
export { default as IconSearch } from "~icons/tabler/search"
export { default as IconSettings } from "~icons/tabler/settings"
export { default as IconCalendar } from "~icons/tabler/calendar"
export { default as IconRocket } from "~icons/tabler/rocket"
export { default as IconDashboard } from "~icons/tabler/dashboard"
export { default as IconMathXPlusY } from "~icons/tabler/math-x-plus-y"

//
// brand icons
//
export { default as IconGithub } from "~icons/tabler/brand-github"
export { default as IconBluesky } from "~icons/tabler/brand-bluesky"
export { default as IconX } from "~icons/tabler/brand-x"
export { default as IconSolidjs } from "~icons/tabler/brand-solidjs"

//
// lucide icons
//
export { default as IconBadgeCheck } from "~icons/lucide/badge-check"
export { default as IconChevronsUpDown } from "~icons/lucide/chevrons-up-down"

import type anyIcon from "~icons/tabler/external-link"
export type Icon = typeof anyIcon
