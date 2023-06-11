<script lang="ts">
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import { allNotes } from '$lib/dash/db';
	import { chatSessions } from '$lib/gpt/chatstore';
	import BotUtil from '$lib/dash/BotUtil.svelte';
	import Shell from '$lib/design/AppShell.svelte';
	import { janaPada, allWebdev } from '$lib/utils/localpulls';
	import { notesDiary } from '$lib/dash/notesutil';
	import { toDo, gptTitles } from '$lib/utils/supabase';
	import type { ChatSession } from '$lib/gpt/chatstore';
	import { snippets } from '$lib/dash/db';
	import Acco from '$lib/design/MandAccordionItem.svelte';
	import Acco2 from '$lib/design/MandAccordionItem.svelte';
	import Acco3 from '$lib/design/MandAccordionItem.svelte';
	import Acco4 from '$lib/design/MandAccordionItem.svelte';
	import Acco5 from '$lib/design/MandAccordionItem.svelte';
	import Acco6 from '$lib/design/MandAccordionItem.svelte';
	import Acco7 from '$lib/design/MandAccordionItem.svelte';
	import Add from '$lib/design/iconset/add.svelte';
	import Refresh from '$lib/design/iconset/refresh.svelte';
	import NotesForm from '$lib/dash/NotesForm.svelte';
	import '$lib/styles/tiptap.sass';
	import { breakTwo } from '$lib/stores/globalstores';
	let session: ChatSession | undefined;
	let builds: any;
	let webs: any;
	let snips: any;
	let notes: any;
	let items: any;
	let titles: any;
	let axis: 'x' | 'y' | undefined;
	let dimension: number;
	let currentPage: string;

	$: if ($chatSessions.length > 0) {
		session = $chatSessions.sort((a, b) => {
			if (!b.createdAt) return -1; // b is undefined, a comes first
			if (!a.createdAt) return 1; // a is undefined, b comes first
			return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(); // normal comparison
		})[0];
	}

	$: if ($breakTwo) {
		axis = 'y';
		dimension = 24;
	} else {
		axis = 'x';
		dimension = 20;
	}

	$: currentPage = $page.url.pathname.slice(0, 4);

	function handleRefresh() {
		(async () => {
			webs = await allWebdev();
			snips = await snippets();
			notes = await allNotes();
		})();
	}

	onMount(async () => {
		builds = await janaPada();
		webs = await allWebdev();
		snips = await snippets();
		notes = await allNotes();
		items = await toDo();
		titles = await gptTitles();
	});
</script>

<Shell>
	<div slot="left" class="rta-column onleft" data-lenis-prevent>
		<div class="forheight rta-column rowgap100">
			{#if builds && builds.length > 0}
				{#each builds as item}
					<p>
						<a href={item.linkpath}>
							{item.meta.title}
						</a>
					</p>
				{/each}
			{/if}
		</div>
	</div>
	<div slot="main" class="rta-column">
		<slot />
	</div>
	<div class="rta-column rowgap200 onright fullW" slot="right">
		<NotesForm />
		<div class="rta-column listitems bord-top p-top-16 xleft">
			{#if items && items.length > 0}
				{#each items as item}
					<label>
						<input type="checkbox" />
						{item.title}
					</label>
				{/each}
			{/if}
		</div>
	</div>
</Shell>

<style lang="sass">

.onleft
	@media screen and (max-width: 1023px)
		padding: 16px
		z-index: 1000
		background: var(--this)
		border-bottom: 1px solid var(--background)

p a
	color: var(--default)
	&:hover
		color: #10D56C

.forheight p
	font-size: 14px

.onright
	@media screen and (max-width: 1023px)
		padding-bottom: 16px

</style>
