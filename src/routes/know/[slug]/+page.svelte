<script lang="ts">
	//@ts-nocheck
	import { onMount } from 'svelte';
	import { marked } from 'marked';
	import { themeMode } from '$lib/stores/globalstores';
	import supabase from '$lib/utils/supabase';
	import '$lib/styles/prism.css';
	import { showChip } from '$lib/stores/modalstores';
	import { indexName, indexCategory, indexLinks, indexTags } from '$lib/stores/globalstores';
	import Prism from 'prismjs';
	export let data;

	let imagelink = '';
	let imtoggle = false;
	let isEdit = false;

	$indexName = data.name;
	$indexCategory = data.synapse;
	$indexLinks = data.links;

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

<div class="contentbox" class:light={$themeMode} class:dark={!$themeMode}>
	<div class="content">
		{@html marked.parse(data.content)}
	</div>
</div>

<style lang="sass">


.content
	display: flex
	flex-direction: column
	row-gap: 20px

</style>
