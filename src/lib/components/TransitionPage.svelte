<script lang="ts">
	import { fade } from 'svelte/transition';
	import { cubicOut, circInOut, quintOut, quadIn } from 'svelte/easing';
	import { fly } from 'svelte/transition';
	import { themeMode } from '$lib/stores/globalstores';
	import type { FadeParams } from 'svelte/transition';

	// Define the clip-path transition function
	function clipPathTransition(t: number, reverse: boolean): string {
		const progress = reverse ? 1 - t : t;
		return `clip-path: inset(${progress * 100}% 0 0 0);`;
	}

	// Define a custom type that extends FadeParams and adds the css property
	type CustomFadeParams = FadeParams & { css?: (t: number) => string };

	// Define the in and out transitions using the custom type

	export const inTransition = (node: HTMLElement, params?: any) => {
		const customParams: CustomFadeParams = {
			duration: 500,
			delay: 0,
			easing: cubicOut,
			css: (t) => clipPathTransition(t, false)
		};
		return fade(node, customParams);
	};
	export const outTransition = (node: HTMLElement, params?: any) => {
		const customParams: CustomFadeParams = {
			duration: 500,
			delay: 0,
			easing: cubicOut,
			css: (t) => clipPathTransition(t, true)
		};
		return fade(node, customParams);
	};
</script>

<div
	in:fly|global={{ delay: 250, duration: 300, easing: quintOut, y: 900 }}
	out:fly|global={{ delay: 0, duration: 300, easing: quadIn, y: -900 }}
	class:light={$themeMode}
	class:dark={!$themeMode}
	class="minu"
>
	<slot />
</div>

<style lang="sass">

.minu
	height: 100%

.light
	background: #FFFFFF

.dark
	background: #171717

</style>
