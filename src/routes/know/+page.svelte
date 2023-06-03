<script lang="ts">
	import { onMount, afterUpdate } from 'svelte';
	import supabase from '$lib/utils/supabase';
	import Box from '$lib/design/iconset/box.svelte';
	import StarterKit from '@tiptap/starter-kit';
	import { Editor } from '@tiptap/core';

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

<div class="rta-column p-top-32">
	<div class="rta-row grot ycenter colgap200">
		<Box dimension={20} />
		<input type="text" bind:value={name} id="titler" on:focus={handleTitleFocus} />
		<input
			type="text"
			bind:value={tags}
			id="tagger"
			on:focus={handleTagsFocus}
			placeholder={tags}
		/>
	</div>
	<div class="rta-row grot ycenter colgap200">
		<input type="text" bind:value={slug} id="slugger" placeholder={slug} />
		<input type="text" bind:value={image} id="imager" placeholder={image} />
		<select bind:value={synapse} id="optioner">
			<option value="ṛt">ṛt</option>
			<option value="kṛt">kṛt</option>
			<option value="dhṛt">dhṛt</option>
			<option value="ghṛt">ghṛt</option>
			<option value="bhṛt">bhṛt</option>
			<option value="nṛt">nṛt</option>
			<option value="smṛt">smṛt</option>
			<option value="mṛt">mṛt</option>
			<option value="vṛt">vṛt</option>
		</select>
	</div>
	<div class="rta-column indexingnote">
		<div class="null" bind:this={element} />
	</div>
	<button class="genbutton"> Send </button>
</div>

<style lang="sass">

#titler
	@media screen and (min-width: 1024px)
		width: 400px
	@media screen and (max-width: 1023px) and (min-width: 769px)
		width: 320px

#tagger
	@media screen and (min-width: 1024px)
		width: 280px
	@media screen and (max-width: 1023px) and (min-width: 769px)
		width: 200px

#slugger, #imager
	@media screen and (min-width: 1024px)
		width: 280px
	@media screen and (max-width: 1023px) and (min-width: 769px)
		width: 240px

#optioner
	font-size: 12px
	font-family: 'Space Grotesk', sans-serif
	background: #10D56C
	border: none
	padding: 2px 6px
	border-radius: 2px
	color: white
	width: 80px

.rta-column
	row-gap: 16px

input[type=text]
	border-bottom: 2px solid var(--background)
	border-top: none
	border-left: none
	border-right: none
	background: none
	padding: 4px 8px
	color: var(--greyish)
	font-size: 12px
	font-family: 'Space Grotesk', sans-serif

</style>
