<script lang="ts">
	import { botsList } from '$lib/gpt/botslist';
	import { chatSessions } from '$lib/gpt/chatstore';
	import { showNote } from '$lib/dash/alerts';
	import { showModal } from '$lib/stores/modalstores';
	import AddBot from '$lib/design/iconset/message.svelte';
	import type { ChatSession } from '$lib/gpt/chatstore';
	import { v4 as uuidv4 } from 'uuid';
	let prompts = '';
	let currentBot: any, currentName: any;
	let session: ChatSession | undefined;
	let id: string;
	let createdAt: any;
	let sessionPrompt: string;
	let sessionbot: string;
	let newBot: string;

	function findBotByPrompt() {
		botsList.find((bot) => bot.prompt === newBot);
		return (currentBot = botsList.find((bot) => bot.prompt === newBot));
	}

	$: if (newBot) {
		currentBot = findBotByPrompt();
		currentName = currentBot ? currentBot.name : undefined;
	}

	$: if ($chatSessions.length > 0) {
		session = $chatSessions.sort((a, b) => {
			if (!b.createdAt) return -1; // b is undefined, a comes first
			if (!a.createdAt) return 1; // a is undefined, b comes first
			return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(); // normal comparison
		})[0];
	}

	function showCurrent() {
		showModal(`${currentName} with ${sessionPrompt}`, 'no', 0);
	}

	function startNewChat() {
		const newChat = {
			query: 'init',
			answer: newBot,
			timestamp: new Date().toISOString()
		};

		id = uuidv4();
		createdAt = new Date().toISOString();
		sessionPrompt = newBot;
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
			showNote('initiated!', true);
			return sessions;
		});
	}
</script>

<div class="rta-row colgap100">
	<button class="blank-button" on:click={startNewChat}>
		<AddBot dimension={18} />
	</button>
	<div class="rta-column">
		<select bind:value={newBot}>
			{#if session}
				<option value={sessionPrompt}>{session.sessionbot}</option>
			{/if}
			{#each botsList as bot}
				<option value={bot.prompt}>{bot.name}</option>
			{/each}
		</select>
	</div>
</div>

<style lang="sass">


select
	border: 1px solid var(--contraster)
	font-size: 12px
	font-weight: bold
	background: #10D56C
	border-radius: 4px
	color: white

</style>
