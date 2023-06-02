<script lang="ts">
	import { onMount, afterUpdate } from 'svelte';
	import { showNote } from '$lib/dash/alerts';
	import { slide } from 'svelte/transition';
	import StarterKit from '@tiptap/starter-kit';
	import { addCode } from '$lib/dash/fileuploader';
	import { Editor } from '@tiptap/core';
	import Code from '$lib/design/iconset/code.svelte';

	let element: any;
	let editor: any;
	let title = 'title';
	let tags = 'tags';
	let content = '';
	let language = 'language';
	let showLang = false;
	let validator: boolean;

	async function handleSubmit() {
		if (validator === true) {
			showNote('no!', true);
		} else {
			addCode(title, tags, content, language);
		}
	}

	function handleTitleFocus() {
		title = '';
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

<form class="note-form null rta-column rowgap200 inputformer" transition:slide={{ axis: 'y' }}>
	<div class="rta-row ycenter">
		<button class="blank-button" on:click={handleSubmit}>
			<Code color={'#10D56C'} scaler={true} />
		</button>
		<input
			id="titleform"
			autocomplete="off"
			type="text"
			placeholder={title}
			bind:value={title}
			on:focus={handleTitleFocus}
		/>
		<input
			id="tagsform"
			type="text"
			placeholder={tags}
			bind:value={tags}
			on:focus={handleTagsFocus}
		/>
	</div>
	<div class="tiptapcoder">
		<div class="rta-row between ycenter null">
			<select bind:value={language}>
				<option value="html">html</option>
				<option value="html">js</option>
				<option value="html">sql</option>
				<option value="html">css</option>
				<option value="html">sass</option>
				<option value="html">shell</option>
			</select>
		</div>
		<div class="null" bind:this={element} />
	</div>
</form>

<style lang="sass">

.note-form
	padding-top: 0
	.rta-row
		column-gap: 1.6vw
		select
			padding: 0
			background: none
			color: var(--default)
			border: 1px solid var(--default)
			border-radius: 2px
			width: 64px
			outline: none
			font-family: 'Space Grotesk', sans-serif
			font-size: 10px
			font-weight: bold
			text-transform: uppercase
	@media screen and (min-width: 769px)
		width: 548px
		padding: 16px 1.6vw 16px 0

.tiptapcoder
	border: 1px solid var(--contraster)
	padding-left: 16px
	padding-right: 16px
	.rta-row
		height: 32px
		border-bottom: 1px solid var(--contraster)

.inputformer
	padding-top: 0
	.rta-row
		#titleform
			width: 320px
		#tagsform
			width: 240px	



.inputformer
	input[type=text]
		border-bottom: 1px solid var(--contraster)
		border-top: none
		border-left: none
		border-right: none
		background: none
		padding: 4px 8px
		color: var(--greyish)
		font-size: 12px
		font-family: 'Space Grotesk', sans-serif

</style>
