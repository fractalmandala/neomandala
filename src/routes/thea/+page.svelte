<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import Meta from '$lib/components/Meta.svelte';
	import {
		breakZero,
		breakOne,
		breakTwo,
		noteName,
		showSave,
		hideSave,
		headTitle,
		pageTitle,
		pageDescription,
		pageUrl,
		shareImage
	} from '$lib/stores/globalstores';

	$: $headTitle = 'thea';
	$pageTitle = 'Thea at Fractal Maṇḍala';
	$pageDescription = 'thea';
	$pageUrl = 'https://www.fractalmandala.in/thea';
	$shareImage = '/images/blobblack.png';

	onMount(() => {
		$headTitle = 'thea';
	});
</script>

<Meta
	title={$pageTitle}
	metaDescription={$pageDescription}
	metaUrl={$pageUrl}
	metaImage={$shareImage}
/>
