<script lang="ts">
	import { marked } from 'marked';
	import { onMount } from 'svelte';
	import { breakZero, breakOne, breakTwo } from '$lib/stores/globalstores';
	import Parallax from '$lib/components/Parallax.svelte';
	export let data;

	let mdT = data.content;
	let raw: string;
	let html: string;
	let loading = false;

	onMount(() => {
		loading = true;
		html = marked(mdT);
		let div = document.createElement('div');
		div.innerHTML = html;
		raw = div.textContent || div.innerText || '';
		loading = false;
	});
</script>

<div class="rta-column actualsection">
	<div class="covering">
		<Parallax --parallax="url('{data.imgif}')" />
	</div>
	<div class="inctualsection articles">
		{#if loading}
			<p>....</p>
		{:else if data.uuidtext === 'serif'}
			<h1 class="serif">{data.title}</h1>
			<div class="poster serif">{@html html}</div>
		{:else}
			<h2 class="serif">{data.title}</h2>
			<div class="poster non">{@html html}</div>
		{/if}
	</div>
</div>

<style lang="sass">

h1
	text-transform: capitalize

.covering
	height: 60vh
	overflow: hidden

</style>
