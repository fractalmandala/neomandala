<script lang="ts">
	import { onMount } from 'svelte';
	import { gptBots } from '$lib/gpt/gptdb';
	import { breakOne, breakZero, breakTwo, themeMode } from '$lib/stores/globalstores';

	let bots: any;

	onMount(async () => {
		bots = await gptBots();
	});
</script>

<div
	class="gpt-box back"
	class:levelzero={$breakZero}
	class:levelone={$breakOne}
	class:leveltwo={$breakTwo}
	class:light={$themeMode}
	class:dark={!$themeMode}
>
	<div class="sidebar null">
		<div class="disp-listhead">GPT</div>
		<div class="rta-column botslist">
			{#if bots && bots.length > 0}
				{#each bots as item}
					<div class="disp-list">{item.name}</div>
				{/each}
			{/if}
		</div>
	</div>
	<div class="mainbar rta-column">page</div>
</div>

<style lang="sass">

.gpt-box
	display: flex

.gpt-box.dark
	background-image: url('/images/gptdark.png')

.gpt-box.light
	background-image: url('/images/gptlight.png')

.levelzero.gpt-box
	flex-direction: row
	height: 100vh
	.sidebar
		width: 304px
		padding-top: 56px
	.mainbar
		width: calc(100vw - 304px)
		padding-top: 56px

.back
	height: 100vh
	padding-bottom: 88px 

</style>
