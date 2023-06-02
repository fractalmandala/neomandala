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

<div
	id="currentsession"
	class:lightmode={$themeMode}
	class:darkmode={!$themeMode}
	class:levelzero={$breakZero}
	class:levelone={$breakOne}
	class:leveltwo={$breakTwo}
>
	{#if session}
		<div class="messages rta-column">
			{#each session.messages as message (message.timestamp)}
				{#if message.query === 'init'}
					<div class="blanker" />
				{:else}
					<div class="rta-row userquery null">
						<p>{message.query}</p>
						<img src="/images/iconuser.png" alt="user" />
					</div>
					<div class="rta-row agentanswer null">
						<img src="/images/iconbot.png" alt="bot" />
						<Parser response={message.answer} />
					</div>
				{/if}
			{/each}
		</div>
	{/if}
</div>

<style lang="sass">

.lightmode
	.agentanswer
		background: #fafafa

.userquery, .agentanswer
	img
		object-fit: contain
		width: 20px
		height: 20px

.lightmode
	.userquery
		border-top: 1px solid #e1e1e1
		border-bottom: 1px solid #e1e1e1

.levelzero, .levelone, .leveltwo
	.userquery
		padding-top: 48px
		padding-bottom: 48px
		padding-right: 24px
		padding-left: 24px
	.agentanswer
		padding-top: 64px
		padding-bottom: 64px
		padding-left: 24px
		padding-right: 24px



.userquery p
	font-family: 'Authentic Sans', sans-serif
	font-size: 16px
	line-height: 1.6
	
.userquery
	text-align: right
	justify-content: flex-end
	column-gap: 24px

#currentsession.levelzero
	width: 56.75vw


</style>
