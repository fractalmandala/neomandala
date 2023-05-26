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

	export async function insertNote() {
		const { error } = await supabase.from('amrit-notes').insert({ title: title, content: content });
		if (error) {
			throw new Error(error.message);
		} else {
			showChip('Success!', '#10D56C');
		}

		title = '';
		content = '';
	}

	export let data: PageData;

	onMount(() => {
		editor = new Editor({
			element: element,
			extensions: [StarterKit],
			content: '<p>Hello World! 🌍️ </p>',
			onTransaction: () => {
				// force re-render so `editor.isActive` works as expected
				editor = editor;
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
	class="rta-column"
	class:levelzero={$breakZero}
	class:levelone={$breakOne}
	class:leveltwo={$breakTwo}
	class:light={$themeMode}
	class:dark={!$themeMode}
>
	<div class="shellmain">
		<button class="blank-button" on:click={toggleNote}>
			<svg
				width="36"
				height="36"
				viewBox="0 0 300 300"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path
					d="M200 262.5H50C43.0937 262.5 37.5 256.906 37.5 250V50C37.5 43.0937 43.0937 37.5 50 37.5H250C256.906 37.5 262.5 43.0937 262.5 50V200L200 262.5Z"
					fill="url(#paint0_linear_1644_9620)"
				/>
				<path
					d="M250 262.5H150L262.5 150V250C262.5 256.906 256.906 262.5 250 262.5Z"
					fill="url(#paint1_linear_1644_9620)"
				/>
				<path
					d="M162.5 150H262.5L150 262.5V162.5C150 155.594 155.594 150 162.5 150Z"
					fill="url(#paint2_linear_1644_9620)"
				/>
				<defs>
					<linearGradient
						id="paint0_linear_1644_9620"
						x1="43.55"
						y1="43.55"
						x2="230.888"
						y2="230.888"
						gradientUnits="userSpaceOnUse"
					>
						<stop stop-color="#FEDE00" />
						<stop offset="1" stop-color="#FFD000" />
					</linearGradient>
					<linearGradient
						id="paint1_linear_1644_9620"
						x1="207.5"
						y1="207.5"
						x2="249.875"
						y2="249.875"
						gradientUnits="userSpaceOnUse"
					>
						<stop stop-color="#E5A505" />
						<stop offset="0.116" stop-color="#EAA804" />
						<stop offset="0.595" stop-color="#F8B301" />
						<stop offset="1" stop-color="#FDB700" />
					</linearGradient>
					<linearGradient
						id="paint2_linear_1644_9620"
						x1="153.719"
						y1="153.719"
						x2="207.775"
						y2="207.775"
						gradientUnits="userSpaceOnUse"
					>
						<stop stop-color="#4B4B4B" />
						<stop offset="1" stop-color="#3B3B3B" />
					</linearGradient>
				</defs>
			</svg>
		</button>
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

<style lang="sass">

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
