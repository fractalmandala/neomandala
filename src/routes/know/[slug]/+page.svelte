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

<div class="rta-grid grid2 p-top-64">
	<div class="toptips">
		<div class="editor" bind:this={element} />
	</div>
	<div class="grot rta-column xright rowgap400 null">
		<div class="rta-column xright rowgap400">
			<div class="rta-row colgap200">
				<h3 class="bord-bot">{data.name}</h3>
				<p><strong>{data.id}</strong></p>
				<button class="blank-button" on:click={saveContent}>
					<Save />
				</button>
			</div>
		</div>
		<div class="rta-image">
			<img src={imagelink} alt={data.name} />
		</div>
	</div>
</div>

<style lang="sass">

.toptips
	padding: 0
	.editor
		width: 100%

.rta-image
	height: 80px
	width: 80px
	border-radius: 100px
	img
		border-radius: 100px
		object-fit: cover
		height: 80px
		width: 80px

@media screen and (min-width: 900px)
	.editor
		position: relative
		&::before
			position: absolute
			top: 0
			left: 0
			height: 64px
			width: 3px
			background: #10D56C
			content: ''
	.grot.xright.null
		place-self: flex-end
		position: sticky
		top: 128px
	.rta-grid.grid2
		grid-template-columns: 1fr 240px
		grid-template-areas: "center right"
		align-content: start
		align-items: start
		.grot.rta-column
			grid-area: right
			justify-content: flex-start
			align-self: start
		.toptips
			grid-area: center	


@media screen and (max-width: 899px) and (min-width: 769px)
	.rta-grid.grid2
		grid-template-columns: 1fr 180px
		grid-template-areas: "center right"
		.grot.rta-column
			grid-area: right
			justify-content: flex-start
			align-self: start
		.toptips
			grid-area: center
	
@media screen and (max-width: 768px)
	.rta-grid.grid2
		grid-template-columns: 1fr
		grid-template-areas: "right" "center"
		.grot.rta-column
			grid-area: right
		.toptips
			grid-area: center


.grot.rta-column
	align-self: start


</style>
