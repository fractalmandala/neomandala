<script lang="ts">

	import { onMount } from 'svelte';
	import { browser } from '$app/environment';
	import AppShell from '$lib/design/AppShell.svelte';
	import { showModal, hideModal, showChip, hideChip, chipStore, showBots } from '$lib/stores/modalstores';
    import BotSelector from '$lib/agent/BotSelector.svelte'
	import { counterStore, increment } from '$lib/stores/counter';
	import ModalSub from '$lib/components/ModalSub.svelte';
	import { fly } from 'svelte/transition';
	import supabase from '$lib/utils/supabase';
	import ChatMessages from '$lib/agent/ChatMessages.svelte';
	import { storeChat, getChats } from '$lib/agent/dexie';
	import { promptStore, botsList, botStore } from '$lib/stores/gptprompt';
	import type { ChatCompletionRequestMessage } from 'openai';
	import { SSE } from 'sse.js';
	import { gptTitles, gptStream } from '$lib/utils/supabase';
	import { readingMode, chatMode, uuidStore } from '$lib/stores/globalstores';
	import { audioStore } from '$lib/stores/modalstores';
	import Refresh from '$lib/icons/Refresh.svelte';
	import Confirm from '$lib/icons/Confirm.svelte';
	import GPTParser from '$lib/agent/Parser.svelte';
	import { v4 as uuidv4 } from 'uuid';
	let pens: any;
	let thisChat: any;
	let audio: any;
	audioStore.subscribe((value) => (audio = value));
	let low = 0;
	let top = 14;
	let stream: any;
	let fake = false;
	let isGPT = false;
	let loading = false;
	let query: any;
	let tags = 'gpt';
	let submitQuery: any;
	let userprompt: any;
	let answer: any;
	let submitTitle: any;
	let submitAnswer: any;
	let submittance: any;
	let chatMessages: ChatCompletionRequestMessage[] = [];
	let chats: any = [];
	let userType = 'user';
	let asstType = 'assistant';

	function toggleChat() {
		if (browser) {
			chatMode.update((mode) => {
				const newMode = !mode;
				localStorage.setItem('chatMode', JSON.stringify(newMode));
				return newMode;
			});
		}
	}

	function generateUUID() {
		uuidStore.set(uuidv4());
		sendToSupatwo();
	}

	function fauxfake() {
		fake = !fake;
	}

	let currentPrompt: any;
	let currentBot: any;

	function updatePrompt() {
		promptStore.set(currentPrompt);
	}

	const handleSelectChange = (event: Event) => {
		const selectedBot = botsList.find(
			(bot) => bot.prompt === (event.target as HTMLSelectElement).value
		);
		if (selectedBot) {
			currentBot = selectedBot.name;
			botStore.set(currentBot);
		}
	};

	const handleSubmit = async () => {
		loading = true;
		counterStore.update((value) => value + 1);
		chatMessages = [...chatMessages, { role: 'user', content: query }];
		userprompt = query;
		submitQuery = query;
		submitTitle = submitQuery.slice(0, 20);
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
		const { error } = await supabase
			.from('amrit-notes')
			.insert({
				title: submitTitle,
				content: submittance,
				supaid: $counterStore,
				tags: tags,
				uuidtext: $uuidStore
			});
		if (error) {
			throw new Error(error.message);
		} else {
			showChip('sent');
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
		pens = await gptTitles();
		stream = await gptStream();
	});
</script>

 <BotSelector/>
<AppShell>
	<div slot="main">
		{#if !$chatMode}
			<div class="rta-grid grid3 colgap500 rowgap500" transition:fly>
				{#if pens && pens.length > 0}
					{#each pens as item}
						<a class="rta-column ybetween rowgap100" href="/bot/{item.indexing}">
							<div class="rta-column rowgap100 null onetwo-bord-bot">
								<h6 class="tt-c special">{item.indexing} - {item.title}</h6>
								<small class="grey">{item.theme}</small>
							</div>
						</a>
					{/each}
				{/if}
			</div>
		{/if}
		{#if $chatMode}
			<div class="rta-column ybetween pagepad" transition:fly>
				<div class="rta-column rowgap300 previouschats">
					<ChatMessages type="assistant" message="Namaste. How may I help you?" />
					{#each chats as chat}
						<div class="userchat ta-r rta-column null bord-top m-top-16 p-top-32">
							<small class="tt-u">user</small>
							<p class="grey">{chat.userMessage}</p>
						</div>
						<div class="gptchat rta-column null">
							<small class="tt-u">gptBoi</small>
							<GPTParser response={chat.assistantMessage} />
						</div>
					{/each}
					{#each chatMessages as message}
						<ChatMessages type={message.role} message={message.content} />
					{/each}
					{#if answer}
						<ChatMessages type="assistant" message={answer} />
					{/if}
					{#if loading}
						<ChatMessages type="assistant" message="Loading.." />
					{/if}
				</div>
				<div class="boxc ofform m-top-32">
					<form class="rta-row fullW between" on:submit|preventDefault>
						<textarea bind:value={query} on:keydown={fauxfake} />
						<div class="rta-row colgap100">
							<button
								class="mainbutton"
								type="submit"
								on:click={() => handleSubmit()}
								on:keydown={fauxfake}
							>
								Send
							</button>
							<button class="blank-button" on:click={() => loadStream()} on:keydown={fauxfake}>
								<Refresh />
							</button>
						</div>
					</form>
				</div>
			</div>
		{/if}
	</div>
	<div slot="side" class="rta-column xstretch fullW rowgap300 null">
        <div class="rta-column column-row rowgap200">
		    {#if !$chatMode}
		    	<img
		    		class="jello-vertical w32"
		    		src="/images/k-gpt.webp"
		    		alt="writing"
		    		on:mouseover={() => audio.play()}
		    		on:focus={fauxfake}
		    	/>
		    {/if}
            <div class="rta-column rowgap50 bord-bot p-bot-32 p-left-32 w64">
		        <h6 class="tt-u">
		    	{#if $chatMode}
		    		GPT
		    	{:else}
		    		bot
		    	{/if}
		        </h6>
		        <small class="grey">he thinks, therefore he is?</small>
            </div>
        </div>
        <div class="rta-column bord-bot p-bot-32 p-left-32">
		    {#if !$chatMode}
			    <button
				class="mainbutton"
				on:click={() =>
					showModal('Key Input', 'Please input validation key.', ModalSub, { content: 'Try' })}
				on:keydown={fauxfake}
			    >
				    Switch to GPT
			    </button>
		    {:else}
			    <button class="mainbutton" on:click={toggleChat} on:keydown={fauxfake}>
				    Back to Chats
			    </button>
		    {/if}
        </div>
            <div class="rta-column bord-bot p-bot-32 p-left-32">
		    		{#if stream && stream.length > 0}
		    			<div class="rta-column rowgap50">
		    				{#each stream as item}
		    					<p class="grey">
		    						<a class="hover" href="/bot/supa/{item.uuid}">
		    							{item.uuid.slice(0, 18)}
		    						</a>
		    					</p>
		    				{/each}
		    			</div>
		    		{/if}
            </div>
		{#if $chatMode}
			<div class="rta-column rowgap50 botselect bord-bot p-bot-32 p-left-32">
				<small class="grey"><b>Select Bot:</b></small>
				<form class="rta-row colgap100 ycenter" on:submit={() => updatePrompt()}>
					<select bind:value={currentPrompt} on:change={handleSelectChange}>
						{#each botsList as bot}
							<option value={bot.prompt}>{bot.name}</option>
						{/each}
					</select>
					<button class="blank-button" style="margin-top: 4px" type="submit"><Confirm /></button>
				</form>
			</div>
			<div class="rta-column rowgap300 fullW p-top-16 bord-bot p-bot-32 p-left-32">
				<div class="rta-column rowgap50">
					<button class="outbutton" on:click={generateUUID}> Generate ID </button>
					<small class="grey">Current ID: {$uuidStore}</small>
                    <button on:click={() => showBots.set(true)}>Show</button>
				</div>
			</div>
		{/if}
	</div>
</AppShell>
