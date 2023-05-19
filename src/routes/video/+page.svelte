<script lang="ts">

	import { onMount } from 'svelte'
	import { allVideos } from '$lib/utils/localpulls'
    import { audioStore } from '$lib/stores/modalstores'
	import Youtuber from '$lib/components/Youtuber.svelte'

	let images:any
    let audio:any
    audioStore.subscribe(value => audio = value)

	onMount(async() => {
		images = await allVideos();
	})	

</script>


<div class="rta-grid grid2 right00 screen fullH cushion">
    {#if images && images.length > 0}
        <div class="rta-column rowgap500 seven">
            {#each images as item}
                <div class="rta-row colgap300">
                    <div class="w32">
						<Youtuber
							youTubeId={item.meta.videoid}
						/>
                    </div>
                    <div class="rta-column rowgap200 ticket w64 null">
                        <h4>{item.meta.title}</h4>
                        <small>{item.meta.about}</small>
                    </div>
                </div>
            {/each}
        </div>
    {/if}
    <div class="rta-column titlebox null">
        <img class="jello-vertical" src="/images/k-videos.webp" alt="writing" on:mouseover={() => audio.play()}/>
        <h3 class="tt-u">video</h3>
        <p class="grey">Come bore yourself to my incessant dronings...</p>
    </div>
</div>


<style lang="sass">

small
    position: relative
    padding-bottom: 8px
    &::after
        position: absolute
        bottom: 0
        left: 0
        width: 20%
        content: ''
        height: 2px
        background: var(--green)

</style>
