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

<div class="font" class:light={$themeMode} class:dark={!$themeMode}>
	<div class="rta-column ybot minH">
		<div class="grot">
			<img
				class="mandalaimage"
				src="/images/mands.webp"
				alt="mands"
				style="transform: rotate({scY / 3}deg)"
			/>
			<p>a digital garden and buildstation</p>
		</div>
	</div>
	<div class="rta-grid ycenter grid4 minH">
		{#if posts && posts.length > 0}
			{#each posts as item}
				<div class="cellsx grot rta-column rowgap100 null xcenter ycenter ta-c p-all-16">
					<p class="green">{item.type}</p>
					<a class="grot" href="/word/{item.slug}">
						<h5 class="tt-c">{item.title}</h5>
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

.cellsx
	background: rgba(25, 25, 25 ,0.44)
	border-radius: 5px
	box-shadow: 4px 4px 12px rgba(0, 0 , 2, 0.1)
	transition: 0.1s
	&:hover
		box-shadow: 0 0 0 rgba(0, 0, 0, 0)
	h5
		color: white

.light
	background-color: hsla(0,0%,100%,1)
	background-image: radial-gradient(at 40% 20%, hsla(210,88%,66%,1) 0px, transparent 50%), radial-gradient(at 80% 0%, hsla(47,100%,56%,1) 0px, transparent 50%), radial-gradient(at 24% 48%, hsla(81,66%,49%,1) 0px, transparent 50%), radial-gradient(at 80% 50%, hsla(282,0%,100%,1) 0px, transparent 50%), radial-gradient(at 0% 100%, hsla(304,0%,100%,1) 0px, transparent 50%), radial-gradient(at 80% 100%, hsla(186,100%,70%,1) 0px, transparent 50%), radial-gradient(at 0% 0%, hsla(304,0%,100%,1) 0px, transparent 50%)
	.cell
		background: white
		border-radius: 4px

.minH
	padding: 56px 3.2vw

.cell
	height: calc(33vh - 37.33px)
	border-radius: 2px
	img
		transition: 0.3s
	&:hover
		img
			transform: scale(0.9)

.font
	display: flex
	flex-direction: column
	row-gap: 16px


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
