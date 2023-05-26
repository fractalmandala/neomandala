<script lang="ts">

	import { onMount } from 'svelte'
	import { elementVisibility } from '$lib/utils/elementvisibility' 
	import { fly } from 'svelte/transition'
	import { elementVisibilityStore } from '$lib/stores/elementvisibilitystore'

	let ref: HTMLElement | null = null
	let textBody:string = 'Fractal'

	$: ({ isVisible } = elementVisibilityStore(ref));
	

</script>


<div class="revealer" bind:this={ref} class:revealed={$isVisible}>
	<h2 class="typett">
		{textBody}
	</h2>
	<div class="strip"></div>
</div>

<style lang="sass">

.revealer
	position: relative
	overflow: hidden
	.strip
		position: absolute
		top: 0
		left: 0
		width: 100%
		height: 100%
		content: ''
		background: var(--opposite)
		transition: 1s ease
		transition-delay: 2s

.revealed
	overflow: hidden
	.strip
		margin-top: 100%


</style>