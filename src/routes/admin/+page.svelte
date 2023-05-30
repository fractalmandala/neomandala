<script lang="ts">
	import { onMount, afterUpdate } from 'svelte';
	import type { PageData } from './$types';
	import { gptBots, selectBot, deselectBot } from '$lib/gpt/gptdb';
	import { breakOne, breakZero, breakTwo, themeMode } from '$lib/stores/globalstores';
	import type { ChatCompletionRequestMessage } from 'openai';
	import { SSE } from 'sse.js';
	import ChatBox from '$lib/gpt/ChatBox.svelte';
	import Conversations from '$lib/gpt/Conversations.svelte';
	import Parser from '$lib/agent/Parser.svelte';
	import {
		chatSessions,
		getSessionById,
		deleteBool,
		deleteChatSession,
		updateSessionId,
		concatenateQueriesFromSession
	} from '$lib/gpt/chatstore';
	import * as timeago from 'timeago.js';
	import Time from '$lib/icons/Time.svelte';
	import Edit from '$lib/icons/Edit.svelte';
	import Add from '$lib/icons/Add.svelte';
	import Delete from '$lib/icons/Delete.svelte';
	import Message from '$lib/icons/Message.svelte';
	export let data: PageData;

	let bots: any;
	let allBots = Array(6).fill(null);
	allBots[0] = true;
	let manageSession: any;
	let sessionDetails: any;
	let titleEdit = false;
	let newTitle: string;
	let concatenatedQueries = '';
	let chatMessages: ChatCompletionRequestMessage[] = [];
	let answerConcat: string;

	function toggleTitleEdit() {
		titleEdit = !titleEdit;
	}

	function handleButtonClick(concatID: string) {
		const sessionId = concatID;
		concatenatedQueries = concatenateQueriesFromSession(sessionId);
		chatMessages = [...chatMessages, { role: 'user', content: concatenatedQueries }];
		const eventSource = new SSE('/api/title', {
			headers: {
				'Content-Type': 'application/json'
			},
			payload: JSON.stringify({ messages: chatMessages })
		});

		eventSource.addEventListener('error', handleError);

		eventSource.addEventListener('message', (e: { data: string }) => {
			try {
				if (e.data === '[DONE]') {
					chatMessages = [...chatMessages, { role: 'assistant', content: answerConcat }];
					console.log(answerConcat);
					return;
				}

				const completionResponse = JSON.parse(e.data);
				const [{ delta }] = completionResponse.choices;

				if (delta.content) {
					answerConcat = (answerConcat ?? '') + delta.content;
				}
			} catch (err) {
				handleError(err);
			}
		});
		eventSource.stream();
	}

	export function handleError<T>(err: T) {
		console.error(err);
	}

	let detArr = Array(50).fill(false);

	function toggleDetailsConfirmation(index: number) {
		detArr[index] = !detArr[index];
		for (let i = 0; i < detArr.length; i++) {
			if (i !== index && detArr[i] === true) {
				detArr[i] = false;
			}
		}
	}

	function newManage(newID: string) {
		manageSession = newID;
		console.log(manageSession);
	}

	$: if (manageSession) {
		sessionDetails = getSessionById(manageSession);
	}

	$: anyDetOpen = detArr.some((item) => item);

	$: if (anyDetOpen === true) {
		deleteBool.set(true);
	} else {
		deleteBool.set(false);
	}

	function formatTimeAgo(date: timeago.TDate) {
		const timeAgoString = timeago.format(date);
		if (timeAgoString.includes('seconds')) return 'just now';
		if (timeAgoString.includes('minute')) return timeAgoString.replace(' minutes ago', 'm');
		if (timeAgoString.includes('hour')) return timeAgoString.replace(' hours ago', 'h');
		if (timeAgoString.includes('day')) return timeAgoString.replace(' days ago', 'd');
		if (timeAgoString.includes('week')) return timeAgoString.replace(' weeks ago', 'w');
		if (timeAgoString.includes('month')) return timeAgoString.replace(' months ago', 'mo');
		if (timeAgoString.includes('year')) return timeAgoString.replace(' years ago', 'y');
		// Return the original string if it doesn't match any of the above conditions
		return timeAgoString;
	}

	onMount(async () => {
		bots = await gptBots();
		sessionDetails = getSessionById(manageSession);
	});

	afterUpdate(() => {
		sessionDetails = getSessionById(manageSession);
	});
</script>

<div
	class="gpt-box back"
	class:levelzero={$breakZero}
	class:levelone={$breakOne}
	class:leveltwo={$breakTwo}
	class:light={$themeMode}
	class:dark={!$themeMode}
	class:calib={$deleteBool}
>
	<div class="sidebar null">
		<div class="side-inside">
			<div class="rta-column rowgap300 convos">
				{#each $chatSessions.sort((a, b) => {
					if (!b.createdAt) return -1; // b is undefined, a comes first
					if (!a.createdAt) return 1; // a is undefined, b comes first
					return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(); // normal comparison
				}) as session, i}
					<div class="singlemessage rta-column rowgap100" class:selected={detArr[i]}>
						<button
							class="blank-button rta-row xleft"
							on:click={() => toggleDetailsConfirmation(i)}
							on:click={() => newManage(session.id)}
						>
							<small class="sidebartitle">{session.id}</small>
						</button>
						<div class="singlemessage-strip rta-row ycenter colgap200">
							<div class="rta-row ycenter null colgap50">
								<svg
									width="12"
									height="12"
									viewBox="0 0 24 24"
									fill="none"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										d="M20 4H4C2.89543 4 2 4.89543 2 6V18C2 19.1046 2.89543 20 4 20H20C21.1046 20 22 19.1046 22 18V6C22 4.89543 21.1046 4 20 4Z"
										stroke="#474747"
										stroke-width="2"
										stroke-linecap="round"
										stroke-linejoin="round"
									/>
									<path
										d="M22 7L13.03 12.7C12.7213 12.8934 12.3643 12.996 12 12.996C11.6357 12.996 11.2787 12.8934 10.97 12.7L2 7"
										stroke="#474747"
										stroke-width="2"
										stroke-linecap="round"
										stroke-linejoin="round"
									/>
								</svg>
								<small class="grey">{session.messages.length}</small>
							</div>
							<div class="rta-row ycenter null colgap50">
								<svg
									width="12"
									height="12"
									viewBox="0 0 24 24"
									fill="none"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
										stroke="#474747"
										stroke-width="2"
										stroke-linecap="round"
										stroke-linejoin="round"
									/>
									<path
										d="M12 6V12H7.5"
										stroke="#474747"
										stroke-width="2"
										stroke-linecap="round"
										stroke-linejoin="round"
									/>
								</svg>
								{#if session.createdAt && session.createdAt.length > 0}
									<small class="grey">{formatTimeAgo(session.createdAt)}</small>
								{:else}
									<small class="grey">{timeago.format('2021-05-29T06:03:01.979Z')}</small>
								{/if}
							</div>
							<cite>{session.sessionbot}</cite>
						</div>
					</div>
				{/each}
			</div>
		</div>
	</div>
	<div class="rightbar null">
		<div class="rta-column null contents" data-lenis-prevent>
			{#if sessionDetails}
				<div class="rta-row titlerow colgap200 ycenter null">
					<label class="switch">
						<input type="checkbox" on:click={toggleTitleEdit} />
						<span class="slider" />
					</label>
					{#if titleEdit}
						<form class="rta-row">
							<input type="text" bind:value={newTitle} />
							<button
								class="blank-button"
								type="submit"
								on:click={() => updateSessionId(sessionDetails.id, newTitle)}
								on:click={toggleTitleEdit}
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="24"
									height="24"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									stroke-width="2"
									stroke-linecap="round"
									stroke-linejoin="round"
									class="lucide lucide-calendar-check-2"
									><path d="M21 14V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h8" /><line
										x1="16"
										x2="16"
										y1="2"
										y2="6"
									/><line x1="8" x2="8" y1="2" y2="6" /><line x1="3" x2="21" y1="10" y2="10" /><path
										d="m16 20 2 2 4-4"
									/></svg
								>
							</button>
						</form>
					{:else}
						<h6 class="thin">{sessionDetails.id}</h6>
					{/if}
				</div>
				<div class="rta-row between ycenter detailsstrip m-top-16">
					<div class="rta-row colgap200">
						<button
							class="blank-button rta-row colgap50 ycenter xcenter"
							on:click={() => handleButtonClick(sessionDetails.id)}
						>
							<Edit dimension={16} color={'var(--themerp'} />
						</button>
						<button class="blank-button rta-row colgap50 ycenter xcenter">
							<Add dimension={16} color={'var(--themerp'} />
						</button>
						<button
							class="blank-button rta-row colgap50 ycenter"
							on:click={() => deleteChatSession(sessionDetails.id)}
						>
							<Delete dimension={16} color={'var(--themerp'} />
						</button>
					</div>
					<div class="rta-row ycenter colgap200 smalls">
						<button class="blank-button rta-row colgap50 ycenter xcenter">
							<Message dimension={16} color={'var(--themerp'} />
							{sessionDetails.messages.length}</button
						>
						<button class="blank-button rta-row colgap50 ycenter xcenter">
							<Time dimension={16} color={'var(--themerp'} />
							{formatTimeAgo(sessionDetails.createdAt)}</button
						>
					</div>
				</div>
				{#if answerConcat}
					<div class="rta-column concater">
						<cite>{answerConcat}</cite>
					</div>
				{/if}
				{#each sessionDetails.messages as message (message.timestamp)}
					{#if message.query === 'init'}
						<div class="spacer" />
					{:else}
						<div class="rta-column rowgap300">
							<div class="rta-row xend colgap300 userquery">
								<p>{message.query}</p>
								<img src="/images/hacker.png" alt="useravatar" />
							</div>
							<div class="rta-row xleft colgap300 agentanswer">
								<img src="/images/chatbot.png" alt="botavatar" />
								<pre>{message.answer}</pre>
							</div>
						</div>
					{/if}
				{/each}
			{/if}
		</div>
	</div>
	<div class="mainbar rta-column">
		<ChatBox />
	</div>
</div>

<style lang="sass">


.singlemessage
	.sidebartitle
		color: var(--onlyblack)
		&:hover
			color: var(--green)

.singlemessage.selected
	.sidebartitle
		color: var(--opposite)
		&:hover
			color: var(--background)
	.singlemessage-strip
		opacity: 0

.convos
	overflow-y: scroll

.gpt-box
	display: flex

.side-inside
	background: rgba(255, 255, 255, 0.005)
	height: 100%
	border: 1px solid rgba(255, 255, 255, 0.09)
	border-radius: 5px

//.gpt-box.dark
//	background-image: url('/images/gptdark.png')

//.gpt-box.light
//	background-image: url('/images/gptlight.png')

.levelzero.gpt-box
	flex-direction: row
	padding-left: 32px
	.sidebar
		width: 328px
		padding-top: 32px
		height: 100vh
		margin-top: 56px
		position: sticky
		top: 0
		.side-inside
			padding-left: 20px
			padding-top: 20px
			padding-right: 20px
			height: 84vh
			position: sticky
			top: 88px
			display: flex
			flex-direction: column
	.mainbar
		width: calc(100vw - 440px)
		padding-top: 32px
		height: calc(100% - 32px)
		margin-top: 88px
		margin-left: 32px
		border-radius: 5px
		backdrop-filter: blur(4px)
		transition: width 0.7s ease
	.rightbar
		width: 8px
		margin-left: 0px
		padding-top: 32px
		padding-left: 0px
		border-radius: 5px
		border: 1px solid rgba(255, 255, 255, 0)
		background: rgba(255, 255, 255, 0)
		backdrop-filter: blur(5px)
		margin-top: 88px
		height: calc(100% - 32px)
		transition: width 0.7s ease
		.contents
			display: none

.userquery
	border-top: 1px solid var(--greyish)
	padding-top: 24px
	text-align: right
	p
		font-size: 14px
		color: var(--textone)

.agentanswer
	padding-bottom: 24px
	pre
		font-family: 'Nohemi', sans-serif
		font-size: 14px
		letter-spacing: 0.5px
		line-height: 1.25

.levelzero.gpt-box.calib
	.rightbar
		width: 600px
		background: rgba(255, 255, 255, 0.01)
		border: 1px solid rgba(255, 255, 255, 0.2)
		margin-left: 32px
		padding-left: 24px
		padding-right: 24px
		.detailsstrip
			background: var(--background)
			border-radius: 6px
			padding-left: 32px
			padding-right: 32px
			padding-top: 4px
			padding-bottom: 4px
			.blank-button
				width: 20px
				height: 20px
				svg
					object-fit: contain
					height: 20px
		.contents
			display: flex
			height: 74vh
			overflow-y: scroll
			.titlerow
				form
					width: calc(100% - 80px)
					border-radius: 12px
					font-family: 'Nohemi', sans-serif
					font-size: 16px
					color: #878787
					padding: 4px 12px
					background: white
					input
						width: calc(100% - 32px)
						border: none
						outline: none
						color: #878787
			img
				object-fit: contain
				width: 24px
				height: 24px
	.mainbar
		width: calc(100vw - 1164px)
		opacity: 0

.leveltwo.gpt-box, .levelone.gpt-box
	flex-direction: column
	height: 100%
	padding-left: 24px
	padding-right: 24px
	row-gap: 24px
	.sidebar
		width: 100%
		padding-top: 32px
		height: 96px
		margin-top: 64px
		.side-inside
			padding: 8px
	.mainbar
		width: 100%
		padding: 16px 0
		height: 100%
		margin-top: 0
		margin-left: 0
		border: 1px solid rgba(255, 255, 255, 0.08)
		backdrop-filter: blur(4px)
		border-radius: 4px
	.rightbar
		display: none

.leveltwo.gpt-box.calib, .levelone.gpt-box.calib
	.rightbar
		display: flex
		flex-direction: column
		width: 100%
		margin-left: 0
		border-radius: 4px
		border: 1px solid rgba(255, 255, 255, 0.08)
		background: rgba(255, 255, 255, 0.01)
		margin-top: 0
		height: 100%
		padding-left: 24px
		padding-right: 24px
		padding-top: 24px
		.contents
			img
				object-fit: contain
				width: 24px
				height: 24px

.back
	padding-bottom: 88px 

</style>
