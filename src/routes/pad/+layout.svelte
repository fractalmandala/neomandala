<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { codeSnips } from '$lib/utils/supabase';
	import Shell from '$lib/design/ShellTwo.svelte';
	import '$lib/styles/tiptap.sass';
	import Refresh from '$lib/icons/Refresh.svelte';

	let snips: any;

	onMount(async () => {
		snips = await codeSnips();
	});
</script>

<Shell>
	<div slot="side" class="rta-column sidos">
		<div class="paddero">
			<p class="tt-u p-top-16 p-bot-16">
				<a href="/pad">Snips</a>
			</p>
			<div class="rta-column rowgap100">
				{#if snips && snips.length > 0}
					{#each snips as item}
						<p>
							<a href="/pad/{item.id}">
								{item.title}
							</a>
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
