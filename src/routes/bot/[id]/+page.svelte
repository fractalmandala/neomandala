<script lang="ts">
	import { onMount } from 'svelte';
	import type { ChatSession } from '$lib/gpt/chatstore';
	import ModOpenAI from '$lib/gpt/ModOpenAI.svelte';
	import Parser from '$lib/agent/Parser.svelte';
	import Mod2 from '$lib/gpt/ModOpenAI.svelte';
	import Mod3 from '$lib/gpt/ModOpenAI.svelte';
	import Prism from 'prismjs';
	import '$lib/styles/prism.css';
	import { slide } from 'svelte/transition';
	import { formatTimeAgo } from '$lib/agent/generalutils';
	import { marked } from 'marked';
	import Clock from '$lib/design/iconset/clock.svelte';
	import { showModal } from '$lib/stores/modalstores';

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
	<div class="rta-column grot p-top-8 areaofchat">
		{#each data?.messages as item (item.timestamp)}
			{#if item.query !== 'init'}
				<div class="userclass ta-r bord-top p-top-16 p-bot-16">
					<Mod2 role={'user'} content={item.query} greying={true} />
				</div>
				<div class="agentclass bord-top p-top-16 p-bot-16">
					<Parser response={item.answer} />
				</div>
			{/if}
		{/each}
	</div>
</div>

<style lang="sass">

.intern
	align-items: center

.areaofchat
	@media screen and (min-width: 1024px)
		width: 720px
	@media screen and (max-width: 1023px)
		max-width: 640px


</style>
