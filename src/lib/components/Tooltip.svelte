<script lang="ts">
	import type { Snippet } from "svelte"

	let {
		text,
		enabled,
		children,
	}: {
		text: string
		enabled: boolean
		children: Snippet
	} = $props()
</script>

{#if enabled && text}
	<div class="tooltip">
		<span class="tooltip-text">{text}</span>
		{@render children?.()}
	</div>
{:else}
	{@render children?.()}
{/if}

<style>
	.tooltip {
		display: inline-block;
		position: relative;
		cursor: pointer;

		& .tooltip-text {
			position: absolute;
			bottom: 100%;
			left: 50%;
			transform: translateX(-50%);
			visibility: hidden;
			text-align: center;
			font-weight: bold;
			color: var(--black-900);
			background-color: var(--white-100);
			padding: 0.5rem;
			border: 2px solid var(--black-900);
			border-radius: 1rem;
			box-shadow: var(--shadow-size) var(--shadow-size) 0 var(--black-900);
			z-index: 1;

			&::after {
				content: " ";
				position: absolute;
				top: 100%;
				left: 50%;
				border-width: 0.75rem;
				border-style: solid;
				border-color: var(--black-900) transparent transparent transparent;
			}
		}

		&:hover .tooltip-text {
			visibility: visible;
		}
	}
</style>
