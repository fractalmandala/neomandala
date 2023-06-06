<script lang="ts">
	import { onMount } from 'svelte';
	import { reveal } from 'svelte-reveal';
	import Parallax from '$lib/components/Parallax.svelte';
	import Parallax2 from '$lib/components/Parallax.svelte';
	import Gridder from '$lib/components/Gridder.svelte';
	import { psyImages, featuredWritings, mandalapedia } from '$lib/utils/supabase';
	import { elementVisibilityStore } from '$lib/stores/elementvisibilitystore';
	import Reveal from '$lib/anims/RevealHead.svelte';
	import RevealText from '$lib/anims/RevealText.svelte';
	import { featuredWebdev } from '$lib/utils/localpulls';
	import { breakZero, breakOne, breakTwo, themeMode, scrollY } from '$lib/stores/globalstores';
	let ref: HTMLElement | null = null;

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
			images = await psyImages();
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

<div class="grot" class:light={$themeMode} class:dark={!$themeMode}>
	<div class="rta-column ybot xright">
		<p class="p-bot-16">knowledge index</p>
		{#if indices && indices.length > 0}
			{#each indices as item}
				<h5 class="tt-u">
					<a href="/know/{item.slug}">{item.name}</a>
				</h5>
			{/each}
		{/if}
		<p class="p-bot-16 p-top-32">written words</p>
		{#if posts && posts.length > 0}
			{#each posts as item}
				<h5 class="tt-u">
					<a href="/word/{item.slug}">
						{item.title}
					</a>
				</h5>
			{/each}
		{/if}
	</div>
</div>

<style lang="sass">


.light
	background: white

a
	&:hover
		color: #10D56C

h5
	font-weight: 500
	padding-bottom: 4px
	@media screen and (max-width: 1023px)
		padding-bottom: 8px

.grot
	display: flex
	flex-direction: column
	row-gap: 16px
	@media screen and (min-width: 1024px)
		height: calc(100vh - 56px)
		padding: 88px 40px 64px 40px
	@media screen and (max-width: 1023px)
		min-height: 100vh
		padding: 88px 16px 64px 16px
		.rta-column
			align-items: flex-end
			text-align: right


</style>
