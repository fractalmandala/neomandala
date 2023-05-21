<script lang="ts">

    import { onMount } from 'svelte'
    import { supaImages } from '$lib/utils/supabase' 
    import { audioStore } from '$lib/stores/modalstores'
    import { readingMode } from '$lib/stores/globalstores'
    import Pagination from '$lib/components/Pagination.svelte'
    import ChevFRight from '$lib/icons/ChevFRight.svelte'
    import ChevFLeft from '$lib/icons/ChevFLeft.svelte'
    import ChevRight from '$lib/icons/ChevRight.svelte'
    
    let images:any
    let low = 0
    let top = 7
    let audio:any
    audioStore.subscribe(value => audio = value)

    let fake = false

    function nextEight(){
        low += 7
        top += 7
    }

    function prevEight(){
        low -= 7
        top -= 7
    }

    $: if ( low ) {
        (async() => {
            images = await supaImages(low, top)
        })();
    }

    function fauxfake(){
        fake = !fake
    }

    onMount(async() => {
        images = await supaImages(low,top)
    })

</script>

<div class="rta-grid grid2 right00 screen minH cushion">
    <div class="rta-grid grid4 colgap100 rowgap100 postgrid">
        {#if images && images.length > 0}
            {#each images as item}
                <a class="rta-image" href="/image/{item.slug}">
                    <img src={item.link} alt={item.id}/>
                </a>
            {/each}
        {/if}
    </div>
    <div class="rta-column titlebox null postis" class:invisible={$readingMode}>
        <img class="jello-vertical" src="/images/k-images.webp" alt="writing" on:mouseover={() => audio.play()} on:focus={fauxfake}/>
        <h3 class="tt-u">image</h3>
        <p class="grey">I've been waiting for Midjourney since I was a kid! But let's not forget the earlier and delightful <a href="/image/wombo">Wombo.</a></p>
        <Pagination>
            <div slot="prev">
                <button class="blank-button" on:click={prevEight}>
                    <ChevFLeft/>
                </button>
            </div>
            <div slot="next">
                <button class="blank-button" on:click={nextEight}>
                    <ChevFRight/>
                </button>
            </div>
        </Pagination>
    </div>
</div>
