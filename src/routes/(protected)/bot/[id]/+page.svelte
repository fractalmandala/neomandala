<script lang="ts">
	import { onMount } from 'svelte';
	import { getSessionById } from '$lib/gpt/chatstore';
	import Gridder from '$lib/components/Gridder.svelte';
	import Prism from 'prismjs';
	import '$lib/styles/prism.css';
	import { get } from 'svelte/store';
	import { chatSessions } from '$lib/gpt/chatstore';
	import type { ChatSession } from '$lib/gpt/chatstore';
	import type { Message } from '$lib/gpt/chatstore';
	import { formatTimeAgo } from '$lib/agent/generalutils';
	import { marked } from 'marked';
	import Clock from '$lib/design/iconset/clock.svelte';

	export let data: ChatSession = {
		id: '',
		sessionprompt: '',
		messages: [],
		createdAt: '',
		sessionbot: ''
	};

	let time: string;
	//@ts-ignore
	time = formatTimeAgo(data.createdAt);

	onMount(() => {
		Prism.highlightAll();
	});
</script>

<div class="rta-column grot intern">
	<h5>{data.id}</h5>
	<div class="rta-row colgap400 p-bot-32">
		<div class="rta-row colgap100">
			<Clock />
			<div class="lab2">{time}</div>
		</div>
		<div class="lab1">{data.sessionbot}</div>
	</div>
	<div class="rta-column grot chatcont">
		{#each data?.messages as item (item.timestamp)}
			{#if item.query !== 'init'}
				<div class="userquery rta-row null">
					<p>{item.query}</p>
					<img src="/images/av-user.png" alt="user" />
				</div>
				<div class="agentanswer rta-row null">
					<img src="/images/av-bot.png" alt="bot" />
					<pre>{@html marked.parse(item.answer)}</pre>
				</div>
			{/if}
		{/each}
	</div>
</div>

<style lang="sass">

.chatcont
	@media screen and (min-width: 769px)
		height: 64vh
		overflow-y: scroll

.userquery, .agentanswer
	img
		object-fit: contain
		width: 16px
		height: 16px
	padding-top: 16px
	padding-bottom: 16px

.userquery
	width: 100%
	column-gap: 16px
	padding-top: 24px
	padding-bottom: 24px
	align-items: flex-start
	p
		width: calc(100% - 36px)
		text-align: right

.agentanswer
	width: 100%
	column-gap: 16px
	align-items: flex-start
	pre
		text-align: left
		overflow-x: scroll
		background: #171717
		padding: 16px
		color: white
		border-radius: 5px
		width: 100%

pre
	box-sizing: border-box
	white-space: pre-line
	white-space: -moz-pre-line
	white-space: -pre-line
	white-space: -o-pre-line
	word-wrap: break-word
	word-break: break-word

.lab1, .lab2
	font-size: 10px
	font-weight: bold
	text-transform: uppercase
	color: var(--greyish)

.userquery, .agentanswer
	padding-top: 16px
	padding-bottom: 16px

</style>
