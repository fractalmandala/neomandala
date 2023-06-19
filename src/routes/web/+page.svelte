<script lang="ts">
	import { onMount } from 'svelte';
	import { allWebdev } from '$lib/utils/localpulls';
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

	let pens: any;

	$pageTitle = 'WebDev at Fractal Maṇḍala';
	$pageDescription = 'Mostly Sveltekit dev guides and snippets';
	$shareImage =
		'https://wganhlzrylmkvvaoalco.supabase.co/storage/v1/object/public/images/website/grid.webp';
	$pageUrl = 'https://www.fractalmandala.in/web';

	onMount(async () => {
		pens = await allWebdev();
	});
</script>

<div
	class="rta-grid grid2 colgap400 rowgap400 x00"
	class:levelzero={$breakZero}
	class:levelone={$breakOne}
	class:leveltwo={$breakTwo}
	class:light={$themeMode}
	class:dark={!$themeMode}
>
	{#if pens && pens.length > 0}
		{#each pens as item}
			<a class="rta-column ybetween grot ticket" href={item.linkpath}>
				<h5 class="white tt-c hover">{item.meta.id} - {item.meta.title}</h5>
				<small>{item.meta.type} | {item.meta.tags}</small>
			</a>
		{/each}
	{/if}
</div>

<style lang="sass">

.x00
	@media screen and (min-width: 1024px)
		padding: 40px
	@media screen and (max-width: 1023px)
		padding: 16px


.leveltwo.x00
	.ticket
		width: 100%
		border-radius: 4px

.ticket
	border-radius: 4px
	transition: all .3s 
	padding: 16px
	small
		color: var(--greyish)
	&:hover
		h5
			color: #10D56C

.dark
	.ticket
		background: #121212
		&:hover
			box-shadow: 4px 4px 8px #070707

.light
	.ticket
		background: #f7f7f7
		&:hover
			box-shadow: 4px 4px 8px #e7e7e7

</style>
