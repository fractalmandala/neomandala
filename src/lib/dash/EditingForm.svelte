<script lang="ts">
	import { onMount, afterUpdate } from 'svelte';
	import { notesDiary, deleteNoteItem } from '$lib/dash/notesutil';
	import { showNote, noteStore } from '$lib/dash/alerts';
	import { slide } from 'svelte/transition';
	import StarterKit from '@tiptap/starter-kit';
	import { addNewNote } from '$lib/dash/notesutil';
	import { textareaAutosizeAction } from '$lib/gpt/textautoresize';
	import { Editor } from '@tiptap/core';
	import Zap from '$lib/design/iconset/zap.svelte';

	let element: any;
	let editor: any;
	export let content = '';

	onMount(() => {
		editor = new Editor({
			element: element,
			extensions: [StarterKit],
			content: content,
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

<div class="tiptap">
	<div class="null" bind:this={element} />
</div>

<style lang="sass">

.tiptap
	border: 1px solid var(--contraster)
</style>
