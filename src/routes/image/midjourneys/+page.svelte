<script lang="ts">
	import { onMount } from 'svelte';
	import { psyImages } from '$lib/utils/supabase';
	import { pageTitle, pageDescription, pageUrl, shareImage } from '$lib/stores/globalstores';
	import { Splide, SplideSlide, SplideTrack } from '@splidejs/svelte-splide';
	import { EventInterface } from '@splidejs/splide';
	import '@splidejs/splide/css/core';

	let images: any;

	$pageTitle = 'Midjourneys, a Visual Story at Fractal Maṇḍala';
	$pageDescription = 'Experiments in generative image tech, narrative and written supplements...';
	$pageUrl = 'https://www.fractalmandala.in/image/midjourneys';
	$shareImage =
		'https://wganhlzrylmkvvaoalco.supabase.co/storage/v1/object/public/images/midjourneys/panel01.webp';

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
		images = await psyImages();
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
		type: 'slide',
		wheelMinThreshold: 1.1,
		speed: 900,
		direction: 'ltr',
		pagination: false,
		arrows: false,
		height: 'calc(100vh - 80px)'
	}}
>
	<SplideTrack>
		{#if images && images.length > 0}
			{#each images as item}
				<SplideSlide>
					<div class="rta-grid grid2">
						<div class="rta-image">
							<img src={item.link} alt={item.id} />
						</div>
						<div class="grot">
							<small>{item.id}</small>
							<h4 style="color: var(--background)">{item.quote}</h4>
							<p>{item.source}</p>
						</div>
					</div>
				</SplideSlide>
			{/each}
		{/if}
	</SplideTrack>
</Splide>

<style lang="sass">

.rta-image
	img
		object-fit: contain
		height: 100%


.rta-grid.grid2
	@media screen and (min-width: 769px)
		padding: 0 3.2vw
		height: calc(100vh - 80px)
		.grot
			display: flex
			flex-direction: column
			justify-content: center
	@media screen and (max-width: 768px)
		padding: 16px
		height: calc(100vh - 80px)
		h4
			font-size: 20px
			
h4
	font-weight: 400

</style>
