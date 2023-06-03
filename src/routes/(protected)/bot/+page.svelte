<script lang="ts">
	//@ts-nocheck
	import { SSE } from 'sse.js';
	import { createLocalStorageStore, chatSessions } from '$lib/gpt/chatstore';
	import { browser } from '$app/environment';
	import type { ChatSession } from '$lib/gpt/chatstore';
	import { textareaAutosizeAction } from '$lib/gpt/textautoresize';
	import type { Message } from '$lib/gpt/chatstore';
	import type { ChatCompletionRequestMessage } from 'openai';
	import Latest from '$lib/gpt/ChatLatest.svelte';
	import Send from '$lib/design/iconset/send.svelte';
	let session: ChatSession | undefined;
	let scrollContainer: HTMLElement;
	let chatMessages: ChatCompletionRequestMessage[] = [];
	let prompts = '';
	let answer = '';
	let query = '';
	let loading = false;
	let fake = false;

	$: if (browser) {
		if (scrollContainer) {
			// scroll to the bottom
			scrollContainer.scrollTop = scrollContainer.scrollHeight;
		}
	}

	$: if ($chatSessions.length > 0) {
		session = $chatSessions.sort((a, b) => {
			if (!b.createdAt) return -1; // b is undefined, a comes first
			if (!a.createdAt) return 1; // a is undefined, b comes first
			return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(); // normal comparison
		})[0];
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
</script>

<div class="rta-column areaofchat">
	<div class="grot scrollbox" bind:this={scrollContainer}>
		<Latest />
		{#each chatMessages as message}
			<div class="rta-column null">
				<div class="rta-column userquery null">
					<p><b>{message.role} - </b>{message.content}</p>
				</div>
			</div>
		{/each}
		{#if answer}
			<div class="rta-column null agentanswer">
				<div>
					<pre>{answer}</pre>
				</div>
			</div>
		{/if}
		{#if loading}
			<div class="rta-column null">
				<p>Loading...</p>
			</div>
		{/if}
	</div>
	<form class="rta-row thisforminput">
		<textarea bind:value={query} use:textareaAutosizeAction />
		{#if session !== undefined}
			<button class="blank-button" on:click={() => submitInput(session.id)}>
				<Send color={'#10D56C'} dimension={18} />
			</button>
		{/if}
	</form>
</div>

<style lang="sass">

.areaofchat
	position: relative
	.thisforminput
		position: absolute
		opacity: 1
		border: 1px solid var(--contraster)
	.scrollbox
		position: absolute
	@media screen and (min-width: 769px)
		height: 100%
		justify-content: space-between
		width: 86%
		.scrollbox
			bottom: 112px
			left: 0
			height: 80vh
			overflow-y: scroll
			&::-webkit-scrollbar
				width: 1px
			.userquery
				width: 100%
				column-gap: 16px
				padding-top: 32px
				padding-bottom: 32px
				p
					width: calc(100% - 36px)
					text-align: right
			.agentanswer
				width: 100%
				column-gap: 16px
				padding-top: 32px
				padding-bottom: 32px
				pre
					width: calc(100% - 36px)
					text-align: left
		.thisforminput
			bottom: 56px
			left: 0
			height: 56px
			width: 100%
			padding: 8px
			align-items: center
			background: white
			border-radius: 8px
			.blank-button
				height: 24px
				width: 32px
			textarea
				width: calc(100% - 32px)
				min-height: 40px
				border: none
				font-family: 'Space Grotesk', sans-serif

.agentanswer
	pre
		overflow-x: auto
		box-sizing: border-box
		white-space: pre-line
		white-space: -moz-pre-line
		white-space: -pre-line
		white-space: -o-pre-line
		word-wrap: break-word
		word-break: break-word
		color: inherit


</style>
