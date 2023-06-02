<script lang="ts">
	//@ts-nocheck
	import { onMount } from 'svelte';
	import { slide } from 'svelte/transition';
	import { themeMode, breakZero, breakOne, breakTwo } from '$lib/stores/globalstores';
	import { clickToCopyAction } from '$lib/utils/clicktocopy';
	import { showToast, showAlert } from '$lib/stores/modalstores';
	import Copy from '$lib/icons/Copy.svelte';
	import Prism from 'prismjs';
	import '$lib/styles/prism.css';
	export let response: any;
	let rawBlocks = response.split('```');

	let blocks: any = [];
	for (let i = 0; i < rawBlocks.length; i++) {
		if (i % 2 === 0) {
			blocks.push({ type: 'text', content: rawBlocks[i] });
		} else {
			let [language, ...codeLines] = rawBlocks[i].split('\n');
			const code = codeLines.join('\n');
			if (!language || language.trim() === '') {
				language = 'javascript';
			}
			blocks.push({ type: 'code', language: language.trim(), code: code.trim() });
		}
	}

	onMount(() => {
		Prism.highlightAll();
	});
</script>

<div
	class="rta-column null"
	class:dark={!$themeMode}
	class:light={$themeMode}
	class:levelzero={$breakZero}
	class:levelone={$breakOne}
	class:leveltwo={$breakTwo}
>
	{#each blocks as block}
		{#if block.type === 'text'}
			<div class="rta-column rowgap100 nocodeparent null">
				<pre>{block.content}</pre>
			</div>
		{/if}
		{#if block.type === 'code'}
			<div class="rta-column rowgap100 codeparent null">
				<div class="rta-row ycenter between p-bot-16 thisguy">
					<small style="text-transform: uppercase; font-weight: 800; color: white"
						>{block.language}</small
					>
					<button
						class="blank-button"
						use:clickToCopyAction={block.code}
						on:copy-done={() => showToast('Copied!')}
						on:copy-error={() => showAlert('Failed!')}
					>
						<Copy />
					</button>
				</div>
				<pre class="codeblock grey" data-lenis-prevent><code class={`language-${block.language}`}
						>{block.code}</code
					></pre>
			</div>
		{/if}
	{/each}
</div>

<style lang="sass">

.thisguy
	border-bottom: 1px solid var(--themer)

.codeparent
	border-radius: 6px

.codeblock
	word-wrap: break-all
	white-space: pre-line
	max-height: 320px
	overflow-y: scroll


pre.codeblock
	overflow-y: scroll
	overflow-x: scroll
	font-family: 'Space Grotesk', sans-serif


.nocodeparent
	pre
		margin: 0
		line-height: 1.6
		overflow-y: scroll
		white-space: pre-line
		font-family: 'Space Grotesk', sans-serif


.codeblock code
	word-wrap: break-all
	color: var(--textone)
	font-family: 'Space Mono', monospace
	font-size: 12px


</style>
