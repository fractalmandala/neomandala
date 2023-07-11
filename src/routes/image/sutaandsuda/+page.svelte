<script lang="ts">
	import { onMount } from 'svelte';
	import Meta from '$lib/components/Meta.svelte';
	import { soaCh2 } from '$lib/utils/supabase';
	import { pageTitle, pageDescription, pageUrl, shareImage } from '$lib/stores/globalstores';
	import { Splide, SplideSlide, SplideTrack } from '@splidejs/svelte-splide';
	import { EventInterface } from '@splidejs/splide';
	import '@splidejs/splide/css/core';

	let panels: any;

	$pageTitle = 'Sūta and Sudā, a Visual Story at Fractal Maṇḍala';
	$pageDescription = 'Experiments in generative image tech, narrative and written supplements...';
	$pageUrl = 'https://www.fractalmandala.in/image/sutaandsuda';
	$shareImage =
		'https://wganhlzrylmkvvaoalco.supabase.co/storage/v1/object/public/images/sutaandsuda/01.png';

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

<Meta
	title={$pageTitle}
	metaDescription={$pageDescription}
	metaUrl={$pageUrl}
	metaImage={$shareImage}
/>

<div class="rta-column">
	{#if panels && panels.length > 0}
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
				height: 'calc(100vh - 112px)',
				easing: 'cubic-bezier(0.900, 0.005, 0.225, 1.035)',
				pagination: false,
				arrows: false
			}}
		>
			<SplideTrack>
				{#each panels as item}
					<SplideSlide>
						<div class="rta-image" style="background-image: url('{item.image}')" />
					</SplideSlide>
				{/each}
			</SplideTrack>
		</Splide>
	{/if}
</div>

<style lang="sass">

.rta-image
	height: calc(100vh - 112px)
	width: 100vw
	background-position: center center
	background-size: contain
	background-repeat: no-repeat

</style>
