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
	class="rta-grid grid4 colgap400 rowgap400 x00"
	class:levelzero={$breakZero}
	class:levelone={$breakOne}
	class:leveltwo={$breakTwo}
	class:light={$themeMode}
	class:dark={!$themeMode}
>
	{#if pens && pens.length > 0}
		{#each pens as item}
			<a class="rta-column ybetween rowgap400 grot ticket" href={item.linkpath}>
				<div class="rta-column rowgap100 null p-all-16 ticket2">
					<h5 class="white tt-c hover">{item.meta.id} - {item.meta.title}</h5>
					<p>{item.meta.type} | {item.meta.tags}</p>
				</div>
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
	.ticket, .ticket2
		width: 100%
		border-radius: 8px

.ticket
	border-radius: 8px
	width: 256px
	transition: all .3s 
	@media screen and (min-width: 1024px)
		height: 186px
	@media screen and (max-width: 1023px)
		height: 100%

.ticket2
	width: 256px
	transition: all .2s
	border-radius: 8px
	transform: scale(0.998)
	&:hover 
		transform: scale(0.98) 
		border-radius: 8px 
	@media screen and (min-width: 1024px)
		height: 186px

.dark
	.ticket
		background-image: linear-gradient(163deg, rgba(16, 213, 108, 1) 0%, rgba(255, 255, 255, 1) 100%)
		&:hover 
			box-shadow: 0px 0px 30px 1px rgba(0, 255, 117, 0.30) 
			background-image: linear-gradient(163deg, rgba(16, 213, 108, 1) 0%, rgba(255, 255, 255, 1) 100%) 	
	.ticket2
		background-color: #1a1a1a 

.light
	.ticket
		background-image: linear-gradient(163deg, rgba(16, 213, 108, 1) 0%, rgba(255, 255, 255, 1) 100%) 	

</style>
