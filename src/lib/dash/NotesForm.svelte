<script lang="ts">
	import { onMount, afterUpdate } from 'svelte';
	import { addNote } from '$lib/dash/fileuploader';
	import { showNote, noteStore } from '$lib/dash/alerts';
	import { slide } from 'svelte/transition';
	import StarterKit from '@tiptap/starter-kit';
	import { addNewNote } from '$lib/dash/notesutil';
	import { textareaAutosizeAction } from '$lib/gpt/textautoresize';
	import { Editor } from '@tiptap/core';
	import Zap from '$lib/design/iconset/zap.svelte';

	let element: any;
	let editor: any;
	let title = 'title';
	let tags = 'tags';
	let content = '';
	let language = 'language';
	let type = 'type';
	let showLang = false;
	let validator: boolean;

	async function handleSubmit() {
		if (validator === true) {
			showNote('no!', true);
		} else {
			addNewNote(title, content);
		}
	}

	function handleTitleFocus() {
		title = '';
	}

	function handleTagsFocus() {
		tags = '';
	}

	$: if (type === 'snippet') {
		showLang = true;
	} else {
		showLang = false;
	}

	$: if (content === '' || title === '') {
		validator = true;
	} else {
		validator = false;
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
			<Zap />
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
	<div class="tiptap">
		<div class="null" bind:this={element} />
	</div>
</form>

<style lang="sass">

.note-form
	@media screen and (min-width: 1024px)
		.rta-row
			column-gap: 1.6vw
			width: 100%
			#titleform
				width: 320px
			#tagsform
				width: 280px
	@media screen and (max-width: 1023px) and (min-width: 900px)
		.rta-row
			column-gap: 1.6vw
			flex-wrap: nowrap
			#titleform
				width: 300px
			#tagsform
				width: 240px
	@media screen and (max-width: 899px) and (min-width: 769px)
		.rta-row
			column-gap: 1.6vw
			flex-wrap: nowrap
			#titleform
				width: 300px
			#tagsform
				width: 240px
	@media screen and (max-width: 768px)
		align-items: stretch
		.rta-row
			column-gap: 1.6vw
			flex-wrap: nowrap
			#titleform
				width: 320px
			#tagsform
				width: 280px	
	

.tiptap
	border: 2px solid var(--background)


.inputformer
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
