<script lang="ts">
	import { onMount } from 'svelte';
	import { filteredImages } from '$lib/utils/supabase';
	import { showModal } from '$lib/stores/modalstores';
	import { textareaAutosizeAction } from '$lib/gpt/textautoresize';
	import { showNote } from '$lib/dash/alerts';
	import supabase from '$lib/utils/supabase';
	let imagesTable: any;
	let initialFilter = 'abstract';
	let isType = Array(5).fill(false);
	let order: number;
	let image: string;
	let caption: string;

	async function submitCaption() {
		const { error } = await supabase
			.from('soaChapter2')
			.insert({ text: caption, image: image, order: order });
		if (error) {
			showNote('error', true);
		} else {
			showNote('done', false);
			caption = '';
		}
	}

	function toggleType(index: number) {
		isType[index] = !isType[index];
		for (let i = 0; i < isType.length; i++) {
			if (i !== index && isType[i] === true) {
				isType[i] = false;
			}
		}
	}

	function handleChange() {
		(async () => {
			imagesTable = await filteredImages(initialFilter);
		})();
	}

	function confirmDelete(id: number) {
		showModal('image', 'n', id);
	}

	onMount(async () => {
		imagesTable = await filteredImages(initialFilter);
	});
</script>

<div class="spanning p-bot-64 rta-column rowgap200">
	<div class="rta-row colgap200">
		<button class="genbutton" on:click={() => toggleType(1)}>Images</button>
		<button class="genbutton" on:click={() => toggleType(2)}>Submitter</button>
	</div>
	{#if isType[1]}
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
					<button class="blank-button rta-image" on:click={confirmDelete(item.id)}>
						<img src={item.link} alt={item.id} />
					</button>
				{/each}
			{/if}
		</div>
	{/if}
	{#if isType[2]}
		<form class="rta-column">
			<input type="number" bind:value={order} />
			<input type="url" bind:value={image} id="url" />
			<textarea use:textareaAutosizeAction bind:value={caption} />
			<button class="genbutton" on:click={submitCaption}>Submit</button>
		</form>
	{/if}
</div>

<style lang="sass">

form
	input, textarea
		width: 500px


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

textarea
	min-height: 80px

.grid4
	@media screen and (max-width: 1023px)
		grid-template-columns: 1fr 1fr 1fr 

</style>
