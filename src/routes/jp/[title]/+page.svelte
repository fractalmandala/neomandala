<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { page } from '$app/stores';
	import type { Writeup } from '$lib/dash/notesutil';
	import { updateExistingWrite } from '$lib/dash/notesutil';
	import { thisChap } from '$lib/stores/globalstores';
	import { Editor } from '@tiptap/core';
	import StarterKit from '@tiptap/starter-kit';
	import { Markdown } from 'tiptap-markdown';
	import '$lib/styles/tiptap.sass';
	export let data: Writeup = {
		title: '',
		content: '',
		type: ''
	};

	let element: any;
	let editor: any;
	let title: any;
	let html: any;
	let markdownOutput: any;
	let xman: any;

	$: xman = $page.url.pathname;

	$: if (xman) {
		$thisChap = data.content;
	}

	function handleUpdate() {
		updateExistingWrite(title, $thisChap, 'janapada');
	}

	onMount(() => {
		$thisChap = data.content;
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
			content: $thisChap,
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

<div class="grot null rta-column rowgap500 janapadapage">
	<div class="rta-row colgap100 ycenter between">
		<input type="text" bind:value={title} placeholder={data.title} />
		<button class="genbutton" on:click={handleUpdate}>Save</button>
	</div>
	<pre class="rta-column rowgap300">
		<div class="editingonpage" bind:this={element} />
	</pre>
</div>

<style lang="sass">

.rta-row
	input
		font-size: 32px
		font-family: 'Space Grotesk', sans-serif
		font-weight: bold
		border: 1px solid var(--contraster)
		border-radius: 4px
		color: var(--background)

</style>
