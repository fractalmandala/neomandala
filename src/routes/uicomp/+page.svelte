<script lang="ts">
	import supabase from '$lib/utils/supastream';
	import { showNote } from '$lib/dash/alerts';
	import { textareaAutosizeAction } from '$lib/gpt/textautoresize';
	let title: string = '';
	let content: string = '';
	let snippet: string = '';

	export let data;

	export async function newComponent() {
		const { error } = await supabase
			.from('db-design')
			.insert({ title: title, content: content, snippet: snippet });
		if (error) {
			showNote('error!', true);
			console.log(error.message);
		} else showNote('done!', false);
	}
</script>

<div class="rta-grid grid2">
	<div class="grot rta-column rowgap300">
		<h4 style="margin: 0" class="bord-bot p-bot-16">Sveltekit UI Components Library</h4>
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
				<input type="text" placeholder={title} bind:value={title} />
				<textarea bind:value={content} use:textareaAutosizeAction />
				<textarea bind:value={snippet} use:textareaAutosizeAction />
				<button class="genbutton" on:click={newComponent}>Submit</button>
			</form>
		{/if}
	</div>
</div>

<style lang="sass">

.grid2
	column-gap: 64px
	.grot
		grid-area: grot
	.thisform
		grid-area: thisform
	@media screen and (min-width: 1024px)
		grid-template-columns: 1fr 360px
		grid-template-areas: "grot thisform"
	@media screen and (max-width: 1023px)
		grid-template-columns: 1fr
		grid-template-areas: "grot" "thisform"
		padding: 80px 40px

p
	color: var(--texttwo)

a
	color: #10D56C
	&:hover
		text-decoration: underline

h5
	border-bottom: 1px solid var(--contraster)
	padding-bottom: 16px


.grot
	@media screen and (min-width: 1024px)
		max-width: 680px

input
	padding: 4px 8px
	height: 32px
	border-radius: 6px
	background: transparent
	border: 1px solid var(--contraster)
	color: var(--background)
	font-family: 'Space Grotesk', sans-serif

textarea
	min-height: 80px
	background: transparent
	border: 1px solid var(--contraster)
	color: var(--background)
	font-family: 'Space Grotesk', sans-serif

</style>
