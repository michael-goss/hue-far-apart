<script lang="ts">
  import { color_hex_to_rgb } from "./utils";

  let {
    color,
    on_color_change,
    index,
  }: {
    color: string;
    on_color_change: (new_color: string) => void;
    index: number;
  } = $props();

  let input_hex_color = $state(color);
  const { red, green, blue } = $derived(color_hex_to_rgb(color));
  const has_color_selected = $derived(!!color);
  const has_eye_dropper = "EyeDropper" in window;

  async function pick_color() {
    if (has_eye_dropper) {
      const eye_dropper = new (window as any).EyeDropper();
      try {
        const result = await eye_dropper.open();
        on_color_change(result.sRGBHex);
      } catch (err) {
        // user cancelled
      }
    } else {
      // Fallback: trigger hidden color input
      document.getElementById(`color-input-${index}`)?.click();
    }
  }

  function handle_hex_input() {
    if (/^#[0-9A-Fa-f]{6}$/.test(input_hex_color)) {
      on_color_change(input_hex_color);
    }
  }
</script>

<div class="color-picker card">
  <h3>Color {index + 1}</h3>
  <div
    class={`color-field ${!has_color_selected ? "checker-pattern" : ""}`}
    style="background-color: {color} "
  >
    {#if has_color_selected}{:else}<span class="color-field-text"
        >no color selected</span
      >{/if}
  </div>
  <div class="color-action">
    <button onclick={pick_color}>Pick Color</button>
    {#if !has_eye_dropper}
      <input
        type="color"
        id="color-input-{index}"
        bind:value={color}
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
    {#if has_color_selected}
      <div class="color-meta">
        <span>RGB {red} {green} {blue}</span>
        <span>HEX {color.toUpperCase()}</span>
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
    background-image: linear-gradient(45deg, #ccc 25%, transparent 25%),
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
