<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { Editor } from '@tiptap/core';
	import StarterKit from '@tiptap/starter-kit';
	import { breakZero, breakOne, breakTwo, themeMode, readingMode } from '$lib/stores/globalstores';
	import supabase from '$lib/utils/supabase';
	import { showChip } from '$lib/stores/modalstores';

	let element: any;
	let editor: any;
	let title = '';
	let tags = '';
	let language = '';
	let agent = 'snippet';
	let html: any;
	let isFeat = false;

	function toggleFeat() {
		isFeat = !isFeat;
	}

	async function insertNote() {
		if (title === '') {
			showChip('no!', '#fe4a49');
		} else {
			if (html === '') {
				showChip('content!', '#fe4a49');
			} else {
				if (language === '') {
					showChip('language!', '#fe4a49');
				} else {
				}
			}

			const { error } = await supabase.from('amrit-notes').insert({
				title: title,
				bool: isFeat,
				content: html,
				tags: tags,
				agent: agent,
				uuidtext: language
			});

			if (error) {
				throw new Error(error.message);
			} else {
				showChip('Success!', '#10D56C');
				(title = ''), (html = ''), (tags = ''), (agent = '');
			}
		}
	}

	onMount(() => {
		return (editor = new Editor({
			element: element,
			extensions: [StarterKit],
			content: agent,
			onTransaction: () => {
				// force re-render so `editor.isActive` works as expected
				editor = editor;
			},
			onUpdate: ({ editor }) => {
				html = editor.getHTML();
			}
		}));
	});
</script>

<div
	class="rta-grid grid2 left pad32 minH"
	class:levelzero={$breakZero}
	class:levelone={$breakOne}
	class:leveltwo={$breakTwo}
	class:light={$themeMode}
	class:dark={!$themeMode}
>
	<div class="rta-column colleft">
		<form class="formA rowgap100 rta-column colgap200" on:submit|preventDefault={insertNote}>
			<div class="rta-column rowgap100">
				<input type="text" placeholder="title" bind:value={title} />
				<div class="rta-row colgap100 between ycenter">
					<div class="rta-row input-label ycenter">
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

				{#if editor}
					<div class="styling">
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
						<button
							on:click={() => editor.chain().focus().toggleCode().run()}
							disabled={!editor.can().chain().focus().toggleCode().run()}
							class={editor.isActive('code') ? 'is-active' : ''}
						>
							code
						</button>
						<button
							on:click={() => editor.chain().focus().toggleCodeBlock().run()}
							class={editor.isActive('codeBlock') ? 'is-active' : ''}
						>
							code block
						</button>
					</div>
				{/if}
				<div class="edits" bind:this={element} />
			</div>
			<button class="mainbutton" type="submit" on:submit={insertNote}> submit </button>
		</form>
	</div>
	<div class="rta-column colright null monocode">
		<slot />
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
    background: rgba(255, 239, 129, 1)
    backdrop-filter: blur(2px)
    border-radius: 4px
    padding: 32px
    border: 1px solid var(--opposite)
    input[type=text]
        border: 1px solid var(--contraster)
        padding: 4px
    select
        border: 1px solid var(--contraster)
        padding: 4px

.levelzero
    .formA
        width: 360px

.levelone
    grid-template-areas: "colright" "colleft"
    row-gap: 48px
    .colright
        grid-area: colright
.light
    background: white

.leveltwo
    grid-template-areas: "colright" "colleft"
    row-gap: 48px
    .colright
        grid-area: colright


</style>
