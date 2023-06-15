<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { Editor } from '@tiptap/core';
	import StarterKit from '@tiptap/starter-kit';
	import { Markdown } from 'tiptap-markdown';
	import supabase from '$lib/utils/supabase';
	import { showNote } from '$lib/dash/alerts';
	import '$lib/styles/tiptap.sass';
	import { addNewWrite } from '$lib/dash/notesutil';

	let element: any;
	let editor: any;
	let title = 'title';
	let html: any;
	let prefill = '';
	let markdownOutput: any;
	let category = '';
	let agent = '';

	async function handleSubmit() {
		addNewWrite(title, markdownOutput, category);
		title = '';
		prefill = '';
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
			content: prefill,
			onTransaction: () => {
				// force re-render so `editor.isActive` works as expected
				editor = editor;
			},
			onUpdate: ({ editor }) => {
				html = editor.getHTML();
				markdownOutput = editor.storage.markdown.getMarkdown();
			}
		}));
	});

	onDestroy(() => {
		if (editor) {
			editor.destroy();
		}
	});
</script>

<div class="rta-column rowgap200 writingform">
	<div class="rta-row ycenter between">
		<input type="text" bind:value={title} />
		<button class="glass" on:click={handleSubmit}> Submit </button>
	</div>
	<select bind:value={category}>
		<option value="janapada">Janapada</option>
		<option value="misc">Misc</option>
	</select>
	<div class="janapadainput" bind:this={element} />
</div>

<style lang="sass">

button.glass
	color: var(--background)
	padding: 2px 8px

.writingform
	border-radius: 8px
	@media screen and (min-width: 1024px)
		width: 720px
		padding: 16px
		margin-left: 64px
		min-height: calc(100vh - 200px)

.janapadainput
	overflow-y: scroll
	border: 1px solid var(--contraster)
	border-radius: 4px

.rta-row
	flex-wrap: nowrap

input[type=text]
	border: none
	background: none
	padding: 4px 8px
	color: #272727
	font-size: 32px
	text-transform: capitalize
	font-family: 'Space Grotesk', sans-serif

</style>
