<script lang="ts">
	import ChevFRight from '$lib/icons/ChevFRight.svelte';
	import ChevFLeft from '$lib/icons/ChevFLeft.svelte';
</script>

<div class="rta-row colgap100 ycenter">
	<slot name="prev" />
	<slot name="next" />
</div>
