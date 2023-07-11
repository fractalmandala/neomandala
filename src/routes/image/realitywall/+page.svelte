<script lang="ts">
	import Meta from '$lib/components/Meta.svelte';
	import { pageTitle, pageDescription, pageUrl, shareImage } from '$lib/stores/globalstores';

	$pageTitle = 'Reality Wall, a Visual Story at Fractal Maṇḍala';
	$pageDescription = 'Experiments in generative image tech, narrative and written supplements...';
	$pageUrl = 'https://www.fractalmandala.in/image/realitywall';
	$shareImage = '/images/realitywall.webp';
</script>

<Meta
	title={$pageTitle}
	metaDescription={$pageDescription}
	metaUrl={$pageUrl}
	metaImage={$shareImage}
/>

<div class="rta-image">
	<img src="/images/realitywall.webp" alt="realitywall" />
</div>

<style lang="sass">

.rta-image
	height: calc(100vh - 112px)

</style>
