<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import Tip from '$lib/components/Tip.svelte';
	export let data;
</script>

<div class="rta-column rowgap300">
	<h4 style="margin: 0; color: var(--background)">{data.title}</h4>
	<div class="rta-column rowgap200 janapader">
		<svelte:component this={data.content} />
	</div>
</div>
