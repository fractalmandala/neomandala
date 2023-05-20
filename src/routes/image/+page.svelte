<script lang="ts">

    import { onMount } from 'svelte'
    import { supaImages } from '$lib/utils/supabase' 
    import { audioStore } from '$lib/stores/modalstores'
    
    let images:any
    let low = 0
    let top = 7
    let audio:any
    audioStore.subscribe(value => audio = value)

    let fake = false

    function fauxfake(){
        fake = !fake
    }

    onMount(async() => {
        images = await supaImages(low,top)
    })

</script>

<div class="rta-grid grid2 right00 screen fullH cushion">
    <div class="rta-grid grid4 colgap100 rowgap100">
        {#if images && images.length > 0}
            {#each images as item}
                <div class="rta-image">
                    <img src={item.link} alt={item.id}/>
                </div>
            {/each}
        {/if}
    </div>
    <div class="rta-column titlebox null">
        <img class="jello-vertical" src="/images/k-images.webp" alt="writing" on:mouseover={() => audio.play()} on:focus={fauxfake}/>
        <h3 class="tt-u">image</h3>
        <p class="grey">I've been waiting for Midjourney since I was a kid!</p>
        <div class="rta-row">
            <div class="blank-button">Prev</div>
            <div class="blank-button">Next</div>
        </div>
    </div>
</div>

<style lang="sass">

.grid4
    border-top: 8px solid var(--background)
    border-bottom: 8px solid var(--background)
    border-left: 8px solid var(--background)

</style>