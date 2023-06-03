<script lang="ts">
	import { onMount, afterUpdate } from 'svelte';
	import { marked } from 'marked';

	export let code = '';
</script>

<pre class="mono">
	{marked.parse(code)}
</pre>

<style lang="sass">

pre
	overflow-x: auto
	box-sizing: border-box !important
	white-space: pre-line
	white-space: -moz-pre-line
	white-space: -pre-line
	white-space: -o-pre-line
	word-wrap: break-word !important
	word-break: break-word !important
	color: var(--default) !important
	font-family: 'Space Mono', monospace
	font-size: 14px
	line-height: 1.5


</style>
