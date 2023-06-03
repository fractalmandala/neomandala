<script lang="ts">
	import { onMount } from 'svelte';
	import { reveal } from 'svelte-reveal';
	import Parallax from '$lib/components/Parallax.svelte';
	import Parallax2 from '$lib/components/Parallax.svelte';
	import Gridder from '$lib/components/Gridder.svelte';
	import { psyImages, featuredWritings } from '$lib/utils/supabase';
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
		})();
	});
</script>

<svelte:head>
	<title>Fractal Maṇḍala | digital garden and buildstation</title>
</svelte:head>

<svelte:window bind:scrollY={scY} />

<div class="font">
	<div class="rta-column ybot minH">
		<div class="cell grot">
			<img
				class="mandalaimage"
				src="/images/mands.webp"
				alt="mands"
				style="transform: rotate({scY / 3}deg)"
			/>
			<h4>FRACTAL MAṆḌALA</h4>
			<p>a digital garden and buildstation</p>
		</div>
	</div>
	<div class="rta-grid ycenter grid4 minH">
		{#if posts && posts.length > 0}
			{#each posts as item}
				<div class="grot rta-column rowgap100 null xcenter ycenter ta-c">
					<p class="green">{item.type}</p>
					<a class="grot" href="/word/{item.slug}">
						<h5 class="white tt-c">{item.title}</h5>
					</a>
					<small class="green">{item.tags}</small>
				</div>
			{/each}
		{/if}
		{#if images && images.length > 0}
			{#each images as item}
				<div class="cell">
					<img src={item.link} alt={item.id} />
				</div>
			{/each}
		{/if}
	</div>
</div>

<style lang="sass">

.minH
	padding: 56px 3.2vw

.rta-column
	.cell
		width: 25%

.cell
	height: calc(33vh - 37.33px)
	border: 2px solid var(--liner)
	border-radius: 2px
	@media screen and (min-width: 769px)
		padding: 16px

.font
	display: flex
	flex-direction: column
	row-gap: 16px

.rta-grid.grid5
	img
		object-fit: cover
		width: 100%
		height: 40vh

.mandalaimage
	width: 100px
	height: 100px
	transform-origin: center center
	margin-left: auto
	margin-right: auto

@media screen and (max-width: 768px)
	.rta-grid
		margin-left: 0

</style>
