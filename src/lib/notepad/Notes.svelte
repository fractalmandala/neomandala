<script lang="ts">
	import { dev, browser } from '$app/environment';

	import Editor from '$lib/notepad/Editor.svelte';
	import { marked } from 'marked';

	import Slides from '$lib/notepad/Slides.svelte';
	import Metrics from '$lib/notepad/Metrics.svelte';
	import CopyButton from '$lib/notepad/CopyButton.svelte';
	import CopyHTML from '$lib/notepad/CopyHTML.svelte';

	// svg
	import Bullet from '$lib/design/iconset/add.svelte';
	import Heading from '$lib/notepad/iconHeading.svelte';
	import Download from '$lib/design/iconset/download.svelte';
	import Blockquote from '$lib/design/iconset/amazon.svelte';
	import Anchor from '$lib/design/iconset/box.svelte';
	import Image from '$lib/design/iconset/fileplus.svelte';
	import Table from '$lib/design/iconset/info.svelte';
	import Code from '$lib/design/iconset/sun.svelte';
	import View from '$lib/design/iconset/view.svelte';
	import Edit from '$lib/design/iconset/edit.svelte';
	import Document from '$lib/design/iconset/circle.svelte';
	import Slideshow from '$lib/design/iconset/message.svelte';
	import ZoomOut from '$lib/design/iconset/pin.svelte';
	import ZoomIn from '$lib/design/iconset/pin.svelte';
	import Open from '$lib/design/iconset/upload.svelte';
	import Save from '$lib/design/iconset/save.svelte';
	import Copy from '$lib/design/iconset/copy.svelte';
	import CopyComplete from '$lib/design/iconset/copy.svelte';
	import CodeBracket from '$lib/design/iconset/code.svelte';
	import New from '$lib/design/iconset/fileplus.svelte';

	const viewTypes = ['document', 'slideshow'] as const;
	let iconColor = 'var(--background)';
	let completeColor = '#10D56C';

	interface Saved {
		proseSize: number;
		color: number;
		serif: boolean;
		viewType: (typeof viewTypes)[number];
	}

	let saved: Saved = {
		proseSize: 1,
		color: 0,
		serif: false,
		viewType: 'document'
	};

	export const snapshot = {
		capture: () => saved,
		restore: (value: any) => (saved = value)
	};

	/** raw text that the user enters into the `textarea` element */
	let content = '';

	/** controls the expansion of the preview area */
	let viewMode = false;

	let file: File;
	let fileHandle: FileSystemFileHandle;

	/** `true` if the browser supports the `window.showOpenFilePicker` method */
	let supported = false;
	if (browser) supported = Boolean(window.showOpenFilePicker);

	/**
	 * options for prose sizes,
	 * these classes are provided by the `@tailwindcss/typography` package
	 */
	const proseSizes = ['prose-sm', 'prose-base', 'prose-lg', 'prose-xl', 'prose-2xl'];

	const colors = {
		prose: ['prose-gray', 'prose-teal', 'prose-sky', 'prose-rose'],
		medium: ['bg-gray-500', 'bg-teal-500', 'bg-sky-500', 'bg-rose-500'],
		dark: ['bg-gray-900', 'bg-teal-950', 'bg-sky-950', 'bg-gray-900']
	};

	/** passed in as a prop for the `Editor.svelte` controls */
	const contentElements: Editor['$$prop_def']['contentElements'] = [
		{
			name: 'Heading',
			text: '# ',
			display: 'block',
			icon: Heading
		},
		{
			name: 'Bullet',
			text: '- ',
			display: 'block',
			icon: Bullet
		},
		{
			name: 'Blockquote',
			text: '> ',
			display: 'block',
			icon: Blockquote
		},
		{
			name: 'Italic',
			text: '*',
			display: 'wrap',
			icon: 'I',
			class: 'italic'
		},
		{
			name: 'Bold',
			text: '**',
			display: 'wrap',
			icon: 'B'
		},
		{
			name: 'Strikethrough',
			text: '~',
			display: 'wrap',
			icon: 'S',
			class: 'line-through font-normal'
		},
		{
			name: 'Anchor',
			text: '[text](href)',
			display: 'inline',
			icon: Anchor,
			key: '['
		},
		{
			name: 'Image',
			text: '![alt](src)',
			display: 'inline',
			icon: Image,
			key: ']'
		},
		{
			name: 'Table',
			text: '| th | th |\n| -- | -- |\n| td | td |\n| td | td |',
			display: 'inline',
			icon: Table,
			key: '\\'
		},
		{
			name: 'Code',
			text: '`',
			display: 'wrap',
			icon: CodeBracket
		},
		{
			name: 'Slide',
			text: '---',
			display: 'inline',
			icon: Slideshow
		}
	];

	let placeholder = 'this is placehl';

	const options: FilePickerOptions = {
		types: [
			{
				description: 'markdown',
				accept: {
					'text/markdown': ['.md', '.mdx', '.mdoc', '.markdoc', '.svx']
				}
			}
		],
		excludeAcceptAllOption: true
	};

	/**
	 * converts md to html
	 *
	 * @param md - string
	 */
	const mdToHtml = (md: string) => {
		return marked.parse(md, { mangle: false, headerIds: false });
	};

	const open = async () => {
		[fileHandle] = await window.showOpenFilePicker(options);
		file = await fileHandle.getFile();
		content = await file.text();
		toggleView();
	};

	const saveAs = async () => {
		const handle = await window.showSaveFilePicker(options);
		const writable = await handle.createWritable();
		await writable.write(content);
		await writable.close();
		file = await handle.getFile();
		fileHandle = handle;
	};

	const save = async () => {
		if (fileHandle && !viewMode) {
			const writable = await fileHandle.createWritable();
			await writable.write(content);
			await writable.close();
		}
	};

	const toggleView = () => {
		const toggleView = () => {
			viewMode = !viewMode;
		};

		// @ts-expect-error
		if (document.startViewTransition) {
			// @ts-expect-error
			document.startViewTransition(() => {
				toggleView();
			});
		} else {
			toggleView();
		}
	};

	const setViewType = (type: typeof saved.viewType) => {
		saved.viewType = type;
	};

	const changeProseSize = (action: 'increase' | 'decrease') => {
		if (action === 'increase') {
			if (saved.proseSize < proseSizes.length - 1) saved.proseSize++;
		} else {
			if (saved.proseSize > 0) saved.proseSize--;
		}
	};

	const changeProseColor = () => {
		if (saved.color < colors.prose.length - 1) {
			saved.color++;
		} else {
			saved.color = 0;
		}
	};

	const selectContents = (e: Event) => {
		if (e.target instanceof Node) {
			const selection = window.getSelection();
			const range = document.createRange();
			range.selectNodeContents(e.target);
			selection?.removeAllRanges();
			selection?.addRange(range);
		}
	};

	const onKeyDown = (e: KeyboardEvent) => {
		save();
		if (e.key === 'Escape') toggleView();
	};
</script>

<svelte:document on:keydown={onKeyDown} />

<div
	class="flex h-[100dvh] flex-col text-gray-50 selection:bg-gray-300 selection:text-gray-950 {colors
		.dark[saved.color]}"
>
	{#if !viewMode}
		<section class="rta-row ycenter colgap200 bord-bot {viewMode ? 'the-hide' : ''}">
			<a href="/" target="_blank">
				<button title="New" class="zoom-button">
					<New color={iconColor} />
				</button>
			</a>
			{#if supported}
				<button title="Open" class="zoom-button" on:click={open}>
					<Open />
				</button>
				<button title="Save As" class="zoom-button" on:click={saveAs}>
					<Save />
				</button>
			{:else}
				<a href="data:text/plain,{content}" download="Untitled.md">
					<button class="zoom-button" title="Download">
						<Download />
					</button>
				</a>
			{/if}
			<CopyButton {content} />
			<CopyHTML title="Copy HTML" content={mdToHtml(content)}>cop</CopyHTML>
			<button title="View" class="zoom-button" on:click={toggleView}>
				<View />
			</button>
			<h5>
				{file?.name ? file.name : 'md'}
			</h5>
			{#if !viewMode}
				<Metrics {content} />
			{/if}
		</section>
	{/if}
	<main class="rta-column rowgap300 p-top-16 {!viewMode ? 'lg:grid-cols-2' : ''}">
		{#if !viewMode}
			<Editor
				textAreaClass="editor-textarea"
				controlsClass="bord-top m-top-16 bord-bot"
				buttonClass="btn"
				{contentElements}
				textAreaPlaceholder="# Title"
				bind:textAreaValue={content}
			/>
		{/if}

		<div
			class="bord-top p-top-16 {viewMode ? 'flex' : 'hidden'} {proseSizes[saved.proseSize]} {colors
				.prose[saved.color]}"
			on:dblclick={selectContents}
			role="document"
		>
			<!-- content -->
			{#if saved.viewType === 'document'}
				<div class="p-bot-32">
					{@html mdToHtml(content ? content : placeholder)}
				</div>
			{:else if saved.viewType === 'slideshow'}
				<Slides bind:viewMode html={mdToHtml(content ? content : placeholder)} />
			{/if}
			<!--
			<div
				class="bord-top rta-row ycenter p-top-16"
				class:bg-transparent={saved.viewType === 'slideshow'}
			>

				<div class="flex">
					{#each viewTypes as type}
						<button
							class="blank-button"
							class:hidden={viewMode}
							disabled={saved.viewType === type}
							on:click={() => setViewType(type)}
							title={type}
						>
							{#if type === 'document'}
								<Document />
							{:else if type === 'slideshow'}
								<Slideshow />
							{/if}
						</button>
					{/each}
				</div>
				<div class="flex">
					<button
						title="Change Color"
						class="blank-button"
						class:hidden={viewMode}
						on:click={changeProseColor}
					>
						<div class="h-5 w-5 rounded-full {colors.medium[saved.color]}" />
					</button>
					<button
						title="Change Font"
						class="blank-button"
						class:hidden={viewMode}
						class:font-serif={!saved.serif}
						on:click={() => (saved.serif = !saved.serif)}
						aria-label={saved.serif ? 'sans-serif' : 'serif'}
					>
						F
					</button>
					<button
						title="Decrease Font Size"
						class="blank-button"
						class:hidden={viewMode}
						disabled={saved.proseSize < 1}
						on:click={() => changeProseSize('decrease')}
					>
						<ZoomOut />
					</button>
					<button
						title="Increase Font Size"
						class="blank-button"
						class:hidden={viewMode}
						disabled={saved.proseSize >= proseSizes.length - 1}
						on:click={() => changeProseSize('increase')}
					>
						<ZoomIn />
					</button>
			
					<button title={viewMode ? 'Edit' : 'View'} class="blank-button" on:click={toggleView}>
						{#if viewMode}
							<Edit />
						{:else}
							<View />
						{/if}
					</button>
				</div>
			</div>
-->
		</div>
	</main>
</div>
