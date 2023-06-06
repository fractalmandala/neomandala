<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { Editor } from '@tiptap/core';
	import StarterKit from '@tiptap/starter-kit';
	import { Markdown } from 'tiptap-markdown';
	import BubbleMenu from '@tiptap/extension-bubble-menu';
	import { showChip } from '$lib/stores/modalstores';
	import supabase from '$lib/utils/supabase';
	export let data;

	let element: any;
	let editor: any;
	let title = '';
	let html: any;
	let prefill = '';
	let markdownOutput: any;

	let validator = false;

	$: if (markdownOutput === '' || title === '') {
		validator = false;
	} else {
		validator = true;
	}

	async function updateTitle() {
		const { error } = await supabase.from('db-janapada').update({ title: title }).eq('id', data.id);
		if (error) {
			showChip('error', '#fe4a49');
		} else {
			showChip('done', '#10D56C');
			prefill = '';
			title = '';
		}
	}

	async function updateText() {
		const { error } = await supabase
			.from('db-janapada')
			.update({ content: markdownOutput })
			.eq('id', data.id);
		if (error) {
			showChip('error', '#fe4a49');
		} else {
			showChip('done', '#10D56C');
			prefill = '';
			title = '';
		}
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
				}),
				BubbleMenu.configure({})
			],
			content: data.content,
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
	<div class="grot p-bot-16 colgap200 rta-row">
		<input type="text" bind:value={title} placeholder={data.title} />
		<button class="genbutton" on:click={updateTitle}>Confirm</button>
	</div>
	<div class="rta-column rowgap200">
		<button class="genbutton" on:click={updateText}>Save</button>
		<div class="edits" bind:this={element} data-lenis-prevent />
	</div>
</div>

<style lang="sass">

.edits
	row-gap: 24px
	font-family: 'Space Grotesk', sans-serif
	font-size: 18px
	line-height: 1.5

</style>
