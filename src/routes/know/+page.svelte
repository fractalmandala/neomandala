<script lang="ts">
	import { onMount, afterUpdate } from 'svelte';
	import supabase from '$lib/utils/supabase';
	import Box from '$lib/design/iconset/box.svelte';
	import StarterKit from '@tiptap/starter-kit';
	import { Editor } from '@tiptap/core';
	import NewIndex from '$lib/dash/NewIndex.svelte';

	export let data;
	let element: any;
	let editor: any;
	let name = 'name';
	let content = '';
	let image = 'image';
	let links = '';
	let tags = 'tags';
	let synapse = '';
	let slug = 'slug';

	function handleTitleFocus() {
		name = '';
	}

	function handleTagsFocus() {
		tags = '';
	}

	onMount(() => {
		editor = new Editor({
			element: element,
			extensions: [StarterKit],
			content: '',
			parseOptions: {
				preserveWhitespace: 'full'
			},
			onTransaction: () => {
				// force re-render so `editor.isActive` works as expected
				editor = editor;
			}
		});
	});

	afterUpdate(() => {
		content = editor.getText({ blockSeparator: '\n\n' });
	});
</script>

<div class="rta-column">
	{#if data.in === true}
		<div class="newindex">
			<NewIndex />
		</div>
	{/if}
</div>

<style lang="sass">

.rta-column
	width: 100%

</style>
