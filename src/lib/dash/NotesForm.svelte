<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { Editor } from '@tiptap/core';
	import StarterKit from '@tiptap/starter-kit';
	import { Markdown } from 'tiptap-markdown';
	import supabase from '$lib/utils/supabase';
	import { showNote } from '$lib/dash/alerts';
	import '$lib/styles/tiptap.sass';

	let element: any;
	let editor: any;
	let title = '';
	let html: any;
	let prefill = '';
	let markdownOutput: any;
	let agent = '';

	async function handleSubmit() {
		const { error } = await supabase
			.from('amrit-notes')
			.insert({ title: title, content: markdownOutput, agent: agent });
		if (error) {
			showNote('error', true);
		} else {
			showNote('done', false);
			title = '';
			prefill = '';
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

<form class="rta-column rowgap200">
	<input type="text" bind:value={title} />
	<div class="quick" bind:this={element} />
	<div class="rta-row colgap200">
		<select class="fullW" bind:value={agent}>
			<option value="short">quickie</option>
			<option value="list">item</option>
		</select>
		<button class="genbutton" on:click={handleSubmit}> Submit </button>
	</div>
</form>

<style lang="sass">

.rta-row
	flex-wrap: nowrap

.quick
	border: 1px solid var(--texttwo)
	border-radius: 5px
	text-align: left
	width: 100%

input[type=text]
	border-top: none
	border-left: none
	border-right: none
	border-bottom: 1px solid var(--texttwo)
	background: none
	padding: 4px 8px
	color: var(--background)
	font-size: 12px
	font-family: 'Space Grotesk', sans-serif

select
	background: none
	border: 1px solid var(--texttwo)
	border-radius: 4px
	color: var(--background)
	font-family: 'Space Grotesk', sans-serif
	font-size: 12px

</style>
