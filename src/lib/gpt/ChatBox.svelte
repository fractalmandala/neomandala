<script lang="ts">
	import { onMount } from 'svelte';
	import { SSE } from 'sse.js';
	import { gptBots, onPrompt, inputMessage, vlookupBot } from '$lib/gpt/gptdb';
	import { breakOne, breakZero, breakTwo, themeMode } from '$lib/stores/globalstores';
	import type { ChatCompletionRequestMessage } from 'openai';
	import type { ChatCompletionRequestMessageRoleEnum } from 'openai';
	import type { ChatStream, ChatMessage } from '$lib/gpt/gpttypes';
	import type { Message } from '$lib/gpt/chatstore';
	import { showAlert, showGood } from '$lib/stores/modalstores';
	import { textareaAutosizeAction } from '$lib/gpt/textautoresize';
	import { createLocalStorageStore, chatSessions, type ChatSession } from '$lib/gpt/chatstore';
	import { v4 as uuidv4 } from 'uuid';
	import ChatLatest from '$lib/gpt/ChatLatest.svelte';
	import Bot from '$lib/icons/Bot.svelte';
	import User from '$lib/icons/User.svelte';
	import { botsList } from '$lib/gpt/botslist';

	let fake = false;
	let prompt1;
	let bots: any;
	let onBot: any;
	let current: any;
	let query = '';
	let answer = '';
	let loading = false;
	let prompts = '';
	let botN: string;
	let chatMessages: ChatCompletionRequestMessage[] = [];
	let type: ChatCompletionRequestMessageRoleEnum;
	let id: string;
	let currentID: string;
	let sessionPrompt: string;
	let sessionbot: string;
	let createdAt: any;
	let session: ChatSession | undefined;
	let inputBot: any;
	let currentBot, currentName: any;

	function fauxfake() {
		fake = !fake;
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

	const newMessage: Message = {
		query: query,
		answer: answer,
		timestamp: new Date().toISOString()
	};

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
			showGood('initiated');
			return sessions;
		});
	}

	const submitInput = async (chatIdToAddMessage: string) => {
		loading = true;
		chatMessages = [...chatMessages, { role: 'user', content: query }];
		const eventSource = new SSE('/api/chat', {
			headers: {
				'Content-Type': 'application/json'
			},
			payload: JSON.stringify({ messages: chatMessages, prompt: prompts })
		});
		console.log(prompts);
		eventSource.addEventListener('error', handleError);
		eventSource.addEventListener('message', (e: { data: string }) => {
			try {
				loading = false;
				if (e.data === '[DONE]') {
					chatMessages = [...chatMessages, { role: 'assistant', content: answer }];
					console.log(answer);
					let newMessage: Message = {
						query: query,
						answer: answer,
						timestamp: new Date().toISOString()
					};

					// update the session with new message
					updateMessagesInSession(chatIdToAddMessage, newMessage);

					console.log(chatIdToAddMessage);
					return;
				}
				const completionResponse = JSON.parse(e.data);
				const [{ delta }] = completionResponse.choices;
				if (delta.content) {
					answer = (answer ?? '') + delta.content;
				}
			} catch (err) {
				handleError(err);
			}
		});
		eventSource.stream();
	};

	// The function to update messages in a specific session
	const updateMessagesInSession = (sessionId: string, newMessage: Message) => {
		const sessionToUpdateIndex = $chatSessions.findIndex((session) => session.id === sessionId);

		// If the session is found in the array
		if (sessionToUpdateIndex !== -1) {
			// Clone the session to avoid mutating it directly
			const sessionToUpdate = { ...$chatSessions[sessionToUpdateIndex] };

			// Update the messages array
			sessionToUpdate.messages = [...sessionToUpdate.messages, newMessage];

			// Replace the session in the array with the updated session
			chatSessions.update((sessions) => {
				sessions[sessionToUpdateIndex] = sessionToUpdate;
				return sessions;
			});
		} else {
			console.error(`Session with id ${sessionId} not found`);
		}
	};

	export function handleError<T>(err: T) {
		loading = false;
		query = '';
		answer = '';
		console.error(err);
	}

	onMount(async () => {
		onBot = await onPrompt();
		bots = await gptBots();
	});
</script>

<div
	class="chatbox null rta-column rowgap100"
	class:levelzero={$breakZero}
	class:levelone={$breakOne}
	class:leveltwo={$breakTwo}
	class:light={$themeMode}
	class:dark={!$themeMode}
>
	<div class="selectlabel rta-row ycenter padded p-bot-16">
		<div class="rta-column formholds">
			{#if session}
				<form class="rta-row thisform">
					<textarea bind:value={query} use:textareaAutosizeAction />
					<div
						class="outlineglow"
						type="submit"
						on:click={() => submitInput(session.id)}
						on:keydown={fauxfake}
					>
						<div class="insideglow">
							<svg
								width="24"
								height="24"
								viewBox="0 0 24 24"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									d="M22 2L11 13"
									stroke="white"
									stroke-width="2"
									stroke-linecap="round"
									stroke-linejoin="round"
								/>
								<path
									d="M22 2L15 22L11 13L2 9L22 2Z"
									stroke="white"
									stroke-width="2"
									stroke-linecap="round"
									stroke-linejoin="round"
								/>
							</svg>
						</div>
					</div>
				</form>
			{/if}
		</div>
		<div class="rta-column rowgap50 theselector">
			{#if session}
				<cite class="grey ta-r">Current Bot - {session.sessionbot}</cite>
			{:else}
				<cite class="grey ta-r">Select Bot</cite>
			{/if}
			<div class="rta-row topstrip colgap100">
				<div class="rta-row botsfilter">
					<button class="blank-button">
						<svg
							width="24"
							height="24"
							viewBox="0 0 24 24"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								d="M10 6H21"
								stroke="#878787"
								stroke-width="2"
								stroke-linecap="round"
								stroke-linejoin="round"
							/>
							<path
								d="M10 12H21"
								stroke="#878787"
								stroke-width="2"
								stroke-linecap="round"
								stroke-linejoin="round"
							/>
							<path
								d="M10 18H21"
								stroke="#878787"
								stroke-width="2"
								stroke-linecap="round"
								stroke-linejoin="round"
							/>
							<path
								d="M3 6L4 7L6 5"
								stroke="#878787"
								stroke-width="2"
								stroke-linecap="round"
								stroke-linejoin="round"
							/>
							<path
								d="M3 12L4 13L6 11"
								stroke="#878787"
								stroke-width="2"
								stroke-linecap="round"
								stroke-linejoin="round"
							/>
							<path
								d="M3 18L4 19L6 17"
								stroke="#878787"
								stroke-width="2"
								stroke-linecap="round"
								stroke-linejoin="round"
							/>
						</svg>
					</button>
					{#if bots && bots.length > 0}
						<select bind:value={prompts}>
							{#each bots as item}
								<option value={item.prompt}>{item.name}</option>
							{/each}
						</select>
					{/if}
				</div>
				{#if prompts !== ''}
					<button class="glowbox" on:click={startNewChat}>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="24"
							height="24"
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
		</div>
	</div>
	<div class="displayarea">
		{#each chatMessages as message}
			<div class="rta-column bord-bot p-bot-16">
				<small>{message.role}</small>
				<p>{message.content}</p>
			</div>
		{/each}
		{#if answer}
			<div class="rta-column">
				<p>{answer}</p>
			</div>
		{/if}
		{#if loading}
			<div class="rta-column">
				<p>Loading...</p>
			</div>
		{/if}
		<ChatLatest />
	</div>
</div>

<style lang="sass">

.levelzero
	.theselector
		width: 160px
		align-items: flex-end
	.formholds
		width: calc(100% - 192px)

.displayarea
	padding-left: 24px
	padding-right: 24px

.padded
	padding-left: 24px

.selectlabel
	height: 32px

.botsfilter
	position: relative
	.blank-button
		position: relative
		left: 32px
		top: 2px
	select
		font-size: 12px
		width: 128px
		outline: none
		appearance: none
		background: rgba(255, 255, 255, 0.06)
		padding: 4px 12px 4px 0
		height: 32px
		color: #878787
		cursor: pointer
		border: 1px solid rgba(255, 255, 255, 0.09)
		box-shadow: 2px 2px 4px rgba(0,0,0,0.2)
		transition: 0.09s ease
		&:hover
			color: #FFFFFF
			border: 1px solid rgba(255, 255, 255, 0.7)
	option
		text-align: right
		font-size: 12px

.formholds
	padding-left: 24px
	.mainbutton
		height: 32px
		width: 32px
		border-radius: 6px
	textarea
		min-height: 56px
	.glowbuttons
		height: 56px
		width: 56px
	.thisform
		width: 100%
		column-gap: 16px
		textarea
			width: calc(100% - 72px)
			background: rgba(255, 255, 255, 0.95)
			border-radius: 6px


</style>
