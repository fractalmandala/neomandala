<script lang="ts">
	import { onMount } from 'svelte';
	import GlassButton from '$lib/components/GlassButton.svelte'
  import { breakZero, breakOne, breakTwo, themeMode, readingMode } from '$lib/stores/globalstores'
	import BotSelector from '$lib/agent/BotSelector.svelte';
	import { getChats } from '$lib/agent/dexie';
	import { gptTitles, gptStream } from '$lib/utils/supabase';
	import { audioStore } from '$lib/stores/modalstores';
	let pens: any;
	let audio: any;
	audioStore.subscribe((value) => (audio = value));
	let stream: any;
	let fake = false;
	let chats: any = [];

	function fauxfake() {
		fake = !fake;
	}

	async function loadChats() {
		chats = await getChats();
	}

	async function loadStream() {
		stream = await gptStream();
	}

	onMount(async () => {
		pens = await gptTitles();
		stream = await gptStream();
	});
</script>

<BotSelector />

<div class="appshell"
    class:levelzero={$breakZero}
    class:levelone={$breakOne}
    class:leveltwo={$breakTwo}
    class:light={$themeMode}
    class:dark={!$themeMode}
    >
	<div class="shellmain rta-grid colgap500 rowgap100 null">
			{#if pens && pens.length > 0}
				{#each pens as item}
					<a class="rta-column ybetween rowgap100 null glass-left p-left-32 p-bot-16" href="/bot/{item.indexing}">
						<div class="rta-column rowgap100 null">
							<h5 class="tt-c hover">{item.indexing} - {item.title}</h5>
							<p class="gradienter">{item.theme}</p>
						</div>
					</a>
				{/each}
			{/if}
		</div>

	<div class="shellside rta-column fullW rowgap300 null">
		<div class="rta-column column-row rowgap200">
			<img
				class="jello-vertical w32 h30"
				src="/images/k-gpt.webp"
				alt="writing"
				on:mouseover={() => audio.play()}
				on:focus={fauxfake}
			/>
			<div class="rta-column rowgap50 bord-bot p-bot-32 w64">
				<h6 class="tt-u">bot</h6>
				<small class="grey">he thinks, therefore he is?</small>
			</div>
		</div>
	</div>
</div>

