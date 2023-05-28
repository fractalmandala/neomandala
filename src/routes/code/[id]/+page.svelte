<script lang="ts">
	import { themeMode, breakZero, breakOne, breakTwo } from '$lib/stores/globalstores';
	import { clickToCopyAction } from '$lib/utils/clicktocopy';
	import { showToast, showChip, showAlert } from '$lib/stores/modalstores';
	import Copy from '$lib/icons/Copy.svelte';
	import { onMount } from 'svelte';
	import Prism from 'prismjs';
	import '$lib/utils/prismsql';
	import '$lib/styles/prism.css';
	export let data;

	onMount(() => {
		Prism.highlightAll();
	});
</script>

<div
	class="rta-column"
	class:levelzero={$breakZero}
	class:levelone={$breakOne}
	class:leveltwo={$breakTwo}
	class:light={$themeMode}
	class:dark={!$themeMode}
>
	<div class="rta-column rowgap100 codeparent null">
		<div class="rta-row ycenter between">
			<small style="color: white; text-transform: uppercase; font-weight: 800"
				><span style="color: #0ca64c">{data.title}</span> | {data.uuidtext} | {data.tags}</small
			>
			<button
				class="blank-button"
				use:clickToCopyAction={data.content}
				on:copy-done={() => showChip('Copied!', '#10D56C')}
				on:copy-error={() => showAlert('Failed!')}
			>
				<Copy />
			</button>
		</div>
		<pre class="this language-{data.uuidtext}">
			<pre>{@html data.content}</pre>
		</pre>
	</div>
</div>

<style lang="sass">

.levelzero, .levelone
	.codeparent
		padding: 16px
		.this
			background: #171717
			border: 1px solid #0ca64c

.leveltwo
	padding: 0
	.codeparent
		padding: 16px
		width: 88vw
		.this
			background: #171717

.codeparent
	background: #272727
	border-radius: 5px

pre
	white-space: pre-line
	word-break: break-word
	word-wrap: break-word

</style>
