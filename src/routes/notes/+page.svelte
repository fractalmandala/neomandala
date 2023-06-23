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

	let title: string;
	let element: any;
	let editor: any;
	let html: any;
	let markdownOutput: any;

	marked.use({
		headerIds: false,
		mangle: false
	});

	export async function newNote() {
		const { error } = await supabase.from('db-notes').insert({ title: title, content: html });
		if (error) {
			showNote('error!', true);
		} else showNote('done!', false);
	}

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

<div
	class="grot storex rta-column rowgap300"
	class:lzero={$breakZero}
	class:lone={$breakOne}
	class:ltwo={$breakTwo}
>
	<div class="rta-row ycenter between">
		<input type="text" bind:value={title} placeholder={title} />
		<button on:click={newNote}>Save</button>
	</div>
	<div class="notesguy" bind:this={element} />
</div>

<style lang="sass">

.notesguy
	position: relative
	border-radius: 5px 0 0 0
	padding: 8px
	&::before
		position: absolute
		border-radius: 5px 0 0 0
		top: 0
		left: 0
		content: ''
		background: #10D56C
		height: 1px
		width: 64px
	&::after
		position: absolute
		border-radius: 5px 0 0 0
		top: 0
		left: 0
		content: ''
		background: #10D56C
		height: 64px
		width: 1px

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
