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
		height: calc(100vh - 80px)
		overflow-y: scroll

.inside
	p a
		color: var(--texttwo)
		text-transform: capitalize
		&:hover
			color: var(--greenb)


</style>
