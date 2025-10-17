<script lang="ts">
	import Tooltip from "$components/Tooltip.svelte"
	import type { Color, Distance } from "$lib/types"
	import { calculate_euclidean_distance } from "$lib/utils"
	const {
		color0,
		color1,
		on_calculate,
	}: {
		color0: Color | null
		color1: Color | null
		on_calculate: (distance: Distance) => void
	} = $props()

	const is_disabled = $derived(color0 === null || color1 === null)
</script>

<Tooltip enabled={is_disabled} text="You need to pick your colors first">
	<button
		ontouchstart={() => {}}
		onclick={() => {
			if (color0 === null || color1 === null) return
			on_calculate(calculate_euclidean_distance(color0, color1))
		}}
		disabled={is_disabled}>Calculate</button
	>
</Tooltip>

<style>
	button {
		width: 100%;
	}
</style>
