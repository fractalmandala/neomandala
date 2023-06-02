<script lang="ts">
	import { gptBots } from '$lib/gpt/gptdb';
	import { themeMode, breakZero, breakOne, breakTwo } from '$lib/stores/globalstores';
	import { onMount } from 'svelte';
	import { formatTimeAgo } from '$lib/dash/sharedutils';
	import Clock from '$lib/design/iconset/clock.svelte';
	import ChevRight from '$lib/design/iconset/chevronsright.svelte';
	import { createLocalStorageStore, chatSessions, type ChatSession } from '$lib/gpt/chatstore';
	import Info from '$lib/design/iconset/info.svelte';
	import { v4 as uuidv4 } from 'uuid';
	import { botsList } from '$lib/gpt/botslist';
	let bots: any;
	let prompts = '';
	let currentBot, currentName: any;
	let session: ChatSession | undefined;
	let sessionPrompt: string;
	let sessionbot: string;
	let createdAt: any;
	let id: string;

	$: if ($chatSessions.length > 0) {
		session = $chatSessions.sort((a, b) => {
			if (!b.createdAt) return -1; // b is undefined, a comes first
			if (!a.createdAt) return 1; // a is undefined, b comes first
			return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(); // normal comparison
		})[0];
	}

	function startNewChat() {
		const newChat = {
			query: 'init',
			answer: prompts,
			timestamp: new Date().toISOString()
		};

		id = uuidv4();
		createdAt = new Date().toISOString();
		sessionPrompt = prompts;
		sessionbot = currentName;
		chatSessions.update((sessions) => {
			let sessionToUpdate = sessions.find((session) => session.id === id);
			if (!sessionToUpdate) {
				sessionToUpdate = {
					id: id,
					sessionprompt: sessionPrompt,
					messages: [],
					createdAt: createdAt,
					sessionbot: sessionbot
				};
				sessions.push(sessionToUpdate);
			}

			sessionToUpdate.messages.push(newChat);
			return sessions;
		});
	}

	function findBotByPrompt() {
		botsList.find((bot) => bot.prompt === prompts);
		console.log(prompts);
		return (currentBot = botsList.find((bot) => bot.prompt === prompts));
	}

	$: if (prompts) {
		currentBot = findBotByPrompt();
		currentName = currentBot ? currentBot.name : undefined;
		console.log(currentName);
	}

	onMount(async () => {
		bots = await gptBots();
	});
</script>

<div
	class="system-notes rta-column rowgap300 null"
	class:levelzero={$breakZero}
	class:levelone={$breakOne}
	class:leveltwo={$breakTwo}
	class:lightmode={$themeMode}
	class:darkmode={!$themeMode}
>
	<div class="rta-column rowgap50 theselector">
		{#if session}
			<div class="rta-row topstrip xend colgap100">
				<div class="rta-row botsfilter">
					{#if bots && bots.length > 0}
						<select class="bot-selector" bind:value={prompts}>
							{#each bots as item}
								<option value={item.prompt}>{item.name}</option>
							{/each}
						</select>
					{/if}
				</div>
				{#if prompts !== ''}
					<button class="genbutton" on:click={startNewChat}>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="16"
							height="16"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							stroke-width="2"
							stroke-linecap="round"
							stroke-linejoin="round"
							class="lucide lucide-plus"
							><line x1="12" x2="12" y1="5" y2="19" /><line x1="5" x2="19" y1="12" y2="12" /></svg
						>
					</button>
				{/if}
			</div>
		{:else}
			<cite class="grey ta-r">Select Bot</cite>
		{/if}
	</div>
	{#if $chatSessions && $chatSessions.length > 0}
		{#each $chatSessions as item}
			<div class="note-item null bord-bot ta-r rowgap50 rta-column p-bot-16">
				<p class="tt-c">{item.id}</p>
				<div class="rta-row null xend colgap200 ycenter">
					<div class="rta-row colgap50 null ycenter">
						<Clock />
						<cite>{formatTimeAgo(item.createdAt)}</cite>
					</div>
					<div class="rta-row colgap50 null ycenter">
						<Info dimension={14} />
						<cite class="tt-u">{item.id.slice(0, 6)}</cite>
					</div>
				</div>
			</div>
		{/each}
	{/if}
</div>

<style lang="sass">

.bot-selector
	background: transparent
	color: var(--themerp)
	border: 1px solid var(--themerp)
	font-family: 'Space Grotesk', sans-serif
	font-size: 12px

.topstrip
	.genbutton
		width: 20px
		height: 20px
		padding: 0
	.botsfilter
		height: 20px

</style>
