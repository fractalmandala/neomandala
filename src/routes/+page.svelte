<script lang="ts">
	import { onMount } from 'svelte';
	import Gridder from '$lib/components/Gridder.svelte';
	import { psyImages, featuredWritings, mandalapedia, sixteenImages } from '$lib/utils/supabase';
	import { elementVisibilityStore } from '$lib/stores/elementvisibilitystore';
	import { featuredWebdev } from '$lib/utils/localpulls';
	import { themeMode } from '$lib/stores/globalstores';
	import { mouseStore } from '$lib/stores/mousestore';
	import { elementSizeStore } from '$lib/utils/elementsize';
	let ref: HTMLElement | null = null;

	const position = mouseStore();
	let x = 0;
	let y = 0;

	let temp = 0;
	let tomp = 0;

	$: size = elementSizeStore(ref);

	function handlePath(event: MouseEvent) {
		const gridElement = document.querySelector('.grid4');

		if (gridElement instanceof HTMLElement) {
			// Get the element's position:
			const rect = gridElement.getBoundingClientRect();
			temp = rect.left;
			tomp = rect.top;
			// Adjust mouse positions to be relative to the element:
			x = $position.x - rect.left;
			y = $position.y - rect.top;

			// Update the circle's position:
			gridElement.style.clipPath = `circle(10% at ${x}px ${y}px)`;
		}
	}

	$: ({ isVisible } = elementVisibilityStore(ref));

	let posts: any;
	let webs: any;
	let images: any;
	let low = 0;
	let top = 7;
	let scY: number;
	let trY: number;
	let indices: any;

	$: if ($isVisible) {
		trY = scY;
	} else {
		trY = 0;
	}

	onMount(() => {
		(async () => {
			images = await sixteenImages();
			posts = await featuredWritings();
			webs = await featuredWebdev();
			indices = await mandalapedia();
		})();
	});
</script>

<svelte:head>
	<title>Fractal Maṇḍala | digital garden and buildstation</title>
</svelte:head>

<svelte:window bind:scrollY={scY} />

<div class="grot rta-grid grid2" class:light={$themeMode} class:dark={!$themeMode}>
	<div
		class="rta-grid grid4 half back"
		on:mousemove={handlePath}
		bind:this={ref}
		style="background-image: url('/images/psychedelic.webp')"
	/>
	<div class="rta-column ybot xright half">
		<small class="p-bot-16" style="color: #10D56C">
			<a href="/know">knowledge index</a>
		</small>
		{#if indices && indices.length > 0}
			{#each indices as item}
				<h6 class="tt-c">
					<a href="/know/{item.slug}">{item.name}</a>
				</h6>
			{/each}
		{/if}
		<small class="p-bot-16 p-top-32" style="color: #10D56C">
			<a href="/word">written words</a>
		</small>
		{#if posts && posts.length > 0}
			{#each posts as item}
				<h6 class="tt-c">
					<a href="/word/{item.slug}">
						{item.title}
					</a>
				</h6>
			{/each}
		{/if}
		<small class="p-bot-16 p-top-32" style="color: #10D56C"> visual tales </small>
		<h6 class="tt-c">
			<a href="/image/midjourneys"> the realm psychedelic </a>
		</h6>
		<h6 class="tt-c">
			<a href="/image/nasadiya">Nasadīya Across Space and Time</a>
		</h6>
	</div>
</div>

<style lang="sass">

.grot.rta-grid.grid2
	@media screen and (min-width: 1024px)
		padding: 0 40px
		.grid4
			margin-top: 56px
			padding-top: 32px
			clip-path: circle(10%)
			.rta-image
				height: 100%
		.half
			height: calc(100vh - 112px)
	@media screen and (max-width: 1023px)
		.grid4
			display: none
		.half
			padding: 64px 16px
			text-align: right

.rta-column
	height: 100%

.light
	background: white

a
	&:hover
		color: #10D56C

h6
	font-weight: 400
	padding-bottom: 4px
	color: var(--default)
	@media screen and (max-width: 1023px)
		padding-bottom: 8px


</style>
