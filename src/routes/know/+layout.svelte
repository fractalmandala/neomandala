<script lang="ts">
	//@ts-nocheck
	import { onMount } from 'svelte';
	import { breakZero, breakOne, breakTwo } from '$lib/stores/globalstores';
	import { indexName, indexCategory, indexTags, indexLinks } from '$lib/stores/globalstores';
	import { mandalapedia } from '$lib/utils/supabase';
	import Shell from '$lib/design/AppShell.svelte';
	import Gridder from '$lib/components/Gridder.svelte';
	import { allIndex } from '$lib/utils/localpulls';
	import Menu from '$lib/design/iconset/menu.svelte';
	import '$lib/styles/tiptap.sass';

	let indexer: any;
	let showSide = false;
	let fake = false;

	function fauxfake() {
		fake = !fake;
	}

	function toggleSide() {
		showSide = !showSide;
	}

	onMount(async () => {
		indexer = await allIndex();
	});
</script>

<Shell>
	<div slot="left" class="rta-column">
		<div class="inside">
			<p>
				<a href="/know/ontology" style="color: var(--background)">ONTOLOGY</a>
			</p>
			<p>
				<a href="/know/tools" style="color: var(--background)">TOOLS</a>
			</p>
			{#if indexer && indexer.length > 0}
				{#each indexer as item}
					<p on:click={toggleSide} on:keydown={fauxfake}>
						<a href={item.linkpath}>
							{item.meta.title}
						</a>
					</p>
				{/each}
			{/if}
		</div>
	</div>
	<div slot="main" class="rta-column">
		<slot />
	</div>
	<div class="rta-column xright rowgap100" slot="right">
		<h4 class="tt-u" style="color: var(--background)">{$indexName}</h4>
		<div class="rta-row colgap200">
			<small>{$indexTags}</small>
			<div class="islabel {$indexCategory}">
				{$indexCategory}
			</div>
		</div>
		<div class="sectionrest rta-column p-top-32">
			{#if $indexLinks && Object.keys($indexLinks).length > 0}
				<h6 class="p-bot-8">Links</h6>
				{#each Object.entries($indexLinks) as [key, value] (key)}
					<p><a href={value} target="_blank" rel="noreferrer">{key}</a></p>
				{/each}
			{/if}
		</div>
	</div>
</Shell>

<style lang="sass">

.inside
	row-gap: 8px
	display: flex
	flex-direction: column
	@media screen and (max-width: 1023px)
		z-index: 1000
		background: var(--this)
		padding: 16px
		border-bottom: 1px solid var(--textone)

p a
	color: var(--default)
	text-transform: capitalize
	&:hover
		color: #10D56C


</style>
