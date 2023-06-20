<script lang="ts">
	import Shell from '$lib/design/ShellTwo.svelte';
	import ModOpenAI from '$lib/gpt/ModOpenAI.svelte';
	import ModHF from '$lib/gpt/ModHF.svelte';
	import { useChat } from 'ai/svelte';
	const { input, handleSubmit, messages } = useChat();

	let isBot = Array(4).fill(false);
	isBot[0] = true;

	function toggleBot(index: number) {
		isBot[index] = !isBot[index];
		for (let i = 0; i < isBot.length; i++) {
			if (i !== index && isBot[i] === true) {
				isBot[i] = false;
			}
		}
	}
</script>

<Shell>
	<div slot="side" class="rta-column">
		<div class="inside rta-column rowgap50">
			<button class="blank-button ta-l" on:click={() => toggleBot(0)}> OpenAI </button>
			<button class="blank-button ta-l" on:click={() => toggleBot(1)}> HuggingFace </button>
		</div>
	</div>
	<div slot="main" class="rta-column maincolumn">
		<div class="rta-column chatarea rowgap100">
			{#if isBot[0]}
				<small>OpenAI</small>
				<ModOpenAI />
			{/if}
			{#if isBot[1]}
				<small>HuggingFace</small>
				<ModHF />
			{/if}
		</div>
	</div>
</Shell>

<style lang="sass">

.maincolumn
	@media screen and (max-width: 1023px)
		padding: 80px 24px

</style>
