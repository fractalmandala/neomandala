<script lang="ts">
	import { onMount, afterUpdate } from 'svelte';
	import { clickToCopyAction } from '$lib/utils/clicktocopy';
	import Copy from '$lib/design/iconset/copy.svelte';
	import Prism from 'prismjs';
	import '$lib/styles/prism.css';
	export let code = '';
	export let lang = '';

	$: highlightedCode = '';

	onMount(() => {
		Prism.highlightAll();
	});
</script>

<div class="group relative my-4 rounded-lg">
	<!-- eslint-disable svelte/no-at-html-tags -->
	<pre>
		<code class="language-{lang}"
			>{@html highlightedCode || code.replaceAll('<', '&lt;')}
		</code>
	</pre>
	<button class="blank-button" use:clickToCopyAction={code}>
		<Copy />
	</button>
</div>
