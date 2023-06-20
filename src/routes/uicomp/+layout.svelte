<script lang="ts">
	import Shell from '$lib/design/ShellTwo.svelte';
</script>

<Shell>
	<div slot="side" class="rta-column grot">
		<h6>Components:</h6>
	</div>
	<div slot="main" class="rta-column">
		<slot />
	</div>
</Shell>

<style lang="sass">

h6
	color: var(--liner)

</style>
