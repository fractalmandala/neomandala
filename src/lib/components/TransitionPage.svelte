<script lang="ts">
	import { onMount } from 'svelte';
	import Lenis from '@studio-freight/lenis';
	import { themeMode } from '$lib/stores/globalstores';
	import { fly } from 'svelte/transition';
	import { quadOut, quadIn } from 'svelte/easing';
  import { gsap } from 'gsap';
  import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';


	onMount(() => {
		const lenis = new Lenis({
			duration: 1.2,
			orientation: 'vertical',
			gestureOrientation: 'vertical',
			easing: (t: number): number => {
  return 1 - Math.pow(1 - t, 4);
},
			smoothWheel: true,
			wheelMultiplier: 0.5,
			smoothTouch: false,
			touchMultiplier: 0,
			infinite: false,
		});

		function raf(time: any) {
			lenis.raf(time);
			requestAnimationFrame(raf);
		}
		requestAnimationFrame(raf)

	});
</script>

<div
	class="transistor"
	in:fly={{ delay: 600, duration: 600, x: -700, opacity: 0, easing: quadOut }}
	out:fly={{ delay: 0, duration: 550, x: 700, easing: quadIn }}
	class:dark={!$themeMode}
	class:light={$themeMode}
>

	<slot />
</div>


<style lang="sass">

.gallery
	position: relative
	height: 100vh
	overflow: hidden
	.slides
		position: absolute
		top: 0
		left: 0


.slides
	display: flex
	width: 100%
	height: 100vh

.slide
	flex: 0 0 100%
	height: 100%
	background-size: cover
	background-position: center center
	background-repeat: no-repeat

</style>