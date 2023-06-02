<script lang="ts">
	import { onMount } from 'svelte';
	import { reveal } from 'svelte-reveal';
	import Parallax from '$lib/components/Parallax.svelte';
	import Parallax2 from '$lib/components/Parallax.svelte';
	import { supaImages, featuredWritings } from '$lib/utils/supabase';
	import { elementVisibilityStore } from '$lib/stores/elementvisibilitystore';
	import { featuredWebdev } from '$lib/utils/localpulls';
	import { breakZero, breakOne, breakTwo, themeMode, scrollY } from '$lib/stores/globalstores';
	let ref: HTMLElement | null = null;

	$: ({ isVisible } = elementVisibilityStore(ref));

	let posts: any;
	let webs: any;
	let images: any;
	let low = 0;
	let top = 7;
	let scY: number;
	let trY: number;

	$: if ($isVisible) {
		trY = scY;
	} else {
		trY = 0;
	}

	onMount(() => {
		(async () => {
			images = await supaImages(low, top);
			posts = await featuredWritings();
			webs = await featuredWebdev();
		})();
	});
</script>

<svelte:head>
	<title>Fractal Maṇḍala | digital garden and buildstation</title>
</svelte:head>

<svelte:window bind:scrollY={scY} />
<div class="grid12box font">
<div class="rta-grid minH ycenter xleft padded6 font">
		<img
		class="mandalaimage"
		src="/images/mands.webp"
		alt="mands"
		style="transform: rotate({scY / 3}deg)"
		/>
		<h2 class="gradienter tt-u">The Fractal Maṇḍala</h2>
		<div class="space glass-bottom" use:reveal={{ delay: 500 }}>
		Here I document what I learn, build and write. <br>I develop web products, create historical
		fiction worlds, dabble in psytrance production<br> and write essays on Indian history and
		civilizational consciousness.
		</div>
	</div>
</div>


<style lang="sass">

.mandalaimage
	width: 100px
	height: 100px
	transform-origin: center center
	margin-right: auto

a
	&:hover
		h4, h5
			text-decoration: underline

a
	h4, h5
		transition: 0.08s ease

.x01
	height: 50vh
	.back
		background-image: url('https://rnfvzaelmwbbvfbsppir.supabase.co/storage/v1/object/public/brhatwebsite/10mandala/ogmandala.webp')
		height: 100%
		width: 100%
		background-size: 320px

.x11
	min-height: 100vh
	overflow: hidden

</style>
