<script lang="ts">
	import type { Color } from "./types"
	import { color_to_hex, hex_to_color } from "./utils"

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
		if (/^#[0-9A-Fa-f]{6}$/.test(input_hex_color)) {
			const new_color = hex_to_color(input_hex_color)
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
		{#if !color}<span class="color-field-text">no color selected</span>{/if}
	</div>
	<div class="color-action">
		<button onclick={pick_color}>Pick Color</button>
		{#if !has_eye_dropper}
			<input
				type="color"
				id="color-input-{index}"
				bind:value={input_hex_color}
				oninput={handle_hex_input}
				style="visibility: hidden; position:absolute; pointer-events: none;"
			/>
			<input
				type="text"
				bind:value={input_hex_color}
				oninput={handle_hex_input}
				placeholder="#FF00FF"
				maxlength="7"
			/>
		{/if}
		{#if color}
			<div class="color-meta">
				<span>RGB {color.red} {color.green} {color.blue}</span>
				<span>HEX {hex_color}</span>
			</div>
		{/if}
	</div>
</div>

<style>
	h3 {
		text-align: center;
	}

	.color-picker {
		width: 100%;
		background-color: var(--grey-400);
	}

	.color-field {
		border: 2px solid var(--black-900);
		width: 100%;
		aspect-ratio: 1;
		border-radius: var(--card-radius);
		display: flex;
		justify-content: center;
		align-items: center;
		text-align: center;

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
	}
</style>
