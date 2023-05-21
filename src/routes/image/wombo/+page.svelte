<script lang="ts">

    import { onMount } from 'svelte'
    import { womboImages } from '$lib/utils/supabase' 
    import { audioStore } from '$lib/stores/modalstores'
    import { readingMode } from '$lib/stores/globalstores'
    import ChevRight from '$lib/icons/ChevRight.svelte'
    
    let images:any
    let audio:any
    audioStore.subscribe(value => audio = value)

    let fake = false

    function fauxfake(){
        fake = !fake
    }

    onMount(async() => {
        images = await womboImages()
    })

</script>

<div class="rta-grid grid2 right00 screen fullH cushion">
    <div class="rta-grid grid4 colgap100 rowgap100 postgrid">
        {#if images && images.length > 0}
            {#each images as item}
                <a href="/image/wombo/{item.id}" class="rta-image">
                    <img src={item.link} alt={item.id}/>
                </a>
            {/each}
        {/if}
    </div>
    <div class="rta-column titlebox null postis" class:invisible={$readingMode}>
        <a href="/image" class="rta-row null ycenter">
            <small>Image</small>
            <ChevRight/>
        </a>
        <img class="jello-vertical" src="/images/k-images.webp" alt="writing" on:mouseover={() => audio.play()} on:focus={fauxfake}/>
        <h3 class="tt-u">wombo</h3>
    </div>
</div>
