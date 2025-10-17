<script lang="ts">
	import type { Distance } from "$lib/types"
	let { distance }: { distance: Distance } = $props()
</script>

{#if distance !== null}
	<div class="card result-container">
		<div class="result">
			{distance.toFixed(2)}
		</div>
		<div class="result-meta">
			euclidean distance =
			<math>
				<msqrt>
					<mrow>
						<msup
							><mrow
								><mo>(</mo><msub><mi>R</mi><mn>2</mn></msub><mo>-</mo><msub
									><mi>R</mi><mn>1</mn></msub
								><mo>)</mo></mrow
							><mn>2</mn></msup
						>
						<mo>+</mo>
						<msup
							><mrow
								><mo>(</mo><msub><mi>G</mi><mn>2</mn></msub><mo>-</mo><msub
									><mi>G</mi><mn>1</mn></msub
								><mo>)</mo></mrow
							><mn>2</mn></msup
						>
						<mo>+</mo>
						<msup
							><mrow
								><mo>(</mo><msub><mi>B</mi><mn>2</mn></msub><mo>-</mo><msub
									><mi>B</mi><mn>1</mn></msub
								><mo>)</mo></mrow
							><mn>2</mn></msup
						>
					</mrow>
				</msqrt>
			</math>
		</div>
	</div>
{/if}

<style>
	.card {
		background-color: var(--white-100);
	}

	.result-container {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		gap: 1rem;
	}

	.result {
		font-weight: bold;
		font-size: 2.5rem;
		color: var(--black-900);
	}

	.result-meta {
		text-transform: uppercase;
		font-size: 0.65rem;
	}

	@media (min-width: 600px) {
		.result-meta {
			font-size: 0.9rem;
		}
	}
</style>
