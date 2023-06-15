<script lang="ts">
	//@ts-nocheck
	import { onMount } from 'svelte';
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

<div class="contentbox pagemin" class:light={$themeMode} class:dark={!$themeMode}>
	<div class="content">
		<svelte:component this={data.content} />
	</div>
</div>

<style lang="sass">


.content
	display: flex
	flex-direction: column
	row-gap: 20px

</style>
