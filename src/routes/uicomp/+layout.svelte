<script lang="ts">
	import Shell from '$lib/design/AppShell.svelte';
</script>

<Shell>
	<div slot="left" class="rta-column grot">
		<h6>Components:</h6>
	</div>
	<div slot="main" class="rta-column">
		<slot />
	</div>
	<div class="rta-column rightcol rowgap100 grot" slot="right">
		<h6>Checklist:</h6>
		<div class="rta-row ycenter colgap100">
			<div class="squarebox" />
			App shell(s)
		</div>
	</div>
</Shell>

<style lang="sass">

.squarebox
	height: 16px
	width: 16px
	border: 1px solid var(--contraster)
	background: var(--background)

</style>
