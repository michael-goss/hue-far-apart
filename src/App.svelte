<script lang="ts">
  // import svelteLogo from "./assets/svelte.svg";
  // import viteLogo from "/vite.svg";
  import ColorPicker from "./lib/ColorPicker.svelte";
  import type { Color } from "./lib/types";

  let color0: Color | null = $state(null);
  let color1: Color | null = $state(null);
</script>

<main>
  <h1>Hue Far Apart</h1>
  <section class="card">
    <h2>Measuring the distance between hues, one pixel at a time</h2>
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
</style>
