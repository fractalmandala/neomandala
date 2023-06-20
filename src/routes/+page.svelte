<script lang="ts">
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';
	import { featuredWritings, mandalapedia } from '$lib/utils/supabase';
	import { allIndex, allWebdev } from '$lib/utils/localpulls';
	import { elementVisibilityStore } from '$lib/stores/elementvisibilitystore';
	import {
		themeMode,
		breakZero,
		breakOne,
		breakTwo,
		pageTitle,
		pageDescription,
		shareImage,
		pageUrl,
		thisSession,
		thisPrompt
	} from '$lib/stores/globalstores';
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

	$pageTitle = 'Fractal Maṇḍala';
	$pageDescription = 'digital garden and buildstation';
	$pageUrl = 'https://www.fractalmandala.in';
	$shareImage =
		'https://wganhlzrylmkvvaoalco.supabase.co/storage/v1/object/public/images/website/grid.webp';

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

<svelte:window bind:scrollY={scY} />

<div
	class="minH mainpagegrid grot"
	class:lzero={$breakZero}
	class:lone={$breakOne}
	class:ltwo={$breakTwo}
	class:light={$themeMode}
	class:dark={!$themeMode}
>
	<div class="block" style="background-image: url('/images/webback1.webp')">
		<h4>
			<a href="/know">Knowledge Index</a>
		</h4>
	</div>
	<div class="block" style="background-image: url('/images/k-writings.webp')">
		<h4>
			<a href="/word">Word</a>
		</h4>
	</div>
	<div class="block" style="background-image: url('/images/k-webdev.webp')">
		<h4>
			<a href="/web">Code</a>
		</h4>
	</div>
	<div class="block" style="background-image: url('/images/k-music.webp')">
		<h4>
			<a href="/video">Video</a>
		</h4>
	</div>
	<div class="block" style="background-image: url('/images/sveltelowda.webp')">
		<h4>
			<a href="/sound">Sound</a>
		</h4>
	</div>
	<div class="block" style="background-image: url('/images/k-images.webp')">
		<h4>
			<a href="/image">Image</a>
		</h4>
	</div>
</div>

<style lang="sass">

.mainpagegrid
	display: grid
	grid-auto-flow: row
	box-sizing: border-box

.mainpagegrid.ltwo
	grid-template-columns: 1fr
	grid-template-areas: "."
	gap: 8px
	height: 100%
	padding-left: 8px
	padding-right: 8px
	.block
		display: flex
		flex-direction: column
		height: 20vh
		background-position: center center
		background-size: cover
		justify-content: center
		align-items: center
		transition: 0.2s
		border-radius: 8px
		h4
			transition: 0.1s
			opacity: 1
			background: rgba(0,0,0,0.6)
			padding: 4px 8px
			border: 1px solid rgba(0,0,0,0.6)
			border-radius: 4px
			box-shadow: 4px 4px 8px 5px rgba(0,0,0,0.8)
			text-align: center
			font-size: 24px

.mainpagegrid.lzero, .mainpagegrid.lone
	grid-template-columns: 1fr 1fr 1fr
	grid-template-areas: ". . ."
	gap: 8px
	height: calc(100vh - 128px)
	align-items: center
	align-content: center
	.block
		display: flex
		flex-direction: column
		height: calc(50vh - 64px)
		background-position: center center
		background-size: cover
		justify-content: center
		align-items: center
		transition: 0.2s
		border-radius: 8px
		h4
			transition: 0.4s
			opacity: 0
			background: rgba(0,0,0,0.6)
			padding: 4px 8px
			border: 1px solid rgba(0,0,0,0.6)
			border-radius: 4px
			box-shadow: 4px 4px 8px 5px rgba(0,0,0,0.8)
			text-align: center
		&:hover
			h4
				opacity: 1
				&:hover
					border: 1px solid white
					box-shadow: 4px 4px 8px rgba(0,0,0,0.0)

.mainpagegrid
	&:hover
		.block
			filter: saturate(0.1)
			&:hover
				filter: saturate(1)

a
	&:hover
		color: #10D56C

h4
	font-weight: bold
	color: white
	a
		&:hover
			color: white


</style>
