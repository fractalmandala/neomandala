<script lang="ts">
    
    import { onMount } from 'svelte';
    import { readingMode } from '$lib/stores/globalstores'
    import Lenis from '@studio-freight/lenis'
	import { themeMode } from '$lib/stores/globalstores'
	import { fly } from 'svelte/transition'
	import { quadOut, quadIn } from 'svelte/easing'

    onMount(async() => {
    	const lenis = new Lenis({
      	duration: 1.2,
      	orientation: 'vertical',
      	gestureOrientation: 'vertical',
      	lerp: 0.6,
      	smoothWheel: true,
      	wheelMultiplier: 0.7,
      	smoothTouch: false,
      	touchMultiplier: 1,
      	infinite: false,
      })
    
    	function raf(time: any){
      	lenis.raf(time)
      	requestAnimationFrame(raf)
    	}
    	requestAnimationFrame(raf)        
    })

</script>

<div class="transistor-side" in:fly={{ delay: 600, duration: 600, x: -100, easing: quadOut}} out:fly={{ delay: 0, duration: 550, opacity: 0, x: -100, easing: quadIn}} class:dark={!$themeMode} class:light={$themeMode} class:invisible={$readingMode}>
	<slot></slot>
</div>

