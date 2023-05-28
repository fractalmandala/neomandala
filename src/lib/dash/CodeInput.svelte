<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { Editor } from '@tiptap/core';
	import StarterKit from '@tiptap/starter-kit';
	import supabase from '$lib/utils/supabase';
	import CodeBlock from '@tiptap/extension-code-block';
	import { slide } from 'svelte/transition';
	import { alertStore, goodAlert, showGood, showAlert, hideAlert } from '$lib/stores/modalstores';
	import { breakZero, breakOne, breakTwo, themeMode } from '$lib/stores/globalstores';

	let element: any;
	let editor: any;
	let title = '';
	let tags = '';
	let language = '';
	let agent = 'snippet';
	let inputOn = false;
	let showBack = false;
	let html: any;
	let text: any;

	CodeBlock.configure({
		languageClassPrefix: `language-${language}`
	});

	export async function inputCode() {
		const { error } = await supabase
			.from('amrit-notes')
			.insert({ title: title, content: text, tags: tags, uuidtext: language, agent: agent });
		if (error) {
			showAlert('Error!');
		}
		showGood('Submitted.');
		title = '';
		tags = '';
	}

	function toggleCodeBlock() {
		inputOn = !inputOn;
	}

	onMount(() => {
		editor = new Editor({
			element: element,
			extensions: [StarterKit, CodeBlock],
			content: '',
			onTransaction: () => {
				// force re-render so `editor.isActive` works as expected
				editor = editor;
			},
			onFocus: () => {
				showBack = true;
			},
			onBlur: () => {
				showBack = false;
			},
			onUpdate: ({ editor }) => {
				html = editor.getHTML();
				text = editor.getText();
			}
		});
	});

	onDestroy(() => {
		if (editor) {
			editor.destroy();
		}
	});
</script>

<div
	class="rta-column xleft rowgap200 codeinputter"
	class:levelzero={$breakZero}
	class:levelone={$breakOne}
	class:leveltwo={$breakTwo}
>
	{#if editor}
		<form class="rta-column rowgap200">
			<div class="rta-row colgap200 rowgap100 ycenter">
				<label class="switch">
					<input type="checkbox" on:click={toggleCodeBlock} />
					<span class="slider" />
				</label>
				<input type="text" placeholder="title" bind:value={title} />
				<select bind:value={language}>
					<option value="html">HTML</option>
					<option value="javascript">JS</option>
					<option value="sass">SASS</option>
					<option value="sql">SQL</option>
					<option value="css">CSS</option>
				</select>
				<input type="text" placeholder="tags" bind:value={tags} />
			</div>
		</form>
	{/if}
	<div class="codeinput fullW" bind:this={element} class:blackened={showBack} />
	<button class="glowbutton" on:click={inputCode}>Submit</button>
</div>

<style lang="sass">


.codeinput
	padding: 8px
	height: max-content
	min-height: 200px
	color: var(--textone)

.codeinput.blackened
	background: #171717

.codeinputter.levelzero
	input
		padding: 2px 8px
		font-size: 12px
	select
		padding: 2px 8px
		font-size: 12px

.codeinputter
	input
		background: none
		border: 1px solid rgba(255,255,255,0.09)
		border-radius: 12px
		color: white
	select
		background: none
		border: 1px solid rgba(255,255,255,0.09)
		color: white
		border-radius: 12px
		color: var(--textone)

.codeinputter.leveltwo
	input, select
		padding: 8px
		font-size: 14px
		width: calc(50% - 50px)
	form
		>.rta-row
			justify-content: space-between



</style>
