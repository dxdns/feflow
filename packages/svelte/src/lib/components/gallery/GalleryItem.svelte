<script lang="ts">
	import type { HTMLImgAttributes } from "svelte/elements"
	import { Image } from "../image/index.js"
	import { classMapUtil, handleClickUtil } from "@dxdns/feflow-core/utils"
	import type { HTMLAttrAnchor } from "@dxdns/feflow-core/types"
	import styles from "./GalleryItem.module.css"

	interface Props extends Omit<HTMLImgAttributes, "src">, HTMLAttrAnchor {
		lazy?: boolean
		dataSrc: string
		caption?: {
			title: string
			description: string
		}
		fallback?: string
	}

	let {
		class: className = "",
		lazy = false,
		dataSrc,
		caption,
		fallback,
		href,
		target = "_self",
		download,
		...rest
	}: Props = $props()
</script>

<figure
	class={classMapUtil(className, [styles, className], styles.galleryItem)}
>
	<Image
		{...rest}
		class={styles.image}
		hover={{ transition: "scale" }}
		{lazy}
		{dataSrc}
		{fallback}
		onclick={(e) => {
			handleClickUtil({
				href,
				download,
				target,
				onClick: () => {
					rest.onclick?.(e)
				}
			})
		}}
	/>
	{#if caption}
		<figcaption class={styles.caption}>
			<h3>{caption.title}</h3>
			<p>{caption.description}</p>
		</figcaption>
	{/if}
</figure>
