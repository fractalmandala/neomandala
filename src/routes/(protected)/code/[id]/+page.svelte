<script lang="ts">
	import { onMount, afterUpdate } from 'svelte';
	import Prism from 'prismjs';
	import '$lib/styles/prism.css';
	export let data;

	let dyna: string;

	$: dyna = data.content;

	onMount(() => {
		Prism.highlightAll();
	});

	afterUpdate(() => {
		Prism.highlightAll();
	});
</script>

<div class="grot rta-grid">
	<cite><a href="/code">Code</a> | {data.tags} </cite>
	<h5>{data.title}</h5>
	<div class="blockforcode">
		<pre class="language-{data.uuidtext}">
		<code>
			{@html dyna}
		</code>
	</pre>
	</div>
	<button class="genbutton">EXPAND</button>
</div>

<style lang="sass">

a
	&:hover
		color: #10D56C

.blockforcode
	background: #212121
	border-radius: 5px
	max-width: 88%
	height: 480px
	overflow-y: scroll
	pre
		overflow-x: auto
		box-sizing: border-box
		white-space: pre-line
		white-space: -moz-pre-line
		white-space: -pre-line
		white-space: -o-pre-line
		word-wrap: break-word
		word-break: break-word

</style>
