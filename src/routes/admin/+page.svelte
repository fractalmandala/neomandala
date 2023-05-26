<script lang="ts">
	//@ts-nocheck
	import type { PageData } from './$types';
	import { onMount } from 'svelte';
	import { breakOne, uuidStore, breakZero, breakTwo, themeMode } from '$lib/stores/globalstores';
	import { applyAction, enhance, type SubmitFunction } from '$app/forms';
	import type { ActionData } from './$types';
	import { showChip, showBots} from '$lib/stores/modalstores';
	import CondenseChat from '$lib/agent/CondenseChat.svelte';
	import {
		promptStore,
		nameStore,
		aboutStore,
		imageStore,
		greetStore,
		botsList,
		setGPTBoi
	} from '$lib/stores/gptprompt';
	import BotSelector from '$lib/agent/BotSelector.svelte';
	import { openSession, currentSession, latestSession, gptTwenty, botInPlay } from '$lib/utils/supabase';
	import supabase from '$lib/utils/supabase';
	import { generateUUID } from '$lib/agent/generalutils';
	import Parser from '$lib/agent/Parser.svelte';
	import Parser2 from '$lib/agent/Parser.svelte';
	import ChatMessages from '$lib/agent/ChatMessages.svelte';
	import { storeChat, getChats } from '$lib/agent/dexie';
	import { SSE } from 'sse.js';
	import type { ChatCompletionRequestMessage } from 'openai';
	import Add from '$lib/icons/Add.svelte';
	import Send from '$lib/icons/Send.svelte';
	import Delete from '$lib/icons/Delete.svelte';

	let chatMessages: ChatCompletionRequestMessage[] = [];
	let sessID:any;
	let emID:any;
	let chatStream: any;
	let coGreen = '#0BC160';
	let coRed = '#fe4a49';
	let supaStream: any;
	let sessionStream: any;
	let lastUUID: any;
	let query = '';
	let answer: any;
	let loading = false;
	let submitTitle: string;
	let recIs = Array(6).fill(false)
	let oldStream:any
	let inPlay:any
	let openCheck:any
	let currentBot:any

	function toggleRec(index:number) {
		recIs[index] = !recIs[index] 
		for ( let i = 0; i < recIs.length; i ++ ) {
			if ( i !== index && recIs[i] === true ) {
				recIs[i] = false
			}
		}
	}

	export let form: ActionData;
	export let data: PageData;

	export async function handleAdd() {
		generateUUID();
		sendToSupatwo();
		loadChats();
	}

	export async function handleDelete() {
		const { error } = await supabase
		.from('amrit-notes')
		.delete()
		.eq('title',$uuidStore)
		if ( error ) throw new Error(error.message)
		uuidStore.set('');
		loadNewSession();
	}

	export async function supabaseUser() {
		const { error } = await supabase
			.from('gpt-sessions')
			.insert({ sessionid: sessID, uuid: $uuidStore, type: 'chat', agent: false, content: query, bot: $nameStore, userstore: emID });
		if (error) {
			throw new Error(error.message);
		} else console.log('success');
	}

	export async function supabaseAgent() {
		const { error } = await supabase
			.from('gpt-sessions')
			.insert({ sessionid: sessID, uuid: $uuidStore, type: 'chat', agent: true, content: answer, bot: $nameStore, userstore: emID });
		if (error) {
			throw new Error(error.message);
		} else console.log('success');
	}

	export async function activeBot(){
		const { error } = await supabase
		.from('gpt-bots')
		.update({ bot: $nameStore, promptstore: $promptStore, aboutstore: $aboutStore, imagestore: $imageStore, greetstore: $greetStore})
		.eq('id', 1)
		if (error) {
			throw new Error(error.message);
		} else {
			showChip('changed','#10D56C');
		}
	}

	export async function sendToSupatwo() {
		if (sessID === null) {
			console.log(sessID)
		} else {
		const { error } = await supabase.from('gpt-sessions').insert({ sessionid: sessID, uuid: $uuidStore, type: 'init', bot: $nameStore, promptstore: $promptStore, aboutstore: $aboutStore, imagestore: $imageStore, greetstore: $greetStore, userstore: emID });
			if (error) {
			showChip(error,'#fe4a49')
			} else {
			showChip('new chat', '#10D56C');
		}
		}
	}

	const handleSubmit = async () => {
		loading = true;
		supabaseUser();
		chatMessages = [...chatMessages, { role: 'user', content: query }];
		const eventSource = new SSE('/api/chat', {
			headers: {
				'Content-Type': 'application/json'
			},
			payload: JSON.stringify({ messages: chatMessages, prompt: $promptStore })
		});
		eventSource.addEventListener('error', handleError);

		eventSource.addEventListener('message', (e: { data: string }) => {
			try {
				loading = false;
				if (e.data === '[DONE]') {
					chatMessages = [...chatMessages, { role: 'assistant', content: answer }];
					supabaseAgent();
					query = '';
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
		loadChats();
	};

	function handleError<T>(err: T) {
		loading = false;
		query = '';
		answer = '';
		console.error(err);
	}

	async function loadChats(){
		sessionStream = await currentSession($uuidStore)
	}

	async function updateBot(){
		inPlay = await botInPlay(sessID, emID);
	}

	onMount(async () => {
		if (!user.session_id){
			sessID = '',
			emID = ''
		} else {
			sessID = user.session_id,
			emID = user.email
		}
		setGPTBoi();
		openCheck = await openSession(sessID)
		chatStream = await latestSession();
		inPlay = await botInPlay(sessID, emID);
		sessionStream = await currentSession($uuidStore);
		oldStream = await currentSession(recNo);
		lastUUID = await gptTwenty();
	});

	$: ({ testTable, user } = data);

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
		loadChats();
		updateBot();
		if (data.in === true) {
			sendToSupatwo();
		}
	}



</script>

<BotSelector/>
<div
	class="appshell"
	class:levelzero={$breakZero}
	class:levelone={$breakOne}
	class:leveltwo={$breakTwo}
	class:light={$themeMode}
	class:dark={!$themeMode}
>
	<div class="shellmain rta-column ytop colgap300 rowgap200">
		<div class="rta-column rowgap300">
			<h5>Select Bot</h5>
			<div class="rta-grid grid6 colgap200">
				{#each botsList as bot, i}
					<div class="rta-column" on:mouseenter={() => toggleRec(i)} on:mouseleave={() => toggleRec(i)}>
						{#if recIs[i]}
						<div class="rta-image">
							<img src={bot.image} alt={bot.id}/>
						</div>
						<div class="rta-column">
							<h5>{bot.name}</h5>
						</div>
						{/if}	
				
						<div class="rta-image">
							<img src={bot.image} alt={bot.id}/>
						</div>
					</div>
				{/each}
			</div>
		</div>
		{#if openCheck && openCheck.length > 0}
			{#each openCheck as item}
				{#if item.agent === null}
				<div class="boxc ofform glass-bottom m-top-16 m-bot-32">
					<form class="rta-row fullW between" on:submit|preventDefault>
						<textarea bind:value={query} />
						<div class="rta-row colgap100">
							<button class="blank-button" type="submit" on:click={() => handleSubmit()}>
								<Send />
							</button>
						</div>
					</form>
				</div>
				{:else}
				<div class="rta-row colgap100">
					<button class="blank-button" on:click={handleAdd}>
						<Add />
					</button>
					<p>New Chat</p>
				</div>
				{/if}
			{/each}
		{/if}
		<div class="currentstream rta-column bord-top p-top-16">
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
		{#if sessionStream && sessionStream.length > 0}
			<div class="supabasebox rta-column rowgap400">
				{#each sessionStream as item}
					{#if item.agent === false}
						<div class="rta-row ta-r xend colgap200">
							<Parser2 response={item.content} />
							<img class="avatar" src="/images/hacker.png" alt="user" />
						</div>
					{:else}
						<div class="rta-row colgap200">
							<img class="avatar" src="/images/chatbot.png" alt="bot" />
							<Parser2 response={item.content} />
						</div>
					{/if}
				{/each}
			</div>
		{/if}
	</div>
	<div class="shellside rta-column column-row fullW rowgap300 glass null">

		<!--add and delete buttons-->
		{#if data.in === true}
		<div class="rta-row stay ycenter colgap200 p-bot-32 glass-bottom">
			<button class="blank-button" on:click={handleAdd}>
				<Add />
			</button>
			<button class="blank-button" on:click={handleDelete}>
				<Delete />
			</button>
			<CondenseChat/>
		</div>
		{/if}
		<!----->

		<!--current bot-->
		{#if inPlay && inPlay.length > 0}
			{#each inPlay as item}
				<div class="rta-row null colgap200 glass-bottom p-bot-32">
					<div class="rta-image w32">
						<img src={item.imagestore} alt="bot" />
					</div>
					<div class="rta-column rowgap50 w64">
						<p class="white"><strong>{item.bot}</strong></p>
						<small>{item.aboutstore}</small>
						<button class="blank-button ta-l p-top-8" on:click={() => showBots.set(true)}> 
							<p class="gradienter" style="cursor: pointer; font-weight: bold">CHANGE BOT</p>
						</button>
					</div>
				</div>
			{/each}
		{/if}
		<!---->
	
		<!---login and signup-->
		{#if data.in === false}
			<div class="rta-column rowgap200 p-bot-32 w64">
			<form method="POST" action="/admin?/login" class="loginform">
				<div class="rta-row colgap100">
					<input name="email" type="email" placeholder="email"/>
					<input name="password" type="password" placeholder="password" />
				</div>
				<div class="rta-row colgap100">
					<button class="gradback">Log In</button>
					<!--
					<button class="glass">Sign Up</button>
					-->
				</div>
			</form>
			<!--
			<form method="POST" action="/admin?/signup">
				<div class="field">
					<label for="email" class="label">Email</label>
					<p class="control">
						<input
							id="email"
							name="email"
							value={form?.values?.email ?? ''}
							class="input"
							type="email"
							placeholder="Email"
							required
						/>
					</p>
				</div>
				<div class="field">
					<label for="password" class="label">Password</label>
					<p class="control">
						<input
							id="password"
							name="password"
							class="input"
							type="password"
							placeholder="Password"
							required
						/>
					</p>
				</div>
				<div class="field">
					<p class="control">
						<button class="button is-fullwidth is-link">Sign up</button>
					</p>
				</div>
			</form>
			-->
			</div>
		{/if}
		<!---->

		<!--recent chats-->
		<div class="rta-column null rowgap100">
			{#if chatStream && chatStream.length > 0}
				{#each chatStream as item, i}
					{#if item.uuid !== undefined}
						<button class="blank-button ta-l">
							<small>{item.uuid.slice(0,28)}</small>
						</button>
					{/if}
				{/each}
			{/if}
		</div>
		<!---->

	</div>
</div>

<style lang="sass">

.loginform
	display: flex
	flex-direction: column
	row-gap: 8px
	.rta-row
		input
			width: calc(50% - 12px)
			border-radius: 4px
			padding: 2px 6px
			border: 1px solid rgba(255,255,255,0.3)
			background: rgba(255,255,255,0.12)
			color: white
	button
		width: 80px
		border: 1px solid rgba(255,255,255,0.6)
		border-radius: 4px
		color: white
		padding: 2px


</style>