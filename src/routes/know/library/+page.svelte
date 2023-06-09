<script lang="ts">
	import Meta from '$lib/components/Meta.svelte';
	import {
		indexName,
		indexCategory,
		indexLinks,
		indexTags,
		pageTitle,
		pageDescription,
		shareImage,
		pageUrl
	} from '$lib/stores/globalstores';
	import { showNote } from '$lib/dash/alerts';
	import supabase from '$lib/utils/supabase';
	import Loader from '$lib/assets/Loader.svelte';

	$indexName = 'library';
	$indexCategory = '';
	$indexLinks = '';
	$indexTags = '';
	$pageTitle = 'Knowledge Index at Fractal Maṇḍala';
	$pageDescription = 'The digital garden as a WIP and in indexed form...';
	$pageUrl = 'https://www.fractalmandala.in/know';
	$shareImage =
		'https://wganhlzrylmkvvaoalco.supabase.co/storage/v1/object/public/images/website/grid.webp';
	let inputWord = '';
	let inputDhatu = '';
	let inputPurana = '';
	let inputVeda = '';
	let showVedas = false;
	let showPuranas = false;
	let showResults = false;
	let showDhatus = false;
	let loading = false;
	let results: any = '';

	function clearResults() {
		results = '';
		inputWord = '';
		inputDhatu = '';
		inputPurana = '';
		inputVeda = '';
		showResults = false;
		showPuranas = false;
		showDhatus = false;
		showVedas = false;
	}

	async function searchVedas() {
		loading = true;
		const { data, error } = await supabase
			.from('vedicconcordance2')
			.select()
			.textSearch('concatext', inputVeda);
		if (error) {
			loading = false;
			showNote('error', false);
		} else {
			loading = false;
			showVedas = true;
			results = data;
		}
	}

	async function searchDictionary() {
		loading = true;
		const { data, error } = await supabase
			.from('db-dictionary')
			.select()
			.textSearch('word', inputWord);
		if (error) {
			loading = false;
			showNote('error', false);
		} else {
			loading = false;
			showResults = true;
			results = data;
		}
	}

	async function searchDhatu() {
		loading = true;
		const { data, error } = await supabase
			.from('db-dhatupatha')
			.select()
			.textSearch('concattext', inputDhatu);
		if (error) {
			loading = false;
			showNote('error', false);
		} else {
			loading = false;
			showDhatus = true;
			results = data;
		}
	}

	async function searchPurana() {
		loading = true;
		const { data, error } = await supabase
			.from('db-puranaindex')
			.select()
			.textSearch('concatext', inputPurana);
		if (error) {
			loading = false;
			showNote('error', false);
		} else {
			loading = false;
			showPuranas = true;
			results = data;
		}
	}

	function addLineBreaks(text: string) {
		return text.replace(/(\d+\))/g, '\n\n');
	}
</script>

<Meta
	title={$pageTitle}
	metaDescription={$pageDescription}
	metaUrl={$pageUrl}
	metaImage={$shareImage}
/>

<p class="p-bot-32">A set of search tools in Sanskrit.</p>

<div class="rta-column rowgap100 dictionary">
	<div class="rta-row wrapper colgap200">
		<form>
			<input type="text" placeholder="dictionary" bind:value={inputWord} />
			<button class="genbutton" on:click={searchDictionary}>Search</button>
		</form>
		<form>
			<input type="text" placeholder="dhātu" bind:value={inputDhatu} />
			<button class="genbutton" on:click={searchDhatu}>Search</button>
		</form>
		<form>
			<input type="text" placeholder="purāṇa" bind:value={inputPurana} />
			<button class="genbutton" on:click={searchPurana}>Search</button>
		</form>
		<form>
			<input type="text" placeholder="vedas" bind:value={inputVeda} />
			<button class="genbutton" on:click={searchVedas}>Search</button>
		</form>
	</div>
	{#if results !== ''}
		<div class="rta-column xleft p-top-16 p-bot-16">
			<button class="blank-button" style="color: var(--background)" on:click={clearResults}>
				Clear Results
			</button>
		</div>
	{/if}
	{#if loading}
		<div class="p-top-16">
			<Loader />
		</div>
	{/if}
	{#if showResults}
		<div class="rta-column results p-top-16">
			{#each results as item}
				<div class="rta-column p-top-16 p-bot-16 bord-bot">
					<p style="margin: 0; color: var(--background)">{item.word}</p>
					<small>{item.meanings}</small>
				</div>
			{/each}
		</div>
	{/if}
	{#if showDhatus}
		<div class="rta-column results p-top-16">
			{#each results as item}
				<div class="rta-column p-top-16 p-bot-16 bord-bot">
					<p style="margin: 0; color: var(--background)">{item.dhatu} | {item.dhatuiast}</p>
					<small>{item.artha} | {item.arthaiast} | {item.artha_english}</small>
				</div>
			{/each}
		</div>
	{/if}
	{#if showPuranas}
		<div class="rta-column results p-top-16">
			{#each results as item}
				<div class="rta-column p-top-16 p-bot-16 bord-bot">
					<p style="margin: 0; color: var(--background)">{item.hindi} | {item.iast}</p>
					<pre>{addLineBreaks(item.about)}</pre>
				</div>
			{/each}
		</div>
	{/if}
	{#if showVedas}
		<div class="rta-column results p-top-16">
			{#each results as item}
				<div class="rta-column p-top-16 p-bot-16 bord-bot">
					<p style="margin: 0; color: var(--background)">{item.word} | {item.hindi}</p>
					<small class="tt-u">{item.reference}</small>
				</div>
			{/each}
		</div>
	{/if}
</div>

<style lang="sass">

pre
	font-family: 'CommitMono', sans-serif
	margin-bottom: 16px
	white-space: pre-line

.wrapper
	form input
		@media screen and (min-width: 1024px)
			width: 100px


</style>
