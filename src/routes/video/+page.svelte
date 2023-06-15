<script lang="ts">
	import { onMount } from 'svelte';
	import AppShell from '$lib/design/AppShell.svelte';
	import {
		breakZero,
		breakOne,
		breakTwo,
		themeMode,
		pageTitle,
		pageDescription,
		pageUrl,
		shareImage
	} from '$lib/stores/globalstores';
	import { allVideos } from '$lib/utils/localpulls';
	import { audioStore } from '$lib/stores/modalstores';
	import Youtuber from '$lib/components/Youtuber.svelte';

	let images: any;
	let audio: any;
	audioStore.subscribe((value) => (audio = value));
	let fake = false;

	$pageTitle = 'Videos at Fractal Maṇḍala';
	$pageDescription = 'Talks and dialogues on itihāsa, dharma, bhārata...';
	$pageUrl = 'https://www.fractalmandala.in/video';
	$shareImage =
		'https://wganhlzrylmkvvaoalco.supabase.co/storage/v1/object/public/images/website/grid.webp';

	function fauxfake() {
		fake = !fake;
	}

	onMount(async () => {
		images = await allVideos();
	});
</script>

<div
	class="rta-grid grid2 minH left"
	class:levelzero={$breakZero}
	class:levelone={$breakOne}
	class:leveltwo={$breakTwo}
	class:light={$themeMode}
	class:dark={!$themeMode}
>
	<div class="grot p-top-64 texter p-bot-32">
		<p>
			For a brief while (5 episodes) I ran a youtube channel, and some people were kind enough to
			invite me to theirs. I speak mostly on history and dharma.
		</p>
	</div>
	<div class="rta-grid grid2 rowgap200">
		{#if images && images.length > 0}
			{#each images as item}
				<Youtuber youTubeId={item.meta.videoid} />
			{/each}
		{/if}
	</div>
</div>

<style lang="sass">

.rta-grid.grid2
	@media screen and (min-width: 769px)
		padding: 56px 3.2vw
	@media screen and (max-width: 769px)
		padding: 56px 24px

.texter
	display: flex
	flex-direction: column
	row-gap: 16px
	@media screen and (min-width: 1024px)
		height: 200px
		position: sticky
		top: 128px

</style>
