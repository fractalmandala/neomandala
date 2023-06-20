<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import supabase from '$lib/utils/supastream';
	import { showNote } from '$lib/dash/alerts';
	import { marked } from 'marked';
	import {
		breakZero,
		breakOne,
		breakTwo,
		noteName,
		showSave,
		hideSave
	} from '$lib/stores/globalstores';
	import { Editor } from '@tiptap/core';
	import StarterKit from '@tiptap/starter-kit';
	import { Markdown } from 'tiptap-markdown';
	import '$lib/styles/tiptap.sass';
	export let data;
	let element: any;
	let editor: any;
	let title: any;
	let html: any;
	let markdownOutput: any;

	marked.use({
		headerIds: false,
		mangle: false
	});

	let processed = marked(data.content);

	export async function saveNote() {
		const { error } = await supabase.from('db-notes').update({ content: html }).eq('id', data.id);
		if (error) {
			showNote('error!', true);
		} else showNote('done!', false);
	}

	$: if (data) {
		$noteName = data.title;
		showSave('SAVE');
	}

	onMount(() => {
		$noteName = data.title;
		showSave('SAVE');
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
				html = editor.getHTML();
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

<div
	class="grot storex rta-column rowgap300"
	class:lzero={$breakZero}
	class:lone={$breakOne}
	class:ltwo={$breakTwo}
>
	<button on:click={saveNote}>Save</button>
	<div class="notesguy" bind:this={element} />
</div>

<style lang="sass">

.storex
	width: 100vw

.storex.lzero
	padding-top: 32px
	padding-bottom: 64px
	width: 680px
	margin-left: calc(25vw - 240px)

.storex.ltwo, .storex.lone
	padding: 32px

</style>
