<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { Editor } from '@tiptap/core';
	import StarterKit from '@tiptap/starter-kit';
	import { breakZero, breakOne, breakTwo, themeMode, readingMode } from '$lib/stores/globalstores';
	import type { PageData } from './$types';
  import { slide } from 'svelte/transition'
	import { showChip, showNote, hideNote, noteStore } from '$lib/stores/modalstores';
	import NewNote from '$lib/components/NewNote.svelte';
	import supabase from '$lib/utils/supabase';
	import '$lib/styles/design.sass';
	import NoteAdd from '$lib/icons/NoteAdd.svelte';

	let element: any;
	let editor: any;

	let title = '';
	let content = '';
	let tags = '';
	let snippet = '';
	let language = '';
	let newNotedd = 32;
	let agent = 'snippet'
	let prefill = ''

	let newNote = false;
	let isTag = false;
	let isFeat = false;
	let fake = false;
	let featured: boolean = false;

	function toggleNote() {
		newNote = !newNote;
	}

	function toggleTag() {
		isTag = !isTag;
	}

	function toggleFeat() {
		isFeat = !isFeat;
		if (isFeat === true) {
			featured = true;
		}
	}

	function fauxfake() {
		fake = !fake;
	}

	async function insertNote() {

		const { error } = await supabase.from('amrit-notes').insert({ title: title, content: html, tags: tags, agent: agent, uuidtext: language });
		if (error) {
			throw new Error(error.message);
		} else {
			showChip('Success!', '#10D56C');
			title = '',
			html = '',
			tags = ''

		}

	}

	export let data: PageData;
	let html:any
	
	onMount(() => {
		return editor=new Editor({
			element: element,
			extensions: [StarterKit],
			content: prefill,
			onTransaction: () => {
				// force re-render so `editor.isActive` works as expected
				editor=editor;
			},
			onUpdate: ({ editor }) => {
				html = editor.getHTML()
			}
		});
	});

	

	onDestroy(() => {
		if (editor) {
			editor.destroy();
		}
	});
</script>

<div
	class="rta-column pad32"
	class:levelzero={$breakZero}
	class:levelone={$breakOne}
	class:leveltwo={$breakTwo}
	class:light={$themeMode}
	class:dark={!$themeMode}
>
	<div class="rta-grid grid2">
		<div class="rta-column">
			<form class="formA rta-grid grid2 colgap200" on:submit|preventDefault={insertNote} transition:slide>
				<div class="rta-column ybetween rowgap200">
					<div class="rta-column rowgap100">
						<input type="text" placeholder="title" bind:value={title} />
						<div class="rta-row colgap100 between ycenter">
							<div class="rta-row input-label ycenter">
								<label for="tag">Tags</label>
								<input type="text" id="tag" bind:value={tags} />
							</div>
							<div class="rta-row input-label ycenter">
								<input type="checkbox" id="bool" on:click={toggleFeat} />
								<label for="bool">
									{#if isFeat}
										TRUE
									{:else}
										Feat
									{/if}
								</label>
							</div>
							<select bind:value={language}>
								<option value="html">HTML</option>
								<option value="javascript">JS</option>
								<option value="sass">SASS</option>
								<option value="css">CSS</option>
								<option value="sql">SQL</option>
							</select>
						</div>
						{#if isTag}
							<input type="text" placeholder="tags" bind:value={tags} />
						{/if}
						{#if editor}
							<div class="styling">
								<button
									on:click={() => editor.chain().focus().toggleBold().run()}
									disabled={!editor.can().chain().focus().toggleBold().run()}
									class={editor.isActive('bold') ? 'is-active' : ''}
								>
									bold
								</button>
								<button
									on:click={() => editor.chain().focus().toggleItalic().run()}
									disabled={!editor.can().chain().focus().toggleItalic().run()}
									class={editor.isActive('italic') ? 'is-active' : ''}
								>
									italic
								</button>
								<button
									on:click={() => editor.chain().focus().toggleStrike().run()}
									disabled={!editor.can().chain().focus().toggleStrike().run()}
									class={editor.isActive('strike') ? 'is-active' : ''}
								>
									strike
								</button>
								<button
									on:click={() => editor.chain().focus().toggleCode().run()}
									disabled={!editor.can().chain().focus().toggleCode().run()}
									class={editor.isActive('code') ? 'is-active' : ''}
								>
									code
								</button>
								<button on:click={() => editor.chain().focus().unsetAllMarks().run()}>
									clear marks
								</button>
								<button on:click={() => editor.chain().focus().clearNodes().run()}>
									clear nodes
								</button>
								<button
									on:click={() => editor.chain().focus().setParagraph().run()}
									class={editor.isActive('paragraph') ? 'is-active' : ''}
								>
									paragraph
								</button>
								<button
									on:click={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
									class={editor.isActive('heading', { level: 1 }) ? 'is-active' : ''}
								>
									h1
								</button>
								<button
									on:click={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
									class={editor.isActive('heading', { level: 2 }) ? 'is-active' : ''}
								>
									h2
								</button>
								<button
									on:click={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
									class={editor.isActive('heading', { level: 3 }) ? 'is-active' : ''}
								>
									h3
								</button>
								<button
									on:click={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
									class={editor.isActive('heading', { level: 4 }) ? 'is-active' : ''}
								>
									h4
								</button>
								<button
									on:click={() => editor.chain().focus().toggleHeading({ level: 5 }).run()}
									class={editor.isActive('heading', { level: 5 }) ? 'is-active' : ''}
								>
									h5
								</button>
								<button
									on:click={() => editor.chain().focus().toggleHeading({ level: 6 }).run()}
									class={editor.isActive('heading', { level: 6 }) ? 'is-active' : ''}
								>
									h6
								</button>
								<button
									on:click={() => editor.chain().focus().toggleBulletList().run()}
									class={editor.isActive('bulletList') ? 'is-active' : ''}
								>
									bullet list
								</button>
								<button
									on:click={() => editor.chain().focus().toggleOrderedList().run()}
									class={editor.isActive('orderedList') ? 'is-active' : ''}
								>
									ordered list
								</button>
								<button
									on:click={() => editor.chain().focus().toggleCodeBlock().run()}
									class={editor.isActive('codeBlock') ? 'is-active' : ''}
								>
									code block
								</button>
								<button
									on:click={() => editor.chain().focus().toggleBlockquote().run()}
									class={editor.isActive('blockquote') ? 'is-active' : ''}
								>
									blockquote
								</button>
								<button on:click={() => editor.chain().focus().setHorizontalRule().run()}>
									horizontal rule
								</button>
								<button on:click={() => editor.chain().focus().setHardBreak().run()}>
									hard break
								</button>
								<button
									on:click={() => editor.chain().focus().undo().run()}
									disabled={!editor.can().chain().focus().undo().run()}
								>
									undo
								</button>
								<button
									on:click={() => editor.chain().focus().redo().run()}
									disabled={!editor.can().chain().focus().redo().run()}
								>
									redo
								</button>
							</div>
						{/if}
						<div class="edits" bind:this={element} />
					</div>
					<button class="mainbutton" type="submit" on:submit={insertNote}> submit </button>
				</div>
			</form>
		</div>
	</div>
</div>

<style lang="sass">

.edits
    word-break: break-word

.styling
    button
        background: none
        border: 1px solid white
        border-radius: 4px
        
.mainbutton
    background: #FFD000
    font-weight: bold
    &:hover
        border: 2px solid #474747
        color: #474747


.edits
    border: 1px solid var(--contraster)
    background: var(--opposite)
    border-radius: 5px
    padding: 12px
    min-height: 200px

.formA
    background: #FFEF81
    border-radius: 4px
    padding: 32px
    input[type=text]
        border: 1px solid var(--contraster)
        padding: 4px
    select
        border: 1px solid var(--contraster)
        padding: 4px

.levelzero
    .formA
        width: 420px

</style>
