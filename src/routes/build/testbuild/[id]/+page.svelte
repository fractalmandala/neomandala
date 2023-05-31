<script lang="ts">
	import { marked } from 'marked';
	import { onMount } from 'svelte';
	export let data;

	let mdT = data.content;
	let raw: string;

	onMount(() => {
		let html = marked(mdT);
		let div = document.createElement('div');
		div.innerHTML = html;
		raw = div.textContent || div.innerText || '';
	});
</script>

<pre>{raw}</pre>
