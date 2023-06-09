<script lang="ts">
	import { onMount } from 'svelte';
	import { womboImages } from '$lib/utils/supabase';
	import ChevRight from '$lib/icons/ChevRight.svelte';
	import { Splide, SplideSlide, SplideTrack } from '@splidejs/svelte-splide';
	import { EventInterface } from '@splidejs/splide';
	import '@splidejs/splide/css/core';

	let images: any;
	let audio: any;

	let fake = false;

	function fauxfake() {
		fake = !fake;
	}

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
		images = await womboImages();
	});
</script>

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
		height: 'calc(100vh - 112px)',
		easing: 'cubic-bezier(0.530, 0.315, 0.215, 0.970)',
		pagination: false,
		arrows: false,
		perPage: 6,
		gap: '8px'
	}}
>
	<SplideTrack>
		{#if images && images.length > 0}
			{#each images as item}
				<SplideSlide>
					<div class="rta-image">
						<img src={item.link} alt={item.id} />
					</div>
				</SplideSlide>
			{/each}
		{/if}
	</SplideTrack>
</Splide>

<style lang="sass">

.rta-image
	height: calc(100vh - 112px)
	img
		object-fit: contain


</style>
