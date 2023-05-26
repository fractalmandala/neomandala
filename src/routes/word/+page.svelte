<script lang="ts">
	//@ts-nocheck
	import { onMount } from 'svelte';
	import AppShell from '$lib/design/AppShell.svelte';
	import GlassButton from '$lib/components/GlassButton.svelte'
	import GlassButton2 from '$lib/components/GlassButton.svelte'
	import GlassButton3 from '$lib/components/GlassButton.svelte'
	import { breakZero, breakOne, breakTwo, themeMode, readingMode } from '$lib/stores/globalstores';
	import { audioStore } from '$lib/stores/modalstores';
	import {
		allWritings,
		mandalaWritings,
		historyWritings,
		archivalWritings
	} from '$lib/utils/supabase';
	let pens: any;
	let audio: any;
	let fake = false;
	let hists: any;
	let archs: any;
	let mands: any;
	let gen = Array(3).fill(false);

	$: isAnyGen = gen.some((item) => item);

	function toggleGen(index: number) {
		gen[index] = !gen[index];
		for (let i = 0; i < gen.length; i++) {
			if (i !== index && gen[i] === true) {
				gen[i] = false;
			}
		}
	}

	function fauxfake() {
		fake = !fake;
	}

	audioStore.subscribe((value) => (audio = value));
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
	<div class="rta-grid grid4 colgap100 rowgap100">
		{#if pens && pens.length > 0 && !isAnyGen}
			{#each pens as item}
				<a class="rta-row colgap100 stay ybetween back height-40" href="/word/{item.slug}" style="background-image: url('{item.image}')">
					<div class="rta-column rowgap100 null insider xcenter ycenter ta-c">
						<p class="green">{item.type}</p>
						<h4 class="white mol tt-c">{item.title}</h4>
						<small>{item.tags}</small>
					</div>
				</a>
			{/each}
		{/if}
	</div>
</div>
