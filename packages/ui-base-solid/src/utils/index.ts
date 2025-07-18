import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export * from "./init-dark-mode"
export * from "./wrap-link"

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs))
}

export function sleep(ms: number) {
	return new Promise((resolve) => setTimeout(resolve, ms))
}
