import * as Constants from "../constants.js"
import type {
	ThemeModeType,
	ThemeConfigType,
	BreakpointType
} from "../types/index.js"
import mergeObjectUtil from "./mergeObjectUtil.js"

function createMetaElement() {
	const meta = document.createElement("meta")
	meta.name = Constants.META_NAME
	meta.content = Constants.APP_NAME
	return meta
}

function themeMode() {
	function applyThemeMode(mode: ThemeModeType) {
		document.documentElement.style.colorScheme = mode
		document.documentElement.setAttribute(Constants.THEME_ATTR, mode)
		localStorage.setItem(Constants.THEME_STORAGE, mode)
		return mode
	}

	function storedTheme(defaultMode?: ThemeModeType) {
		const stored = localStorage.getItem(Constants.THEME_STORAGE)
		const attr = document.documentElement.getAttribute(Constants.THEME_ATTR)

		if (stored) return stored as ThemeModeType
		if (attr) return attr as ThemeModeType

		const prefersDark = window.matchMedia?.(
			"(prefers-color-scheme: dark)"
		).matches
		if (prefersDark) return "dark"

		return defaultMode as ThemeModeType
	}

	function toggleThemeMode(onChange?: ((mode: ThemeModeType) => void) | Event) {
		const nextThemeMode = storedTheme() === "light" ? "dark" : "light"
		applyThemeMode(nextThemeMode)

		if (onChange && typeof onChange === "function") {
			onChange?.(nextThemeMode)
		}
		return nextThemeMode
	}

	return { applyThemeMode, storedTheme, toggleThemeMode }
}

function cssUtil() {
	function toCssVar(key: string): string {
		return `${Constants.CSS_VAR_PREFIX}-${key.replace(/([A-Z])/g, "-$1").toLowerCase()}`
	}

	function toCssDeclaration(key: string, value: string): string {
		return `\t${toCssVar(key)}: ${value};`
	}

	function createBlock(selector: string, declaration: string[]): string {
		return `${selector} {\n${declaration.join("\n")}\n}`
	}

	return { toCssDeclaration, createBlock }
}

function themeString() {
	const { toCssDeclaration, createBlock } = cssUtil()

	function themeCssString(theme?: ThemeConfigType): string {
		if (!theme) return ""

		return Object.entries(theme)
			.map(([mode, vars]) => {
				const selector = Constants.themeModeSelectors[mode as ThemeModeType]
				const declarations = Object.entries(vars).map(([k, v]) =>
					toCssDeclaration(k, v)
				)
				return createBlock(selector, declarations)
			})
			.join("\n\n")
	}

	function breakpointCssString(
		breakpoints?: Record<BreakpointType, string>
	): string {
		if (!breakpoints) return ""

		const declarations = Object.entries(breakpoints).map(([k, v]) =>
			toCssDeclaration(k, v)
		)

		return createBlock(":root", declarations)
	}

	return { themeCssString, breakpointCssString }
}

export function providerUtil() {
	function script(defaultThemeMode: ThemeModeType) {
		return `
		<script id="${Constants.APP_NAME}-script">
			(function () {
				const fallbackTheme = "${defaultThemeMode}";
				const storedTheme = localStorage.getItem("${Constants.THEME_STORAGE}");
				const prefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
				const theme = storedTheme || (prefersDark ? "dark" : fallbackTheme);
				
				document.documentElement.setAttribute("${Constants.THEME_ATTR}", theme);
				document.documentElement.style.colorScheme = storedTheme;
			})()
		</script>
		`
	}

	function style(theme: ThemeConfigType | undefined, ...styles: string[]) {
		const { themeCssString, breakpointCssString } = themeString()

		const themeStyle = themeCssString(
			mergeObjectUtil(
				Constants.themeColors,
				theme?.colors || {}
			) as ThemeConfigType
		)

		const breakpointStyle = breakpointCssString(
			mergeObjectUtil(
				Constants.breakpoints,
				theme?.breakpoints || {}
			) as Record<BreakpointType, string>
		)

		return `
		<style id="${Constants.APP_NAME}-style">
			${themeStyle}
			${breakpointStyle}
			${styles.join("\n")}
		</style>
		`
	}

	return {
		...themeMode(),
		script,
		style,
		createMetaElement
	}
}

/** @deprecated Use `createTheme` instead */
export function customThemeConfig(t: ThemeConfigType) {
	return t
}

export function createTheme(t: ThemeConfigType) {
	return t
}
