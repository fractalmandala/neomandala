<script lang="ts">
	import { onMount } from 'svelte';
	import Meta from '$lib/components/Meta.svelte';
	import { readingMode } from '$lib/stores/globalstores';
	import { pageTitle, pageDescription, pageUrl, shareImage } from '$lib/stores/globalstores';

	export let data;

	$pageTitle = 'Wombo, a Visual Story at Fractal Maṇḍala';
	$pageDescription = 'Experiments in generative image tech, narrative and written supplements...';
	$pageUrl = 'https://www.fractalmandala.in/image/wombo';
	$shareImage =
		'https://wganhlzrylmkvvaoalco.supabase.co/storage/v1/object/public/images/website/grid.webp';
</script>

<Meta
	title={$pageTitle}
	metaDescription={$pageDescription}
	metaUrl={$pageUrl}
	metaImage={$shareImage}
/>

<div class="rta-grid grid2 right00 screen fullH">
	<div class="rta-column writing">
		<img src={data.link} alt={data.id} />
	</div>
	<div class="rta-column titlebox ybetween" class:invisible={$readingMode}>
		<h4 class="tt-u">{data.id}</h4>
	</div>
</div>

<style>
	.rta-column img {
		object-fit: cover;
		width: 100%;
		height: 100%;
	}

	.writing {
		height: 98vh;
	}
</style>
