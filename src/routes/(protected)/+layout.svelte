<script lang="ts">
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import { allNotes } from '$lib/dash/db';
	import { chatSessions } from '$lib/gpt/chatstore';
	import BotUtil from '$lib/dash/BotUtil.svelte';
	import Shell from '$lib/design/ShellTwo.svelte';
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
	import Acco8 from '$lib/design/MandAccordionItem.svelte';
	import Add from '$lib/design/iconset/add.svelte';
	import Refresh from '$lib/design/iconset/refresh.svelte';
	import NotesForm from '$lib/dash/NotesForm.svelte';
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
	<div slot="side" class="rta-column onleft">
		<div class="forheight rta-column rowgap100">
			<div class="rta-row ycenter colgap100 buttonschoice bord-bot p-bot-16">
				<a class="blank-button" href="/pad">
					<Add dimension={20} />
				</a>
				{#if currentPage === '/bot'}
					<BotUtil />
				{/if}
			</div>
			<Acco8>
				<a href="/bot">Bot</a>
			</Acco8>
			<Acco5>
				Guides

				<div slot="body" class="rta-column">
					{#if webs && webs.length > 0}
						{#each webs as item}
							<p>
								<a href={item.linkpath}>
									{item.meta.title}
								</a>
							</p>
						{/each}
					{/if}
				</div>
			</Acco5>

			{#if $notesDiary && $notesDiary.length > 0}
				<Acco6
					>Local Notes
					<div slot="body" class="rta-column">
						{#each $notesDiary as item}
							<p><a href="/pad/{item.id}">{item.title}</a></p>
						{/each}
					</div>
				</Acco6>
			{/if}
			<Acco4>
				Articles
				<div slot="body" class="rta-column">
					{#if notes && notes.length > 0}
						{#each notes as item}
							<p>
								<a href="/doc/{item.id}">
									{item.title}
								</a>
							</p>
						{/each}
					{/if}
				</div>
			</Acco4>
			<Acco2>
				Code Snips
				<div slot="body" class="rta-column">
					{#if snips && snips.length > 0}
						{#each snips as item}
							<p>
								<a class="hover" href="/code/{item.id}">
									{item.title}
								</a>
							</p>
						{/each}
					{/if}
				</div>
			</Acco2>
			<Acco3>
				Local Chats
				<div slot="body">
					{#if $chatSessions && $chatSessions.length > 0}
						{#each $chatSessions as chat}
							<p>
								<a href="/bot/{chat.id}">
									{chat.id.slice(0, 17)}
								</a>
							</p>
						{/each}
					{/if}
				</div>
			</Acco3>
			<Acco>
				GPT Repo
				<div slot="body">
					{#if titles && titles.length > 0}
						{#each titles as item}
							<p>
								<a href="/repo/{item.id}">
									{item.title}
								</a>
							</p>
						{/each}
					{/if}
				</div>
			</Acco>
			<Acco7>
				Janapada
				<div slot="body">
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
			</Acco7>
		</div>
	</div>
	<div slot="main" class="rta-column">
		<slot />
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


</style>
