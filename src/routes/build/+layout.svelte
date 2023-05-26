<script lang="ts">


	import { page } from '$app/stores';
	import { browser } from '$app/environment';
	import AppShell from '$lib/design/AppShell.svelte'
	import { allBuild } from '$lib/utils/localpulls'


	let posts:any




</script>


<AppShell>
	<section slot="side" class="rta-column column-row wrap in-side">
		{#if posts && posts.length > 0}
			{#each posts as item}
				<p>
					<a href={item.linkpath}>
						{item.meta.title}
					</a>
				</p>
			{/each}
		{/if}
	</section>
	<section slot="main">
		<slot></slot>
	</section>
</AppShell>