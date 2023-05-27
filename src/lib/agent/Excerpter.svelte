<script lang="ts">
	//@ts-nocheck

	import { onMount } from 'svelte';
	import { breakOne, uuidStore, breakZero, breakTwo, themeMode } from '$lib/stores/globalstores';

	import supabase from '$lib/utils/supabase';
	import Parser2 from '$lib/agent/Parser.svelte';
	import ChatMessages from '$lib/agent/ChatMessages.svelte';
	import { SSE } from 'sse.js';
	import type { ChatCompletionRequestMessage } from 'openai';
	import Send from '$lib/icons/Send.svelte';

	let chatMessages: ChatCompletionRequestMessage[] = [];
	let chatStream: any;
	let coGreen = '#0BC160';
	let coRed = '#fe4a49';

	let sessionStream: any;

	export let query = '';
	let answer: any;
	let loading = false;

	let prompt =
		'For the body of text you are given, you must do only these two things: A) Summarize it in a maximum of 300 characters that can serve as an excerpt for the text, B) Draft a 2-tweet thread vividly describing the text. Do not use hashtags or marketing gimmicks, draft professional and sincere content. Return your responses each wrapped in separate div tags, A and B.';

	const handleSubmit = async () => {
		loading = true;
		console.log(prompt);
		console.log(query);
		chatMessages = [...chatMessages, { role: 'user', content: query }];
		const eventSource = new SSE('/api/chat', {
			headers: {
				'Content-Type': 'application/json'
			},
			payload: JSON.stringify({ messages: chatMessages, prompt: prompt })
		});
		eventSource.addEventListener('error', handleError);

		eventSource.addEventListener('message', (e: { data: string }) => {
			try {
				loading = false;
				if (e.data === '[DONE]') {
					chatMessages = [...chatMessages, { role: 'assistant', content: answer }];
					console.log(answer);
					query = '';
					answer = '';
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

	function handleError<T>(err: T) {
		loading = false;
		query = '';
		answer = '';
		console.error(err);
	}

	$: if (query !== '') {
		(async () => {
			handleSubmit();
		})();
	}
</script>

<div
	class="rta-column"
	class:levelzero={$breakZero}
	class:levelone={$breakOne}
	class:leveltwo={$breakTwo}
	class:light={$themeMode}
	class:dark={!$themeMode}
>
	<div class="rta-column ytop colgap300 rowgap200">
		<div class="currentstream rta-column bord-top p-top-16">
			{#each chatMessages as message}
				<ChatMessages type={message.role} message={message.content} />
			{/each}
			{#if answer}
				<ChatMessages type="assistant" message={answer} />
			{/if}
			{#if loading}
				<ChatMessages type="assistant" message="Loading.." />
			{/if}
		</div>
		{#if sessionStream && sessionStream.length > 0}
			<div class="supabasebox rta-column rowgap400">
				{#each sessionStream as item}
					{#if item.agent === false}
						<div class="rta-row ta-r xend colgap200">
							<Parser2 response={item.content} />
							<img class="avatar" src="/images/hacker.png" alt="user" />
						</div>
					{:else}
						<div class="rta-row colgap200">
							<img class="avatar" src="/images/chatbot.png" alt="bot" />
							<Parser2 response={item.content} />
						</div>
					{/if}
				{/each}
			</div>
		{/if}
	</div>
</div>

<style lang="sass">

.loginform
	display: flex
	flex-direction: column
	row-gap: 8px
	.rta-row
		input
			width: calc(50% - 12px)
			border-radius: 4px
			padding: 2px 6px
			border: 1px solid rgba(255,255,255,0.3)
			background: rgba(255,255,255,0.12)
			color: white
	button
		width: 80px
		border: 1px solid rgba(255,255,255,0.6)
		border-radius: 4px
		color: white
		padding: 2px


</style>
