<script lang="ts">
	import type { Message } from '$lib/neo/types';
	import { snapScrollToBottom } from '$lib/neo/scroller';
	import ScrollToBottomBtn from '$lib/neo/ScrollButton.svelte';
	import { tick } from 'svelte';
	import { randomUUID } from '$lib/neo/types';
	import ChatMessage from './ChatMessage.svelte';

	export let messages: Message[];
	export let loading: boolean;
	export let pending: boolean;
	export let isAuthor: boolean;
	export let currentModel = 'OpenAssistant/oasst-sft-4-pythia-12b-epoch-3.5';
	export let readOnly: boolean = false;

	let chatContainer: HTMLElement;

	async function scrollToBottom() {
		await tick();
		chatContainer.scrollTop = chatContainer.scrollHeight;
	}

	// If last message is from user, scroll to bottom
	$: if (messages[messages.length - 1]?.from === 'user') {
		scrollToBottom();
	}
</script>

<div
	class="scrollbar-custom mr-1 h-full overflow-y-auto"
	use:snapScrollToBottom={messages.length ? [...messages] : false}
	bind:this={chatContainer}
>
	<div class="mx-auto flex h-full max-w-3xl flex-col gap-6 px-5 pt-6 sm:gap-8 xl:max-w-4xl">
		{#each messages as message, i}
			<ChatMessage
				loading={loading && i === messages.length - 1}
				{message}
				{isAuthor}
				{readOnly}
				model={currentModel}
				on:retry
				on:vote
			/>
		{/each}
		{#if pending}
			<ChatMessage
				message={{ from: 'assistant', content: '', id: randomUUID() }}
				model={currentModel}
			/>
		{/if}
		<div class="h-44 flex-none" />
	</div>
	<ScrollToBottomBtn scrollNode={chatContainer} />
</div>
