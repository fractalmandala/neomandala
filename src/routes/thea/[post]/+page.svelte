<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { saveThea } from '$lib/utils/supastream';
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

	marked.use({
		headerIds: false,
		mangle: false
	});

	let processed = marked(data.content);

	async function handleSave() {
		saveThea(markdownOutput, data.id);
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

<div
	class="grot stories rta-column rowgap300"
	class:lzero={$breakZero}
	class:lone={$breakOne}
	class:ltwo={$breakTwo}
>
	<div class="rta-row between ycenter m-bot-16 titleshitle">
		<h4>{data.title}</h4>
		<button class="glass-button" on:click={handleSave}>Save</button>
	</div>
	<div bind:this={element} />
</div>

<style lang="sass">

.titleshitle
	background: var(--this)
	z-index: 500

h4
	margin-top: 0
	padding-top: 8px
	border-top: none
	color: var(--texttwo)

.stories
	width: 100vw

.stories.lzero
	padding-top: 32px
	padding-bottom: 64px
	width: 680px
	margin-left: calc(25vw - 240px)
	.titleshitle
		position: sticky
		top: 54px

.stories.ltwo, .stories.lone
	padding: 32px

</style>
