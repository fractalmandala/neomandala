<script lang="ts">
	import { onMount } from 'svelte';
	import { soaCh2 } from '$lib/utils/supabase';
	import { Splide, SplideSlide, SplideTrack } from '@splidejs/svelte-splide';
	import { EventInterface } from '@splidejs/splide';
	import '@splidejs/splide/css/core';

	let panels: any;

	export function MyTransition(Splide: any, Components: any) {
		const { bind } = EventInterface(Splide);
		const { Move } = Components;
		const { list } = Components.Elements;

		let endCallback: any;

		function mount() {
			bind(list, 'transitionend', (e) => {
				if (e.target === list && endCallback) {
					// Removes the transition property
					cancel();

					// Calls the `done` callback
					endCallback();
				}
			});
		}

		function start(index: any, done: any) {
			// Converts the index to the position
			const destination = Move.toPosition(index, true);

			// Applies the CSS transition
			list.style.transition = 'transform 800ms cubic-bezier(.44,.65,.07,1.01)';

			// Moves the carousel to the destination.
			Move.translate(destination);

			// Keeps the callback to invoke later.
			endCallback = done;
		}

		function cancel() {
			list.style.transition = '';
		}

		return {
			mount,
			start,
			cancel
		};
	}

	onMount(async () => {
		panels = await soaCh2();
	});
</script>

<div class="rta-page">
	<Splide
		aria-label="midjourneys"
		hasTrack={false}
		options={{
			drag: true,
			keyboard: 'global',
			waitForTransition: true,
			wheel: true,
			type: 'loop',
			wheelMinThreshold: 1.1,
			speed: 900,
			direction: 'ltr',
			height: 'calc(100vh - 192px)',
			easing: 'cubic-bezier(0.900, 0.005, 0.225, 1.035)',
			pagination: false,
			arrows: false
		}}
	>
		<SplideTrack>
			{#if panels && panels.length > 0}
				{#each panels as item}
					<SplideSlide>
						<div class="rta-grid grid2">
							<div class="rta-image">
								<img src={item.image} alt={item.order} />
							</div>
							<div class="rta-column grot">
								<p>{item.order}</p>
								<pre>{item.text}</pre>
							</div>
						</div>
					</SplideSlide>
				{/each}
			{/if}
		</SplideTrack>
	</Splide>
</div>

<style lang="sass">

.rta-grid
	height: calc(100vh - 192px)

</style>
