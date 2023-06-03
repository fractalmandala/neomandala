<script lang="ts">
	import { onMount, afterUpdate } from 'svelte';
	import supabase from '$lib/utils/supabase';
	import StarterKit from '@tiptap/starter-kit';
	import { Editor } from '@tiptap/core';
	import Save from '$lib/design/iconset/savegoogle.svelte';
	import { showChip } from '$lib/stores/modalstores';
	export let data;
	let linkpre = 'https://wganhlzrylmkvvaoalco.supabase.co/storage/v1/object/public/images/index/';
	let linkpost = '.webp';
	let imagelink = '';

	let element: any;
	let editor: any;
	let content: string;

	async function saveContent() {
		console.log(content);
		const { error } = await supabase
			.from('mandalapedia')
			.update({ content: content })
			.eq('id', data.id);
		if (error) {
			showChip('error!', '#fe4a49');
		} else showChip('saved', '#10D56C');
	}

	onMount(() => {
		imagelink = linkpre + data.slug + linkpost;

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

<div class="rta-grid">
	<div class="grot rta-row xend colgap300 null ycenter">
		<div class="rta-column rowgap200">
			<div class="rta-row">
				<p><strong>{data.id}</strong></p>
				<h1 class="bord-bot">{data.name}</h1>
			</div>
			<button class="blank-button" on:click={saveContent}>
				<Save />
			</button>
		</div>
		<div class="rta-image">
			<img src={imagelink} alt={data.name} />
		</div>
	</div>
	<div class="toptips">
		<div class="editor" bind:this={element} />
	</div>
	{content}
</div>

<style lang="sass">

@media screen and (min-width: 900px)
	.rta-image
		height: 200px
		width: 200px
		border-radius: 100px
		img
			border-radius: 100px
			object-fit: cover
			height: 200px
			width: 200px
	.editor
		width: 80%
		margin-left: 5%
		position: relative
		&::before
			position: absolute
			top: 0
			left: 0
			height: 64px
			width: 3px
			background: #10D56C
			content: ''

</style>
