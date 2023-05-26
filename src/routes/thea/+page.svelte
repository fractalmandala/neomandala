<script lang="ts">

	import type { PageData } from './$types';
	import { breakZero, breakOne, breakTwo, themeMode, readingMode } from '$lib/stores/globalstores';
	import { allThea } from '$lib/utils/localpulls'
	let pens: any;

	export let data: PageData;

	$: (async() => {
		pens = await allThea();
	})();

	$: ({ testTable, user } = data);

</script>


<div
	class="appshell"
	class:levelzero={$breakZero}
	class:levelone={$breakOne}
	class:leveltwo={$breakTwo}
	class:light={$themeMode}
	class:dark={!$themeMode}
>
	<div class="shellmain rta-grid colgap300 rowgap600">
		{#if data.in === true}
			{#if pens && pens.length > 0}
				{#each pens as item}
					<h5>
						<a href={item.linkpath}>
							{item.meta.title}
						</a>
					</h5>
				{/each}
			{/if}
		{/if}
	</div>
	<div class="shellside rta-column fullW rowgap300 null">
		<h3 class="tt-u">thea</h3>
	</div>
</div>