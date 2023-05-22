<script lang="ts">

	import { onMount } from 'svelte'
	import AppShell from '$lib/design/AppShell.svelte';
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


<AppShell>
    <div slot="main">
    {#if images && images.length > 0}
        <div class="rta-column rowgap500">
            {#each images as item}
                <div class="rta-grid grid2 right2 stay2 colgap300">
                    <div class="w32 height-40-40">
						<Youtuber
							youTubeId={item.meta.videoid}
						/>
                    </div>
                    <div class="rta-column rowgap200 ticket w64 null">
                        <h6 class="tt-c">{item.meta.title}</h6>
                    </div>
                </div>
            {/each}
        </div>
    {/if}
    </div>
    <div slot="side" class="rta-column column-row xstretch fullW rowgap300 null">
        <img class="jello-vertical w32" src="/images/k-videos.webp" alt="writing" on:mouseover={() => audio.play()} on:focus={fauxfake}/>
        <div class="rta-column rowgap200 w64 bord-bot p-left-32 p-bot-32">
            <h6 class="tt-u">video</h6>
            <small class="grey">Come bore yourself to my incessant dronings...</small>
        </div>
    </div>

</AppShell>
