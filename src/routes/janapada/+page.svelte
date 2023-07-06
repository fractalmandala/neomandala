<script lang="ts">
	import { onMount } from 'svelte';
	import { allJanapada } from '$lib/utils/supastream';
	import { noteName, showSave, headTitle } from '$lib/stores/globalstores';

	let novels: any;

	$: $headTitle = 'janapada';

	onMount(async () => {
		novels = await allJanapada();
	});
</script>
