<script lang="ts">
	import { onMount, afterUpdate } from 'svelte';
	import { chatSessions, deleteChatSession, showDelete } from '$lib/gpt/chatstore';
	import { themeMode, breakZero, breakOne, breakTwo } from '$lib/stores/globalstores';
	import { marked } from 'marked';
	import type { ChatSession } from '$lib/gpt/chatstore';
	import Prism from 'prismjs';
	import '$lib/styles/prism.css';
	import IconUser from '$lib/design/iconset/iconuser.svelte';
	import IconBot from '$lib/design/iconset/iconbot.svelte';
	import Parser from '$lib/agent/Parser.svelte';

	let session: ChatSession | undefined;

	$: if ($chatSessions.length > 0) {
		session = $chatSessions.sort((a, b) => {
			if (!b.createdAt) return -1; // b is undefined, a comes first
			if (!a.createdAt) return 1; // a is undefined, b comes first
			return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(); // normal comparison
		})[0];
	}

	onMount(() => {
		Prism.highlightAll();
	});

	afterUpdate(() => {
		Prism.highlightAll();
	});
</script>

{#if session}
	<div class="messages bdr rta-column">
		{#each session.messages as message (message.timestamp)}
			{#if message.query === 'init'}
				<div class="blanker" />
			{:else}
				<div class="rta-column userquery null">
					<p>{message.query}</p>
				</div>
				<div class="rta-column rowgap300 agentanswer null">
					{@html marked.parse(message.answer)}
				</div>
			{/if}
		{/each}
	</div>
{/if}

<style lang="sass">

.userquery
	padding-top: 32px
	padding-bottom: 32px
.agentanswer
	padding-top: 32px
	padding-bottom: 32px

.userquery p
	font-family: 'Space Grotesk', sans-serif
	color: var(--greyish)

.agentanswer
	font-family: 'Space Grotesk', sans-serif
	code
		font-family: 'Space Mono', monospace
		font-size: 14px
	
.userquery
	text-align: right
	justify-content: flex-end
	column-gap: 16px
	line-height: 1.25

.agentanswer
	text-align: left
	justify-content: flex-start
	column-gap: 16px
	line-height: 1.25
	word-break: break-all

.messages
	overflow-y: scroll


</style>
