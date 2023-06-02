<script lang="ts">
	export let dimension = 16;
	export let color = 'var(--default)';
	export let rotated = false;
</script>

<svg
	xmlns="http://www.w3.org/2000/svg"
	width={dimension}
	height={dimension}
	viewBox="0 0 24 24"
	stroke={color}
	stroke-width="4"
	fill="none"
	stroke-linecap="round"
	stroke-linejoin="round"
	class="feather feather-chevron-right"
	class:isrotated={rotated}><polyline points="9 18 15 12 9 6" /></svg
>

<style lang="sass">

svg
	transform-origin: center center
	transition: 0.1s
	
svg.isrotated
	transform: rotate(90deg)
	stroke: #10D56C

</style>
