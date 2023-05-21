<script lang="ts">

	import { onMount } from 'svelte'
	import { fade } from 'svelte/transition'
	import { elasticOut } from 'svelte/easing'
	let sampler:any
	let pressed = false
	import type { ChatCompletionRequestMessageRoleEnum } from 'openai'

	onMount(async() => {
		sampler = message
	})

	export let type: ChatCompletionRequestMessageRoleEnum
	export let message: string


</script>

<div class="boxofchat rta-column null {type === 'user' ? 'chat-end' : 'chat-start'}" in:fade={{ duration: 300, delay: 50, easing: elasticOut }} class:packaged={pressed}>
	<small class="tt-u agent {type === 'user' ? 'user' : 'broGPT'}">
		{type === 'user' ? 'user' : 'broGPT'}:
	</small>
	<pre class="commbody {type === 'user' ? 'user' : 'broGPT'}">
		{@html message}
	</pre>
</div>

<style lang="sass">

small
    font-size: 12px

pre
    white-space: pre-line
    margin: 0
    font-family: 'Space Grotesk', sans-serif
    font-size: 18px

</style>