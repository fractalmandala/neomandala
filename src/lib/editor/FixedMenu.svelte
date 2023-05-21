<script lang="ts">

	import { toggleBold, toggleItalic, toggleStrike } from '$lib/editor/buttonactions';
	import Button from '$lib/editor/EditorButton.svelte';
	
    export let editor:any;

</script>

{#if editor}
<div class="fixed-menu">
	<Button {editor} key="bold" on:click={() => toggleBold(editor)} />
	<Button {editor} key="italic" on:click={() => toggleItalic(editor)} />
	<Button {editor} key="strike" on:click={() => toggleStrike(editor)} />
</div>
{/if}

<style>
	.fixed-menu {
    background: #ccc;
		padding: 2px;
		min-height: 36px;
	}
</style>