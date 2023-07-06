<script lang="ts">
	import supabase from '$lib/utils/supastream';
	import { showNote } from '$lib/dash/alerts';
	import {
		breakZero,
		breakOne,
		breakTwo,
		noteName,
		showSave,
		hideSave,
		headTitle
	} from '$lib/stores/globalstores';
	import { textareaAutosizeAction } from '$lib/gpt/textautoresize';
	let title: string = 'title';
	let content: string = 'content';
	let snippet: string = 'snippet';

	export let data;

	$: $headTitle = 'ui';

	export async function newComponent() {
		const { error } = await supabase
			.from('db-design')
			.insert({ title: title, content: content, snippet: snippet });
		if (error) {
			showNote('error!', true);
			console.log(error.message);
		} else showNote('done!', false);
	}

	function focusTitle() {
		title = '';
	}

	function focusContent() {
		content = '';
	}

	function focusSnippet() {
		snippet = '';
	}

	function blurTitle() {
		if (title === '') {
			title = 'title';
		}
	}
</script>

<div
	class="grot rta-column rowgap300"
	class:lzero={$breakZero}
	class:lone={$breakOne}
	class:ltwo={$breakTwo}
>
	<div class="rta-row ycenter between stripunos">
		<div class="notetitle">Sveltekit UI Components Library</div>
	</div>
	<div class="notecontainer rta-column">
		<h5>Why?</h5>
		<p>
			To begin with, for myself- for I find myself rewriting the same lines of code over and over
			again way too often.
		</p>
		<h5>Principles</h5>
		<p>
			Minimal dependency- ie, try not to use any 3rd party libraries, so that the components work on
			Sveltekit from get-go.
		</p>
		<p>
			Plumbing Mine, Aesthetic User's- ie, handle all plumbing on functions, variables, stores and
			whatnot, let colors and the like be customizable.
		</p>
		<h5>Inspiration</h5>
		<div>
			<p>Quite like these libraries:</p>
			<a href="https://build.washingtonpost.com/" target="_blank" rel="noreferrer"
				>Washington Post</a
			><br />
			<a
				href="https://playground.cred.club/?path=/story/introduction--page"
				target="_blank"
				rel="noreferrer">NeoPop</a
			>
		</div>
	</div>
	<div class="rta-column">
		{#if data.logged}
			<form class="rta-column thisform rowgap100">
				<input
					type="text"
					placeholder={title}
					bind:value={title}
					on:focus={focusTitle}
					on:blur={blurTitle}
				/>
				<textarea bind:value={content} use:textareaAutosizeAction on:focus={focusContent} />
				<textarea bind:value={snippet} use:textareaAutosizeAction on:focus={focusSnippet} />
				<button class="genbutton" on:click={newComponent}>Submit</button>
			</form>
		{/if}
	</div>
</div>

<style lang="sass">

.stripunos
	border-bottom: 1px solid var(--contraster)

.lzero
	.stripunos
		height: 40px
		padding-left: 32px
		padding-right: 32px
		position: sticky
		top: 40px
		background: var(--this)
		z-index: 50
		.notetitle
			color: var(--texttwo)
			font-size: 24px
			font-family: 'Space Grotesk', sans-serif


</style>
