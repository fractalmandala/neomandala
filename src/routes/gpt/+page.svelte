<script lang="ts">
	import Meta from '$lib/components/Meta.svelte';
	import Shell from '$lib/design/ShellTwo.svelte';
	import { pageTitle, pageDescription, shareImage, pageUrl } from '$lib/stores/globalstores';
	import ModOpenAI from '$lib/gpt/ModOpenAI.svelte';
	import ModHF from '$lib/gpt/ModHF.svelte';
	$pageTitle = 'Knowledge Index at Fractal Maṇḍala';
	$pageDescription = 'The digital garden as a WIP and in indexed form...';
	$pageUrl = 'https://www.fractalmandala.in/know';
	$shareImage =
		'https://wganhlzrylmkvvaoalco.supabase.co/storage/v1/object/public/images/website/grid.webp';

	let isBot = Array(4).fill(false);
	isBot[0] = true;

	function toggleBot(index: number) {
		isBot[index] = !isBot[index];
		for (let i = 0; i < isBot.length; i++) {
			if (i !== index && isBot[i] === true) {
				isBot[i] = false;
			}
		}
	}
</script>

<Meta
	title={$pageTitle}
	metaDescription={$pageDescription}
	metaUrl={$pageUrl}
	metaImage={$shareImage}
/>

<Shell>
	<div slot="side" class="rta-column">
		<div class="inside rta-column rowgap50">
			<button class="blank-button ta-l" on:click={() => toggleBot(0)}> OpenAI </button>
			<button class="blank-button ta-l" on:click={() => toggleBot(1)}> HuggingFace </button>
		</div>
	</div>
	<div slot="main" class="rta-column maincolumn">
		<div class="rta-column chatarea rowgap100">
			<p>hi</p>
		</div>
	</div>
</Shell>

<style lang="sass">

.maincolumn
	@media screen and (max-width: 1023px)
		padding: 80px 24px

</style>
