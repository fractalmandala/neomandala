<script lang="ts">
	import { marked } from 'marked';
	import type { Message } from '$lib/neo/types';
	import { afterUpdate, createEventDispatcher } from 'svelte';
	import { deepestChild } from '$lib/neo/utils';
	import { page } from '$app/stores';

	import CodeBlock from '$lib/neo/CodeBlock.svelte';

	export let model: string;
	export let message: Message;
	export let loading = false;
	export let isAuthor = true;
	export let readOnly = false;
	export let isTapped = false;

	const dispatch = createEventDispatcher<{
		retry: { content: string; id: Message['id'] };
		vote: { score: Message['score']; id: Message['id'] };
	}>();

	let contentEl: HTMLElement;
	let loadingEl = 'Loading...';
	let pendingTimeout: ReturnType<typeof setTimeout>;

	const renderer = new marked.Renderer();

	// For code blocks with simple backticks
	renderer.codespan = (code: string) => {
		// Unsanitize double-sanitized code
		return `<code>${code.replaceAll('&amp;', '&')}</code>`;
	};

	const options = marked.use({
		...marked.getDefaults(),
		gfm: true,
		breaks: true,
		renderer
	});

	$: tokens = marked.lexer(message.content);

	afterUpdate(() => {
		clearTimeout(pendingTimeout);

		// Add loading animation to the last message if update takes more than 600ms
		if (loading) {
			pendingTimeout = setTimeout(() => {
				if (contentEl) {
					loadingEl = 'Loading...';
				}
			}, 600);
		}
	});

	$: downloadLink =
		message.from === 'user' ? `${$page.url.pathname}/message/${message.id}/prompt` : undefined;

	let webSearchIsDone = true;
</script>

{#if message.from === 'assistant'}
	<div>
		<img
			alt=""
			src="https://huggingface.co/avatars/2edb18bd0206c16b433841a47f53fa8e.svg"
			class="mt-5 h-3 w-3 flex-none select-none rounded-full shadow-lg"
		/>
		<div
			class="relative min-h-[calc(2rem+theme(spacing[3.5])*2)] min-w-[60px] break-words rounded-2xl border border-gray-100 bg-gradient-to-br from-gray-50 px-5 py-3.5 text-gray-600 prose-pre:my-2 dark:border-gray-800 dark:from-gray-800/40 dark:text-gray-300"
		>
			{#if !message.content}
				<p>Loading...</p>
			{/if}

			<div bind:this={contentEl}>
				{#each tokens as token}
					{#if token.type === 'code'}
						<CodeBlock lang={token.lang} code={token.text} />
					{:else}
						<!-- eslint-disable-next-line svelte/no-at-html-tags -->
						{@html marked(token.raw, options)}
					{/if}
				{/each}
			</div>
		</div>
		{#if isAuthor && !loading && message.content}
			<div
				class="absolute bottom-1 right-0 flex max-md:transition-all md:bottom-0 md:group-hover:visible md:group-hover:opacity-100
					{message.score ? 'visible opacity-100' : 'invisible max-md:-translate-y-4 max-md:opacity-0'}
					{isTapped ? 'max-md:visible max-md:translate-y-0 max-md:opacity-100' : ''}
				"
			>
				<button
					class="btn rounded-sm p-1 text-sm text-gray-400 focus:ring-0 hover:text-gray-500 dark:text-gray-400 dark:hover:text-gray-300
					{message.score && message.score > 0
						? 'text-green-500 hover:text-green-500 dark:text-green-400 hover:dark:text-green-400'
						: ''}"
					title={message.score === 1 ? 'Remove +1' : '+1'}
					type="button"
					on:click={() => dispatch('vote', { score: message.score === 1 ? 0 : 1, id: message.id })}
				>
					Thumbs up
				</button>
				<button
					class="btn rounded-sm p-1 text-sm text-gray-400 focus:ring-0 hover:text-gray-500 dark:text-gray-400 dark:hover:text-gray-300
					{message.score && message.score < 0
						? 'text-red-500 hover:text-red-500 dark:text-red-400 hover:dark:text-red-400'
						: ''}"
					title={message.score === -1 ? 'Remove -1' : '-1'}
					type="button"
					on:click={() =>
						dispatch('vote', { score: message.score === -1 ? 0 : -1, id: message.id })}
				>
					Thumbs down
				</button>
			</div>
		{/if}
	</div>
{/if}
{#if message.from === 'user'}
	<div class="group relative flex items-start justify-start gap-4 max-sm:text-sm">
		<div class="mt-5 h-3 w-3 flex-none rounded-full" />
		<div
			class="max-w-full whitespace-break-spaces break-words rounded-2xl px-5 py-3.5 text-gray-500 dark:text-gray-400"
		>
			{message.content.trim()}
		</div>
		{#if !loading}
			<div class="absolute right-0 top-3.5 flex gap-2 lg:-right-2">
				{#if downloadLink}
					<a
						class="rounded-lg border border-gray-100 p-1 text-xs text-gray-400 group-hover:block hover:text-gray-500 dark:border-gray-800 dark:text-gray-400 dark:hover:text-gray-300 md:hidden"
						title="Download prompt and parameters"
						type="button"
						target="_blank"
						href={downloadLink}
					>
						Download
					</a>
				{/if}
				{#if !readOnly}
					<button
						class="cursor-pointer rounded-lg border border-gray-100 p-1 text-xs text-gray-400 group-hover:block hover:text-gray-500 dark:border-gray-800 dark:text-gray-400 dark:hover:text-gray-300 md:hidden lg:-right-2"
						title="Retry"
						type="button"
						on:click={() => dispatch('retry', { content: message.content, id: message.id })}
					>
						Rotate
					</button>
				{/if}
			</div>
		{/if}
	</div>
{/if}
