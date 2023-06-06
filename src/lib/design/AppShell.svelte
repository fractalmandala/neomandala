<script lang="ts">
	import { themeMode } from '$lib/stores/globalstores';
</script>

<div class="rta-thecontain" class:light={$themeMode} class:dark={!$themeMode}>
	<div class="leftside">
		<slot name="left" />
	</div>
	<div class="mainpage">
		<slot name="main" />
	</div>
	<div class="rightside">
		<slot name="right" />
	</div>
</div>

<style lang="sass">

.light
	background: #FFFFFF

.dark
	background: #171717

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
		column-gap: 64px
		.leftside
			width: 320px
			padding-left: 40px
			height: calc(100vh - 56px)
			position: sticky
			top: 0
			overflow-y: scroll
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
			padding-bottom: 64px
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
