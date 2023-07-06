<script lang="ts">
	import Shell from '$lib/design/ShellTwo.svelte';
</script>

<Shell>
	<div slot="side" class="rta-column sidos">
		<button class="blank-button ta-l"> RR </button>
		<div class="paddero">
			<p class="tt-u p-top-16 p-bot-16">
				<a href="/uicomp">UI Comps</a>
			</p>
		</div>
	</div>
	<div slot="main" class="rta-column">
		<slot />
	</div>
</Shell>

<style lang="sass">

.sidos
	height: 72vh
	position: sticky
	top: 40px
	.blank-button
		height: 40px
		border-bottom: 1px solid var(--contraster)
		@media screen and (min-width: 1024px)
			padding-left: 32px

.paddero
	@media screen and (min-width: 1024px)
		padding-left: 32px

p, p a
	font-family: 'Space Grotesk', sans-serif

p a
	color: var(--texttwo)
	&:hover
		color: #10D56C

</style>
