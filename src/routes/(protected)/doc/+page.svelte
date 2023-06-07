<script lang="ts">
	import { onMount } from 'svelte';
	import { marked } from 'marked';

	let content = '';
	let html = '';
	let parso = '';
	let md: any;

	onMount(async () => {
		const response = await fetch('/api/github');
		const data = await response.text();
		let md;
		md = marked(data);
		html = md;
	});
</script>

<div class="rta-column rowgap300">
	{@html html}
</div>
