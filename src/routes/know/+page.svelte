<script lang="ts">
	import type { PageData } from './$types';
	import Meta from '$lib/components/Meta.svelte';
	import Notes from '$lib/notepad/Notes.svelte';
	import {
		indexName,
		indexCategory,
		indexLinks,
		indexTags,
		pageTitle,
		pageDescription,
		shareImage,
		pageUrl
	} from '$lib/stores/globalstores';
	export let data: PageData;
	let togglerInput = false;

	function toggleInput() {
		togglerInput = !togglerInput;
	}

	$indexCategory = '';
	$indexName = '';
	$indexLinks = {};
	$indexTags = '';
	$pageTitle = 'Knowledge Index at Fractal Maṇḍala';
	$pageDescription = 'The digital garden as a WIP and in indexed form...';
	$pageUrl = 'https://www.fractalmandala.in/know';
	$shareImage =
		'https://wganhlzrylmkvvaoalco.supabase.co/storage/v1/object/public/images/website/grid.webp';
</script>

<Meta
	title={$pageTitle}
	metaDescription={$pageDescription}
	metaUrl={$pageUrl}
	metaImage={$shareImage}
/>

<div class="rta-column rowgap300">
	{#if !togglerInput}
		<div class="rta-column grot rowgap200">
			<p>
				This is the main page for my digital garden. The sidebar on the left (top on mobile) lists
				all entries in it in alphabetical order. In time, I anticipate folders and sub-folders to
				emerge. This <a href="https://wiki.nikiv.dev/" target="_blank" rel="noreferrer"
					>digital garden</a
				> is my inspiration for building one, and at least initially I will try to follow the same template.
				I rarely use websites on mobile, and it's no different for this site as well. So development
				here will always be desktop-first, and mobile might often be broken.
			</p>
			<p>
				Each entry is accompanied by a set of related links, and appended with code snippets where
				relevant. The snippets are more for my own record. I also follow a tagging and
				categorisation system, let's call it the garden's <a href="/know/ontology">ontology.</a>
			</p>
			{#if data.in}
				<button on:click={toggleInput} class="mainbutton">Add Note</button>
			{/if}
		</div>
	{/if}
	{#if data.in && togglerInput}
		<button on:click={toggleInput} class="mainbutton">Exit</button>
		<Notes />
	{/if}
</div>
