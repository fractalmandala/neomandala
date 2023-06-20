<script lang="ts">
	import { onMount } from 'svelte';
	import { lazyLoadImageAction } from '$lib/utils/lazyloader';
	import {
		themeMode,
		breakZero,
		breakOne,
		breakTwo,
		pageTitle,
		pageDescription,
		shareImage,
		pageUrl
	} from '$lib/stores/globalstores';
	import { supaImages } from '$lib/utils/supabase';

	let low = 1;
	let top = 100;
	let photos: any;
	let isBig = Array(800).fill(false);
	let fake = false;

	$pageTitle = 'Midjourney Generated Images at Fractal Maṇḍala';
	$pageDescription = 'Experiments in generative image tech, narrative and written supplements...';
	$pageUrl = 'https://www.fractalmandala.in/image';
	$shareImage =
		'https://wganhlzrylmkvvaoalco.supabase.co/storage/v1/object/public/images/website/grid.webp';

	function loadMore() {
		low += 100;
		top += 100;
		(async () => {
			photos = await supaImages(low, top);
		})();
	}

	function loadPrev() {
		low -= 100;
		top -= 100;
		(async () => {
			photos = await supaImages(low, top);
		})();
	}

	function fauxfake() {
		fake = !fake;
	}

	function toggleBig(index: number) {
		isBig[index] = !isBig[index];
		for (let i = 0; i < isBig.length; i++) {
			if (i !== index && isBig[i] === true) {
				isBig[i] = false;
			}
		}
	}

	onMount(async () => {
		photos = await supaImages(low, top);
	});
</script>

<div
	class="minH mainpagegrid grot"
	class:lzero={$breakZero}
	class:lone={$breakOne}
	class:ltwo={$breakTwo}
>
	<div
		class="block"
		style="background-image: url('https://wganhlzrylmkvvaoalco.supabase.co/storage/v1/object/public/images/sutaandsuda/01.png')"
	>
		<h5>
			<a href="/image/sutaandsuda">Sūta and Sudā</a>
		</h5>
	</div>
	<div
		class="block"
		style="background-image: url('https://wganhlzrylmkvvaoalco.supabase.co/storage/v1/object/public/images/midjourneys2/01.webp')"
	>
		<h5>
			<a href="/image/deepgreen">Deep Green</a>
		</h5>
	</div>
	<div
		class="block"
		style="background-image: url('https://wganhlzrylmkvvaoalco.supabase.co/storage/v1/object/public/images/midjourneys/panel01.webp')"
	>
		<h5>
			<a href="/image/midjourneys">Midjourneys</a>
		</h5>
	</div>
	<div
		class="block"
		style="background-image: url('https://wganhlzrylmkvvaoalco.supabase.co/storage/v1/object/public/images/nasadiya/1-2.webp')"
	>
		<h5>
			<a href="/image/nasadiya">Nāsadīya Across Space and Time</a>
		</h5>
	</div>
	<div
		class="block"
		style="background-image: url('https://rnfvzaelmwbbvfbsppir.supabase.co/storage/v1/object/public/brhatwebsite/13scrolls/midmap2.webp')"
	>
		<h5>
			<a href="/image/aryavarta">Āryavarta</a>
		</h5>
	</div>
	<div class="block" style="background-image: url('/images/realitywall.webp')">
		<h5>
			<a href="/image/realitywall">Reality Wall</a>
		</h5>
	</div>
	<div
		class="block"
		style="background-image: url('https://wganhlzrylmkvvaoalco.supabase.co/storage/v1/object/public/images/website/grid.webp')"
	>
		<h5>
			<a href="/image/wombo">Don't Fear the Wombo</a>
		</h5>
	</div>
	<div class="block" style="background-image: url('/images/k-videos.webp')">
		<h5>
			<a href="/image/gallery">Full Gallery</a>
		</h5>
	</div>
</div>

<style lang="sass">

.mainpagegrid
	display: grid
	grid-auto-flow: row
	box-sizing: border-box

.mainpagegrid.ltwo
	grid-template-columns: 1fr
	grid-template-areas: "."
	gap: 8px
	height: 100%
	padding-left: 8px
	padding-right: 8px
	.block
		display: flex
		flex-direction: column
		height: 20vh
		background-position: center center
		background-size: cover
		justify-content: center
		align-items: center
		transition: 0.2s
		border-radius: 8px
		h5
			transition: 0.1s
			opacity: 1
			background: rgba(0,0,0,0.6)
			padding: 4px 8px
			border: 1px solid rgba(0,0,0,0.6)
			border-radius: 4px
			box-shadow: 4px 4px 8px 5px rgba(0,0,0,0.8)
			text-align: center
			font-size: 24px

.mainpagegrid.lzero, .mainpagegrid.lone
	grid-template-columns: 1fr 1fr 1fr 1fr
	grid-template-areas: ". . . ."
	gap: 8px
	height: calc(100vh - 128px)
	align-items: center
	align-content: center
	.block
		display: flex
		flex-direction: column
		height: calc(50vh - 64px)
		background-position: center center
		background-size: cover
		justify-content: center
		align-items: center
		transition: 0.2s
		border-radius: 8px
		padding: 16px
		border: 2px solid transparent
		transform-origin: center center
		h5
			transition: 0.4s
			opacity: 0
			background: rgba(0,0,0,0.6)
			padding: 4px 8px
			border: 1px solid rgba(0,0,0,0.6)
			border-radius: 4px
			box-shadow: 4px 4px 8px 5px rgba(0,0,0,0.8)
			text-align: center
		&:hover
			border: 2px solid var(--default)
			h5
				opacity: 1
				&:hover
					border: 1px solid white
					box-shadow: 4px 4px 8px rgba(0,0,0,0.0)

.mainpagegrid
	&:hover
		.block
			filter: saturate(0.1)
			&:hover
				filter: saturate(1)

a
	&:hover
		color: #10D56C

h5
	font-weight: bold
	color: white
	a
		&:hover
			color: white


</style>
