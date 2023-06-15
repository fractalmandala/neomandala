<script lang="ts">
	import WritingsInput from '$lib/components/WritingsInput.svelte';
	import { allWriteups } from '$lib/dash/notesutil';
</script>

<WritingsInput />

{#if $allWriteups && $allWriteups.length > 0}
	{#each $allWriteups as item}
		<a href="/jp/{item.title}"><p>{item.title}</p></a>
	{/each}
{/if}
