<script lang="ts">
	import { onMount } from 'svelte';
	import { breakZero, breakOne, breakTwo, themeMode } from '$lib/stores/globalstores';
	import { noteInputStore, hideNoteInput } from '$lib/dash/globalstores';
	import { fileMode } from '$lib/dash/fileuploader';
	import { slide } from 'svelte/transition';
	import { showNote } from '$lib/dash/alerts';
	import { addNote } from '$lib/dash/fileuploader';
	import { textareaAutosizeAction } from '$lib/gpt/textautoresize';
	import Circle from '$lib/design/iconset/circle.svelte';

	let isShown: boolean;

	let title = 'title';
	let tags = 'tags';
	let content = '';
	let language = 'language';
	let type = 'type';
	let showLang = false;
	let showText = false;
	let validator: boolean;

	const unsubscribe = noteInputStore.subscribe((value) => {
		({ isShown } = value);
	});

	onMount(() => {
		return unsubscribe;
	});

	function handleCloseClick() {
		hideNoteInput();
	}

	function handleOverlayClick(e: any) {
		if (e.target === e.currentTarget) {
			hideNoteInput();
		}
	}

	async function handleSubmit() {
		addNote(title, tags, content, language, type);
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

	$: if (type !== '') {
		showText = true;
	} else {
		showText = false;
	}

	$: if (title === 'title' || language === 'language' || type === 'type' || content === '') {
		validator = true;
	} else {
		validator = false;
	}
</script>

{#if isShown}
	<div
		class="rta-modal-overlay"
		class:levelzero={$breakZero}
		class:levelone={$breakOne}
		class:leveltwo={$breakTwo}
		class:lightmode={$themeMode}
		class:darkmode={!$themeMode}
	>
		<form
			class="note-form null rta-column rowgap100 inputformer"
			transition:slide={{ axis: 'x' }}
			data-lenis-prevent
		>
			<div class="rta-row ycenter null" style="column-gap: 8px">
				<Circle dimension={12} />
				<h6 style="padding-top: 12px">Add New Note</h6>
			</div>
			<div class="rta-column rowgap100">
				<input
					id="titleform2"
					autocomplete="off"
					type="text"
					placeholder={title}
					bind:value={title}
					on:focus={handleTitleFocus}
				/>
				<input
					id="tagsform2"
					type="text"
					placeholder={tags}
					bind:value={tags}
					on:focus={handleTagsFocus}
				/>
			</div>
			<div class="rta-row between">
				<select id="typeguy" name="type" bind:value={type}>
					<option value="snippet">Code Snip</option>
					<option value="article">Post</option>
					<option value="note">Note</option>
					<option value="bookmark">Link</option>
				</select>
				{#if showLang}
					<select id="langguy" name="lang" bind:value={language}>
						<option value="html">HTML</option>
						<option value="javascript">JS</option>
						<option value="sass">SASS</option>
						<option value="sql">SQL</option>
						<option value="shell">Shell</option>
						<option value="css">CSS</option>
					</select>
				{/if}
			</div>
			<div class="rta-column">
				{#if showText}
					<textarea class="code-textarea" bind:value={content} use:textareaAutosizeAction />
				{/if}
			</div>
			{#if !validator}
				<button type="submit" on:click={handleSubmit}> Submit </button>
			{/if}
		</form>
	</div>
{/if}

<style lang="sass">


.lightmode
	background: white

.rta-modal-overlay
	display: flex
	flex-direction: column
	position: fixed
	align-items: flex-end
	z-index: 1200
	top: 48px
	right: 0
	height: 100vh
	.note-form
		width: 100%

.levelzero.rta-modal-overlay
	width: 311px
	padding-left: 24px
	padding-right: 32px
	#typeguy, #langguy
		width: 124px
	.code-textarea
		min-height: 96px
		max-height: 280px
		overflow-y: scroll

</style>
