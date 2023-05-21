<script lang="ts">

	import { onMount } from 'svelte'
	import { allVideos } from '$lib/utils/localpulls'
    import { audioStore } from '$lib/stores/modalstores'
    import { readingMode } from '$lib/stores/globalstores'
	import Youtuber from '$lib/components/Youtuber.svelte'

	let images:any
    let audio:any
    audioStore.subscribe(value => audio = value)
    let fake = false

    function fauxfake(){
        fake = !fake
    }


	onMount(async() => {
		images = await allVideos();
	})	

</script>


<div class="rta-grid grid2 right00 fullH cushion">
    {#if images && images.length > 0}
        <div class="rta-column rowgap500 postgrid">
            {#each images as item}
                <div class="rta-row stay colgap300">
                    <div class="w32 height-30-2">
						<Youtuber
							youTubeId={item.meta.videoid}
						/>
                    </div>
                    <div class="rta-column rowgap200 ticket w64 null">
                        <h4>{item.meta.title}</h4>
                    </div>
                </div>
            {/each}
        </div>
    {/if}
    <div class="rta-column titlebox null" class:invisible={$readingMode}>
        <img class="jello-vertical" src="/images/k-videos.webp" alt="writing" on:mouseover={() => audio.play()} on:focus={fauxfake}/>
        <h3 class="tt-u">video</h3>
        <p class="grey">Come bore yourself to my incessant dronings...</p>
    </div>
</div>

