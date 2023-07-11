<script lang="ts">
	import { onMount } from 'svelte';
	import Meta from '$lib/components/Meta.svelte';
	import { pageTitle, pageDescription, pageUrl, shareImage } from '$lib/stores/globalstores';
	import { aryaImages } from '$lib/utils/supabase';
	import { Splide, SplideSlide, SplideTrack } from '@splidejs/svelte-splide';
	import { EventInterface } from '@splidejs/splide';
	import '@splidejs/splide/css/core';
	let images: any;
	let fake = false;
	$pageTitle = 'Aryavarta, lore through genealogy and maps';
	$pageDescription = 'Purāṇa inspired, fiction laden takes on ancient clans and primal lands...';
	$pageUrl = 'https://www.fractalmandala.in/image/aryavarta';
	$shareImage =
		'https://rnfvzaelmwbbvfbsppir.supabase.co/storage/v1/object/public/brhatwebsite/13scrolls/midmap2.webp';

	let isArya = Array(10).fill(false);

	function fauxfake() {
		fake = !fake;
	}

	function toggleArya(index: number) {
		isArya[index] = !isArya[index];
		for (let i = 0; i < isArya.length; i++) {
			if (i !== index && isArya[i] === true) {
				isArya[i] = false;
			}
		}
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
		images = await aryaImages();
	});
</script>

<Meta
	title={$pageTitle}
	metaDescription={$pageDescription}
	metaUrl={$pageUrl}
	metaImage={$shareImage}
/>

<div class="rta-grid grid4">
	{#if images && images.length > 0}
		{#each images as item, i}
			<div class="rta-image" on:click={() => toggleArya(i)} on:keydown={fauxfake}>
				<img src={item.link} alt={item.name} />
			</div>
		{/each}
	{/if}
	{#if images && images.length > 0}
		{#each images as item, i}
			{#if isArya[i]}
				<div class="fullplat" on:click={() => toggleArya(i)} on:keydown={fauxfake}>
					<div class="rta-image">
						<img src={item.link} alt={item.name} />
					</div>
				</div>
			{/if}
		{/each}
	{/if}
</div>

<style lang="sass">

.rta-grid
	position: relative
	@media screen and (min-width: 1024px)
		height: calc(100vh - 112px)
		.rta-image
			height: calc(50vh - 56px)
			img
				object-position: center center
		.fullplat
			position: absolute
			top: 0
			left: 0
			z-index: 500
			width: 100vw
			height: 100vh
			.rta-image
				width: 100%
				height: 100%


</style>
