<script lang="ts">
	import { onMount } from 'svelte';
	import { allMusic } from '$lib/utils/localpulls';
	import { breakZero, breakOne, breakTwo, themeMode, readingMode } from '$lib/stores/globalstores';
	import { audioStore } from '$lib/stores/modalstores';
	import Soundclouder1 from '$lib/components/Soundclouder.svelte';

	let images: any;
	let audio: any;
	audioStore.subscribe((value) => (audio = value));
	let fake = false;

	function fauxfake() {
		fake = !fake;
	}

	onMount(async () => {
		images = await allMusic();
	});
</script>

<div
	class="rta-grid grid2 minH"
	class:levelzero={$breakZero}
	class:levelone={$breakOne}
	class:leveltwo={$breakTwo}
	class:light={$themeMode}
	class:dark={!$themeMode}
>
	{#if images && images.length > 0}
		{#each images as item, i}
			<div class="rta-column height-40 p-all-16">
				<Soundclouder1 soundcloudLink={item.meta.soundcloudLink} />
			</div>
		{/each}
	{/if}
</div>

<style lang="sass">

.rta-grid.grid2
	@media screen and (min-width: 769px)
		padding: 56px 3.2vw
	@media screen and (max-width: 769px)
		padding: 56px 24px

</style>
