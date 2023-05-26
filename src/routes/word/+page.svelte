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
	<div class="shellside rta-column fullW rowgap300 null">
		<div class="rta-row stay colgap200">
			<img
				class="jello-vertical height-30-2 w32"
				src="/images/k-writings.webp"
				alt="writing"
				on:mouseover={() => audio.play()}
				on:focus={fauxfake}
			/>
			<div class="rta-column rowgap100 p-bot-32 w64">
				<h3 class="tt-u">word</h3>
				<small class="grey">I write on history, civilization and Dharma. Some of it isn't bad.</small>
			</div>
		</div>
		<div class="rta-column column-row rowgap200 p-bot-32 w64">
			<button class="blank-button" on:click={() => toggleGen(1)} class:selected={gen[1]}>
				<GlassButton>
					Fractal Maṇḍala
				</GlassButton>
			</button>
			<button class="blank-button" on:click={() => toggleGen(1)} class:selected={gen[2]}>
				<GlassButton>
					History/AIT
				</GlassButton>
			</button>
			<button class="blank-button" on:click={() => toggleGen(1)} class:selected={gen[3]}>
				<GlassButton>
					Archival
				</GlassButton>
			</button>
		</div>
	</div>
</div>
