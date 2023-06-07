<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { Editor } from '@tiptap/core';
	import StarterKit from '@tiptap/starter-kit';
	import { Markdown } from 'tiptap-markdown';
	import MarkdownIt from 'markdown-it';
	import { marked } from 'marked';
	export let data;
	let element: any;
	let editor: any;
	let title = '';
	let html: any;
	let prefill = '';
	let markdownOutput: any;
	let htmlContent: any;
	let md = new MarkdownIt({
		html: true
	});

	$: htmlContent = data.content;

	onMount(async () => {
		htmlContent = md.render(data.content);
	});
</script>

<div class="rta-column rowgap300">
	<h4 style="margin: 0; color: var(--background)">{data.title}</h4>
	<div class="rta-column rowgap200 janapader">
		{@html htmlContent}
	</div>
</div>
