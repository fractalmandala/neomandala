<script lang="ts">
	import { themeMode, breakZero, breakOne, breakTwo } from '$lib/stores/globalstores';
	import StarterKit from '@tiptap/starter-kit';
	import Image from '@tiptap/extension-image';
	import { Editor } from '@tiptap/core';
	import { onMount } from 'svelte';
	export let data;

	let element: any;
	let editor: any;

	const addImage = () => {
		const url = window.prompt('URL');
		if (url) {
			editor.chain().focus().setImage({ src: url }).run();
		}
	};

	onMount(() => {
		editor = new Editor({
			element: element,
			extensions: [StarterKit, Image],
			content: data.content,
			onTransaction: () => {
				// force re-render so `editor.isActive` works as expected
				editor = editor;
			}
		});
	});
</script>

<div class="rta-column">
	<h6>{data.title}</h6>
</div>
<div
	class="rta-column minH p-top-64"
	class:levelzero={$breakZero}
	class:levelone={$breakOne}
	class:leveltwo={$breakTwo}
	class:light={$themeMode}
	class:dark={!$themeMode}
>
	<div class="notepad rta-column">
		{#if editor}
			<div class="allbuttons">
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
				<button on:click={() => editor.chain().focus().unsetAllMarks().run()}> clear marks </button>
				<button on:click={() => editor.chain().focus().clearNodes().run()}> clear nodes </button>
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
				<button on:click={() => editor.chain().focus().setHardBreak().run()}> hard break </button>
				<button on:click={addImage}>Image</button>
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
		<div class="actualeditor" bind:this={element} />
	</div>
</div>
