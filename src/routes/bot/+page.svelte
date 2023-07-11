<script lang="ts">
	//@ts-nocheck
	import Meta from '$lib/components/Meta.svelte';
	import { SSE } from 'sse.js';
	import { page } from '$app/stores';
	import ModOpenAI from '$lib/gpt/ModOpenAI.svelte';
	import Mod2 from '$lib/gpt/ModOpenAI.svelte';
	import Mod3 from '$lib/gpt/ModOpenAI.svelte';
	import type { PageData } from './$types';
	import { chatSessions } from '$lib/gpt/chatstore';
	import { browser } from '$app/environment';
	import { thisPrompt, thisSession } from '$lib/stores/globalstores';
	import { pageTitle, pageDescription, shareImage, pageUrl } from '$lib/stores/globalstores';
	import type { ChatSession, Message } from '$lib/gpt/chatstore';
	import { textareaAutosizeAction } from '$lib/gpt/textautoresize';
	import type { ChatCompletionRequestMessage } from 'openai';
	import Send from '$lib/design/iconset/send.svelte';

	export let data;
	let session: ChatSession | undefined;
	let scrollContainer: HTMLElement;
	let chatMessages: ChatCompletionRequestMessage[] = [];
	let prompts = '';
	let answer = '';
	let query = '';
	let loading = false;
	$pageTitle = 'Knowledge Index at Fractal Maṇḍala';
	$pageDescription = 'The digital garden as a WIP and in indexed form...';
	$pageUrl = 'https://www.fractalmandala.in/know';
	$shareImage =
		'https://wganhlzrylmkvvaoalco.supabase.co/storage/v1/object/public/images/website/grid.webp';

	$: ({ testTable, session } = data);

	$: $thisSession = session.id;
	$: $thisPrompt = session.prompt;

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
		const eventSource = new SSE('/api/openchat', {
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

	export function handleError<T>(err: T) {
		loading = false;
		query = '';
		answer = '';
		console.error(err);
	}
</script>

<Meta
	title={$pageTitle}
	metaDescription={$pageDescription}
	metaUrl={$pageUrl}
	metaImage={$shareImage}
/>

<div class="thisguys rta-column" data-lenis-prevent>
	<div class="rta-column areaofchat">
		<div class="grot scrollbox" bind:this={scrollContainer}>
			{#if $chatSessions && $chatSessions.length > 0}
				{#each $chatSessions as item}
					{#if item.id === $thisSession}
						{#each item.messages as mess}
							{#if mess.query !== 'init'}
								<div class="userclass ta-r bord-top p-top-16 p-bot-16">
									<Mod2 role={'user'} content={mess.query} greying={true} />
								</div>
								<div class="agentclass bord-top p-top-16 p-bot-16">
									<Mod3 role={'assistant'} content={mess.answer} />
								</div>
							{/if}
						{/each}
					{/if}
				{/each}
			{/if}
			{#each chatMessages as message}
				<ModOpenAI role={message.role} content={message.content} />
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
	</div>
	<form class="rta-row thisforminput">
		<textarea bind:value={query} use:textareaAutosizeAction data-lenis-prevent />
		{#if session !== undefined}
			<button class="blank-button" on:click={() => submitInput(session.id)}>
				<Send color={'#878787'} dimension={18} />
			</button>
		{/if}
	</form>
</div>

<style lang="sass">

.thisguys
	position: relative
	@media screen and (min-width: 1024px)
		height: calc(100vh - 200px)
		overflow-y: scroll
		align-items: center

.areaofchat
	@media screen and (min-width: 1024px)
		width: 720px
		height: calc(100% - 64px)
		overflow-y: scroll
	@media screen and (max-width: 1023px)
		max-width: 640px

.thisforminput
	position: absolute
	bottom: 0
	width: 720px !important
	align-items: center
	min-height: 48px
	min-width: 620px
	column-gap: 8px
	background: var(--background)
	border-radius: 8px
	.blank-button
		height: 32px
		margin-top: 4px
	textarea
		background: transparent
		width: calc(100% - 42px)
		min-height: 48px
		border: none
		padding: 4px 8px
		font-family: 'CommitMono', sans-serif

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
