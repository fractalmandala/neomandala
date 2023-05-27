<script lang="ts">

	import { onMount } from 'svelte'
	import { snippets } from '$lib/utils/supabase'
	import { breakZero, breakOne, breakTwo, themeMode, readingMode } from '$lib/stores/globalstores';

		
	let showsnippets:any


	onMount(async() => {
		showsnippets = await snippets();
	});
</script>

<div class="rta-column"
	class:levelzero={$breakZero}
	class:levelone={$breakOne}
	class:leveltwo={$breakTwo}
	class:light={$themeMode}
	class:dark={!$themeMode}
	>
	
	<div class="rta-column">

			{#if showsnippets && showsnippets.length > 0}
				{#each showsnippets as item}
					<h6 class="thin tt-u">
						<a href="/note/{item.id}">
							{item.title}
						</a>
					</h6>
				{/each}
			{/if}
	</div>
</div>
