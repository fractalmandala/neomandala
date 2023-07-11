<script lang="ts">
	import { onMount } from 'svelte';
	import { allWebdev } from '$lib/utils/localpulls';
	import Meta from '$lib/components/Meta.svelte';
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

<Meta
	title={$pageTitle}
	metaDescription={$pageDescription}
	metaUrl={$pageUrl}
	metaImage={$shareImage}
/>

<div
	class="rta-column rowgap600 x00 minH"
	class:levelzero={$breakZero}
	class:levelone={$breakOne}
	class:leveltwo={$breakTwo}
	class:light={$themeMode}
	class:dark={!$themeMode}
>
	{#if pens && pens.length > 0}
		{#each pens as item}
			<a class="rta-column xleft grot ticket" href={item.linkpath}>
				<h4 class="tt-c hover p-bot-8">{item.meta.title}</h4>
				<p>{item.meta.description}</p>
				<small class="tt-u">{item.meta.type} | {item.meta.tags}</small>
			</a>
		{/each}
	{/if}
</div>

<style lang="sass">

.x00
	@media screen and (min-width: 1024px)
		padding: 64px
		align-items: center
		column-gap: 0
		.ticket
			width: 720px
	@media screen and (max-width: 1023px)
		padding: 16px
		.ticket
			width: 80%


.leveltwo.x00
	.ticket
		width: 100%

.ticket
	transition: all .3s 
	p
		color: var(--onlyblack)
		padding-top: 4px
	small
		color: #10D56C
		letter-spacing: 2px	
		font-size: 10px
	h4
		color: var(--texttwo)
		position: relative
		margin: 0
		line-height: 1
		&::after
			position: absolute
			bottom: 0
			left: 50%
			height: 1px
			background: #10D56C
			width: 0
			content: ''
			transition: 0.1s
		&:hover
			color: var(--background)
			&::after
				left: 0
				width: 100%


</style>
