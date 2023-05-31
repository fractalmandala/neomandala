<script lang="ts">
	import { slide } from 'svelte/transition';
	import ChevRight from '$lib/design/iconset/chevright.svelte';
	export let rotated = false;
</script>

<div class="rta-column">
	<div class="rta-row colgap50 ycenter">
		<!--
		<ChevRight {rotated} color={'#676767'} />
		-->
		<div class="accordion-head" class:rotated>
			<slot />
		</div>
	</div>
	{#if rotated}
		<div class="accordion-body ta-l" transition:slide={{ duration: 200 }}>
			<slot name="body" />
		</div>
	{/if}
</div>

<style lang="sass">

.accordion-head
	font-size: 14px
	padding-bottom: 8px
	font-family: 'Space Grotesk', sans-serif
	text-transform: uppercase
	font-weight: 500

.accordion-head.rotated
	color: #10D56C

.accordion-body
	font-size: 12px
	line-height: 1.28
	letter-spacing: 0.2px
	font-family: 'Space Grotesk', sans-serif
	text-transform: capitalize

</style>
