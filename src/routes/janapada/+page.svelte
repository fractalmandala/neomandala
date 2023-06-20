<script lang="ts">
	import { onMount } from 'svelte';
	import { allJanapada } from '$lib/utils/supastream';

	let novels: any;

	onMount(async () => {
		novels = await allJanapada();
	});
</script>
