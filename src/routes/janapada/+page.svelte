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
	$pageTitle = 'Janapada';
	$pageDescription = 'janapada notes';
	$pageUrl = 'https://www.fractalmandala.in/janapada';
	$shareImage = '/images/blobblack.png';

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
