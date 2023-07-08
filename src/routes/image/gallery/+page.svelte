<script lang="ts">
	import { onMount } from 'svelte';
	import { lazyLoadImageAction } from '$lib/utils/lazyloader';
	import { pageTitle, pageDescription, pageUrl, shareImage } from '$lib/stores/globalstores';
	import { supaImages } from '$lib/utils/supabase';

	let low = 1;
	let top = 100;
	let photos: any;
	let isBig = Array(800).fill(false);
	let fake = false;
	let loading = false;

	$pageTitle = 'Midjourney Generated Images at Fractal Maṇḍala';
	$pageDescription = 'Experiments in generative image tech, narrative and written supplements...';
	$pageUrl = 'https://www.fractalmandala.in/image';
	$shareImage =
		'https://wganhlzrylmkvvaoalco.supabase.co/storage/v1/object/public/images/website/grid.webp';

	function loadMore() {
		loading = true;
		low += 100;
		top += 100;
		(async () => {
			photos = await supaImages(low, top);
		})();
		window.scrollTo(0, 0);
		loading = false;
	}

	function loadPrev() {
		loading = true;
		low -= 100;
		top -= 100;
		(async () => {
			photos = await supaImages(low, top);
		})();
		window.scrollTo(0, 0);
		loading = false;
	}

	function fauxfake() {
		fake = !fake;
	}

	function toggleBig(index: number) {
		isBig[index] = !isBig[index];
		for (let i = 0; i < isBig.length; i++) {
			if (i !== index && isBig[i] === true) {
				isBig[i] = false;
			}
		}
	}

	onMount(async () => {
		photos = await supaImages(low, top);
	});
</script>

<div class="rta-grid grid4 imagegrid">
	{#if photos && photos.length > 0}
		{#each photos as item, i}
			{#if isBig[i]}
				<div class="rta-image bigboy" on:click={() => toggleBig(i)} on:keydown={fauxfake}>
					<img src={item.link} alt={item.id} use:lazyLoadImageAction />
				</div>
			{:else}
				<div class="rta-image" on:click={() => toggleBig(i)} on:keydown={fauxfake}>
					{#if loading}
						<small>loading...</small>
					{:else}
						<img src={item.link} alt={item.id} use:lazyLoadImageAction />
					{/if}
				</div>
			{/if}
		{/each}
	{/if}
</div>
<div class="rta-row p-top-32 p-bot-32 xcenter-d xcenter-m colgap200">
	<button class="genbutton" on:click={loadPrev}> Load Prev</button>
	<button class="genbutton" on:click={loadMore}> Load More</button>
</div>

<style lang="sass">

.rta-grid
	&:hover
		.rta-image
			transform: scale(0.96)
			&:hover
				transform: scale(1)
		.rta-image.bigboy
			&:hover
				transform: scale(1)
				

.rta-image
	transition: transform 0.4s ease
	img
		object-fit: cover
		height: 100%
		width: 100%

.bigboy
	border: 4px solid var(--background)

.rta-grid
	@media screen and (min-width: 769px)
		padding: 40px 3.2vw
		grid-template-areas: "bigboy bigboy bigboy ." "bigboy bigboy bigboy ."
		.bigboy
			grid-column: span 3
			grid-row: span 3
		.rta-image
			height: 40vh
		.rta-image.bigboy
			height: 64vh
	@media screen and (max-width: 768px)
		grid-template-areas: ". ."
		grid-template-columns: 1fr 1fr
		padding: 56px 24px
		.rta-image
			height: 25vh

</style>
