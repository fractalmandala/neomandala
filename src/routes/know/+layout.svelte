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
				<a href="/know" style="color: var(--background)"> INDEX HOME</a>
			</p>
			<p>
				<a href="/know/ontology" style="color: var(--background)">ONTOLOGY</a>
			</p>
			<p>
				<a href="/know/tools" style="color: var(--background)">TOOLS</a>
			</p>
			<p>
				<a href="/know/library" style="color: var(--background)">LIBRARY</a>
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
	<div class="rta-column rightcol rowgap100" slot="right">
		{#if $indexName}
			<h4 class="tt-u" style="color: var(--background)">{$indexName}</h4>
			<div class="rta-row colgap200">
				{#if $indexTags}
					<small>{$indexTags}</small>
				{/if}
				<div class="islabel {$indexCategory}">
					{$indexCategory}
				</div>
			</div>
			<div class="sectionrest rta-column">
				{#if $indexLinks && $indexLinks.length > 0}
					<h6 class="p-bot-8" style="color: #10D56C">Links</h6>
					{#each $indexLinks as item}
						<p>
							<a href={item.url} target="_blank" rel="noreferrer">{item.name}</a>
						</p>
					{/each}
				{/if}
			</div>
		{/if}
	</div>
</Shell>

<style lang="sass">

h4
	font-weight: 600
	word-break: break-word

.inside
	row-gap: 8px
	display: flex
	flex-direction: column
	@media screen and (max-width: 1023px)
		z-index: 1000
		background: var(--this)
		padding: 16px
		height: calc(100vh - 80px)
		overflow-y: scroll

.inside, .sectionrest
	p a
		color: var(--texttwo)
		text-transform: capitalize
		&:hover
			color: var(--greenb)

</style>
