<script lang="ts">
	import type { Snippet } from "svelte"
	import type { HTMLAttributes } from "svelte/elements"
	import classMapUtil from "../../utils/classMapUtil.js"
	import styles from "./Drawer.module.css"
	import type { PositionTypeNoCenter } from "../../types/index.js"
	import { mergeStyleUtil } from "../../utils/index.js"

	interface Props extends HTMLAttributes<HTMLDivElement> {
		isOpen: boolean
		positionStyle?: "relative" | "absolute" | "fixed"
		position?: PositionTypeNoCenter
		handleClose?: () => void
		header?: Snippet<[]>
		content: Snippet<[]>
	}

	let {
		class: className = "",
		isOpen = false,
		positionStyle = "fixed",
		position = "left",
		handleClose,
		header,
		content,
		...rest
	}: Props = $props()
</script>

{#if isOpen}
	<button
		aria-labelledby="overlay"
		aria-label="Close overlay"
		class={styles.overlay}
		onclick={handleClose}
		style="
		--position-style: {positionStyle === 'relative' ? 'absolute' : positionStyle};
			"
	>
	</button>
{/if}

<div
	{...rest}
	class={classMapUtil(
		className,
		[className, styles],
		styles.drawer,
		[position, styles],
		[positionStyle, styles],
		{
			[styles.show]: isOpen
		}
	)}
	style={mergeStyleUtil(`--position-style: ${positionStyle};`, rest.style)}
>
	{@render header?.()}
	<div class={styles.content}>
		{@render content()}
	</div>
</div>
