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
	$pageTitle = 'Videos at Fractal Maṇḍala';
	$pageDescription = 'Talks and dialogues on itihāsa, dharma, bhārata...';
	$pageUrl = 'https://www.fractalmandala.in/video';
	$shareImage =
		'https://wganhlzrylmkvvaoalco.supabase.co/storage/v1/object/public/images/website/grid.webp';

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
