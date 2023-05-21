<script lang="ts">

    import { onMount } from 'svelte'
    import { browser } from '$app/environment'
	import { showModal, hideModal } from '$lib/stores/modalstores';
    import ModalSub from '$lib/components/ModalSub.svelte'
    import { fly } from 'svelte/transition'
    import ChatMessages from '$lib/agent/ChatMessages.svelte'
    import { storeChat, getChats } from '$lib/agent/dexie'
    import { promptStore, botsList, botStore } from '$lib/stores/gptprompt'
    import type { ChatCompletionRequestMessage } from 'openai'
    import { SSE } from 'sse.js'
    import { gptTitles } from '$lib/utils/supabase'
    import { readingMode, chatMode } from '$lib/stores/globalstores'
    import { audioStore } from '$lib/stores/modalstores'
    import Refresh from '$lib/icons/Refresh.svelte'
    import Confirm from '$lib/icons/Confirm.svelte'
    import GPTParser from '$lib/components/GPTParser.svelte'
    let pens:any
    let thisChat:any
    let audio:any
    audioStore.subscribe(value => audio = value)
    let low = 0
    let top = 14

    let fake = false
    let isGPT = false
    let loading = false
    let query:any
    let userprompt:any
    let answer:any
    let chatMessages: ChatCompletionRequestMessage[] = []
    let chats:any = [];
    let userType = 'user'
    let asstType = 'assistant'

	function toggleChat() {
		if (browser) {
			chatMode.update((mode) => {
				const newMode = !mode;
				localStorage.setItem('chatMode', JSON.stringify(newMode));
				return newMode;
			});
		}
	}

    function fauxfake(){
        fake = !fake
    }

    let currentPrompt:any
    let currentBot:any
    
    function updatePrompt(){
        promptStore.set(currentPrompt)
    }

    const handleSelectChange = (event: Event) => {
        const selectedBot = botsList.find(bot => bot.prompt === (event.target as HTMLSelectElement).value);
        if (selectedBot) {
            currentBot = selectedBot.name;
            botStore.set(currentBot)
        }
    };

	const handleSubmit = async () => {
		loading = true
		chatMessages = [...chatMessages, { role: 'user', content: query }]
		userprompt = query
		const eventSource = new SSE('/api/chat', {
			headers: {
				'Content-Type': 'application/json'
			},
			payload: JSON.stringify({ messages: chatMessages, prompt: $promptStore })
		})

		query = ''

		eventSource.addEventListener('error', handleError)

		eventSource.addEventListener('message', (e: {data: string;}) => {
			try {
				loading = false
				if (e.data === '[DONE]') {
					chatMessages = [...chatMessages, { role: 'assistant', content: answer }]
					console.log(answer)
                    storeChat(userprompt, answer)
					answer = ''
					return
				}

				const completionResponse = JSON.parse(e.data)
				const [{ delta }] = completionResponse.choices

				if (delta.content) {
					answer = (answer ?? '') + delta.content
				}
			} catch (err) {
				handleError(err)
			}
		})
		eventSource.stream()
	}

	function handleError<T>(err: T) {
		loading = false
		query = ''
		answer = ''
		console.error(err)
	}

    async function loadChats() {
        chats = await getChats();
    }
    
    $: if ($chatMode === true) {
        loadChats()
    }


    onMount(async() => {
        pens = await gptTitles();
    })

</script>


<div class="rta-grid grid2 right00 screen back">
    {#if !$chatMode}
    <div class="rta-grid grid3 colgap300 rowgap100 postgrid" transition:fly>
        {#if pens && pens.length > 0}
            {#each pens as item}
                <a class="rta-column ybetween rowgap100 ticket" href="/bot/{item.indexing}">
                    <div class="rta-column rowgap100 null">
                        <h5 class="tt-u">{item.indexing} - {item.title}</h5>
                        <small>{item.theme}</small>
                    </div>
                </a>
            {/each}
        {/if}
    </div>
    {/if}
    {#if $chatMode}
    <div class="rta-column ybetween minH postgrid" transition:fly>
        <div class="rta-column rowgap300 previouschats">
	        <ChatMessages type="assistant" message="Namaste. How may I help you?" />
            <p>{$promptStore}</p>
            {#each chats as chat}
                <div class="userchat ta-r rta-column null bord-top m-top-16 p-top-32">
                    <small class="tt-u">user</small>
                    <p>{chat.userMessage}</p>
                </div>
                <div class="gptchat rta-column null">
                    <small class="tt-u">gpt</small>
                    <GPTParser response={chat.assistantMessage}/>
                </div>
            {/each}
	        {#each chatMessages as message}
	        	<ChatMessages type={message.role} message={message.content} />
	        {/each}
	        {#if answer}
	        	<ChatMessages type="assistant" message={answer}/>
	        {/if}
	        {#if loading}
	        	<ChatMessages type="assistant" message="Loading.." />
	        {/if}
        </div>
	    <div class="boxc ofform p-bot-32 m-top-32">
	    	<form class="rta-row fullW between" on:submit|preventDefault>
	    		<textarea bind:value={query}
	    			on:keydown={fauxfake}
	    			/>
                <div class="rta-row colgap100">
	    		<button class="mainbutton" type="submit" on:click={() => handleSubmit()} on:keydown={fauxfake}> Send </button>
                <button class="blank-button" on:click={() => loadChats()} on:keydown={fauxfake}>
                    <Refresh/>
                </button>
	    	</form>
	    </div>
    </div>
    {/if}
    <div class="rta-column titlebox null" class:invisible={$readingMode}>
        {#if !$chatMode}
        <img class="jello-vertical" src="/images/k-gpt.webp" alt="writing" on:mouseover={() => audio.play()} on:focus={fauxfake}/>
        {/if}
        <h3 class="tt-u">
            {#if $chatMode}
                GPT
            {:else}
                bot
            {/if}
        </h3>
        {#if !$chatMode}
        <p class="grey">he thinks, therefore he is?</p>
        {/if}
        {#if !$chatMode}
        <button class="mainbutton" on:click={() => showModal('Key Input', 'Please input validation key.', ModalSub, {content: 'Try'})} on:keydown={fauxfake}>
            Switch to GPT
        </button>
        {:else}
        <button class="mainbutton" on:click={toggleChat} on:keydown={fauxfake}>
            Back to Chats
        </button>
        {/if}
        {#if $chatMode}
            <div class="rta-column rowgap50 botselect">
                <small><b>Select Bot:</b></small>
                <form class="rta-row colgap100 ycenter" on:submit={() => updatePrompt()}>
                    <select bind:value={currentPrompt} on:change={handleSelectChange}>
                        {#each botsList as bot}
                        <option value={bot.prompt}>{bot.name}</option>
                        {/each}
                    </select>
                    <button class="blank-button" type="submit"><Confirm/></button>
                </form>
            </div>
            <div class="rta-column oldchats">
                {#each chats as chat}
                    <small>{chat.userMessage.slice(0,10)} <br>
                        {chat.assistantMessage.slice(0,40)}<br>
                        {chat.chatId}
                    </small>
                {/each}
            </div>
        {/if}
    </div>
</div>

<style lang="sass">

.oldchats
    width: 100%

.botselect
    select
        border: 1px solid var(--borderline)
        padding: 3px
        width: 160px
        border-radius: 4px

.ofform
    form
        textarea
            border-radius: 4px
            width: calc(100% - 120px)
            border: 1px solid var(--borderline)

.ticket
    padding: 16px
    transition: 0.07s
    border-radius: 6px
    overflow: hidden
    &:hover
        box-shadow: 5px 8px 12px #e1e1e1, -5px -4px 10px #f1f1f1

.userchat
    small
        font-size: 12px
    p
        font-size: 18px

</style>