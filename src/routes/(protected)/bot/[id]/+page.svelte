<script lang="ts">
	import { onMount } from 'svelte';
	import { getSessionById } from '$lib/gpt/chatstore';
	import Gridder from '$lib/components/Gridder.svelte';
	import { get } from 'svelte/store';
	import { chatSessions } from '$lib/gpt/chatstore';
	import type { ChatSession } from '$lib/gpt/chatstore';
	import type { Message } from '$lib/gpt/chatstore';
	import { formatTimeAgo } from '$lib/agent/generalutils';
	import { marked } from 'marked';
	import Clock from '$lib/design/iconset/clock.svelte';

	let init = false;

	function toggleInit() {
		init = !init;
	}

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
</script>

<div class="rta-column grot p-top-64 intern">
	<div class="grot null">
		<h4>{data.id}</h4>
	</div>
	<div class="rta-row colgap400 p-bot-32">
		<div class="rta-row colgap100">
			<Clock />
			<div class="lab2">{time}</div>
		</div>
		<div class="lab1">{data.sessionbot}</div>
	</div>
	<div class="rta-column grot chatcont">
		{#each data?.messages as item (item.timestamp)}
			{#if item.query === 'init'}
				<button class="genbutton m-bot-16" on:click={toggleInit}> Prompt </button>
				{#if init}
					<small>{item.answer}</small>
				{/if}
			{/if}
			{#if item.query !== 'init'}
				<div class="userquery rta-column null">
					<p>{item.query}</p>
				</div>
				<div class="agentanswer rta-column null">
					<pre>{item.answer}</pre>
				</div>
			{/if}
		{/each}
	</div>
</div>

<style lang="sass">

.grot.intern
	@media screen and (min-width: 769px)
		width: 86%

.chatcont
	@media screen and (min-width: 769px)
		height: 64vh
		overflow-y: scroll

.userquery, .agentanswer
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
		padding: 16px
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
