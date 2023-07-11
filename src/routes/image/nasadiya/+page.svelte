<script lang="ts">
	import { onMount } from 'svelte';
	import { pageTitle, pageDescription, pageUrl, shareImage } from '$lib/stores/globalstores';
	import { nasLines, nasImages } from '$lib/utils/supabase';
	import { Splide, SplideSlide, SplideTrack } from '@splidejs/svelte-splide';
	import { EventInterface } from '@splidejs/splide';
	import '@splidejs/splide/css/core';

	let images: any;
	let id1: any;

	$pageTitle = 'Nasadīya Across Space and Time, a Visual Story at Fractal Maṇḍala';
	$pageDescription = 'Experiments in generative image tech, narrative and written supplements...';
	$pageUrl = 'https://www.fractalmandala.in/image/nasadiya';
	$shareImage =
		'https://wganhlzrylmkvvaoalco.supabase.co/storage/v1/object/public/images/nasadiya/1-2.webp';

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
		images = await nasLines();
		id1 = await nasImages();
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
		direction: 'ttb',
		height: 'calc(100vh - 80px)',
		easing: 'cubic-bezier(0.900, 0.005, 0.225, 1.035)',
		pagination: false,
		arrows: false
	}}
>
	<SplideTrack>
		{#if images && images.length > 0}
			{#each images as item}
				<SplideSlide>
					<div class="rta-grid grid2">
						<div class="rta-grid grid4 back" style="background-image: url('{item.background}')" />
						<div class="grot rta-column rowgap300">
							<small>{item.id}</small>
							<div class="adobe">
								<pre
									class="movethis"
									style="font-family: 'Adobe Devanagari', serif; color: var(--background); font-weight: 400; line-height: 1.1">
									{item.devanagari}
								</pre>
							</div>
							<pre
								class="english"
								style="color: var(--background); font-weight: 400">{item.iast}</pre>
							<p>{item.basham}</p>
						</div>
					</div>
				</SplideSlide>
			{/each}
		{/if}
	</SplideTrack>
</Splide>

<style lang="sass">


.rta-grid.grid2
	@media screen and (min-width: 769px)
		padding: 0 3.2vw
		height: calc(100vh - 80px)
		.grot
			display: flex
			flex-direction: column
			justify-content: center
			padding-right: 40px
		.movethis
			font-size: 40px
		.english
			font-size: 18px
	@media screen and (max-width: 768px)
		padding: 0px 16px 16px 16px
		min-height: calc(100vh - 80px)
		.back
			height: 45vh
		.movethis
			font-size: 21px

</style>
