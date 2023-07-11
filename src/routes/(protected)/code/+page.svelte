<script lang="ts">
	import Meta from '$lib/components/Meta.svelte';
	import { textareaAutosizeAction } from '$lib/gpt/textautoresize';
	import { showNote } from '$lib/dash/alerts';
	import supabase from '$lib/utils/supabase';
	let title = '';
	let link = '';
	let content = '';

	async function insertIndex() {
		const { error } = await supabase
			.from('amrit-index')
			.insert({ title: title, link: link, content: content });
		if (error) {
			showNote('error', true);
		} else {
			showNote('sent', false);
			title = '';
			link = '';
		}
	}
</script>

<form>
	<input type="text" bind:value={title} />
	<input type="url" bind:value={link} />
	<textarea bind:value={content} use:textareaAutosizeAction />
	<button class="genbutton" on:click={insertIndex}>Send</button>
</form>
