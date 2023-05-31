<script lang="ts">
	import { themeMode, breakZero, breakOne, breakTwo } from '$lib/stores/globalstores';
	import StarterKit from '@tiptap/starter-kit';
	import { createNewNote } from '$lib/dash/notesutil';
	import Image from '@tiptap/extension-image';
	import FloatingMenu from '@tiptap/extension-floating-menu';
	import { Editor } from '@tiptap/core';
	import { onMount, afterUpdate } from 'svelte';
	import { articleDrafts } from '$lib/utils/supabase';
	import Send from '$lib/icons/Send.svelte';
	import supabase from '$lib/utils/supabase';
	import { showChip } from '$lib/stores/modalstores';
	import Save from '$lib/design/iconset/save.svelte';
	import { v4 as uuidv4 } from 'uuid';

	let element: any;
	let editor: any;
	let articles: any;
	let title = '';
	let text = '';
	let loading = false;
	let placeholderTitle = 'title document...';
	let serif = 'Adobe Devanagari';
	let sans = 'Authentic Sans';
	let monospace = 'Space Mono';
	let grotesk = 'Space Grotesk';
	let timestamp = '';
	let id = '';

	let isFont = Array(4).fill(false);
	isFont[0] = true;

	function handleChangedFont(index: number) {
		isFont[index] = !isFont[index];
		for (let i = 0; i < isFont.length; i++) {
			if (i !== index && isFont[i] === true) {
				isFont[i] = false;
			}
		}
	}

	function confirmNoteSave() {
		timestamp = new Date().toISOString();
		id = uuidv4();
		createNewNote(title, text, timestamp, id);
	}

	async function handleInput() {
		const { error } = await supabase
			.from('amrit-notes')
			.insert({ title: title, content: text, agent: 'article' });
		if (error) {
			showChip('error!', '#fe4a49');
		} else {
			showChip('done!', '#10D56C');
		}
	}

	const addImage = () => {
		const url = window.prompt('URL');
		if (url) {
			editor.chain().focus().setImage({ src: url }).run();
		}
	};

	function handleFocus() {
		placeholderTitle = '';
	}

	onMount(() => {
		(editor = new Editor({
			element: element,
			extensions: [StarterKit, Image, FloatingMenu],
			content: `
          `,
			onTransaction: () => {
				// force re-render so `editor.isActive` works as expected
				editor = editor;
			}
		})),
			(async () => {
				articles = await articleDrafts();
			})();
	});

	afterUpdate(() => {
		text = editor.getText({ blockSeparator: '\n\n' });
	});
</script>

<div class="rta-column actualsection">
	<div class="inctualsection">
		<div class="rta-row colgap200 bord-bot titleinputter">
			<button class="blank-button">
				<Save dimension={32} />
			</button>
			<input type="text" placeholder={placeholderTitle} bind:value={title} on:focus={handleFocus} />
		</div>
		<div class="rightstrip">
			{#if editor}
				<div class="allbuttons">
					<div class="rta-row first">
						<button
							on:click={() => editor.chain().focus().toggleBold().run()}
							disabled={!editor.can().chain().focus().toggleBold().run()}
							class={editor.isActive('bold') ? 'is-active' : ''}
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="12"
								height="12"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								stroke-width="3"
								stroke-linecap="round"
								stroke-linejoin="round"
								class="lucide lucide-bold"
								><path d="M14 12a4 4 0 0 0 0-8H6v8" /><path d="M15 20a4 4 0 0 0 0-8H6v8Z" /></svg
							>
						</button>
						<button
							on:click={() => editor.chain().focus().toggleItalic().run()}
							disabled={!editor.can().chain().focus().toggleItalic().run()}
							class={editor.isActive('italic') ? 'is-active' : ''}
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="12"
								height="12"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								stroke-width="3"
								stroke-linecap="round"
								stroke-linejoin="round"
								class="lucide lucide-italic"
								><line x1="19" x2="10" y1="4" y2="4" /><line x1="14" x2="5" y1="20" y2="20" /><line
									x1="15"
									x2="9"
									y1="4"
									y2="20"
								/></svg
							>
						</button>
						<button
							on:click={() => editor.chain().focus().toggleCodeBlock().run()}
							class={editor.isActive('codeBlock') ? 'is-active' : ''}
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="12"
								height="12"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								stroke-width="3"
								stroke-linecap="round"
								stroke-linejoin="round"
								class="lucide lucide-chevron-right-square"
								><rect width="18" height="18" x="3" y="3" rx="2" ry="2" /><polyline
									points="10,8 14,12 10,16"
								/></svg
							>
						</button>
						<!--
				<button
					on:click={() => editor.chain().focus().toggleStrike().run()}
					disabled={!editor.can().chain().focus().toggleStrike().run()}
					class={editor.isActive('strike') ? 'is-active' : ''}
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="12"
						height="12"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="3"
						stroke-linecap="round"
						stroke-linejoin="round"
						class="lucide lucide-strikethrough"
						><path d="M16 4H9a3 3 0 0 0-2.83 4" /><path d="M14 12a4 4 0 0 1 0 8H6" /><line
							x1="4"
							x2="20"
							y1="12"
							y2="12"
						/></svg
					>
				</button>
				-->
						<button
							on:click={() => editor.chain().focus().toggleCode().run()}
							disabled={!editor.can().chain().focus().toggleCode().run()}
							class={editor.isActive('code') ? 'is-active' : ''}
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="12"
								height="12"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								stroke-width="3"
								stroke-linecap="round"
								stroke-linejoin="round"
								class="lucide lucide-code"
								><polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" /></svg
							>
						</button>
					</div>
					<div class="rta-row second">
						<button
							on:click={() => editor.chain().focus().setParagraph().run()}
							class={editor.isActive('paragraph') ? 'is-active' : ''}
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="12"
								height="12"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								stroke-width="3"
								stroke-linecap="round"
								stroke-linejoin="round"
								class="lucide lucide-pilcrow"
								><path d="M13 4v16" /><path d="M17 4v16" /><path
									d="M19 4H9.5a4.5 4.5 0 0 0 0 9H13"
								/></svg
							>
						</button>
						<button
							on:click={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
							class={editor.isActive('heading', { level: 1 }) ? 'is-active' : ''}
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="12"
								height="12"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								stroke-width="3"
								stroke-linecap="round"
								stroke-linejoin="round"
								class="lucide lucide-heading-1"
								><path d="M4 12h8" /><path d="M4 18V6" /><path d="M12 18V6" /><path
									d="m17 12 3-2v8"
								/></svg
							>
						</button>
						<button
							on:click={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
							class={editor.isActive('heading', { level: 2 }) ? 'is-active' : ''}
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="12"
								height="12"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								stroke-width="3"
								stroke-linecap="round"
								stroke-linejoin="round"
								class="lucide lucide-heading-2"
								><path d="M4 12h8" /><path d="M4 18V6" /><path d="M12 18V6" /><path
									d="M21 18h-4c0-4 4-3 4-6 0-1.5-2-2.5-4-1"
								/></svg
							>
						</button>
						<button
							on:click={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
							class={editor.isActive('heading', { level: 3 }) ? 'is-active' : ''}
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="12"
								height="12"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								stroke-width="3"
								stroke-linecap="round"
								stroke-linejoin="round"
								class="lucide lucide-heading-3"
								><path d="M4 12h8" /><path d="M4 18V6" /><path d="M12 18V6" /><path
									d="M17.5 10.5c1.7-1 3.5 0 3.5 1.5a2 2 0 0 1-2 2"
								/><path d="M17 17.5c2 1.5 4 .3 4-1.5a2 2 0 0 0-2-2" /></svg
							>
						</button>
						<button
							on:click={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
							class={editor.isActive('heading', { level: 4 }) ? 'is-active' : ''}
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="12"
								height="12"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								stroke-width="3"
								stroke-linecap="round"
								stroke-linejoin="round"
								class="lucide lucide-heading-4"
								><path d="M4 12h8" /><path d="M4 18V6" /><path d="M12 18V6" /><path
									d="M17 10v4h4"
								/><path d="M21 10v8" /></svg
							>
						</button>
						<button
							on:click={() => editor.chain().focus().toggleHeading({ level: 5 }).run()}
							class={editor.isActive('heading', { level: 5 }) ? 'is-active' : ''}
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="12"
								height="12"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								stroke-width="3"
								stroke-linecap="round"
								stroke-linejoin="round"
								class="lucide lucide-heading-5"
								><path d="M4 12h8" /><path d="M4 18V6" /><path d="M12 18V6" /><path
									d="M17 13v-3h4"
								/><path d="M17 17.7c.4.2.8.3 1.3.3 1.5 0 2.7-1.1 2.7-2.5S19.8 13 18.3 13H17" /></svg
							>
						</button>
						<button
							on:click={() => editor.chain().focus().toggleHeading({ level: 6 }).run()}
							class={editor.isActive('heading', { level: 6 }) ? 'is-active' : ''}
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="12"
								height="12"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								stroke-width="3"
								stroke-linecap="round"
								stroke-linejoin="round"
								class="lucide lucide-heading-6"
								><path d="M4 12h8" /><path d="M4 18V6" /><path d="M12 18V6" /><circle
									cx="19"
									cy="16"
									r="2"
								/><path d="M20 10c-2 2-3 3.5-3 6" /></svg
							>
						</button>
					</div>
					<div class="rta-row third">
						<button
							on:click={() => editor.chain().focus().toggleBulletList().run()}
							class={editor.isActive('bulletList') ? 'is-active' : ''}
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="12"
								height="12"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								stroke-width="3"
								stroke-linecap="round"
								stroke-linejoin="round"
								class="lucide lucide-list"
								><line x1="8" x2="21" y1="6" y2="6" /><line x1="8" x2="21" y1="12" y2="12" /><line
									x1="8"
									x2="21"
									y1="18"
									y2="18"
								/><line x1="3" x2="3.01" y1="6" y2="6" /><line
									x1="3"
									x2="3.01"
									y1="12"
									y2="12"
								/><line x1="3" x2="3.01" y1="18" y2="18" /></svg
							>
						</button>
						<button
							on:click={() => editor.chain().focus().toggleOrderedList().run()}
							class={editor.isActive('orderedList') ? 'is-active' : ''}
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="12"
								height="12"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								stroke-width="3"
								stroke-linecap="round"
								stroke-linejoin="round"
								class="lucide lucide-list-ordered"
								><line x1="10" x2="21" y1="6" y2="6" /><line x1="10" x2="21" y1="12" y2="12" /><line
									x1="10"
									x2="21"
									y1="18"
									y2="18"
								/><path d="M4 6h1v4" /><path d="M4 10h2" /><path
									d="M6 18H4c0-1 2-2 2-3s-1-1.5-2-1"
								/></svg
							>
						</button>
						<button
							on:click={() => editor.chain().focus().toggleBlockquote().run()}
							class={editor.isActive('blockquote') ? 'is-active' : ''}
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="12"
								height="12"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								stroke-width="3"
								stroke-linecap="round"
								stroke-linejoin="round"
								class="lucide lucide-quote"
								><path
									d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z"
								/><path
									d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z"
								/></svg
							>
						</button>
					</div>

					<div class="rta-row fourth">
						<button on:click={() => editor.chain().focus().unsetAllMarks().run()}>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="12"
								height="12"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								stroke-width="3"
								stroke-linecap="round"
								stroke-linejoin="round"
								class="lucide lucide-remove-formatting"
								><path d="M4 7V4h16v3" /><path d="M5 20h6" /><path d="M13 4 8 20" /><path
									d="m15 15 5 5"
								/><path d="m20 15-5 5" /></svg
							>
						</button>
						<button on:click={() => editor.chain().focus().clearNodes().run()}>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="12"
								height="12"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								stroke-width="3"
								stroke-linecap="round"
								stroke-linejoin="round"
								class="lucide lucide-eraser"
								><path
									d="m7 21-4.3-4.3c-1-1-1-2.5 0-3.4l9.6-9.6c1-1 2.5-1 3.4 0l5.6 5.6c1 1 1 2.5 0 3.4L13 21"
								/><path d="M22 21H7" /><path d="m5 11 9 9" /></svg
							>
						</button>
						<button on:click={addImage}>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="12"
								height="12"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								stroke-width="3"
								stroke-linecap="round"
								stroke-linejoin="round"
								class="lucide lucide-image"
								><rect width="18" height="18" x="3" y="3" rx="2" ry="2" /><circle
									cx="9"
									cy="9"
									r="2"
								/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" /></svg
							>
						</button>
						<button
							on:click={() => editor.chain().focus().undo().run()}
							disabled={!editor.can().chain().focus().undo().run()}
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="12"
								height="12"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								stroke-width="3"
								stroke-linecap="round"
								stroke-linejoin="round"
								class="lucide lucide-undo"
								><path d="M3 7v6h6" /><path d="M21 17a9 9 0 0 0-9-9 9 9 0 0 0-6 2.3L3 13" /></svg
							>
						</button>
						<button
							on:click={() => editor.chain().focus().redo().run()}
							disabled={!editor.can().chain().focus().redo().run()}
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="12"
								height="12"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								stroke-width="3"
								stroke-linecap="round"
								stroke-linejoin="round"
								class="lucide lucide-redo"
								><path d="M21 7v6h-6" /><path d="M3 17a9 9 0 0 1 9-9 9 9 0 0 1 6 2.3l3 2.7" /></svg
							>
						</button>
						<!--
				<button on:click={() => editor.chain().focus().setHorizontalRule().run()}>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="12"
						height="12"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="3"
						stroke-linecap="round"
						stroke-linejoin="round"
						class="lucide lucide-minus"><line x1="5" x2="19" y1="12" y2="12" /></svg
					>
				</button>
				<button on:click={() => editor.chain().focus().setHardBreak().run()}>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="12"
						height="12"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="3"
						stroke-linecap="round"
						stroke-linejoin="round"
						class="lucide lucide-align-vertical-space-between"
						><rect width="14" height="6" x="5" y="15" rx="2" /><rect
							width="10"
							height="6"
							x="7"
							y="3"
							rx="2"
						/><path d="M2 21h20" /><path d="M2 3h20" /></svg
					>
				</button>
				-->
					</div>
					<button class="blank-button fixedsend" on:click={handleInput}>
						<Send />
					</button>
				</div>
				<select id="fontsection">
					<option value={isFont[0]} on:click={() => handleChangedFont(0)}>Serif</option>
					<option value={isFont[1]} on:click={() => handleChangedFont(1)}>Sans-serif</option>
					<option value={isFont[2]} on:click={() => handleChangedFont(2)}>Monospace</option>
					<option value={isFont[3]} on:click={() => handleChangedFont(3)}>Grotesk</option>
				</select>
			{/if}
		</div>
		<div
			class="docarea"
			class:serif={isFont[0]}
			class:sans={isFont[1]}
			class:mono={isFont[2]}
			class:grot={isFont[3]}
		>
			<div class="actualeditor null" bind:this={element} />
		</div>
	</div>
</div>

<style lang="sass">

.titleinputter
	input
		background: none
		border: none
		outline: none
		height: 48px
		font-size: 32px
		font-family: 'Authentic Sans', sans-serif
		font-weight: bold
		color: #878787
		&::placeholder
			color: #878787
	::-webkit-input-placeholder
		font-size: 48px
		font-family: 'Authentic Sans', sans-serif
		font-weight: bold
		letter-spacing: -1px
		color: var(--background)

.inctualsection
	display: flex
	flex-direction: column
	.docarea
		grid-area: actualeditor
		.actualeditor
			border: 1px solid var(--contraster)
	.rightstrip
		grid-area: rightstrip
		position: sticky
		top: 48px
		z-index: 1000
		display: flex
		flex-direction: row
		align-items: center
		.allbuttons
			display: flex
			flex-direction: row
			align-items: center
			padding-right: 32px
			button
				opacity: 1
				&:hover
					opacity: 1
		#fontsection
			padding: 0 0 2px 0
			height: 20px	
 

.light
	.allbuttons
		background: white
		button
			border: 1px solid #FFFFFF
			color: #878787

.dark
	.allbuttons
		background: transparent
		button
			border: none
			color: #575757

.allbuttons
	button
		padding: 4px
		font-size: 10px
		background: none
		font-family: 'NohemiMed', sans-serif
		border-radius: 2px
		width: 24px
		line-height: 1
		cursor: pointer
		text-transform: uppercase
		svg
			width: 14px
			height: 14px
		&:hover
			background: #10D56C
			color: white

</style>