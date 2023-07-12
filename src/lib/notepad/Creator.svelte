<script lang="ts">
	import supabase from '$lib/utils/supastream';
	import { showChip } from '$lib/stores/globalstores';

	let name = '';

	async function newNote() {
		const { error } = await supabase.from('db-knowledge').insert({ name: name });
		if (error) {
			showChip('error!', '#fe4a49');
			console.log(error);
		} else showChip('Done!', '#10D56C');
	}
</script>

<form class="rta-column" on:submit|preventDefault={newNote}>
	<input type="text" placeholder={name} bind:value={name} />
	<button type="submit" class="mainbutton">Create</button>
</form>
