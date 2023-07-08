<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import supabase from '$lib/utils/supastream';
	import { showNote } from '$lib/dash/alerts';
	import { marked } from 'marked';
	import { goto } from '$app/navigation';
	import {
		breakZero,
		breakOne,
		breakTwo,
		noteName,
		showSave,
		hideSave,
		headTitle
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

	async function deleteNote() {
		const { error } = await supabase.from('db-notes').delete().eq('id', data.id);
		if (error) {
			showNote('error!', true);
		} else {
			showNote('deleted!', false);
			navigateToLink();
		}
	}

	async function navigateToLink(): Promise<void> {
		await goto('/notes');
	}

	$: $headTitle = 'notes';

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

<div
	class="grot rta-column rowgap300"
	class:lzero={$breakZero}
	class:lone={$breakOne}
	class:ltwo={$breakTwo}
>
	<div class="rta-row ycenter between stripunos">
		<div class="notetitle">{data.title}</div>
		<div class="rta-row colgap200 ycenter">
			<button class="zoom-button" on:click={saveNote}>Save</button>
			<button class="zoom-button" on:click={deleteNote}>Delete</button>
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
