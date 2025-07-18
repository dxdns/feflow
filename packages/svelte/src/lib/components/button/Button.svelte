<script lang="ts">
	import type {
		HTMLAttributeAnchorTarget,
		HTMLButtonAttributes
	} from "svelte/elements"
	import { classMapUtil } from "@dxdns/feflow-core/utils"
	import type { ButtonType } from "@dxdns/feflow-core/types"
	import Spinner from "../spinner/index.js"
	import styles from "@dxdns/feflow-core/styles/Button.module.css"

	interface Props extends HTMLButtonAttributes, ButtonType {
		target?: HTMLAttributeAnchorTarget
	}

	let {
		class: className = "",
		pressedEffect = true,
		variant = "contained",
		isLoading = false,
		roundedFull = false,
		size = "sm",
		href,
		target = "_self",
		download,
		children,
		...rest
	}: Props = $props()

	function handleClick(
		event: MouseEvent & {
			currentTarget: EventTarget & HTMLButtonElement
		}
	) {
		if (download && href) {
			const a = document.createElement("a")
			a.href = href
			a.download = download
			document.body.appendChild(a)
			a.click()
			document.body.removeChild(a)
		} else if (href) {
			window.open(href, target)
		} else if (typeof rest?.onclick === "function") {
			rest.onclick(event)
		}
	}
</script>

<button
	{...rest}
	class={classMapUtil(
		className,
		[className, styles],
		[variant, styles],
		[size, styles],
		styles.button,
		{
			["roundedFull"]: roundedFull,
			[styles.pressedEffect]: pressedEffect
		}
	)}
	type={rest.type ?? "button"}
	onclick={handleClick}
>
	{#if isLoading}
		<Spinner />
	{:else}
		<div class={styles.content}>
			{@render children?.()}
		</div>
	{/if}
</button>
