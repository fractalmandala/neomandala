<script lang="ts">
	export let dimension = 16;
	export let color = '#878787';
</script>

<svg
	xmlns="http://www.w3.org/2000/svg"
	width={dimension}
	height={dimension}
	viewBox="0 0 24 24"
	fill="none"
	stroke={color}
	stroke-width="2"
	stroke-linecap="round"
	stroke-linejoin="round"
	class="feather feather-chevrons-up"
	><polyline points="17 11 12 6 7 11" /><polyline points="17 18 12 13 7 18" /></svg
>

<style lang="sass">

svg
	cursor: pointer
	&:hover
		stroke: #10D56C

</style>
