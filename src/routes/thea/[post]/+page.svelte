<script lang="ts">

	import { breakZero, breakOne, breakTwo, themeMode, readingMode } from '$lib/stores/globalstores';
	export let data
	import { allThea } from '$lib/utils/localpulls'
	let pens: any;

	$: (async() => {
		pens = await allThea();
	})();

</script>

<div
	class="appshell"
	class:levelzero={$breakZero}
	class:levelone={$breakOne}
	class:leveltwo={$breakTwo}
	class:light={$themeMode}
	class:dark={!$themeMode}
>
	<div class="shellmain thisispost">
		<svelte:component this={data.content}/>
	</div>
	<div class="shellside rta-column null">
		<h4>{data.title}</h4>
			{#if pens && pens.length > 0}
				{#each pens as item}
					<h6>
						<a href={item.linkpath}>
							{item.meta.id}-{item.meta.title}
						</a>
					</h6>
				{/each}
			{/if}
	</div>
</div>
