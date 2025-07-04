import * as Constants from "../constants.js"
import { themeConfigState } from "../states/index.js"
import type {
	ThemeModeType,
	ThemeConfigType,
	CustomThemeConfigType
} from "../types/index.js"
import themeModeUtil from "./themeModeUtil.js"

export default function themeConfigUtil() {
	function _toCssVar(key: string) {
		return `${Constants.CSS_VAR_PREFIX}-${key.replace(/([A-Z])/g, "-$1").toLowerCase()}`
	}

	function _generateCssVariables(key: string, value: string) {
		return `${_toCssVar(key)}: ${value};`
	}

	function _processThemeSection(vars: Record<string, any>, selectors: string) {
		const cssVars: string[] = []

		for (const [key, value] of Object.entries(vars)) {
			cssVars.push(_generateCssVariables(key, value))
		}

		return `<style>${selectors} {\n${cssVars.join("\n")}\n}</style>\n`
	}

	function themeConfigToCssString(theme?: ThemeConfigType) {
		if (!theme) return ""

		const sections: string[] = []

		const keys = Object.keys(theme) as (keyof typeof theme)[]
		for (const themeKey of keys) {
			const vars = theme[themeKey]
			const selector = Constants.themeModeSelectors[themeKey as ThemeModeType]
			if (selector && vars) {
				sections.push(_processThemeSection(vars, selector))
			}
		}

		return sections.join("")
	}

	return { themeConfigToCssString }
}

export function customThemeConfig(t: CustomThemeConfigType) {
	return t
}

export function themeConfig() {
	const themeConfig = themeConfigState()
	const { toggleThemeMode } = themeModeUtil()
	return {
		colors: themeConfig.getColors(),
		mode: themeConfig.getMode(),
		toggle: () => {
			toggleThemeMode((t) => {
				themeConfig.setThemeMode(t)
			})
		}
	}
}
