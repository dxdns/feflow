import type { BreakpointThemeConfigType } from "./breakpoint.types.js"

export type ThemeModeType = "dark" | "light"

export type ThemeColorType = {
	primary: string
	onPrimary: string
	secondary: string
	onSecondary: string
	muted: string
	bg: string
	onBg: string
	surface: string
	onSurface: string
	border: string
	disabled: string
	onDisabled: string
	skeleton: string
	onSkeleton: string
	success: string
	onSuccess: string
	error: string
	onError: string
	warning: string
	onWarning: string
	info: string
	onInfo: string
	overlay: string
	shadow: string
}

export type ThemeConfigType = {
	colors?: {
		light?: Partial<ThemeColorType>
		dark?: Partial<ThemeColorType>
	}
	breakpoints?: Partial<BreakpointThemeConfigType>
}

export type ThemeConfigUtilType = {
	colors: ThemeColorType
	mode: ThemeModeType
	toggle: () => void
}
