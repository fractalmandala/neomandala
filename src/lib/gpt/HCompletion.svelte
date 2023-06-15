<script lang="ts">
	import { useCompletion } from 'ai/svelte';
	const { completion, input, stop, isLoading, handleSubmit } = useCompletion({
		api: '/api/completion'
	});
</script>

<form on:submit={handleSubmit}>
	<input bind:value={$input} placeholder="Say something..." />
	<button type="submit">Send</button>
</form>
<div class="rta-column">
	{$completion}
</div>
