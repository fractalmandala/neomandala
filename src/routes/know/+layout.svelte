<script lang="ts">
	import { onMount } from 'svelte';
	import { mandalapedia } from '$lib/utils/supabase';
	import Gridder from '$lib/components/Gridder.svelte';

	let indexer: any;

	onMount(async () => {
		indexer = await mandalapedia();
	});
</script>

<div class="sidebarandpage minH">
	<div class="grot sidebar tt-c">
		<div class="inside">
			{#if indexer && indexer.length > 0}
				{#each indexer as item}
					<p>
						<a href="/know/{item.slug}">
							{item.name}
						</a>
					</p>
				{/each}
			{/if}
		</div>
	</div>
	<div class="mainarea">
		<slot />
	</div>
</div>

<style lang="sass">

.grot
	p
		font-weight: 500
		a
			color: inherit
			&:hover
				color: #10D56C   

.sidebar
	display: flex
	flex-direction: column
	row-gap: 6px

.sidebarandpage
	display: grid
	grid-auto-flow: row
	.sidebar
		grid-area: sidebar
	.mainarea
		grid-area: mainarea
	@media screen and (min-width: 900px)
		grid-template-columns: 256px 1fr
		grid-template-areas: "sidebar mainarea"
		.sidebar
			height: 100vh
			width: 256px
			top: 0
			left: 0
			padding-top: 128px
			padding-left: 40px
			border-right: 1px solid var(--onlyblack)
			.inside
				position: sticky
				top: 128px
		.mainarea
			margin-top: 56px
			padding-left: 1.6vw
			padding-right: 40px
	@media screen and (min-width: 769px) and (max-width: 899px)
		grid-template-columns: 256px 1fr
		grid-template-areas: "sidebar mainarea"
		.sidebar
			height: 100vh
			position: sticky
			width: 256px
			top: 0
			left: 0
			overflow-y: scroll
			padding-top: 128px
			padding-left: 40px
			border-right: 1px solid var(--onlyblack)
		.mainarea
			margin-top: 56px
			padding-left: 1.6vw		
			padding-right: 40px
	@media screen and (max-width: 768px) 
		grid-template-columns: 1fr
		grid-template-areas: "mainarea"
		.sidebar
			display: none
		.mainarea
			padding: 56px 24px
		

</style>
