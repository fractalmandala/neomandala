<script lang="ts">
	export let dimension = 16;
	export let color = 'var(--default)';
</script>

<svg
	xmlns="http://www.w3.org/2000/svg"
	width={dimension}
	height={dimension}
	viewBox="0 0 24 24"
	fill={color}
	stroke={color}
	stroke-width="2"
	stroke-linecap="round"
	stroke-linejoin="round"
	class="feather feather-zap"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" /></svg
>

<style lang="sass">

svg
	cursor: pointer
	&:hover
		fill: #10D56C
		stroke: #10D56C

</style>
