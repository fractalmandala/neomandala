<script lang="ts">
	import { onMount } from 'svelte';
	import { breakZero, breakOne, breakTwo, themeMode, readingMode } from '$lib/stores/globalstores';
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

	onMount(async () => {
		theme = $page.url.pathname.slice(6);
		image = await thisWritings(theme);
		prevPost = await pageWritings(prevID);
		nextPost = await pageWritings(nextID);
	});
</script>

<svelte:window bind:scrollY={y} />

<div
	class="rta-column"
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
	<div class="thisguy rta-column xcenter ycenter minH null p-top-64 grot">
		<div class="greenlabel">{data.type}</div>
		<h1 class="noh ta-c tt-u bord-bot p-bot-64">{data.title}</h1>
		<Social />
	</div>

	<div class="rta-column p-top-64">
		<div class="measure" style="width: {(y / $size.height) * 100}%" />

		<div class="blogposter adobe p-top-64" bind:this={ref}>
			<svelte:component this={data.content} />
		</div>
		<div class="lowerone p-bot-32">
			<Social />
		</div>
		<div class="rta-row grot m-bot-32 null xcenter-d ta-c ycenter colgap200 p-top-64 p-bot-64">
			{#if prevPost && prevPost.length > 0}
				{#each prevPost as item}
					<p>Next: <span class="green"><a href="/word/{item.slug}">{item.title}</a></span></p>
				{/each}
			{/if}
		</div>
	</div>
</div>

<style lang="sass">

.levelzero
	.blogposter
		padding-left: 25vw
		padding-right: 25vw

.levelone
	.blogposter
		padding-left: 64px
		padding-right: 64px

.leveltwo
	.blogposter
		padding-left: 32px
		padding-right: 32px


.twohundred
	height: 100vh

.thisguy
	background: var(--this)

.sticky
	position: sticky
	top: 0
	overflow: hidden
	transition: position 0.3s ease-in-out

.sticky.stickystop
	position: static

.greenlabel
	background: #10D56C
	color: white
	text-transform: uppercase
	font-size: 13px
	padding: 2px 6px
	text-align: center
	width: max-content
	max-content: 200px

.measure
	height: 4px
	background: #10D56C
	position: sticky
	top: 0
	z-index: 1200

.levelzero, .levelone
	.lowerone
		display: none

.levelzero
	.thisguy
		padding-left: 128px
		padding-right: 128px
	.x00
		height: 100vh
		overflow: hidden

.levelone
	.x00
		height: 100vh
		overflow: hidden

.leveltwo
	.thisguy
		padding-left: 32px
		padding-right: 32px
	.x00
		height: 50vh
		overflow: hidden

</style>
