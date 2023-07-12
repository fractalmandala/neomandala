<script lang="ts">
	import { themeMode, breakZero, breakOne } from '$lib/stores/globalstores';
	import Menu from '$lib/design/iconset/menu.svelte';

	let toggleOpen = false;
	export let altgrid = false;

	function toggleDrop() {
		toggleOpen = !toggleOpen;
	}
</script>

<div class="rta-thecontain" class:light={$themeMode} class:dark={!$themeMode} class:alt={altgrid}>
	<div class="leftside grot" data-lenis-prevent>
		<div class="strip">
			<button class="blank-button" on:click={toggleDrop}>
				<Menu dimension={24} />
			</button>
		</div>
		{#if $breakZero || toggleOpen}
			<slot name="left" />
		{/if}
	</div>
	<div class="mainpage">
		<div class="pagemin">
			<slot name="main" />
		</div>
	</div>
</div>

<style lang="sass">

.strip
	display: flex
	flex-direction: row
	@media screen and (min-width: 1024px)
		display: none
	@media screen and (max-width: 1023px)
		padding: 8px 16px
		height: 40px

.light
	background: #FFFFFF

.dark
	background: #171717

.leftside::-webkit-scrollbar
	width: 1px

.leftside::-webkit-scrollbar-thumb
	background: #10D56C

.rta-thecontain
	display: grid
	grid-template-rows: auto
	.leftside
		grid-area: leftside
	.mainpage
		grid-area: mainpage
	@media screen and (min-width: 1024px)
		grid-template-columns: 20vw 1fr
		grid-template-areas: "leftside mainpage"
		width: 100vw
		min-height: calc(100vh - 80px)
		.leftside
			padding-left: 40px
			height: calc(100vh - 80px)
			position: sticky
			top: 40px
			overflow-y: scroll
		.mainpage, .leftside
			padding-top: 40px
		.mainpage
			padding-bottom: 64px	
			display: flex
			flex-direction: column
			align-items: stretch
			padding-left: 6vw
			padding-right: 3vw
			border-right: 1px solid var(--contraster)
			border-left: 1px solid var(--contraster)
			.pagemin
				max-width: 720px
	@media screen and (max-width: 1023px)
		grid-template-columns: 1fr
		grid-template-areas: "leftside" "mainpage"
		padding-top: 0
		margin-top: 0
		min-height: calc(100vh - 80px)
		.leftside
			width: 100%
			height: 100%
			top: 40px
			position: sticky
			height: 40px
			background: var(--this)
			z-index: 1000
			border-bottom: 1px solid var(--contraster)
		.mainpage
			width: 100%
			padding-left: 16px
			padding-right: 16px
			padding-bottom: 32px
			padding-top: 32px
			min-height: calc(100vh - 176px)

.rta-thecontain.alt
	@media screen and (min-width: 1024px)
		grid-template-columns: 16vw 1fr
		grid-template-areas: "leftside mainpage"	
		.leftside
			padding-left: 40px
			height: calc(100vh - 112px)
			position: sticky
			top: 64px
			overflow-y: scroll
			border-right: 1px solid var(--contraster)
		.mainpage
			padding-bottom: 64px	
			display: flex
			flex-direction: column
			align-items: stretch
			padding: 0
			.pagemin
				width: 100%
				max-width: 100%
				padding: 0 !important

</style>
