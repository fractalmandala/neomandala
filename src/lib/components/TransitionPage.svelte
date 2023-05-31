<script lang="ts">
	import { onMount } from 'svelte';
	import Lenis from '@studio-freight/lenis';
	import { themeMode } from '$lib/stores/globalstores';
	import { fly } from 'svelte/transition';
	import { quadOut, quadIn } from 'svelte/easing';

	onMount(() => {
		const lenis = new Lenis({
			duration: 1,
			orientation: 'vertical',
			gestureOrientation: 'vertical',
			smoothWheel: true,
			wheelMultiplier: 0.5,
			smoothTouch: false,
			touchMultiplier: 0,
			infinite: false
		});

		function raf(time: any) {
			lenis.raf(time);
			requestAnimationFrame(raf);
		}
		requestAnimationFrame(raf);
	});
</script>

<div
	class="transistor"
	in:fly={{ delay: 600, duration: 600, y: 700, opacity: 0, easing: quadOut }}
	out:fly={{ delay: 0, duration: 550, y: 700, easing: quadIn }}
	class:dark={!$themeMode}
	class:light={$themeMode}
>
	<slot />
</div>
