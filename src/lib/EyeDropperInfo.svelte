<script lang="ts">
	import warning_logo from "../assets/warning.png"
	const has_eye_dropper = "EyeDropper" in window
</script>

{#if !has_eye_dropper}
	<div class="info">
		<img src={warning_logo} alt="Warning" />Color picking from screen isn't supported in your
		browser. Try Chrome or Edge on Desktop for the best experience, or enter the color hex code
		manually below.
	</div>
{/if}

<style>
	.info {
		--image-size: 1.5rem;
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 0.5rem;
		line-height: var(--image-size);
		background-color: var(--orange-300);
		border: 2px solid var(--orange-400);
		padding: 0.5rem;
		border-radius: var(--card-radius);
		font-size: 0.875rem;
		margin-top: 1.5rem;

		& img {
			width: var(--image-size);
			height: var(--image-size);
		}
	}
</style>
