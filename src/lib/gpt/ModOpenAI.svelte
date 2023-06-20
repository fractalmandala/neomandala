<script lang="ts">
	import { useChat } from 'ai/svelte';
	const { input, handleSubmit, messages } = useChat();
</script>

{#each $messages as message}
	<pre>{message.role}: {message.content}</pre>
{/each}
<form on:submit={handleSubmit}>
	<input bind:value={$input} />
	<button type="submit">Send</button>
</form>
