<script lang="ts">
	import { onMount } from 'svelte';
	import { gsap } from 'gsap';
	import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

	let el: HTMLElement;
	export let textContent = '';

	onMount(() => {
		gsap.registerPlugin(ScrollTrigger);

		gsap.from(el, {
			scrollTrigger: el,
			y: 64, // adjust for desired start position
			autoAlpha: 0,
			duration: 1
		});
	});
</script>

<div bind:this={el}>
	<slot name="head" />
	<h5>{textContent}</h5>
	<div class="space">
		<slot name="par" />
	</div>
</div>
