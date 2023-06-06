<script lang="ts">
	import { onMount } from 'svelte';
	import { breakZero, breakOne, breakTwo } from '$lib/stores/globalstores';
	import { indexName, indexCategory, indexTags, indexLinks } from '$lib/stores/globalstores';
	import { mandalapedia } from '$lib/utils/supabase';
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
		indexer = await mandalapedia();
	});
</script>

<div
	class="rta-thecontain"
	class:levelzero={$breakZero}
	class:levelone={$breakOne}
	class:leveltwo={$breakTwo}
>
	<div class="grot leftside tt-c p-top-64">
		{#if $breakTwo}
			<div class="holdsbutton rta-column xleft">
				<button class="blank-button" on:click={toggleSide}>
					<Menu color={'#FFFFFF'} />
				</button>
			</div>
		{/if}
		{#if showSide || $breakZero || $breakOne}
			<div class="inside">
				{#if indexer && indexer.length > 0}
					{#each indexer as item}
						<p on:click={toggleSide} on:keydown={fauxfake}>
							<a href="/know/{item.slug}">
								{item.name}
							</a>
						</p>
					{/each}
				{/if}
			</div>
		{/if}
	</div>
	<div class="mainpage">
		<slot />
	</div>
	<div class="rightside grot">
		<h4 class="tt-u">{$indexName}</h4>
		<div class="islabel {$indexCategory}">
			{$indexCategory}
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
</div>

<style lang="sass">

.inside
	display: flex
	flex-direction: column
	row-gap: 5px

.grot
	p
		font-weight: 400
		a
			color: inherit
			&:hover
				color: #10D56C   


.rta-thecontain
	display: grid
	grid-template-rows: auto
	.leftside
		grid-area: leftside
	.rightside
		grid-area: rightside
		display: flex
		flex-direction: column
	.mainpage
		grid-area: mainpage
	@media screen and (min-width: 1024px)
		grid-template-columns: 320px 1fr 440px
		grid-template-areas: "leftside mainpage rightside"
		.leftside
			width: 320px
			padding-left: 40px
			height: calc(100vh - 56px)
			position: sticky
			top: 0
		.rightside
			width: 440px
			text-align: right
			padding-right: 40px
			height: calc(100vh - 56px)
			position: sticky
			top: 0
			align-items: flex-end
			row-gap: 8px
		.mainpage, .leftside, .rightside
			padding-top: 128px
		.mainpage
			padding-bottom: 128px
	@media screen and (max-width: 1023px) and (min-width: 769px)
		grid-template-columns: 200px 1fr 240px
		grid-template-areas: "leftside mainpage rightside"
		.leftside
			width: 200px
			padding-left: 40px
			height: calc(100vh - 56px)
			position: sticky
			top: 0
		.rightside
			width: 240px
			padding-right: 40px
			text-align: right
			height: calc(100vh - 56px)
			position: sticky
			top: 0
			align-items: flex-end
			row-gap: 8px
		.mainpage, .leftside, .rightside
			padding-top: 128px
		.mainpage
			padding-bottom: 128px
	@media screen and (max-width: 768px)
		grid-template-columns: 1fr
		grid-template-areas: "leftside" "rightside" "mainpage"
		padding-top: 0
		margin-top: 0
		.leftside
			width: 100%
			height: 100%
			top: 0px
			position: sticky
			background: var(--background)
			.holdsbutton
				height: 32px
				padding-left: 16px
				padding-right: 16px
			.inside
				padding: 16px
				p
					color: white
		.rightside
			width: 100%
			padding-left: 16px
			padding-right: 16px
			padding-top: 32px
			padding-bottom: 32px
			border-bottom: 1px solid var(--onlyblack)
		.mainpage
			width: 100%
			padding-left: 16px
			padding-right: 16px
			padding-bottom: 88px
			padding-top: 32px
		

</style>
