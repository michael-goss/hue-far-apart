<script lang="ts">
	// import svelteLogo from "./assets/svelte.svg";
	// import viteLogo from "/vite.svg";
	import { createSessionStore } from "./lib/sessionStore.svelte"
	import CalculateButton from "./lib/CalculateButton.svelte"
	import ColorPicker from "./lib/ColorPicker.svelte"
	import DistanceResult from "./lib/DistanceResult.svelte"
	import History from "./lib/History.svelte"
	import { round_number } from "./lib/utils"
	import type { Calculation, Color, Distance } from "./lib/types"
	import Headline from "./lib/Headline.svelte"

	let color0: Color | null = $state(null)
	let color1: Color | null = $state(null)
	let distance: Distance = $state(null)
	const old_calculations = createSessionStore<Calculation[]>("hue_far_apart_history", [])
	$inspect(old_calculations)

	const on_calculate = (new_distance: Distance) => {
		if (new_distance !== null && color0 !== null && color1 !== null) {
			distance = new_distance
			const last_calculation = old_calculations.value[0]
			if (
				round_number(last_calculation?.distance ?? 0) !== round_number(new_distance) ||
				last_calculation?.color0 !== color0 ||
				last_calculation?.color1 !== color1
			) {
				old_calculations.value = [
					{ distance: round_number(new_distance), color0, color1 },
					...old_calculations.value,
				]
			}
		}
	}
</script>

<main>
	<h1>Hue Far Apart</h1>
	<section class="card">
		<Headline index={1} title="Select your colors" />
		<div class="color-pickers">
			<ColorPicker
				color={color0}
				on_color_change={(new_color: Color) => (color0 = new_color)}
				index={0}
			/>
			<ColorPicker
				color={color1}
				on_color_change={(new_color: Color) => (color1 = new_color)}
				index={1}
			/>
		</div>
	</section>
	<section class="card flex-card darker-card">
		<Headline index={2} title="Calculate the distance" />
		<CalculateButton {color0} {color1} {on_calculate} />
		<DistanceResult {distance} />
	</section>
	{#if old_calculations.value.length}
		<section class="card flex-card even-darker-card">
			<Headline index={3} title="History" />
			<History calculations={old_calculations.value} />
		</section>
	{/if}
</main>

<style>
	main {
		padding: 0.5rem;
	}

	h1 {
		font-size: 3rem;
		text-align: center;
	}

	section {
		background-color: var(--white-100);
		margin-top: 1.5rem;
	}

	h2 {
		font-size: 1rem;
		text-align: center;
	}

	.color-pickers {
		margin-top: 1rem;
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: stretch;
		gap: 1rem;
	}

	.flex-card {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.darker-card {
		background-color: var(--grey-500);
	}

	.even-darker-card {
		background-color: var(--grey-600);
	}
</style>
