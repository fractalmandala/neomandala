<script lang="ts">
	import { onMount } from 'svelte';
	import Prism from 'prismjs';
	import '$lib/styles/prism.css';

	export let lang = '';

	onMount(() => {
		Prism.highlightAll();
	});
</script>

<pre class="language-{lang}">
	<div class="rta-row between strip">
		<small>{lang}</small>
	</div>
	<code>
		<slot />
	</code>
</pre>

<style lang="sass">

pre
	margin: 0
	code
		margin: 0
		padding: 0

small
	text-transform: uppercase

.strip
	border-bottom: 1px solid #575757

</style>
