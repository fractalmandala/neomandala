<script lang="ts">
	import { onMount } from 'svelte';
	import hljs from 'highlight.js';
	import '$lib/styles/hljs.css';
	import javascript from 'highlight.js/lib/languages/javascript';
	import typescript from 'highlight.js/lib/languages/typescript';
	import sql from 'highlight.js/lib/languages/sql';
	import scss from 'highlight.js/lib/languages/scss';
	import css from 'highlight.js/lib/languages/css';
	import bash from 'highlight.js/lib/languages/bash';
	import shell from 'highlight.js/lib/languages/shell';
	import { alertStore, goodAlert, showGood, showAlert, hideAlert } from '$lib/stores/modalstores';
	import { breakZero, breakOne, breakTwo, themeMode } from '$lib/stores/globalstores';

	hljs.registerLanguage('javascript', javascript);
	hljs.registerLanguage('typescript', typescript);
	hljs.registerLanguage('sql', sql);
	hljs.registerLanguage('scss', scss);
	hljs.registerLanguage('bash', bash);
	hljs.registerLanguage('shell', shell);
	hljs.registerLanguage('css', css);

	export let lang: any;
	export let code: any;

	$: if (code) {
		hljs.highlightAll();
	}

	onMount(() => {
		hljs.highlightAll();
	});
</script>

<pre><code class="language-{lang}">{code}</code></pre>
