<script lang="ts">
	import { onMount } from 'svelte';
	import type { PageData } from './$types';
	import { slide } from 'svelte/transition';
	import { showChip } from '$lib/stores/modalstores';
	import supabase from '$lib/utils/supabase';
	import Loader from '$lib/icons/Loader.svelte';
	import NewNote from '$lib/components/DhitiInput.svelte';
	import Excerpter from '$lib/agent/Excerpter.svelte';
	import { breakZero, breakOne, breakTwo, themeMode, readingMode } from '$lib/stores/globalstores';
	export let data: PageData;

	let notes: any;
	let links: any;
	let title = '';
	let content = '';
	let submitting = false;
	let confirmationMessage = '';
	let noteIn = Array(4).fill(false);
	let test = false;
	let latest: any;
	let query = '';

	function setQuery(newQuery: string) {
		query = newQuery;
	}

	function toggleNote(index: number) {
		noteIn[index] = !noteIn[index];
		for (let i = 0; i < noteIn.length; i++) {
			if (i !== index && noteIn[i] === true) {
				noteIn[i] = false;
			}
		}
	}

	$: anyNote = noteIn.some((item) => item);

	async function recentNotes() {
		const { data, error } = await supabase
			.from('amrit-notes')
			.select()
			.neq('tags', 'gpt')
			.order('id', { ascending: false })
			.limit(5);
		if (error) throw new Error(error.message);
		return data;
	}

	async function recentLinks() {
		const { data, error } = await supabase
			.from('amrit-notes')
			.select()
			.eq('agent', 'bookmark')
			.order('id', { ascending: false })
			.limit(10);
		if (error) throw new Error(error.message);
		return data;
	}

	async function insertBookmark() {
		confirmationMessage = '';
		submitting = true;
		const { error } = await supabase
			.from('amrit-notes')
			.insert({ title: title, content: content, agent: 'bookmark' });
		if (error) {
			showChip('Error!', '#fe4a49');
		} else {
			submitting = false;
			title = 'Done!';
			content = '';
			refreshNotes();
		}
	}

	async function lastNote() {
		const { data, error } = await supabase
			.from('brhat-dhiti')
			.select()
			.order('id', { ascending: false })
			.limit(1);
		if (error) throw new Error(error.message);
		return data;
	}

	let text = '';
	let wordLimit = 300;

	function truncateWords(text: string, wordLimit: number) {
		const words = text.split(' ');
		const truncatedWords = words.slice(0, wordLimit);
		return truncatedWords.join(' ');
	}

	async function refreshNotes() {
		notes = await recentNotes();
		latest = await lastNote();
	}

	onMount(async () => {
		notes = await recentNotes();
		links = await recentLinks();
		latest = await lastNote();
	});
</script>

<div
	class="rta-grid grid3 borderiar"
	class:levelzero={$breakZero}
	class:levelone={$breakOne}
	class:leveltwo={$breakTwo}
	class:light={$themeMode}
	class:dark={!$themeMode}
>
	{#if data.in === true}
		<div class="rta-column rowgap50 thinner1 null">
			{#if anyNote}
				<div class="rta-column p-top-16" transition:slide>
					{#if noteIn[3]}
						<form class="rta-row colgap100" on:submit|preventDefault={() => insertBookmark()}>
							<input type="text" placeholder="title" bind:value={title} />
							<input type="text" placeholder="url" bind:value={content} />
							{#if submitting}
								<Loader />
							{:else}
								<button class="mainbutton" type="submit">Submit</button>
							{/if}
						</form>
					{/if}
				</div>
			{/if}
			<p class="green noh p-top-16 p-bot-16"><strong>Recent Notes:</strong></p>
			{#if notes && notes.length > 0}
				<div class="rta-column recentnotes rowgap50 p-bot-16">
					{#each notes as item}
						<small class="grey">
							<a href="/note/{item.id}" class="hover">
								{item.title}
							</a>
						</small>
					{/each}
				</div>
			{/if}
			<div class="rta-column rowgap50 p-top-16 bord-top p-bot-16">
				<div class="rta-icon">
					<svg
						width="24"
						height="24"
						viewBox="0 0 20 20"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							d="M9.24624 14.4612H5.83411C4.59411 14.4612 3.5406 14.0278 2.67357 13.161C1.80655 12.2941 1.37305 11.2417 1.37305 10.0038C1.37305 8.76579 1.80655 7.71023 2.67357 6.83707C3.5406 5.96392 4.59411 5.52734 5.83411 5.52734H9.24624V7.18949H5.83915C5.05112 7.18949 4.38482 7.4608 3.84026 8.00343C3.2957 8.54605 3.02342 9.21 3.02342 9.99528C3.02342 10.7805 3.2957 11.4461 3.84026 11.992C4.38482 12.5379 5.05112 12.8109 5.83915 12.8109H9.24624V14.4612ZM6.57142 10.6958V9.30453H13.4301V10.6958H6.57142ZM10.7553 14.4612V12.8109H14.1624C14.9504 12.8109 15.6167 12.5396 16.1613 11.9969C16.7059 11.4543 16.9781 10.7904 16.9781 10.0051C16.9781 9.21981 16.7059 8.55423 16.1613 8.00832C15.6167 7.46243 14.9504 7.18949 14.1624 7.18949H10.7553V5.52734H14.1674C15.4049 5.52734 16.4598 5.96361 17.332 6.83616C18.2042 7.7087 18.6403 8.76395 18.6403 10.0019C18.6403 11.2399 18.2042 12.2926 17.332 13.1601C16.4598 14.0275 15.4049 14.4612 14.1674 14.4612H10.7553Z"
							fill="#10D56C"
						/>
					</svg>
				</div>
				{#if links && links.length > 0}
					{#each links as item}
						<small class="grey"
							><a class="hover" href={item.content} target="_blank" rel="noreferrer">{item.title}</a
							></small
						>
					{/each}
				{/if}
			</div>
			<div class="rta-column rowgap100">
				{#if latest && latest.length > 0}
					{#each latest as item}
						<button class="mainbutton" on:click={() => setQuery(truncateWords(item.fullbody, 400))}>
							Generate Excerpt
						</button>
					{/each}
				{/if}
				<button class="mainbutton"> Generate Tweet</button>
			</div>
			<div class="rta-column p-top-16 bord-top">
				<h6>Latest at Dhīti:</h6>
				{#if latest && latest.length > 0}
					{#each latest as item}
						<p>{item.title}</p>
					{/each}
				{/if}
			</div>
		</div>
		<div class="rta-column wider p-bot-64">
			<NewNote />
			<div class="results rta-column">
				{#if latest && latest.length > 0}
					{#each latest as item}
						<p>{truncateWords(item.fullbody, 400)}</p>
					{/each}
				{/if}
				<Excerpter {query} />
			</div>
		</div>
	{/if}
</div>

<style lang="sass">


.levelzero
	min-height: calc(100vh - 128px)
	padding-top: 32px
	grid-template-columns: 200px 1fr
	grid-template-areas: "thinner1 wider"
	grid-template-rows: auto
	max-width: 100vw
	overflow-x: hidden
	padding-left: 2vw
	column-gap: 4vw
	.wider
		grid-area: wider
		transition: 0.4s
		width: 88%
	.thinner1
		grid-area: thinner1
		width: 200px


.rta-icon
	cursor: pointer
	&:hover
		svg path
			fill: var(--green)

input[type=text]
	border: 1px solid var(--borderline)
	border-radius: 6px
	padding: 2px 8px

</style>
