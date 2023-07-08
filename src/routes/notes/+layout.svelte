<script lang="ts">
	import { onMount } from 'svelte';
	import Shell from '$lib/design/ShellTwo.svelte';
	import { allNotes } from '$lib/utils/supastream';
	import { showNote } from '$lib/dash/alerts';
	import '$lib/styles/tiptap.sass';
	import Refresh from '$lib/icons/Refresh.svelte';

	let altgrid = true;
	let theas: any;

	async function handleRefresh() {
		theas = await allNotes();
		showNote('Refreshed!', false);
	}

	onMount(async () => {
		theas = await allNotes();
	});
</script>

<Shell>
	<div slot="side" class="rta-column sidos">
		<button class="blank-button ta-l" on:click={handleRefresh}>
			<Refresh />
		</button>
		<div class="paddero">
			<p class="tt-u p-top-16 p-bot-16">
				<a href="/notes">Notes</a>
			</p>
			<div class="rta-column rowgap100">
				{#if theas && theas.length > 0}
					{#each theas as item}
						<p class="tt-c">
							<a href="/notes/{item.title}">{item.title}</a>
						</p>
					{/each}
				{/if}
			</div>
		</div>
	</div>
	<div slot="main" class="rta-column">
		<slot />
	</div>
</Shell>
