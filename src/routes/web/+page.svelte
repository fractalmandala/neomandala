<script lang="ts">
	import { onMount } from 'svelte';
	import { allWebdev } from '$lib/utils/localpulls';
	import { breakZero, breakOne, breakTwo, themeMode, readingMode } from '$lib/stores/globalstores';
	let pens: any;

	onMount(async () => {
		pens = await allWebdev();
	});
</script>

<div
	class="rta-grid grid3 minH colgap400 rowgap400 x00"
	class:levelzero={$breakZero}
	class:levelone={$breakOne}
	class:leveltwo={$breakTwo}
	class:light={$themeMode}
	class:dark={!$themeMode}
>
	{#if pens && pens.length > 0}
		{#each pens as item}
			<a class="rta-column ybetween rowgap400 p-all-16 ticket" href={item.linkpath}>
				<div class="rta-column rowgap100 null">
					<h4 class="white noh tt-c hover">{item.meta.id} - {item.meta.title}</h4>
					<p>{item.meta.type} | {item.meta.tags}</p>
				</div>
			</a>
		{/each}
	{/if}
</div>

<style lang="sass">

.x00
  padding: 64px 32px


.ticket
  background: linear-gradient(135deg, #171717 0%,#121212 100%)
  border: 1px solid white

</style>
