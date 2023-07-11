<script lang="ts">
	import { onMount } from 'svelte';
	import Meta from '$lib/components/Meta.svelte';
	import { womboImages } from '$lib/utils/supabase';
	import ChevRight from '$lib/icons/ChevRight.svelte';
	import { pageTitle, pageDescription, pageUrl, shareImage } from '$lib/stores/globalstores';
	import { Splide, SplideSlide, SplideTrack } from '@splidejs/svelte-splide';
	import { EventInterface } from '@splidejs/splide';
	import '@splidejs/splide/css/core';

	let images: any;
	let audio: any;

	let fake = false;

	$pageTitle = 'Wombo, a Visual Story at Fractal Maṇḍala';
	$pageDescription = 'Experiments in generative image tech, narrative and written supplements...';
	$pageUrl = 'https://www.fractalmandala.in/image/wombo';
	$shareImage =
		'https://wganhlzrylmkvvaoalco.supabase.co/storage/v1/object/public/images/website/grid.webp';

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

<Meta
	title={$pageTitle}
	metaDescription={$pageDescription}
	metaUrl={$pageUrl}
	metaImage={$shareImage}
/>

{#if images && images.length > 0}
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
			{#each images as item}
				<SplideSlide>
					<div class="rta-image">
						<img src={item.link} alt={item.id} />
					</div>
				</SplideSlide>
			{/each}
		</SplideTrack>
	</Splide>
{/if}

<style lang="sass">

.rta-image
	height: calc(100vh - 112px)
	img
		object-fit: contain


</style>
