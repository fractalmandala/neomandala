<script lang="ts">
	import { onMount, afterUpdate } from 'svelte';
	import supabase from '$lib/utils/supabase';
	import Box from '$lib/design/iconset/box.svelte';
	import StarterKit from '@tiptap/starter-kit';
	import { Editor } from '@tiptap/core';
	import NewIndex from '$lib/dash/NewIndex.svelte';
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

	export let data;
	let element: any;
	let editor: any;
	let name = 'name';
	let content = '';
	let image = 'image';
	let links = '';
	let tags = 'tags';
	let synapse = '';
	let slug = 'slug';

	$indexCategory = '';
	$indexLinks = {};
	$indexTags = '';
	$pageTitle = 'Knowledge Index at Fractal Maṇḍala';
	$pageDescription = 'The digital garden as a WIP and in indexed form...';
	$pageUrl = 'https://www.fractalmandala.in/know';
	$shareImage =
		'https://wganhlzrylmkvvaoalco.supabase.co/storage/v1/object/public/images/website/grid.webp';

	function handleTitleFocus() {
		name = '';
	}

	function handleTagsFocus() {
		tags = '';
	}

	onMount(() => {
		editor = new Editor({
			element: element,
			extensions: [StarterKit],
			content: '',
			parseOptions: {
				preserveWhitespace: 'full'
			},
			onTransaction: () => {
				// force re-render so `editor.isActive` works as expected
				editor = editor;
			}
		});
	});

	afterUpdate(() => {
		content = editor.getText({ blockSeparator: '\n\n' });
	});
</script>

<div class="rta-column rowgap300 pagemin">
	<div class="rta-column mainpage grot rowgap200">
		<p>
			This is the main page for my digital garden. The sidebar on the left (top on mobile) lists all
			entries in it in alphabetical order. In time, I anticipate folders and sub-folders to emerge.
			This <a href="https://wiki.nikiv.dev/" target="_blank" rel="noreferrer">digital garden</a> is my
			inspiration for building one, and at least initially I will try to follow the same template. I
			rarely use websites on mobile, and it's no different for this site as well. So development here
			will always be desktop-first, and mobile might often be broken.
		</p>
		<p>
			Each entry is accompanied by a set of related links, and appended with code snippets where
			relevant. The snippets are more for my own record. I also follow a tagging and categorisation
			system, let's call it the garden's ontology.
		</p>
	</div>
	{#if data.in === true}
		<div class="newindex bord-bot p-bot-32">
			<NewIndex />
		</div>
	{/if}
</div>
