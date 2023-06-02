<script lang="ts">
	import { onMount } from 'svelte';
	import { psyImages } from '$lib/utils/supabase';

	let images: any;

	onMount(async () => {
		images = await psyImages();
	});
</script>

{#if images && images.length > 0}
	{#each images as item}
		<div class="rta-grid grid2 minH">
			{#if item.id === 1 || item.id === 3 || item.id === 5 || item.id === 7 || item.id === 9}
				<div class="rta-image">
					<img src={item.link} alt={item.id} />
				</div>
				<div class="grot">
					<h4>{item.quote}</h4>
					<p>{item.source}</p>
				</div>
			{:else}
				<div class="grot">
					<h4>{item.quote}</h4>
					<p>{item.source}</p>
				</div>
				<div class="rta-image">
					<img src={item.link} alt={item.id} />
				</div>
			{/if}
		</div>
	{/each}
{/if}

<style lang="sass">


.rta-grid.grid2
	@media screen and (min-width: 769px)
		padding: 56px 3.2vw
		.grot
			display: flex
			flex-direction: column
			justify-content: center
	@media screen and (max-width: 768px)
		padding: 56px 24px
			


</style>
