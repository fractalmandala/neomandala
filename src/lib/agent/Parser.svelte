<script lang="ts">
	//@ts-nocheck
	import { onMount } from 'svelte';
	import { themeMode, breakZero, breakOne, breakTwo } from '$lib/stores/globalstores';
	import { clickToCopyAction } from '$lib/utils/clicktocopy';
	import { showToast, showAlert } from '$lib/stores/modalstores';
	import Copy from '$lib/design/iconset/copy.svelte';
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
				<pre class="codeblock grey" data-lenis-prevent>
				<div class="rta-row ycenter strip between p-bot-8">
					<small style="text-transform: uppercase;">{block.language}</small>
					<button
							class="blank-button"
							use:clickToCopyAction={block.code}
							on:copy-done={() => showToast('Copied!')}
							on:copy-error={() => showAlert('Failed!')}>
						<Copy />
					</button>
				</div>
					<code class={`language-${block.language}`}>
						{block.code}
					</code>
				</pre>
			</div>
		{/if}
	{/each}
</div>

<style lang="sass">

.strip
	height: 32px
	position: sticky
	align-items: center
	top: 0
	small
		font-size: 10px
		padding-top: 14px

.codeblock
	word-wrap: break-all
	white-space: pre-line
	max-height: 320px
	overflow-y: scroll
	padding-top: 0


pre.codeblock
	overflow-y: scroll
	overflow-x: scroll
	font-family: 'Space Grotesk', sans-serif


.nocodeparent
	pre
		margin: 0
		line-height: 1.6
		font-size: 18px
		overflow-y: scroll
		white-space: pre-line
		font-family: 'Space Grotesk', sans-serif


.codeblock code
	word-wrap: break-all
	color: var(--textone)
	font-family: 'Space Mono', monospace
	font-size: 12px


.dark
	.codeblock, .strip
		background: #292C33
	.strip
		border-bottom: 1px solid #575757

.light
	.codeblock, .strip
		background: #EFEFEF
	.strip
		border-bottom: 1px solid #d7d7d7

</style>
