<script lang="ts">
	import { onMount, afterUpdate, onDestroy } from 'svelte';
	import { addCode } from '$lib/dash/fileuploader';
	import CodeBlock from '@tiptap/extension-code-block';
	import Document from '@tiptap/extension-document';
	import Paragraph from '@tiptap/extension-paragraph';
	import Text from '@tiptap/extension-text';
	import { Editor } from '@tiptap/core';
	import Prism from 'prismjs';
	import '$lib/styles/prism.css';
	let editor: any;
	let element: any;
	let text: any;
	let inputCode = '';
	let language: string;
	let title = 'title';
	let tags = 'tags';
	let showButton = false;
	let demark: string;

	$: if (title === 'title' || tags === 'tags' || language === '') {
		showButton = false;
	} else {
		showButton = true;
	}

	$: demark = inputCode;

	function handleTitleFocus() {
		title = '';
	}

	function handleTagsFocus() {
		tags = '';
	}

	async function handleSubmit() {
		addCode(title, tags, text, language);
	}

	onMount(() => {
		editor = new Editor({
			element: element,
			extensions: [
				Document,
				Paragraph,
				Text,
				CodeBlock.configure({ languageClassPrefix: 'language-' })
			],
			content: `
<pre><code>
${inputCode}

</code></pre>					
`,
			onTransaction: () => {
				// force re-render so `editor.isActive` works as expected
				editor = editor;
			},
			onUpdate: ({ editor }) => {
				text = editor.getHTML();
			}
		});
	});
	afterUpdate(() => {
		text = editor.getHTML();
	});

	onDestroy(() => {
		if (editor) {
			editor.destroy();
		}
	});
</script>

<form class="inputformer p-bot-16" data-lenis-prevent>
	<div class="rta-row colgap200">
		<input type="text" placeholder={title} bind:value={title} on:focus={handleTitleFocus} />
		<select name="codelang" bind:value={language} style="outline: none">
			<option value="html">HTML</option>
			<option value="javascript">JS</option>
			<option value="sass">SASS</option>
			<option value="sql">SQL</option>
			<option value="shell">Shell</option>
			<option value="css">CSS</option>
		</select>
		<input type="text" placeholder={tags} bind:value={tags} on:focus={handleTagsFocus} />
		{#if showButton}
			<button type="submit" class="genbutton" on:click={handleSubmit}>Submit</button>
		{/if}
	</div>
</form>
<div class="snippetprose" bind:this={element} />
