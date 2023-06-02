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
	<div class="rta-column xcenter minH ycenter padded6 font">
		<img
			class="mandalaimage"
			src="/images/mands.webp"
			alt="mands"
			style="transform: rotate({scY / 3}deg)"
		/>
		<h2 class="gradienter tt-u">Fractal Maṇḍala</h2>
		<div class="grot p-bot-32 ta-c glass-bottom" use:reveal={{ delay: 500 }}>
			Here I document what I learn, build and write. <br />I develop web products, create historical
			fiction worlds, dabble in psytrance production<br /> and write essays on Indian history and civilizational
			consciousness.
		</div>
	</div>
	<div class="rta-grid grid4 padded6">
		{#if posts && posts.length > 0}
			{#each posts as item}
				<a
					class="rta-row colgap100 stay ybetween back height-40-40"
					href="/word/{item.slug}"
					style="background-image: url('{item.image}')"
				>
					<div class="rta-column rowgap100 null insider xcenter ycenter ta-c">
						<p class="green">{item.type}</p>
						<div class="font">
							<h5 class="white tt-c">{item.title}</h5>
						</div>
						<small class="green">{item.tags}</small>
					</div>
				</a>
			{/each}
		{/if}
	</div>
	<div class="rta-grid grid5 padded6">
		{#if images && images.length > 0}
			{#each images as item}
				<img src={item.link} alt={item.id} />
			{/each}
		{/if}
	</div>
</div>

<style lang="sass">

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
