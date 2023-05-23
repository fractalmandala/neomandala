<script lang="ts">
//@ts-nocheck
	import { onMount } from 'svelte';
	import { clickToCopyAction } from '$lib/utils/clicktocopy';
	import { showToast, showAlert } from '$lib/stores/modalstores';
	import Copy from '$lib/icons/Copy.svelte';
	import Prism from 'prismjs';
	import '$lib/styles/prism.css';

    export let language = 'javascript'
    export let codeSnip:any

	onMount(() => {
		Prism.highlightAll();
	});

</script>

<div class="rta-column codeparent">
	<div class="rta-row ycenter between null">
		<small class="white">
            {language}
        </small>
		<button
			class="blank-button"
			use:clickToCopyAction={codeSnip} on:copy-done={() => showToast('Copied!')} on:copy-error={() => showAlert('Failed!')}>
			<Copy />
		</button>
	</div>
	<pre class="codeblock">
        <code class={`language-${language}`}>
            {codeSnip}
        </code>
    </pre>

</div>

<style lang="sass">

.cutthis
	margin-bottom: 0
	margin-top: 0
	padding: 0

.codeparent
	background: #272727
	padding: 16px
	border-radius: 6px

.codeblock
	background: #121212

.codeblock code
	font-size: 16px
	white-space: pre-line

</style>