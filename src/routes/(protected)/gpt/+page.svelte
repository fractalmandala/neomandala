<script lang="ts">
	import Circle from '$lib/design/iconset/circle.svelte';
	import { themeMode, breakZero, breakOne, breakTwo } from '$lib/stores/globalstores';
	import ChatBox from '$lib/gpt/ChatBox.svelte';
	import { SSE } from 'sse.js';
	import { createLocalStorageStore, chatSessions, type ChatSession } from '$lib/gpt/chatstore';
	import { textareaAutosizeAction } from '$lib/gpt/textautoresize';
	import type { Message } from '$lib/gpt/chatstore';
	import type { ChatCompletionRequestMessage } from 'openai';
	import type { ChatCompletionRequestMessageRoleEnum } from 'openai';
	import Latest from '$lib/gpt/ChatLatest.svelte';
	import Send from '$lib/design/iconset/send.svelte';
	import IconUser from '$lib/design/iconset/iconuser.svelte';
	let session: ChatSession | undefined;

	let chatMessages: ChatCompletionRequestMessage[] = [];
	let prompt = 'Once upon a time in a magical land called';
	let generatedText = '';
	let prompts = '';
	let answer = '';
	let query = '';
	let loading = false;
	let fake = false;

	function fauxfake() {
		fake = !fake;
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

<div
	class="rta-column actualsection"
	class:lightmode={$themeMode}
	class:darkmode={!$themeMode}
	class:levelzero={$breakZero}
	class:levelone={$breakOne}
	class:leveltwo={$breakTwo}
>
	<div class="inctualsection">
		<div class="colgap300 rta-row ycenter between null">
			{#if session}
				<cite class="green grot ta-r tt-u">Current Bot - {session.sessionbot}</cite>
			{/if}
		</div>
		<div class="chatbody null">
			<Latest />
			{#each chatMessages as message}
				<div class="rta-column bord-bot null p-bot-16">
					{#if message.role === 'user'}
						<div class="rta-row">
							<small>user</small>
							<p>{message.content}</p>
						</div>
					{/if}
				</div>
			{/each}
			{#if answer}
				<div class="rta-column null answerarea">
					<p>{answer}</p>
				</div>
			{/if}
			{#if loading}
				<div class="rta-column null">
					<p>Loading...</p>
				</div>
			{/if}
		</div>
		{#if session}
			<form class="rta-row thisforminput">
				<textarea bind:value={query} use:textareaAutosizeAction />

				<button class="blank-button" on:click={() => submitInput(session.id)} on:keydown={fauxfake}>
					<Send color={'#FFFFFF'} dimension={14} />
				</button>
			</form>
		{/if}
	</div>
</div>

<style lang="sass">

.levelzero.actualsection
	padding: 0
	.inctualsection
		padding: 0 !important
	.chatbody
		margin-bottom: 128px


.thisforminput
	position: fixed
	bottom: 32px
	width: 720px
	margin-left: 48px
	column-gap: 16px
	border-radius: 8px
	align-items: flex-end
	padding: 8px
	z-index: 900
	background: white
	.blank-button
		height: 26px
		display: flex
		align-items: center
		justify-content: center
		border-radius: 4px
		width: 26px
		transform-origin: center center
		background: #10D56C
		&:hover
			transform: scale(0.9)
	textarea
		width: calc(100% - 52px)
		min-height: 48px
		border-radius: 6px
		border: 1px solid var(--opposite)
		padding: 12px

.lightmode
	.thisforminput
		box-shadow: 4px 8px 15px #e1e1e1, -6px -6px 16px #f1f1f1

</style>
