<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { marked } from 'marked';
	import { breakZero, breakOne, breakTwo } from '$lib/stores/globalstores';
	import { Editor } from '@tiptap/core';
	import StarterKit from '@tiptap/starter-kit';
	import { Markdown } from 'tiptap-markdown';
	import '$lib/styles/tiptap.sass';
	export let data;
	let element: any;
	let editor: any;
	let title: any;
	let markdownOutput: any;
	let processed = marked(data.content);

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
	});
</script>

<div class="grot stories" class:lzero={$breakZero} class:lone={$breakOne} class:ltwo={$breakTwo}>
	<div bind:this={element} />
</div>

<style lang="sass">

.stories
	width: 100vw

.stories.lzero
	padding-top: 64px
	padding-bottom: 64px
	width: 680px
	margin-left: 25%


</style>
