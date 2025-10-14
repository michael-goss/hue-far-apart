<script lang="ts">
	let { index, title }: { index: number; title: string } = $props()
</script>

<div class="container">
	<div class="circle"><span>{index}</span></div>
	<h2>{title}</h2>
</div>

<style>
	.container {
		display: flex;
		flex-direction: row;
		align-items: center;
		gap: 1.5rem;
	}

	.circle {
		--shadow-size: 0.1rem;
		width: 2rem;
		aspect-ratio: 1;
		border: 2px solid black;
		border-radius: 100%;
		background-color: var(--white-100);

		box-shadow: var(--shadow-size) var(--shadow-size) 0 var(--black-900);

		display: flex;
		justify-content: center;
		align-items: center;

		& span {
			color: var(--black-900);
			font-weight: bold;
			font-size: 1.25rem;
		}
	}
</style>
