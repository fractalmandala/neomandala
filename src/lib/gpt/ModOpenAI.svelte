<script lang="ts">
	import { onMount } from 'svelte';
	import { formatContent } from '$lib/gpt/formatmessage';
	import Prism from 'prismjs';
	import '$lib/styles/prism.css';

	export let role: 'user' | 'assistant';
	export let content: string | null = null;
	export let greying = false;

	onMount(() => {
		Prism.highlightAll();
	});
</script>

<div class="message" class:assistant={role === 'assistant'} class:user={role === 'user'}>
	<div class="content">
		{#if !!content}
			{#each formatContent(content) as block}
				{#if block.type === 'code'}
					<pre class="code">
						<code>
							{block.content}
						</code>
					</pre>
				{:else}
					<p class="sheer" class:grey={greying}>{block.content}</p>
				{/if}
			{/each}
		{:else}
			<slot />
		{/if}
	</div>
</div>

<style lang="sass">

p.sheer
	font-size: 16px
	font-family: var(--altfont)
	line-height: 1.5
	margin-bottom: 16px
	color: var(--default)

p.sheer.grey
	color: var(--texttwo)

.message
	width: 100%
	border-radius: 2px

.content
	margin: auto
	max-width: 48rem

.code
	padding: 8px 12px

@media only screen and (max-width: 640px)
	.message
		padding: 12px

</style>
