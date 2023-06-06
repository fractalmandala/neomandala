<script lang="ts">
	import { onMount } from 'svelte';
	import { marked } from 'marked';
	import '$lib/styles/prism.css';
	import Prism from 'prismjs';
	export let data;

	onMount(() => {
		Prism.highlightAll();
	});
</script>

<div class="rta-grid grid2">
	<div class="rta-column mainpage p-top-64" style="row-gap: 20px">
		{@html marked.parse(data.content)}
	</div>
	<div class="sidebar p-top-64 rta-column xright grot" style="row-gap: 20px">
		{#if data.image}
			<div class="rta-image">
				<img src={data.image} alt={data.name} />
			</div>
		{/if}
		<h4 class="tt-u">{data.name}</h4>
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
