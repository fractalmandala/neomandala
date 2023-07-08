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
	<div class="rightside grot">
		<slot name="right" />
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
	.rightside
		grid-area: rightside
		display: flex
		flex-direction: column
	.mainpage
		grid-area: mainpage
	@media screen and (min-width: 1024px)
		grid-template-columns: 20vw 60vw 20vw
		grid-template-areas: "leftside mainpage rightside"
		width: 100vw
		min-height: calc(100vh - 80px)
		.leftside
			padding-left: 40px
			height: calc(100vh - 80px)
			position: sticky
			top: 40px
			overflow-y: scroll
		.rightside
			text-align: right
			padding-right: 40px
			padding-left: 40px	
			height: calc(100vh - 80px)
			position: sticky
			top: 40px
			align-items: flex-end
			row-gap: 8px
			text-align: right
		.mainpage, .leftside, .rightside
			padding-top: 40px
		.mainpage
			padding-bottom: 64px	
			display: flex
			flex-direction: column
			align-items: stretch
			padding-left: 6vw
			padding-right: 3vw
			border-right: 1px solid var(--background)
			border-left: 1px solid var(--background)
			.pagemin
				max-width: 620px
	@media screen and (max-width: 1023px)
		grid-template-columns: 1fr
		grid-template-areas: "leftside" "rightside" "mainpage"
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
		.rightside
			width: 100%
			padding-left: 16px
			padding-right: 16px
			padding-top: 16px
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
		.rightside
			display: none

</style>
