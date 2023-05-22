<script lang="ts">

    import { onMount } from 'svelte'
    import { loadingStore } from '$lib/stores/globalstores'
	import AppShell from '$lib/design/AppShell.svelte';
    import { supaImages } from '$lib/utils/supabase' 
    import { audioStore } from '$lib/stores/modalstores'
    import { readingMode } from '$lib/stores/globalstores'
    import Pagination from '$lib/components/Pagination.svelte'
    import { scale } from 'svelte/transition'
    import { loadingAction } from '$lib/utils/loadingaction'
    import ChevFRight from '$lib/icons/ChevFRight.svelte'
    import ChevFLeft from '$lib/icons/ChevFLeft.svelte'
    import ChevRight from '$lib/icons/ChevRight.svelte'
    import Loader from '$lib/assets/Loader.svelte'
    
    let images:any
    let low = 0
    let top = 11
    let audio:any
    audioStore.subscribe(value => audio = value)

    let fake = false
    let loading = false

    function nextEight(){
        low += 12
        top += 12
    }

    function prevEight(){
        low -= 12
        top -= 12
    }

    $: if ( low ) {
        (async() => {
            loadingStore.set(true)
            images = await supaImages(low, top)
            loadingStore.set(false)
        })();
    }

    function fauxfake(){
        fake = !fake
    }

    onMount(async() => {
        images = await supaImages(low,top)
    })

</script>


<AppShell>
    <div slot="main" class="rta-grid grid4 stay2 colgap300 rowgap300">
        {#if images && images.length > 0}
            {#each images as item}
                <a class="rta-image height-24" href="/image/{item.slug}">
                    <img src={item.link} alt={item.id} use:loadingAction={loading} transition:scale/>
                </a>
            {/each}
        {/if}
    </div>
    <div slot="side" class="rta-column column-row xstretch fullW rowgap300 null">
        <img class="jello-vertical w32" src="/images/k-images.webp" alt="writing" on:mouseover={() => audio.play()} on:focus={fauxfake}/>
        <div class="rta-column rowgap200 bord-bot p-bot-32 p-left-32 w64">
        <h5 class="tt-u">image</h5>
        <small class="grey">I've been waiting for Midjourney since I was a kid! But let's not forget the earlier and delightful <a class="green" href="/image/wombo">Wombo.</a></small>
        </div>
    <div class="p-bot-32 p-left-32">
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
</AppShell>
