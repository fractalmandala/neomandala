<script lang="ts">
	import { themeMode } from '$lib/stores/globalstores';
</script>

<div class="shelltwo">
	<div class="shellstrip">
		<a class="blank-button" href="/thea">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="20"
				height="20"
				viewBox="0 0 24 24"
				fill="none"
				stroke="var(--texttwo)"
				stroke-width="2"
				stroke-linecap="round"
				stroke-linejoin="round"
				class="lucide lucide-file-text"
				><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" /><polyline
					points="14 2 14 8 20 8"
				/><line x1="16" x2="8" y1="13" y2="13" /><line x1="16" x2="8" y1="17" y2="17" /><line
					x1="10"
					x2="8"
					y1="9"
					y2="9"
				/></svg
			>
		</a>
		<a class="blank-button" href="/janapada">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="20"
				height="20"
				viewBox="0 0 24 24"
				fill="none"
				stroke="var(--texttwo)"
				stroke-width="2"
				stroke-linecap="round"
				stroke-linejoin="round"
				class="lucide lucide-file-type"
				><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" /><polyline
					points="14 2 14 8 20 8"
				/><path d="M9 13v-1h6v1" /><path d="M11 18h2" /><path d="M12 12v6" /></svg
			>
		</a>
	</div>
	<div class="shell-l rta-column rowgap50">
		<slot name="side" />
	</div>
	<div class="shell-m rta-column">
		<slot name="main" />
	</div>
</div>

<style lang="sass">

.blank-button
	&:hover
		svg
			stroke: #10D56C

.shelltwo
	display: grid
	grid-auto-flow: row
	.shellstrip
		grid-area: strip
	.shell-l
		grid-area: left
	.shell-m
		grid-area: prime
	@media screen and (min-width: 1024px)
		grid-template-columns: 64px 240px 1fr
		grid-template-areas: "strip left prime"
		.shellstrip
			padding: 16px
			border-right: 1px solid var(--texttwo)
			display: flex
			flex-direction: column
			row-gap: 8px
		.shell-l
			padding: 20px
		.shellstrip, .shell-l
			height: calc(100vh - 56px)
			position: sticky
			top: 56px
	@media screen and (max-width: 1023px)
		grid-template-columns: 1fr
		grid-template-areas: "prime"
		.shellstrip, .shell-l
			display: none

</style>
