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
	<div class="leftside grot">
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
		height: 48px

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
		grid-template-columns: 20vw 56vw 24vw
		grid-template-areas: "leftside mainpage rightside"
		width: 100vw
		.leftside
			padding-left: 40px
			height: calc(100vh - 112px)
			position: sticky
			top: 64px
			overflow-y: scroll
			border-right: 1px solid var(--contraster)
		.rightside
			text-align: right
			padding-right: 40px
			padding-left: 40px	
			height: calc(100vh - 112px)
			position: sticky
			top: 64px
			align-items: flex-end
			row-gap: 8px
			border-left: 1px solid var(--contraster)
			text-align: right
		.mainpage, .leftside, .rightside
			padding-top: 64px
		.mainpage
			padding-bottom: 64px	
			display: flex
			flex-direction: column
			align-items: stretch
			padding-left: 6vw
			.pagemin
				max-width: 620px
	@media screen and (max-width: 1023px)
		grid-template-columns: 1fr
		grid-template-areas: "leftside" "rightside" "mainpage"
		padding-top: 0
		margin-top: 0
		.leftside
			width: 100%
			height: 100%
			top: 56px
			position: sticky
			height: 48px
			background: var(--this)
			z-index: 1000
			border-bottom: 1px solid var(--contraster)
		.rightside
			width: 100%
			padding-left: 16px
			padding-right: 16px
			padding-top: 16px
			border-bottom: 1px solid var(--onlyblack)
		.mainpage
			width: 100%
			padding-left: 16px
			padding-right: 16px
			padding-bottom: 32px
			padding-top: 32px

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
			padding-left: 6vw
		.rightside
			display: none

</style>
