<script lang="ts">
	export let dimension = 16;
	export let background = 'var(--default)';
	export let fore = 'var(--this)';
</script>

<svg
	xmlns="http://www.w3.org/2000/svg"
	width={dimension}
	height={dimension}
	viewBox="0 0 24 24"
	fill={background}
	stroke={fore}
	stroke-width="2"
	stroke-linecap="round"
	stroke-linejoin="round"
	class="feather feather-plus-circle"
	><circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="16" /><line
		x1="8"
		y1="12"
		x2="16"
		y2="12"
	/></svg
>

<style lang="sass">

svg
	&:hover
		fill: #10D56C


</style>
