<script lang="ts">
	import Shell from '$lib/design/AppShell.svelte';
</script>

<Shell>
	<div slot="left" class="rta-column">
		<div class="inside">
			<p>Testing</p>
		</div>
	</div>
	<div slot="main" class="rta-column" />
	<div class="rta-column rightcol rowgap100" slot="right" />
</Shell>
