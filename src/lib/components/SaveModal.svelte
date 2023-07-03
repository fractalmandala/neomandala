<script lang="ts">
	import { saveStore, hideSave } from '$lib/stores/globalstores';
	import { createEventDispatcher } from 'svelte';
	import { onMount } from 'svelte';

	let isShown: boolean, text: string;
	const dispatch = createEventDispatcher<{ click: Event }>();

	function handleClick(event: MouseEvent) {
		dispatch('click', event);
	}

	const unsubscribe = saveStore.subscribe((value) => {
		({ isShown, text } = value);
	});

	onMount(() => {
		return unsubscribe;
	});
</script>

{#if isShown}
	<button class="blank-button" on:click={handleClick}> {text} </button>
{/if}

<style lang="sass">

.blank-button
	font-size: 12px
	text-transform: uppercase
	color: var(--texttwo)
	&:hover
		color: #10D56C

</style>
