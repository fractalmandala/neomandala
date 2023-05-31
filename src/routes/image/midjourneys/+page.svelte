<script lang="ts">
	let scY: number;
	const slides = [
		{ id: 1, src: '/images/midjourneys/panel01.webp' },
		{ id: 2, src: '/images/midjourneys/panel02.webp' },
		{ id: 3, src: '/images/midjourneys/panel03.webp' },
		{ id: 4, src: '/images/midjourneys/panel04.webp' },
		{ id: 5, src: '/images/midjourneys/panel05.webp' },
		{ id: 6, src: '/images/midjourneys/panel06.webp' },
		{ id: 7, src: '/images/midjourneys/panel07.webp' },
		{ id: 8, src: '/images/midjourneys/panel08.webp' },
		{ id: 9, src: '/images/midjourneys/panel09.webp' },
		{ id: 10, src: '/images/midjourneys/panel10.webp' }
	];
</script>

<svelte:window bind:scrollY={scY} />

<div class="rta-column oneframe xright" data-lenis-scroll-snap-align="start">
	<div class="rta-image">
		<img src="/images/midjourneys/panel01.webp" alt="panel" />
	</div>
</div>
<div class="rta-column oneframe xleft" data-lenis-scroll-snap-align="start">
	<div class="rta-image">
		<img src="/images/midjourneys/panel02.webp" alt="panel" />
	</div>
</div>
<div class="rta-column oneframe xright" data-lenis-scroll-snap-align="start">
	<div class="rta-image">
		<img src="/images/midjourneys/panel03.webp" alt="panel" />
	</div>
</div>
<div class="rta-column oneframe xleft" data-lenis-scroll-snap-align="start">
	<div class="rta-image">
		<img src="/images/midjourneys/panel04.webp" alt="panel" />
	</div>
</div>
<div class="rta-column oneframe xright" data-lenis-scroll-snap-align="start">
	<div class="rta-image">
		<img src="/images/midjourneys/panel05.webp" alt="panel" />
	</div>
</div>
<div class="rta-column oneframe xleft" data-lenis-scroll-snap-align="start">
	<div class="rta-image">
		<img src="/images/midjourneys/panel06.webp" alt="panel" />
	</div>
</div>
<div class="rta-column oneframe xright" data-lenis-scroll-snap-align="start">
	<div class="rta-image">
		<img src="/images/midjourneys/panel07.webp" alt="panel" />
	</div>
</div>
<div class="rta-column oneframe xleft" data-lenis-scroll-snap-align="start">
	<div class="rta-image">
		<img src="/images/midjourneys/panel08.webp" alt="panel" />
	</div>
</div>
<div class="rta-column oneframe xright" data-lenis-scroll-snap-align="start">
	<div class="rta-image">
		<img src="/images/midjourneys/panel09.webp" alt="panel" />
	</div>
</div>
<div class="rta-column oneframe xleft" data-lenis-scroll-snap-align="start">
	<div class="rta-image">
		<img src="/images/midjourneys/panel10.webp" alt="panel" />
	</div>
</div>

<style lang="sass">

.oneframe
	height: 100vh
	overflow: hidden
	padding-top: 64px
	padding-bottom: 64px
	padding-left: 64px
	padding-right: 64px
	position: sticky
	top: 0
	.rta-image
		height: 100%
		img
			object-fit: contain
			height: 100%
	@media screen and (min-width: 1024px)
		backdrop-filter: blur(2px)
	@media screen and (max-width: 1023px)
		height: 100vh
		padding: 32px
		position: sticky
		top: 0
		.rta-image
			height: 100%
			img
				object-fit: contain
				width: 100%

</style>
