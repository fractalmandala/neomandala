<script lang="ts">
	import { onMount } from 'svelte';
	import { breakZero, breakOne, breakTwo, themeMode, readingMode } from '$lib/stores/globalstores';
	import GPTParser from '$lib/components/GPTParser.svelte';
	import { browser } from '$app/environment';
	import Parallax from '$lib/components/Parallax.svelte';
	import { page } from '$app/stores';
	import { thisWritings, pageWritings } from '$lib/utils/supabase';
	import { elementSizeStore } from '$lib/utils/elementsize';
	import Pagination from '$lib/components/Pagination.svelte';
	import ChevFRight from '$lib/icons/ChevFRight.svelte';
	import ChevFLeft from '$lib/icons/ChevFLeft.svelte';
	let theme: any;
	let image: any;
	let prevID: number;
	let nextID: number;
	let prevPost: any;
	let nextPost: any;
	let ref: HTMLElement | null = null;
	let y: number;

	export let data;

	prevID = data.id - 1;
	nextID = data.id + 1;

	$: size = elementSizeStore(ref);

	$: perCent = y / $size.height;

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
	<div class="x00">
		<Parallax --parallax="url('{data.image}')" />
	</div>
	<div class="rta-column p-top-64">
		<h6 class="ta-c gradienter p-bot-32">{data.type}</h6>
		<h2 class="noh ta-c tt-u bord-bot p-bot-64">{data.title}</h2>
	</div>

	<div class="shellmain rta-column p-top-64" bind:this={ref}>
		<div class="thisispost p-top-64">
			<svelte:component this={data.content} />
		</div>
		<div class="rta-row bord-top m-bot-32 null ycenter colgap200 p-top-32">
			<h6>Next:</h6>
			{#if prevPost && prevPost.length > 0}
				{#each prevPost as item}
					<p class="green"><a href="/word/{item.slug}">{item.title}</a></p>
				{/each}
			{/if}
		</div>
	</div>
</div>

<style lang="sass">


.x00
    height: 100vh
    overflow: hidden

</style>
