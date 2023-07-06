<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import {
		breakZero,
		breakOne,
		breakTwo,
		noteName,
		showSave,
		hideSave,
		headTitle
	} from '$lib/stores/globalstores';

	$: $headTitle = 'thea';

	onMount(() => {
		$headTitle = 'thea';
	});
</script>
