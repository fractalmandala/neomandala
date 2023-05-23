<script lang="ts">

	import { onMount } from 'svelte'
	import AppShell from '$lib/design/AppShell.svelte';
    import { breakZero, breakOne, breakTwo, themeMode, readingMode } from '$lib/stores/globalstores'
	import { allVideos } from '$lib/utils/localpulls'
    import { audioStore } from '$lib/stores/modalstores'
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


<div class="appshell"
    class:levelzero={$breakZero}
    class:levelone={$breakOne}
    class:leveltwo={$breakTwo}
    class:light={$themeMode}
    class:dark={!$themeMode}
    >

    <div class="shellmain rta-grid colgap500 rowgap100 null">
    {#if images && images.length > 0}
        <div class="rta-column rowgap100">
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
    <div class="shellside rta-column fullW rowgap300 null">
        <div class="rta-column column-row rowgap200">
			<img
				class="jello-vertical w32 h30"
				src="/images/k-gpt.webp"
				alt="writing"
                on:mouseover={() => audio.play()} on:focus={fauxfake}/>
            <div class="rta-column rowgap200 w64 bord-bot p-bot-32">
                <h6 class="tt-u">video</h6>
                <small class="grey">Come bore yourself to my incessant dronings...</small>
            </div>
        </div>
    </div>

</div>
