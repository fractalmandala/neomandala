<script lang="ts">
	//@ts-nocheck
	import { onMount } from 'svelte';
	import AppShell from '$lib/design/AppShell.svelte';
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
	class="appshell"
	class:levelzero={$breakZero}
	class:levelone={$breakOne}
	class:leveltwo={$breakTwo}
	class:light={$themeMode}
	class:dark={!$themeMode}
>
	<div class="shellmain rta-grid colgap300 rowgap600">
		{#if pens && pens.length > 0 && !isAnyGen}
			{#each pens as item}
				<a class="rta-row colgap300 stay ybetween ticket" href="/word/{item.slug}">
					<div class="rta-column rowgap100 null w64">
						<p class="green ta-r">{item.type}</p>
						<h4 class="tt-c ta-r">{item.id}-{item.title}</h4>
						<small class="grey ta-r">{item.tags}</small>
					</div>
					<div class="rta-image w32 height-24">
						<img src={item.image} alt={item.title} />
					</div>
				</a>
			{/each}
		{/if}
		{#if gen[1]}
			{#if mands && mands.length > 0}
				{#each mands as item}
					<a class="rta-row colgap300 stay ybetween ticket" href="/word/{item.slug}">
						<div class="rta-column rowgap100 null w64">
							<p class="green ta-r">{item.type}</p>
							<h4 class="tt-c ta-r">{item.id}-{item.title}</h4>
							<small class="grey ta-r">{item.tags}</small>
						</div>
						<div class="rta-image w32 height-24">
							<img src={item.image} alt={item.title} />
						</div>
					</a>
				{/each}
			{/if}
		{/if}
		{#if gen[2]}
			{#if hists && hists.length > 0}
				{#each hists as item}
					<a class="rta-row colgap300 stay ybetween ticket" href="/word/{item.slug}">
						<div class="rta-column rowgap100 null w64">
							<p class="green ta-r">{item.type}</p>
							<h4 class="tt-c ta-r">{item.id}-{item.title}</h4>
							<small class="grey ta-r">{item.tags}</small>
						</div>
						<div class="rta-image w32 height-24">
							<img src={item.image} alt={item.title} />
						</div>
					</a>
				{/each}
			{/if}
		{/if}
		{#if gen[3]}
			{#if archs && archs.length > 0}
				{#each archs as item}
					<a class="rta-row colgap300 stay ybetween ticket" href="/word/{item.slug}">
						<div class="rta-column rowgap100 null w64">
							<p class="green ta-r">{item.type}</p>
							<h4 class="tt-c ta-r">{item.id}-{item.title}</h4>
							<small class="grey ta-r">{item.tags}</small>
						</div>
						<div class="rta-image w32 height-24">
							<img src={item.image} alt={item.title} />
						</div>
					</a>
				{/each}
			{/if}
		{/if}
	</div>
	<div class="shellside rta-column column-row fullW rowgap300 null">
		<img
			class="jello-vertical"
			src="/images/k-writings.webp"
			alt="writing"
			on:mouseover={() => audio.play()}
			on:focus={fauxfake}
		/>
		<div class="rta-column rowgap200 bord-bot p-bot-32 w64">
			<h6 class="tt-u">word</h6>
			<small class="grey">I write on history, civilization and Dharma. Some of it isn't bad.</small>
		</div>
		<div class="rta-column rowgap200 bord-bot p-bot-32 w64">
			<button class="outbutton" on:click={() => toggleGen(1)} class:selected={gen[1]}>
				Fractal Maṇḍala
			</button>
			<button class="outbutton" on:click={() => toggleGen(2)} class:selected={gen[2]}>
				History and AIT
			</button>
			<button class="outbutton" on:click={() => toggleGen(3)} class:selected={gen[3]}>
				Archival
			</button>
		</div>
	</div>
</div>
