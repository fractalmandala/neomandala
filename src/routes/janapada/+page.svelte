<script lang="ts">
	import { onMount } from 'svelte';
	import Meta from '$lib/components/Meta.svelte';
	import { allJanapada } from '$lib/utils/supastream';
	import {
		noteName,
		showSave,
		headTitle,
		pageTitle,
		pageDescription,
		shareImage,
		pageUrl
	} from '$lib/stores/globalstores';

	let novels: any;

	$: $headTitle = 'janapada';
	$pageTitle = 'Knowledge Index at Fractal Maṇḍala';
	$pageDescription = 'The digital garden as a WIP and in indexed form...';
	$pageUrl = 'https://www.fractalmandala.in/know';
	$shareImage =
		'https://wganhlzrylmkvvaoalco.supabase.co/storage/v1/object/public/images/website/grid.webp';

	onMount(async () => {
		novels = await allJanapada();
	});
</script>

<Meta
	title={$pageTitle}
	metaDescription={$pageDescription}
	metaUrl={$pageUrl}
	metaImage={$shareImage}
/>
