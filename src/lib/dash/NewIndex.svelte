<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { Editor } from '@tiptap/core';
	import StarterKit from '@tiptap/starter-kit';
	import { Markdown } from 'tiptap-markdown';
	import '$lib/styles/tiptap.sass';
	import { showChip } from '$lib/stores/modalstores';
	import supabase from '$lib/utils/supabase';

	let element: any;
	let editor: any;
	let name = '';
	let html: any;
	let prefill = '';
	let markdownOutput: any;
	let imagelink: string = '';
	let links: any;
	let tags: any;
	let synapse: string = '';
	let slug = '';

	let validator = false;

	$: if (name === '') {
		validator = false;
	} else {
		validator = true;
	}

	async function handleSubmit() {
		console.log(name, markdownOutput);
		const { error } = await supabase
			.from('mandalapedia')
			.insert({ name: name, image: imagelink, content: markdownOutput, slug: name });
		if (error) {
			showChip('error', '#fe4a49');
			console.log(error);
		} else {
			showChip('done', '#10D56C');
			prefill = '';
			name = '';
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

<div class="rta-column biggie">
	{#if editor}
		<div class="inputtiptap rta-row colgap100">
			<input type="text" bind:value={name} />
			<input type="text" bind:value={slug} />
			<select bind:value={synapse}>
				<option value="kṛt">kṛt</option>
				<option value="bhṛt">bhṛt</option>
				<option value="dhṛt">dhṛt</option>
				<option value="ghṛt">ghṛt</option>
				<option value="ṛt">ṛt</option>
				<option value="anṛt">anṛt</option>
			</select>
			<div class="rta-row colgap100 buttons">
				{#if validator}
					<button class="genbutton" on:click={handleSubmit}>Submit</button>
				{/if}
			</div>
		</div>
	{/if}
	<div class="inputtiptapeditor" bind:this={element} data-lenis-prevent />
</div>

<style lang="sass">

.biggie
	@media screen and (min-width: 900px)
		width: 720px
		padding-top: 64px
		padding-left: 64px
	@media screen and (max-width: 899px) and (min-width: 769px)
		width: 100%
		padding-top: 64px
	@media screen and (max-width: 768px)
		width: 100%
		padding-top: 64px

.rta-row
	column-gap: 1.6vw

.inputtiptapeditor
	border: 1px solid var(--onlyblack)
	padding: 8px
	border-radius: 0 0 4px 4px

.inputtiptap
	background: var(--default)
	padding: 8px
	border-radius: 4px 4px 0 0
	input, select
		border: 1px solid #474747
		color: white
		padding: 2px 4px
		border-radius: 4px
		background: none
		outline: none
		width: 200px
		font-family: 'Space Grotesk', sans-serif


</style>
