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
	let fake = false;
	let fullText = false;
	let rawBlocks = response.split('```');

	function toggleText() {
		fullText = !fullText;
	}

	function fauxfake() {
		fake = !fake;
	}

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

<svelte:head>
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonmyous" />
	<link
		href="https://fonts.googleapis.com/css2?family=Martian+Mono:wght@300;400;500;600;700;800&display=swap"
		rel="stylesheet"
	/>
</svelte:head>

<div
	class="rta-column rowgap200 null cutthis"
	transition:slide|global
	class:dark={!$themeMode}
	class:light={$themeMode}
	class:levelzero={$breakZero}
	class:levelone={$breakOne}
	class:leveltwo={$breakTwo}
>
	{#each blocks as block}
		{#if block.type === 'text'}
			<div class="rta-column nocodeparent">
				<pre class="grey" transition:slide|global>{block.content}</pre>
			</div>
		{:else}
			<div class="rta-column codeparent">
				<div class="rta-row ycenter between">
					<small style="text-transform: uppercase; font-weight: 800">{block.language}</small>
					<button
						class="blank-button"
						use:clickToCopyAction={block.code}
						on:copy-done={() => showToast('Copied!')}
						on:copy-error={() => showAlert('Failed!')}
					>
						<Copy />
					</button>
				</div>
				<pre class="codeblock"><code class={`language-${block.language}`}>{block.code}</code></pre>
			</div>
		{/if}
	{/each}
</div>

<style lang="sass">

.cutthis
	margin-bottom: 0
	margin-top: 0
	padding: 0

.codeparent
	background: var(--contraster)
	padding: 16px
	border-radius: 6px

.codeblock
	background: var(--opposite)
	word-wrap: break-all

pre.codeblock
	font-size: 16px

.nocodeparent
	pre
		font-size: 16px
		margin: 0
		line-height: 1.2
		word-break: break-all
		white-space: pre-line

.codeblock code
	word-wrap: break-all
	font-size: 16px
	font-weight: 500
	color: var(--textone)


</style>
