<script lang="ts">
	import type { Color, Distance } from "./types"
	import { calculate_euclidean_distance } from "./utils"
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

<button
	onclick={() => {
		if (color0 === null || color1 === null) return
		on_calculate(calculate_euclidean_distance(color0, color1))
	}}
	disabled={is_disabled}>Calculate</button
>
