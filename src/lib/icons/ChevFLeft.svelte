<script>
	export let rotated = false;
	export let dimension = 21;
</script>

<div class="rta-icon go-green rta-row ycenter" class:rotated>
	<svg
		width={dimension}
		height={dimension}
		viewBox="0 0 32 32"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
	>
		<path
			fill-rule="evenodd"
			clip-rule="evenodd"
			d="M16 0C7.16344 0 0 7.16344 0 16C0 24.8366 7.16344 32 16 32C24.8366 32 32 24.8366 32 16C32 7.16344 24.8366 0 16 0ZM7 13.2334L15.8 22.0334L24.6 13.2667L22.3667 11.0334L15.8 17.6L9.23333 11L7 13.2334Z"
			fill="#474747"
		/>
	</svg>
</div>

<style lang="sass">

.rta-icon
	cursor: pointer
	svg
		object-fit: contain
		transition: 0.13s
		transform-origin: center center
		transform: rotate(90deg)


</style>
