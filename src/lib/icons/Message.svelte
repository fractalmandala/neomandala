<script lang="ts">
	export let dimension = 32;
	export let color = 'var(--background)';
</script>

<div class="rta-row ycenter">
	<svg
		width={dimension}
		height={dimension}
		viewBox="0 0 32 32"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
	>
		<path
			d="M4.73877 26.8649C4.12546 26.8649 3.59363 26.6397 3.14327 26.1894C2.69294 25.739 2.46777 25.2072 2.46777 24.5939V7.404C2.46777 6.78851 2.69294 6.25481 3.14327 5.8029C3.59363 5.35097 4.12546 5.125 4.73877 5.125H27.262C27.8775 5.125 28.4112 5.35097 28.8631 5.8029C29.315 6.25481 29.541 6.78851 29.541 7.404V24.5939C29.541 25.2072 29.315 25.739 28.8631 26.1894C28.4112 26.6397 27.8775 26.8649 27.262 26.8649H4.73877ZM16.0004 16.854L27.262 9.42067V7.404L16.0004 14.6707L4.73877 7.404V9.42067L16.0004 16.854Z"
			fill={color}
		/>
	</svg>
</div>

<style lang="sass">

.rta-row
	cursor: pointer
	svg
		object-fit: contain
		transition: 0.13s
		transform-origin: center center
		padding-bottom: 2px
	&:hover
		svg path
			fill: var(--green)
		svg
			transform: scale(0.88)

</style>
