<script lang="ts">
	//@ts-nocheck
	import { onMount } from 'svelte';
	import Meta from '$lib/components/Meta.svelte';
	import { themeMode } from '$lib/stores/globalstores';
	import { page } from '$app/stores';
	import '$lib/styles/prism.css';
	import {
		indexName,
		indexCategory,
		indexLinks,
		indexTags,
		pageTitle,
		pageDescription,
		pageUrl,
		shareImage
	} from '$lib/stores/globalstores';
	import Prism from 'prismjs';
	export let data;

	$indexName = data.title;
	$indexCategory = data.synapse;
	$indexLinks = data.links;
	$indexTags = data.tags;
	$pageTitle = 'Entry for ' + data.title;
	$pageDescription = 'An entry in the knowledge index.';
	$pageUrl = 'https://www.fractalmandala.in' + $page.url.pathname;
	$shareImage =
		'https://wganhlzrylmkvvaoalco.supabase.co/storage/v1/object/public/images/website/grid.webp';

	onMount(() => {
		Prism.highlightAll();
	});
</script>

<Meta
	title={$pageTitle}
	metaDescription={$pageDescription}
	metaUrl={$pageUrl}
	metaImage={$shareImage}
/>

<div class="contentbox" class:light={$themeMode} class:dark={!$themeMode}>
	<div class="rta-column rowgap100 null bord-bot p-bot-16">
		<h3>{data.title}</h3>
		<small><span class="tt-u green">{$indexCategory}</span> | {$indexTags}</small>
	</div>
	<div class="content p-top-32">
		<svelte:component this={data.content} />
	</div>
</div>

<style lang="sass">

.contentbox
	h3
		border-top: none
		margin: 0
		padding: 0
	small
		color: var(--texttwo)

.content
	display: flex
	flex-direction: column
	row-gap: 20px

</style>
