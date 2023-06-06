<script lang="ts">
	import { slide } from 'svelte/transition';
	import ChevRight from '$lib/design/iconset/chevright.svelte';
	export let rotated = false;

	function handleClick() {
		rotated = !rotated;
	}
</script>

<div class="rta-column">
	<button class="blank-button accordion-head" class:rotated on:click={handleClick}>
		<p><slot /></p>
	</button>

	{#if rotated}
		<div class="accordion-body ta-l" transition:slide={{ duration: 400 }}>
			<slot name="body" />
		</div>
	{/if}
</div>

<style lang="sass">

.blank-button
	padding: 0
	text-align: left

.accordion-head
	font-family: 'Space Grotesk', sans-serif
	text-transform: capitalize
	cursor: pointer
	color: var(--greyish)
	&:hover
		color: var(--background)
	p
		font-size: 16px

.accordion-head.rotated
	color: #10D56C

.accordion-body
	font-size: 14px
	line-height: 1.6
	letter-spacing: 0.2px
	font-family: 'Space Grotesk', sans-serif
	text-transform: capitalize
	color: var(--greyish)
	padding: 8px 0

</style>
