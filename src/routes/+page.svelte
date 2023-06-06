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
		<small class="p-bot-16" style="color: #10D56C">knowledge index</small>
		{#if indices && indices.length > 0}
			{#each indices as item}
				<h6 class="tt-c">
					<a href="/know/{item.slug}">{item.name}</a>
				</h6>
			{/each}
		{/if}
		<small class="p-bot-16 p-top-32" style="color: #10D56C">written words</small>
		{#if posts && posts.length > 0}
			{#each posts as item}
				<h6 class="tt-c">
					<a href="/word/{item.slug}">
						{item.title}
					</a>
				</h6>
			{/each}
		{/if}
	</div>
</div>

<style lang="sass">

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

.grot
	display: flex
	flex-direction: column
	row-gap: 16px
	@media screen and (min-width: 1024px)
		height: calc(100vh - 56px)
		padding: 88px 40px 64px 40px
	@media screen and (max-width: 1023px)
		height: calc(100vh - 56px)
		padding: 88px 16px 64px 16px
		.rta-column
			align-items: flex-end
			text-align: right


</style>
