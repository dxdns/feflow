<script lang="ts">
	import type { SVGAttributes } from "svelte/elements"
	import { closeIcon } from "@dxdns/feflow-core/icons"
	import { mergeStyleUtil } from "@dxdns/feflow-core/utils"

	interface Props extends SVGAttributes<SVGSVGElement> {}

	let {
		class: className = "",
		width = "24px",
		height = "24px",
		fill = "currentColor",
		viewBox = "0 -960 960 960",
		...rest
	}: Props = $props()
</script>

<svg
	{...rest}
	class={className}
	style={mergeStyleUtil(
		"display: inline-block; vertical-align: middle;",
		rest.style
	)}
	{width}
	{height}
	{fill}
	{viewBox}
>
	<path d={closeIcon}></path>
</svg>
