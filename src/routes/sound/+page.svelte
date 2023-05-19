<script lang="ts">

    import { onMount } from 'svelte'
	import { allMusic } from '$lib/utils/localpulls'
    import { audioStore } from '$lib/stores/modalstores'
   	import Soundclouder1 from '$lib/components/Soundclouder.svelte' 

    let images:any
    let audio:any
    audioStore.subscribe(value => audio = value)

    onMount(async() => {
        images = await allMusic()
    })

</script>

<div class="rta-grid grid2 right00 screen fullH cushion">
    {#if images && images.length > 0}
        <div class="rta-grid grid2 colgap500 rowgap500">
			{#each images as item, i}
				<div class="rta-column">
					<Soundclouder1 soundcloudLink={item.meta.soundcloudLink}/>
				</div>
			{/each}
        </div>
    {/if}
    <div class="rta-column titlebox null">
    
        <img class="jello-vertical" src="/images/k-music.webp" alt="writing" on:mouseover={() => audio.play()} />
        <h3 class="tt-u">sound</h3>
        <p class="grey">because electronic music takes us to a place we want to go to...</p>
    </div>
</div>
