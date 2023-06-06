<script lang="ts">
	export let data;
</script>

<div class="rta-grid grid2">
	<div class="rta-column font mainpage p-top-64" style="row-gap: 20px">
		<svelte:component this={data.content} />
	</div>
	<div class="sidebar p-top-64 rta-column xright grot" style="row-gap: 20px">
		<div class="rta-image">
			<img src={data.image} alt={data.title} />
		</div>
		<h4 class="tt-u">{data.title}</h4>
	</div>
</div>

<style lang="sass">

.rta-image
	height: 80px
	width: 80px
	border-radius: 100px
	img
		border-radius: 100px
		object-fit: cover
		height: 80px
		width: 80px

@media screen and (min-width: 1024px)
	.rta-grid.grid2
		grid-template-columns: 680px 1fr
		grid-template-areas: "center right"
		align-content: start
		align-items: start
		.sidebar
			grid-area: right
			justify-content: flex-start
			align-self: start
			position: sticky
			top: 56px
		.mainpage
			grid-area: center	
	
@media screen and (max-width: 1023px)
	.rta-grid.grid2
		grid-template-columns: 1fr
		grid-template-areas: "right" "center"
		.sidebar
			grid-area: right
		.mainpage
			grid-area: center


.sidebar
	align-self: start


</style>
