<script lang="ts">
	//@ts-nocheck
	import { onMount } from 'svelte';
	import { themeMode } from '$lib/stores/globalstores';
	import '$lib/styles/prism.css';
	import { indexName, indexCategory, indexLinks, indexTags } from '$lib/stores/globalstores';
	import Prism from 'prismjs';
	export let data;

	$indexName = data.title;
	$indexCategory = data.synapse;
	$indexLinks = data.links;
	$indexTags = data.tags;

	onMount(() => {
		Prism.highlightAll();
	});
</script>

<div class="contentbox" class:light={$themeMode} class:dark={!$themeMode}>
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
