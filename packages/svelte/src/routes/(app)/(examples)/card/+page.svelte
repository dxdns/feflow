<script lang="ts">
	import { Card, HoverFollower } from "@/index.js"
</script>

<Card variant="contained">
	<h2>test1</h2>
</Card>
<br />
<Card href="https://dxdns.dev" target="_blank">
	<h2>link</h2>
</Card>
<br />
<Card glowOnHover>
	<h2>glow on hover</h2>
</Card>
<br />
<HoverFollower>
	<Card>
		<div>
			<h4>test</h4>
			<p>test</p>
		</div>
	</Card>
	<Card>
		<div>
			<h4>test</h4>
			<p>test</p>
		</div>
	</Card>
</HoverFollower>
<br />
<HoverFollower style="gap: 3rem;" orientation="horizontal" bgColor="green">
	{#each Array.from(Array(5)) as _, i (i)}
		<Card variant={i % 2 ? "contained" : "outlined"}>
			<div>
				<h4>test {i}</h4>
				<p>test {i}</p>
			</div>
		</Card>
	{/each}
</HoverFollower>
<br />
<Card animatedBorder>
	<h1>animated border</h1>
</Card>
<br />
<Card
	animatedBorder={{
		width: "2px",
		primaryColor: "green",
		secondaryColor: "red"
	}}
>
	<h1>animated border - custom colors</h1>
</Card>
