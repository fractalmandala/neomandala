<script>

	export let rotated = false

</script>

<div class="rta-icon rta-row ycenter" class:rotated={rotated}>
<svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M16 0C7.16344 0 0 7.16344 0 16C0 24.8366 7.16344 32 16 32C24.8366 32 32 24.8366 32 16C32 7.16344 24.8366 0 16 0ZM7 13.2334L15.8 22.0334L24.6 13.2667L22.3667 11.0334L15.8 17.6L9.23333 11L7 13.2334Z" fill="#0BC160"/>
</svg>

</div>

<style lang="sass">

.rta-icon
	cursor: pointer
	svg
		height: 21px
		object-fit: contain
		transition: 0.13s
		transform-origin: center center
	&:hover
		svg
			transform: scale(1.2)
			path
				fill: var(--gret)

.rta-icon.rotated
	svg
		transform: rotate(180deg)

</style>