<script lang="ts">
	import { createEventDispatcher, onMount } from 'svelte';

	export let value = '';
	export let minRows = 1;
	export let maxRows: null | number = null;
	export let placeholder = '';
	export let disabled = false;

	// Approximate width from which we disable autofocus
	const TABLET_VIEWPORT_WIDTH = 768;

	let innerWidth = 0;
	let textareaElement: HTMLTextAreaElement;

	const dispatch = createEventDispatcher<{ submit: void }>();

	$: minHeight = `${1 + minRows * 1.5}em`;
	$: maxHeight = maxRows ? `${1 + maxRows * 1.5}em` : `auto`;

	function handleKeydown(event: KeyboardEvent) {
		// submit on enter
		if (event.key === 'Enter' && !event.shiftKey) {
			event.preventDefault();
			dispatch('submit'); // use a custom event instead of `event.target.form.requestSubmit()` as it does not work on Safari 14
		}
	}

	onMount(() => {
		if (innerWidth > TABLET_VIEWPORT_WIDTH) {
			textareaElement.focus();
		}
	});
</script>

<svelte:window bind:innerWidth />

<div class="rta-column">
	<pre aria-hidden="true" style="min-height: {minHeight}; max-height: {maxHeight}">{(value || ' ') +
			'\n'}</pre>

	<textarea
		enterkeyhint="send"
		tabindex="0"
		rows="1"
		bind:value
		bind:this={textareaElement}
		{disabled}
		on:keydown={handleKeydown}
		on:keypress
		{placeholder}
	/>
</div>

<style>
	pre,
	textarea {
		font-family: inherit;
		box-sizing: border-box;
		line-height: 1.5;
	}
</style>
