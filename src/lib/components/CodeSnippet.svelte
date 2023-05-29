<script lang="ts">
	//@ts-nocheck
	import { onMount } from 'svelte';
	import { clickToCopy } from '$lib/gpt/clicktocopycode';
	import { showToast, showAlert, showChip } from '$lib/stores/modalstores';
	import Copy from '$lib/icons/Copy.svelte';
	import Prism from 'prismjs';
	import '$lib/styles/prism.css';

	export let language = 'javascript';

	let text = '';

	function copySuccess() {
		showChip('copied!', '#10D56C');
	}

	function copyError(event) {
		showChip('error!', '#fe4a49');
	}

	onMount(() => {
		Prism.highlightAll();
	});
</script>

<svelte:window on:copysuccess={copySuccess} on:copyerror={copyError} />

<div class="rta-column codeparent glass-bottom">
	<div class="rta-row ycenter between null p-bot-16">
		<small class="white">
			{language}
		</small>
		<button class="blank-button" use:clickToCopy={'code'}>
			<Copy />
		</button>
	</div>
	<pre class="codeblock">
        <code class={`language-${language}`}>
            <slot />
        </code>
    </pre>
</div>

<style lang="sass">

.cutthis
	margin-bottom: 0
	margin-top: 0
	padding: 0

.codeparent
	background: rgba(255, 255, 255, 0.02)
	border: 1px solid rgba(255, 255, 255, 0.08)
	padding: 16px
	border-radius: 6px
	pre
		margin: 0

.codeblock
	background: #121212
	padding-bottom: 0
	padding-top: 8px
	margin: 0

.codeblock code
	font-size: 14px
	margin: 0
	white-space: pre-line
	line-height: 1
	padding-bottom: 0

</style>
