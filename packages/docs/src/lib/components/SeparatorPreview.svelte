<script lang="ts">
	import { Separator } from "@dxdns/feflow-svelte"

	const variants = ["dotted", "dashed", "solid"]
	const sizes = ["xs", "sm", "md", "lg", "xl"]
</script>

<div
	style="
    max-width: 300px; 
    margin: 3rem auto; 
    display: flex; 
    flex-direction: column; 
    gap: 1rem;
    "
>
	{#each sizes as size, i (i)}
		<Separator
			size={size as any}
			variant={i === 0 ? "solid" : i % 2 ? "dashed" : "dotted"}
		/>
	{/each}

	{#each variants as variant, i (i)}
		<Separator
			height="3rem"
			orientation="vertical"
			variant={variant as any}
			size={i === 0 ? "md" : i % 2 ? "lg" : "xl"}
		/>
	{/each}

	{#each ["start", "end", "center"] as value (value)}
		<div style="display: flex; gap: 0.5rem; align-items: baseline;">
			{#if value === "end" || value === "center"}
				<Separator style="flex: 1;" />
			{/if}
			<p style="flex-shrink: 0;">
				{value}
			</p>
			{#if value === "start" || value === "center"}
				<Separator style="flex: 1;" />
			{/if}
		</div>
	{/each}
</div>
