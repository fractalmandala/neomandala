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
	class="feather feather-file-plus"
	><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline
		points="14 2 14 8 20 8"
	/><line x1="12" y1="18" x2="12" y2="12" /><line x1="9" y1="15" x2="15" y2="15" /></svg
>

<style lang="sass">

svg
	cursor: pointer

</style>
