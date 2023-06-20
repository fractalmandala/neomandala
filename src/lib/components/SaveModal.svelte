<script lang="ts">
	import { saveStore, hideSave } from '$lib/stores/globalstores';
	import { onMount } from 'svelte';

	let isShown: boolean, text: string;

	const unsubscribe = saveStore.subscribe((value) => {
		({ isShown, text } = value);
	});

	onMount(() => {
		return unsubscribe;
	});
</script>

{#if isShown}
	<button class="blank-button"> {text} </button>
{/if}

<style lang="sass">

.blank-button
	font-size: 12px
	text-transform: uppercase
	color: var(--texttwo)
	&:hover
		color: #10D56C

</style>
