<script lang="ts">
	import { onMount } from 'svelte';
	import type { ChatSession } from '$lib/gpt/chatstore';
	import Prism from 'prismjs';
	import '$lib/styles/prism.css';
	import { slide } from 'svelte/transition';
	import { formatTimeAgo } from '$lib/agent/generalutils';
	import { marked } from 'marked';
	import Clock from '$lib/design/iconset/clock.svelte';
	import { showModal } from '$lib/stores/modalstores';
	import Parser from '$lib/agent/Parser.svelte';

	let init = false;

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

	function toggleInit() {
		init = !init;
	}

	async function deleteItem() {
		showModal('snip', data.id, 1);
	}

	onMount(() => {
		Prism.highlightAll();
	});
</script>

<div class="rta-column grot intern">
	<div class="sticksarea">
		<div class="grot null p-bot-8">
			<h5 style="margin: 0">{data.id}</h5>
		</div>
		<div class="rta-row colgap400 p-bot-16">
			<div class="rta-row colgap100">
				<Clock />
				<div class="lab2">{time}</div>
			</div>
			<button class="lab1" on:click={toggleInit}>{data.sessionbot}</button>
			<button class="blank-button labeller lab4" on:click={deleteItem}>DELETE</button>
		</div>
		{#if init}
			<div transition:slide>
				{#each data?.messages as item (item.timestamp)}
					{#if item.query === 'init'}
						<small>{item.answer}</small>
					{/if}
				{/each}
			</div>
		{/if}
	</div>
	<div class="rta-column grot p-top-8">
		{#each data?.messages as item (item.timestamp)}
			{#if item.query !== 'init'}
				<div class="userquery rta-column null p-bot-16 p-top-16">
					<b style="color: var(--texttwo)">User:</b>
					{@html marked(item.query)}
				</div>
				<div class="agentanswer rta-column null glass-top p-top-16">
					<b style="color: var(--texttwo)">Bot:</b>
					<Parser response={item.answer} />
				</div>
			{/if}
		{/each}
	</div>
</div>

<style lang="sass">

.sticksarea
	position: sticky
	z-index: 500
	@media screen and (min-width: 1024px)
		top: 56px
		background: var(--this)
		padding-top: 8px
	@media screen and (max-width: 1023px)
		top: 104px
		background: var(--this)
		padding-top: 8px

.userquery
	width: 100%
	align-items: flex-start
	row-gap: 4px
	font-size: 14px
	color: var(--greyish)

.agentanswer
	width: 100%
	align-items: flex-start
	row-gap: 4px

.lab1, .lab2
	font-size: 10px
	font-weight: bold
	text-transform: uppercase
	color: var(--greyish)

.labeller
	text-transform: uppercase
	font-size: 10px
	padding: 1px 4px

.lab4
	color: var(--greyish)
	border: 1px solid var(--greyish)
	&:hover
		background: #fe4a49
		color: white

</style>
