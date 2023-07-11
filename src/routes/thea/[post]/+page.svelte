<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import Meta from '$lib/components/Meta.svelte';
	import { saveThea } from '$lib/utils/supastream';
	import { marked } from 'marked';
	import {
		breakZero,
		breakOne,
		breakTwo,
		noteName,
		showSave,
		hideSave,
		headTitle,
		pageTitle,
		pageDescription,
		pageUrl,
		shareImage
	} from '$lib/stores/globalstores';
	import { Editor } from '@tiptap/core';
	import StarterKit from '@tiptap/starter-kit';
	import { Markdown } from 'tiptap-markdown';
	import '$lib/styles/tiptap.sass';
	export let data;
	let element: any;
	let editor: any;
	let title: any;
	let markdownOutput: any;

	marked.use({
		headerIds: false,
		mangle: false
	});

	let processed = marked(data.content);

	async function handleSave() {
		saveThea(markdownOutput, data.id);
	}

	$: if (data) {
		$noteName = data.title;
		showSave('SAVE');
	}

	$: $headTitle = 'thea';
	$pageTitle = 'Videos at Fractal Maṇḍala';
	$pageDescription = 'Talks and dialogues on itihāsa, dharma, bhārata...';
	$pageUrl = 'https://www.fractalmandala.in/video';
	$shareImage =
		'https://wganhlzrylmkvvaoalco.supabase.co/storage/v1/object/public/images/website/grid.webp';

	onMount(() => {
		return (editor = new Editor({
			element: element,
			extensions: [
				StarterKit,
				Markdown.configure({
					html: true,
					tightLists: true,
					bulletListMarker: '-'
				})
			],
			content: processed,
			onTransaction: () => {
				// force re-render so `editor.isActive` works as expected
				editor = editor;
			},
			onUpdate: ({ editor }) => {
				markdownOutput = editor.storage.markdown.getMarkdown();
			}
		}));
	});

	onDestroy(() => {
		if (editor) {
			editor.destroy();
		}
		$noteName = '';
		hideSave();
	});
</script>

<Meta
	title={$pageTitle}
	metaDescription={$pageDescription}
	metaUrl={$pageUrl}
	metaImage={$shareImage}
/>

<div
	class="rta-column rowgap300 grot"
	class:lzero={$breakZero}
	class:lone={$breakOne}
	class:ltwo={$breakTwo}
>
	<div class="rta-row ycenter between stripunos">
		<div class="notetitle">{data.title}</div>
		<div class="rta-row colgap200 ycenter">
			<button class="zoom-button">Save</button>
			<button class="zoom-button">Delete</button>
		</div>
	</div>
	<div class="notecontainer rta-column">
		<div class="notesguy" bind:this={element} />
	</div>
</div>

<style lang="sass">

.stripunos
	border-bottom: 1px solid var(--contraster)

.lzero
	.stripunos
		height: 40px
		padding-left: 32px
		padding-right: 32px
		position: sticky
		top: 40px
		background: var(--this)
		z-index: 50
		.zoom-button
			width: 56px
		.notetitle
			color: var(--texttwo)
			font-size: 24px
			font-family: 'CommitMono', sans-serif
	.notecontainer
		.notesguy
			width: 56vw
			min-height: 64vh

.notesguy
	border-radius: 5px 0 0 0
	padding: 8px


</style>
