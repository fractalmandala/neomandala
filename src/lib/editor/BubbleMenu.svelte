<script lang="ts">

	import { toggleBold, toggleItalic, toggleStrike } from '$lib/editor/buttonactions';
	import Button from '$lib/editor/EditorButton.svelte';
	
    export let editor:any;

</script>

{#if editor}
<div class="bubble-menu">
	<Button {editor} key="bold" on:click={() => toggleBold(editor)} />
	<Button {editor} key="italic" on:click={() => toggleItalic(editor)} />
	<Button {editor} key="strike" on:click={() => toggleStrike(editor)} />
</div>
{/if}
