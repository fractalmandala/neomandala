<script lang="ts">
	import { themeMode } from '$lib/stores/globalstores';
</script>

<div class="shelltwo">
	<div class="shell-l rta-column rowgap50" data-lenis-prevent>
		<slot name="side" />
	</div>
	<div class="shell-m rta-column">
		<slot name="main" />
	</div>
</div>

<style lang="sass">

.shelltwo
	display: grid
	grid-auto-flow: row
	.shell-l
		grid-area: left
	.shell-m
		grid-area: prime
	@media screen and (min-width: 1024px)
		grid-template-columns: 280px 1fr
		grid-template-areas: "left prime"
		min-height: calc(100vh - 160px)
		.shell-l
			padding: 0 32px
			border-right: 1px solid var(--contraster)
		.shell-m
			min-height: calc(100vh - 112px)
	@media screen and (max-width: 1023px)
		grid-template-columns: 1fr
		grid-template-areas: "prime"
		.shell-l
			display: none

</style>
