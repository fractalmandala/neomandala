<script lang="ts">
	import type { Message } from '$lib/neo/types';
	import { createEventDispatcher } from 'svelte';

	import ChatMessages from './ChatMessages.svelte';
	import ChatInput from './ChatInput.svelte';
	export let messages: Message[] = [];
	export let loading = false;
	export let pending = false;
	export let shared = false;

	export let loginRequired = false;

	let loginModalOpen = false;
	let message: string;
	let currentModel = 'OpenAssistant/oasst-sft-4-pythia-12b-epoch-3.5';

	const dispatch = createEventDispatcher<{
		message: string;
		share: void;
		stop: void;
		retry: { id: Message['id']; content: string };
	}>();

	const handleSubmit = () => {
		if (loading) return;
		dispatch('message', message);
		message = '';
	};
</script>

<div class="relative min-h-0 min-w-0">
	<ChatMessages
		{loading}
		{pending}
		{currentModel}
		{messages}
		isAuthor={!shared}
		on:message
		on:vote
		on:retry={(ev) => {
			if (!loading) dispatch('retry', ev.detail);
		}}
	/>
	<div
		class="dark:via-gray-80 pointer-events-none absolute inset-x-0 bottom-0 z-0 mx-auto flex w-full max-w-3xl flex-col items-center justify-center bg-gradient-to-t from-white via-white/80 to-white/0 px-3.5 py-4 dark:border-gray-800 dark:from-gray-900 dark:to-gray-900/0 max-md:border-t max-md:bg-white max-md:dark:bg-gray-900 sm:px-5 md:py-8 xl:max-w-4xl [&>*]:pointer-events-auto"
	>
		<div class="flex w-full pb-3 max-md:justify-between">
			{#if loading}
				<button class="genbutton" on:click={() => dispatch('stop')}>Stop</button>
			{/if}
		</div>
		<form on:submit|preventDefault={handleSubmit}>
			<div class="flex w-full flex-1 border-none bg-transparent">
				<ChatInput
					placeholder="Ask anything"
					bind:value={message}
					on:submit={handleSubmit}
					on:keypress={() => {
						if (loginRequired) loginModalOpen = true;
					}}
					maxRows={4}
				/>

				{#if loading}
					<button
						class="btn mx-1 my-1 inline-block h-[2.4rem] self-end rounded-lg bg-transparent p-1 px-[0.7rem] text-gray-400 disabled:opacity-60 enabled:hover:text-gray-700 dark:disabled:opacity-40 enabled:dark:hover:text-gray-100 md:hidden"
						on:click={() => dispatch('stop')}
					>
						Stop
					</button>
					<div
						class="mx-1 my-1 hidden h-[2.4rem] items-center p-1 px-[0.7rem] text-gray-400 disabled:opacity-60 enabled:hover:text-gray-700 dark:disabled:opacity-40 enabled:dark:hover:text-gray-100 md:flex"
					>
						Loading
					</div>
				{:else}
					<button
						class="btn mx-1 my-1 h-[2.4rem] self-end rounded-lg bg-transparent p-1 px-[0.7rem] text-gray-400 disabled:opacity-60 enabled:hover:text-gray-700 dark:disabled:opacity-40 enabled:dark:hover:text-gray-100"
						type="submit"
					>
						Send
					</button>
				{/if}
			</div>
		</form>
		<div class="mt-2 flex justify-between self-stretch px-1 text-xs text-gray-400/90 max-sm:gap-2">
			<p>
				Model: <a
					href="https://huggingface.co/OpenAssistant/oasst-sft-4-pythia-12b-epoch-3.5"
					target="_blank"
					rel="noreferrer"
					class="hover:underline">OpenAssistant/oasst-sft-4-pythia-12b-epoch-3.5</a
				> <span class="max-sm:hidden">·</span><br class="sm:hidden" /> Generated content may be inaccurate
				or false.
			</p>
			{#if messages.length}
				<button
					class="flex flex-none items-center hover:text-gray-400 hover:underline max-sm:rounded-lg max-sm:bg-gray-50 max-sm:px-2.5 dark:max-sm:bg-gray-800"
					type="button"
					on:click={() => dispatch('share')}
				>
					Export
					<div class="max-sm:hidden">Share this conversation</div>
				</button>
			{/if}
		</div>
	</div>
</div>
