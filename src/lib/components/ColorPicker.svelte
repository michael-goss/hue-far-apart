<script lang="ts">
	import type { Color } from "$lib/types"
	import { color_to_hex, hex_to_color } from "$lib/utils"

	let {
		color,
		on_color_change,
		index,
	}: {
		color: Color | null
		on_color_change: (new_color: Color) => void
		index: number
	} = $props()

	let input_hex_color = $state("")
	const has_eye_dropper = "EyeDropper" in window
	const hex_color = $derived(color_to_hex(color))

	async function pick_color() {
		if (has_eye_dropper) {
			const eye_dropper = new (window as any).EyeDropper()
			try {
				const result = await eye_dropper.open()
				const hex_value = result?.sRGBHex
				if (typeof hex_value === "string") {
					const new_color = hex_to_color(hex_value)
					if (new_color) {
						on_color_change(new_color)
					}
				}
			} catch (err) {
				// user cancelled
			}
		} else {
			// Fallback: trigger hidden color input
			document.getElementById(`color-input-${index}`)?.click()
		}
	}

	function handle_hex_input() {
		if (/^#?[0-9A-Fa-f]{6}$/.test(input_hex_color)) {
			const hex_color_with_hash = input_hex_color.startsWith("#")
				? input_hex_color
				: `#${input_hex_color}`
			const new_color = hex_to_color(hex_color_with_hash)
			if (new_color) {
				on_color_change(new_color)
			}
		}
	}
</script>

<div class="color-picker card">
	<h3>Color {index + 1}</h3>
	<div
		class={`color-field ${!color ? "checker-pattern" : ""}`}
		style={color ? `background-color: ${hex_color}` : ""}
	>
		{#if color}
			<div class="color-meta">
				<span><strong>RGB</strong> {color.red} {color.green} {color.blue}</span>
				<span><strong>HEX</strong> {hex_color}</span>
			</div>
		{:else}<span class="color-field-text">no color selected</span>{/if}
	</div>
	<div class="color-action">
		{#if has_eye_dropper}
			<button onclick={pick_color} ontouchstart={() => {}}>Pick Color</button>
		{:else}
			<input
				id="manual-hex-color"
				type="text"
				bind:value={input_hex_color}
				oninput={handle_hex_input}
				placeholder={window?.innerWidth >= 600 ? "Enter hex code (#FF00FF)" : "#FF00FF"}
				maxlength="7"
				aria-label="Enter hex color code"
				autocomplete="off"
				spellcheck="false"
			/>
		{/if}
	</div>
</div>

<style>
	h3 {
		text-align: center;
		font-size: 1.125rem;
	}

	.color-picker {
		width: 100%;
		background-color: var(--grey-400);
		min-width: 0;

		& input {
			max-width: 100%;
			min-width: 0;
		}
	}

	.color-field {
		border: 2px solid var(--black-900);
		width: 100%;
		aspect-ratio: 1;
		border-radius: var(--card-radius);
		display: flex;
		justify-content: flex-start;
		align-items: flex-end;
		text-align: center;
		padding: 0.5rem;

		& .color-field-text {
			font-weight: bold;
			color: var(--black-900);
		}
	}

	.checker-pattern {
		background-image:
			linear-gradient(45deg, #ccc 25%, transparent 25%),
			linear-gradient(-45deg, #ccc 25%, transparent 25%),
			linear-gradient(45deg, transparent 75%, #ccc 75%),
			linear-gradient(-45deg, transparent 75%, #ccc 75%);
		background-size: 20px 20px;
		background-position:
			0 0,
			0 10px,
			10px -10px,
			-10px 0px;
		justify-content: center;
		align-items: center;
	}

	.color-action {
		display: flex;
		flex-direction: column;
		justify-content: center;
		gap: 0.5rem;
		padding: 0.5rem 0;
	}

	.color-meta {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		background-color: white;
		border: 2px solid var(--black-900);
		border-radius: calc(var(--card-radius) / 2);
		padding: 0.125rem 0.25rem;
		font-size: 0.6rem;
	}

	@media (min-width: 600px) {
		h3 {
			font-size: 1.5rem;
		}

		.color-meta {
			padding: 0.25rem 0.5rem;
			font-size: 0.8rem;
			border-radius: var(--card-radius);
		}
	}
</style>
