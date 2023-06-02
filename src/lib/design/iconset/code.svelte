<script lang="ts">
	export let dimension = 16;
	export let color = 'var(--default)';
	export let scaler = false;
</script>

<svg
	xmlns="http://www.w3.org/2000/svg"
	width={dimension}
	height={dimension}
	viewBox="0 0 24 24"
	fill="none"
	class:scaling={scaler}
	stroke={color}
	stroke-width="2"
	stroke-linecap="round"
	stroke-linejoin="round"
	class="feather feather-code"
	><polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" /></svg
>

<style lang="sass">

svg
	transform-origin: center center

.scaling
	&:hover
		transform: scale(1.2)


</style>
