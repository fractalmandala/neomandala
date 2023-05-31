<script lang="ts">
	import { onMount } from 'svelte';
	import { fileMode } from '$lib/dash/fileuploader';
	import { slide } from 'svelte/transition';
	import { showNote } from '$lib/dash/alerts';
	import type { PageData } from './$types';
	import { addNote } from '$lib/dash/fileuploader';
	import { textareaAutosizeAction } from '$lib/gpt/textautoresize';
	import Circle from '$lib/design/iconset/circle.svelte';

	let title = 'title';
	let tags = 'tags';
	let content = '';
	let language = 'language';
	let type = 'type';
	let showLang = false;
	let validator: boolean;

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

	$: if (title === 'title' || language === 'language' || type === 'type' || content === '') {
		validator = true;
	} else {
		validator = false;
	}
</script>

<div class="rta-column actualsection">
	<div class="inctualsection">
		{#if $fileMode}
			<form
				class="note-form null rta-column rowgap300 inputformer"
				transition:slide={{ axis: 'y' }}
			>
				<div class="colgap300 rta-row ycenter null" style="column-gap: 8px">
					<Circle dimension={12} />
					<h6 style="padding-top: 12px">Add New Note</h6>
				</div>
				<div class="rta-row colgap300">
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
				<div class="rta-row colgap300">
					<div class="rta-column rowgap300">
						<select class="allselect" name="type" id="select-type" bind:value={type}>
							<option value="snippet">Code Snip</option>
							<option value="article">Post</option>
							<option value="note">Note</option>
							<option value="bookmark">Link</option>
						</select>
						{#if showLang}
							<select class="allselect" name="lang" id="select-lang" bind:value={language}>
								<option value="html">HTML</option>
								<option value="javascript">JS</option>
								<option value="sass">SASS</option>
								<option value="sql">SQL</option>
								<option value="shell">Shell</option>
								<option value="css">CSS</option>
							</select>
						{/if}
						{#if !validator}
							<button type="submit" on:click={handleSubmit}> Submit </button>
						{/if}
					</div>
					<div class="rta-column">
						{#if showLang}
							<textarea
								id="textareamain"
								class="code-textarea"
								bind:value={content}
								use:textareaAutosizeAction
							/>
						{/if}
					</div>
				</div>
			</form>
		{/if}
	</div>
</div>
