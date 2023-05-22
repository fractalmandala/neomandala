
<script lang="ts">


    export let dimension = 24

</script>

<div class="rta-icon" style="width: {dimension}px; height: {dimension}px">
<svg width="{dimension}" height="{dimension}" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M16 22.2754L20.7167 17.5507H11.2833L16 22.2754ZM6.07172 28.1993C5.44174 28.1993 4.90574 27.9783 4.46372 27.5363C4.02172 27.0942 3.80072 26.5582 3.80072 25.9283V6.07172C3.80072 5.43957 4.02172 4.9017 4.46372 4.45812C4.90574 4.01452 5.44174 3.79272 6.07172 3.79272H25.9283C26.5604 3.79272 27.0983 4.01452 27.5419 4.45812C27.9855 4.9017 28.2073 5.43957 28.2073 6.07172V25.9283C28.2073 26.5582 27.9855 27.0942 27.5419 27.5363C27.0983 27.9783 26.5604 28.1993 25.9283 28.1993H6.07172ZM6.07172 13.1232V25.9283H25.9283V13.1232H6.07172Z" fill="var(--green)"/>
</svg>

</div>

<style lang="sass">

.rta-icon
	cursor: pointer
	svg
		object-fit: contain
		transition: 0.13s
		transform-origin: center center
	&:hover
		svg
			transform: scale(0.88)

</style>