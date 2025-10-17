<script lang="ts">
	import mg_logo from "./assets/logo.svg"
	import hue_far_apart_logo from "./assets/hue-far-apart.svg"
	import github_logo from "./assets/github.svg"

	import CalculateButton from "./lib/CalculateButton.svelte"
	import ColorPicker from "./lib/ColorPicker.svelte"
	import DistanceResult from "./lib/DistanceResult.svelte"
	import History from "./lib/History.svelte"
	import Headline from "./lib/Headline.svelte"
	import EyeDropperInfo from "./lib/EyeDropperInfo.svelte"

	import { round_number } from "./lib/utils"
	import { create_local_store, clear_local_store } from "./lib/localStore.svelte"
	import type { Calculation, Color, Distance } from "./lib/types"

	let color0: Color | null = $state(null)
	let color1: Color | null = $state(null)
	let distance: Distance = $state(null)
	const store_key = "hue_far_apart_history"
	const old_calculations = create_local_store<Calculation[]>(store_key, [])

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

	const on_clear_store = () => {
		clear_local_store(store_key)
		old_calculations.value = []
	}
</script>

<main>
	<h1><img src={hue_far_apart_logo} alt="Hue Far Apart" /></h1>
	<h2>Calculate how far apart two colors really are</h2>
	<a href="https://www.michaelgoss.de" target="_blank" rel="noopener noreferrer">
		<span>created by</span><img src={mg_logo} alt="Logo michaelgoss.de" />
	</a>
	<EyeDropperInfo />
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
			<div class="history-headline">
				<Headline index={3} title="History" />
				<button onclick={on_clear_store} ontouchstart={() => {}}>Clear History</button>
			</div>
			<History calculations={old_calculations.value} />
		</section>
	{/if}
	<section class="card black-card">
		<h2>Inspired by Distractible</h2>
		<p>
			This tool was created to solve a recurring challenge from the <a
				href="https://spotify.link/distractible"
				target="_blank"
				rel="noopener noreferrer">Distractible podcast</a
			>, where the wheel occasionally forces Mark to calculate RGB color distances by hand to see
			whose shirt is closest to their background.
		</p>
	</section>
	<a
		href="https://github.com/michael-goss/hue-far-apart"
		target="_blank"
		rel="noopener noreferrer"
		aria-label="View source on GitHub"
		class="github-link"
		><img src={github_logo} alt="GitHub Repository" />
	</a>
</main>

<style>
	main {
		padding: 0.5rem;
		margin-bottom: 2rem;
	}

	h1 {
		font-size: 3rem;
		text-align: center;
		transform: scaleY(0.8);
		line-height: 1px;
	}

	h2 {
		text-align: center;
	}

	a {
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		gap: 0.25rem;

		& img {
			height: 1rem;
			width: auto;
		}
	}

	section {
		background-color: var(--white-100);
		margin-top: 1.5rem;
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

	.black-card {
		background-color: var(--black-900);
		color: var(--white-100);

		h2 {
			color: var(--white-100);
		}

		& a {
			font-size: 1rem;
			color: var(--yellow-400);
			display: inline-block;
		}
	}

	.history-headline {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
	}

	.github-link {
		display: flex;
		justify-content: flex-end;
		margin-top: 1rem;

		img {
			width: 2rem;
			height: 2rem;
		}
	}
</style>
