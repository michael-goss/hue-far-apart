<script lang="ts">
  // import svelteLogo from "./assets/svelte.svg";
  // import viteLogo from "/vite.svg";
  // import Counter from "./lib/Counter.svelte";
  import ColorPicker from "./lib/ColorPicker.svelte";
</script>

<main>
  <h1>Hue Far Apart</h1>
  <h2>Measuring the distance between hues, one pixel at a time</h2>
  <section class="color-pickers">
    <ColorPicker />
    <ColorPicker />
  </section>
</main>

<style>
  .color-pickers {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }
</style>
