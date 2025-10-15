<script lang="ts">
	import type { Calculation } from "./types"
	import { color_to_hex } from "./utils"
	let { calculations }: { calculations: Calculation[] } = $props()
</script>

<ul>
	{#each calculations as calculation}
		<li class="card">
			<div class="color-container">
				<div class="color" style="background-color: {color_to_hex(calculation.color0)}"></div>
				<div class="color" style="background-color: {color_to_hex(calculation.color1)}"></div>
				<span>HEX {color_to_hex(calculation.color0)} | {color_to_hex(calculation.color1)}</span>
			</div>
			<div class="distance">
				{calculation.distance}
			</div>
		</li>
	{/each}
</ul>

<style>
	ul {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}
	li {
		background-color: var(--white-100);
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.color-container {
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		gap: 0.5rem;

		& .color {
			border: 2px solid black;
			border-radius: calc(var(--card-radius) / 2);
			width: 2rem;
			aspect-ratio: 1;
		}
	}

	.distance {
		font-weight: bold;
		font-size: 1.5rem;
	}
</style>
