<script lang="ts">
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import { allNotes } from '$lib/dash/db';
	import { chatSessions } from '$lib/gpt/chatstore';
	import BotUtil from '$lib/dash/BotUtil.svelte';
	import Gridder from '$lib/components/Gridder.svelte';
	import { allBuild, allWebdev } from '$lib/utils/localpulls';
	import type { ChatSession } from '$lib/gpt/chatstore';
	import { slide } from 'svelte/transition';
	import { snippets } from '$lib/dash/db';
	import Acco from '$lib/design/MandAccordionItem.svelte';
	import Acco2 from '$lib/design/MandAccordionItem.svelte';
	import Acco3 from '$lib/design/MandAccordionItem.svelte';
	import Acco4 from '$lib/design/MandAccordionItem.svelte';
	import Add from '$lib/design/iconset/add.svelte';
	import Refresh from '$lib/design/iconset/refresh.svelte';
	import { showModal } from '$lib/stores/modalstores';
	import {
		breakZero,
		breakOne,
		breakTwo,
		themeMode,
		toggleVisibility
	} from '$lib/stores/globalstores';
	import { notesDiary } from '$lib/dash/notesutil';
	import Loader from '$lib/assets/Loader.svelte';
	import Pinned from '$lib/dash/PinnedNotes.svelte';
	import Auth from '$lib/dash/AuthHeader.svelte';
	let session: ChatSession | undefined;
	let openB = true;
	let fake = false;
	let builds: any;
	let webs: any;
	let snips: any;
	let notes: any;
	let openAcco = Array(4).fill(false);
	let buildOpen = Array(10).fill(false);
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

	function toggleOpenAcco(index: number) {
		openAcco[index] = !openAcco[index];
		for (let i = 0; i < openAcco.length; i++) {
			if (i !== index && openAcco[i] === true) {
				openAcco[i] = false;
			}
		}
	}

	function toggleBuildOpen(index: number) {
		buildOpen[index] = !buildOpen[index];
		for (let i = 0; i < buildOpen.length; i++) {
			if (i !== index && buildOpen[i] === true) {
				buildOpen[i] = false;
			}
		}
	}

	function fauxfake() {
		fake = !fake;
	}

	function toggleBar() {
		openB = !openB;
	}

	function handleModeChange() {
		toggleVisibility();
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
			builds = await allBuild();
			webs = await allWebdev();
			snips = await snippets();
			notes = await allNotes();
		})();
	}

	onMount(() => {
		(async () => {
			builds = await allBuild();
			webs = await allWebdev();
			snips = await snippets();
			notes = await allNotes();
		})();
	});
</script>

<div
	class="with-sidebar"
	class:levelzero={$breakZero}
	class:levelone={$breakOne}
	class:leveltwo={$breakTwo}
	class:lightmode={$themeMode}
	class:darkmode={!$themeMode}
	class:calib={openB}
>
	<section class="sidebar">
		<div class="forheight p-top-32">
			<div class="grot null">
				{#if session}
					<cite class="green tt-u">Current Bot - {session.sessionbot}</cite>
				{/if}
			</div>
			<div class="rta-row ycenter buttonschoice bord-bot p-bot-16">
				<button class="blank-button" on:click={handleRefresh}>
					<Refresh dimension={18} />
				</button>
				<a class="blank-button" href="/doc">
					<Add dimension={20} />
				</a>
				{#if currentPage === '/bot'}
					<BotUtil />
				{/if}
			</div>
			<Acco4>
				Articles
				<div slot="body" class="rta-column">
					{#if notes && notes.length > 0}
						{#each notes as item}
							<a href="/doc/{item.id}">
								{item.title}
							</a>
						{/each}
					{/if}
				</div>
			</Acco4>
			<Acco
				>Draft Notes
				<div slot="body">
					{#if $notesDiary && $notesDiary.length > 0}
						{#each $notesDiary as note}
							<p>{note.title}</p>
						{/each}
					{/if}
				</div>
			</Acco>
			<Acco2>
				Code Snips
				<div slot="body" class="rta-column">
					{#if snips && snips.length > 0}
						{#each snips as item}
							<a class="hover" href="/code/{item.id}">
								{item.title}
							</a>
						{/each}
					{/if}
				</div>
			</Acco2>
			<Acco3>
				GPT Chats
				<div slot="body">
					{#if $chatSessions && $chatSessions.length > 0}
						{#each $chatSessions as chat}
							<a href="/bot/{chat.id}">
								{chat.id}
							</a>
						{/each}
					{/if}
				</div>
			</Acco3>
		</div>
	</section>
	<section class="mainbar">
		<slot />
	</section>
</div>

<style lang="sass">

.lightmode
	.forheight
		backdrop-filter: blur(5px)
		background: rgba(255, 255, 255, 1)

a
	&:hover
		color: #10D56C

.with-sidebar
	width: 100vw
	@media screen and (min-width: 900px)
		grid-template-columns: 256px 1fr
		padding: 0 40px
		grid-template-areas: "sidebar mainbar"
		.sidebar
			height: calc(100vh - 56px)
			position: sticky
			top: 56px
			padding-top: 56px
			.forheight
				height: calc(100vh - 112px)
				overflow-y: scroll
				display: flex
				flex-direction: column
				border-radius: 5px
				padding: 16px
				row-gap: 20px
				&::-webkit-scrollbar
					width: 1px
			.rta-row
				column-gap: 16px
		.mainbar
			padding-left: 6vw
			padding-right: 16vw
			margin-top: 56px
	@media screen and (min-width: 769px) and (max-width: 899px)
		grid-template-columns: 200px 1fr
		grid-template-areas: "sidebar mainbar"
		padding: 56px 2.4vw 0 2.4vw
		.sidebar
			height: calc(100vh - 120px)
			position: sticky
			top: 56px
			overflow-y: scroll
			border-right: 1px solid var(--contraster)
			&::-webkit-scrollbar
				width: 1px
		.mainbar
			padding-left: 3.2vw
			padding-right: 3.2vw
	@media screen and (max-width: 768px)
		grid-template-columns: 1fr
		grid-template-areas: "mainbar"
		padding: 56px 24px
		.sidebar
			display: none
		.mainbar
			padding-left: 0
			padding-right: 0

.with-sidebar.leveltwo
	.sidebar
		display: none

.with-sidebar
	display: grid
	.sidebar
		grid-area: sidebar
		display: flex
		flex-direction: column
		gap: 16px
		padding-right: 16px
	.mainbar
		grid-area: mainbar

</style>
