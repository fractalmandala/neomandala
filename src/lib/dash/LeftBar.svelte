<script lang="ts">
	import { onMount } from 'svelte';
	import { notesDiary } from '$lib/dash/notesutil';
	import { formatTimeAgo } from '$lib/dash/sharedutils';
	import { slide } from 'svelte/transition';
	import { allBuild, allWebdev } from '$lib/utils/localpulls';
	import { snippets } from '$lib/dash/db';
	import {
		breakZero,
		breakOne,
		breakTwo,
		themeMode,
		toggleVisibility
	} from '$lib/stores/globalstores';
	import Acco1 from '$lib/design/MandAccordionItem.svelte';
	import Acco2 from '$lib/design/MandAccordionItem.svelte';
	import Acco3 from '$lib/design/MandAccordionItem.svelte';
	import Acco4 from '$lib/design/MandAccordionItem.svelte';
	let builds: any;
	let webs: any;
	let snips: any;
	let openAcco = Array(4).fill(false);
	function toggleOpenAcco(index: number) {
		openAcco[index] = !openAcco[index];
		for (let i = 0; i < openAcco.length; i++) {
			if (i !== index && openAcco[i] === true) {
				openAcco[i] = false;
			}
		}
	}
	onMount(() => {
		(async () => {
			builds = await allBuild();
			webs = await allWebdev();
			snips = await snippets();
		})();
	});
</script>

<div class="authorizedbox rta-column">
	<button class="blank-button rta-column" on:click={() => toggleOpenAcco(1)}>
		<Acco1 rotated={openAcco[1]}
			>Rough Drafts
			<div class="rta-column rowgap50 bord-bot p-bot-16" slot="body">
				{#if builds && builds.length > 0}
					{#each builds as item, i}
						<p class="grot">
							<a href={item.linkpath} class="hover">
								{item.meta.title}
							</a>
						</p>
					{/each}
				{/if}
			</div>
		</Acco1>
	</button>
	<button class="blank-button rta-column p-top-16" on:click={() => toggleOpenAcco(2)}>
		<Acco2 rotated={openAcco[2]}
			>Web Dev Posts
			<div class="rta-column rowgap50 bord-bot p-bot-16" slot="body">
				{#if webs && webs.length > 0}
					{#each webs as item, i}
						<p class="grot">
							<a href={item.linkpath} class="hover">
								{item.meta.title}
							</a>
						</p>
					{/each}
				{/if}
			</div>
		</Acco2>
	</button>
	<button class="blank-button rta-column p-top-16" on:click={() => toggleOpenAcco(3)}>
		<Acco3 rotated={openAcco[3]}>
			Code Snippets
			<div class="rta-column rowgap50 bord-bot p-bot-16" slot="body">
				{#if snips && snips.length > 0}
					{#each snips as item}
						<p class="grot">
							<a href="/code/{item.id}" class="hover">
								{item.title}
							</a>
						</p>
					{/each}
				{/if}
			</div>
		</Acco3>
	</button>
	<button class="blank-button rta-column p-top-16" on:click={() => toggleOpenAcco(4)}>
		<Acco4 rotated={openAcco[4]}>
			Local Notes
			<div class="rta-column rowgap50 bord-bot p-bot-16" slot="body">
				{#if $notesDiary && $notesDiary.length > 0}
					{#each $notesDiary as item}
						<p class="grot">{item.title}</p>
					{/each}
				{/if}
			</div>
		</Acco4>
	</button>
</div>
