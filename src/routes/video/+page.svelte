<script lang="ts">
	import { onMount } from 'svelte';
	import AppShell from '$lib/design/AppShell.svelte';
	import { breakZero, breakOne, breakTwo, themeMode, readingMode } from '$lib/stores/globalstores';
	import { allVideos } from '$lib/utils/localpulls';
	import { audioStore } from '$lib/stores/modalstores';
	import Youtuber from '$lib/components/Youtuber.svelte';

	let images: any;
	let audio: any;
	audioStore.subscribe((value) => (audio = value));
	let fake = false;

	function fauxfake() {
		fake = !fake;
	}

	onMount(async () => {
		images = await allVideos();
	});
</script>

<div
	class="rta-column pad32"
	class:levelzero={$breakZero}
	class:levelone={$breakOne}
	class:leveltwo={$breakTwo}
	class:light={$themeMode}
	class:dark={!$themeMode}
>
	<div class="rta-grid grid2 colgap100 rowgap300 p-top-32 null">
		{#if images && images.length > 0}
			{#each images as item}
				<div class="rta-column">
					<div class="w32 height-40-40">
						<Youtuber youTubeId={item.meta.videoid} />
					</div>
				</div>
			{/each}
		{/if}
	</div>
</div>
