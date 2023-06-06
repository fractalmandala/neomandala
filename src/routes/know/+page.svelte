<script lang="ts">
	import { onMount, afterUpdate } from 'svelte';
	import supabase from '$lib/utils/supabase';
	import Box from '$lib/design/iconset/box.svelte';
	import StarterKit from '@tiptap/starter-kit';
	import { Editor } from '@tiptap/core';
	import NewIndex from '$lib/dash/NewIndex.svelte';
	import { indexName, indexCategory, indexLinks, indexTags } from '$lib/stores/globalstores';

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

	$indexName = '';
	$indexCategory = '';
	$indexLinks = {};

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

<div class="rta-column">
	{#if data.in === true}
		<div class="newindex bord-bot p-bot-32">
			<NewIndex />
		</div>
	{/if}
	<div class="rta-column mainpage grot rowgap200 p-top-32">
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
		<h5>Ontology</h5>
		<p>
			The tags for any entry are straightforward, I haven't put excess thought into them and usually
			go for the first tags that come to mind. Over a longer period this will require pruning and
			that's okay- let the tag discreteness emerge on its own.
		</p>
		<p>
			The category though is a more complex matter. Here I use an experimental taxonomy of my own
			conception. The idea is to categorize all entries through a framework that is rooted in
			Dhārmika paradigm. Complete details on this can be read in my long essay on Synaptic
			Reconnection. It's helpful to keep in mind that these categories are a mix of 1) classifying
			an entry in terms of what it is; and 2) classifying it in terms of its qualia-
			good/bad/useful/desirable/etc. Here, I provide only a summary:
		</p>
		<ol>
			<li>
				<b>Kṛt: </b> All entries that pertain to creation and/or design. Example- web development, graphics,
				Tiptap, and more.
			</li>
			<li><b>Ṛt: </b>Entries pertaining to science and/or objective reality.</li>
			<li>
				<b>Dhṛt: </b>A qualifying category, containing entries that relate to continuity, tradition,
				order.
			</li>
			<li>
				<b>Bhṛt: </b>A qualifying category, containing entries that I qualify as helpful towards
				furtherance, bearing forth.
			</li>
			<li>
				<b>Ghṛt: </b>A qualifying category, containing entries that represent the "best of"
				something. I often put people in this category, such as Camus.
			</li>
		</ol>
	</div>
</div>

<style lang="sass">

.rta-column
	width: 100%

.mainpage
	h5
		padding: 48px 0 16px 0

</style>
