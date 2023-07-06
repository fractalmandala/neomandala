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

	let kkk = 'Knowledge';
	let www = 'Word';
	let ccc = 'Code';
	let vvv = 'Video';
	let sss = 'Sound';
	let iii = 'Image';

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
	class="rta-column grot minH"
	class:lzero={$breakZero}
	class:lone={$breakOne}
	class:ltwo={$breakTwo}
	class:light={$themeMode}
	class:dark={!$themeMode}
>
	<div class="block">
		<h5>
			<a href="/know">
				{#each kkk.split('') as char, i}
					<span class="text-animation" style="animation-delay: {i * 0.04}s">{char}</span>
				{/each}
			</a>
		</h5>
		<p>An index of things I know, think, learn or am in the process of...</p>
	</div>
	<div class="block">
		<h5>
			<a href="/word">
				{#each www.split('') as char, i}
					<span class="text-animation" style="animation-delay: {i * 0.04}s">{char}</span>
				{/each}
			</a>
		</h5>
		<p>Assorted writings on history, dharma and other things over the years...</p>
	</div>
	<div class="block">
		<h5>
			<a href="/web">
				{#each ccc.split('') as char, i}
					<span class="text-animation" style="animation-delay: {i * 0.04}s">{char}</span>
				{/each}
			</a>
		</h5>
		<p>Code repos, nothing too interesting tbh...</p>
	</div>
	<div class="block">
		<h5>
			<a href="/video">
				{#each vvv.split('') as char, i}
					<span class="text-animation" style="animation-delay: {i * 0.04}s">{char}</span>
				{/each}
			</a>
		</h5>
		<p>Me on a screen, if you're into that kind of thing...</p>
	</div>
	<div class="block">
		<h5>
			<a href="/sound">
				{#each sss.split('') as char, i}
					<span class="text-animation" style="animation-delay: {i * 0.04}s">{char}</span>
				{/each}
			</a>
		</h5>
		<p>Loopy psychedelic beats, 142BPM...</p>
	</div>
	<div class="block">
		<h5>
			<a href="/image">
				{#each iii.split('') as char, i}
					<span class="text-animation" style="animation-delay: {i * 0.04}s">{char}</span>
				{/each}
			</a>
		</h5>
		<p>Ohhh this is the best section just check out the galleries!</p>
	</div>
</div>

<style lang="sass">

.block
	display: flex
	flex-direction: row
	transition: 0.2s
	h5
		transition: 0.1s
		font-size: 64px
		text-transform: uppercase
		color: var(--thisnew)
		a
			color: inherit
		&:hover
			.text-animation
				animation: colorchange 1s infinite forwards
	p
		font-size: 14px
		opacity: 0
		transition: 0.1s
	&:hover
		p
			opacity: 1

@keyframes colorchange
	0%
		color: var(--thisnew)
	50%
		color: #10D56C
	100%
		color: var(--thisnew)


.lzero, .lone
	.block
		display: flex
		flex-direction: row
		align-items: center
		column-gap: 24px
		transition: 0.2s
		h5
			transition: 0.4s

.lzero
	padding: 64px
	.block
		width: max-content

.lone, .ltwo
	padding: 16px 16px 0 16px
	.block
		width: 100%
		padding-bottom: 16px

h5
	font-weight: 500


</style>
