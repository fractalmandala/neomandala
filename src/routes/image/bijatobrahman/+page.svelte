<script lang="ts">
	import Meta from '$lib/components/Meta.svelte';
	import { pageTitle, pageDescription, pageUrl, shareImage } from '$lib/stores/globalstores';

	$pageTitle = 'Bīja to Brahman, a Visual Story at Fractal Maṇḍala';
	$pageDescription = 'Experiments in generative image tech, narrative and written supplements...';
	$pageUrl = 'https://www.fractalmandala.in/image/bijatobrahman';
	$shareImage = '/images/bijamin.webp';
</script>

<Meta
	title={$pageTitle}
	metaDescription={$pageDescription}
	metaUrl={$pageUrl}
	metaImage={$shareImage}
/>

<div class="rta-image">
	<img src="/images/bijamin.webp" alt="bija to brahman" />
</div>
