<script lang="ts">
	import { onMount } from 'svelte';
	import {
		breakZero,
		breakOne,
		breakTwo,
		themeMode,
		pageTitle,
		pageDescription,
		shareImage,
		pageUrl
	} from '$lib/stores/globalstores';
	import Social from '$lib/components/SocialShare.svelte';
	import Gridder from '$lib/components/Gridder.svelte';
	import Parallax from '$lib/components/Parallax.svelte';
	import { page } from '$app/stores';
	import { thisWritings, pageWritings } from '$lib/utils/supabase';
	import { elementSizeStore } from '$lib/utils/elementsize';
	let theme: any;
	let image: any;
	let prevID: number;
	let nextID: number;
	let prevPost: any;
	let nextPost: any;
	let ref: HTMLElement | null = null;
	let y: number;
	let perCent: number;
	let nonSticky = false;

	export let data;

	prevID = data.id - 1;
	nextID = data.id + 1;

	$: size = elementSizeStore(ref);

	$: perCent = (y / 1400) * 100;
	$: twoPer = 100 - perCent;

	$: if (twoPer < 0) {
		nonSticky = true;
	} else {
		nonSticky = false;
	}

	$pageTitle = data.title;
	$pageDescription = data.description;
	$shareImage = data.image;
	$pageUrl = 'https://www.fractalmandala.in' + $page.url.pathname;

	onMount(async () => {
		theme = $page.url.pathname.slice(6);
		image = await thisWritings(theme);
		prevPost = await pageWritings(prevID);
		nextPost = await pageWritings(nextID);
	});
</script>

<svelte:window bind:scrollY={y} />
<div class="measure" style="width: {(y / $size.height) * 100}%" />
<div
	class="rta-column"
	bind:this={ref}
	class:levelzero={$breakZero}
	class:levelone={$breakOne}
	class:leveltwo={$breakTwo}
	class:light={$themeMode}
	class:dark={!$themeMode}
>
	<div
		class="x00 back sticky"
		style="background-image: url('{data.image}'); clip-path: circle({twoPer}%)"
		class:stickystop={nonSticky}
	/>
	<div class="twohundred" />
	<div class="thisguy rta-column xcenter ycenter null p-top-64 rowgap100 grot">
		<h1 class="ta-c tt-u bord-bot p-bot-32">{data.title}</h1>
		<Social />
	</div>

	<div class="rta-column x101 p-top-32">
		<div class="blogger p-bot-32">
			<svelte:component this={data.content} />
		</div>
		<div class="lowerone p-bot-32 bord-top p-top-32">
			<Social />
		</div>
		<div
			class="rta-row grot m-bot-32 null xcenter-d xcenter-m ta-c ycenter colgap200 p-top-16 p-bot-64"
		>
			{#if prevPost && prevPost.length > 0}
				{#each prevPost as item}
					<p>Next: <span class="green"><a href="/word/{item.slug}">{item.title}</a></span></p>
				{/each}
			{/if}
		</div>
	</div>
</div>

<style lang="sass">

.x101
	align-items: center


.leveltwo
	.blogger
		padding-left: 32px
		padding-right: 32px

.blogger
	@media screen and (min-width: 769px)
		width: 720px
		padding-left: 40px
		padding-right: 40px
		padding-top: 64px


.twohundred
	height: 100vh

.thisguy
	background: var(--this)

.sticky
	position: sticky
	top: 56px
	overflow: hidden
	transition: position 0.3s ease-in-out

.sticky.stickystop
	position: static

.measure
	height: 2px
	background: #10D56C
	position: fixed
	top: 0
	z-index: 20000

.levelzero, .levelone
	.lowerone
		display: none
	h1
		padding-left: 256px
		padding-right: 256px

.levelzero
	.thisguy
		padding-left: 40px
		padding-right: 40px
	.x00
		height: 100vh
		overflow: hidden

.levelone
	.x00
		height: 100vh
		overflow: hidden

.leveltwo
	.thisguy
		padding-left: 16px
		padding-right: 16px
	.x00
		height: 100vh
		overflow: hidden

</style>
