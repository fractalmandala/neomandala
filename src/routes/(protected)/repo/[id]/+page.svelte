<script lang="ts">
	import { onMount } from 'svelte';
	import { singleTitle } from '$lib/utils/supabase';
	import Parser from '$lib/agent/Parser.svelte';
	import { marked } from 'marked';
	import Prism from 'prismjs';
	import '$lib/styles/prism.css';
	export let data;
	let items: any;

	onMount(() => {
		Prism.highlightAll();
		(async () => {
			items = await singleTitle(data.title);
		})();
	});
</script>

<div class="grot rta-column">
	<h4>{data.title}</h4>
	<small>{data.theme}</small>
	<div class="rta-column rowgap300 p-top-32">
		{#if items && items.length > 0}
			{#each items as item}
				<Parser response={item.value} />
			{/each}
		{/if}
	</div>
</div>

<style lang="sass">

h4
	margin: 0


</style>
