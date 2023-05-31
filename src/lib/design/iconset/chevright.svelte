<script lang="ts">
	export let dimension = 24;
	export let color = '#FFFFFF';
	export let rotated = false;
</script>

<svg
	xmlns="http://www.w3.org/2000/svg"
	width={dimension}
	height={dimension}
	viewBox="0 0 24 24"
	fill={color}
	stroke={color}
	stroke-width="1"
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
	fill: #10D56C
	stroke: #10D56C

</style>
