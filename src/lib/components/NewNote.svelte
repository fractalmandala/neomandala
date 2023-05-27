<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { Editor } from '@tiptap/core';
	import StarterKit from '@tiptap/starter-kit';
	import { Markdown } from 'tiptap-markdown';
	import BubbleMenu from '@tiptap/extension-bubble-menu';
	import { breakZero, breakOne, breakTwo, themeMode, readingMode } from '$lib/stores/globalstores';
	import { showChip } from '$lib/stores/modalstores';
	import supabase from '$lib/utils/supabase';

	let element: any;
	let editor: any;
	let title = '';
	let tags = '';
	let language = '';
	let agent = 'article';
	let isFeat = false;
	let words = '';
	let html = '';
	let prefill = '# title';
	let markdownOutput: any;

	function toggleFeat() {
		isFeat = !isFeat;
	}

	async function insertNote() {
		const { error } = await supabase
			.from('amrit-notes')
			.insert({ title: title, content: html, tags: tags, agent: agent, uuidtext: language });
		if (error) {
			throw new Error(error.message);
		} else {
			showChip('Success!', '#10D56C');
			(title = ''), (html = ''), (tags = '');
		}
	}

	onMount(() => {
		return (editor = new Editor({
			element: element,
			extensions: [
				StarterKit,
				Markdown.configure({
					html: true,
					tightLists: true,
					bulletListMarker: '-'
				}),
				BubbleMenu.configure({})
			],
			content: prefill,
			editorProps: {
				attributes: {
					class: 'bigpad'
				}
			},
			onTransaction: () => {
				// force re-render so `editor.isActive` works as expected
				editor = editor;
			},
			onUpdate: ({ editor }) => {
				html = editor.getHTML();
				markdownOutput = editor.storage.markdown.getMarkdown();
			}
		}));
	});

	onDestroy(() => {
		if (editor) {
			editor.destroy();
		}
	});
</script>

<div class="notepad rta-column">
	<form class="formA rta-column colgap200" on:submit|preventDefault={insertNote}>
		<div class="rta-row colgap100 between">
			<input type="text" placeholder="title" bind:value={title} />
			<input type="text" id="tag" placeholder="tags" bind:value={tags} />
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
			<button class="mainbutton" type="submit" on:submit={insertNote}> submit </button>
		</div>
	</form>
	<div class="rta-column ybetween rowgap200 p-top-32">
		{#if editor}
			<div class="styling rta-row colgap100">
				<button
					on:click={() => editor.chain().focus().toggleBold().run()}
					disabled={!editor.can().chain().focus().toggleBold().run()}
					class="blank-button {editor.isActive('bold') ? 'is-active' : ''}"
				>
					<svg
						width="24"
						height="24"
						viewBox="0 0 24 24"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							d="M8 11H12.5C13.8807 11 15 9.88071 15 8.5C15 7.11929 13.8807 6 12.5 6H8V11ZM18 15.5C18 17.9853 15.9853 20 13.5 20H6V4H12.5C14.9853 4 17 6.01472 17 8.5C17 9.70431 16.5269 10.7981 15.7564 11.6058C17.0979 12.3847 18 13.837 18 15.5ZM8 13V18H13.5C14.8807 18 16 16.8807 16 15.5C16 14.1193 14.8807 13 13.5 13H8Z"
							fill="#676767"
						/>
					</svg>
				</button>
				<button
					on:click={() => editor.chain().focus().toggleItalic().run()}
					disabled={!editor.can().chain().focus().toggleItalic().run()}
					class="blank-button {editor.isActive('italic') ? 'is-active' : ''}"
				>
					<svg
						width="24"
						height="24"
						viewBox="0 0 24 24"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							d="M15 20H7V18H9.92661L12.0425 6H9V4H17V6H14.0734L11.9575 18H15V20Z"
							fill="#676767"
						/>
					</svg>
				</button>
				<button
					on:click={() => editor.chain().focus().toggleStrike().run()}
					disabled={!editor.can().chain().focus().toggleStrike().run()}
					class="blank-button {editor.isActive('strike') ? 'is-active' : ''}"
				>
					<svg
						width="24"
						height="24"
						viewBox="0 0 24 24"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							d="M13 9H11V6H5V4H19V6H13V9ZM13 15V20H11V15H13ZM3 11H21V13H3V11Z"
							fill="#676767"
						/>
					</svg>
				</button>
				<button
					on:click={() => editor.chain().focus().toggleCode().run()}
					disabled={!editor.can().chain().focus().toggleCode().run()}
					class="blank-button {editor.isActive('code') ? 'is-active' : ''}"
				>
					<svg
						width="24"
						height="24"
						viewBox="0 0 24 24"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							d="M16.949 8.465L18.3632 7.05078L23.3129 12.0005L18.3632 16.9503L16.949 15.5361L20.4845 12.0005L16.949 8.465ZM7.0495 8.465L3.51397 12.0005L7.0495 15.5361L5.63529 16.9503L0.685547 12.0005L5.63529 7.05078L7.0495 8.465Z"
							fill="#676767"
						/>
					</svg>
				</button>
				<button on:click={() => editor.chain().focus().unsetAllMarks().run()} class="blank-button">
					<svg
						width="24"
						height="24"
						viewBox="0 0 24 24"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							d="M12.6522 14.0664L11.6057 20.0009H9.57486L10.9257 12.3399L3.51562 4.92984L4.92984 3.51562L20.4862 19.072L19.072 20.4862L12.6522 14.0664ZM11.7737 7.531L12.0435 6.0009H10.2436L8.24354 4.0009H20.0009V6.0009H14.0743L13.5001 9.25743L11.7737 7.531Z"
							fill="#676767"
						/>
					</svg>
				</button>
				<button on:click={() => editor.chain().focus().clearNodes().run()} class="blank-button">
					<svg
						width="24"
						height="24"
						viewBox="0 0 24 24"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							d="M3 19H21V21H3V19ZM8 13H11L7 17L3 13H6V3H8V13ZM18 13H21L17 17L13 13H16V3H18V13Z"
							fill="#676767"
						/>
					</svg>
				</button>
				<button
					on:click={() => editor.chain().focus().setParagraph().run()}
					class="blank-button {editor.isActive('paragraph') ? 'is-active' : ''}"
				>
					<svg
						width="24"
						height="24"
						viewBox="0 0 24 24"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							d="M12 6V21H10V16C6.68629 16 4 13.3137 4 10C4 6.68629 6.68629 4 10 4H20V6H17V21H15V6H12ZM10 6C7.79086 6 6 7.79086 6 10C6 12.2091 7.79086 14 10 14V6Z"
							fill="#676767"
						/>
					</svg>
				</button>
				<button
					on:click={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
					class="blank-button {editor.isActive('heading', { level: 1 }) ? 'is-active' : ''}"
				>
					<svg
						width="24"
						height="24"
						viewBox="0 0 24 24"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							d="M13 20H11V13H4V20H2V4H4V11H11V4H13V20ZM21.0005 8V20H19.0005L19 10.204L17 10.74V8.67L19.5005 8H21.0005Z"
							fill="#676767"
						/>
					</svg>
				</button>
				<button
					on:click={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
					class="blank-button {editor.isActive('heading', { level: 2 }) ? 'is-active' : ''}"
				>
					<svg
						width="24"
						height="24"
						viewBox="0 0 24 24"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							d="M4 4V11H11V4H13V20H11V13H4V20H2V4H4ZM18.5 8C20.5711 8 22.25 9.67893 22.25 11.75C22.25 12.6074 21.9623 13.3976 21.4781 14.0292L21.3302 14.2102L18.0343 18H22V20H15L14.9993 18.444L19.8207 12.8981C20.0881 12.5908 20.25 12.1893 20.25 11.75C20.25 10.7835 19.4665 10 18.5 10C17.5818 10 16.8288 10.7071 16.7558 11.6065L16.75 11.75H14.75C14.75 9.67893 16.4289 8 18.5 8Z"
							fill="#676767"
						/>
					</svg>
				</button>
				<button
					on:click={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
					class="blank-button"
				>
					<svg
						width="24"
						height="24"
						viewBox="0 0 24 24"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							d="M22 8L21.9984 10L19.4934 12.883C21.0823 13.3184 22.25 14.7728 22.25 16.5C22.25 18.5711 20.5711 20.25 18.5 20.25C16.674 20.25 15.1528 18.9449 14.8184 17.2166L16.7821 16.8352C16.9384 17.6413 17.6481 18.25 18.5 18.25C19.4665 18.25 20.25 17.4665 20.25 16.5C20.25 15.5335 19.4665 14.75 18.5 14.75C18.214 14.75 17.944 14.8186 17.7056 14.9403L16.3992 13.3932L19.3484 10H15V8H22ZM4 4V11H11V4H13V20H11V13H4V20H2V4H4Z"
							fill="#676767"
						/>
					</svg>
				</button>
				<button
					on:click={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
					class="blank-button {editor.isActive('heading', { level: 4 }) ? 'is-active' : ''}"
				>
					<svg
						width="24"
						height="24"
						viewBox="0 0 24 24"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							d="M13 20H11V13H4V20H2V4H4V11H11V4H13V20ZM22 8V16H23.5V18H22V20H20V18H14.5V16.66L19.5 8H22ZM20 11.133L17.19 16H20V11.133Z"
							fill="#676767"
						/>
					</svg>
				</button>
				<button
					on:click={() => editor.chain().focus().toggleHeading({ level: 5 }).run()}
					class="blank-button {editor.isActive('heading', { level: 5 }) ? 'is-active' : ''}"
				>
					<svg
						width="24"
						height="24"
						viewBox="0 0 24 24"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							d="M22 8V10H17.6769L17.2126 12.6358C17.5435 12.5472 17.8912 12.5 18.25 12.5C20.4591 12.5 22.25 14.2909 22.25 16.5C22.25 18.7091 20.4591 20.5 18.25 20.5C16.4233 20.5 14.8827 19.2756 14.4039 17.6027L16.3271 17.0519C16.5667 17.8881 17.3369 18.5 18.25 18.5C19.3546 18.5 20.25 17.6046 20.25 16.5C20.25 15.3954 19.3546 14.5 18.25 14.5C17.6194 14.5 17.057 14.7918 16.6904 15.2478L14.8803 14.3439L16 8H22ZM4 4V11H11V4H13V20H11V13H4V20H2V4H4Z"
							fill="#676767"
						/>
					</svg>
				</button>
				<button
					on:click={() => editor.chain().focus().toggleHeading({ level: 6 }).run()}
					class="blank-button {editor.isActive('heading', { level: 6 }) ? 'is-active' : ''}"
				>
					<svg
						width="24"
						height="24"
						viewBox="0 0 24 24"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							d="M21.097 8L18.499 12.5C20.7091 12.5 22.5 14.2909 22.5 16.5C22.5 18.7091 20.7091 20.5 18.5 20.5C16.2909 20.5 14.5 18.7091 14.5 16.5C14.5 15.7636 14.699 15.0737 15.0461 14.4811L18.788 8H21.097ZM4 4V11H11V4H13V20H11V13H4V20H2V4H4ZM18.5 14.5C17.3954 14.5 16.5 15.3954 16.5 16.5C16.5 17.6046 17.3954 18.5 18.5 18.5C19.6046 18.5 20.5 17.6046 20.5 16.5C20.5 15.3954 19.6046 14.5 18.5 14.5Z"
							fill="#676767"
						/>
					</svg>
				</button>
				<button
					on:click={() => editor.chain().focus().toggleBulletList().run()}
					class="blank-button {editor.isActive('bulletList') ? 'is-active' : ''}"
				>
					<svg
						width="24"
						height="24"
						viewBox="0 0 24 24"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							d="M8 4H21V6H8V4ZM3 3.5H6V6.5H3V3.5ZM3 10.5H6V13.5H3V10.5ZM3 17.5H6V20.5H3V17.5ZM8 11H21V13H8V11ZM8 18H21V20H8V18Z"
							fill="#676767"
						/>
					</svg>
				</button>
				<button
					on:click={() => editor.chain().focus().toggleOrderedList().run()}
					class="blank-button {editor.isActive('orderedList') ? 'is-active' : ''}"
				>
					<svg
						width="24"
						height="24"
						viewBox="0 0 24 24"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							d="M5.75024 3.5H4.71733L3.25 3.89317V5.44582L4.25002 5.17782L4.25018 8.5H3V10H7V8.5H5.75024V3.5ZM10 4H21V6H10V4ZM10 11H21V13H10V11ZM10 18H21V20H10V18ZM2.875 15.625C2.875 14.4514 3.82639 13.5 5 13.5C6.17361 13.5 7.125 14.4514 7.125 15.625C7.125 16.1106 6.96183 16.5587 6.68747 16.9167L6.68271 16.9229L5.31587 18.5H7V20H3.00012L2.99959 18.8786L5.4717 16.035C5.5673 15.9252 5.625 15.7821 5.625 15.625C5.625 15.2798 5.34518 15 5 15C4.67378 15 4.40573 15.2501 4.37747 15.5688L4.3651 15.875H2.875V15.625Z"
							fill="#676767"
						/>
					</svg>
				</button>

				<button
					on:click={() => editor.chain().focus().toggleBlockquote().run()}
					class="blank-button {editor.isActive('blockquote') ? 'is-active' : ''}"
				>
					<svg
						width="24"
						height="24"
						viewBox="0 0 24 24"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							d="M4.58341 17.3201C3.55316 16.2265 3 14.999 3 13.0094C3 9.50995 5.45651 6.37275 9.03059 4.82227L9.92328 6.19988C6.58804 8.00448 5.93618 10.3451 5.67564 11.8211C6.21263 11.5434 6.91558 11.4457 7.60471 11.5096C9.40908 11.6768 10.8312 13.1581 10.8312 14.999C10.8312 16.932 9.26416 18.499 7.33116 18.499C6.2581 18.499 5.23196 18.0086 4.58341 17.3201ZM14.5834 17.3201C13.5532 16.2265 13 14.999 13 13.0094C13 9.50995 15.4565 6.37275 19.0306 4.82227L19.9233 6.19988C16.588 8.00448 15.9362 10.3451 15.6756 11.8211C16.2126 11.5434 16.9156 11.4457 17.6047 11.5096C19.4091 11.6768 20.8312 13.1581 20.8312 14.999C20.8312 16.932 19.2642 18.499 17.3312 18.499C16.2581 18.499 15.232 18.0086 14.5834 17.3201Z"
							fill="#676767"
						/>
					</svg>
				</button>
				<button
					on:click={() => editor.chain().focus().undo().run()}
					disabled={!editor.can().chain().focus().undo().run()}
					class="blank-button"
				>
					<svg
						width="24"
						height="24"
						viewBox="0 0 24 24"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							d="M5.82843 6.99858L8.36396 9.53412L6.94975 10.9483L2 5.99858L6.94975 1.04883L8.36396 2.46305L5.82843 4.99858H13C17.4183 4.99858 21 8.5803 21 12.9986C21 17.4168 17.4183 20.9986 13 20.9986H4V18.9986H13C16.3137 18.9986 19 16.3123 19 12.9986C19 9.68487 16.3137 6.99858 13 6.99858H5.82843Z"
							fill="#676767"
						/>
					</svg>
				</button>
				<button
					on:click={() => editor.chain().focus().redo().run()}
					disabled={!editor.can().chain().focus().redo().run()}
					class="blank-button"
				>
					<svg
						width="24"
						height="24"
						viewBox="0 0 24 24"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							d="M18.1716 6.99858H11C7.68629 6.99858 5 9.68487 5 12.9986C5 16.3123 7.68629 18.9986 11 18.9986H20V20.9986H11C6.58172 20.9986 3 17.4168 3 12.9986C3 8.5803 6.58172 4.99858 11 4.99858H18.1716L15.636 2.46305L17.0503 1.04883L22 5.99858L17.0503 10.9483L15.636 9.53412L18.1716 6.99858Z"
							fill="#676767"
						/>
					</svg>
				</button>
			</div>
		{/if}
		<div class="edits" bind:this={element} data-lenis-prevent />
	</div>
</div>

<style lang="sass">

.notepad
	border: 1px solid var(--contraster)
	padding: 24px
	border-radius: 6px
	background: var(--contraster)
	transition: 0.43s
	&:hover
		box-shadow: 4px 6px 7px var(--borderline)


.formA
	input[type=text]
		border: 1px solid var(--contraster)
		padding: 4px
		border-radius: 4px

.edits
	border: 1px solid var(--contraster)
	border-radius: 6px
	min-height: 60vh
	background: white
	padding: 16px
	overflow-y: scroll

.rta-row
	.blank-button
		svg
			height: 20px
			path
				fill: var(--greyish)
		&:hover
			svg path
				fill: var(--green)


</style>
