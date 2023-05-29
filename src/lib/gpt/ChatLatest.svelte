<script lang="ts">
	import { chatSessions, deleteChatSession, showDelete } from '$lib/gpt/chatstore';
	import type { ChatSession } from '$lib/gpt/chatstore';

	let session: ChatSession | undefined;
	$: if ($chatSessions.length > 0) {
		session = $chatSessions.sort((a, b) => {
			if (!b.createdAt) return -1; // b is undefined, a comes first
			if (!a.createdAt) return 1; // a is undefined, b comes first
			return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(); // normal comparison
		})[0];
	}
</script>

<div id="chat-sessions">
	{#if session}
		<div class="messages rta-column rowgap400">
			{#each session.messages as message (message.timestamp)}
				{#if message.query === 'init'}
					<div class="blanker" />
				{:else}
					<div class="rta-row userquery">
						<p>{message.query}</p>
						<img src="/images/hacker.png" alt="useravatar" />
					</div>
					<div class="rta-row agentanswer">
						<img src="/images/chatbot.png" alt="botavatar" />
						<pre>{message.answer}</pre>
					</div>
					<cite>Sent at {message.timestamp}</cite>
				{/if}
			{/each}
		</div>
	{/if}
</div>

<style lang="sass">

#chat-sessions
	padding: 0 4vw
	cite
		margin-left: 56px
		margin-top: 0
		margin-bottom: 0
		color: var(--onlyblack)
	
.userquery
	text-align: right
	justify-content: flex-end
	column-gap: 24px
	img
		object-fit: contain
		height: 32px
		width: 32px
	p
		width: calc(100% - 56px)
		color: var(--greyish)
		font-family: 'NohemiMed', sans-serif
		letter-spacing: 0.5px
		border-top: 1px solid var(--themerp)
		padding-top: 16px
		font-size: 18px

.agentanswer
	justify-content: flex-start
	column-gap: 24px
	img
		object-fit: contain
		width: 32px
		height: 32px
	pre
		width: calc(100% - 56px)
		font-family: 'Nohemi', sans-serif
		letter-spacing: 0.8px
		line-height: 1.4
		font-size: 16px

</style>
