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
	import { createLocalStorageStore, chatSessions, type ChatSession } from '$lib/gpt/chatstore';
	import { v4 as uuidv4 } from 'uuid';
	import ChatLatest from '$lib/gpt/ChatLatest.svelte';
	import { botsList } from '$lib/gpt/botslist';

	let fake = false;
	let prompt1;
	let bots: any;
	let onBot: any;
	let current: any;
	export let query = '';
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
	class="null rta-column rowgap100"
	class:levelzero={$breakZero}
	class:levelone={$breakOne}
	class:leveltwo={$breakTwo}
	class:light={$themeMode}
	class:dark={!$themeMode}
>
	<div class="displayarea">
		{#each chatMessages as message}
			<div class="rta-column bord-bot p-bot-16">
				<small>{message.role}</small>
				<p>{message.content}</p>
			</div>
		{/each}

		{#if loading}
			<div class="rta-column">
				<p>Loading...</p>
			</div>
		{/if}
	</div>
</div>

<style lang="sass">

.displayarea
	p
		font-size: 18px


</style>
