<script lang="ts">
	import { Skeleton } from "@/index.js"
</script>

<Skeleton isLoading style="width: 200px; height: 200px;" />
<br />
<br />

<Skeleton isLoading style="width: 200px; height: 200px; border-radius: 100%;" />
<br />
<br />

{#each Array.from(Array(5)) as i (i)}
	<Skeleton isLoading variant="pulse" style="width: 500px; height: 16px;" />
	<br />
{/each}
