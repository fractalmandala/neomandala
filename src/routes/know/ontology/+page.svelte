<script lang="ts">
	import { onMount } from 'svelte';
	import supabase from '$lib/utils/supabase';
	import { slide } from 'svelte/transition';
	import { indexName, indexCategory, indexLinks, indexTags } from '$lib/stores/globalstores';

	let galls: any;
	let isOn = Array(15).fill(false);
	isOn[0] = true;
	let fake = false;
	$indexName = 'ontology';
	$indexCategory = '';
	$indexLinks = '';
	$indexTags = '';

	function toggleOn(index: number) {
		isOn[index] = !isOn[index];
		for (let i = 0; i < isOn.length; i++) {
			if (i !== index && isOn[i] === true) {
				isOn[i] = false;
			}
		}
	}

	function fauxfake() {
		fake = !fake;
	}

	async function getRID() {
		const { data, error } = await supabase.from('db-synaptic').select().order('id');
		if (error) throw new Error(error.message);
		return data;
	}

	onMount(async () => {
		galls = await getRID();
	});
</script>

<div class="rta-row colgap100 between strip bord-bot p-bot-8">
	{#if galls && galls.length > 0}
		{#each galls as item, i}
			<p on:click={() => toggleOn(i)} on:keydown={fauxfake} class:selected={isOn[i]}>
				{item.category}
			</p>
		{/each}
	{/if}
</div>
<div class="rta-column rowgap400 p-top-16">
	{#if galls && galls.length > 0}
		{#each galls as item, i}
			{#if isOn[i]}
				<div class="rta-column grot" transition:slide>
					<h4 style="margin: 0; padding-bottom: 16px; color: var(--background)">{item.category}</h4>
					<div class="rta-row bord-bot p-bot-16">
						<small style="color: var(--background)">{item.evocation}</small>
					</div>
					<div class="rta-column rowgap200 p-top-16">
						<p>{item.meaning}</p>
						<p class="p-top-32 p-bot-32 bord-top bord-bot">{item.explanation}</p>
					</div>
					<pre>{item.detail}</pre>
				</div>
			{/if}
		{/each}
	{/if}
</div>

<style lang="sass">

.strip
	p
		text-transform: uppercase
		font-weight: bold
		font-size: 14px
		cursor: pointer
		&:hover
			color: var(--background)
	p.selected
		color: #10D56C

</style>
