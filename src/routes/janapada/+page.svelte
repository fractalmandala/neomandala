<script lang="ts">
	import { onMount } from 'svelte';
	import { allJanapada } from '$lib/utils/supastream';
	import { noteName, showSave } from '$lib/stores/globalstores';

	let novels: any;

	onMount(async () => {
		novels = await allJanapada();
	});
</script>
