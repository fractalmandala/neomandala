<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import Meta from '$lib/components/Meta.svelte';
	import supabase from '$lib/utils/supastream';
	import { showNote } from '$lib/dash/alerts';
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

	let title: string = 'Note Title';
	let element: any;
	let editor: any;
	let html: any;
	let markdownOutput: any;

	marked.use({
		headerIds: false,
		mangle: false
	});

	function onFocus() {
		if (title === 'Note Title') {
			title = '';
		}
	}

	function onBlur() {
		if (title === '') {
			title = 'Note Title';
		}
	}

	export async function newNote() {
		const { error } = await supabase.from('db-notes').insert({ title: title, content: html });
		if (error) {
			showNote('error!', true);
		} else showNote('done!', false);
	}

	$: $headTitle = 'notes';

	onMount(() => {
		$headTitle = 'notes';
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
			content: '',
			onTransaction: () => {
				// force re-render so `editor.isActive` works as expected
				editor = editor;
			},
			onUpdate: ({ editor }) => {
				markdownOutput = editor.storage.markdown.getMarkdown();
				html = editor.getHTML();
			}
		}));
	});

	onDestroy(() => {
		if (editor) {
			editor.destroy();
		}
	});
</script>

<Meta
	title={$pageTitle}
	metaDescription={$pageDescription}
	metaUrl={$pageUrl}
	metaImage={$shareImage}
/>

<div
	class="grot rta-column rowgap300"
	class:lzero={$breakZero}
	class:lone={$breakOne}
	class:ltwo={$breakTwo}
>
	<div class="rta-row ycenter between stripunos">
		<input type="text" bind:value={title} placeholder={title} on:focus={onFocus} on:blur={onBlur} />
		<button class="zoom-button" on:click={newNote}>
			<span class="sp1" />
			<span class="sp2" />
			<span class="sp3" />
			<span class="sp4" />
			Save
		</button>
	</div>
	<div class="notecontainer rta-column">
		<div class="notesguy" bind:this={element} />
	</div>
</div>
