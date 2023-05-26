<script lang="ts">


	import { page } from '$app/stores';
  import { breakZero, breakOne, breakTwo, themeMode } from '$lib/stores/globalstores'
	import { browser } from '$app/environment';
	import AppShell from '$lib/design/AppShell.svelte'
	import { allBuild } from '$lib/utils/localpulls'


	let posts:any

	$: (async() =>{
			posts = await allBuild()
		})();
	

</script>


<div class="rta-column"
	class:levelzero={$breakZero}
	class:levelone={$breakOne}
	class:leveltwo={$breakTwo}
	>
	<section class="rta-row stay xend colgap200">
		{#if posts && posts.length > 0}
			{#each posts as item}
				<p class="tt-u">
					<a href={item.linkpath}>
						{item.meta.title}
					</a>
				</p>
			{/each}
		{/if}
	</section>
	<section>
		<slot></slot>
	</section>
</div>

<style lang="sass">

.levelzero
	padding-top: 48px
	.rta-row.stay.between
		p 
			text-transform: uppercase
			a
				text-transform: uppercase

</style>