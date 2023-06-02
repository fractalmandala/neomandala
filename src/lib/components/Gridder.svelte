<div class="gridder">
	<div class="griddercol" />
	<div class="griddercol" />
	<div class="griddercol" />
	<div class="griddercol" />
	<div class="griddercol" />
	<div class="griddercol" />
	<div class="griddercol" />
	<div class="griddercol" />
	<div class="griddercol" />
	<div class="griddercol" />
	<div class="griddercol" />
	<div class="griddercol" />
</div>

<style lang="sass">


.gridder
	position: fixed
	top: 0
	left: 0
	display: grid
	grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr
	grid-template-areas: ". . . . . . . . . . . ."
	width: 100vw
	gap: 1.6vw
	padding: 64px 3.2vw
	height: 100vh
	opacity: 0.2
	pointer-events: none
	.griddercol
		border: 1px solid #a7a7a7

</style>
