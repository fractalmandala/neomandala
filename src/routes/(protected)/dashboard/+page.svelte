<script lang="ts">
	import { onMount } from 'svelte';
	import { filteredImages } from '$lib/utils/supabase';
	import { showModal } from '$lib/stores/modalstores';
	let imagesTable: any;
	let initialFilter = 'abstract';

	function handleChange() {
		(async () => {
			imagesTable = await filteredImages(initialFilter);
		})();
	}

	onMount(async () => {
		imagesTable = await filteredImages(initialFilter);
	});
</script>

<div class="spanning p-top-64 p-bot-64">
	<div class="rta-row selector grot m-bot-16">
		<select bind:value={initialFilter} on:change={handleChange}>
			<option value="sci-fi">SciFi</option>
			<option value="psychedelia">psychedelia</option>
			<option value="abstract">abstract</option>
			<option value="tripsurfer">tripsurfer</option>
			<option value="delete">delete</option>
			<option value="misc">misc</option>
			<option value="mandalas">mandalas</option>
			<option value="culture aesthetic">culture aesthetic</option>
			<option value="dharmascapes">dharmascapes</option>
			<option value="the once was">the once was</option>
			<option value="null">null</option>
			<option value="">blank</option>
		</select>
	</div>
	<div class="rta-grid grid4">
		{#if imagesTable && imagesTable.length > 0}
			{#each imagesTable as item}
				<button class="blank-button rta-image" on:click={showModal('image', 'n', item.id)}>
					<img src={item.link} alt={item.id} />
				</button>
			{/each}
		{/if}
	</div>
</div>

<style lang="sass">

.selector
	height: 32px
	select
		height: 20px
		font-family: 'Space Grotesk', sans-serif
		font-size: 12px
		font-weight: bold
		background: #10D56C
		color: white
		border: 1px solid #10D56C
		border-radius: 3px

.spanning
	@media screen and (min-width: 900px)
		padding-right: 8vw

</style>
