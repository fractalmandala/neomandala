<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { Editor } from '@tiptap/core';
	import StarterKit from '@tiptap/starter-kit';
	import { Markdown } from 'tiptap-markdown';
	import { addNewNote } from '$lib/dash/notesutil';
	import { showChip } from '$lib/stores/modalstores';
	import supabase from '$lib/utils/supabase';

	let element: any;
	let editor: any;
	let title = '';
	let html: any;
	let prefill = '';
	let markdownOutput: any;

	let validator = false;

	function handleSubmit() {
		addNewNote(title, markdownOutput);
	}

	$: if (markdownOutput === '' || title === '') {
		validator = false;
	} else {
		validator = true;
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
			editorProps: {
				attributes: {
					class: 'bigpad'
				}
			},
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

<div class="rta-column">
	{#if editor}
		<div class="inputtiptap rta-row between colgap100">
			<input type="text" bind:value={title} />
			<div class="rta-row colgap100 buttons">
				<button
					on:click={() => editor.chain().focus().undo().run()}
					disabled={!editor.can().chain().focus().undo().run()}
					class="blank-button"
				>
					<svg
						width="16"
						height="16"
						viewBox="0 0 24 24"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							d="M5.82843 6.99858L8.36396 9.53412L6.94975 10.9483L2 5.99858L6.94975 1.04883L8.36396 2.46305L5.82843 4.99858H13C17.4183 4.99858 21 8.5803 21 12.9986C21 17.4168 17.4183 20.9986 13 20.9986H4V18.9986H13C16.3137 18.9986 19 16.3123 19 12.9986C19 9.68487 16.3137 6.99858 13 6.99858H5.82843Z"
							fill="#676767"
						/>
					</svg>
				</button>
				<button
					on:click={() => editor.chain().focus().redo().run()}
					disabled={!editor.can().chain().focus().redo().run()}
					class="blank-button"
				>
					<svg
						width="16"
						height="16"
						viewBox="0 0 24 24"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							d="M18.1716 6.99858H11C7.68629 6.99858 5 9.68487 5 12.9986C5 16.3123 7.68629 18.9986 11 18.9986H20V20.9986H11C6.58172 20.9986 3 17.4168 3 12.9986C3 8.5803 6.58172 4.99858 11 4.99858H18.1716L15.636 2.46305L17.0503 1.04883L22 5.99858L17.0503 10.9483L15.636 9.53412L18.1716 6.99858Z"
							fill="#676767"
						/>
					</svg>
				</button>
				{#if validator}
					<button class="genbutton" on:click={handleSubmit}>Submit</button>
				{/if}
			</div>
		</div>
	{/if}
	<div class="inputtiptapeditor" bind:this={element} data-lenis-prevent />
</div>

<style lang="sass">

.rta-row
	column-gap: 1.6vw

.inputtiptapeditor
	border: 1px solid var(--onlyblack)
	padding: 8px
	border-radius: 0 0 4px 4px
	min-height: 400px

.inputtiptap
	padding: 8px
	border-radius: 4px 4px 0 0
	input
		border-bottom: 1px solid var(--onlyblack)
		border-top: none
		border-left: none
		border-right: none
		color: white
		padding: 2px 4px
		border-radius: 4px
		background: none
		outline: none
		width: calc(100% - 120px)
		font-family: 'Space Grotesk', sans-serif


</style>
