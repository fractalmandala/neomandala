<script lang="ts">
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';
	import { featuredWritings, mandalapedia } from '$lib/utils/supabase';
	import { allIndex, allWebdev } from '$lib/utils/localpulls';
	import { elementVisibilityStore } from '$lib/stores/elementvisibilitystore';
	import { themeMode } from '$lib/stores/globalstores';
	import { mouseStore } from '$lib/stores/mousestore';
	let ref: HTMLElement | null = null;
	const position = mouseStore();
	let x = 0;
	let y = 0;

	let temp = 0;
	let tomp = 0;
	let rafId: any;
	let posts: any;
	let scY: number;
	let trY: number;
	let indices: any;
	let webs: any;

	function handlePath(event: MouseEvent) {
		const gridElement = document.querySelector('.this');

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

	$: if (browser) {
		rafId = requestAnimationFrame(() => {
			const gridElement = document.querySelector('.this');
			if (gridElement instanceof HTMLElement) {
				gridElement.style.clipPath = `circle(10% at ${$position.x - 50}px ${$position.y - 50}px)`;
			}
		});
	}

	$: ({ isVisible } = elementVisibilityStore(ref));

	$: if ($isVisible) {
		trY = scY;
	} else {
		trY = 0;
	}

	onMount(() => {
		(async () => {
			posts = await featuredWritings();
			indices = await allIndex();
			webs = await allWebdev();
		})();
	});
</script>

<svelte:head>
	<title>Fractal Maṇḍala | digital garden and buildstation</title>
</svelte:head>

<svelte:window bind:scrollY={scY} />

<div class="grot pagetwogrid back" class:light={$themeMode} class:dark={!$themeMode}>
	<div
		class="rta-column back this"
		on:mousemove={handlePath}
		bind:this={ref}
		style="background-image: url('/images/psychedelic.webp')"
	>
		<h5 style="color: white">
			Today a young man on acid realized that all matter is merely energy condensed to a slow
			vibration, that we are all one consciousness experiencing itself subjectively, there is no
			such thing as death, life is only a dream, and we are the imagination of ourselves.
		</h5>
		<h4 style="color: white">Here's Tom with the weather...</h4>
	</div>
	<div class="rta-column half" data-lenis-prevent>
		<small class="p-bot-16" style="color: #10D56C">
			<a href="/know">knowledge index</a>
		</small>
		{#if indices && indices.length > 0}
			{#each indices as item}
				<h6 class="tt-c">
					<a href={item.linkpath}>{item.meta.title}</a>
				</h6>
			{/each}
		{/if}
		<small class="p-bot-16 p-top-32 bord-top m-top-32" style="color: #10D56C">
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
		<small class="p-bot-16 p-top-32 bord-top m-top-32" style="color: #10D56C"> visual tales </small>
		<h6 class="tt-c">
			<a href="/image/midjourneys"> the realm psychedelic </a>
		</h6>
		<h6 class="tt-c">
			<a href="/image/nasadiya">Nasadīya Across Space and Time</a>
		</h6>
		<h6 class="tt-c">
			<a href="/image/wombo">It Began at Wombo</a>
		</h6>
		<small class="p-bot-16 p-top-32 bord-top m-top-32" style="color: #10D56C">web dev guides</small>
		{#if webs && webs.length > 0}
			{#each webs as item}
				<h6 class="tt-c">
					<a href={item.linkpath}>
						{item.meta.title}
					</a>
				</h6>
			{/each}
		{/if}
	</div>
</div>

<style lang="sass">

.pagetwogrid
	display: grid
	grid-auto-flow: row
	.half
		grid-area: half
	.this
		grid-area: this
	@media screen and (max-width: 900px)
		grid-template-columns: 1fr
		grid-template-areas: "half"
		padding: 80px 16px 32px 16px
		.half
			width: calc(100vw - 64px)
			h6
				font-size: 20px
				padding: 6px 0
			small
				font-size: 14px
		.this
			display: none
	@media screen and (max-width: 1023px)
		grid-template-columns: 1fr 30%
		grid-template-areas: "half this"
		padding: 80px 32px 32px 32px
	@media screen and (min-width: 1024px)
		grid-template-columns: 1fr 1fr
		grid-template-areas: "this half"
		padding: 0 40px 0 0
		.half
			text-align: right
			padding: 32px 8px 32px 0
		.half, .this
			height: calc(100vh - 112px)
		.half
			overflow-y: scroll
		.half::-webkit-scrollbar
			width: 4px
		.half::-webkit-scrollbar-thumb
			background: #10D56C
		.this
			padding: 40px



a
	&:hover
		color: #10D56C

h6
	font-weight: 400
	padding-bottom: 4px
	color: var(--texttwo)
	@media screen and (max-width: 1023px)
		padding-bottom: 8px


</style>
