<script lang="ts">
	import { onMount } from 'svelte';
	import { marked } from 'marked';
	import supabase from '$lib/utils/supabase';
	import '$lib/styles/prism.css';
	import { showChip } from '$lib/stores/modalstores';
	import Prism from 'prismjs';
	export let data;

	let imagelink = '';
	let imtoggle = false;

	function toggleImage() {
		imtoggle = !imtoggle;
	}

	async function updateImage() {
		const { error } = await supabase
			.from('mandalapedia')
			.update({ image: imagelink })
			.eq('id', data.id);
		if (error) {
			showChip('error', '#fe4a49');
		} else {
			showChip('done', '#10D56c');
			imagelink = '';
			imtoggle = false;
		}
	}

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
		{#if data.synapse}
			<small>{data.synapse}</small>
		{/if}
		<h4 class="tt-u">{data.name}</h4>
		<div class="rta-row colgap200">
			<button class="blank-button" on:click={toggleImage}>
				<cite>Add Image</cite>
			</button>
			<button class="blank-button">
				<cite>Add Type</cite>
			</button>
		</div>
		{#if imtoggle}
			<div class="inputarea rta-column">
				<div class="rta-row colgap200">
					<input type="text" bind:value={imagelink} />
					<button class="genbutton" on:click={updateImage}>Submit</button>
				</div>
			</div>
		{/if}
	</div>
</div>

<style lang="sass">

.blank-button
	&:hover
		cite
			color: #10D56C

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
