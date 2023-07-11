<script lang="ts">
	import { onMount } from 'svelte';
	import Meta from '$lib/components/Meta.svelte';
	import { allMusic } from '$lib/utils/localpulls';
	import {
		breakZero,
		breakOne,
		breakTwo,
		themeMode,
		pageTitle,
		pageDescription,
		shareImage,
		pageUrl
	} from '$lib/stores/globalstores';
	import { audioStore } from '$lib/stores/modalstores';
	import Soundclouder1 from '$lib/components/Soundclouder.svelte';
	import Youtube from '$lib/design/iconset/youtube.svelte';
	import Amazon from '$lib/design/iconset/amazon.svelte';
	import Sound from '$lib/design/iconset/soundcloud.svelte';
	import Spotify from '$lib/design/iconset/spotify.svelte';

	let images: any;
	let audio: any;
	audioStore.subscribe((value) => (audio = value));
	let fake = false;

	$pageTitle = 'Music at Fractal Maṇḍala';
	$pageDescription = 'Forays in amateur psytrance production over the years...';
	$pageUrl = 'https://www.fractalmandala.in/sound';
	$shareImage =
		'https://wganhlzrylmkvvaoalco.supabase.co/storage/v1/object/public/images/website/grid.webp';

	function fauxfake() {
		fake = !fake;
	}

	onMount(async () => {
		images = await allMusic();
	});
</script>

<Meta
	title={$pageTitle}
	metaDescription={$pageDescription}
	metaUrl={$pageUrl}
	metaImage={$shareImage}
/>

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
			Since ~2005 I've dabbled in psytrance production, off and on. Early on, I liked the name
			Scrolls of Aryavarta. But in recent years I've produced under the name Tripsurfer. I am the
			not-so-proud innovator of the subgenre of absolutely-amateurish psytrance. Sample some...
		</p>
		<div class="rta-row colgap200">
			<a href="https://soundcloud.com/tripsurfer" target="_blank" rel="noreferrer">
				<Sound />
			</a>
			<a
				href="https://open.spotify.com/artist/7kyfFEEMs2Jg6FLF5gpC7O?si=aCqdOL_eRsO1D_OEfuyc0Q"
				target="_blank"
				rel="noreferrer"
			>
				<Spotify />
			</a>
			<a
				href="https://music.youtube.com/channel/UCZpvB_tpsx6Pj3g78uc0rtg?feature=share"
				target="_blank"
				rel="noreferrer"
			>
				<Youtube />
			</a>
			<a
				href="https://music.amazon.in/artists/B072QC9LNP/tripsurfer?marketplaceId=A3K6Y4MI8GDYMT&musicTerritory=IN&ref=dm_sh_F2bx9ttSP58fxxuqAUyQO05W1"
				target="_blank"
				rel="noreferrer"
			>
				<Amazon />
			</a>
		</div>
	</div>
	<div class="rta-column rowgap200">
		{#if images && images.length > 0}
			{#each images as item, i}
				<Soundclouder1 soundcloudLink={item.meta.soundcloudLink} />
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
