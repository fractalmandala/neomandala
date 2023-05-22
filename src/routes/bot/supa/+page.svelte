<script lang="ts">
	import { onMount, beforeUpdate, afterUpdate } from 'svelte';
	import { themeMode, readingMode } from '$lib/stores/globalstores';
	import { afterNavigate } from '$app/navigation';
	import { showChip, showBots, audioStore } from '$lib/stores/modalstores';
	import BotSelector from '$lib/agent/BotSelector.svelte';
	import { counterStore } from '$lib/stores/counter';
	import { fly } from 'svelte/transition';
	import supabase from '$lib/utils/supabase';
	import * as timeago from 'timeago.js';
	import ChatMessages from '$lib/agent/ChatMessages.svelte';
	import Chat from '$lib/icons/Chat.svelte';
	import Search from '$lib/icons/Search.svelte';
	import { storeChat, getChats } from '$lib/agent/dexie';
	import {
		promptStore,
		nameStore,
		aboutStore,
		imageStore,
		botsList,
		greetStore,
		setGPTBoi
	} from '$lib/stores/gptprompt';
	import type { ChatCompletionRequestMessage } from 'openai';
	import { SSE } from 'sse.js';
	import { gptTitles, gptStream, latestSession, chatsCount, gptTwenty } from '$lib/utils/supabase';
	import { chatMode, uuidStore, breakZero, breakOne, breakTwo } from '$lib/stores/globalstores';
	import Refresh from '$lib/icons/Refresh.svelte';
	import Time from '$lib/icons/Time.svelte';
	import GPTParser from '$lib/agent/Parser.svelte';
	import GPTParser1 from '$lib/agent/Parser.svelte';
	import Send from '$lib/icons/Send.svelte';
	import { v4 as uuidv4 } from 'uuid';
	let pens: any;
	let audio: any;
	audioStore.subscribe((value) => (audio = value));
	let stream: any;
	let fake = false;
	let loading = false;
	let query: any;
	let tags = 'gpt';
	let searchColor = '#057402';
	let submitQuery: any;
	let userprompt: any;
	let answer: any;
	let submitTitle: any;
	let submitAnswer: any;
	let submittance: any;
	let chatMessages: ChatCompletionRequestMessage[] = [];
	let chats: any = [];
	let currentBot: any;
	let latestuuid: any;
	let div: HTMLElement | null | undefined;
	let autoscroll: boolean | null | undefined;
	let isHistory = false;
	let expandSize = 32;
	let chatCount: any;
	let searchInput: any;
	let searchload = false;
	let inputSearch: any;
	let twenties: any;

	export async function searchChats() {
		searchload = true;
		const { data, error } = await supabase
			.from('amrit-notes')
			.select()
			.eq('tags', 'gpt')
			.textSearch('content', inputSearch);
		if (error) throw new Error(error.message);
		return data;
	}

	function generateUUID() {
		uuidStore.set(uuidv4());
		sendToSupatwo();
	}

	function fauxfake() {
		fake = !fake;
	}

	async function loadLatestSession() {
		latestuuid = await latestSession();
	}

	async function loadChatsCount(uuidtext: any) {
		const data = await chatsCount(uuidtext);
		return data;
	}

	$: if (latestuuid && latestuuid.length > 0) {
		const thisone = latestuuid[0].uuid;
		loadChatsCount(thisone);
	}

	loadLatestSession();

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

	$: if ($promptStore) {
		currentBot = botsList.find((bot) => bot.prompt === $promptStore);
		let currentName = currentBot ? currentBot.name : undefined;
		nameStore.set(currentName);
		let currentImage = currentBot ? currentBot.image : undefined;
		imageStore.set(currentImage);
		let currentAbout = currentBot ? currentBot.about : undefined;
		aboutStore.set(currentAbout);
		let currentGreet = currentBot ? currentBot.greeting : undefined;
		greetStore.set(currentGreet);
		generateUUID();
	}

	const handleSubmit = async () => {
		loading = true;
		counterStore.update((value) => value + 1);
		chatMessages = [...chatMessages, { role: 'user', content: query }];
		userprompt = query;
		submitQuery = query;
		submitTitle = submitQuery.slice(0, 60);
		const eventSource = new SSE('/api/chat', {
			headers: {
				'Content-Type': 'application/json'
			},
			payload: JSON.stringify({ messages: chatMessages, prompt: $promptStore })
		});

		query = '';

		eventSource.addEventListener('error', handleError);

		eventSource.addEventListener('message', (e: { data: string }) => {
			try {
				loading = false;
				if (e.data === '[DONE]') {
					chatMessages = [...chatMessages, { role: 'assistant', content: answer }];
					submitAnswer = answer;
					submittance = `
                    user:

                    ${submitQuery}

                    gpt:

                    ${submitAnswer}
                    `;
					sendToSupabase();
					storeChat(userprompt, answer);
					answer = '';
					return;
				}

				const completionResponse = JSON.parse(e.data);
				const [{ delta }] = completionResponse.choices;

				if (delta.content) {
					answer = (answer ?? '') + delta.content;
				}
			} catch (err) {
				handleError(err);
			}
		});
		eventSource.stream();
	};

	function handleError<T>(err: T) {
		loading = false;
		query = '';
		answer = '';
		console.error(err);
	}

	async function loadChats() {
		chats = await getChats();
	}

	async function loadStream() {
		stream = await gptStream();
	}

	$: if ($chatMode === true) {
		loadChats();
	}

	async function sendToSupabase() {
		if ($uuidStore === '') {
			generateUUID();
		} else {
			const { error } = await supabase.from('amrit-notes').insert({
				title: submitTitle,
				content: submittance,
				supaid: $counterStore,
				tags: tags,
				uuidtext: $uuidStore,
				language: $nameStore
			});
			if (error) {
				throw new Error(error.message);
			} else {
				showChip('sent');
			}
		}
	}

	async function sendToSupatwo() {
		const { error } = await supabase.from('amrit-uuids').insert({ uuid: $uuidStore });
		if (error) {
			throw new Error(error.message);
		} else {
			showChip('sent');
		}
	}

	onMount(async () => {
		setGPTBoi();
		pens = await gptTitles();
		stream = await gptStream();
		latestuuid = await latestSession();
		twenties = await gptTwenty();
		div = document.getElementById('page');
	});

	beforeUpdate(() => {
		autoscroll = div && div.offsetHeight + div.scrollTop > div.scrollHeight - 20;
	});

	afterUpdate(() => {
		if (autoscroll) div?.scrollTo({ top: div.scrollHeight, behavior: 'smooth' });
	});

	// autoscroll to bottom after navigation
	afterNavigate(() => {
		div?.scrollTo({ top: div.scrollHeight, behavior: 'smooth' });
	});
</script>

<BotSelector />
<div
	class="rta-grid grid2"
	class:levelzero={$breakZero}
	class:levelone={$breakOne}
	class:leveltwo={$breakTwo}
	class:light={$themeMode}
	class:dark={!$themeMode}
>
	<div class="rta-column rowgap300 null panel-left">
		<div class="rta-row colgap200">
			<div class="rta-image">
				<img src={$imageStore} alt={$nameStore} />
			</div>
			<div class="rta-column rowgap100 w64">
				<div class="rta-column">
					<p><strong>{$nameStore}</strong></p>
					<small class="grey">{$aboutStore}</small>
				</div>
				<button
					class="blank-button ta-l tt-u green"
					style="font-weight: 600; cursor: pointer"
					on:click={() => showBots.set(true)}
				>
					Change Bot
				</button>
			</div>
		</div>
		<form class="classic-input rta-row" on:submit|preventDefault={() => searchChats()}>
			<input type="text" bind:value={inputSearch} />
			<button type="submit" class="blank-button">
				<Search color={searchColor} />
			</button>
		</form>
		<div class="rta-column rowgap50">
			<p class="p-bot-8"><b>Current Session:</b></p>
			{#if latestuuid && latestuuid.length > 0}
				{#each latestuuid as item}
					<div class="rta-column between null ycenter">
						<small class="green">{item.uuid}</small>
						<div class="rta-row null ycenter colgap50">
							<cite class="grey">{formatTimeAgo(item.created_at)}</cite>
							<Time />
						</div>
					</div>
				{/each}
			{/if}
		</div>
		<div class="rta-column bord-top rowgap50 p-top-32">
			<h6 class="p-bot-8">Latest Untitled:</h6>
			{#if stream && stream.length > 0}
				{#each stream as item}
					<small class="grey">
						<a class="hover" href="/bot/supa/{item.uuid}">
							{item.uuid}
						</a>
					</small>
				{/each}
			{/if}
		</div>
		<!--
		<div class="rta-column rowgap300 fullW p-top-16 bord-bot p-bot-32">
			<div class="rta-column rowgap50">
				<button class="outbutton" on:click={generateUUID}> Generate ID </button>
				<small class="grey">Current ID: {$uuidStore}</small>
			</div>
		</div>
        -->
	</div>
	<div class="rta-column panel-chat">
		<div class="rta-column ybetween pagepad" transition:fly>
			<div class="rta-column rowgap300 previouschats" data-lenis-prevent>
				<div class="rta-row colgap200 null ycenter">
					<img class="avatar" src="/images/chatbot.png" alt="chatbot" />
					<h5>{$greetStore}</h5>
				</div>
				{#each chatMessages as message}
					<ChatMessages type={message.role} message={message.content} />
				{/each}
				{#if answer}
					<ChatMessages type="assistant" message={answer} />
				{/if}
				{#if loading}
					<ChatMessages type="assistant" message="Loading.." />
				{/if}
				{#if twenties && twenties.length > 0}
					{#each twenties as item}
						<GPTParser1 response={item.content} />
					{/each}
				{/if}
			</div>
			<div class="boxc ofform m-top-16">
				<form class="rta-row fullW between" on:submit|preventDefault>
					<textarea bind:value={query} on:keydown={fauxfake} />
					<div class="rta-row colgap100">
						<button
							class="blank-button"
							type="submit"
							on:click={() => handleSubmit()}
							on:keydown={fauxfake}
						>
							<Send />
						</button>
						<button class="blank-button" on:click={() => loadStream()} on:keydown={fauxfake}>
							<Refresh />
						</button>
					</div>
				</form>
			</div>
		</div>
	</div>
</div>

<style lang="sass">

.levelzero.grid2
    grid-template-columns: 30% 1fr
    grid-template-areas: "panel-left panel-chat"
    .panel-left
        grid-area: panel-left
        padding: 32px
        overflow-y: scroll
        height: calc(100vh - 64px)
        position: sticky
        background: rgba(255,255,255,0.1)
        border: 1px solid rgba(255,255,255,0.41)
        border-radius: 8px
        top: 32px
        .rta-image
            width: 88px
            height: 88px
            border-radius: 5px
    .panel-chat
        grid-area: panel-chat
        height: calc(100vh - 64px)
        border-radius: 8px
        .avatar
            width: 64px
            height: 64px
        .previouschats
            border-radius: 8px
            height: 76vh
            overflow-y: scroll
            padding: 48px
        .ofform
            border-radius: 8px
            padding: 16px
            textarea
                width: calc(100% - 80px)
                border-radius: 4px
                border: 1px solid var(--greyish)

.rta-image
    img
        object-fit: cover
        width: 100%
        height: 100%
        border-radius: 5px

.previouschats::-webkit-scrollbar
    width: 4px

.previouschats::-webkit-scrollbar-thumb
    background: var(--green)


</style>
