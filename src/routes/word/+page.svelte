<script lang="ts">
	//@ts-nocheck
	import { onMount } from 'svelte';
	import { breakZero, breakOne, breakTwo, themeMode } from '$lib/stores/globalstores';
	import { audioStore } from '$lib/stores/modalstores';
	import {
		allWritings,
		mandalaWritings,
		historyWritings,
		archivalWritings
	} from '$lib/utils/supabase';
	let pens: any;
	let hists: any;
	let archs: any;
	let mands: any;

	onMount(async () => {
		pens = await allWritings();
		hists = await historyWritings();
		archs = await archivalWritings();
		mands = await mandalaWritings();
	});
</script>

<div
	class="rta-column pad32"
	class:levelzero={$breakZero}
	class:levelone={$breakOne}
	class:leveltwo={$breakTwo}
	class:light={$themeMode}
	class:dark={!$themeMode}
>
	<div class="rta-grid grid4 colgap100 rowgap100 p-top-32">
		{#if pens && pens.length > 0}
			{#each pens as item}
				<a
					class="rta-row colgap100 stay ybetween back height-40-40"
					href="/word/{item.slug}"
					style="background-image: url('{item.image}')"
				>
					<div class="rta-column rowgap100 null insider xcenter ycenter ta-c">
						<p class="green">{item.type}</p>
						<div class="font">
							<h5 class="white tt-c">{item.title}</h5>
						</div>
						<small class="green">{item.tags}</small>
					</div>
				</a>
			{/each}
		{/if}
	</div>
</div>

<style lang="sass">

.levelzero
	.insider
		padding: 16px

</style>
